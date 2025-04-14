import { ChangeDetectorRef, Component, inject, Input, input, OnInit, output, signal } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { FormNombreImagenComponent } from "../form-nombre-imagen/form-nombre-imagen.component";
import { Elemento } from 'src/app/core/interfaces/elemento';

@Component({
  selector: 'app-grilla-nombre-imagen',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    DialogModule,
    FormNombreImagenComponent
  ],
  templateUrl: './grilla-nombre-imagen.component.html',
  styleUrl: './grilla-nombre-imagen.component.scss'
})

export class GrillaNombreImagenComponent implements OnInit {
  public title = input<string>();
  public elements = input<any[]>([]);
  public selectedElement = signal<Elemento | undefined>(undefined);
  public outputGrillaElement = output<Elemento>();
  public deleteGrillaElement = output<Elemento>();

  public tokenService = inject(TokenService);
  public cdr = inject(ChangeDetectorRef);

  public element: any;
  public display: boolean = false;
  public defaultImage: string = "/assets/placeholder.jpg";

  public cols: any[] = [];

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'Código' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'imagen', header: 'Imagen' },
      { field: '', header: 'Acciones' }
    ];
  }


  public openForm(element: any) {
    if (element && element.imagen) { element!.imagen = element?.imagen?.replace("/assets/placeholder.jpg", ""); }
    this.selectedElement.set(element);
    this.display = true;
    this.cdr.detectChanges();
  }
  
  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultImage;
    this.cdr.detectChanges();
  }

  public deleteElement(element: any) {
    this.deleteGrillaElement.emit(element);
  }

  public onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  public handleElement(element: Elemento) {
    this.outputGrillaElement.emit(element);
    setTimeout(() => {
      this.display = false;
      this.selectedElement.set(undefined);
      this.cdr.detectChanges();
    }, 1000);
  }

  public handleDeleteElement(element: Elemento) {
    this.deleteElement(element);
    setTimeout(() => {
      this.display = false;
      this.selectedElement.set(undefined);
      this.cdr.detectChanges();
    }, 1000);
  }
}
