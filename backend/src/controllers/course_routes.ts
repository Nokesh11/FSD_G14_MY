import express from 'express';
import { Router } from 'express';
import { debugEnum, powerType, student_type } from '../shared';
import cookieSession from 'cookie-session';
import { Request, Response } from 'express';
import { COOKIE_MAX_AGE, COOKIE_SESSION_KEYS } from '../config';
import { CourseDB } from '../models/course_db';
import { Central } from '../models/central_db';

export const app = Router();
app.use(express.json());
app.use(cookieSession({
  name: 'session',
  keys: COOKIE_SESSION_KEYS,
  maxAge: COOKIE_MAX_AGE,
}));


app.post('/edit-attendance', async (req : Request, res : Response) =>
{
    if (req.session!.powers.includes(powerType.EDIT_ATTENDANCE))
    {
        
    }
    else 
    {
        return res.status(401).json({ message: 'You do not have the required permissions.' });
    }
});

app.post('/add-attendance-date', async (req : Request, res : Response) =>
{

});

app.post('/get-attendance', async (req : Request, res : Response) =>
{

});

// Editing quiz, assignment, exam scores
app.post('/edit-quiz-scores', async (req : Request, res : Response) =>
{
    if (req.session!.powers.includes(powerType.EDIT_QUIZ_SCORES) && req.session!.authenticated == true) 
    {
        const { courseName, section, year, studentID, score, quizID } = req.body;
        const instID = req.session!.instID;
        const userID = req.session!.userID;
        let usersCourses = await CourseDB.getCourses(userID, instID, req.session!.type);
        if (usersCourses.message !== debugEnum.SUCCESS)
        {
            return res.status(401).json({ message: usersCourses.message });
        }
        else 
        {
            const courseID =  `${courseName}-${section}-${year}`;
            if (usersCourses.courses!.includes(courseID) == false)
            {
                return res.status(401).json({ message: 'You do not have the required permissions.' });
            }
            else 
            {
                const result = await CourseDB.editQuizScore(courseName, year, section, quizID, studentID, score, instID);
                if (result == debugEnum.SUCCESS)
                {
                    return res.status(200).json({ message: 'Success' });
                }
                else 
                {
                    return res.status(401).json({ message: result });
                }
            }
        }
    }
    else 
    {
        return res.status(401).json({ message: 'You do not have the required permissions.' });
    }
});

app.post('/edit-assignment-scores', async (req : Request, res : Response) =>
{
  if (req.session!.powers.includes(powerType.EDIT_ASSIGNMENT_SCORES) && req.session!.authenticated == true) 
    {
        const { courseName, section, year, studentID, score, assignmenmtID } = req.body;
        const instID = req.session!.instID;
        const userID = req.session!.userID;
        let usersCourses = await CourseDB.getCourses(userID, instID, req.session!.type);
        if (usersCourses.message !== debugEnum.SUCCESS)
        {
            return res.status(401).json({ message: usersCourses.message });
        }
        else 
        {
            const courseID =  `${courseName}-${section}-${year}`;
            if (usersCourses.courses!.includes(courseID) == false)
            {
                return res.status(401).json({ message: 'You do not have the required permissions.' });
            }
            else 
            {
                const result = await CourseDB.editAssignmentScore(courseName, year, section, assignmenmtID, studentID, score, instID);
                if (result == debugEnum.SUCCESS)
                {
                    return res.status(200).json({ message: 'Success' });
                }
                else 
                {
                    return res.status(401).json({ message: result });
                }
            }
        }
    }
    else 
    {
        return res.status(401).json({ message: 'You do not have the required permissions.' });
    }
});

app.post('/edit-exam-scores', async (req : Request, res : Response) =>  
{
  if (req.session!.powers.includes(powerType.EDIT_EXAM_SCORES) && req.session!.authenticated == true) 
    {
        const { courseName, section, year, studentID, score, examID } = req.body;
        const instID = req.session!.instID;
        const userID = req.session!.userID;
        let usersCourses = await CourseDB.getCourses(userID, instID, req.session!.type);
        if (usersCourses.message !== debugEnum.SUCCESS)
        {
            return res.status(401).json({ message: usersCourses.message });
        }
        else 
        {
            const courseID =  `${courseName}-${section}-${year}`;
            if (usersCourses.courses!.includes(courseID) == false)
            {
                return res.status(401).json({ message: 'You do not have the required permissions.' });
            }
            else 
            {
                const result = await CourseDB.editExamScore(courseName, year, section, examID, studentID, score, instID);
                if (result == debugEnum.SUCCESS)
                {
                    return res.status(200).json({ message: 'Success' });
                }
                else 
                {
                    return res.status(401).json({ message: result });
                }
            }
        }
    }
    else 
    {
        return res.status(401).json({ message: 'You do not have the required permissions.' });
    }
});

// Fetch quiz, assignment, exam scores
app.get('/get-quiz-scores', async (req : Request, res : Response) =>
{
    if (req.session!.authenticated == true) 
    {
        const type = req.session!.type;
        if (type !== student_type)
        {
            return res.status(401).json({ message: 'You do not have the required permissions.' });
        }
        const userID = req.session!.userID;
        const instID = req.session!.instID;
        let usersCourses = await CourseDB.getCourses(userID, instID, type);
        if (usersCourses.message !== debugEnum.SUCCESS)
        {
            return res.status(401).json({ message: usersCourses.message });
        }
        const courses = usersCourses.courses;
        let outObj: { [key: string]: any } = {};
        for (const courseID of courses!)
        {
          const data = await Central.getUser(userID, courseID, instID);
          if (data.message !== debugEnum.SUCCESS)
          {
              outObj[courseID] = data.user!.quizzes;
          }
        }
        return res.status(200).json({ message : "Success", data : outObj});
    }
    return res.status(401).json({ message: 'You do not have the required permissions.' });
});


