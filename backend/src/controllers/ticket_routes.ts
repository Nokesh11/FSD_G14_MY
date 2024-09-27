import { Router } from 'express';
import { admin_type, debugEnum, powerType } from '../shared';
import { Central } from '../models/central_db';
import { Admin, Condition, ObjectId, PushOperator } from 'mongodb';
import { TicketDB } from '../models/tickets_db';

export const app = Router();

app.post('/create-ticket', async(req, res) =>
{
    if (req.session!.authenticated === true )
    {
        const instID = req.session!.instID;
        const userID = req.session!.userID;
        const type = req.session!.type;
        const { body, title, toID } = req.body;
        const result = await Central.getUser(toID, admin_type, instID);
        if (result.message !== debugEnum.SUCCESS)
        {
            return res.status(401).send({message : "ToID is not an admin or does not exit"})
        }

        const ticket_col = result.instDB?.ticket_col;
        const ticketID = TicketDB.genTicketID(userID, toID);
        await ticket_col!.insertOne({_id : ticketID ,body : body, title : title } as Condition<ObjectId>);

        
        const Colresult = await Central.getCol(instID, type);
        Colresult.col!.updateOne({_id : userID},{$push : {active_tickets : ticketID}} as PushOperator<Document>);;
        return res.status(200).send({message : "Ticket created successfully"});
    }
    return res.status(401).send({message : "Unauthorized"});
})