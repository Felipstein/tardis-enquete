import StoredUser, { UserRole } from '../../../domain/entities/StoredUser';

import type { $Enums, User as PrismaUser } from '@prisma/client';

export default class PrismaStoredUserMapper {
  static toDomain(prismaStoredUser: PrismaUser): StoredUser {
    return new StoredUser({
      id: prismaStoredUser.id,
      role: this.rolePrismaToDomain(prismaStoredUser.role),
      accessToken: prismaStoredUser.accessToken,
      refreshToken: prismaStoredUser.refreshToken,
      expiresIn: prismaStoredUser.expiresIn,
    });
  }

  static rolePrismaToDomain(role: $Enums.UserRole): UserRole {
    switch (role) {
      case 'COMMON':
        return 'common';
      case 'ADMIN':
        return 'admin';
      case 'DEVELOPER':
        return 'developer';
      default:
        throw new Error(`Invalid role: ${role}`);
    }
  }

  static roleDomainToPrisma(role: UserRole): $Enums.UserRole {
    switch (role) {
      case 'common':
        return 'COMMON';
      case 'admin':
        return 'ADMIN';
      case 'developer':
        return 'DEVELOPER';
      default:
        throw new Error(`Invalid role: ${role}`);
    }
  }
}
