import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { QLdestinationComponent } from './components/admin/qldestination/qldestination.component';
import { QLreviewComponent } from './components/admin/qlreview/qlreview.component';
import { QLserviceComponent } from './components/admin/qlservice/qlservice.component';
import { QLticketComponent } from './components/admin/qlticket/qlticket.component';
import { QLtourComponent } from './components/admin/qltour/qltour.component';
import { QluserComponent } from './components/admin/qluser/qluser.component';
import { BookTourComponent } from './components/client/book-tour/book-tour.component';
import { CartComponent } from './components/client/cart/cart.component';
import { ContactComponent } from './components/client/contact/contact.component';
import { DestinationsComponent } from './components/client/destinations/destinations.component';
import { HomeComponent } from './components/client/home/home.component';
import { IndexComponent } from './components/client/index/index.component';
import { LoginPageComponent } from './components/client/login-page/login-page.component';
import { PaymentComponent } from './components/client/payment/payment.component';
import { SearchComponent } from './components/client/search/search.component';
import { ServiceComponent } from './components/client/service/service.component';
import { TourDetailComponent } from './components/client/tour-detail/tour-detail.component';
import { TourComponent } from './components/client/tour/tour.component';
import { UserdetailComponent } from './components/client/userdetail/userdetail.component';
import { AuthGuardService } from './service/auth-guard.service';
import { RoleGuardService } from './service/role-guard.service';
import { MyBookingsComponent } from './components/client/my-bookings/my-bookings.component';
import { TicketComponent } from './components/client/ticket/ticket.component';

const routes: Routes = [
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   canActivate: [RoleGuardService],
  //   data: { expectedRole: "ROLE_ADMIN" },
  //   children: [

  //   ],
  // },
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'user',
        component: UserdetailComponent,
        canActivate: [AuthGuardService],
      },
      { path: 'tour', component: TourComponent },
      { path: 'my_bookings', component: MyBookingsComponent },
      { path: 'ticket', component: TicketComponent },
      { path: 'tour/destinations/:id', component: TourComponent },
      { path: 'service', component: ServiceComponent },
      { path: 'service/:id', component: ServiceComponent },
      { path: 'service/tour/:id', component: ServiceComponent },
      { path: 'destinations', component: DestinationsComponent },
      { path: 'search/:keyword', component: SearchComponent },
      { path: 'tourdetail/:id', component: TourDetailComponent },
      { path: 'cart', component: CartComponent },
      {
        path: 'booktour',
        component: BookTourComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'payment/:code',
        component: PaymentComponent
      },
      { path: 'contact', component: ContactComponent },
    ],
  },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RoleGuardService],
    data: { expectedRole: 'ROLE_ADMIN' },
    children: [
      { path: 'qluser', component: QluserComponent },
      { path: 'qltour', component: QLtourComponent },
      { path: 'qlticket', component: QLticketComponent },
      { path: 'qlservice', component: QLserviceComponent },
      { path: 'qlreview', component: QLreviewComponent },
      { path: 'qldestination', component: QLdestinationComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
