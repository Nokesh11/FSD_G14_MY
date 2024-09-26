import express from 'express';
// import cookieSession from 'cookie-session';
import session from 'express-session';
import MongoClient from 'mongodb';
import cors from "cors";
import cookieParser from "cookie-parser";


/*          Router imports                */
import { app as authRouter } from './controllers/auth_routes';
import { app as adminRouter } from './controllers/admin_routes';
import { app as courseRouter } from './controllers/course_routes';

import { Central } from './models/central_db';
import { COOKIE_MAX_AGE, COOKIE_SESSION_KEYS, PORT, SECRET } from './config';

// testiung 


import { AdminDB } from './models/admin_db';
import { admin_type, powerType } from './shared';

// Central.init().then(() => {
//   console.log("DB initialized");
// })
Central.init().then(() => {
  // console.log("DB CONNECTED");
  // AdminDB.givePowers("6969", admin_type, "IIITS", powerType.VIEW_POWERS);
  // AdminDB.createUser("6969","420420", admin_type, "IIITS");
})

const app = express();

/*              Middleware                */
app.use(cors({
  'origin' : "http://localhost:3000",
  'credentials' : true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieSession({
//   name: 'session',
//   keys: COOKIE_SESSION_KEYS,
//   maxAge: COOKIE_MAX_AGE,
// }));
app.use(cookieParser());
app.use(session({secret : SECRET, "saveUninitialized" : false, 
                "resave" : false,
                "cookie" : {
                  "secure" : false,
                  "maxAge" : COOKIE_MAX_AGE
              }}));

app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/course', courseRouter);

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

app.listen(PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});