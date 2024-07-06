// pages/api/tools.ts
import { NextApiRequest, NextApiResponse } from 'next';

type Tool = {
  id: number;
  name: string;
  category: string;
  businessType: string;
  description: string;
};

const tools: Tool[] = [
  { id: 1, name: 'Lorem', description: 'A tool for hitting nails.', businessType: "landscaping", category: "communication" },
  { id: 2, name: 'Test1', description: 'A tool for hitting nails.', businessType: "landscaping", category: "email" },
  { id: 3, name: 'Test 2', description: 'A tool for hitting nails.', businessType: "landscaping", category: "email" },
  { id: 4, name: 'Test 3', description: 'A tool for hitting nails.', businessType: "landscaping", category: "communication" }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Tool[]>
) {
  if (req.method === 'GET') {
    res.status(200).json(tools);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}