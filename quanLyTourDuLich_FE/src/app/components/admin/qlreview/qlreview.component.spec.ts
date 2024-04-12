import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QLreviewComponent } from './qlreview.component';

describe('QLreviewComponent', () => {
  let component: QLreviewComponent;
  let fixture: ComponentFixture<QLreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QLreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QLreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
