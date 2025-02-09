import { TestBed } from '@angular/core/testing';

import { SaveMovieService } from './save-movie.service';

describe('SaveMovieService', () => {
  let service: SaveMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
