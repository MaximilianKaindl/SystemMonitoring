import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Measurement } from '../contracts/measurement';

@Injectable({
  providedIn: 'root'
})
export class StatisikshttpService {

  constructor(private http: HttpClient) { }

  cloudFunctionPath : string ='https://us-central1-systemmonitoring-294918.cloudfunctions.net/getMeasurements';
  cloudRaspberryFunctionPath : string ='https://us-central1-systemmonitoring-294918.cloudfunctions.net/getRaspberryMeasurements';

  getStatistiksForDevice(deviceName: string, pageIndex: number, pageSize: number) {
    let params = new HttpParams();
    params.append('deviceName', pageIndex.toString());
    return this.http.get<Measurement[]>(this.cloudFunctionPath, { params : params});
  }

  getStatistiksForRaspberry(deviceName: string, pageIndex: number, pageSize: number) {
    let params = new HttpParams();
    params.append('deviceName', pageIndex.toString());
    return this.http.get<Measurement[]>(this.cloudRaspberryFunctionPath, { params : params});
  }
}
