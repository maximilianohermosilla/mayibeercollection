import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Marca } from '../interfaces/marca';

@Injectable()
export class MarcasService {
    public url: string = environment.urlService;

    constructor(private http: HttpClient) { }

    public GetAll(): Observable<Marca[]> {
        let urlService = `${this.url}/Marca/`
        return this.http.get<any>(urlService).pipe(
            catchError((error: any) => {
                return throwError(() => error);
            })
        )

    }

    public Create(element: Marca): Observable<any> {
        let urlService = `${this.url}/Marca/`

        return this.http.post<any>(urlService, element).pipe(map(data => {
            return data;
        }));
    }
}
