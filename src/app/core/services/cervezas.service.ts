import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { Cerveza } from '../interfaces/cerveza';

@Injectable()
export class CervezasService {
    public url: string = environment.urlService;

    constructor(private http: HttpClient, private tokenService: TokenService) { }

    public GetAll(IdMarca: string, IdEstilo: string, IdCiudad: string, IdPais: string, fullresponse: boolean): Observable<Cerveza[]> {
        let userId = this.tokenService.getUserId();
        let urlService = `${this.url}/Cerveza/?IdMarca=${IdMarca}&IdEstilo=${IdEstilo}&IdCiudad=${IdCiudad}&IdPais=${IdPais}&fullresponse=${fullresponse}`;
        return this.http.get<any>(urlService).pipe(
            catchError((error: any) => {
                return throwError(() => error);
            })
        )
    }

    public Create(element: Cerveza): Observable<any> {
        let urlService = `${this.url}/Cerveza/`

        return this.http.post<any>(urlService, element).pipe(map(data => {
            console.log(data)
            return data;
        }));
    }
    
    public Update(element: Cerveza): Observable<any> {
        let urlService = `${this.url}/Cerveza/`

        return this.http.put<any>(urlService, element).pipe(map(data => {
            return data;
        }));
    }
    
    public Delete(element: Cerveza): Observable<any> {
        let urlService = `${this.url}/Cerveza/${element.id}`

        return this.http.delete<any>(urlService).pipe(map(data => {
            return data;
        }));
    }
}
