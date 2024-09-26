import { ObjectId, PushOperator, PullOperator} from 'mongodb';
import { Central } from './central_db';
import { admin_type, debugEnum } from '../shared';
import { UserTree, ColTree } from './central_db';

const COURSE_HEADER_ID = "__MAIN__";

// QAE stands for Quiz, Assignment, Exam
interface QAEHeader {
    name: string;
    maxMarks: number;
}

interface CourseHeaderDocument {
    quizzes: Array<QAEHeader>;
    assignments : Array<QAEHeader>;
    exams : Array<QAEHeader>;
}

interface QAEStudent
{
    name: string;
    marks: number;
}

interface CourseStudentDocument 
{
    quizzes: Array<QAEStudent>;
    assignments : Array<QAEStudent>;
    exams : Array<QAEStudent>;
}

export class getCoursesRes 
{
    public courses : Array<string> | null;
    public message : debugEnum;
    constructor()
    {
        this.courses = null;
        this.message = debugEnum.INVALID_INST_ID;
    }
}

export class CourseDB
{
    static async getCourses (userId : string, instID : string, type : string): Promise <getCoursesRes>
    {
        let returnObj = new getCoursesRes();
        const data = await Central.getUser(userId, type, instID);
        if (data.message !== debugEnum.SUCCESS)
        {
            returnObj.message = data.message;
            return returnObj;
        }
        const user = data.user;
        returnObj.message = debugEnum.SUCCESS; 
        if (type === admin_type)
        {
            returnObj.courses = user!.courses;  
            return returnObj;
        }
        else 
        {
            returnObj.courses = user!.courses[user!.curSem];
            return returnObj;
        }
    }

    static async createCourse (courseName : string, year : number, section : string, instID : string)
    {
        const courseID =  `${courseName}-${section}-${year}`;
        const res = await Central.getCol(instID, courseID);
        if (res.message === debugEnum.COL_DOES_NOT_EXIST)
        {
            const col = Central.mongoClient.db(instID).collection(courseID);
            await col.insertOne({
                _id : new ObjectId(COURSE_HEADER_ID),
                teaching_faculty_id : "",

                // Currently not supporting cutom names for quizzes and exams.
                // Max marks of quizzes that happened 
                quizzes : [],
                // Max marks of assignments that happened
                assignments : [],
                // max marks of exams that happened
                exams : [],
                // Month names, each month will be an attribute with value as an array of dates
                attendance : [],
            });
            Central.mongoClient.db(instID).createCollection(courseID);
        }
        else
        {
            return res;
        }
    }

    // Have to rethink if this is gonna break database.
    // Most probabably it will break the db....
    static async deleteCourse (courseName : string, year : number, section : string, instID : string)
    {
        const courseID = courseName + '-' + section + '-' + year;
        const res = await Central.getCol(instID, courseID);
        if (res.message === debugEnum.SUCCESS)
        {
            Central.mongoClient.db(instID).dropCollection(courseID);
            return debugEnum.SUCCESS;
        }
        else
        {
            return res;
        }
    }

    // static async addStudent (courseName : string, year : number, section : string, studentID : string, instID : string)
    // {
    //     const courseID = courseName + '-' + section + '-' + year;
    //     const res = await Central.getCol(instID, courseID);
    //     if (res === debugEnum.COL_DOES_NOT_EXIST)
    //     {
    //         return debugEnum.COL_DOES_NOT_EXIST;
    //     }
    //     const col = Central.mongoClient.db(instID).collection(courseID);
    //     const student = await Central.getUser(studentID, 0, instID);
    //     if (student.message !== debugEnum.SUCCESS)
    //     {
    //         return student.message;
    //     }
    //     await col.insertOne({_id : studentID, name : student.user!.name});
    //     return debugEnum.SUCCESS;
    // }

