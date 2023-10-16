import jwt from 'jsonwebtoken';

type Iinfo={
    name:string,
    email:string
}

export function generateToken(info:Iinfo){
    return jwt.sign(info, process.env.JWT_SECRET as string)
}