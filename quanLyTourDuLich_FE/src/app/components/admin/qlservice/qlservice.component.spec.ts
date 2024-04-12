import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QLserviceComponent } from './qlservice.component';

describe('QLserviceComponent', () => {
  let component: QLserviceComponent;
  let fixture: ComponentFixture<QLserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QLserviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QLserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
