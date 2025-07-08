import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Product } from '../Model/Product';
import { ProductsComponent } from '../products/products.component'; // ✅ required!
import { UsersComponent } from '../users/users.component';          // ✅ required!
@Component({
  selector: 'app-homepage',
    standalone: true,
  imports: [RouterModule,RouterOutlet,
    ProductsComponent,  // ✅ include routed components
    UsersComponent,
  ],   // for routerLink & router-out
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.css']
})
export class HomepageComponent {
  title: string ="Ocelot Gateway Microservices Demo";
}
