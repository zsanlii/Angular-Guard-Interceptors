import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
 
    if (req.method !== 'GET') {
 
      this.loadingService.setLoading(true);
    }

    return next.handle(req).pipe(

      finalize(() => {
        if (req.method !== 'GET') {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}