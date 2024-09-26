import crypto from 'crypto';
import { userType } from '../shared';
import { TOKEN_CHAR_SET, TOKEN_LENGTH, SALT, SALTING_ROUNDS } from '../config';
import { Db, Collection, ObjectId, Document, Admin } from 'mongodb';
import { Central } from './central_db';
import { debugEnum } from '../shared';


export class AuthDB 
{
 
    public static async verifyCreds (userID: string, password: string, type: string, instID: string): Promise<debugEnum>
    {
        const data = await Central.getCol(type, instID);
        if (data.message !== debugEnum.SUCCESS)
        {
            return data.message;
        }
        const col = data.col;
        const passHash = AuthDB.hash(password);
        const user = await col!.findOne({_id : new ObjectId(userID), passHash : passHash}); 

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

    // Have to set expiry for the token here ...
    public static async setToken (userID : string, type : string, instID : string): Promise<string | debugEnum>
    {
        const data = await Central.getUser(userID, type, instID);
        if (data.message !== debugEnum.SUCCESS)
        {
            return data.message;
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
                    await data.instDB!.token_col.insertOne({_id : new ObjectId(tokenHash), userID : userID});
                    return token;
                }
            }
        }
    }

    public static hash(input: string) : string 
    {        
        return crypto.pbkdf2Sync(input, SALT, SALTING_ROUNDS, 64, 'sha512').toString('hex');
    }
}