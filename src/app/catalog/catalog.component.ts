import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catalog, Catalog } from '../models/catalog.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent {

  public catalogs: Catalog[] = catalog;

  public constructor(
    private readonly router: Router
  ) { }

  public goToCatalog(c: Catalog) {
    this.router.navigate(['articles', c.name])
  }

}

