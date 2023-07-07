import { Injectable } from '@angular/core';

interface Country {
  name: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private data: Country[] = [
    {
      "name": "Posición de la válvula",
      "value": "75% abierta"
    },
    {
      "name": "Presión de alimentación",
      "value": "4.5 bar"
    },
    {
      "name": "Señal de control",
      "value": "2.8 mA"
    },
    {
      "name": "Señal de posición",
      "value": "3.2 V"
    },
    {
      "name": "Señal de fuerza",
      "value": "12 N"
    },
    {
      "name": "Alarmas o eventos",
      "value": "Sin alarmas o eventos activos"
    },
    {
      "name": "Estado de la comunicación",
      "value": "Conexión establecida"
    }
  ];


  get countryData() {
    return this.data;
  }
  /*
  randomData() {
    this.data = [
      {
        "name": "Germany",
        "value": Math.random() * 1000000
      },
      {
        "name": "USA",
        "value": Math.random() * 1000000
      },
      {
        "name": "France",
        "value": Math.random() * 1000000
      },
        {
        "name": "UK",
        "value": Math.random() * 1000000
      }
    ];
  }
  */
}
