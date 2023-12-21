import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  //variaveis 
  usuarioAutenticado: boolean = false;
  nomeUsuario: string ='';
  emailUsuario: string='';



  //função executada sempre que o componente 
  // for aberto na página

  ngOnInit(): void {

    //ler os dados contidos na localStorage 
    const dados = localStorage.getItem('auth-user');
    if(dados != null) { 
      //capturar o conteudo da local storage 
      var usuario = JSON.parse(dados);

      //capturando os dados para o componente
      this.nomeUsuario = usuario.nome;
      this.emailUsuario = usuario.email;

      this.usuarioAutenticado = true;

    }

  }

  logout(): void{
    if(confirm('Deseja realmente sair do sistema?')){

      //apagar  os dados gravados no local storage
      localStorage.removeItem('auth-user');

      //redirecionar para a pagina de login do sistema 
      location.href = '/app/login';
    }
  }

}
