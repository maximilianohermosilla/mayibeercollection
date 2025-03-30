import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, input, OnInit, signal } from '@angular/core';
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

@Component({
  selector: 'app-form-nombre-imagen',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MultiSelectModule, InputTextModule, ToastModule, 
            MessagesModule, ButtonModule, ConfirmDialogModule, DropdownModule, InputNumberModule],
  templateUrl: './form-nombre-imagen.component.html',
  styleUrl: './form-nombre-imagen.component.scss'
})
export class FormNombreImagenComponent implements OnInit{
  public element = input<Elemento>();

  public formulario: FormGroup;
  public defaultImage: string = "/assets/placeholder_horizontal.jpg";
  public imagenUrl = signal<string | undefined>(undefined);

  public msgs: Message[] = [];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService) {
    this.formulario = this.fb.group({
      id: [0],
      nombre: ['', Validators.required],
      imagen: ['']
    });

    effect(() => {
      console.log(this.element())
      if (this.element() != undefined) {
        let element = this.element();
        this.imagenUrl.set(element!.imagen! ?? "");
        this.formulario.patchValue({
          ...element
        });
      } else {
        let element: Elemento = {
          nombre: '',
          imagen: '',
        };
        this.imagenUrl.set("");
        this.formulario.patchValue({
          ...element
        });
      }
    });
  }

  ngOnInit(): void {

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
