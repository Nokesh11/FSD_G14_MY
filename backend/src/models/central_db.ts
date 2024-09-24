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

    // Courses and sem stuff ..
    curSem : number,
    
    // Each course name will be in the format FDFED-3-2024 (Course Name-Section-Year)
    courses : {semester<number> : Array<Courses<string>>}
    attendance : {semester<number> : {course<string> : Array<boolean>}},
    
    // Currently support only assignments, quizzes and exams, no custom stuff.
    quiz: {semester<number> : {course<string> : Array<number>}},
    exam : {semester<number> : {course<string> : Array<number>}},
    assignmenmt : {semester<number> : {course<string> : Array<number>}},
    
    // Tickets
    active_tickets : Array<strings>,
    resolved_tickets : Array<strings>,

    clusters : Array<string>
*/
    public admin_col : Collection;
/*
    _id : string (User ID)
    passHash : string,
    powers : Array<powerType>,
    clusters : Array<string>,
    active_tickets : Array<strings>,
    resolved_tickets : Array<strings>,
*/
    public ticket_col : Collection;
/*
    _id : string (ticket ID)
    stages : Array<string>
*/
    public token_col : Collection;
/*  
    _id : string (token ID)
    userID : string
*/
    public config_col : Collection;
    public config_doc : Document;

    public cluster_col : Collection;
/* 
    _id : string (Cluster name)
    members : Array<string> (User IDs)
*/

    public courses_col : Collection;
/*
    _id : string (Course ID)
    // For assignments, qizzes, exams, each member of the array
       is in the format 30|Assignment-1 (MaxMarks|Name)
    assignments : Array<string>,
    quizzes : Array<string>,
    exams : Array<string>,

    // For attendance, each member of the array is in the format 
       0824 : [12, 12, 25, 26] August month, 2024 
       Two classes happened on 12, one on 25, one on 26. 
    attendance : { monthYear<String> : Array<date<number>> }
*/

    constructor(db : Db)
    {
        this.db = db;
        this.student_col = db.collection('student');
        this.admin_col = db.collection('admin');
        this.ticket_col = db.collection('ticket');
        this.token_col = db.collection('token');
        this.config_col = db.collection('config');
        this.config_doc = db.collection('config_doc');
        this.cluster_col = db.collection('cluster');
        this.courses_col = db.collection('courses');
    }

    public static async init() : Promise<void>
    {
        Central.mongoClient =  new MongoClient(MONGO_URL);
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
