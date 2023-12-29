import { fetchToken } from '@/app/actions';
import { queryKeys } from '@/config/queryKeys';
import { queryClient } from '@/libs/queryClient';

export async function getAccessTokenClientSide() {
  const token = await queryClient.fetchQuery({
    queryKey: queryKeys.token(),
    queryFn: () => fetchToken(),
  });

  return token;
}
