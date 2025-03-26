import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  
  const endpointsSansAuth = [
    '/players/profile',
    '/challenges/add/',
    '',
    
  ];

  const isPublicEndpoint = endpointsSansAuth.some(url => req.url.includes(url));
  console.log(isPublicEndpoint);
  console.log(token);
  
  if(isPublicEndpoint){
    if(token){
      console.log("ergerg");
      const clonedReq = req.clone({
       
        
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next(clonedReq);
        
    }
    
  }

 
  
  return next(req);
};

