export type Catalog = {
  name: string;
  articles: Article[];
}

export type Article = {
  name: string;
  unit: string;
  prix: number;
  tva: number;
}

export type DevisArticle = {
  article: Article;
  quantity: number;
}

export type Devis = {
  articles: DevisArticle[];
}


export const catalog: Catalog[] = [
  {
    name: 'Catalog 1',
    articles: [
      {
        name: '1/#1',
        prix: 10,
        tva: 20,
        unit: 'h'
      },
      {
        name: '1/#2',
        prix: 20,
        tva: 12,
        unit: 'm2'
      },
      {
        name: '1/#3',
        prix: 225,
        tva: 15,
        unit: 'mL'
      },
    ]
  },
  {
    name: 'Catalog 2',
    articles: [
      {
        name: '2/#1',
        prix: 10,
        tva: 20,
        unit: 'h'
      },
      {
        name: '2/#2',
        prix: 20,
        tva: 12,
        unit: 'm2'
      },
      {
        name: '2/#3',
        prix: 225,
        tva: 15,
        unit: 'mL'
      },
    ]
  },
];
