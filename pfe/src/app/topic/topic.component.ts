import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/authenticate.service';
import { Router } from '@angular/router';
import { topic } from '../topic';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  public Topics : topic[] = [];

  constructor(private router: Router, private myservice: AuthenticateService) {
    
  }

  ngOnInit(): void {
    
  }
  topicfrm={
      title:"",
     description:"",
      duration:"",
      field:"",
      enterpriseId:""
  }

  createTopic() {
    this.topicfrm.enterpriseId =localStorage.getItem('id') || ""
    console.log(this.topicfrm)

    this.myservice.createTopic(this.topicfrm)
      .subscribe(res => {
        console.log(res)
        this.router.navigate(['topics/topicList']);
        

      }, (error) => {
        console.log(error)

      });
  }

  addActivityToTopic(topicId: number, request: any) {
    this.myservice.addActivityToTopic(topicId, request)
      .subscribe(res=>{
        console.log(res);
        
      }, (error) => {
        console.log(error)

      });
  }

  getTopicsByEnterprise(enterpriseId: number) {
    this.myservice.getTopicsByEnterprise(enterpriseId)
      .subscribe(res => {
        console.log(res)
      }, (error) => {
        console.log(error)
      });
  }

  getTopicsByIntern(internId: number) {
    this.myservice.getTopicsByIntern(internId)
      .subscribe(res => {
        console.log(res)

      }, (error) => {
        console.log(error)
      });
  }

  assignTopicToIntern(internId: number, topicId: number) {
    this.myservice.assignTopicToIntern(internId, topicId)
      .subscribe(res => {
       console.log(res)
      }, (error) => {
        console.log(error)
      });
  }
}







