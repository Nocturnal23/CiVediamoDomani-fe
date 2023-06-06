import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-event',
  templateUrl: './dashboard-event.component.html',
  styleUrls: ['./dashboard-event.component.css']
})
export class DashboardEventComponent {
  titolo: string;
  organizzatore: string;
  partecipanti: number;
  dettagli: string;
  gestisci: string;


  constructor() {
    this.titolo = "titolo"
    this.organizzatore = "organizzatore"
    this.partecipanti = 0
    this.dettagli = "dettagli"
    this.gestisci = "gestisci"
  }


}
