import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class RestService {
  apiUrl: string;
  httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  };

  constructor(
      private http: HttpClient,
      private router: Router,
      
  ) {
      this.apiUrl ='https://api.spaceXdata.com/v3/launches?limit=100&amp;';
      this.httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };
  }

  private formatErrors(error: any) {
      return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
      return this.http.get(`${this.apiUrl}${path}`, { params })
          
  }

  getRes(path: string,token): Observable<any> {
      const httpOptionsuser = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${token}`,
              "access-control-allow-methods" :"GET, OPTIONS, POST, PUT, PATCH, DELETE",
              "access-control-allow-headers" :"X-Typeform-Key, Content-Type, Authorization, Typeform-Version"
          })
      };
      // const options = new RequestOptions({ headers: headers });
      return this.http.get(`${path}`, httpOptionsuser)
          .pipe(catchError(this.formatErrors));
  }

  getWithoutAPI(path: string, headers = {}): Observable<any> {
      return this.http.get(`${path}`, { headers })
          .pipe(catchError(this.formatErrors));
  }

  postWithoutAPI(path: string, body: object = {}, headers = {}): Observable<any> {
      return this.http.post(`${path}`, body, { headers })
          .pipe(catchError(this.formatErrors));
  }

  getx(path: string): Observable<any> {
      const httpOptionsuser = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
          })
      };

      return this.http.get(`${this.apiUrl}${path}`, httpOptionsuser)
          .pipe(catchError(this.formatErrors));
  }


  putx(path: string, body: object = {}): Observable<any> {
      const httpOptionsuser = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
          })
      };
      return this.http.put(`${this.apiUrl}${path}`, body, httpOptionsuser).pipe(catchError(this.formatErrors));
  }

  post(path: any, body: object = {}): Observable<any> {
      return this.http.post(
          `${this.apiUrl}${path}`,
          body
      ).pipe(catchError(this.formatErrors));
  }

  postx(path: string, body: object = {}): Observable<any> {
      const httpOptionsuser = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
              
          })
      };

      return this.http.post(
          `${this.apiUrl}${path}`,
          body,
          httpOptionsuser
      ).pipe(catchError(this.formatErrors));
  }

  postMultiData(path: string, file: FormData): Observable<any> {
      const httpOptionsMulti = {
          headers: new HttpHeaders({
              Accept: 'multipart/form-data'
          })
      };
      return this.http.post(`${this.apiUrl}${path}`, file, httpOptionsMulti).pipe(catchError(this.formatErrors));
  }

  postMultiDatax(path: string, file: FormData): Observable<any> {
      const httpOptionsMulti = {
          headers: new HttpHeaders({
              Accept: 'multipart/form-data'
          })
      };
      return this.http.post(`${this.apiUrl}${path}`, file, httpOptionsMulti).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
      
      return this.http.delete(
          `${this.apiUrl}${path}`, this.httpOptions
      ).pipe(catchError(this.formatErrors));
  }
}
