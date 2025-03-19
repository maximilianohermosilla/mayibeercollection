import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

//New TODO mydasboard
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ErrorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { CervezasService } from './core/services/cervezas.service';
import { SpinnerInterceptorService } from './core/interceptors/spinner-interceptor.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ErrorDialogService } from './core/services/error-dialog.service';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { SpinnerService } from './core/services/spinner.service';
import { LoginService } from './core/services/login.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { CiudadesService } from './core/services/ciudades.service';
import { PaisesService } from './core/services/paises.service';
import { EstilosService } from './core/services/estilos.service';
import { MarcasService } from './core/services/marcas.service';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        TableModule,
        CommonModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,
        MessagesModule,
        FormsModule,
        NgxExtendedPdfViewerModule,
        ProgressSpinnerModule,
        SpinnerComponent
    ],
    providers: [
        provideHttpClient((withInterceptors([ErrorHandlerInterceptor]))),
        { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true },
        LoginService, DialogService, ErrorDialogService, SpinnerService, MessageService, ConfirmationService,
        CiudadesService, PaisesService, EstilosService, MarcasService, CervezasService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
