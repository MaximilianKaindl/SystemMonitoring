import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatadumpService } from '../services/datadump.service';
import { SystemInfo } from '../contracts/systeminfo';
import { Measurement } from '../contracts/measurement';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public systemInfo: SystemInfo;

  constructor(private activatedRoute: ActivatedRoute, private datadump: DatadumpService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

    this.systemInfo = this.datadump.data.get(this.folder);
  }

}
