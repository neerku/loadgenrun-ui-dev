import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonTypePickerDialogComponent } from './json-type-picker-dialog.component';

describe('JsonTypePickerDialogComponent', () => {
  let component: JsonTypePickerDialogComponent;
  let fixture: ComponentFixture<JsonTypePickerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JsonTypePickerDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonTypePickerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
