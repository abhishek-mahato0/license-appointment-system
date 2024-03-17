import { NextRequest } from 'next/server'
import { getInfo } from './components/common/getUserInfo';
import { checkLogged } from './lib/userAuth';
import jwt from 'jsonwebtoken'
  
export async function middleware(request: NextRequest) {
    const currentUser= request.cookies.get('token')
    const path = request.nextUrl.pathname;
    const user= jwt.verify(String(currentUser) , process.env.JWT_SECRET as string)
    console.log(user)
   
    if(!currentUser && path.startsWith('/apply')){
        return Response.redirect(new URL('/login', request.url))
    }
    if(!currentUser && path.startsWith('/profile')){
        return Response.redirect(new URL('/login', request.url))
    }
    if(!currentUser && path.startsWith('/admin/')){
        return Response.redirect(new URL('/admin/login', request.url))
    }
    // if(currentUser && path.startsWith('/login')){
    //     return Response.redirect(new URL('/', request.url))
    // }
}
