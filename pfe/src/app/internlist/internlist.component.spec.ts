import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternlistComponent } from './internlist.component';

describe('InternlistComponent', () => {
  let component: InternlistComponent;
  let fixture: ComponentFixture<InternlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternlistComponent]
    });
    fixture = TestBed.createComponent(InternlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
