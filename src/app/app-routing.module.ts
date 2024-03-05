import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BloodBankInfoComponent } from './blood-bank-info/blood-bank-info.component';
import { DonorInfoComponent } from './donor-info/donor-info.component';
import { RegisterDonorComponent } from './register-donor/register-donor.component';
import { FindDonorComponent } from './find-donor/find-donor.component';
import { DonationInfoComponent } from './donation-info/donation-info.component';
import { AdminWelcomeComponent } from './admin-welcome/admin-welcome.component';
import { AdminGuard } from './admin.guard'; // Import AdminGuard
import { BloodBanksComponent } from './blood-banks/blood-banks.component';
import { CheckDonorsComponent } from './check-donors/check-donors.component';
import { ListRecipientsComponent } from './list-recipients/list-recipients.component';
import { AddConditionsComponent } from './add-conditions/add-conditions.component';
import { BloodDonatedComponent } from './blood-donated/blood-donated.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'blood-bank-info', component: BloodBankInfoComponent },
  { path: 'donor-info', component: DonorInfoComponent },
  { path: 'register-donor', component: RegisterDonorComponent },
  { path: 'find-donor', component: FindDonorComponent },
  { path: 'donation-info', component: DonationInfoComponent },
  { path: 'admin-welcome', component: AdminWelcomeComponent },
  { path: 'blood-banks', component: BloodBanksComponent },
  { path: 'check-donor', component: CheckDonorsComponent },
  { path: 'list-recipients', component: ListRecipientsComponent },
  { path: 'add-conditions', component: AddConditionsComponent },
  { path: 'blood-donated', component: BloodDonatedComponent },
  { path: 'admin-welcome', component: AdminWelcomeComponent, canActivate: [AdminGuard] }
  // other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
