import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExampleComponent } from './pages/example/example.component';
import { ModelComponent } from './pages/model/model.component';
import { OrientationComponent } from './pages/orientation/orientation.component';
import { OrientationControlsComponent } from './pages/orientation-controls/orientation-controls.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
