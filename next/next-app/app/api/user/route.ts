import { NextRequest } from "next/server"

export function GET(){
    //db logic here
    return Response.json({
        email:"aX13@gmail.com",
        name:"aX13"
    })
}


export async function POST(req:NextRequest){
    const body = await req.json();
    console.log(body)
    
    return Response.json({
        message:"sucess"
    });
}