require('dotenv').config();
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
require('./services/redis');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const passport = require('passport')

require('./models/User');
require('./models/Blog');
require('./models/Message');
require('./services/passport')

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connecté avec succès'))
  .catch(err => console.error('Erreur de connexion MongoDB :', err));


const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:3000', credentials: true }
});
// CORS configuration
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:8080", "http://localhost:5173"],
  methods: 'GET, HEAD, POST, PUT, DELETE, PATCH',
  credentials: true, // Permet d'envoyer les cookies
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 jours
  keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

require('./swagger')(app);
require('./routes/authRoutes')(app);
require('./routes/blogRoutes')(app);


app.get('/', (req, res) => {
  res.send('Salut!');
});


const Message = mongoose.model('Message');
io.on('connection', socket => {
  console.log('Socket connecté :', socket.id);
  socket.on('sendMessage', async ({ text, userId }) => {
    const msg = await new Message({ text, user: userId }).save();
    const populated = await msg.populate('user', 'displayName');
    io.emit('receiveMessage', {
      _id: populated._id,
      text: populated.text,
      user: populated.user.displayName,
      createdAt: populated.createdAt
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Le serveur ecoute sur le port: `, PORT);
});