import { TestBed } from '@angular/core/testing';

import { DataClientService } from './data-client.service';

describe('DataClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataClientService = TestBed.get(DataClientService);
    expect(service).toBeTruthy();
  });
});
