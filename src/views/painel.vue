<template id="painel">
    <div class="container-painel">
        <div class="header">
           <div class="header-menu">
                <div class="img-logo">
                    <h1>Controle Já</h1>
                </div>
           </div>
        </div>
        <div class="body-sub">
            <div class="container-dados">
                <div class="content-finan saldo">
                    <div class="titulo">
                        <div>
                          <i class="fa fa-credit-card"></i>
                        </div>
                        <div>
                            <span>Carteira</span>
                        </div>
                    </div>
                    <div class="valor">
                        R$ 1030,00
                    </div>
                </div>
                <div class="content-finan receitas">
                    <div class="titulo">
                        <div>
                            <i class="fa fa-arrow-up"></i>
                        </div>
                        <div>
                            <span>Receitas</span>
                        </div>
                    </div>
                    <div class="valor">
                        R$ 1030,00
                    </div>
                </div>
                <div class="content-finan despesas">
                    <div class="titulo">
                        <div>
                            <i class="fa fa-arrow-down"></i>
                        </div>
                        <div>
                            <span>Despesas</span>
                        </div>
                    </div>
                    <div class="valor">
                        R$ 1030,00
                    </div>
                </div>
            </div>
            <div class="extrato">
                <div class="titulo-container">
                    <h1>Extrato</h1>
                </div>
                <div class="item-extratos">
                   <div class="item">
                       <div class="header-item">
                           <div class="header-img">
                              <img src="https://image.flaticon.com/icons/svg/1924/1924289.svg">
                           </div>
                           <div class="header-desc">
                               <span>Padaria</span>
                               <span>Comida</span>
                           </div>
                       </div>
                       <div class="body-item">
                           <span>R$ 50,00</span>
                       </div>
                   </div>     
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'painel'
}
</script>

<style>

</style>