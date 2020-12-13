import { Component, OnInit, AfterContentChecked, AfterViewChecked, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatadumpService } from '../services/datadump.service';
import { SystemInfo } from '../contracts/systeminfo';
import { Measurement } from '../contracts/measurement';
import { ChartData, ChartOptions } from 'chart.js';
import { StatisikshttpService } from '../services/statisikshttp.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {  
  public folder: string;
  public measurement: Measurement;
  protected isRasperry : boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private datadump: DatadumpService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.measurement = this.datadump.data.get(this.folder);
  }
}
