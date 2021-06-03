import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DetailsOverviewDialogComponent } from './details-overview-dialog.component';
import { MaterialModule } from '@app/material.module';
import { FormatterComponent } from '../json-formatter/json-formatter.component';
import { SharedModule } from '@app/@shared/shared.module';

@NgModule({
  declarations: [DetailsOverviewDialogComponent, FormatterComponent],
  entryComponents: [DetailsOverviewDialogComponent],
  imports: [MatDialogModule, CommonModule, FormsModule, MaterialModule,SharedModule],
})
export class DetailsOverviewDialogModule { }
