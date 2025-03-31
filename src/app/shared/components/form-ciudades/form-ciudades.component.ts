import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextModule } from "primeng/inputtext"
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { Elemento } from 'src/app/core/interfaces/elemento';
import { Ciudad } from 'src/app/core/interfaces/ciudad';
import { PaisesService } from 'src/app/core/services/paises.service';
import { Pais } from 'src/app/core/interfaces/pais';

@Component({
  selector: 'app-form-ciudades',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MultiSelectModule, InputTextModule, ToastModule, 
            MessagesModule, ButtonModule, ConfirmDialogModule, DropdownModule, InputNumberModule],
  templateUrl: './form-ciudades.component.html',
  styleUrl: './form-ciudades.component.scss'
})
export class FormCiudadesComponent implements OnInit{
  public element = input<Ciudad>();
  public paisesService = inject(PaisesService);
  
  public listaPaises: Pais[] = [];
  public paisSeleccionado: number = 0;

  public formulario: FormGroup;
  public defaultImage: string = "/assets/placeholder_horizontal.jpg";
  public imagenUrl = signal<string | undefined>(undefined);
  public msgs: Message[] = [];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService) {
    this.formulario = this.fb.group({
      id: [0],
      nombre: ['', Validators.required],
      idPais: [0]
    });

    effect(() => {
      console.log(this.element())
      if (this.element() != undefined) {
        let element = this.element();
        this.imagenUrl.set(element!.pais!.imagen! ?? "");
        this.formulario.patchValue({
          ...element
        });
      } else {
        let element: Ciudad = {
          id: 0,
          nombre: '',
          idPais: 0,
        };
        this.imagenUrl.set("");
        this.formulario.patchValue({
          ...element
        });
      }
    });
  }

  ngOnInit(): void {
    this.getAllPaises();
  } 
  
  public getAllPaises() {
    this.paisesService.GetAll().subscribe((response) => {
      const listaResponse = response.map((p: any) => { return { ...p, label: p.nombre, value: p.id } });
      this.listaPaises.push(...listaResponse);
    })
  }

  public onChangePais(event: any) {
    this.paisSeleccionado = event.value;
    let selectedPais = this.listaPaises.find(pais => pais.id === this.paisSeleccionado)
    console.log(selectedPais)
    this.imagenUrl.set(selectedPais!.imagen || this.defaultImage);
    this.cdr.detectChanges();
  }  

  public onImagenChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log(input)
    if (input.files && input.files[0]) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagenUrl.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
  
  public onImagenUrlChange(): void {
    this.imagenUrl.set(this.formulario.value.imagen);
    this.cdr.detectChanges();
  }

  public onImageError(){
    this.imagenUrl.set(this.defaultImage);
    this.cdr.detectChanges();
  }

  public onSubmit(): void {
    if (this.formulario.valid) {

      console.log('Formulario enviado:', this.formulario.value);

      if(this.formulario.value.id > 0){
        console.log("Update Element");
      
        
      }else{
        console.log("Create Element");
      
        
      }
    }
  }


  public onDelete(){
    event?.preventDefault();
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este elemento?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-danger p-button-outlined',

      accept: () => {
          // this.elementService.Delete(this.element()!).subscribe((response) => {
          //   console.log(response);
          //   this.msgs = [];
          //   this.msgs.push({ severity: 'success', summary: 'Confirmación', detail: 'Element eliminado con éxito' });
          //   setTimeout(() => { window.location.reload() }, 1000);
          // })
      },
      reject: () => {

      },
  });
  }
}
