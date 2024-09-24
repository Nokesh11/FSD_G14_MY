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

    public static async createTicket(ticket : TicketInterface, instID : string) : Promise<string | null>
    {
        const instDB = await Central.getInstDB('admin');
        if (instDB ==  null)
        {
            return null;
        }
        const col = Central.getCol(ticket.from_userType, instDB);
        if (col === null)
        {
            return null;
        }
        const user = await Central.getUser(ticket.fromID, col);
        if (user === null)
        {
            return null;
        }
        while ( true )
        {
            const ticketID = this.genTicketID(ticket.fromID, ticket.toID);
            const ticketDoc = await instDB.ticket_col.findOne({'_id' : new ObjectId(ticketID)});
            if (ticketDoc === null)
            {
                ticket._id = new ObjectId(ticketID);
                await instDB.ticket_col.insertOne(ticket);
                let currentTickets = user.active_tickets;
                currentTickets.push(new ObjectId(ticketID));
                await col.updateOne({_id : new ObjectId(ticket.fromID)}, {$set : {active_tickets : currentTickets}});
                return ticketID;
            }
        }
    }

    private static genTicketID (fromID : string, toID : string)
    {
        const now = new Date();
        const timeStamp = `${now.getMonth() + 1}.${now.getDate()}.${now.getFullYear()}-${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        return `${fromID}_${toID}-${timeStamp}`;
    }

    public static async changeStage(ticketID : string, stage : string, instID : string) : Promise<boolean>
    {
        const instDB = await Central.getInstDB(instID);
        if (instDB == null)
        {
            return false;
        }
        const ticket = await instDB.ticket_col.findOne({'_id' : new ObjectId(ticketID)});
        if (ticket === null)
        {
            return false;
        }
        if (ticket.stages.includes(stage))
        {
            instDB.ticket_col.updateOne({'_id' : new ObjectId(ticketID)}, {$set : {curStage : stage}});
            if (stage === "RESOLVED")
            {
                const type = ticket.from_userType;
                const col = Central.getCol(type, instDB);
                if (col === null)
                {
                    console.log(" When ticket exists, col should also exists, but that did not happen ");
                    return false;
                }
                const user = await Central.getUser(ticket.fromID, col);
                if (user === null)
                {
                    console.log(" When ticket exists, user should also exists, but that did not happen ");
                    return false;
                }
                let currentTickets = user.active_tickets;
                let resolved_tickets = user.resolved_tickets;
                resolved_tickets.push(ticketID);
                const index = currentTickets.indexOf(ticketID);
                if (index === -1)
                {
                    console.log(" When ticket exists, ticketID should exist in pending_tickets, but that did not happen ");
                    return false;
                }
                currentTickets.splice(index, 1);
                await col.updateOne({'_id' : new ObjectId(ticket.fromID)}, {$set : {active_tickets : currentTickets, resolved_tickets : resolved_tickets}});
                return true;
            }
        }
        return false;
    }

    public static getTicket(ticketID : string, instID : string) : Promise<TicketInterface | null>
    {
        return new Promise<TicketInterface | null>(async (resolve, reject) => {
            const instDB = await Central.getInstDB(instID);
            if (instDB === null)
            {
                resolve(null);
            }
            const ticket = await instDB.ticket_col.findOne({'_id' : new ObjectId(ticketID)});
            return ticket;

        });
    }
}