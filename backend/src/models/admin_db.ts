import { userType } from '../shared';
import { ObjectId } from 'mongodb';
import { Central } from './central_db';
import { debugEnum, powerType } from '../shared';
import { AuthDB } from './auth_db';

export class AdminDB{
    static async changePassword (userID: string, password: string, type: string, instID: string): Promise<debugEnum>
    {
        const data = await Central.getUser(userID, type, instID);
        if (data.message !== debugEnum.SUCCESS)
        {
            return data.message;
        }
        else 
        {        
            const col = data.col;
            const passHash = AuthDB.hash(password);
            await col!.updateOne({_id : new ObjectId(userID)}, {$set : {passHash : passHash}});
            return debugEnum.SUCCESS;
        }
    }

    // Returns false if usertype does not exist or user already exists, else returns true
    static async createUser (userID: string, password: string, type: string, instID : string): Promise<debugEnum>
    {
        const data = await Central.getUser(userID, type, instID);

        if (data.message === debugEnum.INVALID_USER_ID)
        {
            const passHash = AuthDB.hash(password);
            await data.col!.insertOne({_id : new ObjectId(userID), passHash : passHash});
            return debugEnum.SUCCESS;
        }
        else 
        {
            if (data.message === debugEnum.SUCCESS)
            {
                return debugEnum.USER_ALREADY_EXISTS;
            }
            else 
            {
                return data.message;
            }
        }
    }

    // Returns false if usertype does not exist or user does not exist, else returns true
    static async deleteUser (userID: string, type: string, instID : string): Promise<debugEnum>
    {   
        const data = await Central.getUser(userID, type, instID);
        if (data.message !== debugEnum.SUCCESS)
        {
            return data.message;
        }     
        else 
        {
            await data.col!.deleteOne({_id : new ObjectId(userID)});
            return debugEnum.SUCCESS;
        }
    }

    static async deleteToken (token: string, instDB: Central): Promise<debugEnum>
    {
        const res = await instDB.token_col.deleteOne({_id : new ObjectId(token)});
        if (res.deletedCount === 0)
        {
            return debugEnum.INVALID_TOKEN;
        }
        return debugEnum.SUCCESS;
    }

    static async givePowers (userID: string, type: string, instID : string, power: powerType): Promise<debugEnum>
    {
        const data = await Central.getUser(userID, type, instID);
        if (data.message !== debugEnum.SUCCESS)
        {
            return data.message;
        }
        else 
        {
            let powers = data.user!.powers;
            powers.push(power);
            await data.col!.updateOne({_id : new ObjectId(userID)}, {$set : {powers : powers}});
            return debugEnum.SUCCESS;
        }
    }

    static async removePowers (userID: string, type: string, power: powerType, instID: string ): Promise<debugEnum>
    {
        const data = await Central.getUser(userID, type, instID);
        if (data.message !== debugEnum.SUCCESS)
        {
            return data.message;
        }
        else 
        {
            let powers = data.user!.powers;
            const index = powers.indexOf(power);
            if (index === -1)
            {
                return debugEnum.POWER_DOES_NOT_EXIST;
            }
            powers.splice(index, 1);
            await data.col!.updateOne({_id : new ObjectId(userID)}, {$set : {powers : powers}});
            return debugEnum.SUCCESS;
        }
    }

    // Change curSem courses, dertegister from old cursem courses mentioned.
    // Deregisters only from the courses mentioned in the curSem.
    static async assignCoursesToStudent (userID: string, type: string, courses : Array<string>, instID: string): Promise<debugEnum>
    {
        const data = await Central.getUser(userID, type, instID);
        if (data.message !== debugEnum.SUCCESS)
        {
            return data.message;
        }
        else 
        {
            await data.col!.updateOne({_id : new ObjectId(userID)}, {$set : {courses : courses}});
            return debugEnum.SUCCESS;
        }
    }

    // Deregister from old courses.
    static async assignCoutsesToFaculty (userID: string, type: string, courses : Array<string>, instID: string): Promise<debugEnum>
    {
        const data = await Central.getUser(userID, type, instID);
        if (data.message !== debugEnum.SUCCESS)
        {
            return data.message;
        }
        else 
        {
            await data.col!.updateOne({_id : new ObjectId(userID)}, {$set : {courses : courses}});
            return debugEnum.SUCCESS;
        }
    }
}