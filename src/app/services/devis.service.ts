import { Injectable } from '@angular/core';
import { Article, DevisArticle } from '../models/catalog.model';

@Injectable()
export class DevisService {

  public devis: DevisArticle[] = [];

  public addArticle(article: Article): void {
    const existingArticle = this.devis.find(d => d.article.name === article.name);
    if (existingArticle) {
      existingArticle.quantity++
    } else {
      this.devis.push({
        article,
        quantity: 1
      })
    }
  }

}
