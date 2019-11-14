import { TestBed } from '@angular/core/testing';

import { ReimbursementListService } from './reimbursement-list.service';

describe('ReimbursementListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReimbursementListService = TestBed.get(ReimbursementListService);
    expect(service).toBeTruthy();
  });
});
