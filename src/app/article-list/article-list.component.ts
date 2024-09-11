import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article, catalog } from '../models/catalog.model';
import { DevisService } from '../services/devis.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent implements OnInit {

  public articles: Article[] = [];

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly devisService: DevisService,
  ) { }

  public ngOnInit(): void {
    this.route.params.subscribe(param => {
      const catalogName: string = param['catalog'];
      this.articles = catalog.find(c => c.name === catalogName)?.articles ?? [];
    })
  }

  public addToDevis(article: Article): void {
    this.devisService.addArticle(article);
  }
}
