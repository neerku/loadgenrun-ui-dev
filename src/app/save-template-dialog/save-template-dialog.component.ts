import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-save-template-dialog',
  templateUrl: './save-template-dialog.component.html',
  styleUrls: ['./save-template-dialog.component.scss'],
})
export class SaveTemplateDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<SaveTemplateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  templateName: string;

  close(): void {
    this.dialogRef.close();
  }

  save(template: any): void {
    this.dialogRef.close(template);
  }

  hasError(templateName: string) {
    let nameExists: boolean = false;
    (<any[]>this.data.templates).forEach((item) => {
      console.log(item.name, templateName);
      if (item.name == templateName) {
        nameExists = true;
      }
    });
    return nameExists;
  }
  ngOnInit(): void {}
}
