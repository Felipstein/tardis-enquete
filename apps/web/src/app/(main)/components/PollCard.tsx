'use client';

import { PollTimeline, UnvoteParamsRequest, VoteParamsRequest } from '@tardis-enquete/contracts';
import { Clock10 } from 'lucide-react';
import { useMemo, useRef } from 'react';
import Balancer from 'react-wrap-balancer';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Option } from './Option';

import { PollOptions } from './PollOptions';
import { UserAvatar } from '@/app/components/UserAvatar';
import { useUser } from '@/hooks/useUser';
import { moment } from '@/utils/moment';
import { voteService } from '@/services/api/voteService';

export type PollCardProps = {
  poll: PollTimeline;
};

export function PollCard({ poll }: PollCardProps) {
  const { user } = useUser(true);

  const voteAbortController = useRef(new AbortController());
  const unvoteAbortController = useRef(new AbortController());

  const optionIDAction = useRef<string | null>(null);

  const totalVotes = useMemo(
    () => poll.options.reduce((total, option) => option.votes.length + total, 0),
    [poll.options],
  );

  const isExpired = poll.expireAt < new Date();

  const isAuthor = poll.author.id === user?.id;

  const canEdit = isAuthor || user?.role !== 'common';

  const { mutate: makeVoteRequest, isPending: isVoting } = useMutation({
    mutationFn: (data: VoteParamsRequest) => voteService.vote(data, voteAbortController.current.signal),
  });

  const { mutate: makeUnvoteRequest, isPending: isUnvoting } = useMutation({
    mutationFn: (data: UnvoteParamsRequest) => voteService.unvote(data, unvoteAbortController.current.signal),
  });

  function handleVote(optionId: string) {
    handleAborts();

    optionIDAction.current = optionId;

    makeVoteRequest(
      { optionId },
      {
        onSuccess(data) {
          console.info('Successful vote', data);
        },
        onError(error) {
          toast.error(error.message);

          console.error(error);
        },
        onSettled() {
          optionIDAction.current = null;
        },
      },
    );
  }

  function handleUnvote(optionId: string, voteId: string) {
    handleAborts();

    optionIDAction.current = optionId;

    makeUnvoteRequest(
      { voteId },
      {
        onSuccess(data) {
          console.info('Successful unvote', data);
        },
        onError(error) {
          toast.error(error.message);

          console.error(error);
        },
        onSettled() {
          optionIDAction.current = null;
        },
      },
    );
  }

  function handleAborts() {
    if (isVoting) {
      voteAbortController.current.abort();

      voteAbortController.current = new AbortController();
    }

    if (isUnvoting) {
      unvoteAbortController.current.abort();

      unvoteAbortController.current = new AbortController();
    }
  }

  return (
    <div className="group/poll relative w-full space-y-6">
      {canEdit && <PollOptions />}

      <header className="w-full">
        <h2 className="truncate text-xl font-semibold tracking-wide">{poll.title}</h2>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-primary-500 sm:text-sm">Iniciado por</span>

            <div className="flex items-center gap-1.5">
              <UserAvatar userId={poll.author.id} avatar={poll.author.avatar} width={28} height={28} />

              {isAuthor ? (
                <strong className="text-xs text-cyan-400 sm:text-sm">VOCÊ</strong>
              ) : (
                <strong className="text-xs text-primary-300 sm:text-sm">{poll.author.username}</strong>
              )}
            </div>

            <span className="text-[10px] text-primary-500 sm:text-xs">{moment(poll.createdAt).fromNow()}</span>
          </div>

          <div
            data-expired={isExpired}
            className="flex items-center gap-1.5 text-primary-300 data-[expired=true]:text-red-500"
          >
            <Clock10 className="h-3.5 w-3.5" />

            <span className="text-xs sm:text-sm">
              {isExpired ? 'expirado' : `expira ${moment(poll.expireAt).fromNow()}`}
            </span>
          </div>
        </div>
      </header>

      <p className="text-sm leading-relaxed tracking-wide text-primary-300">
        <Balancer>{poll.description}</Balancer>
      </p>

      <ul className="space-y-3.5">
        {poll.options.map((option) => {
          const voteOfUser = option.votes.find((vote) => vote.user.id === user?.id);
          const isSelected = !!voteOfUser;

          const optionTotalVotes = option.votes.length;

          const progress = totalVotes === 0 ? 0 : Math.round((optionTotalVotes / totalVotes) * 100);

          return (
            <li key={option.id}>
              <Option
                option={option}
                progress={progress}
                isSelected={isSelected}
                isDisabled={isExpired}
                isLoading={optionIDAction.current === option.id}
                onClick={() => (isSelected ? handleUnvote(option.id, voteOfUser.id) : handleVote(option.id))}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
