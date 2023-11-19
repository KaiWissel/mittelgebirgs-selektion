import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XlsxInputComponent } from './xlsx-input.component';

describe('XlsxInputComponent', () => {
  let component: XlsxInputComponent;
  let fixture: ComponentFixture<XlsxInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XlsxInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XlsxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
