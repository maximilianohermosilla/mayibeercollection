import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plataforma } from '../interfaces/plataforma';

@Injectable()
export class PlataformasService {
    public url: string = environment.urlService;

    constructor(private http: HttpClient) { }

    public GetAll(): Observable<Plataforma[]> {
        let urlService = `${this.url}/Plataforma/`
        return this.http.get<any>(urlService).pipe(
            catchError((error: any) => {
                return throwError(() => error);
            })
        )

    }

    public Create(element: Plataforma): Observable<any> {
        let urlService = `${this.url}/Plataforma/`

        return this.http.post<any>(urlService, element).pipe(map(data => {
            return data;
        }));
    }
}
