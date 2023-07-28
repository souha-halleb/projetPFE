import { Component, OnInit } from '@angular/core';
import { supervisor } from '../supervisor';
import { AuthenticateService } from '../services/authenticate.service';
import { assoc } from '../assoc';
import { intern } from '../intern';
@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class SupervisorComponent implements OnInit{

public Supervisor : supervisor[] = [];
public Interns : intern[] = [];

constructor(private supervisorlist:AuthenticateService){}
ngOnInit(): void {
  const enterpriseId = Number(localStorage.getItem("id"));
  this.getSupervisorByIdEntreprise(enterpriseId);
}
getSupervisors(){
  this.supervisorlist.getAllSupervisors().subscribe( 
    res => {
      this.Supervisor = res
      console.log("res",this.Supervisor);
      
    }
  )
 
  }
  getSupervisorById(id:number){
    this.supervisorlist.getSupervisorById(id).subscribe(
      res=>{
        this.Supervisor=res
        console.log("res",this.Supervisor);
      }
    );
    
  }
  getSupervisorByIdEntreprise(storeId:number){
  
    this.supervisorlist.getSupervisorByIdEntreprise(storeId).subscribe(
    res => {
      this.Supervisor= res
      console.log("res",this.Supervisor);
    
    },
    (error) => {
      console.log(error)
    });
    
  }
  assignSupervisorToIntern(supervisor: supervisor, intern: intern) {
    const request:assoc  = {
    supervisor:supervisor,
    intern:intern
    };
    this.supervisorlist.assignSupervisorToIntern(request)
      .subscribe(res => {
        console.log(res)
       
      }, (error) => {
       console.log(error)
      });
  }
  
  assignSupervisorToInternById(supervisorId: number, internId: number) {
    this.supervisorlist.assignSupervisorToInternById(supervisorId, internId)
      .subscribe(res => {
       console.log(res)
      }, (error) => {
        console.log(error)
      });
  }
  
  
}


