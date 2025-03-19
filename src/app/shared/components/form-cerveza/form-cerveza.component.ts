import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, input, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cerveza } from 'src/app/core/interfaces/cerveza';
import { Plataforma } from 'src/app/core/interfaces/plataforma';
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextModule } from "primeng/inputtext"
import { CervezasService } from 'src/app/core/services/cervezas.service';
import { TokenService } from 'src/app/core/services/token.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-form-cerveza',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MultiSelectModule, InputTextModule, ToastModule, MessagesModule, ButtonModule, ConfirmDialogModule],
  templateUrl: './form-cerveza.component.html',
  styleUrl: './form-cerveza.component.scss'
})
export class FormCervezaComponent implements OnInit{
  public cerveza = input<Cerveza | undefined>(undefined);
  public formulario: FormGroup;
  public defaultImage: string = "/assets/placeholder.jpg";
  public imagenUrl = signal<string | undefined>(undefined);
  public userId: string = "";
  
  public listaPlataformas: Plataforma[] = [];

  public msgs: Message[] = [];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private service: MessageService, private confirmationService: ConfirmationService,
    private cervezaService: CervezasService, private tokenService: TokenService) {
    this.formulario = this.fb.group({
      id: [0],
      nombre: ['', Validators.required],
      descripcion: [''],
      imagen: [''],
      appId: [''],
      url: [''],
      cervezaPlataformas: [[]]
    });

    effect(() => {
      if (this.cerveza() != undefined) {
        let cerveza = this.cerveza();
        this.imagenUrl.set(cerveza!.imagen! ?? "");
        // this.listaPlataformasPrevias = cerveza!.cervezaPlataformas;
        this.formulario.patchValue({
          ...cerveza,
          // cervezaPlataformas: cerveza!.cervezaPlataformas!.map((jp: any) => jp.idPlataforma),
        });
      } else {
        let cerveza: Cerveza = {
          nombre: '',
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
    //this.getAllPlataformas();
  }


  // public getAllPlataformas() {
  //   this.plataformasService.GetAll().subscribe((response) => {
  //     this.listaPlataformas = response.map((p: any) => { return { ...p, label: p.nombre, value: p.id } });
  //   })
  // }

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
      this.filterPlataformas();

      if(this.formulario.value.id > 0){
        console.log("Update Cerveza");
        this.cervezaService.Update(this.formulario.value).subscribe((response: any) => {
          console.log(response);
          //this.service.add({ key: 'tst', severity: 'success', summary: 'Confirmación', detail: 'Cerveza creado con éxito' });
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Confirmación', detail: 'Cerveza actualizado con éxito' });
          setTimeout(() => { window.location.reload() }, 1000);
        });
      }else{
        console.log("Create Cerveza");
        this.cervezaService.Create(this.formulario.value).subscribe((response: any) => {
          console.log(response);
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Confirmación', detail: 'Cerveza creado con éxito' });
          setTimeout(() => { window.location.reload() }, 1000);
        });
      }
    }
  }

  public filterPlataformas(){
    let listaPlataformasNueva: any[] = [];
    this.formulario.value.cervezaPlataformas.forEach((element: any) => {
      console.log(element)
      listaPlataformasNueva.push(element);
    });
    // let listaPlataformasEliminar = this.listaPlataformasPrevias?.filter((item: any) => !listaPlataformasNueva.includes(item.idPlataforma));
    // let listaPlataformasAgregar = listaPlataformasNueva?.filter((id: any) => !this.listaPlataformasPrevias!.some((item) => item.idPlataforma === id));

    // this.formulario.value.cervezaPlataformas = listaPlataformasAgregar.map((p: any) => { 
    //   return { id: 0, idCerveza: this.formulario.value.id, idPlataforma: p, url: this.formulario.value.url, idUsuario: this.userId, fecha: new Date().toISOString(), 
    //   //  plataforma: this.listaPlataformas.find((plataforma: any) => plataforma.id == p) 
    //   }
    // });
    
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
            console.log(response);
            this.msgs = [];
            this.msgs.push({ severity: 'success', summary: 'Confirmación', detail: 'Cerveza eliminado con éxito' });
            setTimeout(() => { window.location.reload() }, 1000);
          })
      },
      reject: () => {

      },
  });
  }
}