app.get('/get-assignment-scores', async (req : Request, res : Response) =>
{
    if (req.session!.authenticated == true) 
    {
        const type = req.session!.type;
        if (type !== student_type)
        {
            return res.status(401).json({ message: 'You do not have the required permissions.' });
        }
        const userID = req.session!.userID;
        const instID = req.session!.instID;
        let usersCourses = await CourseDB.getCourses(userID, instID, type);
        if (usersCourses.message !== debugEnum.SUCCESS)
        {
            return res.status(401).json({ message: usersCourses.message });
        }
        const courses = usersCourses.courses;
        let outObj: { [key: string]: any } = {};
        for (const courseID of courses!)
        {
          const data = await Central.getUser(userID, courseID, instID);
          if (data.message !== debugEnum.SUCCESS)
          {
              outObj[courseID] = data.user!.assignmenmts;
          }
        }
        return res.status(200).json({ message : "Success", data : outObj});
    }
    return res.status(401).json({ message: 'You do not have the required permissions.' });
});

app.get('/get-exam-scores', async (req : Request, res : Response) =>
{
  if (req.session!.authenticated == true) 
    {
        const type = req.session!.type;
        if (type !== student_type)
        {
            return res.status(401).json({ message: 'You do not have the required permissions.' });
        }
        const userID = req.session!.userID;
        const instID = req.session!.instID;
        let usersCourses = await CourseDB.getCourses(userID, instID, type);
        if (usersCourses.message !== debugEnum.SUCCESS)
        {
            return res.status(401).json({ message: usersCourses.message });
        }
        const courses = usersCourses.courses;
        let outObj: { [key: string]: any } = {};
        for (const courseID of courses!)
        {
          const data = await Central.getUser(userID, courseID, instID);
          if (data.message !== debugEnum.SUCCESS)
          {
              outObj[courseID] = data.user!.exams;
          }
        }
        return res.status(200).json({ message : "Success", data : outObj});
    }
    return res.status(401).json({ message: 'You do not have the required permissions.' });
});

// Adding new quiz, assignment, exam
app.post('/add-quiz', async (req : Request, res : Response) =>
{
    if (req.session!.powers.includes(powerType.ADD_QUIZ) && req.session!.authenticated == true) 
    {
        const { courseName, section, year, quizID, maxScore } = req.body;
        const instID = req.session!.instID;
        const userID = req.session!.userID;
        let usersCourses = await CourseDB.getCourses(userID, instID, req.session!.type);
        if (usersCourses.message !== debugEnum.SUCCESS)
        {
            return res.status(401).json({ message: usersCourses.message });
        }
        else 
        {
            const courseID =  `${courseName}-${section}-${year}`;
            if (usersCourses.courses!.includes(courseID) == false)
            {
                return res.status(401).json({ message: 'You do not have the required permissions.' });
            }
            else 
            {
                const result = await CourseDB.addQuiz(courseName, year, section, quizID, maxScore, instID);
                if (result == debugEnum.SUCCESS)
                {
                    return res.status(200).json({ message: 'Success' });
                }
                else 
                {
                    return res.status(401).json({ message: result });
                }
            }
        }
    }
    else 
    {
        return res.status(401).json({ message: 'You do not have the required permissions.' });
    }
});

app.post('/add-assignment', async (req : Request, res : Response) =>
{
    if (req.session!.powers.includes(powerType.ADD_QUIZ) && req.session!.authenticated == true) 
    {
        const { courseName, section, year, assignmenmtID, maxScore } = req.body;
        const instID = req.session!.instID;
        const userID = req.session!.userID;
        let usersCourses = await CourseDB.getCourses(userID, instID, req.session!.type);
        if (usersCourses.message !== debugEnum.SUCCESS)
        {
            return res.status(401).json({ message: usersCourses.message });
        }
        else 
        {
            const courseID =  `${courseName}-${section}-${year}`;
            if (usersCourses.courses!.includes(courseID) == false)
            {
                return res.status(401).json({ message: 'You do not have the required permissions.' });
            }
            else 
            {
                const result = await CourseDB.addAssignment(courseName, year, section, assignmenmtID, maxScore, instID);
                if (result == debugEnum.SUCCESS)
                {
                    return res.status(200).json({ message: 'Success' });
                }
                else 
                {
                    return res.status(401).json({ message: result });
                }
            }
        }
    }
    else 
    {
        return res.status(401).json({ message: 'You do not have the required permissions.' });
    }
});

app.post('/add-exam', async (req : Request, res : Response) =>
{
    if (req.session!.powers.includes(powerType.ADD_QUIZ) && req.session!.authenticated == true) 
    {
        const { courseName, section, year, examID, maxScore } = req.body;
        const instID = req.session!.instID;
        const userID = req.session!.userID;
        let usersCourses = await CourseDB.getCourses(userID, instID, req.session!.type);
        if (usersCourses.message !== debugEnum.SUCCESS)
        {
            return res.status(401).json({ message: usersCourses.message });
        }
        else 
        {
            const courseID =  `${courseName}-${section}-${year}`;
            if (usersCourses.courses!.includes(courseID) == false)
            {
                return res.status(401).json({ message: 'You do not have the required permissions.' });
            }
            else 
            {
                const result = await CourseDB.addExam(courseName, year, section, examID, maxScore, instID);
                if (result == debugEnum.SUCCESS)
                {
                    return res.status(200).json({ message: 'Success' });
                }
                else 
                {
                    return res.status(401).json({ message: result });
                }
            }
        }
    }
    else 
    {
        return res.status(401).json({ message: 'You do not have the required permissions.' });
    }
});