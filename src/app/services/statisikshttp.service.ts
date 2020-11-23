import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Measurement } from '../contracts/measurement';

@Injectable({
  providedIn: 'root'
})
export class StatisikshttpService {

  constructor(private http: HttpClient) { }

  basePath: string = 'https://systemmonitoringlogger.azurewebsites.net/api/Statistics';
  cloudFunctionPath : string ='https://us-central1-systemmonitoring-294918.cloudfunctions.net/getMeasurements';

  getStatistiksForDevice(deviceName: string, pageIndex: number, pageSize: number) {
    // let params = new HttpParams();

    // params.append('pageIndex', pageIndex.toString());
    // params.append('pageSize', pageSize.toString());

    // return this.http.get<Measurement[]>(this.basePath + '/' + deviceName, {params: params});
    return this.getStatistiksForDeviceCloudFunction();
  }

  getStatistiksForDeviceCloudFunction() {
    return this.http.get<Measurement[]>(this.cloudFunctionPath);
  }
  
}
