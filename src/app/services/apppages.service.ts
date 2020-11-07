import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApppagesService {
  public selectedIndex = 0;
  public appPages = [];

  constructor() { }

  init(){
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
