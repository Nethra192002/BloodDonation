import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BloodBankInfoComponent } from './blood-bank-info/blood-bank-info.component';
import { DonorInfoComponent } from './donor-info/donor-info.component';
import { RegisterDonorComponent } from './register-donor/register-donor.component';
import { FindDonorComponent } from './find-donor/find-donor.component';
import { DonationInfoComponent } from './donation-info/donation-info.component';
import { AdminWelcomeComponent } from './admin-welcome/admin-welcome.component';
import { BloodBanksComponent } from './blood-banks/blood-banks.component';
import { CheckDonorsComponent } from './check-donors/check-donors.component';
import { ListRecipientsComponent } from './list-recipients/list-recipients.component';
import { AddConditionsComponent } from './add-conditions/add-conditions.component';
import { BloodDonatedComponent } from './blood-donated/blood-donated.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    BloodBankInfoComponent,
    DonorInfoComponent,
    RegisterDonorComponent,
    FindDonorComponent,
    DonationInfoComponent,
    AdminWelcomeComponent,
    BloodBanksComponent,
    CheckDonorsComponent,
    ListRecipientsComponent,
    AddConditionsComponent,
    BloodDonatedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
