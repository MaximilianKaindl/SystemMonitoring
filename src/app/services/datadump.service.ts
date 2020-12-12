import { Injectable, OnInit } from '@angular/core';
import { SystemInfo } from '../contracts/systeminfo';
import { Measurement } from '../contracts/measurement';

@Injectable({
  providedIn: 'root'
})
export class DatadumpService implements OnInit {
  public selectedIndex = 0;
  public appPages = [];
  public data: Map<string, Measurement> = new Map<string, Measurement>();
  
  constructor() { }

  ngOnInit(): void {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }  
  }

  pushFolder(infos : Measurement){
    if(this.appPages.find(p => p.title == infos.SystemInfo.Name) == undefined) {
      this.appPages.push({
        title: infos.SystemInfo.Name,
        url: '/folder/' + infos.SystemInfo.Name,
        icon: 'desktop' 
      });
    }
  }
  deleteFolder(name : string){
    if(this.appPages.find(p => p.title == name)){
      let index = this.appPages.findIndex(p => p.title == name);
      this.appPages.splice(index,1);
    }
  }
}
