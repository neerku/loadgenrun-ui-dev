import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-preview-dialog',
  templateUrl: './profile-preview-dialog.component.html',
  styleUrls: ['./profile-preview-dialog.component.scss'],
})
export class ProfilePreviewDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ProfilePreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  stringData = JSON.stringify(this.data);
  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }
}
