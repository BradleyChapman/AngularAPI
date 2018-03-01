import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import { TestModel } from './Models/test-model';
import 'rxjs/add/operator/map';


@Injectable()
export class ApiserviceService {

  private urlPath: string = "http://localhost:56463/api/values/"
  
  constructor(private http: Http) { 

  }

  public getStuff(): Observable<Array<TestModel>>{

    return this.http.get(this.urlPath).map((response: Response) => <Array<TestModel>>response.json()) ;
  }

  public getItem(id: number): Observable<Array<TestModel>>{
        let getUrl: string = this.urlPath + "/" + id;
    
        return this.http.get(getUrl).map((response: Response) => <Array<TestModel>>response.json()) ;
      }

  public putStuff(tmodel: TestModel): Observable<Response> {
    let header: Headers = new Headers({"Content-Type" : "application/json"});
    let options: RequestOptions = new RequestOptions({headers : header});
    let putUrl: string = this.urlPath + "/" + tmodel.id;

    return this.http.put(putUrl, tmodel, options);
  }

  public deleteStuff(tmodel: TestModel): Observable<Response> {
    let deleteUrl: string = this.urlPath + "/" + tmodel.id;

    return this.http.delete(deleteUrl);
  }

  public addStuff(tmodel: TestModel): Observable<TestModel> {
    let header: Headers = new Headers({"Content-Type" : "application/json"});
    let options: RequestOptions = new RequestOptions({headers : header});

    return this.http.post(this.urlPath, tmodel, options).map((response: Response) => <TestModel>response.json());
  }

}
