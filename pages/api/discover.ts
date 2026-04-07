import { NextApiRequest, NextApiResponse } from 'next';
import movies from '../../data/movies.json';
import { Media } from '../../types';

interface Response {
  type: 'Success' | 'Error';
  data: Media[];
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { genre, tag } = req.query;

  let data = movies as unknown as Media[];

  // genre нэрээр шүүх (id биш нэрээр)
  if (genre) {
    data = data.filter(m =>
      m.genre.some(g => g.name.toLowerCase().includes((genre as string).toLowerCase()) ||
                        String(g.id) === String(genre))
    );
  }

  // tag-аар шүүх
  if (tag) {
    data = data.filter(m => m.tags?.includes(tag as string));
  }

  res.status(200).json({ type: 'Success', data: data.slice(0, 20) });
}
