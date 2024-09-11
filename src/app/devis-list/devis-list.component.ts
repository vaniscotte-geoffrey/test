import { Component, OnInit } from '@angular/core';
import { DevisArticle } from '../models/catalog.model';
import { DevisService } from '../services/devis.service';

@Component({
  selector: 'app-devis-list',
  templateUrl: './devis-list.component.html',
  styleUrl: './devis-list.component.scss'
})
export class DevisListComponent implements OnInit {

  public devisArticle: DevisArticle[] = [];

  public constructor(
    private readonly devisService: DevisService
  ) {}

  public ngOnInit(): void {
    this.devisArticle = this.devisService.devis;
  }
}
