import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pais } from '../interfaces/pais';

@Injectable()
export class PaisesService {
    public url: string = environment.urlService;

    constructor(private http: HttpClient) { }

    public GetAll(): Observable<Pais[]> {
        let urlService = `${this.url}/Pais/`
        return this.http.get<any>(urlService).pipe(
            catchError((error: any) => {
                return throwError(() => error);
            })
        )

    }

    public Create(element: Pais): Observable<any> {
        let urlService = `${this.url}/Pais/`

        return this.http.post<any>(urlService, element).pipe(map(data => {
            return data;
        }));
    }
}
