import { TestBed } from '@angular/core/testing';

import { StatisikshttpService } from './statisikshttp.service';

describe('StatisikshttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatisikshttpService = TestBed.get(StatisikshttpService);
    expect(service).toBeTruthy();
  });
});
