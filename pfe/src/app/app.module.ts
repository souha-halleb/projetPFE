import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EntrepriseListComponent } from './entreprise-list/entreprise-list.component';
import { InternlistComponent } from './internlist/internlist.component';
import { AuthenticateService } from './services/authenticate.service';
import { HttpInterceptorProviders } from './http-interceptor';
import { TopicComponent } from './topic/topic.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { TopiclistComponent } from './topiclist/topiclist.component';
import { ToDoComponent } from './to-do/to-do.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EntrepriseListComponent,
    InternlistComponent,
    TopicComponent,
    SupervisorComponent,
    TopiclistComponent,
    ToDoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthenticateService,HttpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
