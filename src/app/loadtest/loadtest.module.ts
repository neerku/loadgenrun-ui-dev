import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadtestComponent } from './loadtest.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { LoadtestRoutingModule } from './loadtest-routing.module';
import { FormsModule } from '@angular/forms';
import { NgJsonSchema } from 'ng-jsonschema';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { JsonTypePickerDialogComponent } from '@app/json-type-picker-dialog/json-type-picker-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SaveTemplateDialogComponent } from '@app/save-template-dialog/save-template-dialog.component';
import { GenerateDataDialogComponent } from '@app/generate-data-dialog/generate-data-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { TemplatePreviewDialogComponent } from '@app/template-preview-dialog/template-preview-dialog.component';
import { SharedModule } from '@shared';
import { DetailsOverviewDialogModule } from './details-overview-dialog/details-overview-dialog.module';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    LoadtestRoutingModule,
    FormsModule,
    NgJsonSchema,
    NgJsonEditorModule,
    MatDialogModule,
    MatIconModule,
    SharedModule,
    DetailsOverviewDialogModule,
  ],
  declarations: [
    LoadtestComponent,
    JsonTypePickerDialogComponent,
    SaveTemplateDialogComponent,
    GenerateDataDialogComponent,
    TemplatePreviewDialogComponent,
  ],
})
export class LoadtestModule {}
