import { hash } from 'bcryptjs';
import { User } from '@/models/UserModel';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    await User.sync();
    if (req.method === 'POST') {
        const { username, name,  password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        try {
            
            // Check if the user already exists
            const existingUser = await User.findOne({ where: { username } });
            
            if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await hash(password, 10);

            // Insert the new user into the database
            await User.create({
            username,
            name,
            password: hashedPassword,
            });

            return res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Registration error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else if (req.method === 'GET') {
      
        await User.sync();
        try {
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch (error) {
            console.error('Get users error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
  
};
