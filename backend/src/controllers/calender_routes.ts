import { Router } from 'express';
import { debugEnum, powerType } from '../shared';
import { Request, Response } from 'express';
import { AdminDB } from '../models/admin_db';
import { Central } from '../models/central_db';

export const app = Router();

app.post('/create-user', async (req : Request, res : Response) =>
{
    if (req)
});