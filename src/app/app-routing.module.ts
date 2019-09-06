import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './pages/products/list/list.component';
import { FormComponent } from './pages/products/form/form.component';


const routes: Routes = [
  { path: 'home', component: ListComponent },
  { path: 'product', component: FormComponent },
  { path: 'product/:id', component: FormComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
