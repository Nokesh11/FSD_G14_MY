import { Router } from 'express';
import { debugEnum, powerType } from '../shared';
import { Central } from '../models/central_db';

export const app = Router();

app.post('/edit-event', async (req, res) => 
{
    if (req.session!.authenticated === true )
    {
        const instID = req.session!.instID;
        const { events, date } = req.body;
        const userID = req.session!.userID;
        const type = req.session!.type;
        const result = await Central.getUser(userID, type, instID);
        if (result.message !== debugEnum.SUCCESS)
        {
            return res.status(401).send({message : result.message});
        }
        const col = result.col;
        let tasks = result.user!.tasks;
        tasks[date] = events;
        col!.updateOne({_id : userID},{tasks : tasks});
        return res.status(200).send({message : result.message});
    }
    return res.status(401).send({message : "Unauthorized"});
})

app.get('/get-events', async (req, res) => 
{
    if (req.session!.authenticated === true)
    {
        const instID = req.session!.instID;
        const userID = req.session!.userID;
        const type = req.session!.type;
        const result = await Central.getUser(userID, type, instID);
        if (result.message !== debugEnum.SUCCESS)
        {
            return res.status(401).send({message : result.message});
        }
        const user = result.user;
        const tasks = user!.tasks;
        return res.status(200).send({message : "success", "tasks" : tasks})
        
    }
    return res.status(401).send({message : "Unauthorized"});
})