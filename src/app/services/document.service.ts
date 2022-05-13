import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from "rxjs";
import { IDocument } from '../model/document.model';
import endpointsJSON from '../jsonFiles/endpoints.json';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  endpoints:
    {
      serverName: String,
      endpoints: any
    }
    = endpointsJSON;
    myUrl: String= "";
  constructor(private http: HttpClient) { }
  getDocuments() : Observable<IDocument[]>{

    console.log('Full URL :>> ', this.endpoints.serverName + this.endpoints.endpoints.getDocuments );
    return this.http.get<IDocument[]>(this.endpoints.serverName + String(this.endpoints.endpoints.getDocuments))
    .pipe(catchError(this.handleError<IDocument[]>('documents',[])));

  }
  getDocumentsType() : Observable<IDocument[]>{

    console.log('Full URL :>> ', this.endpoints.serverName + this.endpoints.endpoints.getDocumentsType );
    return this.http.get<IDocument[]>(this.endpoints.serverName + String(this.endpoints.endpoints.getDocumentsType))
    .pipe(catchError(this.handleError<IDocument[]>('documents',[])));

  }

  updateViewCount(fileName:string,fileType:string) : void{

    
    const url = this.endpoints.serverName + String(this.endpoints.endpoints.updateViewCount);
    console.log('Full URL :>> ', url );
    const body = { docName: fileName, docType : fileType }
    this.http.put(url, body)
    .pipe(catchError(this.handleError('documents',[])))
    .subscribe((data) =>{
      console.log('data :>> ', data);
    });
    
  }

  public downloadDocument(myDocName: string, myDocPath: string) {
    //let params = new HttpParams().set("docName",docName).set("docPath", docPath); //Create new HttpParams
    return this.http.get(this.endpoints.serverName + String(this.endpoints.endpoints.downloadDocument),
    { 
      params: {
        docName: myDocName,
        docPath: myDocPath,
        docType: "PF"
      },
      observe: 'response', 
      responseType:'blob'
    });
  }
  private handleError<T>(_operation = 'operation', result?: T)
  {
    return (error:any ): Observable<T> =>{
      console.log(`failed: ${error.message}`);
      return of(result as T);
    }
  }
}
