import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-produto-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './produto-cadastro.component.html',
  styleUrl: './produto-cadastro.component.css'
})
export class ProdutoCadastroComponent implements OnInit {

  //variaveis

  categorias: any[] = []; //lista de categorias
  fornecedores: any[] = []; //lista de fornecedores 
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  // contrutor para chamar a API 
  constructor(
    private httpClient: HttpClient
  ) { }

  // criando o formuladio para capturar os campos 
  form = new FormGroup({
    nome: new FormControl(''),
    preco: new FormControl(''),
    quantidade: new FormControl(''),
    idFornecedor: new FormControl(''),
    idCategoria: new FormControl('')

  });



  ngOnInit(): void {

    //consultar as categorias na API 
    this.httpClient.get(environment.apiProdutos + "/categorias")
      .subscribe({
        next: (data) => { //capturando a resposta de sucesso
          this.categorias = data as any[]; //armazenando a lista recebida de categorias 

        }
      });

    this.httpClient.get(environment.apiProdutos + "/fornecedores")
      .subscribe({
        next: (data) => {

          this.fornecedores = data as any[];
        }

      })
  }
  submit() {
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.httpClient.post(environment.apiProdutos + "/produtos", this.form.value)
      .subscribe({
        next: (data: any) => {
          this.mensagemSucesso = `Produto ${data.nome}, cadastrado com sucesso.`;
          this.form.reset(); //limpar os campos do formulario

        },

        error: (e) => {
          this.mensagemErro = 'Erro ao cadastrar produto.';

        }

      })

  }
}
