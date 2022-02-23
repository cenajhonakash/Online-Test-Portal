import { TestBed } from '@angular/core/testing';

import { RazorPaymentService } from './razor-payment.service';

describe('RazorPaymentService', () => {
  let service: RazorPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RazorPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
