import { TestBed } from '@angular/core/testing';

import { DatadumpService } from './datadump.service';

describe('DatadumpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatadumpService = TestBed.get(DatadumpService);
    expect(service).toBeTruthy();
  });
});
