import Poll from '../../../domain/entities/Poll';

import type { Poll as PrismaPoll } from '@prisma/client';

export default class PrismaPollsMapper {
  static toDomain(prismaPoll: PrismaPoll): Poll {
    return new Poll(prismaPoll);
  }
}
