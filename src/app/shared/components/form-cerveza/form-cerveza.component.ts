import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cerveza } from 'src/app/core/interfaces/cerveza';
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextModule } from "primeng/inputtext"
import { CervezasService } from 'src/app/core/services/cervezas.service';
import { TokenService } from 'src/app/core/services/token.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MarcasService } from 'src/app/core/services/marcas.service';
import { EstilosService } from 'src/app/core/services/estilos.service';
import { PaisesService } from 'src/app/core/services/paises.service';
import { CiudadesService } from 'src/app/core/services/ciudades.service';
import { Marca } from 'src/app/core/interfaces/marca';
import { Estilo } from 'src/app/core/interfaces/estilo';
import { Pais } from 'src/app/core/interfaces/pais';
import { Ciudad } from 'src/app/core/interfaces/ciudad';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadComponent } from "../file-upload/file-upload.component";

@Component({
  selector: 'app-form-cerveza',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MultiSelectModule, InputTextModule, ToastModule,
    MessagesModule, ButtonModule, ConfirmDialogModule, DropdownModule, InputNumberModule, FileUploadComponent],
  templateUrl: './form-cerveza.component.html',
  styleUrl: './form-cerveza.component.scss'
})
export class FormCervezaComponent implements OnInit{
  public cerveza = input<Cerveza | undefined>(undefined);
  public editionEnabled = input<boolean>();
  
  public marcasService = inject(MarcasService);
  public estilosService = inject(EstilosService);
  public paisesService = inject(PaisesService);
  public ciudadesService = inject(CiudadesService);

  public listaMarcas: Marca[] = [];
  public listaEstilos: Estilo[] = [];
  public listaPaises: Pais[] = [];
  public listaCiudades: Ciudad[] = [];
  
  public marcaSeleccionada: number = 0;
  public estiloSeleccionado: number = 0;
  public paisSeleccionado: number = 0;
  public ciudadSeleccionada: number = 0;

  public formulario: FormGroup;
  public defaultImage: string = "/assets/placeholder.jpg";
  public imagenUrl = signal<string | undefined>(undefined);
  public userId: string = "";

  public msgs: Message[] = [];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private service: MessageService, private confirmationService: ConfirmationService,
    private cervezaService: CervezasService, private tokenService: TokenService) {
    this.formulario = this.fb.group({
      id: [0],
      nombre: ['', Validators.required],
      ibu: [''],
      alcohol: [''],
      idMarca: [''],
      idEstilo: [''],
      idPais: [''],
      idCiudad: [''],
      observaciones: [''],
      contenido: [''],
      imagen: ['']
    });

    effect(() => {
      if (this.cerveza() != undefined) {
        let cerveza = this.cerveza();
        this.imagenUrl.set(cerveza!.imagen! ?? "");
        this.formulario.patchValue({
          ...cerveza, idPais: cerveza?.ciudad?.idPais || 0
        });
      } else {
        let cerveza: Cerveza = {
          id: 0,
          nombre: '',
          ibu: undefined,
          alcohol: undefined,
          idMarca: undefined,
          idEstilo: undefined,
          idPais: undefined,
          idCiudad: undefined,
          observaciones: '',
          contenido: undefined,
          imagen: '',
        };
        this.imagenUrl.set("");
        this.formulario.patchValue({
          ...cerveza
        });
      }
    });
  }

  ngOnInit(): void {
    this.userId = this.tokenService.getUserId();
    this.getAllMarcas();
    this.getAllEstilos();
    this.getAllPaises();
    this.getAllCiudades(0);
  }
 
  public getAllMarcas() {
    this.marcasService.GetAll().subscribe((response) => {
      const listaResponse = response.map((p: any) => { return { ...p, label: p.nombre, value: p.id } });
      this.listaMarcas.push(...listaResponse);
    })
  }

  public getAllEstilos() {
    this.estilosService.GetAll().subscribe((response) => {
      const listaResponse = response.map((p: any) => { return { ...p, label: p.nombre, value: p.id } });
      this.listaEstilos.push(...listaResponse);
    })
  }

  public getAllPaises() {
    this.paisesService.GetAll().subscribe((response) => {
      const listaResponse = response.map((p: any) => { return { ...p, label: p.nombre, value: p.id } });
      this.listaPaises.push(...listaResponse);
    })
  }

  public getAllCiudades(idPais: number) {
    this.ciudadesService.GetAll().subscribe((response) => {
      let ciudadesFiltradas = idPais > 0 ? response.filter(c => c.idPais == idPais) : response;
      const listaResponse = ciudadesFiltradas.map((p: any) => { return { ...p, label: p.nombre, value: p.id } });
      this.listaCiudades.push(...listaResponse);
      this.cdr.detectChanges();
    })
  }

  public onChangePais(event: any) {
    this.paisSeleccionado = event.value;
    this.listaCiudades = [];
    this.getAllCiudades(event.value);
    this.cdr.detectChanges();
  }  

  public onImagenChange(event: Event): void {
    const input = event.target as HTMLInputElement;
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

      if(this.formulario.value.id > 0){
        this.cervezaService.Update(this.formulario.value).subscribe((response: any) => {
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Confirmación', detail: 'Cerveza actualizado con éxito' });
          setTimeout(() => { window.location.reload() }, 1000);
        });
      }else{
        this.cervezaService.Create(this.formulario.value).subscribe((response: any) => {
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Confirmación', detail: 'Cerveza creado con éxito' });
          setTimeout(() => { window.location.reload() }, 1000);
        });
      }
    }
    else{      
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Debe completar todos los campos requeridos' });
    }
  }

  public onDelete(){
    event?.preventDefault();
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este cerveza?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-danger p-button-outlined',

      accept: () => {
          this.cervezaService.Delete(this.cerveza()!).subscribe((response) => {
            this.msgs = [];
            this.msgs.push({ severity: 'success', summary: 'Confirmación', detail: 'Cerveza eliminado con éxito' });
            setTimeout(() => { window.location.reload() }, 1000);
          })
      },
      reject: () => {

      },
  });
  }

  public onFileUploaded(event: any){
    this.imagenUrl.set(event ?? "");
    this.formulario.patchValue({
      ...this.formulario.value, imagen: event
    });
  }
}
