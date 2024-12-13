import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExampleComponent } from './pages/example/example.component';
import { ModelComponent } from './pages/model/model.component';
import { OrientationComponent } from './pages/orientation/orientation.component';
import { OrientationControlsComponent } from './pages/orientation-controls/orientation-controls.component';
import { GyroModelComponent } from './pages/gyro-model/gyro-model.component';
import { CamTextComponent } from './pages/cam-text/cam-text.component';
import { MultipleWindowsSyncComponent } from './pages/multiple-windows-sync/multiple-windows-sync.component';
import { WindowBallsComponent } from './pages/window-balls/window-balls.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'example',
    component: ExampleComponent
  },
  {
    path: 'model',
    component: ModelComponent
  },
  {
    path: 'orientation',
    component: OrientationComponent
  },
  {
    path: 'orientation-controls',
    component: OrientationControlsComponent
  },
  {
    path: 'gyro-model',
    component: GyroModelComponent
  },
  {
    path: 'cam-text',
    component: CamTextComponent
  },
  {
    path: 'multiple-windows-sync',
    component: MultipleWindowsSyncComponent
  },
  {
    path: 'window-balls',
    component: WindowBallsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
