import { PrismaClient } from '@prisma/client';

import StoredUser from '../../../domain/entities/StoredUser';
import { CreateStoredUserDTO, UpdateStoredUserDTO } from '../../../domain/repositories/StoredUsersRepositoryDTO';
import IStoredUsersRepository from '../../../domain/repositories/StoredUsersStoredRepository';

import PrismaStoredUserMapper from './PrismaStoredUsersMapper';

export default class PrismaStoredUsersRepository implements IStoredUsersRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async exists(id: string): Promise<boolean> {
    const storedUser = await this.prismaClient.user.findUnique({
      where: { id },
      select: { id: true },
    });

    return !!storedUser;
  }

  async findById(id: string): Promise<StoredUser | null> {
    const storedUser = await this.prismaClient.user.findUnique({
      where: { id },
    });

    if (!storedUser) {
      return null;
    }

    return PrismaStoredUserMapper.toDomain(storedUser);
  }

  async create(data: CreateStoredUserDTO): Promise<StoredUser> {
    const { discordUserId, accessToken, refreshToken, expiresIn } = data;

    const storedUser = await this.prismaClient.user.create({
      data: {
        id: discordUserId,
        accessToken,
        refreshToken,
        expiresIn,
      },
    });

    return PrismaStoredUserMapper.toDomain(storedUser);
  }

  async update(id: string, data: UpdateStoredUserDTO): Promise<StoredUser> {
    const storedUser = await this.prismaClient.user.update({
      where: { id },
      data: {
        ...data,
        role: data.role && PrismaStoredUserMapper.roleDomainToPrisma(data.role),
      },
    });

    return PrismaStoredUserMapper.toDomain(storedUser);
  }

  async updateByInstance(data: StoredUser): Promise<void> {
    const { id, ...dataToUpdate } = data.toObject();

    await this.prismaClient.user.update({
      where: { id },
      data: {
        ...dataToUpdate,
        role: PrismaStoredUserMapper.roleDomainToPrisma(dataToUpdate.role),
      },
      select: { id: true },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaClient.user.delete({ where: { id } });
  }
}
