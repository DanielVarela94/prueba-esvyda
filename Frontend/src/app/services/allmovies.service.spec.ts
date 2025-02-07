import { TestBed } from '@angular/core/testing';

import { AllmoviesService } from './allmovies.service';

describe('AllmoviesService', () => {
  let service: AllmoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllmoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
