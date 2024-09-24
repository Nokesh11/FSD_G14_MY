import express from 'express';
import cookieSession from 'cookie-session';
import MongoClient from 'mongodb';

/*          Router imports                */
import { app as authRouter } from './controllers/auth_routes';

import { Central } from './models/central_db';
import { COOKIE_MAX_AGE, COOKIE_SESSION_KEYS, PORT } from './config';

Central.init()

const app = express();

/*              Middleware                */
app.use(express.json());
app.use(cookieSession({
  name: 'session',
  keys: COOKIE_SESSION_KEYS,
  maxAge: COOKIE_MAX_AGE,
}));


app.get('/', (req, res) => {
  res.send('Server is up and running');
});

app.listen(PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
