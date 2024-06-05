import mongoose, {Schema, model, models} from "mongoose";

const  statusSchema = new Schema({
  start: {
    type: Boolean,
    required: true,
  },

})

const LotteryStatus = models.LotteryStatus || model('LotteryStatus', statusSchema);


export default LotteryStatus;