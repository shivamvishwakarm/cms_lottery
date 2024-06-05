import { NextApiRequest, NextApiResponse } from 'next';

import Lottery from "@/models/Lottery"; // Import your Mongoose model 
import connectDB from "@/lib/mongoose"; // Import your MongoDB connection
import dotenv from "dotenv";

dotenv.config();

connectDB(); // Connect to the MongoDB database

const submitHandler = async (req: NextApiRequest, res: NextApiResponse) => {



  if (req.method === 'POST') {
    const { mobileno, name, ticketno, withdrawaldate } = req.body;
    console.log(req.body)

    // Validate input
    if (!mobileno || !name || !ticketno || !withdrawaldate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const newEntry = new Lottery({
        mobileno: mobileno,
        name: name,
        ticket: ticketno,
        date: new Date(withdrawaldate)
      });

      const result = await newEntry.save();

      res.status(201).json({ message: 'Data inserted successfully' });
    } catch (err) {
      console.error(err);
      if ((err as any).code === 11000) {
        res.status(400).json({ error: 'Duplicate entry' });
      } else {
        res.status(500).json({ error: 'An error occurred while inserting data' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default submitHandler;