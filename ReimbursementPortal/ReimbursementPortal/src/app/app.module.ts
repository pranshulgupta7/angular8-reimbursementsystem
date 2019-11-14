import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';


import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserService } from './shared/user.service';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './routes';
import { AuthGuard } from './auth/auth.guard';
import { ReimbursementListComponent } from './home/reimbursement-list/reimbursement-list.component';
import { ReimbursementComponent } from './home/reimbursement/reimbursement.component';
import { ReimbursementListService } from './shared/reimbursement-list.service';
import { UploadImageComponent } from './home/reimbursement/upload-image/upload-image.component';
import { AdministratorComponent } from './home/administrator/administrator.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    ReimbursementListComponent,
    ReimbursementComponent,
    UploadImageComponent,
    AdministratorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [UserService, AuthGuard, ReimbursementListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
