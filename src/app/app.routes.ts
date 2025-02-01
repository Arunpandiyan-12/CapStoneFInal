import { provideRouter, Routes } from '@angular/router';
import { HomepageComponent } from './Pages/homepage/homepage.component';
import { RegistrationComponent } from './Pages/registration/registration.component';
import { SigninComponent } from './Pages/signin/signin.component';
import { SellacarComponent } from './Pages/sellacar/sellacar.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CarslistComponent } from './Pages/carslist/carslist.component';
import { CarDetailComponent } from './Pages/car-detail/car-detail.component';
import { SellerDashboardComponent } from './Pages/seller-dashboard/seller-dashboard.component';
import { AdminDashboardComponent } from './Pages/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'homepage', pathMatch: 'full' },
    {path:'homepage', component: HomepageComponent},
    {path:'registration', component: RegistrationComponent},
    {path:'signin', component: SigninComponent},
    {path:'sellacar', component: SellacarComponent},
    {path:'carslist', component:CarslistComponent},
    { path: 'car-details/:id', component: CarDetailComponent },
    {path:'sellerdashboard',component:SellerDashboardComponent},
    {path:'admindashboard',component:AdminDashboardComponent}
]
export const appRoutingProviders = [provideRouter(routes)];