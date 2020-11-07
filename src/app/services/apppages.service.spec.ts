import { TestBed } from '@angular/core/testing';

import { ApppagesService } from './apppages.service';

describe('ApppagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApppagesService = TestBed.get(ApppagesService);
    expect(service).toBeTruthy();
  });
});
