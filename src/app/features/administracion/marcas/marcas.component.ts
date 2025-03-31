import { Component, inject, OnInit } from '@angular/core';
import { Marca } from 'src/app/core/interfaces/marca';
import { MarcasService } from 'src/app/core/services/marcas.service';

@Component({
    templateUrl: './marcas.component.html',
    standalone: false
})
export class MarcasComponent implements OnInit {
    public marcasService = inject(MarcasService);
    public listaMarcas: Marca[] = [];

    ngOnInit(): void {
        this.getMarcas();
    }

    public getMarcas(){        
        this.marcasService.GetAll().subscribe((response) => {
            this.listaMarcas = response;
        });
    }

    public handleElement(element: Marca) {
        console.log('Dato recibido en page:', element);
        if(element && element!.id! > 0){
            this.marcasService.Update(element).subscribe((response) => {
                console.log(response);
                this.getMarcas();
            });
        }
        else{
            this.marcasService.Create(element).subscribe((response) => {
                console.log(response);
                this.getMarcas();
            });
        }
    }

    public handleDeleteElement(element: Marca) {
        console.log('Dato recibido para eliminar en page:', element);
        this.marcasService.Delete(element).subscribe((response) => {
            console.log(response);
            this.getMarcas();
        });
    }
}
