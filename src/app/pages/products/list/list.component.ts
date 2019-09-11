import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { UserUtil } from 'src/app/utils/user.util';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products: Observable<Product[]>;
  user: User;
  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.loadingProducts();
    this.user = UserUtil.get();
  }

  loadingProducts() {
    this.products = this.productService.get();
  }

  update(product: Product) {
    this.router.navigate(["product", product.id]);
  }

  delete(product: Product) {
    if (!UserUtil.isAdm()) {
      this.toastr.error("Você não tem permissão para executar essa ação.");
      return;
    }
    this.productService.delete(product.id).subscribe(() => {
      this.toastr.success("Produto removido com sucesso!");
      this.loadingProducts();
    });
  }

}
