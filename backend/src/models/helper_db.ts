import { userType } from "../shared";

export class HelperDB
{
    static db;
    static student_col;
    static admin_col;

    static init(db): void
    {   
        HelperDB.db = db;
        HelperDB.student_col = db.collection('student');
        HelperDB.admin_col = db.collection('admin');
        return ;
    }

    static userExists(userID: string, type: userType): Promise<doc>
    {
        let col: col;

        if (type === userType.STUDENT)
        {
            col = this.student_col;
        }
        else if (type === userType.ADMIN)
        {
            col = this.admin_col;
        }
        else 
        {
            return false;
        }

        const user = col.findOne({"userID" : userID});
        return user;
    }
}