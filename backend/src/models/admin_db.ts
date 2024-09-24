import { userType } from '../shared';
import { ObjectId } from 'mongodb';
import { Central } from './central_db';
import { debugEnum, powerType } from '../shared';
import { AuthDB } from './auth_db';

export class AdminDB{
    // Returns false if usertype or user does not exist, else returns true
    static async changePassword (userID: string, password: string, type: userType, instID: string): Promise<debugEnum>
    {
        const instDB = await Central.getInstDB(instID);
        if (instDB === null)
        {
            return debugEnum.INVALID_INST_ID;
        }
        const col = Central.getCol(type, instDB);
        if (col === null)
        {
            return debugEnum.INVALID_USER_TYPE;
        }
        const user = Central.getUser(userID, col)
        if (user === null)
        {
            return debugEnum.INVALID_USER_ID;
        }
        const passHash = AuthDB.hash(password);
        const res = await col.updateOne({_id : new ObjectId(userID)}, {$set : {passHash : passHash}});
        if (res.modifiedCount === 0)
        {
            return debugEnum.INVALID_USER_ID;
        }
        return debugEnum.SUCCESS;
    }

    // Returns false if usertype does not exist or user already exists, else returns true
    static async createUser (userID: string, password: string, type: userType, instID : string): Promise<debugEnum>
    {
        const instDB = await Central.getInstDB(instID);
        if (instDB === null)
        {
            return debugEnum.INVALID_INST_ID;
        }
        const col = Central.getCol(type, instDB);
        if (col === null)
        {
            return debugEnum.INVALID_USER_TYPE;
        }
        const user = Central.getUser(userID, col)
        if (user !== null)
        {
            return debugEnum.USER_ALREADY_EXISTS;
        }
        const passHash = AuthDB.hash(password);
        await col.insertOne({_id : new ObjectId(userID), passHash : passHash});
        return debugEnum.SUCCESS;
    }

    // Returns false if usertype does not exist or user does not exist, else returns true
    static async deleteUser (userID: string, type : userType, instID : string): Promise<debugEnum>
    {        
        const instDB = await Central.getInstDB(instID);
        if (instDB === null)
        {
            return debugEnum.INVALID_INST_ID;
        }
        const col = Central.getCol(type, instDB);
        if (col === null)
        {
            return debugEnum.INVALID_USER_TYPE;
        }
        const user = Central.getUser(userID, col)
        if (user === null)
        {
            return debugEnum.INVALID_USER_ID;
        }
        await col.deleteOne({_id : new ObjectId(userID)});
        return debugEnum.SUCCESS;
    }

    static async deleteToken (token: string, instDB: Central): Promise<debugEnum>
    {
        const res = await instDB.ticket_col.deleteOne({_id : new ObjectId(token)});
        if (res.deletedCount === 0)
        {
            return debugEnum.INVALID_TOKEN;
        }
        return debugEnum.SUCCESS;
    }

    static async givePowers (userID: string, type : userType, instID : string, power: powerType): Promise<debugEnum>
    {
        const instDB = await Central.getInstDB(instID);
        if (instDB === null)
        {
            return debugEnum.INVALID_INST_ID;
        }
        const col = Central.getCol(type, instDB);
        if (col === null)
        {
            return debugEnum.INVALID_USER_TYPE;
        }
        const user = await Central.getUser(userID, col)
        if (user === null)
        {
            return debugEnum.INVALID_USER_ID;
        }
        let powers = user.powers;
        powers.push(power);
        await col.updateOne({_id : new ObjectId(userID)}, {$set : {power : powers}});
        return debugEnum.SUCCESS;
    }

    static async removePowers (userID: string, type: userType, power: powerType, instID: string ): Promise<debugEnum>
    {
        const instDB = await Central.getInstDB(instID);
        if (instDB === null)
        {
            return debugEnum.INVALID_INST_ID;
        }
        const col = Central.getCol(type, instDB);
        if (col === null)
        {
            return debugEnum.INVALID_USER_TYPE;
        }
        const user = await Central.getUser(userID, col)
        if (user === null)
        {
            return debugEnum.INVALID_USER_ID;
        }

        let powers = user.power;
        const index = powers.indexOf(power);
        if (index === -1)
        {
            return debugEnum.POWER_DOES_NOT_EXIST;
        }
        powers.splice(index, 1);
        await col.updateOne({_id : new ObjectId(userID)}, {$set : {power : powers}});
        return debugEnum.SUCCESS;
    }

    static async assignCourses (userID: string, type: userType, courses : Array<string>, instID: string): Promise<debugEnum>
    {
        const instDB = await Central.getInstDB(instID);
        if (instDB === null)
        {
            return debugEnum.INVALID_INST_ID;
        }
        const col = Central.getCol(type, instDB);
        if (col === null)
        {
            return debugEnum.INVALID_USER_TYPE;
        }
        const user = await Central.getUser(userID, col)
        if (user === null)
        {
            return debugEnum.INVALID_USER_ID;
        }
        await col.updateOne({_id : new ObjectId(userID)}, {$set : {courses : courses}});
        return debugEnum.SUCCESS;
    }
}