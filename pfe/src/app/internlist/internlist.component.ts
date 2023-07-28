import { Component, OnInit } from '@angular/core';
import { intern } from '../intern';
import { AuthenticateService } from '../services/authenticate.service';



@Component({
  selector: 'app-internlist',
  templateUrl: './internlist.component.html',
  styleUrls: ['./internlist.component.css']
})
export class InternlistComponent implements OnInit {
  public Interns : intern[] = [];
 
  constructor(private internlist:AuthenticateService){}
  ngOnInit(): void {
    const storeId = Number(localStorage.getItem("id"));
   
    this.getInternsByIdEntreprise(storeId);

  }
getInterns(){
  this.internlist.getInterns().subscribe(
    res=>{
      this.Interns=res
      console.log("res",this.Interns);
    }
  )
}
getInternsById(id:number){
  this.internlist.getInternsById(id).subscribe(
res=>{
  this.Interns=res
  console.log("res",this.Interns);
}
  );
  
}
getInternsByIdEntreprise(storeId:number){
  
  this.internlist.getInternsByIdEntreprise(storeId).subscribe(
  res => {
    this.Interns= res
    console.log("res",this.Interns);
    
  })
  
}
getInternsByIdSupervisor(id:number){
  this.internlist.getInternsByIdSupervisor(id);
  console.log(id);
}

}
