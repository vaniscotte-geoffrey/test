import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ClientComponent } from './client/client.component';
import { DevisListComponent } from './devis-list/devis-list.component';
import { DevisPreviewComponent } from './devis-preview/devis-preview.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'client',
    pathMatch: 'full'
  },
  {
    path: 'catalog',
    component: CatalogComponent
  },
  {
    path: 'articles/:catalog',
    component: ArticleListComponent
  },
  {
    path: 'devis',
    component: DevisListComponent
  },
  {
    path: 'devis/preview',
    component: DevisPreviewComponent
  },
  {
    path: 'client',
    component: ClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
