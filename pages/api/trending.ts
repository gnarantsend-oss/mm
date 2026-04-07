import { NextApiRequest, NextApiResponse } from 'next';
import movies from '../../data/movies.json';
import { Media } from '../../types';

interface Response {
  type: 'Success' | 'Error';
  data: Media[];
}

export default function handler(_req: NextApiRequest, res: NextApiResponse<Response>) {
  const data = (movies as unknown as Media[])
    .filter(m => m.tags?.includes('trending'))
    .slice(0, 20);
  res.status(200).json({ type: 'Success', data });
}
