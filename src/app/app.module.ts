import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { HttpClientModule } from '@angular/common/http';
import { DocumentService } from './services/document.service';
import { RouterModule, Routes } from '@angular/router';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';


const routes : Routes = [
  {
    path: 'PdfViewer', component : PdfViewerComponent
  },
  {
    path: '**',
    component: DocumentListComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DocumentListComponent,
    PdfViewerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    DocumentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
