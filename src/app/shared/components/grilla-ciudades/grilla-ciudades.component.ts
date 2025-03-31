import { ChangeDetectorRef, Component, inject, Input, input, OnInit, signal, ViewChild } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { Elemento } from 'src/app/core/interfaces/elemento';
import { FormCiudadesComponent } from '../form-ciudades/form-ciudades.component';
import { Ciudad } from 'src/app/core/interfaces/ciudad';

@Component({
  selector: 'app-grilla-ciudades',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    DialogModule,
    FormCiudadesComponent
  ],
  templateUrl: './grilla-ciudades.component.html',
  styleUrl: './grilla-ciudades.component.scss'
})

export class GrillaCiudadesComponent implements OnInit {
  @ViewChild('dt') table!: Table;
  
  public title = input<string>();
  public elements = input<any[]>([]);
  public selectedElement = signal<Elemento | undefined>(undefined);

  public tokenService = inject(TokenService);
  public cdr = inject(ChangeDetectorRef);

  public element: any;
  public listaCiudades: Ciudad[] = [];
  public display: boolean = false;
  public defaultImage: string = "/assets/placeholder.jpg";

  public cols: any[] = [];

  ngOnInit(): void {
    this.cols = [
      { field: 'idPais', header: 'País' },
      { field: 'idPais', header: 'País' },
      { field: 'nombre', header: 'Nombre' },
      { field: '', header: 'Acciones' }
    ];
    this.listaCiudades = this.elements();
    setTimeout(() => this.table.reset(), 1000);
    this.cdr.detectChanges();
  }


  public openForm(element: any) {
    if (element && element?.pais?.imagen) { element!.pais!.imagen = element?.pais?.imagen?.replace("/assets/placeholder.jpg", ""); }
    console.log(element);
    this.selectedElement.set(element);
    this.display = true;
    this.cdr.detectChanges();
  }

  public deleteElement(element: any) {
    this.selectedElement.set(element);
    this.display = true;
    this.cdr.detectChanges();
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
