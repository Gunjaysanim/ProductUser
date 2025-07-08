import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../products';
import { Product } from '../Model/Product';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-products',
    standalone: true, // ✅ important
    imports: [CommonModule, ReactiveFormsModule ,RouterModule ], // ✅ this is required
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductsComponent implements OnInit {
    
ProductList ? : Observable < Product[] > ;
    ProductList1 ? : Observable < Product[] > ;
    productForm!: FormGroup;
    productId = 0;
    constructor(private fb: FormBuilder,private formbulider: FormBuilder, private productService: ProductsService, private router: Router, private toastr: ToastrService) {}
    ngOnInit() {
        this.productForm = this.formbulider.group({
            productName: ['', [Validators.required]],
            productPrice: ['', [Validators.required]],
            productDescription: ['', [Validators.required]],
            productStock: ['', [Validators.required]]
        });
        this.getProductList();
    }
    getProductList() {
        this.ProductList1 = this.productService.getProductList();
        this.ProductList = this.ProductList1;
    }
    PostProduct(product: Product) {
        const product_Master = this.productForm.value;
        this.productService.postProductData(product_Master).subscribe(
            () => {
                this.getProductList();
                this.productForm.reset();
                this.toastr.success('Data Saved Successfully');
            });
    }
    ProductDetailsToEdit(id: string) {
        this.productService.getProductDetailsById(id).subscribe(productResult => {
            this.productId = productResult.productId;
            this.productForm.controls['productName'].setValue(productResult.productName);
            this.productForm.controls['productPrice'].setValue(productResult.productPrice);
            this.productForm.controls['productDescription'].setValue(productResult.productDescription);
            this.productForm.controls['productStock'].setValue(productResult.productStock);
        });
    }
    UpdateProduct(product: Product) {
        product.productId = this.productId;
        const product_Master = this.productForm.value;
        this.productService.updateProduct(product_Master).subscribe(() => {
            this.toastr.success('Data Updated Successfully');
            this.productForm.reset();
            this.getProductList();
        });
    }
    DeleteProduct(id: number) {
        if (confirm('Do you want to delete this product?')) {
            this.productService.deleteProductById(id).subscribe(() => {
                this.toastr.success('Data Deleted Successfully');
                this.getProductList();
            });
        }
    }
    Clear(product: Product) {
        this.productForm.reset();
    }
}
