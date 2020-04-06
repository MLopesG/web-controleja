<template id='login'>
   <div class="container-login">
       <div class="login">
            <div class="header">
                <div class="img">
                    <img src="../assets/logo.png" alt="logo">
                </div>
            </div>
            <div class="body">
                <form @submit.prevent="logar()">
                    <div class="input-container">
                        <label for="usuario">Usuário:</label>
                        <input type="text" id="usuario" name="usuario" v-model="usuario">
                    </div>
                    <div class="input-container">
                        <label for="senha">Senha:</label>
                        <input type="password" id="senha" name="senha" v-model="senha">
                    </div>
                    <div class="input-container-btn">
                        <input type="submit" value="Entrar">
                    </div>
                    <div class="container-link">
                        <a href="/cadastre-se">Cadastre-se</a>
                    </div>
                </form>
            </div>
            <notifications group="notify" />
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
            senha: null
        }
    },
    methods:{
        logar(){
            axios.post('/login',{
                login:  this.usuario,
                senha: this.senha
            }).then(res=>{
                 
            }).catch(()=>{
                
            });
        }
    }
}
</script>
