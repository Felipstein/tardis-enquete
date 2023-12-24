import { Option as PrismaOption } from '@prisma/client';

import Option from '../../../domain/entities/Option';

export default class PrismaOptionsMapper {
  static toDomain(prismaOption: PrismaOption): Option {
    return new Option({
      id: prismaOption.id,
      text: prismaOption.text,
      pollId: prismaOption.pollId,
    });
  }
}
