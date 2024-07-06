import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const usersFilePath = path.join('data', 'users.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Example validation (you should implement proper validation)
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
      // Read existing users from file
      const existingData = fs.existsSync(usersFilePath)
        ? fs.readFileSync(usersFilePath, 'utf-8')
        : '[]';
      const users = JSON.parse(existingData);

      // Check if email already exists
      if (users.some((user: any) => user.email === email)) {
        return res.status(400).json({ error: 'Email already exists.' });
      }

      // Add new user to array
      const newUser = { email, password };
      users.push(newUser);

      // Write updated users array back to file
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

      // Return success response
      res.status(200).json({ message: 'Sign-up successful!', user: newUser });
    } catch (error) {
      console.error('Error signing up:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
