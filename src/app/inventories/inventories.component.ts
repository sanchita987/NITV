import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
@Component({
  selector: 'app-inventories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inventories.component.html',
  styleUrl: './inventories.component.css'
})
export class InventoriesComponent {

}
