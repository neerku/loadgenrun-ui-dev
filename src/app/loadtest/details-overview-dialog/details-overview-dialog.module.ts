import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DetailsOverviewDialogComponent } from './details-overview-dialog.component';
import { MaterialModule } from '@app/material.module';

@NgModule({
  declarations: [DetailsOverviewDialogComponent],
  entryComponents: [DetailsOverviewDialogComponent],
  imports: [MatDialogModule, CommonModule, FormsModule, MaterialModule],
})
export class DetailsOverviewDialogModule {}
