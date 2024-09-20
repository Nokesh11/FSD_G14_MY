import express from 'express';
import cookieSession from 'cookie-session';
import MongoClient from 'mongodb';

/******************************************/
/*          Router imports                */
/******************************************/

import { app as authRouter } from './controllers/auth_routes';

/********* End of Router imorts ***********/

/******************************************/
/*             DB imports                 */
/******************************************/
import { AuthDB } from './models/auth_db';
/*********** End of DB imports ************/

import { COOKIE_MAX_AGE, COOKIE_SESSION_KEYS, MONGO_URL, PORT } from './config';

/******************************************/
/*        DB initialzation                */
/******************************************/

const cluster = new MongoClient.MongoClient(MONGO_URL);
cluster.connect().then(function(){
  console.log("DB connected");
});

AuthDB.init(cluster.db('auth'));

/******* End of DB Iniitialization ********/
const app = express();

/******************************************/
/*              Middleware                */
/******************************************/
app.use(express.json());
app.use(cookieSession({
  name: 'session',
  keys: COOKIE_SESSION_KEYS,
  maxAge: COOKIE_MAX_AGE,
}));

/*********** End of Middleware ************/

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

app.listen(PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
