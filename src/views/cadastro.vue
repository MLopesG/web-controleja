<template id='cadastro'>
   <div class="container-login">
       <div class="login">
            <div class="header">
                <div class="img">
                    <img src="../assets/logo.png" alt="logo">
                </div>
            </div>
            <div class="body">
                <form action="">
                    <div class="input-container">
                        <label for="usuario">Usuário:</label>
                        <input type="text" id="usuario" name="usuario">
                    </div>
                    <div class="input-container">
                        <label for="senha">Senha:</label>
                        <input type="password" id="senha" name="senha">
                    </div>
                    <div class="input-container">
                        <label for="confirmarsenha">Confirmar Senha:</label>
                        <input type="password" id="confirmarsenha" name="confirmarsenha">
                    </div>
                    <div class="input-container-btn">
                        <input type="button" value="Cadastra-se">
                    </div>
                </form>
            </div>
        </div>
   </div>
</template>

<script>
export default {
    name:'cadastro'
}
</script>
