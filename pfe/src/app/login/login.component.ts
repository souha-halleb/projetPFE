import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService} from '../services/authenticate.service';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';

import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {
 

 
constructor( private myservice: AuthenticateService,
  private router:Router){}
  role:string ="" 
  
  ngOnInit() {
    
  }

  loginfrm={
    email:"",
    password:""
  }
  
  onLogin(){
    console.log(this.loginfrm)

    this.myservice.authenticate(this.loginfrm).subscribe(
      res => {
        if(res){
          
          localStorage.setItem("accesstoken",res.accessToken)
          localStorage.setItem("id",res.id)
          localStorage.setItem("role",res.userType)
          if(this.role=="enterprise"){
          this.router.navigate(['/supervisors']);
          }
          else if(this.role=="supervisor"){
            this.router.navigate(['/internlist']);

          }
          else {
          this.router.navigate(['/topics/topicList']);
          }
        }
      },
      (error : HttpErrorResponse) => {
        console.log(error.message);
        
      }
    )
  }
  }


//goToRegister(){
// this.router.navigate(['/register']);
//}