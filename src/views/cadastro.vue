<template id='cadastro'>
   <div class='container-login'>
       <div class='login'>
            <div class='header'>
                <div class='img'>
                    <img src='../assets/logo.png' alt='logo'>
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
                     <div class='input-container'>
                        <label for='senhaconfirma'>Confirmar Senha:</label>
                        <input type='password' id='senhaconfirma' name='senhaconfirma' v-model='confirmasenha'>
                    </div>
                    <div class='input-container-btn'>
                        <input type='submit' value='Cadastre-se'>
                    </div>
                </form>
            </div>
            <div :class="!alert ? 'alert false' : 'alert true'" v-if='hidden' >
                <div>
                    <p>{{message}}</p>
                </div>
            </div>
        </div>
   </div>
</template>

<script>

import axios from '../../axiosAuth.js';

export default {
    name:'cadastro',
    data(){
        return{
            usuario: null,
            senha: null,
            confirmasenha: null,
            alert: false,
            // message
            hidden: false,
            message: '',
        }
    },
    methods:{
        logar(){

            if(this.senha != this.confirmasenha){
                this.message = 'Desculpe, senha não conferem';
                this.hidden = true;
                return;
            }

            axios.post('/usuario',{
                login:  this.usuario,
                senha: this.senha
            }).then(res=>{
                 if(res.data.message === "Usuário cadastrado com sucesso"){
                    this.message = 'Cadastro efetuado com sucesso, Aguarde o redirecionamento para o login';
                    this.alert = true;
                    this.hidden = true;

                    let redirect = setInterval(()=>{
                        window.location.href = '/';
                        clearInterval(redirect);
                    },2000);
                 }else{
                    this.message = res.data.message;
                    this.alert = false;
                    this.hidden = true;
                 }
            }).catch((res)=>{
                if(res.response.data.message){
                    this.message = 'Usuário já existe.';
                    this.hidden = true;
                }else{
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
                }
            });
        }
    }
}
</script>
