import mongoose from 'mongoose';

const tokenBlacklistSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  blacklistedAt: { type: Date, default: Date.now },
});

export default mongoose.model('TokenBlacklist', tokenBlacklistSchema);
