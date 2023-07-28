import { Component, OnInit } from '@angular/core';
import { Enterprise } from '../Enterprise';
import { AuthenticateService } from '../services/authenticate.service';
@Component({
  selector: 'app-entreprise-list',
  templateUrl: './entreprise-list.component.html',
  styleUrls: ['./entreprise-list.component.css']
})
export class EntrepriseListComponent implements OnInit{
  public Enterprises : Enterprise[] = [];
  
  constructor(private entrepriselist:AuthenticateService){}
  ngOnInit(): void {
    this.getEntreprises()
  }
  getEntreprises(){
    this.entrepriselist.getAllEnterprises().subscribe(
      res => {
        this.Enterprises = res
        console.log("res",this.Enterprises);
        
      }
    )
   
    }
    getEntrepriseById(id:number){
      this.entrepriselist.getEnterpriseById(id);
      console.log(id);
    }
    blockEnterprise(id: number){
      this.entrepriselist.blockEnterprise(id).subscribe(res=>{
        console.log(id)
        console.log(res)
      },err=>{
        console.log(err)

      });
      
    }
    enableEnterprise(id: number){
      this.entrepriselist.enableEnterprise(id);
      console.log(id);
      
    }
  }



