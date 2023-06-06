import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {
  nome: string;
  cognome: string;
  tipo_utente: string;
  eventi_creati: number;
  gestisci: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.nome = "nome1"
    this.cognome = "cognome1"
    this.tipo_utente = "tipo1"
    this.eventi_creati = 1
    this.gestisci = "gestisci"
  }

  ngOnInit() {
  }

}
