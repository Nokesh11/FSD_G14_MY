import { Db, Collection, ObjectId, Document } from 'mongodb';
import { userType, ticketStatus } from '../shared';
import { Central } from './central';
import { AuthDB } from './auth_db';

interface TicketInterface //InterfaceTicket
{
    _id : ObjectId,
    fromID : string,
    from_userType : userType,
    toID : string, 
    tag : string, 
    title : string,
    body : string,
    stages : Array<string>,
    curStage : string,
    department : string
}

export function Ticket (this : TicketInterface, fromID : string, 
                        from_userType : userType, toID : string, 
                        tag : string, title : string, 
                        body : string, stages : Array<string>, 
                        curStage : string, department : string )
{
    this.fromID = fromID;
    this.from_userType = from_userType;
    this.toID = toID;
    this.tag = tag;
    this.title = title;
    this.body = body;
    this.stages = stages;
    this.curStage = curStage;
    this.department = department;
}

export class TicketDB
{

    static async createTicket(ticket : TicketInterface) : Promise<string | boolean>
    {
        const res = await AuthDB.getUser(ticket.fromID, ticket.from_userType);
        if (res === null)
        {
            return false;
        }
        const userDoc = res.userDoc;
        while ( true )
        {
            const ticketID = this.genTicketID(ticket.fromID, ticket.toID);
            const ticketDoc = await Central.ticket_col.findOne({'_id' : new ObjectId(ticketID)});
            if (ticketDoc === null)
            {
                ticket._id = new ObjectId(ticketID);
                await Central.ticket_col.insertOne(ticket);
                const currentTickets = userDoc.
                return ticketID;
            }
        }
    }

    static genTicketID (fromID : string, toID : string)
    {
        const now = new Date();
        const timeStamp = `${now.getMonth() + 1}.${now.getDate()}.${now.getFullYear()}-${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        return `${fromID}_${toID}-${timeStamp}`;
    }

    static async changeStatus(ticketID : string)
    {

    }
}