import { Injectable } from '@angular/core';
import { SystemInfo } from '../contracts/systeminfo';

@Injectable({
  providedIn: 'root'
})
export class DatadumpService {

  public data: Array<SystemInfo> = new Array<SystemInfo>();

  constructor() { }
}
