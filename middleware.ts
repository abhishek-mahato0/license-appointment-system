import { NextRequest } from 'next/server'
  
export async function middleware(request: NextRequest) {
    const currentUser= request.cookies.get('token')
    const role = request.cookies.get('role') || {name:"role", value:"public"}
    const path = request.nextUrl.pathname;
   if(!currentUser || !role){
         if(path.startsWith('/admin')){
            return Response.redirect(new URL('/admin/login', request.url))
         }
        if(path.startsWith('/profile')){
            return Response.redirect(new URL('/login', request.url))
        }
   }
    if(!currentUser && (path.startsWith('/apply') || path.startsWith("/reschedule") || path.startsWith('/appointments'))){
        return Response.redirect(new URL('/login', request.url))
    }
    if(!currentUser && path.startsWith('/profile')){
        return Response.redirect(new URL('/login', request.url))
    }
    if(!currentUser && path.startsWith('/admin/')){
        return Response.redirect(new URL('/admin/login', request.url))
    }
    if(currentUser && path.startsWith('/admin') && role?.value === "public"){
        return Response.redirect(new URL('/admin/login', request.url))
    }
    if(currentUser && path.startsWith('/login')){
        return Response.redirect(new URL('/', request.url))
    }
}
