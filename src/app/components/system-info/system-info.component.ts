import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { Measurement } from 'src/app/contracts/measurement';
import { DatadumpService } from 'src/app/services/datadump.service';
import { StatisikshttpService } from 'src/app/services/statisikshttp.service';

@Component({
  selector: 'app-system-info',
  templateUrl: './system-info.component.html',
  styleUrls: ['./system-info.component.scss'],
})
export class SystemInfoComponent implements OnInit,DoCheck {

  public maxChartDisplayValues: number = 100;
  
  @Input() folderInput: string;
  @Input() measurement: Measurement;

  private history: Measurement[] = new Array<Measurement>();

  public cpuChartData: ChartData;
  public ramChartData: ChartData;

  public cpuChartOptions: ChartOptions = {
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
            labelString: "% of Cpu used"
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

  public ramChartOptions: ChartOptions;

  private oldTimestamp : Date;

  constructor(private activatedRoute: ActivatedRoute, private datadump: DatadumpService, private statistiksService: StatisikshttpService) { }

  ngDoCheck(): void {
    if(this.measurement == undefined)
      return;

    if(this.measurement.Timestamp != undefined && this.cpuChartData != undefined && this.ramChartData != undefined && this.oldTimestamp != this.measurement.Timestamp)
    {
      this.history.push({...this.measurement});
      if(this.history.length > this.maxChartDisplayValues)
        this.history.shift();

      this.buildChartData();
      this.oldTimestamp = this.measurement.Timestamp;
    }
  }

  ngOnInit() {
    // this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    // this.measurement = this.datadump.data.get(this.folder);

    this.ramChartOptions = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
            ticks: {
              min: 0,
              max: this.measurement.SystemInfo.Ram.Max
            },
            scaleLabel: {
              display: true,
              labelString: "mb of Ram used"
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

    this.statistiksService.getStatistiksForDevice(this.folderInput,0,this.maxChartDisplayValues).subscribe(data => {
        this.history = data
      });
    this.buildChartData();
  }

  private buildChartData(){
    this.cpuChartData = {
      labels: this.history.map(m => m.Timestamp),
      datasets: [
        {
          label: "Cpu Usage",
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
          data: this.history.map(m => m.SystemInfo.Cpu.Utilisation),
          spanGaps: false
        }
      ]
    };

    this.ramChartData = {
      labels: this.history.map(m => m.Timestamp),
      datasets: [
        {
          label: "Ram Usage",
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
          data: this.history.map(m => m.SystemInfo.Ram.Max - m.SystemInfo.Ram.Used),
          spanGaps: false
        }
      ]
    };
  }
}
