import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Enterprise } from './Enterprise';
import { Observable } from 'rxjs';
import { EntrepriseListComponent } from './entreprise-list/entreprise-list.component';
import { InternlistComponent } from './internlist/internlist.component';
import { TopicComponent } from './topic/topic.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { TopiclistComponent } from './topiclist/topiclist.component';
import { ToDoComponent } from './to-do/to-do.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  {path:"login",component:LoginComponent},
   {path:"register",component:RegisterComponent},
   {path:"register/entreprise",component:RegisterComponent},
   {path:"register/intern",component:RegisterComponent},
   {path:"register/supervisor",component:RegisterComponent},
   {path : 'enterpriseList' , component : EntrepriseListComponent},
   {path :'internlist' , component : InternlistComponent},
   {path :'topics' , component : TopicComponent},
   {path :'supervisors' , component : SupervisorComponent},
   {path :'topics/topicList' , component : TopiclistComponent},
   {path :'toDo' , component : ToDoComponent},

  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}

