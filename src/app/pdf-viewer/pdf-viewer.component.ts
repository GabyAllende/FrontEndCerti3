import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import WebViewer from '@pdftron/webviewer';
@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements AfterViewInit {

  @ViewChild('viewer')
  viewerRef!: ElementRef;
  constructor() { }

  ngAfterViewInit(): void {
    const res = localStorage.getItem('docPath');
    const res2 = localStorage.getItem('docName');
    var myres:any = '';
    var myres2:any = '';
    if (res != null && res2 != null)
    {
      myres= JSON.parse(res);
      myres2= JSON.parse(res2);
      console.log('myres :>> ', myres);
      console.log('myres :>> ', myres2);
    }
    else{
      console.log("era null");
    }
    WebViewer({
      path: '../assets/lib',
      //initialDoc: "http://localhost/"+String(myres.docPath)+"/"+String(myres2.docName)
      initialDoc: "http://localhost:8080/PublicFiles/Ejemplo.pdf"
    }, this.viewerRef.nativeElement).then(instance => {

    });

  // here you can choose to keep it in the localStorage or remove it as shown below
    localStorage.removeItem('anime');
  }

  // viewFile():void{
  //   window.addEventListener("message", (event) => {
  //     console.log("Received data from child iframe ", event.data);
  //   });
  // }
  
  returnHome() :void {
    window.close();
  }
}
