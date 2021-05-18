import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generate-data-dialog',
  templateUrl: './generate-data-dialog.component.html',
  styleUrls: ['./generate-data-dialog.component.scss'],
})
export class GenerateDataDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<GenerateDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  templateName: string;
  totalRecords: number;

  close(): void {
    this.dialogRef.close();
  }

  generateData(): void {
    this.dialogRef.close({ templateName: this.templateName, totalRecords: this.totalRecords });
  }

  ngOnInit(): void {}
}
