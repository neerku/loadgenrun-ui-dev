import { TestBed } from '@angular/core/testing';

import { KeyholeService } from './keyhole.service';

describe('KeyholeService', () => {
  let service: KeyholeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyholeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
