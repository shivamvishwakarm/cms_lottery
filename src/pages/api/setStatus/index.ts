import { NextApiRequest, NextApiResponse } from 'next';

import LotteryStatus from "@/models/LotteryStatus"; // Import your Mongoose model 
import connectDB from "@/lib/mongoose"; // Import your MongoDB connection
import dotenv from "dotenv";

dotenv.config();

connectDB(); // Connect to the MongoDB database

const submitHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PATCH') {
      const { status } = req.body;
      console.log(req.body)
  
      // Validate input
      if (status === undefined || status === null) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      try {
        // Find the existing status document
        const existingStatus = await LotteryStatus.findOne();
  
        if (existingStatus) {
          // If a status document exists, update it
          existingStatus.start = status;
          await existingStatus.save();
        } else {
          // If no status document exists, create a new one
          const newStatus = new LotteryStatus({
            start: status
          });
          await newStatus.save();
        }
  
        res.status(200).json({ message: 'Status Updated '});
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating data' });
      }
     }else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default submitHandler;