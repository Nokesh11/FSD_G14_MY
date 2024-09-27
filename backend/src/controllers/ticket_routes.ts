import { Router } from 'express';
import { admin_type, debugEnum, powerType } from '../shared';
import { Central } from '../models/central_db';
import { Admin } from 'mongodb';
import { TicketDB } from '../models/tickets_db';

export const app = Router();

app.post('/create-ticket', async(req, res) =>
{
    if (req.session!.authorized === true )
    {
        const instID = req.session!.instID;
        const usereID = req.session!.instID;
        const type = req.session!.instID;
        const { body, title, toID } = req.body;
        const result = await Central.getUser(toID, admin_type, instID);
        if (result.message !== debugEnum.SUCCESS)
        {
            return res.status(401).send({message : "ToID is not an admin or does not exit"})
        }
    }
    return res.status(401).send({message : "Unauthorized"});
})