import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ciudad } from '../interfaces/ciudad';

@Injectable()
export class CiudadesService {
    public url: string = environment.urlService;

    constructor(private http: HttpClient) { }

    public GetAll(): Observable<Ciudad[]> {
        let urlService = `${this.url}/Ciudad/`
        return this.http.get<any>(urlService).pipe(
            catchError((error: any) => {
                return throwError(() => error);
            })
        )

    }

    public Create(element: Ciudad): Observable<any> {
        let urlService = `${this.url}/Ciudad/`

        return this.http.post<any>(urlService, element).pipe(map(data => {
            return data;
        }));
    }
}
