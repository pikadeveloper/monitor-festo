import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChartType, ChartOptions, ChartDataset } from 'chart.js';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { BaseChartDirective } from 'ng2-charts';


//lineChartType: ChartType = 'line';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy{
  @ViewChild(BaseChartDirective, { static: true }) chart!: BaseChartDirective;

  lineChartData: ChartDataset[] = [
    {
      data: [],
      label: 'Posición de la válvula',
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      fill: false,
    }
  ];

  lineChartLabels: string[] = [];

  lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        position: 'left',
        suggestedMin: 0, // Valor mínimo del eje y
        suggestedMax: 100 // Valor máximo del eje y
      }
    }
  };

  lineChartLegend = true;

  lineChartType: ChartType = 'line';

  lineChartStyles = {};

  private alive = true;
  private subscription: Subscription | undefined;

  ngOnInit() {
    this.subscription = interval(1000)
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.updateChartData();
        this.updateChartStyles();
      });
  }

  ngOnDestroy() {
    this.alive = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateChartData() {
    const lastValue = this.lineChartData[0].data[this.lineChartData[0].data.length - 1] as number || 60; // Obtener el último valor o 0 si no hay valores aún
    const randomChange = Math.random() * 5 - 2.5; // Generar un cambio incremental aleatorio limitado a un rango de -5 a +5
    const newValue = Math.min(90, Math.max(0, lastValue + randomChange)); // Calcular el nuevo valor asegurándose de que esté dentro del rango de 0 a 100

    const timestamp = new Date().toLocaleTimeString(); // Agregar una marca de tiempo

    // Verificar si se ha alcanzado el límite de datos antes de agregar un nuevo punto
    if (this.lineChartData[0].data.length >= 10) {
      this.lineChartData[0].data.shift(); // Eliminar el punto más antiguo
      this.lineChartLabels.shift(); // Eliminar la etiqueta correspondiente al punto más antiguo
    }

    // Agregar el nuevo valor a los datos y las etiquetas
    this.lineChartData[0].data.push(newValue);
    this.lineChartLabels.push(timestamp);

    // Notificar al gráfico que los datos han sido actualizados
    if (this.chart) {
      this.chart.update();
    }
  }

  updateChartStyles() {
    const lastValue = this.lineChartData[0].data[this.lineChartData[0].data.length - 1] || 0; // Obtener el último valor o 0 si no hay valores aún

    if (typeof lastValue === 'number' && lastValue < 40) {
      this.lineChartStyles = { 'background-color': 'red' };
    } else {
      this.lineChartStyles = { 'background-color': 'green' };
    }
  }
  constructor() {}
    single = [
      {
        name: 'Presión de alimentación',
        value: 4.5
      },
      {
        name: 'Señal de control',
        value: 2.8
      },
      {
        name: 'Señal de posición',
        value: 3.2
      },
      {
        name: 'Señal de fuerza',
        value: 12
      },
      {
        name: 'Estado de la comunicación',
        value: 1
      }
    ];

    valvula: { name: string, value: number }[] = [
      {
        name: 'Presión de alimentación',
        value: 4.5
      }
    ];

  // Configuración opcional

  showText= true;
  showAxis= true;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  tooltipDisabled = true;
  legend: boolean = true;
  legendPosition: string | any = 'below';
  colorScheme = {
    domain: ['#5AA454']
  };
}
