import { Component, OnInit } from '@angular/core';
import { Contacts } from '@capacitor-community/contacts';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {

  public constructor() {}

  public address: {
    rue: string,
    pays: string;
    postal: string;
    ville: string;
  } = {
    rue: '',
    pays: '',
    postal: '',
    ville: ''
  };

  public contact: {
    prenom: string;
    nom: string;
    email: string;
    tel: string;
  } = {
    prenom: '',
    nom: '',
    email: '',
    tel: '',
  }

  public ngOnInit(): void {
    this.makePDF();
  }

  public async makePDF(): Promise<void> {
    // const pdfMakeModule = await import("pdfmake/build/pdfmake");
    // const pdfFontsModule = await import("pdfmake/build/vfs_fonts");
    // const pdfMake = pdfMakeModule.default;
    // pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    // const def = {
    //   content: "A sample PDF document generated using Angular and PDFMake",
    // };
    // pdfMake.createPdf(def).getDataUrl(r => {}, {

    // });
    // const doc = new jsPDF();

    // doc.text('Hello world!', 10, 10);
    // doc.output('dataurlstring')
  }



  public async fillContact(): Promise<void> {
    const result = await Contacts.getContacts({
      projection: {
        // Specify which fields should be retrieved.
        name: true,
        phones: true,
        postalAddresses: true,
      },
    });

    console.log('CONTACTS : ', JSON.stringify(result))
  }

  public fillLoc(): void {
    const success = (pos: any) => {
      var crd = pos.coords;
      console.log(pos.coords.accuracy);
      console.log(JSON.stringify(pos))

      fetch(`https://api.tomtom.com/search/2/reverseGeocode/${crd.latitude}%2C${crd.longitude}.json?key=E88mF91Jt9iRoNjhBAETfTIvDtdXAsoV`).then(response => response.json()).then(r => {
        const address = r.addresses[0].address;
        console.log(address);

        this.address.rue = address.streetNameAndNumber;
        this.address.pays = address.country;
        this.address.postal = address.postalCode;
        this.address.ville = address.municipality;
      })
    };

    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  }
}
