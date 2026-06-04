import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  userId: String,
  action: String,
  details: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
});

const Log = mongoose.model("Log", logSchema);
export default Log;