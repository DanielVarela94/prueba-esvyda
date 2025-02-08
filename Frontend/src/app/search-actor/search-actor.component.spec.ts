import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchActorComponent } from './search-actor.component';

describe('SearchActorComponent', () => {
  let component: SearchActorComponent;
  let fixture: ComponentFixture<SearchActorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchActorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
