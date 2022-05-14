import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../services/document.service';
import {Router} from "@angular/router";
import { IDocument } from '../model/document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  public documents: any;
  public isOk = true;
  public verifiedExtensions: string[] = [
    'pdf',
    'xfdf',
    'fdf',
    'doc',
    'docx',
    'xls',
    'xlsx',
    'ppt',
    'pptx',
    'jpg',
    'png',
    'jfif',
    'mp4',
    'ogg',
    'webm',
    'mp3',
    'wav',
    'flac'
  ]
  public badgeClasses = {
    "badge rounded-pill bg-secondary": !this.isOk,
    "badge rounded-pill bg-success": this.isOk
  }
  
  constructor(private _documentService: DocumentService, private router:Router) { }

  ngOnInit(): void {
    this._documentService.getDocumentsType()
    .subscribe((data: any) => 
      {
        this.documents = data;
      }
    );
  }

  updateViewCount(fileName: string, fileType: string):void{
    console.log("llega al update");
    this._documentService.updateViewCount(fileName, fileType);
  }
  extension(filename:String):String{
    var splitName = filename.split(".");
    return splitName[splitName.length-1];
  }

  downloadDocument(fileName:string, filePath:string ){
    this._documentService.downloadDocument(fileName, filePath)
    .subscribe(response => {
      let blob = response.body as Blob;
      let a = document.createElement('a');
      a.download = String(fileName);
      a.href = window.URL.createObjectURL(blob);
      a.click();
    });
  }

  isExtension(fileName:string):boolean{
    const myEx = this.extension(fileName);
    return this.verifiedExtensions.includes(myEx+"");
  }

  extensionBadge(fileName:string):string
  {
    var myBadge = "";
    if(this.isExtension(fileName)){
      myBadge = "badge rounded-pill bg-success"
    }
    else{
      myBadge = "badge rounded-pill bg-secondary"
    }
    return myBadge;
  }

  goToPage(page :string, doc:any):void{
    console.log('doc :>> ', doc);
    this.updateViewCount(doc.DocName,doc.DocType);
    localStorage.setItem("docPath", JSON.stringify({docPath: doc.DocPath}));
    localStorage.setItem("docName", JSON.stringify({docName: doc.DocName}));
    window.open('/'+page);
    
  }
  getDate(fullDate:Date){
    
  }
}
