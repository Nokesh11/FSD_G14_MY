import { ObjectId } from 'mongodb';
import { userType} from '../shared';
import { Central } from './central_db';
import { debugEnum } from '../shared';

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
    public static async createTicket(ticket : TicketInterface, instID : string) : Promise<string | debugEnum>
    {
        const data = await Central.getUser(ticket.fromID, ticket.from_userType, instID);
        if (data.message !== debugEnum.SUCCESS)
        {
            return data.message;
        }
        else 
        {
            const instDB = data.instDB;
            const col = data.col;
            while ( true )
            {
                const ticketID = this.genTicketID(ticket.fromID, ticket.toID);
                const ticketDoc = await instDB!.ticket_col.findOne({'_id' : new ObjectId(ticketID)});
                if (ticketDoc === null)
                {
                    ticket._id = new ObjectId(ticketID);
                    await instDB!.ticket_col.insertOne(ticket);
                    let currentTickets = data.user!.active_tickets;
                    currentTickets.push(new ObjectId(ticketID));
                    await col!.updateOne({_id : new ObjectId(ticket.fromID)}, {$set : {active_tickets : currentTickets}});
                    return ticketID;
                }
            }
        }
    }

    private static genTicketID (fromID : string, toID : string)
    {
        const now = new Date();
        const timeStamp = `${now.getMonth() + 1}.${now.getDate()}.${now.getFullYear()}-${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        return `${fromID}_${toID}-${timeStamp}`;
    }

    public static async changeStage(ticketID : string, stage : string, instID : string) : Promise<debugEnum>
    {
        const instDB = await Central.getInstDB(instID);
        if (instDB == null)
        {
            return debugEnum.INVALID_INST_ID;
        }
        const ticket = await instDB.ticket_col.findOne({'_id' : new ObjectId(ticketID)});
        if (ticket === null)
        {
            return debugEnum.INVALID_TICKET_ID;
        }
        if (ticket.stages.includes(stage))
        {
            instDB.ticket_col.updateOne({'_id' : new ObjectId(ticketID)}, {$set : {curStage : stage}});
            if (stage === "RESOLVED")
            {
                const data = await Central.getUser(ticket.fromID, ticket.from_userType, instID);
                if (data.message === debugEnum.SUCCESS)
                {
                    const col = data.col;
                    let active_tickets = data.user!.active_tickets;
                    let resolvedTickets = data.user!.resolved_tickets;
                    resolvedTickets.push(ticketID);
                    const index = active_tickets.indexOf(ticketID);
                    active_tickets.splice(index, 1);
                    await col!.updateOne({'_id' : new ObjectId(ticket.fromID)}, {$set : {active_tickets : active_tickets, resolved_tickets : resolvedTickets}});
                    return debugEnum.SUCCESS;
                }
                else 
                {
                    return data.message;
                }
            }
        }
        return debugEnum.INVALID_TICKET_STAGE;
    }

    public static getTicket(ticketID : string, instID : string) : Promise<TicketInterface | null>
    {
        return new Promise<TicketInterface | null>(async (resolve, reject) => {
            const instDB = await Central.getInstDB(instID);
            const ticket = await instDB?.ticket_col.findOne({'_id' : new ObjectId(ticketID)}) ?? null;
            return ticket;

        });
    }

    public static async getActiveTicketIDs(userID : string, type : userType, instID : string) : Promise<Array<String> | null>
    {
        const data = await Central.getUser(userID, type, instID);
        if (data.message !== debugEnum.SUCCESS)
        {
            return null;
        }
        else 
        {
            return data.user!.active_tickets;
        }
    }

    public static async getResolvedTicketIDs(userID : string, type : userType, instID : string) : Promise<Array<String> | null>
    {
        const data = await Central.getUser(userID, type, instID);
        if (data.message !== debugEnum.SUCCESS)
        {
            return null;
        }
        else 
        {
            return data.user!.resolved_tickets;
        }
    }   
}