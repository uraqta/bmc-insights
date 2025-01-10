import { NextRequest } from "next/server";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { request } from "http";
export const GetdataFromtoken=(request:NextRequest)=>{
    try {
        
        const enctoken =request.cookies.get('token')?.value||'';
        const tokent:any = jwt.verify(enctoken,process.env.TOKEN_SECRET!)
        return tokent.userId;
    } catch (error:any) {
        throw new Error(error.message)
        
    }
}
