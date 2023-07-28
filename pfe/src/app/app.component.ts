import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './services/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  storeRole=""
  ngOnInit(): void {
    this.storeRole = localStorage.getItem("role") || '';

    console.log(this.storeRole);
    
  }
  title = 'pfe';
  
  constructor(private authenticate:AuthenticateService){}
  blockEnterprise(id:number){
    this.authenticate.blockEnterprise(id).subscribe(data=>console.log(data));
  }
}
