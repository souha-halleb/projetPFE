import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Enterprise } from '../Enterprise';
import { Observable } from 'rxjs';
import { authenticate } from '../authenticate';
import { subscribeUser } from '../subscribeUser';
import { intern } from '../intern';
import { supervisor } from '../supervisor';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { EnabledBlockingInitialNavigationFeature } from '@angular/router';
import { topic } from '../topic';


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private serverURL = "http://localhost:8080/api/v1";

  constructor(  private http : HttpClient,) { 

  }
 
 public getAllEnterprises() : Observable<Enterprise[]>{
    let accessToken = localStorage.getItem("accesstoken");
    console.log(accessToken);
    
    const headers = new HttpHeaders({
        'Authorization':'Bearer '+ accessToken
      })

    return this
      .http
        .get<Enterprise[]>('http://localhost:8080/api/v1/enterprises/all',{headers : headers});
      
  }
  public getEnterpriseById(id:number) : Observable<any>{
    let accessToken = localStorage.getItem("accesstoken");
    console.log(accessToken);
    
    const headers = new HttpHeaders({
        'Authorization':'Bearer '+ accessToken
      })

    return this
      .http
        .get<Enterprise[]>('http://localhost:8080/api/v1/enterprises/'+id,{headers : headers});
      
  }

 public blockEnterprise(id : number) :Observable<any>{
    let accessToken = localStorage.getItem("accesstoken");
    console.log("id from service ",id);
    

      return this.http.post("http://localhost:8080/api/v1/enterprises/block",id);
  }
  public enableEnterprise(id : number):Observable<any>{
    let accessToken = localStorage.getItem("accesstoken");
    console.log(accessToken);
    
    const headers = new HttpHeaders({
        'Authorization':'Bearer '+ accessToken
      })

    return this
      .http
        .put('http://localhost:8080/api/v1/enterprises/enable/'+id,{headers : headers});
  }
  public enterpriseRegister(enterprise : Enterprise) : Observable<Enterprise>{
    return this.http.post<Enterprise>(`${this.serverURL}/auth/register/enterprise`, enterprise);
  }

  
        public authenticate(user:any): Observable<any>{
            return this.http.post(`${this.serverURL}/auth/authenticate`, user);
      
        }
        public Register(Data:any, role:String) : Observable<any>{

          if(role == "entreprise"){
            return this.http.post(`${this.serverURL}/auth/register/enterprise`, Data);
           

            }
          else  if (role == "supervisor"){
            return this.http.post(`${this.serverURL}/auth/register/supervisor`, Data);


          }else{
            return this.http.post(`${this.serverURL}/auth/register/intern`, Data);

          }
        }

      
      public getInterns() : Observable<intern[]>{
        let accessToken = localStorage.getItem("accesstoken");
        console.log(accessToken);
        
        const headers = new HttpHeaders({
            'Authorization':'Bearer '+ accessToken
          })
    
        return this
          .http
            .get<intern[]>('http://localhost:8080/api/v1/intern/all',{headers : headers});
          
      }
      public getInternsById(id:number) : Observable<any>{
        let accessToken = localStorage.getItem("accesstoken");
        console.log(accessToken);
        
        const headers = new HttpHeaders({
            'Authorization':'Bearer '+ accessToken
          })
    
        return this
          .http
            .get<intern[]>('http://localhost:8080/api/v1/intern/'+id,{headers : headers});
          
      }
      public getInternsByIdEntreprise(id:number) : Observable<any>{
        let accessToken = localStorage.getItem("accesstoken");
        console.log(accessToken);
        
        const headers = new HttpHeaders({
            'Authorization':'Bearer '+ accessToken
          })
    
        return this
          .http
            .get<intern[]>('http://localhost:8080/api/v1/intern/byEnterprise/'+id,{headers : headers});
          
      }
      public getInternsByIdSupervisor(id:number) : Observable<any>{
        let accessToken = localStorage.getItem("accesstoken");
        console.log(accessToken);
        
        const headers = new HttpHeaders({
            'Authorization':'Bearer '+ accessToken
          })
    
        return this
          .http
            .get<intern[]>('http://localhost:8080/api/v1/intern/bySupervisor/'+id,{headers : headers});
          
      }
      //topic
      createTopic(topicfrm:any) :Observable<any> {
        let accessToken = localStorage.getItem("accesstoken");
        console.log(accessToken);
        
        const headers = new HttpHeaders({
            'Authorization':'Bearer '+ accessToken
          })
    
        return this
          .http
        .post('http://localhost:8080/api/v1/topics/create', topicfrm, {headers : headers});
      }
    
      addActivityToTopic(topicId: number, request: any):Observable<any> {
        return this.http.post('http://localhost:8080/api/v1/topics/addActivity/${topicId}', request);
      }
    
      getTopicsByEnterprise(enterpriseId: number): Observable<any>{
        let accessToken = localStorage.getItem("accesstoken");
        console.log(accessToken);
        
        const headers = new HttpHeaders({
            'Authorization':'Bearer '+ accessToken
          })
        return this.http.get(`http://localhost:8080/api/v1/topics/byEnterprise/${enterpriseId}`, {headers : headers});
      }
    
      getTopicsByIntern(internId: number):Observable<any> {
        let accessToken = localStorage.getItem("accesstoken");
        console.log(accessToken);
        
        const headers = new HttpHeaders({
            'Authorization':'Bearer '+ accessToken
          })
        return this.http.get(`'http://localhost:8080/api/v1/topics/byIntern/${internId}`,{headers : headers});
      }
    
      assignTopicToIntern(internId: number, topicId: number):Observable<any> {
        console.log(internId,topicId)
        let accessToken = localStorage.getItem("accesstoken");
        console.log(accessToken);
        
        const headers = new HttpHeaders({
            'Authorization':'Bearer '+ accessToken
          })
    
        return this.http.post(`http://localhost:8080/api/v1/topics/assign/${topicId}/${internId}`,null);
      }


      //supervisor:
      public getAllSupervisors() : Observable<supervisor[]>{
        let accessToken = localStorage.getItem("accesstoken");
        console.log(accessToken);
        
        const headers = new HttpHeaders({
            'Authorization':'Bearer '+ accessToken
          })
    
        return this
          .http
            .get<supervisor[]>('http://localhost:8080/api/v1/supervisor/all',{headers : headers});
          
      }
      public getSupervisorById(id:number) : Observable<any>{
        let accessToken = localStorage.getItem("accesstoken");
        console.log(accessToken);
        
        const headers = new HttpHeaders({
            'Authorization':'Bearer '+ accessToken
          })
    
        return this
          .http
            .get<intern[]>('http://localhost:8080/api/v1/supervisor/'+id,{headers : headers});
          
      }
      public getSupervisorByIdEntreprise(EnterpriseId:number) : Observable<any>{
        let accessToken = localStorage.getItem("accesstoken");
        console.log(accessToken);
        
        const headers = new HttpHeaders({
            'Authorization':'Bearer '+ accessToken
          })
    
        return this
          .http
            .get<supervisor[]>('http://localhost:8080/api/v1/supervisor/byEnterprise/'+EnterpriseId,{headers : headers});
          
      }
      assignSupervisorToIntern(request: any): Observable<any> {
        let accessToken = localStorage.getItem("accesstoken");
        console.log(accessToken);
        
        const headers = new HttpHeaders({
            'Authorization':'Bearer '+ accessToken
        })
        return this.http.put<void>('http://localhost:8080/api/v1/supervisor/assign', request,{headers : headers});
      }
    
      assignSupervisorToInternById(supervisorId: number, internId: number): Observable<any> {
        let accessToken = localStorage.getItem("accesstoken");
        console.log(accessToken);
        
        const headers = new HttpHeaders({
            'Authorization':'Bearer '+ accessToken
        })
    
        return this
          .http.put<void>(`http://localhost:8080/api/v1/supervisor/assign/${supervisorId}/to/${internId}`, {headers:Headers});
      }      
    }
    
    
    
    
    
    
    

   
