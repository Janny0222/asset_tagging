import { hash } from 'bcryptjs';
import { User } from '@/models/UserModel';
import { NextApiRequest, NextApiResponse } from 'next';
const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    await User.sync();
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { username } });

    if (!existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Insert the new user into the database
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default registerUser;