import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { CervezasService } from 'src/app/core/services/cervezas.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { DataView } from 'primeng/dataview';
import { TokenService } from 'src/app/core/services/token.service';
import { Cerveza } from 'src/app/core/interfaces/cerveza';
import { Marca } from 'src/app/core/interfaces/marca';
import { Pais } from 'src/app/core/interfaces/pais';
import { Estilo } from 'src/app/core/interfaces/estilo';
import { Ciudad } from 'src/app/core/interfaces/ciudad';
import { MarcasService } from 'src/app/core/services/marcas.service';
import { EstilosService } from 'src/app/core/services/estilos.service';
import { PaisesService } from 'src/app/core/services/paises.service';
import { CiudadesService } from 'src/app/core/services/ciudades.service';

@Component({
    templateUrl: './cervezas.component.html',
    standalone: false
})
export class CervezasComponent implements OnInit {
    public spinnerService = inject(SpinnerService);
    public tokenService = inject(TokenService);
    public cdr = inject(ChangeDetectorRef);

    public cervezasService = inject(CervezasService);
    public marcasService = inject(MarcasService);
    public estilosService = inject(EstilosService);
    public paisesService = inject(PaisesService);
    public ciudadesService = inject(CiudadesService);

    public listaCervezas: Cerveza[] = [];
    public listaCervezasFiltradas: Cerveza[] = [];

    public listaMarcas: Marca[] = [];
    public listaEstilos: Estilo[] = [];
    public listaPaises: Pais[] = [];
    public listaCiudades: Ciudad[] = [];

    public userName: string = "";
    public display: boolean = false;
    public defaultImage: string = "/assets/placeholder.jpg";
    public nombreCerveza: string = "";

    public marcaSeleccionada: number = 0;
    public estiloSeleccionado: number = 0;
    public paisSeleccionado: number = 0;
    public ciudadSeleccionada: number = 0;

    public cervezaSeleccionada = signal<Cerveza | undefined>(undefined);

    ngOnInit(): void {
        this.getAllCervezas();
        this.getAllMarcas();
        this.getAllEstilos();
        this.getAllPaises();
        this.getAllCiudades();
        this.userName = this.tokenService.getUserName();
    }

    public getAllCervezas() {
        this.cervezasService.GetAll(this.marcaSeleccionada.toString(), 
                                    this.estiloSeleccionado.toString(), 
                                    this.ciudadSeleccionada.toString(), 
                                    this.paisSeleccionado.toString(), true).subscribe((response) => {
            this.listaCervezas = response;
            this.listaCervezasFiltradas = response;
        })
    }

    public getAllMarcas() {
        this.marcasService.GetAll().subscribe((response) => {
            this.listaMarcas = [{ nombre: "Todas las marcas", label: "Todas las marcas", value: 0 }]
            const listaResponse = response.map((p: any) => { return { ...p, label: p.nombre, value: p.id } });
            this.listaMarcas.push(...listaResponse);
        })
    }

    public getAllEstilos() {
        this.estilosService.GetAll().subscribe((response) => {
            this.listaEstilos = [{ nombre: "Todos los estilos", label: "Todos los estilos", value: 0 }]
            const listaResponse = response.map((p: any) => { return { ...p, label: p.nombre, value: p.id } });
            this.listaEstilos.push(...listaResponse);
        })
    }

    public getAllPaises() {
        this.paisesService.GetAll().subscribe((response) => {
            this.listaPaises = [{ nombre: "Todos los países", label: "Todos los países", value: 0 }]
            const listaResponse = response.map((p: any) => { return { ...p, label: p.nombre, value: p.id } });
            this.listaPaises.push(...listaResponse);
        })
    }

    public getAllCiudades() {
        this.ciudadesService.GetAll().subscribe((response) => {
            let ciudadesFiltradas = this.paisSeleccionado > 0? response.filter(c => c.idPais == this.paisSeleccionado): response;
            this.listaCiudades = [{ nombre: "Todas las ciudades", label: "Todas las ciudades", value: 0 }]
            const listaResponse = ciudadesFiltradas.map((p: any) => { return { ...p, label: p.nombre, value: p.id } });
            this.listaCiudades.push(...listaResponse);
        })
    }

    public onFilterMarca(dv: DataView, event: any) {
        this.marcaSeleccionada = event.value;
        this.getAllCervezas();
    }

    public onFilterEstilo(dv: DataView, event: any) {
        this.estiloSeleccionado = event.value;
        this.getAllCervezas();
    }

    public onFilterPais(dv: DataView, event: any) {
        this.paisSeleccionado = event.value;
        this.getAllCiudades();
        this.getAllCervezas();
    }

    public onFilterCiudad(dv: DataView, event: any) {
        this.ciudadSeleccionada = event.value;
        this.getAllCervezas();
    }

    public onFilter(dv: DataView, event: any) {
        // console.log(event)
        // console.log(event.value)
        dv.filter((event.target as HTMLInputElement).value);
    }

    // public filtrarCervezas() {
    //     this.listaCervezasFiltradas = this.listaCervezas.filter(Cerveza => {
    //         const coincideNombre = Cerveza.nombre.toLowerCase().includes(this.nombreCerveza.toLowerCase());
    //         const coincidePlataforma = this.plataformaSeleccionada
    //             ? Cerveza.cervezaPlataformas!.some((jp: any) => jp.idPlataforma === this.plataformaSeleccionada)
    //             : true;
    //         return coincideNombre && coincidePlataforma;
    //     });
    //     this.cdr.detectChanges();
    // }

    public openFormCerveza(Cerveza: Cerveza | undefined) {
        if (Cerveza && Cerveza.imagen) { Cerveza!.imagen = Cerveza?.imagen?.replace("/assets/placeholder.jpg", ""); }
        this.cervezaSeleccionada.set(Cerveza);
        this.display = true;
        this.cdr.detectChanges();
        console.log(Cerveza)
    }
}
