import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Measurement } from '../contracts/measurement';

@Injectable({
  providedIn: 'root'
})
export class StatisikshttpService {

  constructor(private http: HttpClient) { }

  basePath: string = 'https://localhost:5100/api/statistics'

  getStatistiksForDevice(deviceName: string, pageIndex: number, pageSize: number) {
    let params = new HttpParams();

    params.append('pageIndex', pageIndex.toString());
    params.append('pageSize', pageSize.toString());

    return this.http.get<Measurement[]>(this.basePath + '/' + deviceName, {params: params});
  }

}