    static async assignTeachingFaculty (courseName : string, year : number, section : string, facultyID : string, instID : string): Promise<debugEnum>
    {
        let res: ColTree | UserTree ;
        res = await Central.getUser(facultyID, admin_type, instID);
        if (res.message !== debugEnum.SUCCESS)
        {
            return res.message;
        }
        const courseID = courseName + '-' + section + '-' + year;
        res = await Central.getCol(instID, courseID);
        if (res.message !== debugEnum.SUCCESS)
        {
            return res.message;
        }
        const col = res.col;
        await col!.updateOne({_id : new ObjectId(COURSE_HEADER_ID)}, {$set : {teaching_faculty_id : facultyID}});
        return debugEnum.SUCCESS;
    }

    static async addQuiz(courseName: string, year: number, section: string, quizID: string, maxMarks: number, instID: string): Promise<debugEnum> 
    {
        const courseID = `${courseName}-${section}-${year}`;
        const headerID = new ObjectId(COURSE_HEADER_ID);
        const res = await Central.getUser(COURSE_HEADER_ID, courseID, instID);
        
        if (res.message !== debugEnum.SUCCESS) {
            return res.message;
        }
    
        const headerDoc = res.user as CourseHeaderDocument;
        const col = res.col;
    
        if (headerDoc!.quizzes.some(quiz => quiz.name === quizID)) 
        {
            return debugEnum.QUIZ_ALREADY_EXISTS;
        }
    
        // Add the quiz to the header document
        await col!.updateOne(
            { _id: headerID },
            { $push: { quizzes: { name: quizID, maxMarks: maxMarks } } as PushOperator<Document>  }
        );
    
        // Update all other documents to add the quiz
        const studentDocs = await col!.find().toArray();
        const updatePromises = studentDocs
            .filter(doc => doc._id !== headerID) // Filter out the header document
            .map(doc => 
                col!.updateOne(
                    { _id: doc._id }, 
                    { $push: { quizzes: { name: quizID, marks: 0 } } as PushOperator<Document> } 
                )
            );
    
        await Promise.all(updatePromises); // Wait for all updates to complete
    
        return debugEnum.SUCCESS;
    }

    static async addAssignment (courseName : string, year : number, section : string, assignmentID : string, maxMarks : number, instID : string): Promise<debugEnum> 
    {
        const courseID = `${courseName}-${section}-${year}`;
        const headerID = new ObjectId(COURSE_HEADER_ID);
        const res = await Central.getUser(COURSE_HEADER_ID, courseID, instID);
        
        if (res.message !== debugEnum.SUCCESS) {
            return res.message;
        }
    
        const headerDoc = res.user;
        const col = res.col;
    
        // Check if the assignment already exists
        for (let assignment of headerDoc!.assignments)
        {
            if (assignment.name === assignmentID)
            {
                return debugEnum.QUIZ_ALREADY_EXISTS;
            }
        }
    
        // Add the assignment to the header document
        await col!.updateOne(
            { _id: headerID },
            { $push: { assignments: { name: assignmentID, maxMarks: maxMarks } } as PushOperator<Document> }
        );
    
        // Update all other documents to add the assignment
        const studentDocs = await col!.find().toArray();
        const updatePromises = studentDocs
            .filter(doc => doc._id !== headerID) // Filter out the header document
            .map(doc => 
                col!.updateOne(
                    { _id: doc._id }, 
                    { $push: { assignments: { name: assignmentID, marks: 0 } } as PushOperator<Document> } // Use correct structure
                )
            );
    
        await Promise.all(updatePromises); // Wait for all updates to complete
    
        return debugEnum.SUCCESS;
    }

    static async addExam (courseName : string, year : number, section : string, examID : string, maxMarks : number, instID : string): Promise<debugEnum>
    {
        const courseID = `${courseName}-${section}-${year}`;
        const headerID = new ObjectId(COURSE_HEADER_ID);
        const res = await Central.getUser(COURSE_HEADER_ID, courseID, instID);
        
        if (res.message !== debugEnum.SUCCESS) {
            return res.message;
        }
    
        const headerDoc = res.user;
        const col = res.col;
    
        // Check if the exam already exists
        for (let exam of headerDoc!.exams)
        {
            if (exam.name === examID)
            {
                return debugEnum.QUIZ_ALREADY_EXISTS;
            }
        }
    
        // Add the exam to the header document
        await col!.updateOne(
            { _id: headerID },
            { $push: { exams: { name: examID, maxMarks: maxMarks } } as PushOperator<Document> }
        );
    
        // Update all other documents to add the exam
        const studentDocs = await col!.find().toArray();
        const updatePromises = studentDocs
            .filter(doc => doc._id !== headerID) // Filter out the header document
            .map(doc => 
                col!.updateOne(
                    { _id: doc._id }, 
                    { $push: { exams: { name: examID, marks: 0 } } as PushOperator<Document> } 
                )
            );
    
        await Promise.all(updatePromises); // Wait for all updates to complete
    
        return debugEnum.SUCCESS;
    }

