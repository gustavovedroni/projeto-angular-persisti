import { Component } from '@angular/core';
import { Product } from '../utils/product';
import { ProductService } from '../produtos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
    produtos: Product[] = [];
  
    constructor(private productService: ProductService) {}
  
    ngOnInit() {
      this.listarProdutos();
    }
  
    listarProdutos() {
      this.productService.getProducts().subscribe(
        (data: any[]) => {
          this.produtos = data;
        },
        error => {
          console.log(error);
        }
      );
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
