import { Injectable } from '@angular/core';
import { SystemInfo } from '../contracts/systeminfo';
import { Measurement } from '../contracts/measurement';

@Injectable({
  providedIn: 'root'
})
export class DatadumpService {

  public data: Map<string, Measurement> = new Map<string, Measurement>();
  
  constructor() { }
}
