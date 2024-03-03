import { NextRequest } from 'next/server'
import { getInfo } from './components/common/getUserInfo';
import { checkLogged } from './lib/userAuth';
  
export async function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('token')
    const path = request.nextUrl.pathname;
   
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
