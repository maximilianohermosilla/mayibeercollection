import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Ciudad } from 'src/app/core/interfaces/ciudad';
import { CiudadesService } from 'src/app/core/services/ciudades.service';
import { PaisesService } from 'src/app/core/services/paises.service';

@Component({
    templateUrl: './ciudades.component.html',
    standalone: false
})
export class CiudadesComponent implements OnInit {
    public ciudadesService = inject(CiudadesService);
    public paisesService = inject(PaisesService);
    public cdr = inject(ChangeDetectorRef);

    public listaCiudades: Ciudad[] = [];
    public listaPaises: Ciudad[] = [];
    public paisSeleccionado: number = 0;

    ngOnInit(): void {
        this.getAllPaises();
        this.getAllCiudades();
        this.cdr.detectChanges();
    }

    public getAllPaises() {
        this.paisesService.GetAll().subscribe((response) => {
            const listaResponse = response.map((p: any) => { return { ...p, label: p.nombre, value: p.id } });
            this.listaPaises.push(...listaResponse);
        })
    }

    public getAllCiudades() {
        this.ciudadesService.GetAll().subscribe((response) => {
            let ciudadesFiltradas = this.paisSeleccionado > 0 ? response.filter(c => c.idPais == this.paisSeleccionado) : response;
            const listaResponse = ciudadesFiltradas.map((p: any) => { return { ...p, label: p.nombre, value: p.id } });
            this.listaCiudades.push(...listaResponse);
            this.cdr.detectChanges();
        });
    }


    public handleElement(element: Ciudad) {
        if (element && element!.id! > 0) {
            this.ciudadesService.Update(element).subscribe((response) => {
                this.getAllCiudades();
            });
        }
        else {
            this.ciudadesService.Create(element).subscribe((response) => {
                this.getAllCiudades();
            });
        }
    }

    public handleDeleteElement(element: Ciudad) {
        this.ciudadesService.Delete(element).subscribe((response) => {
            this.getAllCiudades();
        });
    }
}
