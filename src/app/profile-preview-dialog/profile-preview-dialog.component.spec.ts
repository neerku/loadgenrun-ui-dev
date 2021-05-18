import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePreviewDialogComponent } from './profile-preview-dialog.component';

describe('ProfilePreviewDialogComponent', () => {
  let component: ProfilePreviewDialogComponent;
  let fixture: ComponentFixture<ProfilePreviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilePreviewDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
