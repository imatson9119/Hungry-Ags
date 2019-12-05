import { TestBed } from '@angular/core/testing';

import { EventLoaderService } from './event-loader.service';

describe('EventLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventLoaderService = TestBed.get(EventLoaderService);
    expect(service).toBeTruthy();
  });
});
