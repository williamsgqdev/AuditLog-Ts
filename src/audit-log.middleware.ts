import { NextFunction, Request, Response } from "express";

export const auditLoggerInterceptResponse = async (req: Request, res: Response, next: NextFunction) => {

    //Save the initial res.json method to a variable for later use
    const originalJson = res.json;

    //Overide the res.json method with a custom implementation
    res.json = function (body: any) {

         // Create a payload capturing relevant information about the request and response
            const payload = {
                url: req.originalUrl,
                method: req.method,
                body: req.body,
                params: req.params,
                headers: req.headers,
                statusCode: res.statusCode,
                response: body,
            };

           
            console.log(payload);
            
        //Save Payload
       /* 
        Implement database logic
        Note: Utilize Promise chaining for promises. Using async await
        might not match the return type of res.json and could result in an error.
    */


        // Call the original `res.json` method to send the response
        return originalJson.call(this, body);
    };

    // Move to the next middleware or route handler in the Express middleware stack
    next();
};
