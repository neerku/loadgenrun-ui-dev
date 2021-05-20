import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KeyholeService } from '@app/@core/http/keyhole.service';
import { ProfilePreviewDialogComponent } from '@app/profile-preview-dialog/profile-preview-dialog.component';
import { SaveTemplateDialogComponent } from '@app/save-template-dialog/save-template-dialog.component';
import { TemplatePreviewDialogComponent } from '@app/template-preview-dialog/template-preview-dialog.component';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss'],
})
export class PerformanceComponent implements OnInit {
  constructor(private keyholeService: KeyholeService, private dialog: MatDialog) {}

  profiles: any[] = [
    {
      operations: [
        { type: 'insert', weightage: '', enabled: false },
        { type: 'update', weightage: '', enabled: false },
        { type: 'read', weightage: '', enabled: false },
        { type: 'delete', weightage: '', enabled: false },
      ],
    },
  ];
  loadProfileRequest: any = { connString: '', dbName: '', collName: '' };
  savedProfile: any[] = [];
  savedTemplate: any[] = [];
  selectedProfile: any = {};
  selectedTemplate: any = {};
  ngOnInit(): void {}

  onStepChange() {}

  addProfile() {
    this.profiles.push({
      operations: [
        { type: 'insert', weightage: '', enabled: false },
        { type: 'update', weightage: '', enabled: false },
        { type: 'read', weightage: '', enabled: false },
        { type: 'delete', weightage: '', enabled: false },
      ],
    });
  }

  removeProfile(index: number) {
    if (this.profiles.length == 1) {
      return;
    }
    this.profiles.splice(index, 1);
  }

  previewProfile() {
    const dialogRef = this.dialog.open(ProfilePreviewDialogComponent, {
      // width: '500px',
      data: { profiles: this.selectedProfile.profile },
    });
  }
}
