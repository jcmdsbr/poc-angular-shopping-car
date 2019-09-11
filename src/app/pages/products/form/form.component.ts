import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  productId: string;
  isUpdate: boolean = false;
  title: string = "Cadastro";
  categories: Observable<Category[]>;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.productId = this.route.snapshot.paramMap.get("id");
    this.form = this.fb.group({
      id: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      title: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])],
      description: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(200), Validators.required])],
      amount: ['0', Validators.compose([Validators.required])],
      quantity: ['0', Validators.compose([Validators.required])],
      categoryId: ['', Validators.compose([Validators.required])]
    })
  }

  ngOnInit() {
    this.categories = this.categoryService.get();

    if (this.productId) {
      this.title = "Alteração";
      this.isUpdate = true;
      this.productService.getById(this.productId).subscribe((res) => {
        this.form.patchValue(res);
        this.form.controls['id'].disable();
      })
    }
  }
  submit() {
    //TODO melhorar
    if (this.form.valid) {
      let product = this.form.value;
      if (this.isUpdate) {
        product.id = this.productId;
        this.productService.update(product).subscribe(() => this.back("Produto alterado com sucesso!"));
      } else {
        this.productService.create(product).subscribe(() => this.back("Produto cadastrado com sucesso!"));
      }
    }
  }

  clear() {
    this.form.reset();
  }

  back(message: string = "") {
    if (message.length != 0) { this.toastr.success(message); }
    this.router.navigate([""]);
  }
}
