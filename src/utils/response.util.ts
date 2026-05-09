import { Response } from "express";


/**
 * ApiResponse is a utility function that is used to send a structured response to the client.
 * @param res express response object
 * @param statusCode http status code
 * @param message success or error message
 * @param data optional data
 * @returns object {success, message, data}
 */
function ApiResponse( res:Response, statusCode:number, message:string, data?:any){
    return res.status(statusCode).json({
        success: statusCode >= 200 && statusCode < 300 ? true : false,
        message,
        ...(data && {data})
    })
}

export default ApiResponse