import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/client/index/index.component';
import { LoginPageComponent } from './components/client/login-page/login-page.component';
import { WebSocketService } from './service/web-socket.service';



import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxPaginationModule } from 'ngx-pagination';
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
import { PaymentComponent } from './components/client/payment/payment.component';
import { SearchComponent } from './components/client/search/search.component';
import { ServiceComponent } from './components/client/service/service.component';
import { TourDetailComponent } from './components/client/tour-detail/tour-detail.component';
import { TourComponent } from './components/client/tour/tour.component';
import { UserdetailComponent } from './components/client/userdetail/userdetail.component';
import { interceptorInterceptor } from './headerCookie/interceptor.interceptor';
import { SearchFilterPipe } from './search-filter.pipe';
import { MyBookingsComponent } from './components/client/my-bookings/my-bookings.component';
import { TicketComponent } from './components/client/ticket/ticket.component';



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginPageComponent,
    UserdetailComponent,
    TourComponent,
    ServiceComponent,
    DestinationsComponent,
    SearchComponent,
    TourDetailComponent,
    CartComponent,
    PaymentComponent,
    ContactComponent,
    BookTourComponent,
    DashboardComponent,
    HomeComponent,
    QLtourComponent,
    QLserviceComponent,
    QLdestinationComponent,
    QLreviewComponent,
    QLticketComponent,
    QluserComponent,
    SearchFilterPipe,
    MyBookingsComponent,
    TicketComponent
  ],
  imports: [
    AppRoutingModule,
    CanvasJSAngularChartsModule,
    MatSnackBarModule,
    MatIconModule,
    MatBadgeModule,
    NgbModule,
    RouterModule,
    CardModule,
    DialogModule,
    ToastModule,
    ButtonModule,
    TableModule,
    InputNumberModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToolbarModule,
    FileUploadModule,
    ConfirmDialogModule,
    InputTextareaModule,
    InputTextModule,
    RadioButtonModule,
    DividerModule,
    CarouselModule,
    OverlayPanelModule,
    TabViewModule,
    PasswordModule,
    SliderModule,
    DataViewModule,
    MultiSelectModule,
    FontAwesomeModule,
    DatePipe,
    NgxPaginationModule,
    CommonModule,
    QRCodeModule,
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:interceptorInterceptor,
      multi:true 
    },
    WebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