    // Gotta remove these from student records too...
    static async deleteExam (courseName : string, year : number, section : string, examID : string, instID : string): Promise<debugEnum>
    {
        const courseID = `${courseName}-${section}-${year}`;
        const res = await Central.getUser(COURSE_HEADER_ID, courseID, instID);
        const headerID = new ObjectId(COURSE_HEADER_ID);
        if (res.message !== debugEnum.SUCCESS)
        {
            return res.message;
        }
        const col = res.col;
        const updatedCount = await col!.updateOne({_id : headerID}, { $pull : {exams : {name : examID} } as PullOperator<Document>} );
        if (updatedCount.modifiedCount === 0)
        {
            return debugEnum.EXAM_DOES_NOT_EXIST;
        }
        const studentDocs = await col!.find().toArray();
        const updatePromises = studentDocs
            .filter(doc => doc._id !== headerID) // Filter out the header document
            .map(doc => 
                col!.updateOne(
                    { _id: doc._id }, 
                    { $pull : {exams : {name : examID} } as PullOperator<Document> } 
                )
            );
        await Promise.all(updatePromises);
        return debugEnum.SUCCESS;
    }
    
    static async deleteQuiz (courseName : string, year : number, section : string, quizID : string, instID : string): Promise<debugEnum>
    {
        const courseID = `${courseName}-${section}-${year}`;
        const res = await Central.getUser(COURSE_HEADER_ID, courseID, instID);
        const headerID = new ObjectId(COURSE_HEADER_ID);
        if (res.message !== debugEnum.SUCCESS)
        {
            return res.message;
        }
        const col = res.col;
        const updatedCount = await col!.updateOne({_id : headerID}, { $pull : {quizzes : {name : quizID} } as PullOperator<Document>} );
        if (updatedCount.modifiedCount === 0)
        {
            return debugEnum.QUIZ_DOES_NOT_EXIST;
        }

        const studentDocs = await col!.find().toArray();
        const updatePromises = studentDocs
            .filter(doc => doc._id !== headerID) // Filter out the header document
            .map(doc => 
                col!.updateOne(
                    { _id: doc._id }, 
                    { $pull : {quizzes : {name : quizID} } as PullOperator<Document> } 
                )
            );
        await Promise.all(updatePromises);
        return debugEnum.SUCCESS;
    }

    static async deleteAssignment (courseName : string, year : number, section : string, assignmentID : string, instID : string): Promise<debugEnum>
    {
        const courseID = `${courseName}-${section}-${year}`;
        const res = await Central.getUser(COURSE_HEADER_ID, courseID, instID);
        const headerID = new ObjectId(COURSE_HEADER_ID);
        if (res.message !== debugEnum.SUCCESS)
        {
            return res.message;
        }
        const col = res.col;
        const updatedCount = await col!.updateOne({_id : headerID}, { $pull : {assignments : {name : assignmentID} } as PullOperator<Document>} );
        if (updatedCount.modifiedCount === 0)
        {
            return debugEnum.ASSIGNMENT_DOES_NOT_EXIST;
        }
        const studentDocs = await col!.find().toArray();
        const updatePromises = studentDocs
            .filter(doc => doc._id !== headerID) // Filter out the header document
            .map(doc => 
                col!.updateOne(
                    { _id: doc._id }, 
                    { $pull : {assignments : {name : assignmentID} } as PullOperator<Document> } 
                )
            );
        await Promise.all(updatePromises);
        return debugEnum.SUCCESS;
    }

