import express from 'express';
import { Router } from 'express';
import { debugEnum, powerType } from '../shared';
import cookieSession from 'cookie-session';
import { Request, Response } from 'express';
import { COOKIE_MAX_AGE, COOKIE_SESSION_KEYS } from '../config';
import { AdminDB } from '../models/admin_db';
import { Central } from '../models/central_db';

export const app = Router();

app.post('/create-user', async (req : Request, res : Response) =>
{
    console.log(req.session);
    if (req.session!.powers.includes(powerType.CREATE_USER))
    {
        const instID = req.session!.instID;
        const { userID, password, type } = req.body;
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
        const instID = req.session!.instID;
        const { userID, type } = req.body;
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
        const instID = req.session!.instID;
        const { userID, password, type } = req.body;
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
        const instID = req.session!.instID;
        const { userID, type, power } = req.body;
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
        const instID = req.session!.instID;
        const { userID, power, type } = req.body;
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

app.post('/get-powers', async (req : Request, res : Response) => 
{
    console.log(req.session!.powers);
    if (req.session!.authenticated === true && req.session!.powers.includes(powerType.VIEW_POWERS))
    {
        const {userID, type} = req.body;
        const instID = req.session!.instID;
        const result = await Central.getUser(userID, type, instID);
        console.log(result);
        console.log(type, instID, userID);
        if (result.message !== debugEnum.SUCCESS)
        {
            return res.status(401).json({ message: result.message });
        }
        return res.status(200).json({ mesage : "Success", powers: result.user!.powers });
    }
    else 
    {
        return res.status(401).json({ message : 'You do not have the required permissions.'})
    }
});