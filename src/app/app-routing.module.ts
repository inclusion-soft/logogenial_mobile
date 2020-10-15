import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'lecciones-select',
    loadChildren: () => import('./pages/lecciones/lecciones-select/lecciones-select.module').then( m => m.LeccionesSelectPageModule)
  },
  {
    path: 'leccion-ejecucion',
    loadChildren: () => import('./pages/lecciones/leccion-ejecucion/leccion-ejecucion.module').then( m => m.LeccionEjecucionPageModule)
  },
  {
    path: 'grupos-admin',
    loadChildren: () => import('./pages/grupos/grupos-admin/grupos-admin.module').then( m => m.GruposAdminPageModule)
  },
  {
    path: 'resultado-admin',
    loadChildren: () => import('./pages/resultados/resultado-admin/resultado-admin.module').then( m => m.ResultadoAdminPageModule)
  },
  {
    path: 'perfil-edit',
    loadChildren: () => import('./pages/perfil/perfil-edit/perfil-edit.module').then( m => m.PerfilEditPageModule)
  }

  //{ path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
