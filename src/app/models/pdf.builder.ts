import { NumberFormatPipe } from '@angular/common';

export async function getDevisExpressTemplate(invoice: any, client: any, entity: any, account: any,entityLogo: string, amountFunc: (amount: number, unitPrice: number, unit: string, tvaRate: string) => number): Promise<any> {
  const numberPipe: NumberFormatPipe = new NumberFormatPipe();
  const dueValuePipe: DueValuePipe = new DueValuePipe();
  const unitLabelPipe: UnitLabelPipe = new UnitLabelPipe();
  let TABLE_HEADER_COLOR: string = '';
  const TABLE_HEADER_TEXT_COLOR: string = '#FFFFFF';
  const amountHt: number = invoice.lines.reduce((acc, item) => acc + amountFunc(item.quantity, item.unitPrice, item.unit, '0'), 0);
  const invoiceTypeMap: { [key: string]: number } = {
    'FACTURE': 380,
    'AVOIR': 381,
    'DEVIS': 382,
  };
  const invoiceTypeValue = invoiceTypeMap[invoice.type];
  const amountTtc: number = invoice.lines.reduce((acc, item) => acc + amountFunc(item.quantity, item.unitPrice, item.unit, item.tvaRate ?? '20'), 0);
  const amountTva: number = amountTtc - amountHt;
  const tvaAmounts: {rate: number, amount: number}[] = invoice.lines.map(item => {
    const rate: number = Number(item.tvaRate) ?? 20;
    const amountHt = amountFunc(item.quantity, item.unitPrice, item.unit, '0');
    const amount = amountFunc(item.quantity, item.unitPrice, item.unit, item.tvaRate ?? '20');
    return {rate, amount: rate !== 0 ? amount - amountHt : amountHt};
  }).reduce((acc, item) => {
    const index = acc.findIndex((tva) => tva.rate === item.rate);
    if (index === -1) {
      acc.push(item);
    } else {
      acc[index].amount += item.amount;
    }
    return acc;
  }, []);
  const invoiceTypeLabel = InvoiceTypeLabel.find((type) => type.value === invoiceTypeValue)?.label;
  const contractNumber: string = invoice.contractNumber;
  const deliveryNumber: string = invoice.deliveryNumber;
  const tvaRate = 0;
  // const tvaRate = typeof invoice.tvaRate === 'number' ? invoice.tvaRate : 0;
  let date: Date;

  if (invoice.plannedDate instanceof Date) {
    date = invoice.plannedDate;
  } else {
    date = new Date(invoice.plannedDate);
  }

  switch (entity.name) {
    case 'E-mothep':
      TABLE_HEADER_COLOR = '#91B750';
      break;
    case 'School':
      TABLE_HEADER_COLOR = '#62b4c6';
      break;
    case 'E-mothep Group':
      TABLE_HEADER_COLOR = '#A4A4A4';
      break;
    case 'Casa':
      TABLE_HEADER_COLOR = '#91B750';
      break;
    default:
      TABLE_HEADER_COLOR = '#91B750';
      break;
  }
  return {
    defaultStyle: {
      font: 'Roboto',
    },
    info: {
      title: invoice.label,
    },
    styles: {
      coloredSection: {
        fillColor: TABLE_HEADER_COLOR,
        color: TABLE_HEADER_TEXT_COLOR
      }
    },
    content: [
      {
        columns: [
          [
            { text: `${entity.name}`, bold: true },
            { text: entity.addr1 },
            { text: entity.addr2 },
            { text: `${entity.zipCode} ${entity.city}` },
            { text: 'Tel : 03 66 72 51 65' }
          ],
          { image: 'logo', width: 150 }
        ]
      },
      {
        columns: [
          { width: '*', text: '' },
          {
            width: 'auto',
            columns: [
              [
                ...getAddressLines(client),
              ],
            ]
          }
        ],
        margin: [0, 20, 0, 0],
        alignment: 'left',

      },
      {
        columns: [
          {
            width: '*',
            columns: [
              [
                { text: `${invoiceTypeLabel} N° ${invoice.invoiceNumber ? invoice.invoiceNumber : ' '}`, bold: true },
                { text: invoice.clientNumber ? `Client : ${invoice.clientNumber}` : '' },
                { text: deliveryNumber ? `Commande n° ${deliveryNumber}` : '' },
                // { text: `Projet : ${project.name}` },
                { text: contractNumber !== '' ? `Contrat : ${contractNumber}` : '' },
              ]
            ]
          },
          { width: 'auto', text: `${entity.city}, le ${date.toLocaleDateString()}` },
        ],
        margin: [0, 20, 0, 0]
      },
      {
        table: {
          widths: ['*', 'auto', 30, 'auto', 'auto', 25, 'auto'],
          heights: [20, 125],
          body: [
            [
              { text: 'Désignation', bold: true, fillColor: TABLE_HEADER_COLOR, color: '#FFFFFF', alignment: 'center' },
              { text: 'Qte', bold: true, fillColor: TABLE_HEADER_COLOR, color: '#FFFFFF', alignment: 'center' },
              { text: 'Unité', bold: true, fillColor: TABLE_HEADER_COLOR, color: '#FFFFFF', alignment: 'center'},
              { text: 'P.U. HT', bold: true, fillColor: TABLE_HEADER_COLOR, color: '#FFFFFF', alignment: 'center' },
              { text: 'Total HT', bold: true, fillColor: TABLE_HEADER_COLOR, color: '#FFFFFF', alignment: 'center' },
              { text: 'TVA', bold: true, fillColor: TABLE_HEADER_COLOR, color: '#FFFFFF', alignment: 'center' },
              { text: 'Total TTC', bold: true, fillColor: TABLE_HEADER_COLOR, color: '#FFFFFF', alignment: 'center' }
            ],
            [
              {
                stack: invoice.lines.map(item => [{text: item.name}]),
              },
              {
                stack: invoice.lines.map(item => [
                  {
                    text: numberPipe.transform(item.quantity),
                    alignment: 'right',
                  }
                ])
              },
              {
                stack: invoice.lines.map(item => [
                  {
                    text: unitLabelPipe.transform(item.unit).charAt(0),
                    alignment: 'right',
                  }
                ])
              },
              {
                stack: invoice.lines.map(item => [
                  {
                    text: numberPipe.transform(item.unitPrice),
                    alignment: 'right',
                  }
                ])
              },
              {
                stack: invoice.lines.map(item => [
                  {
                    text: numberPipe.transform(amountFunc(item.quantity, item.unitPrice, item.unit, '0')),
                    alignment: 'right',
                  }
                ])
              },
              {
                stack: invoice.lines.map(item => [
                  item.tvaRate === '0' ? { text: 'Exo', alignment: 'right' } : {
                    text: `${item.tvaRate}%`,
                    alignment: 'right',
                  }
                ])
              },
              {
                stack: invoice.lines.map(item => [
                  {
                    text: numberPipe.transform(
                      amountFunc(item.quantity, item.unitPrice, item.unit, item.tvaRate ?? '20')
                    ),
                    alignment: 'right',
                  }
                ])
              }
            ]
          ]
        },
        margin: [0, 20, 0, 0]
      },
      {
        columns: [
          {
            width: 'auto',
            columns: [
              [
                { text: 'Condition de règlement :', bold: true },
                { text: account?.name },
                { text: `Domiciliation : ${account?.domiciliation}` },
                { text: `IBAN : ${account?.iban}` },
                { text: `BIC : ${account?.swift}` },
                { text: 'Cette facture n\'est pas escomptable' }
              ]
            ]
          },
          {
            width: '*',
            columns: [
              [
                {
                  layout: {
                    hLineWidth: function (i, node) {
                      return (i === 0 || i === node.table.body.length) ? 1 : 0;
                    },
                    vLineWidth: function (i, node) {
                      return (i === 0 || i === node.table.widths.length) ? 1 : 0;
                    },
                    hLineColor: function (i, node) {
                      return (i === 0 || i === node.table.body.length) ? 'black' : '';
                    },
                    vLineColor: function (i, node) {
                      return (i === 0 || i === node.table.widths.length) ? 'black' : '';
                    },
                  },
                  table: {
                    widths: ['*', '*'],
                    body: [
                      [
                        {
                          text: 'Total H.T. en EUR',
                        },
                        {
                          text: numberPipe.transform(amountHt),
                          alignment: 'right',
                          margin: [0, 0, 5, 0]
                        },
                      ],
                      [
                        {
                          stack: tvaAmounts.map((tvaAmount) => [
                            tvaAmount.rate !== 0 ? { text: `T.V.A. à ${numberPipe.transform(tvaAmount.rate)}%` } : { text: 'Total exonérée' },
                          ])
                        },
                        {
                          stack: tvaAmounts.map((tvaAmount) => [
                            { text: numberPipe.transform(tvaAmount.amount), alignment: 'right', margin: [0, 0, 5, 0] },
                          ])
                        },
                      ]
                    ]
                  }
                },
                { text: ' ' },
                {
                  table: {
                    widths: ['*'],
                    body: [
                      [
                        {
                          style: 'coloredSection',
                          columns: [
                            {
                              columns: [
                                {
                                  width: '*',
                                  text: 'Total T.T.C. en EUR',
                                  bold: true
                                },
                              ]
                            },
                            {
                              columns: [
                                {
                                  width: '*',
                                  text: numberPipe.transform(amountTtc),
                                  bold: true,
                                  alignment: 'right',
                                  margin: [0, 0, 5, 0]
                                }
                              ]
                            }
                          ],
                        }
                      ]
                    ]
                  }
                }
              ]
            ]
          }
        ],
        columnGap: 10,
        margin: [0, 20, 0, 0]
      },
      {
        table: {
          widths: ['*'],
          body: [
            [{ text: `Validité du devis ${invoice.due}`, alignment: 'center', bold: true }],
          ]
        },
        margin: [0, 20, 0, 0]
      },
      {
        italics: true,
        columns: [
          [
            { text: invoice.comment || '' , bold: true },
            { text: ' ' },
            { text: 'En cas de retard de paiement, il sera appliqué des pénalités de 10% par mois de retard.' },
            { text: 'En outre, une indemnité forfaitaire pour frais de recouvrement de 40€ sera due.' },
          ]
        ],
        margin: [0, 40, 0, 0]
      },
    ],
    footer: [
      {
        text: `${entity.legalStatus} ${entity.name} ${entity.capital === '0' ? '' : `au capital de ${entity.capital} euros`} ${entity.country.toLowerCase().includes('france') ? `- N° SIRET : ${entity.siret} - code NAF ${entity.codeNaf}` : ''} `,
        alignment: 'center'
      },
      {
        text: `N° TVA : ${entity.intracommunautaire}`,
        alignment: 'center'
      }
    ],
    images: {
      logo: entityLogo
    }
  }

  function getAddressLines(client: IClient) {
    const addressLines = [];

    const nameLine = { text: getClientName(client), bold: true };
    addressLines.push(trimToMaxLength(nameLine, 38));

    const typeResidenceLine = { text: client?.society?.typeResidence || '' };
    addressLines.push(trimToMaxLength(typeResidenceLine, 38));

    const streetInfo = client?.society?.adress || '';
    const streetNumberLabel = streetInfo ? `${streetInfo}` : '';
    const streetLine = { text: streetNumberLabel };
    addressLines.push(trimToMaxLength(streetLine, 38));

    const specialMentionCity = client?.society?.specialMention
      ? `${client.society.specialMention}`
      : '';
    const specialMentionCityLine = { text: specialMentionCity };
    addressLines.push(trimToMaxLength(specialMentionCityLine, 38));

    const zipCodeCityOrCedex = client?.society?.zipCode && client?.society?.city
      ? `${client.society.zipCode} ${client.society.city}`
      : `${client?.society?.cedexCode || ''} ${client?.society?.cedexLabel || ''}`;
    const zipCodeCityOrCedexLine = { text: zipCodeCityOrCedex };
    addressLines.push(trimToMaxLength(zipCodeCityOrCedexLine, 38));

    const intracommunautaireLine = { text: `TVA Intra: ${client?.society?.intracommunautaire || ''}` };
    addressLines.push(trimToMaxLength(intracommunautaireLine, 38));

    addressLines.push({ text: '' });

    const maxLines = 7;
    if (addressLines.length > maxLines) {
      addressLines.splice(maxLines);
    }

    return addressLines;
  }

  function trimToMaxLength(line: any, maxLength: number) {
    if (line.text.length > maxLength) {
      line.text = line.text.substring(0, maxLength);
    }
    return line;
  }


}
