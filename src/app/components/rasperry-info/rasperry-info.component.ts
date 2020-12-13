import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { Measurement } from 'src/app/contracts/measurement';
import { DatadumpService } from 'src/app/services/datadump.service';
import { StatisikshttpService } from 'src/app/services/statisikshttp.service';

@Component({
  selector: 'app-rasperry-info',
  templateUrl: './rasperry-info.component.html',
  styleUrls: ['./rasperry-info.component.scss'],
})
export class RasperryInfoComponent implements OnInit {
  public maxChartDisplayValues: number = 100;
  
  @Input() folderInput: string;
  @Input() measurement: Measurement;

  private history: Measurement[] = new Array<Measurement>();

  public humChartData: ChartData;
  public temperatureChartData: ChartData;

  public temperatureChartOptions: ChartOptions = {
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
          ticks: {
            min: 0,
            max: 100
          },
          scaleLabel: {
            display: true,
            labelString: "° Celsius"
          }
        }
      ],
      xAxes: [{
        ticks: {
          display: false
        }
      }]
    }
  };
  public humChartOptions: ChartOptions = {
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
          ticks: {
            min: 0,
            max: 100
          },
          scaleLabel: {
            display: true,
            labelString: "% Humidity"
          }
        }
      ],
      xAxes: [{
        ticks: {
          display: false
        }
      }]
    }
  };

  private oldTimestamp : Date;

  constructor(private activatedRoute: ActivatedRoute, private datadump: DatadumpService, private statistiksService: StatisikshttpService) { }

  ngDoCheck(): void {
    if(this.measurement == undefined)
      return;

    if(this.measurement.Timestamp != undefined && this.humChartData != undefined  && this.temperatureChartData != undefined && this.oldTimestamp != this.measurement.Timestamp)
    {
      this.history.push({...this.measurement});
      if(this.history.length > this.maxChartDisplayValues)
        this.history.shift();

      this.buildChartData();
      this.oldTimestamp = this.measurement.Timestamp;
    }
  }

  ngOnInit() {
    this.statistiksService.getStatistiksForRaspberry(this.folderInput,0,this.maxChartDisplayValues).subscribe(data => {
        this.history = data
      });
    this.buildChartData();
  }

  private buildChartData(){
    this.humChartData = {
      labels: this.history.map(m => m.Timestamp),
      datasets: [
        {
          label: "Humidity",
          fill: false,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.history.map(m => m.SystemInfo.Humidity),
          spanGaps: false
        }
      ]
    };
    this.temperatureChartData = {
      labels: this.history.map(m => m.Timestamp),
      datasets: [
        {
          label: "Temperature",
          fill: false,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.history.map(m => m.SystemInfo.Temperature),
          spanGaps: false
        }
      ]
    };
  }

}
