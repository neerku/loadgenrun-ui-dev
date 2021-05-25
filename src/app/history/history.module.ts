import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from '@app/material.module';
import { HistoryComponent } from './history.component';

@NgModule({
    imports: [
        MaterialModule,
        MatIconModule
    ],
    declarations: [
        HistoryComponent
    ],
})
export class HistoryModule {}
