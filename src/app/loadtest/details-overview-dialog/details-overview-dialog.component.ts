import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KeyholeService } from '@app/@core/http/keyhole.service';
@Component({
  selector: 'details-overview-dialog',
  templateUrl: 'details-overview-dialog.component.html',
  styleUrls: ['./details-overview-dialog.component.scss'],
})
export class DetailsOverviewDialogComponent {
  showLoader: boolean = false;
  constructor(private keyholeService: KeyholeService,
    public dialogRef: MatDialogRef<DetailsOverviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  getNewSample(projectId: string, database: string, collection: string) {
    this.showLoader = true;
    this.keyholeService.getSampleValidationData(projectId, database, collection).subscribe((result: any) => {
      this.data.details.cosmosDocument = JSON.parse(result.cosmosDocument.replace('\"', '"'));
      this.data.details.mongoDocument = JSON.parse(result.mongoDocument.replace('\"', '"'));
      this.showLoader = false;
    });
  }
}
export interface DialogData {
  details: any;
  name: string;
  createdFor: string;
}
