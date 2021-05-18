import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-json-type-picker-dialog',
  templateUrl: './json-type-picker-dialog.component.html',
  styleUrls: ['./json-type-picker-dialog.component.scss'],
})
export class JsonTypePickerDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<JsonTypePickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(type: string): void {
    this.dialogRef.close(type);
  }

  ngOnInit(): void {}
}
