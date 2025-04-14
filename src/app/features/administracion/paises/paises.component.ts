import { Component, inject, OnInit } from '@angular/core';
import { Pais } from 'src/app/core/interfaces/pais';
import { PaisesService } from 'src/app/core/services/paises.service';

@Component({
    templateUrl: './paises.component.html',
    standalone: false
})
export class PaisesComponent implements OnInit {
    public paisesService = inject(PaisesService);
    public listaPaises: Pais[] = [];

    ngOnInit(): void {
        this.getPaises();
    }

    public getPaises(){
        this.paisesService.GetAll().subscribe((response) => {
            this.listaPaises = response;
        });

    }

    public handleElement(element: Pais) {
        if(element && element!.id! > 0){
            this.paisesService.Update(element).subscribe((response) => {
                this.getPaises();
            });
        }
        else{
            this.paisesService.Create(element).subscribe((response) => {
                this.getPaises();
            });
        }
    }

    public handleDeleteElement(element: Pais) {
        this.paisesService.Delete(element).subscribe((response) => {
            this.getPaises();
        });
    }
}
