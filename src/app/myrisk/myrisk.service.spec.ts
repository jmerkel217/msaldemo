import { TestBed } from '@angular/core/testing';

import { MyriskService } from './myrisk.service';

describe('MyriskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyriskService = TestBed.get(MyriskService);
    expect(service).toBeTruthy();
  });
});
