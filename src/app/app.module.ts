import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ClientComponent } from './client/client.component';
import { DevisListComponent } from './devis-list/devis-list.component';
import { DevisPreviewComponent } from './devis-preview/devis-preview.component';
import { DevisService } from './services/devis.service';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    ArticleListComponent,
    DevisListComponent,
    DevisPreviewComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DevisService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
