import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// Interceptor: Her http isteğinde araya girerek çeşitli işlemler yapmamızı sağlar.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Eğer request'i değiştirmek istiyorsak yeni bir request (referans) oluşturmalıyız.
  const newReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authService.token}`),
  });

  return next(newReq);
};
