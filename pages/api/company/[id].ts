import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    const company = await query('SELECT * FROM companies WHERE id = $1', [id]);
    const directors = await query('SELECT * FROM directors WHERE company_id = $1', [id]);
    res.status(200).json({ company: company.rows[0], directors: directors.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}