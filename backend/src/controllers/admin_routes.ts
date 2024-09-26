import express from 'express';
import { Router } from 'express';
import { debugEnum, powerType } from '../shared';
import cookieSession from 'cookie-session';
import { Request, Response } from 'express';
import { COOKIE_MAX_AGE, COOKIE_SESSION_KEYS } from '../config';
import { AdminDB } from '../models/admin_db';

export const app = Router();
app.use(express.json());
app.use(cookieSession({
  name: 'session',
  keys: COOKIE_SESSION_KEYS,
  maxAge: COOKIE_MAX_AGE,
}));

app.post('/create-user', async (req : Request, res : Response) =>
{
    if (req.session!.powers.includes(powerType.CREATE_USER))
    {
        const { string: userID, string: password, userType: type, string: instID } = req.body;
        const result = await AdminDB.createUser(userID, password, type, instID);
        if (result === debugEnum.SUCCESS)
        {
            return res.status(200).json({ message: 'User created successfully.' });
        }
        else 
        {
            return res.status(401).json({ message: result });
        }
    }   
    else 
    {
        return res.status(401).json({ message: 'You do not have the required permissions.' });
    }
});


app.post('/delete-user', async (req : Request, res : Response) =>
{
    if (req.session!.powers.includes(powerType.DELETE_USER))
    {
        const { string: userID, userType: type, string: instID } = req.body;
        const result = await AdminDB.deleteUser(userID, type, instID);
        if (result === debugEnum.SUCCESS)
        {
            return res.status(200).json({ message: 'User deleted successfully.' });
        }
        else 
        {
            return res.status(401).json({ message: result });
        }
    }
    else 
    {
        return res.status(401).json({ message: 'You do not have the required permissions.' });
    }
});

app.post('/change-password', async (req : Request, res : Response) =>
{
    if (req.session!.powers.includes(powerType.CHANGE_PASSWORD))
    {
        const { string: userID, string: password, userType: type, string: instID } = req.body;
        const result = await AdminDB.changePassword(userID, password, type, instID);
        if (result === debugEnum.SUCCESS)
        {
            return res.status(200).json({ message: 'Password changed successfully.' });
        }
        else 
        {
            return res.status(401).json({ message: result });
        }
    }
    else 
    {
        return res.status(401).json({ message: 'You do not have the required permissions.' });
    }
});

// Have to work on these powers, can make it simple like "EDIT POWERS"
app.post('/give-powers', async (req : Request, res : Response) =>
{
    if (req.session!.powers.includes(powerType.EDIT_POWERS))
    {
        const { string: userID, userType: type, string: instID, power: power } = req.body;
        const result = await AdminDB.givePowers(userID, type, instID, power);
        if (result === debugEnum.SUCCESS)
        {
            return res.status(200).json({ message: 'Powers given successfully.' });
        }
        else 
        {
            return res.status(401).json({ message: result });
        }
    }
    else 
    {
        return res.status(401).json({ message: 'You do not have the required permissions.' });
    }
});

app.post('/remove-powers', async (req : Request, res : Response) =>
{
    if (req.session!.powers.includes(powerType.EDIT_POWERS))
    {
        const { string: userID, userType: type, string: instID, power: power } = req.body;
        const result = await AdminDB.removePowers(userID, type, instID, power);
        if (result === debugEnum.SUCCESS)
        {
            return res.status(200).json({ message: 'Powers removed successfully.' });
        }
        else 
        {
            return res.status(401).json({ message: result });
        }
    }
    else 
    {
        return res.status(401).json({ message: 'You do not have the required permissions.' });
    }
});
