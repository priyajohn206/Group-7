import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';

import { NQueensConfigComponent } from './nqueens-config/nqueens-config.component';
import { NQueensSolutionsComponent } from './nqueens-solutions/nqueens-solutions.component';
import { PolysphereConfigComponent } from './polysphere-config/polysphere-config.component';
import { PolysphereSolutionsComponent } from './polysphere-solutions/polysphere-solutions.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'nqueens', component: NQueensConfigComponent },
  { path: 'nqueens/solutions/:n/:queens', component: NQueensSolutionsComponent },
  { path: 'polysphere', component: PolysphereConfigComponent },
  { path: 'polysphere/solutions/:board', component: PolysphereSolutionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
