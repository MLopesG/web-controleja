<template id="painel">
    <div class="container-painel">
        <div class="header">
           <div class="header-menu">
                <div class="logo">
                    <h1>Controle Já</h1>
                </div>
           </div>
        </div>
        <div class="body-sub">
            <div class="container-dados">
                <div class="content-finan saldo">
                    <div class="titulo">
                        <div>
                          <i class="fa fa-money"></i>
                        </div>
                        <div>
                            <span>Saldo:</span>
                        </div>
                    </div>
                    <div class="valor">
                        R$ {{format(dados.saldo)}}
                    </div>
                </div>
                 <div class="content-finan total">
                    <div class="titulo">
                        <div>
                          <i class="fa fa-credit-card"></i>
                        </div>
                        <div>
                            <span>Total:</span>
                        </div>
                    </div>
                    <div class="valor">
                        R$ {{format(dados.total)}}
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
                        R$ {{format(dados.totalReceitas)}}
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
                        R$ {{format(dados.totalDespesas)}}
                    </div>
                </div>
            </div>
            <div class="extrato">
                <div class="titulo-container">
                    <h1><b>({{contas.length}})</b> - Entradas/Saidas - Mensal</h1>
                </div>
                <div class="item-extratos" v-if="contas && contas.length > 0">
                   <div class="item" v-for="conta in contas" :key="conta.id">
                       <div class="header-item">
                           <div class="header-img">
                             <i :class="conta.categoria.tipo === 'TipoCategoria.receita' ? 'fa fa-arrow-up a' : 'fa fa-arrow-down b' "></i>
                           </div>
                           <div class="header-desc">
                               <span><b>{{conta.dataMovimentacao.replace(/[_]/g,'/')}}</b> - {{conta.descricao}}</span>
                               <span>{{conta.categoria.nome}}</span>
                           </div>
                       </div>
                       <div class="body-item">
                           <span :class="conta.categoria.tipo === 'TipoCategoria.receita' ? 'a' : 'b'">R$ {{format(conta.valor)}}</span>
                       </div>
                   </div>    
                </div>
                <div v-else>
                    <div class="warning">
                        <div>
                            <img src="https://scoreplan.com.br/wp-content/uploads/2020/01/warning.png" alt="">
                        </div>
                        <div>
                           <h1>Oops ...</h1>
                           <h2>Nenhum lançamento encontrado até o momento.</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import axios from '../../axiosAuth.js';
const formatCurrency = require('format-currency')


export default {
    name: 'painel',
    data(){
        return {
            contas:[],
            dados:{
                totalReceitas:0.00,
                totalDespesas:0.00,
                total:0.00,
                saldo:0.00
            }
        }
    },
    methods:{
        getFinanceiro(){
            axios.get('/movimentacoes/202003').then((conta)=>{
                this.contas = conta.data;
            });

            axios.get('/movimentacoes/total/202003').then((dados)=>{
                this.dados.totalReceitas = dados.data.receitas.total;
                this.dados.totalDespesas = dados.data.despesas.total;
                this.dados.saldo = dados.data.saldo;
                this.dados.total = dados.data.total;
            });
        },
        format(real){
            return formatCurrency(real);
        }
    },
    created(){
        this.getFinanceiro();
    }
}
</script>

<style>

</style>