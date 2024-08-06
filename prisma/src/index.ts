import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function createUser(Username:string, email:string, password:string){
    try{
        const res = await prisma.users.create({
            data: {
                Username,
                email,
                password,
            }
        })

        console.log("res: ",res)
    }catch(err){
        console.log("Something went wrong!!")
    }
}

createUser("apx13", "apx13@gmail.com", "apxdravid")