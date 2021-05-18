import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { InfoComponent } from './info.component';
import { InfoRoutingModule } from './info-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, TranslateModule, FlexLayoutModule, MaterialModule, InfoRoutingModule, FormsModule],
  declarations: [InfoComponent],
})
export class InfoModule {}
