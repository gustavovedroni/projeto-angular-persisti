import { Component } from '@angular/core';
import { Product } from './utils/product';
import { ProductService } from './produtos.service';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  produtos: Product[] = [];
  editMode = false;
  public form: FormGroup;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])],
      description: ['', Validators.compose([
        Validators.minLength(10),
        Validators.required
      ])],
      prece: ['', Validators.compose([Validators.required])]
    })
  }

  ngOnInit() {
    this.listarProdutos();
  }
 

  
  listarProdutos() {
    this.productService.getProducts().subscribe(
      (response) => {
        this.produtos = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  submit() {
    this.productService.createProduct(this.form.value).subscribe((res: any) => {
      console.log(res);
      this.listarProdutos();
    }),
      (err: any) => {
        console.log(err);
      };
  }

  criarProduto(produto: any) {
    this.productService.createProduct(produto).subscribe(
      (data: any) => {
        console.log(data);
        this.listarProdutos();
      },
      error => {
        console.log(error);
      }
    );
  }

  atualizarProduto(produto: any) {
    this.productService.updateProduct(produto.id, produto).subscribe(
      (data: any) => {
        console.log(data);
        this.listarProdutos();
      },
      error => {
        console.log(error);
      }
    );
  }

  excluirProduto(id: number) {
    this.productService.deleteProduct(id).subscribe(
      (data: any) => {
        console.log(data);
        this.listarProdutos();
      },
      error => {
        console.log(error);
      }
    );
  }

}
