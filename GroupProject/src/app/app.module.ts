import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NQueensConfigComponent } from './nqueens-config/nqueens-config.component';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import { RerenderDirectiveDirective } from './rerender-directive.directive';
import { NQueensSolutionsComponent } from './nqueens-solutions/nqueens-solutions.component';
import { ChessBoardSolvedComponent } from './chess-board-solved/chess-board-solved.component';
import { PolysphereConfigComponent } from './polysphere-config/polysphere-config.component';
import { LandingComponent } from './landing/landing.component';
import { PolysphereSolutionsComponent } from './polysphere-solutions/polysphere-solutions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NQueensConfigComponent,
    ChessBoardComponent,
    RerenderDirectiveDirective,
    NQueensSolutionsComponent,
    ChessBoardSolvedComponent,
    PolysphereConfigComponent,
    LandingComponent,
    PolysphereSolutionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
