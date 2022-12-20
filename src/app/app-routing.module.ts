import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContaComponent } from './templates/components/conta/conta.component';
import { ContasComponent } from './templates/components/contas/contas.component';
import { LayoutComponent } from './templates/components/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'contas', pathMatch: 'full' },
  { path: '', component: LayoutComponent, children: [
    { path: 'contas', component: ContasComponent },
    { path: 'contas/:id', component: ContaComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }