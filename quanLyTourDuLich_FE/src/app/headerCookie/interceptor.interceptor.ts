import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../service/storage.service';

@Injectable()
export class interceptorInterceptor implements HttpInterceptor {
  constructor(private StorageService: StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token = this.StorageService.getUser(); //lấy token trong  Storage

    // Thêm hoặc cấu hình headers theo yêu cầu của bạn
    if (token && token.jwt && token.jwt.value) {
      console.log("header token ",token.jwt.value)
      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization',token.jwt.value)
      });
      return next.handle(modifiedReq);
    }
    return next.handle(req);
  }
}


