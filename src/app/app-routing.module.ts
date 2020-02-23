import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'unica-respuesta',
    loadChildren: () => import('./unica-respuesta/unica-respuesta.module').then( m => m.UnicaRespuestaPageModule)
  },
  {
    path: 'mensaje-respuesta-modal',
    loadChildren: () => import('./mensaje-respuesta-modal/mensaje-respuesta-modal.module').then( m => m.MensajeRespuestaModalPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
