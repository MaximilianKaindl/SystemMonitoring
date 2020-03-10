import { Injectable } from '@angular/core';
import { SystemInfo } from '../contracts/systeminfo';

@Injectable({
  providedIn: 'root'
})
export class DatadumpService {

  public data: Map<string, SystemInfo> = new Map<string, SystemInfo>();

  constructor() { }
}
