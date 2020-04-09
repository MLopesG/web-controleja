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
            <div class="vindas">
               <div>
                    <div>
                        <h1>{{usuario()}}</h1>
                    </div>
                    <div>
                        <p>Administre suas contas (Receitas, despesas, saldo e total).</p>
                    </div>
               </div>
                <div class="btn-group">
                    <button @click="show()">
                        <i class="fa fa-plus"></i>
                       Nova Movimentação 
                    </button>
                    <button @click="atualizar()">
                        <i class="fa fa-refresh"></i>
                        Atualizar Métricas
                    </button>
                    <button @click="sair()">
                        <i class="fa fa-sign-out"></i>
                       Finalizar sessão 
                    </button>
                </div>
            </div>
            <div class="container-dados">
                <div class="content-finan saldo">
                    <div class="titulo">
                        <div>
                          <i class="fa fa-money"></i>
                        </div>
                        <div class="saldo-content">
                            <span>Saldo:</span>
                        </div>
                    </div>
                    <div class="valor">
                        <div>
                            <date-picker 
                                v-model="data"  
                                :format="momentFormat"
                                :show-week-number="false"
                                type="month"
                                lang="pt-br"
                                placeholder="Selecione o mês"
                            />
                        </div>
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
                    <div class="valor" > 
                        <div></div>
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
                        <div></div>
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
                        <div></div>
                        R$ {{format(dados.totalDespesas)}}
                    </div>
                </div>
            </div>
            <div class="extrato">
                <div class="titulo-container">
                    <div>
                        <h1><b>({{contas.length}})</b> - Entradas/Saidas </h1>
                    </div>
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
                             <img src="../assets/warning.png" alt="">
                        </div>
                        <div>
                           <h1>Oops ...</h1>
                           <h2>Nenhum lançamento encontrado até o momento.</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modal name='add-movimentacao' height='700'>
            <div class="add-movimentacao-titulo">
                <h1>Nova Movimentação</h1>
            </div>
            <div :class="!alert ? 'alert false' : 'alert true'" v-if='hidden' >
                <div>
                    <p>{{message}}</p>
                </div>
            </div>
            <div class="add-movimentacao">
                <form @submit.prevent="newMovimentacao">
                     <div class='input-container'>
                        <label for='conta'>Tipo Conta:</label>
                        <select name="conta" v-model="tipo" id="conta">
                            <option value="" >Selecione..</option>
                            <option value="receita" >Receitas</option>
                            <option value="despesa">Despesas</option>
                        </select>
                    </div>
                    <div class='input-container' v-if="categorias && categorias.length > 0">
                        <label for='categoria'>Categoria:</label>
                        <select name="categoria" id="categoria" v-model="categoria">
                            <option  v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{categoria.nome}}</option>
                        </select>
                    </div>
                    <div class='input-container'>
                        <label for='dataMovimentacao'>Data realização:</label>
                        <input type='date' id='usuario' name='dataMovimentacao'  v-model="dataMovimentacao" >
                    </div>
                    <div class='input-container'>
                        <label for='desc'>Descrição:</label>
                        <textarea name="desc" id="desc" cols="30" rows="10" v-model="descricao"></textarea>
                    </div>
                    <div class='input-container'>
                        <label for='valor'>Valor:</label>
                        <input type='number' step="0.01" id='valor' name='valor' v-model="valor">
                    </div>
                    <div class='input-container-btn'>
                        <input type='submit' value='Salvar'>
                    </div>
                </form>
            </div>
        </modal>
    </div>
</template>
<script>
import DatePicker from 'vue2-datepicker';
import axios from '../../axiosAuth.js';

import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/pt-br';

const formatCurrency = require('format-currency')
const moment = require("moment");

export default {
    name: 'painel',
    components:{
        DatePicker
    },
    data(){
        return {
            categoria:null,
            dataMovimentacao:null,
            descricao:null,
            valor:0.0,
            // message
            hidden: false,
            message: '',
            data:moment().format('YYYY/MM'),
            contas:[],
            tipo: null,
            categorias:[],
            dados:{
                totalReceitas:0.00,
                totalDespesas:0.00,
                total:0.00,
                saldo:0.00
            },
            momentFormat: {
                stringify: (date) => {
                    return date ? moment(date).format('YYYY/MM') : ''
                },
                parse: (value) => {
                    return value ? moment(value, 'YYYY/MM').toDate() : null
                }
            }
        }
    },
    watch:{
        data: function(data){
            let format = moment(data).format('YYYY/MM').replace('/','');
            return this.atualizar(format);
        },
        tipo: function( data){
            return this.getCategorias(data);
        }
    },
    methods:{
        show(){
            this.$modal.show('add-movimentacao');
        },
        close(){
            this.$modal.hide('add-movimentacao');
        },
        getFinanceiro(data){
            axios.get('/movimentacoes/' + data).then((conta)=>{
                this.contas = conta.data;
            }).catch(error=>{
                if(error.response.status === 401 || error.response.status === 400 ){
                     let redirect = setInterval(()=>{
                        localStorage.clear();
                        window.location.href = '/';
                        clearInterval(redirect);
                    },2000);

                    return;
                }
            });

            axios.get('/movimentacoes/total/' + data).then((dados)=>{
                this.dados.totalReceitas = dados.data.receitas.total;
                this.dados.totalDespesas = dados.data.despesas.total;
                this.dados.saldo = dados.data.saldo;
                this.dados.total = dados.data.total;
            });
        },
        getCategorias(value){

            this.categorias = [];

            axios.get('/categorias/' + value).then((dados)=>{
                this.categorias = dados.data;
            });
        },
        newMovimentacao(event){
            axios.post('/movimentacoes',
            {
                categoria:this.categoria,
                dataMovimentacao: moment(this.dataMovimentacao).utc().format(),
                descricao:this.descricao,
                valor: parseFloat(this.valor)
            }).then((dados)=>{
                this.message = dados.data.message;
                this.alert = true;
                this.hidden = true;

                this.close();
                this.atualizar();
            }).catch(res=>{
                if(res.response.status >= 400){
                    this.message = 'Não foi possivel salvar movimentação, verique as informações preenchidas';
                    this.hidden = true;
                }
            });
        },
        format(real){
            return formatCurrency(real);
        },
        usuario(){
            return localStorage.getItem('usuario')
        },
        atualizar(data = null){

            data = data === null ? moment(this.data).format('YYYY/MM').replace('/','') : data;

            this.message = null;
            this.alert = false;
            this.hidden = false;
            this.categoria = null;  
            this.dataMovimentacao = null;
            this.descricao = null;
            this.valor = null;
            this.contas = [];
            this.dados = {
                totalReceitas:0.00,
                totalDespesas:0.00,
                total:0.00,
                saldo:0.00
            };
            this.getFinanceiro(data);
        },
        sair(){
            localStorage.clear();
            this.$router.go();
        }
    },
    created(){
        let format =  moment().format('YYYY/MM').replace('/','');
        this.atualizar(format);
    }
}
</script>

<style>

</style>