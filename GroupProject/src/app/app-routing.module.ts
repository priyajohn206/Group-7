import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NQueensConfigComponent } from './nqueens-config/nqueens-config.component';
import { NQueensSolutionsComponent } from './nqueens-solutions/nqueens-solutions.component';

const routes: Routes = [
  { path: '', component: NQueensConfigComponent },
  { path: 'solutions/:n/:queens', component: NQueensSolutionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
