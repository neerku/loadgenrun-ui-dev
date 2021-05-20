import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { PerformanceComponent } from './performance/performance.component';
import { Shell } from './shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'load-test', loadChildren: () => import('./loadtest/loadtest.module').then((test) => test.LoadtestModule) },
    {
      path: 'performance',
      loadChildren: () => import('./performance/performance.module').then((perf) => perf.PerformanceModule),
    },
    { path: 'info', loadChildren: () => import('./info/info.module').then((info) => info.InfoModule) },
    { path: '', redirectTo: '/load-test', pathMatch: 'full' },
    { path: 'history', component: HistoryComponent}
  ]),
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
