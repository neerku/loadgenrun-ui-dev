import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { PerformanceComponent } from './performance.component';

const routes: Routes = [{ path: '', component: PerformanceComponent, data: { title: marker('Performance Test') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class PerformanceRoutingModule {}
