import pool from '@/db';
import { NextApiRequest, NextApiResponse } from 'next';



const submitHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { mobileno, name, ticketno, withdrawaldate } = req.body;

    // Validate input
    if (!mobileno || !name || !ticketno || !withdrawaldate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const result = await pool.query(
        'INSERT INTO lottery_entry (mobileno, name, ticketNo, withdrawaldate) VALUES ($1, $2, $3, $4)',
        [mobileno, name, ticketno, withdrawaldate]
      );

      res.status(201).json({ message: 'Data inserted successfully' });
      // Rest of your code...
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while inserting data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default submitHandler;