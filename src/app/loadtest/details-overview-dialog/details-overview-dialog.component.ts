import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'details-overview-dialog',
  templateUrl: 'details-overview-dialog.component.html',
})
export class DetailsOverviewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DetailsOverviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
export interface DialogData {
  details: any;
  name: string;
  isLog:boolean;
}
