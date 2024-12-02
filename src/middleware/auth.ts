import { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcryptjs';
import { User } from '@/models/UserModel';

export const isAuthenticated = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Example: Check if session cookie is present and valid
    const sessionCookie = req.cookies['session-id'];

    if (!sessionCookie) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Proceed to protected route handler
    await handler(req, res);
  };
};


export async function authenticateUser(username: any, password: any) {
  // Find the user with the specified username
  const user = await User.findOne({ where: { username } });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Compare the provided password with the stored hash
  const isValidPassword = await compare(password, user.password);

  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }

  console.log("Result for user: ", user);
  return user;
}