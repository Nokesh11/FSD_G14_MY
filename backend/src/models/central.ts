import { Db, Collection, Document, MongoClient, ObjectId} from 'mongodb';
import { MONGO_URL } from '../config'
import { userType } from '../shared';

export class Central
{
    private static mongoClient : MongoClient;
    private db : Db;
    public student_col : Collection;
/*
    _id : string, (User ID)
    passHash : string,
*/
    public admin_col : Collection;
/*
    _id : string (User ID)
    passHash : string
*/
    public ticket_col : Collection;
/*
    _id : string (ticket ID)
*/
    public token_col : Collection;
/*  
    _id : string (token ID)
    userID : string
*/
    public config_col : Collection;
    public config_doc : Document;

    constructor(db : Db)
    {
        this.db = db;
        this.student_col = db.collection('student');
        this.admin_col = db.collection('admin');
        this.ticket_col = db.collection('ticket');
        this.token_col = db.collection('token');
        this.config_col = db.collection('config');
        this.config_doc = db.collection('config_doc');
    }

    public static async init() : Promise<void>
    {
        Central.mongoClient =  new MongoClient.MongoClient(MONGO_URL);
        await Central.mongoClient.connect();
        console.log("DB ")
    }

    public static async getInstDB(instID : string) : Promise<Central | null>
    {
        const databasesList = await Central.mongoClient.db().admin().listDatabases();

        // For now do not use cache, just fetch the obj every single time..
        if (databasesList.databases.some(db => db.name === instID) == true )
        {
            return new Central(Central.mongoClient.db(instID));
        }
        else 
        {
            return null;
        }
    }
    
    // Reutrns null if the user type is invalid, else returns the collection
    public static getCol(type : userType, instDB : Central) : Collection<Document> | null 
    {
        switch (type)
        {
            case userType.STUDENT:
                return instDB.student_col;
            case userType.ADMIN:
                return instDB.admin_col
            default:
                return null;
        }
    }

    public static async getUser (userID: string, col : Collection <Document>): Promise <Document | null>
    {
        return await col.findOne({_id : new ObjectId(userID)});
    }
}
