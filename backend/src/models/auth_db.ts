import crypto from 'crypto';
import { userType } from '../shared';
import { TOKEN_CHAR_SET, TOKEN_LENGTH, SALT, SALTING_ROUNDS } from '../config';
import { Db, Collection, ObjectId, Document } from 'mongodb';

export enum verifyCredsResult {INVALID_CREDENTIALS, VALID_CREDENTIALS, INVALID_USER_TYPE};
export enum verifyTokenResult {INVALID_TOKEN, VALID_TOKEN, INVALID_USER_TYPE};
export enum powerType {CREATE_USER, DELETE_USER, CHANGE_PASSWORD, GIVE_POWERS, GIVE_ATTENDANCE, VIEW_ATTENDANCE};

interface getUserResult 
{
    col: Collection <Document>;
    userDoc: Document | null;
}
export class AuthDB 
{
    static db : Db ;
    static student_col : Collection;
    static admin_col : Collection;

    static init(db : Db) : void
    {   
        AuthDB.db = db;
        AuthDB.student_col = db.collection('student');
        AuthDB.admin_col = db.collection('admin');
    }

    // Reutrns null if the user type is invalid, else returns the collection
    static async getCol(type: userType) : Promise<Collection | null> 
    {
        switch (type)
        {
            case userType.STUDENT:
                return this.student_col;
            case userType.ADMIN:
                return this.admin_col;
            default:
                return null;
        }
    }

    static async getUser (userID: string, type: userType): Promise< getUserResult | null>
    {
        const col = await this.getCol(type);
        if (col === null)
        {
            return null;
        }
        return {col : col , userDoc : await col.findOne({_id : new ObjectId(userID)})};
    }

    static async verifyCreds (userID: string, password: string, type: userType ): Promise<verifyCredsResult>
    {
        const col = await this.getCol(type);
    
        if (col === null)
        {
            return verifyCredsResult.INVALID_USER_TYPE;
        }
        const passHash = this.hash(password);
        const userDoc = await col.findOne({_id : new ObjectId(userID), passHash : passHash}); 

        if (userDoc === null)
        {
            return verifyCredsResult.INVALID_CREDENTIALS;
        }

        return verifyCredsResult.VALID_CREDENTIALS;
    };

    static async verifyToken ( userID: string, token: string, type: userType ): Promise<verifyTokenResult>
    {
        const col = await this.getCol(type);
        if (col === null)
        {
            return verifyTokenResult.INVALID_USER_TYPE;
        }

        const tokenDoc = await col.findOne({_id: new ObjectId (token), 'userID': userID});

        if (tokenDoc === null)
        {
            return verifyTokenResult.INVALID_TOKEN;
        }
        return verifyTokenResult.VALID_TOKEN;
    };

    static genToken(): string
    {
        let token = "";
        for (let i = 0 ; i < TOKEN_LENGTH ; i++)
            token += TOKEN_CHAR_SET.charAt(Math.floor(Math.random() * TOKEN_CHAR_SET.length));
        return token;
    }

    // Returns null if usertype does not exist, else sets token and returns token
    // Note : This function does not validate if a user id exists. It only sets the token.
    static async setToken (userID: string, type: userType): Promise<string | null>
    {
        const col = await this.getCol(type);
        if (col === null)
        {
            return null;
        }
        while ( true )
        {
            const token = this.genToken();
            const token_doc = await col.findOne({_id : new ObjectId(token)});
            if (token_doc === null)
            {
                await col.insertOne({_id : new ObjectId(token), userID : userID});
                return token;
            }
        }
    }

    static hash(input: string) : string 
    {        
        return crypto.pbkdf2Sync(input, SALT, SALTING_ROUNDS, 64, 'sha512').toString('hex');
    }

    // Returns false if usertype or user does not exist, else returns true
    static async changePassword (userID: string, password: string, type: userType): Promise<boolean>
    {
        const col = await this.getCol(type);
        if (col === null)
        {
            return false;
        }
        const passHash = this.hash(password);
        const res = await col.updateOne({_id : new ObjectId(userID)}, {$set : {passHash : passHash}});
        if (res.modifiedCount === 0)
        {
            return false;
        }
        return true;
    }

    // Returns false if usertype does not exist or user already exists, else returns true
    static async createUser (userID: string, password: string, type: userType): Promise<boolean>
    {
        const col = await this.getCol(type);
        if (col === null)
        {
            return false;
        }
        const passHash = this.hash(password);
        const userDoc = await col.findOne({_id : new ObjectId(userID)});
        if (userDoc === null)
        {
            return false;
        }
        await col.insertOne({_id : new ObjectId(userID), passHash : passHash});
        return true;
    }

    // Returns false if usertype does not exist or user does not exist, else returns true
    static async deleteUser (userID: string, type: userType): Promise<boolean>
    {
        const col = await this.getCol(type);
        if (col === null)
        {
            return false;
        }
        const res = await col.deleteOne({_id : new ObjectId(userID)});
        if (res.deletedCount === 0)
        {
            return false;
        }
        return true;
    }

    static async deleteToken (token: string, type: userType): Promise<boolean>
    {
        const col = await this.getCol(type);
        if (col === null)
        {
            return false;
        }
        const res = await col.deleteOne({_id : new ObjectId(token)});
        if (res.deletedCount === 0)
        {
            return false;
        }
        return true;
    }

    static async givePowers (userID: string, type: userType, power: powerType ): Promise<boolean>
    {
        const col = await this.getCol(type);
        if (col === null)
        {
            return false;
        }
        const userDoc = await col.findOne({_id : new ObjectId(userID)});
        if (userDoc === null)
        {
            return false;
        }
        let power_attr = userDoc.power;
        power_attr.push(power);
        await col.updateOne({_id : new ObjectId(userID)}, {$set : {power : power_attr}});
        return true;
    }

    static async removePowers (userID: string, type: userType, power: powerType ): Promise<boolean>
    {
        const col = await this.getCol(type);
        if (col === null)
        {
            return false;
        }
        const userDoc = await col.findOne({_id : new ObjectId(userID)});
        if (userDoc === null)
        {
            return false;
        }
        let power_attr = userDoc.power;
        const index = power_attr.indexOf(power);
        if (index === -1)
        {
            return false;
        }
        power_attr.splice(index, 1);
        await col.updateOne({_id : new ObjectId(userID)}, {$set : {power : power_attr}});
        return true;
    }

}