import express from 'express';
import { Router } from 'express';
import { powerType } from '../shared';
import cookieSession from 'cookie-session';
import { Request, Response } from 'express';
import { COOKIE_MAX_AGE, COOKIE_SESSION_KEYS } from '../config';

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

});

app.post('/edit-assignment-scores', async (req : Request, res : Response) =>
{

});

app.post('/edit-exam-scores', async (req : Request, res : Response) =>  
{

});

// Fetch quiz, assignment, exam scores
app.post('/get-quiz-scores', async (req : Request, res : Response) =>
{

});


app.post('/get-assignment-scores', async (req : Request, res : Response) =>
{

});

app.post('/get-exam-scores', async (req : Request, res : Response) =>
{

});

// Adding new quiz, assignment, exam
app.post('/add-quiz', async (req : Request, res : Response) =>
{

});

app.post('/add-assignment', async (req : Request, res : Response) =>
{

});

app.post('/add-exam', async (req : Request, res : Response) =>
{

});