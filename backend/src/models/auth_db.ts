import crypto from 'crypto';
import { powerType } from '../shared';
import { TOKEN_CHAR_SET, TOKEN_LENGTH, SALT, SALTING_ROUNDS } from '../config';
import {ObjectId } from 'mongodb';
import { Central } from './central_db';
import { debugEnum } from '../shared';

export class VerifyRes 
{
    public token : string | null;
    public message : debugEnum;
    public powers : Array<powerType> | null;
    constructor(message: debugEnum, token: string | null, powers : Array<powerType> | null) 
    {
        this.token = token;
        this.message = message;
        this.powers = powers;
    }
}

export class setTokenRes
{
    public token : string | null;
    public message : debugEnum;
    constructor(token : string | null , message : debugEnum)
    {
        this.token = token;
        this.message = message;
    }
}

export class AuthDB 
{
 
    public static async verifyCreds (userID: string, password: string, type: string, instID: string): Promise<VerifyRes>
    {
        let returnObj = new VerifyRes(debugEnum.SUCCESS, null, null);
        const data = await Central.getCol(type, instID);
        if (data.message !== debugEnum.SUCCESS)
        {
            returnObj.message = data.message;
            return returnObj;
        }
        const col = data.col;
        const passHash = AuthDB.hash(password);
        const user = await col!.findOne({_id : new ObjectId(userID), passHash : passHash}); 

        if (user === null)
        {
            returnObj.message = debugEnum.INVALID_CREDENTIALS;
            return returnObj;
        }
        const tokenSetRes = await AuthDB.setToken(userID, type, instID);
        if (tokenSetRes.message !== debugEnum.SUCCESS)
        {
            returnObj.message = tokenSetRes.message;
            return returnObj;
        }
        returnObj.powers = user.powers;
        returnObj.token = tokenSetRes.token;
        return returnObj;
    };

    public static async verifyToken ( userID: string, token: string, type: string, instID : string ): Promise<VerifyRes>
    {
        let returnObj = new VerifyRes(debugEnum.SUCCESS, null, null);
        const data = await Central.getUser(userID, type, instID);
        if (data.message !== debugEnum.SUCCESS)
        {
            returnObj.message = data.message;
            return returnObj;
        }
        const instDB = data.instDB;
        const tokenHash = AuthDB.hash(token);
        const tokenDoc = await instDB!.token_col.findOne({_id: new ObjectId (tokenHash), 'userID': userID});

        if (tokenDoc === null)
        {
            returnObj.message = debugEnum.INVALID_TOKEN;
            return returnObj;
        }

        returnObj.powers = data.user!.powers;
        return returnObj;
    };

    private static genToken(): string
    {
        let token = "";
        for (let i = 0 ; i < TOKEN_LENGTH ; i++)
            token += TOKEN_CHAR_SET.charAt(Math.floor(Math.random() * TOKEN_CHAR_SET.length));
        return token;
    }

    // Have to set expiry for the token here ...
    public static async setToken (userID : string, type : string, instID : string): Promise<setTokenRes>
    {
        let returnObj = new setTokenRes(null, debugEnum.SUCCESS);
        const data = await Central.getUser(userID, type, instID);
        if (data.message !== debugEnum.SUCCESS)
        {
            returnObj.message = data.message;
            return returnObj;
        }
        else 
        {
            while ( true )
            {
                const token = AuthDB.genToken();
                const tokenHash = AuthDB.hash(token);
                const tokenDoc = await data.instDB!.token_col.findOne({_id : new ObjectId(tokenHash)});
                if (tokenDoc === null)
                {
                    // Automatically delete this document after a certain time.
                    await data.instDB!.token_col.insertOne({_id : new ObjectId(tokenHash), 
                                                            userID : userID, 
                                                            createdAt : new Date()});
                    returnObj.token = token;
                    return returnObj;
                }
            }
        }
    }

    public static hash(input: string) : string 
    {        
        return crypto.pbkdf2Sync(input, SALT, SALTING_ROUNDS, 64, 'sha512').toString('hex');
    }
}