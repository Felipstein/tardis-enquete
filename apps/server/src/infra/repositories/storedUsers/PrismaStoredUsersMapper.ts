import StoredUser from '../../../domain/entities/StoredUser';

import type { User as PrismaUser } from '@prisma/client';

export default class PrismaStoredUserMapper {
  static toDomain(prismaStoredUser: PrismaUser): StoredUser {
    return new StoredUser({
      id: prismaStoredUser.id,
      accessToken: prismaStoredUser.accessToken,
      refreshToken: prismaStoredUser.refreshToken,
      expiresIn: prismaStoredUser.expiresIn.toNumber(),
    });
  }
}
