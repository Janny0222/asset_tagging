import { NextApiRequest, NextApiResponse } from 'next';
import { isAuthenticated } from '@/middleware/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  res.status(200).json({ message: 'Protected route accessed successfully!' });
};

export default isAuthenticated(handler);
