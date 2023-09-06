import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './materialModule';
import { MultiSelectModule } from 'primeng/multiselect';
import { AppRoutingModule } from './rutes/rutes';
import { PrimeNGModule } from './primeNGModule';
import { footerComponent } from './components/footer/footer.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppComponent } from './app.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { adminComponent } from './components/admin/admin.component';
import { doctorFormComponent } from './components/doctor/doctor-form/doctor-form.component';
import { doctorListComponent } from './components/doctor/doctor-list/doctor-list.components';
import { patientsFormComponent } from './components/patients/patients-form/patients-form.component';
import { patientsListComponent } from './components/patients/patients-list/list-patients.component';
import { personFormComponent } from './components/person/person-form/person-form.component';
import { personListComponent } from './components/person/person-list/list-person.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { FormComponent } from './components/appointment/form/form.component';
import { LoginComponent } from './components/login/logeo.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReplacePipe } from './pipes/replace.pipe';
import { AvatarProfileComponent } from './components/profile/avatar-profile/avatar-profile.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';
import { ValidationMatch } from './components/validator/validation-match/validation-match.component';
import { SidebarsProfileComponent } from './components/profile/sidebars-profile/sidebars-profile.component';
import { AccountSettingsComponent } from './components/profile/account-settings/account-settings.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/about/contact-us/contact-us.component';
import { SidebarsAboutComponent } from './components/about/sidebars-about/sidebars-about.component';
import { AboutUsComponent } from './components/about/about-us/about-us.component';
import { EmailCheckComponent } from './components/login/email-check/email-check.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { DoctorViewComponent } from './components/doctor/doctor-view/doctor-view.component';
import { DoctorPatientComponent } from './components/doctor/doctor-view/doctor-patient/doctor-patient.component';
import { DoctorInfoComponent } from './components/doctor/doctor-view/doctor-info/doctor-info.component';
import { QuickAccessComponent } from './components/admin/templates/quick-access/quick-access.component';
import { ContadorComponent } from './components/admin/templates/contador/contador.component';
import { SchedulesStatusComponent } from './components/doctor/doctor-view/schedules-status/schedules-status.component';
import { ScheduleComponent } from './templates/schedules-view-doctor/schedule.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FilterPipe } from './pipes/filter.pipe';
import { RegisterComponent } from './components/login/register/register.component';
import { AddNoteComponent } from './components/doctor/doctor-view/doctor-patient/add-note/add-note.component';
import { NoteListComponent } from './components/doctor/doctor-view/doctor-patient/note-list/note-list.component';
import { AuthInterceptor } from './_helper/auth-interceptor.interceptor';
import { ErrorInterceptor } from './_helper/error-interceptor.interceptor';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { ProductComponent } from './components/invoices/product/product.component';
import { ListProductComponent } from './components/invoices/product/list/list.component';
import { FormProductComponent } from './components/invoices/product/form/form.component';
import { InvoicesListComponent } from './components/invoices/invoices-list/invoices-list.component';
import { InvoicesDetailsComponent } from './components/invoices/invoices-details/invoices-details.component';
import { PaymentComponent } from './components/invoices/payment/payment.component';
@NgModule({
  declarations: [
    AppComponent,
    LoadingScreenComponent,
    adminComponent,
    PrincipalComponent,
    NavMenuComponent,
    footerComponent,
    doctorFormComponent,
    doctorListComponent,
    patientsFormComponent,
    patientsListComponent,
    personFormComponent,
    personListComponent,
    AppointmentComponent,
    LoginComponent,
    FormComponent,
    ProfileComponent,
    ReplacePipe,
    AvatarProfileComponent,
    ChangePasswordComponent,
    ValidationMatch,
    SidebarsProfileComponent,
    AccountSettingsComponent,
    NotFoundComponent,
    AboutComponent,
    ContactUsComponent,
    SidebarsAboutComponent,
    AboutUsComponent,
    EmailCheckComponent,
    UsersListComponent,
    DoctorViewComponent,
    DoctorPatientComponent,
    DoctorInfoComponent,
    QuickAccessComponent,
    ContadorComponent,
    SchedulesStatusComponent,
    ScheduleComponent,
    FilterPipe,
    RegisterComponent,
    AddNoteComponent,
    NoteListComponent,
    InvoicesComponent,
    ProductComponent,
    ListProductComponent,
    FormProductComponent,
    InvoicesListComponent,
    InvoicesDetailsComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    MultiSelectModule,
    PrimeNGModule,
    MatPaginatorModule,
    FullCalendarModule
  ],
  providers: [
    Title,
    NavMenuComponent,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
