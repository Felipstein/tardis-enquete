'use client';

import { PollTimeline } from '@tardis-enquete/contracts';
import { Clock10 } from 'lucide-react';
import { useMemo } from 'react';

import { Option } from './Option';

import { UserAvatar } from '@/app/components/UserAvatar';
import { useUser } from '@/hooks/useUser';
import { moment } from '@/utils/moment';

export type PollCardProps = {
  poll: PollTimeline;
};

export function PollCard({ poll }: PollCardProps) {
  const { user } = useUser(true);

  const totalVotes = useMemo(
    () => poll.options.reduce((total, option) => option.votes.length + total, 0),
    [poll.options],
  );

  const isExpired = poll.expireAt < new Date();

  const isAuthor = poll.author.id === user?.id;

  // const canEdit = isAuthor || user?.role !== 'common';

  return (
    <div className="w-full space-y-8">
      <header className="w-full">
        <h2 className="truncate text-xl font-semibold tracking-wide">{poll.title}</h2>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-primary-500">Iniciado por</span>

            <div className="flex items-center gap-1.5">
              <UserAvatar userId={poll.author.id} avatar={poll.author.avatar} width={28} height={28} />

              {isAuthor ? (
                <strong className="text-sm text-cyan-400">VOCÊ</strong>
              ) : (
                <strong className="text-sm text-primary-300">{poll.author.username}</strong>
              )}
            </div>

            <span className="text-xs text-primary-500">{moment(poll.createdAt).fromNow()}</span>
          </div>

          <div
            data-expired={isExpired}
            className="flex items-center gap-1.5 text-primary-300 data-[expired=true]:text-red-500"
          >
            <Clock10 className="h-3.5 w-3.5" />

            <span className="text-sm">{isExpired ? 'expirado' : `expira ${moment(poll.expireAt).fromNow()}`}</span>
          </div>
        </div>
      </header>

      <ul className="space-y-3.5">
        {poll.options.map((option) => {
          const isSelected = option.votes.some((vote) => vote.user.id === user?.id);

          const optionTotalVotes = option.votes.length;

          const progress = totalVotes === 0 ? 0 : Math.round((optionTotalVotes / totalVotes) * 100);

          return (
            <li key={option.id}>
              <Option option={option} progress={progress} isSelected={isSelected} isDisabled={isExpired} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
