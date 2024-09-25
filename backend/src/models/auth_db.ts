import crypto from 'crypto';
import { userType } from '../shared';
import { TOKEN_CHAR_SET, TOKEN_LENGTH, SALT, SALTING_ROUNDS } from '../config';
import { Db, Collection, ObjectId, Document, Admin } from 'mongodb';
import { Central } from './central_db';
import { debugEnum } from '../shared';


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

    public static hash(input: string) : string 
    {        
        return crypto.pbkdf2Sync(input, SALT, SALTING_ROUNDS, 64, 'sha512').toString('hex');
    }
}