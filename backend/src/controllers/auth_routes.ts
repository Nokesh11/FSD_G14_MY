import { Router } from 'express';

export const app = Router();

enum verifyCredsResult {USER_NOT_FOUND, INCORRECT_PASSWORD, VALID_CREDENTIALS};
enum verfiyTokenResult {USER_NOT_FOUND, INVALID_TOKEN, VALID_TOKEN};

function verifyCreds(username: string, password: string) 
{
    return verifyCredsResult.VALID_CREDENTIALS;    
}

function verifyToken(username: string , token: string) 
{
    return verfiyTokenResult.VALID_TOKEN;
}

app.post('/verify-creds', (req, res) => {
    const data = req.body;
    const username = data.username;
    const password = data.password;
    const result = verifyCreds(username, password);
    if (result === verifyCredsResult.VALID_CREDENTIALS) 
    {
        res.status(200).send('Valid credentials');
    } 
    else 
    {
        res.status(401).send('Invalid credentials');
    }
    // if ()
    // if (username === 'admin' && password === 'admin') {
    //     res.send('Valid credentials');
    // } else {
    //     res.status(401).send('Invalid credentials');
    // }
});

app.post('/verify-token', (req, res) => {});

app.get('/logout', (req, res) => {});