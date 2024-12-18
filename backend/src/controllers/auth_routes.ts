import { Router } from 'express';
import { AuthDB } from '../models/auth_db';
import { debugEnum } from '../shared';


export const app = Router();
// app.use(cors());
// app.use(express.json());
// app.use(cookieSession({
//   name: 'session',
//   keys: COOKIE_SESSION_KEYS,
//   maxAge: COOKIE_MAX_AGE,
// }));

// Replace with info-enum

app.post('/verify-creds', async (req , res) => 
{
    const { userID, password, type, instID } = req.body;
    const result = await AuthDB.verifyCreds(userID, password, type, instID);
    if (result.message === debugEnum.SUCCESS)
    {
        req.session!.authenticated = true;
        req.session!.type = type;
        req.session!.instID = instID;
        req.session!.userID = userID;
        req.session!.powers = result.powers;
        console.log(req.session);
        return res.status(200).json({ 
                                    message: 'Credentials verified successfully.' , 
                                    token : result.token, 
                                    powers : result.powers 
                                });
    }
    else 
    {
        req.session!.authenticated = false;
        return res.status(401).json({ message: 'Invalid credentials.' });
    }
});

app.post('/verify-token', async (req, res) => 
{
    const { userID, token, type, instID } = req.body;
    const result = await AuthDB.verifyToken(userID, token, type, instID);
    if (result.message === debugEnum.SUCCESS) 
    {
        req.session!.authenticated = true;
        req.session!.type = type;
        req.session!.instID = instID;
        req.session!.userID = userID;
        req.session!.powers = result.powers;
        res.status(200).json({
                                message:'Valid token',
                                powers : result.powers
                            });
    } 
    else 
    {
        req.session!.authenticated = false;
        res.status(401).json({'message':'Invalid token'});
    }
});

app.get('/logout', (req, res) => 
{
    req.session!.authenticated = false;
    res.status(200).json({'message':'Logged out'});
});