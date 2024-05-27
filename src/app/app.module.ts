import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExampleComponent } from './pages/example/example.component';
import { HomeComponent } from './pages/home/home.component';
import { ModelComponent } from './pages/model/model.component';
import { OrientationComponent } from './pages/orientation/orientation.component';
import { OrientationControlsComponent } from './pages/orientation-controls/orientation-controls.component';
import { GyroModelComponent } from './pages/gyro-model/gyro-model.component';
import { CamTextComponent } from './pages/cam-text/cam-text.component';
import { MultipleWindowsSyncComponent } from './pages/multiple-windows-sync/multiple-windows-sync.component';
import { WindowBallsComponent } from './pages/window-balls/window-balls.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    HomeComponent,
    ModelComponent,
    OrientationComponent,
    OrientationControlsComponent,
    GyroModelComponent,
    CamTextComponent,
    MultipleWindowsSyncComponent,
    WindowBallsComponent
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
