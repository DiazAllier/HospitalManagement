import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { adminComponent } from '../components/admin/admin.component';
import { doctorFormComponent } from '../components/doctor/doctor-form/doctor-form.component';
import { doctorListComponent } from '../components/doctor/doctor-list/doctor-list.components';
import { LoginComponent } from '../components/login/logeo.component';
import { patientsFormComponent } from '../components/patients/patients-form/patients-form.component';
import { patientsListComponent } from '../components/patients/patients-list/list-patients.component';
import { personFormComponent } from '../components/person/person-form/person-form.component';
import { personListComponent } from '../components/person/person-list/list-person.component';
import { PrincipalComponent } from '../components/principal/principal.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { AppointmentComponent } from '../components/appointment/appointment.component';
import { ChangePasswordComponent } from '../components/profile/change-password/change-password.component';
import { AccountSettingsComponent } from '../components/profile/account-settings/account-settings.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AboutComponent } from '../components/about/about.component';
import { ContactUsComponent } from '../components/about/contact-us/contact-us.component';
import { AboutUsComponent } from '../components/about/about-us/about-us.component';
import { UsersListComponent } from '../components/users/users-list/users-list.component';
import { DoctorViewComponent } from '../components/doctor/doctor-view/doctor-view.component';
import { AuthGuard } from '../guards/auth.guard';
import { ROLE } from '../models/enum/roles';
import { AuthGuardLogged } from '../guards/auth.guard.logged';
import { RegisterComponent } from '../components/login/register/register.component';
import { ProductComponent } from '../components/invoices/product/product.component';
import { InvoicesComponent } from '../components/invoices/invoices.component';
import { PaymentComponent } from '../components/invoices/payment/payment.component';

const routes: Routes = [
  {
    path: 'admin',
    component: adminComponent,
    canActivate: [AuthGuard],
    data: { roles: [ROLE.ADMIN] },
  },

  {
    path: 'home',
    component: PrincipalComponent,
  },

  {
    path: 'notfound',
    component: NotFoundComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardLogged]
  },

  {
    path: 'register',
    component: RegisterComponent

  },

  {
    path: 'patients/form',
    component: patientsFormComponent,
    canActivate: [AuthGuard],
    data: { roles: [ROLE.ADMIN] },
  },

  {
    path: 'patients',
    component: patientsListComponent,
    canActivate: [AuthGuard],
    data: { roles: [ROLE.ADMIN] },
  },

  {
    path: 'patients/form/:id',
    component: patientsFormComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [AuthGuard],
    data: { roles: [ROLE.ADMIN] },
  },
  {
    path: 'users/form',
    component: personFormComponent,
    // canActivate: [AuthGuard],
    // data: { roles: [ROLE.ADMIN] },
  },

  {
    path: 'users/form/:id',
    component: personFormComponent,
    canActivate: [AuthGuard],
    data: { roles: [ROLE.ADMIN] },
  },

  {
    path: 'person',
    component: personListComponent,
    canActivate: [AuthGuard],
    data: { roles: [ROLE.ADMIN] },
  },
  {
    path: 'doctor/form',
    component: doctorFormComponent,
    canActivate: [AuthGuard],
    data: { roles: [ROLE.ADMIN] },
  },

  {
    path: 'doctor/form/:id',
    component: doctorFormComponent,
    canActivate: [AuthGuard],
    data: { roles: [ROLE.ADMIN] },
  },

  {
    path: 'doctor',
    component: doctorListComponent,
    canActivate: [AuthGuard],
    data: { roles: [ROLE.ADMIN] },
  },
  {
    path: 'doctor/view/:id',
    component: DoctorViewComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'turnos',
    component: AppointmentComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'invoices',
    component: InvoicesComponent,
  },
  {
    path: 'products',
    component: ProductComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', redirectTo: 'settings', pathMatch: 'full',
      },
      {
        path: 'password',
        component: ChangePasswordComponent,
      },
      {
        path: 'settings',
        component: AccountSettingsComponent,
      }
    ]
  },

  {
    path: 'about',
    component: AboutComponent,
    children: [
      {
        path: '', redirectTo: 'contact-us', pathMatch: 'full',
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }