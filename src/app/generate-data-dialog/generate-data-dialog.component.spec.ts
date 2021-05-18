import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateDataDialogComponent } from './generate-data-dialog.component';

describe('GenerateDataDialogComponent', () => {
  let component: GenerateDataDialogComponent;
  let fixture: ComponentFixture<GenerateDataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateDataDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
