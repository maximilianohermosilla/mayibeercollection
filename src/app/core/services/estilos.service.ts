import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estilo } from '../interfaces/estilo';

@Injectable()
export class EstilosService {
    public url: string = environment.urlService;

    constructor(private http: HttpClient) { }

    public GetAll(): Observable<Estilo[]> {
        let urlService = `${this.url}/Estilo/`
        return this.http.get<any>(urlService).pipe(
            catchError((error: any) => {
                return throwError(() => error);
            })
        )

    }

    public Create(element: Estilo): Observable<any> {
        let urlService = `${this.url}/Estilo/`

        return this.http.post<any>(urlService, element).pipe(map(data => {
            return data;
        }));
    }

    public Update(element: Estilo): Observable<any> {
        let urlService = `${this.url}/Estilo?id=${element.id}`

        return this.http.put<any>(urlService, element).pipe(map(data => {
            return data;
        }));
    }

    public Delete(element: Estilo): Observable<any> {
        let urlService = `${this.url}/Estilo/${element.id}`

        return this.http.delete<any>(urlService).pipe(map(data => {
            return data;
        }));
    }
}
