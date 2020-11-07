import { TestBed } from '@angular/core/testing';

import { MqttClientService } from './mqtt.service';

describe('MqttService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MqttClientService = TestBed.get(MqttClientService);
    expect(service).toBeTruthy();
  });
});
