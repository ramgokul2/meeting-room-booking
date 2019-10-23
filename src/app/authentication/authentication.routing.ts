import { Routes } from '@angular/router';

import { NotFoundComponent } from '@app/authentication/404/not-found.component';
import { BookingComponent } from '@app/authentication/booking/booking.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '404',
        component: NotFoundComponent
      },
      {
        path: 'booking',
        component: BookingComponent
      }
    ]
  }
];
