import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NotFoundComponent } from '@app/authentication/404/not-found.component';
import { AuthenticationRoutes } from '@app/authentication/authentication.routing';
import { BookingComponent } from '@app/authentication/booking/booking.component';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    SharedModule,
        TabMenuModule,
        TableModule,
    ButtonModule,
    RouterModule.forChild(AuthenticationRoutes)
  ],
  declarations: [NotFoundComponent, BookingComponent]
})
export class AuthenticationModule {}