    static async editQuizScore (courseName : string, year : number, section : string, quizID : string, studentID : string, score : number, instID : string): Promise<debugEnum>
    {
        const courseID = `${courseName}-${section}-${year}`;
        const res = await Central.getUser(COURSE_HEADER_ID, courseID, instID);
        if (res.message !== debugEnum.SUCCESS)
        {
            return res.message;
        }
        const col = res.col;
        const headerDoc = res.user as CourseHeaderDocument;
        const quizIndex = headerDoc!.quizzes.findIndex(quiz => quiz.name === quizID);
        if (quizIndex === -1) 
        {
            return debugEnum.QUIZ_DOES_NOT_EXIST; // Quiz doesn't exist
        }

        const data = await Central.getUser(studentID, courseID, instID);
        if (data.message !== debugEnum.SUCCESS)
        {
            return data.message;
        }
        const student = data.user;
        let quizzes = student!.quizzes;
        quizzes[quizIndex] = score;
        await col!.updateOne({_id : new ObjectId(studentID)}, { $set : {quizzes : quizzes}});
        return debugEnum.SUCCESS;
    }

    static async editAssignmentScore (courseName : string, year : number, section : string, assignmentID : string, studentID : string, score : number, instID : string): Promise<debugEnum>
    {
        const courseID = `${courseName}-${section}-${year}`;
        const res = await Central.getUser(COURSE_HEADER_ID, courseID, instID);
        if (res.message !== debugEnum.SUCCESS)
        {
            return res.message;
        }
        const col = res.col;
        const headerDoc = res.user as CourseHeaderDocument;
        const assignmentIndex = headerDoc!.assignments.findIndex(assignment => assignment.name === assignmentID);
        if (assignmentIndex === -1) {
            return debugEnum.ASSIGNMENT_DOES_NOT_EXIST; // Assignment doesn't exist
        }
        const data = await Central.getUser(studentID, courseID, instID);
        if (data.message !== debugEnum.SUCCESS)
        {
            return data.message;
        }
        const student = data.user;
        let assignments = student!.assignments;
        assignments[assignmentIndex] = score;
        await col!.updateOne({_id : new ObjectId(studentID)}, { $set : {assignments : assignments}});
        return debugEnum.SUCCESS;
    }

    static async editExamScore (courseName : string, year : number, section : string, examID : string, studentID : string, score : number, instID : string): Promise<debugEnum>
    {
        const courseID = `${courseName}-${section}-${year}`;
        const res = await Central.getUser(COURSE_HEADER_ID, courseID, instID);
        if (res.message !== debugEnum.SUCCESS)
        {
            return res.message;
        }
        const col = res.col;
        const headerDoc = res.user as CourseHeaderDocument;
        const examIndex = headerDoc!.exams.findIndex(exam => exam.name === examID);
        if (examIndex === -1) {
            return debugEnum.EXAM_DOES_NOT_EXIST; // Exam doesn't exist
        }
        const data = await Central.getUser(studentID, courseID, instID);
        if (data.message !== debugEnum.SUCCESS)
        {
            return data.message;
        }
        const student = data.user;
        let exams = student!.exams;
        exams[examIndex] = score;
        await col!.updateOne({_id : new ObjectId(studentID)}, { $set : {exams : exams}});
        return debugEnum.SUCCESS;
    }

    // static async addAttendanceDate (courseName : string, year : number, section : string, month : string, date : number, instID : string): Promise<debugEnum>
    // {
    //     const courseID = `${courseName}-${section}-${year}`;
    //     const res = await Central.getUser(COURSE_HEADER_ID, courseID, instID);
    //     if (res.message !== debugEnum.SUCCESS)
    //     {
    //         return res.message;
    //     }
    //     const col = res.col;
    //     const headerDoc = res.user as CourseHeaderDocument;
    //     const attendance = headerDoc!.attendance;
    //     if (attendance.some(att => att[month] !== undefined))
    //     {
    //         return debugEnum.ATTENDANCE_DATE_ALREADY_EXISTS;
    //     }
    //     let newAttendance = {};
    //     newAttendance[month] = [date];
    //     await col!.updateOne({_id : new ObjectId(COURSE_HEADER_ID)}, { $push : {attendance : newAttendance}});
    //     return debugEnum.SUCCESS;
    // }
}