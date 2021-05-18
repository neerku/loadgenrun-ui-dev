import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceComponent } from './performance.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { FormsModule } from '@angular/forms';
import { NgJsonSchema } from 'ng-jsonschema';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PerformanceRoutingModule } from './performance-routing.module';
import { ProfilePreviewDialogComponent } from '@app/profile-preview-dialog/profile-preview-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    PerformanceRoutingModule,
    FormsModule,
    NgJsonSchema,
    NgJsonEditorModule,
    MatIconModule,
    MatDialogModule,
  ],
  declarations: [PerformanceComponent, ProfilePreviewDialogComponent],
})
export class PerformanceModule {}
