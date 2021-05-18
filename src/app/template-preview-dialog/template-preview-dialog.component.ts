import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-template-preview-dialog',
  templateUrl: './template-preview-dialog.component.html',
  styleUrls: ['./template-preview-dialog.component.scss'],
})
export class TemplatePreviewDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<TemplatePreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {}
}
