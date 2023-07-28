import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/authenticate.service';
import { topic } from '../topic';
import { intern } from '../intern';
import { supervisor } from '../supervisor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topiclist',
  templateUrl: './topiclist.component.html',
  styleUrls: ['./topiclist.component.css']
})
export class TopiclistComponent implements OnInit {
  public Topics : topic[] = [];
  public Interns: intern[]=[];
  public Supervisor: supervisor[]=[];  
  public sId: number=0;
  public nId: number=0;
  public tId: number=0;



  constructor(private topicList:AuthenticateService,private router:Router){}
  ngOnInit(): void {
    const enterpriseId = Number(localStorage.getItem("id"));
    this.getTopics(enterpriseId)
    this.getInternsByIdEntreprise(enterpriseId)
    this.getSupervisorByIdEntreprise(enterpriseId)

    
  }

  getInternsByIdEntreprise(storeId:number){
  
    this.topicList.getInternsByIdEntreprise(storeId).subscribe(
    res => {
      this.Interns= res
      console.log("res",this.Interns);
    
    })
    
  }


getTopics(enterpriseId:number){
  
  this.topicList.getTopicsByEnterprise(enterpriseId).subscribe(
    res => {
      this.Topics= res
      console.log("res",this.Topics);
     }, (error) => {
       console.log(error)
     });
}
assignTopicToIntern( topicId: number){

  this.topicList.assignTopicToIntern(this.tId, topicId)
      .subscribe(res => {
       console.log("res",this.Topics)
      }, (error) => {
        console.log(error)
      });
}
assignSupervisorToIntern(supervisorId:number,topicId:number){
  
  this.topicList.assignSupervisorToInternById(supervisorId,topicId)
  .subscribe(res => {
    console.log("res",this.Topics)
   }, (error) => {
     console.log(error)
   });
  
}


assign(idTopic:number){
  console.log("id topic",idTopic)
  this.assignTopicToIntern(idTopic);
  this.assignSupervisorToIntern(this.sId,this.tId)
}

getSupervisorByIdEntreprise(storeId:number){
  
  this.topicList.getSupervisorByIdEntreprise(storeId).subscribe(
  res => {
    this.Supervisor= res
    console.log("res",this.Supervisor);
  
  },
  (error) => {
    console.log(error)
  });
  
}


checkList(topicID:any){
  this.nId=topicID;
  this.topicList.assignTopicToIntern(this.tId, this.nId)
  .subscribe(res => {
    console.log("hhhhh"+res)
    
    

  }, (error) => {
    console.log(error)

  });
  
 
}


}