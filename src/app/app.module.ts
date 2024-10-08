import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({ declarations: [
        AppComponent,
        RegistrationComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        ReactiveFormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
