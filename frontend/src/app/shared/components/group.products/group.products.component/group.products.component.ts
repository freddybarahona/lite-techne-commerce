import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { InventoryService } from '../../../services/inventory.service';
import { forkJoin } from 'rxjs';
import { ProductDTO } from '../../../interfaces/products/product.dto.interface';
import { InventoryByProduct } from '../../../interfaces/inventory.by.product';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [
    CurrencyPipe
  ],
  selector: 'app-group.products.component',
  templateUrl: './group.products.component.html',
})
export class GroupProductsComponent implements OnInit {
  private s_product= inject(ProductsService)
  private s_inventory= inject(InventoryService)
  loading= signal(true)
  products= signal<ProductDTO[]>([])
  inventoryByProduct= signal<InventoryByProduct[]>([])

  ngOnInit(): void {
    this.obtenerProductos()
  }

  private obtenerProductos() {
    forkJoin({
      products: this.s_product.getProducts(),
      inventory: this.s_inventory.getInventories(),
    }).subscribe({
    next: ({products, inventory})=> {
      this.products.set(products.data)

      const combined = products.data.map(p => { // satisfies interface > constante: interface
        const inv = inventory.data.find(i => i.product_id == p.product_id)
        return {
          product_id: p.product_id,
          name: p.name,
          description: p.description,
          price: p.price,
          is_active: p.is_active,
          stock: inv?.stock ?? 0,
          reserved_stock: inv?.reserved_stock ?? 0,
          available: inv ? inv.stock - inv.reserved_stock : 0,
        } satisfies InventoryByProduct //util para return basado en fidelidad de interfaz sin rellenar manualmente
      }) 
      
      this.inventoryByProduct.set(combined)
      this.loading.set(false)

    },error: (err)=> this.loading.set(false)
  })
  }
}
