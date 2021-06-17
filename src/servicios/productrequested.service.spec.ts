import { TestBed } from '@angular/core/testing';

import { ProductrequestedService } from './productrequested.service';

describe('ProductrequestedService', () => {
  let service: ProductrequestedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductrequestedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
