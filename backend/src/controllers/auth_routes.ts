import express from 'express';
import { Router } from 'express';
import { AuthDB } from '../models/auth_db';
import { debugEnum } from '../shared';
import cookieSession from 'cookie-session';
import { Request, Response } from 'express';
import { COOKIE_MAX_AGE, COOKIE_SESSION_KEYS } from '../config';

export const app = Router();
app.use(express.json());
app.use(cookieSession({
  name: 'session',
  keys: COOKIE_SESSION_KEYS,
  maxAge: COOKIE_MAX_AGE,
}));

// Replace with info-enum

app.post('/verify-creds', async (req : Request, res : Response) => 
{
    const { string: userID, string: password, userType: type, string: instID } = req.body;
    const result = await AuthDB.verifyCreds(userID, password, type, instID);
    if (result === debugEnum.SUCCESS)
    {
        req.session!.authenticated = true;
        return res.status(200).json({ message: 'Credentials verified successfully.' });
    }
    else 
    {
        req.session!.authenticated = false;
        return res.status(401).json({ message: 'Invalid credentials.' });
    }
});

app.post('/verify-token', async (req, res) => 
{
    const { string: userID, string: token, userType: type, string: instID } = req.body;
    const result = await AuthDB.verifyToken(userID, token, type, instID);
    if (result === debugEnum.SUCCESS) 
    {
        req.session!.authenticated = true;
        res.status(200).json('Valid token');
    } 
    else 
    {
        req.session!.authenticated = false;
        res.status(401).send('Invalid token');
    }
});

app.get('/logout', (req, res) => 
{
    req.session!.authenticated = false;
    res.status(200).send('Logged out');
});