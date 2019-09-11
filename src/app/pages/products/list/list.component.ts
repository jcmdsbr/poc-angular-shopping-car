import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { UserUtil } from 'src/app/utils/user.util';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.loadingProducts();
  }

  loadingProducts() {
    this.products = this.productService.get();
  }

  update(product: Product) {
    this.router.navigate(["product", product.id]);
  }

  delete(product: Product) {
    this.productService.delete(product.id).subscribe(() => {
      this.toastr.success("Produto removido com sucesso!");
      this.loadingProducts();
    });
  }

}
