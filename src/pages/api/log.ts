/* eslint-disable no-console */

import { NextApiRequest, NextApiResponse } from 'next';

export default function api(req: NextApiRequest, _res: NextApiResponse): void {
  console.log(req.body);
}
