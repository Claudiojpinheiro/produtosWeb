import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  mensagemErro: string = '';
 


  //método construtor
  constructor(
    private httpClient: HttpClient
  ){}


  //criando o formulário
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)])
  });


  //função auxiliar para verificar se os campos
  //do formulário possuem erros de validação
  get f() {
    return this.form.controls;
  }


  //função para capturar o submit
  //do formulário
  submit(): void {
   
      //executando o serviço de autenticação de usuários na api
      this.httpClient
        .post(environment.apiUsuarios + "/usuarios/autenticar", this.form.value)
        .subscribe({
          next: (data: any) => { //capturando a resposta de sucesso
            console.log(data);

            //gravar os dados na local storage do navegador
            localStorage.setItem('auth-user', JSON.stringify(data));

            //redirecionar para pagina de consulta de produtos 
            location.href = '/app/produto-consulta';

          },
          error: (e) => { //capturando a resposta de erro
            this.mensagemErro = e.error.errors[0];
          }
        })
  }


}




