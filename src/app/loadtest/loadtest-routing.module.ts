import { NgModule } from '@angular/core';
import { LoadtestComponent } from './loadtest.component';
import { RouterModule, Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

const routes: Routes = [{ path: '', component: LoadtestComponent, data: { title: marker('CosmosToMongo') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class LoadtestRoutingModule {}
