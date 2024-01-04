import express, { Request, Response } from 'express';
import { auditLoggerInterceptResponse } from './audit-log.middleware';
const app = express();

app.use(auditLoggerInterceptResponse);

app.get('/', (req: Request, res: Response)=> {
    try {
        return res.status(200).json({
            msg: 'Success'
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Something weent wrong, Try again !'
        })
    }
});

app.listen(5000, ()=> {
    console.log('App is running')
})