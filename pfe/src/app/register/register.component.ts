import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticateService} from '../services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  
  constructor(private router: Router, private myservice: AuthenticateService) {
    
  }
  ngOnInit() {
    this.getRole()
   
}

reg={
  name:"",
  email:"",
  password:"",
  field:"",
  speciality:"",
  phone:""
}
role:string ="" 


onRegister(){
  console.log(this.reg)
  this.myservice.Register(this.reg, this.role).subscribe(
    res => {
      if(res){
        console.log(res);
        this.router.navigate(['/login']);
      }
    },
    (error : HttpErrorResponse) => {
      console.log(error.message);
      
    }
  )
}


  getRole(){
    if (this.router.url.startsWith("/register/entreprise")) {
      this.role="entreprise";  
          
    }else if (this.router.url.startsWith("/register/intern")) {
      this.role="intern"; 
    }
   
      else if (this.router.url.startsWith("/register/supervisor")){
        this.role="supervisor"}

        console.log(this.role)
    }
 
  


  }