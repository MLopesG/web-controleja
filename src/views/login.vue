<template id='login'>
   <div class='container-login'>
       <div class='login'>
            <div class='header'>
                <div class='img'>
                    <img src='../assets/logo.png' alt='logo'>
                </div>
            </div>
            <div :class="!alert ? 'alert false' : 'alert true'" v-if='hidden' >
                <div>
                    <p>{{message}}</p>
                </div>
            </div>
            <div class='body'>
                <form @submit.prevent='logar()'>
                    <div class='input-container'>
                        <label for='usuario'>Usuário:</label>
                        <input type='text' id='usuario' name='usuario' v-model='usuario'>
                    </div>
                    <div class='input-container'>
                        <label for='senha'>Senha:</label>
                        <input type='password' id='senha' name='senha' v-model='senha'>
                    </div>
                    <div class='input-container-btn'>
                        <input type='submit' value='Entrar'>
                    </div>
                    <div class='container-link'>
                        <a href='/cadastre-se'>Cadastre-se</a>
                    </div>
                </form>
            </div>
        </div>
   </div>
</template>

<script>

import axios from '../../axiosAuth.js';

export default {
    name:'login',
    data(){
        return{
            usuario: null,
            senha: null,
            alert: false,
            // message
            hidden: false,
            message: ''
        }
    },
    methods:{
        logar(){
            axios.post('/login',{
                login:  this.usuario,
                senha: this.senha
            }).then(res=>{
                 if(res.data.autenticado){
                    this.message = 'Aguarde o redirecionamento para o painel';
                    this.alert = true;
                    this.hidden = true;

                    let redirect = setInterval(()=>{
                        localStorage.setItem('token', res.data.token);
                        window.location.href = '/painel';
                        clearInterval(redirect);
                    },2000);
                 }else{
                    this.message = 'Usuário/ou senha inválido(s)';
                    this.hidden = true;
                 }
            }).catch((res)=>{
                if(res.response.data && res.response.data.senha  && res.response.data.login){
                    this.message = 'Por favor, preencha todos os campos';
                    this.hidden = true;
                }else{
                    if(res.response.data && res.response.data.login){
                        this.message = 'Por favor, preencha o campo usuário';
                        this.hidden = true;
                    }
                    if(res.response.data && res.response.data.senha){
                        this.message = 'Por favor, preencha o campo senha';
                        this.hidden = true;
                    }
                }
            });
        }
    }
}
</script>
