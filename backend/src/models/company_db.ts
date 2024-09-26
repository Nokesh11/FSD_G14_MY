import { Collection, Document, ObjectId} from "mongodb";
import { debugEnum } from "../shared";
import { Central } from "./central_db";
import { AuthDB } from "./auth_db";

const INST_MAIN_HEADER = "__MAIN__";

export class Company 
{
    private static authCol : Collection<Document> | null ;
    public static async init() : Promise<debugEnum>
    {
        const res = await Central.getCol(INST_MAIN_HEADER, "auth");
        if (res.message !== debugEnum.SUCCESS)
        {
            return res.message;
        }
        Company.authCol = res.col;
        return debugEnum.SUCCESS;
    }

    static async addInst (mail : string, password : string, instID : string) : Promise<debugEnum>
    {
        // Currently ttl set to 1 day by default
        const res = await Central.createInst(instID);
        if ( res !== debugEnum.SUCCESS )
        {
            return res;
        }   
        Company.authCol!.insertOne({_id : new ObjectId(instID), passHash : AuthDB.hash(password)});
        return debugEnum.SUCCESS
    }
} 