import mongoose, {Schema, model, models} from "mongoose";

const  lotterySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobileno: {
    type: Number,
    required: true,
    unique: true,
  },
  ticket: {
    type: String,
    require: true,
    unique: true,
  },
  date: {
    type: String,
    require: true,
  },
})

const Lottery = models.Lottery || model('Lottery', lotterySchema);


export default Lottery;