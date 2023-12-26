import axios from 'axios';

import { getServerURL } from '@/utils/getServerURL';

export const api = axios.create({
  baseURL: getServerURL(),
});
