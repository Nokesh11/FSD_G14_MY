import crypto from 'crypto';
import { userType } from '../shared';
import { TOKEN_CHAR_SET, TOKEN_LENGTH, SALT, SALTING_ROUNDS } from '../config';
import { Db, Collection, ObjectId, Document, Admin } from 'mongodb';
import { Central } from './central';
import { debugEnum } from '../shared';

export enum powerType {CREATE_USER, DELETE_USER, CHANGE_PASSWORD, GIVE_POWERS, GIVE_ATTENDANCE, VIEW_ATTENDANCE};

export class AuthDB 
{
 
    public static async verifyCreds (userID: string, password: string, type: userType, instID: string): Promise<debugEnum>
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
        const passHash = AuthDB.hash(password);
        const user = await col.findOne({_id : new ObjectId(userID), passHash : passHash}); 

        if (user === null)
        {
            return debugEnum.INVALID_CREDENTIALS;
        }

        return debugEnum.SUCCESS;
    };

    public static async verifyToken ( userID: string, token: string, type: userType, instID : string ): Promise<debugEnum>
    {
        const instDB = await Central.getInstDB(instID);
        if (instDB === null)
        {
            return debugEnum.INVALID_INST_ID;
        }
        const tokenHash = AuthDB.hash(token);
        const tokenDoc = await instDB.token_col.findOne({_id: new ObjectId (tokenHash), 'userID': userID});

        if (token === null)
        {
            return debugEnum.INVALID_TOKEN;
        }
        return debugEnum.SUCCESS;
    };

    private static genToken(): string
    {
        let token = "";
        for (let i = 0 ; i < TOKEN_LENGTH ; i++)
            token += TOKEN_CHAR_SET.charAt(Math.floor(Math.random() * TOKEN_CHAR_SET.length));
        return token;
    }

    // Returns null if usertype or the user does not exist, else sets token and returns token
    public static async setToken (userID : string, type : userType, instID : string): Promise<string | null>
    {
        const instDB = await Central.getInstDB(instID)
        if (instDB === null)
        {
            return null;
        }
        const col = Central.getCol(type, instDB);
        if ( col === null)
        {
            return null;
        }
        const user = await Central.getUser(userID, col);
        if (user === null)
        {
            return null;
        }
        while ( true )
        {
            const token_hash = AuthDB.hash(AuthDB.genToken());
            const token_doc = await instDB.token_col.findOne({_id : new ObjectId(token_hash)});
            if (token_doc === null)
            {
                await instDB.token_col.insertOne({_id : new ObjectId(token_hash), userID : userID});
                return token_hash;
            }
        }
    }

    private static hash(input: string) : string 
    {        
        return crypto.pbkdf2Sync(input, SALT, SALTING_ROUNDS, 64, 'sha512').toString('hex');
    }

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
        const user = Central.getUser(userID, col)
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
        const user = Central.getUser(userID, col)
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
}