import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NQueensConfigComponent } from './nqueens-config/nqueens-config.component';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import { RerenderDirectiveDirective } from './rerender-directive.directive';
import { NQueensSolutionsComponent } from './nqueens-solutions/nqueens-solutions.component';
import { ChessBoardSolvedComponent } from './chess-board-solved/chess-board-solved.component';

@NgModule({
  declarations: [
    AppComponent,
    NQueensConfigComponent,
    ChessBoardComponent,
    RerenderDirectiveDirective,
    NQueensSolutionsComponent,
    ChessBoardSolvedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
