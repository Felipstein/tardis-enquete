import moment from 'moment';

import { prisma } from '../src/infra/database/prisma';
import Logger from '../src/infra/logger';

const log = Logger.start('SEED DATABASE');

async function main() {
  log.info('Starting...');

  const users = await prisma.user.findMany();

  if (users.length === 0) {
    log.error('No users found, please, create two user first.');
    return;
  }

  if (users.length === 1) {
    log.error('Only one user found, please, create one more user first.');
    return;
  }

  const [user1, user2] = users;

  log.info('Creating two polls...');

  const [, poll2] = await Promise.all([
    prisma.poll.create({
      data: {
        title: 'Devemos começar os jogos quando?',
        description:
          'A jogatina começou! Vamos começar a jogar os jogos da lisa de jogos da jogatina de jogos da lista de jogos quando?',
        expireAt: moment(new Date()).add(1, 'second').toDate(),
        authorId: user1.id,
        options: {
          createMany: {
            data: [
              { text: 'Começar a jogatina amanhã' },
              { text: 'Começar a jogatina depois de amanhã' },
              { text: 'Nunca começar as jogatinas' },
            ],
          },
        },
      },
      select: {
        options: {
          select: {
            id: true,
          },
        },
      },
    }),
    prisma.poll.create({
      data: {
        title: 'TTA: Pior membro do servidor',
        description: 'A The TARDIS Awards começou, vote para o pior membro do servidor.',
        expireAt: moment(new Date()).add(2, 'month').toDate(),
        authorId: user1.id,
        options: {
          createMany: {
            data: [
              { text: 'Far' },
              { text: 'FarRed' },
              { text: 'FarBlue' },
              { text: 'Sergio' },
              { text: 'Todas as opções acima' },
            ],
          },
        },
      },
      select: {
        options: {
          select: {
            id: true,
          },
        },
      },
    }),
  ]);

  log.success('Two polls created.');

  log.info('Voting...');

  await Promise.all([
    prisma.vote.createMany({
      data: [
        { userId: user1.id, optionId: poll2.options[1].id },
        { userId: user2.id, optionId: poll2.options[4].id },
      ],
    }),
  ]);

  log.success('Voted.');
  log.info('Finish');
}

main();
