const mongoose = require('mongoose');
const { Schema } = mongoose;
const messageSchema = new Schema({
  text: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});
mongoose.model('Message', messageSchema);
