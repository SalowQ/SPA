// menu lateral
const botaoMenu = document.querySelector('.cabecalho_menu')
const botaoFecharMenu = document.querySelector('.menu_lateral_sair')
const menu = document.querySelector('.cabecalho_menu_desktop')

botaoMenu.addEventListener('click', () => {
    menu.classList.toggle('menu_lateral_ativo')
})

botaoFecharMenu.addEventListener('click', () => {
    menu.classList.toggle('menu_lateral_ativo')
})

//criar tabela a partir dos produtos no local storage
window.onload = function criaTabelaInicial() {
    const storage = window.localStorage.getItem('lista');
    if (storage != null) {
        const listaAtual = JSON.parse(storage);

        listaAtual.forEach(produto => {
            var produtoDiv = montaLinha(produto);
            var conteudo = document.querySelector(".extrato_conteudo");
            conteudo.appendChild(produtoDiv);
            var mensagem = document.getElementById("mensagem_extrato");
            mensagem.classList.add("nao_existe");
            contaSaldo();
            lucroOuPrejuizo(window.localStorage.getItem('saldo'));
            }
        );        
    }
}

//máscara de números no campo valor
function mascaraValor(evento) {
    evento.preventDefault();
    var selector = document.querySelector('#valor');
    var mascara = new Inputmask("R$ 9{1,9}"+",99");
    mascara.mask(selector);
}

//cria tabela a partir do formulário
var botaoAdicionar = document.querySelector(".formulario_compra_botao");

botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();

    var form = document.querySelector(".formulario_compra");

    var produto = obtemProdutoDoFormulario(form);

    if(produto.nome.length != 0 && produto.valor != 0){

        var produtoDiv = montaLinha(produto);

        var conteudo = document.querySelector(".extrato_conteudo");

        conteudo.appendChild(produtoDiv);

        adicionaStorage (produto, 'lista');

        form.reset();

        var mensagem = document.getElementById("mensagem_extrato");
        mensagem.classList.add("nao_existe");
        } else {
            alert("Por favor, preencha todos os campos!")
        }
    }
)

function obtemProdutoDoFormulario(form){
    var produto = {
        tipo: form.tipo_transacao.value,
        nome: form.nome_mercadoria.value,
        valor: parseFloat(form.valor.value.replace(/[R$ ]/g, ' '). 
        replace(/[,]/g, '.'))
    }

    return produto;
}

//limpar tabela (deleta local storage e recarrega página)
var botaoLimpar = document.querySelector("#limpa_dados");

botaoLimpar.addEventListener("click", function(event){
    localStorage.clear();
    window.location.reload();
    alert("Produtos apagados com sucesso!")
    }
)

//adiciona elementos no local storage a partir do formulário
function adicionaStorage (produto, lista){
    const storage = window.localStorage.getItem(lista);

    if(storage === null) {
        window.localStorage.setItem(lista, JSON.stringify([produto]));
        contaSaldo();
        lucroOuPrejuizo(window.localStorage.getItem('saldo'));
    } else {
        const listaAtual = JSON.parse(storage);
 
        listaAtual.push(produto);

        window.localStorage.setItem(lista, JSON.stringify(listaAtual));
        contaSaldo();
        lucroOuPrejuizo(window.localStorage.getItem('saldo'));
    }
}    

//realiza conta do saldo e guarda info no local storage
function contaSaldo(){
    const storage = window.localStorage.getItem('lista');
    const listaAtual = JSON.parse(storage);
    var saldo = 0;
    var total = document.getElementById('extrato_resultado_total');

    for (var i = 0; i < listaAtual.length; i++){
        if(listaAtual[i].tipo == 'compra'){
            saldo = saldo + listaAtual[i].valor;
        } else {
            saldo = saldo - listaAtual[i].valor
        }
    }

    localStorage.setItem('saldo', saldo);
    total.textContent = saldo.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

function lucroOuPrejuizo(saldo){
    var lucroOuPrejuizo = document.getElementById('extrato_saldo');
    if(saldo > 0){
        lucroOuPrejuizo.textContent = '[LUCRO]'
    }
    if(saldo < 0){
        lucroOuPrejuizo.textContent = '[PREJUÍZO]'
    }
    if(saldo == 0){
        lucroOuPrejuizo.textContent = ' '
    }
}

//monta as linhas de produtos com operador, nome e valor
function montaLinha(produto){
    var produtoDiv = document.createElement("div");
    produtoDiv.classList.add("extrato_linha");

    var operadorP = montaP(produto.tipo, "extrato_linha_operador");
    var produtoP = montaP(produto.nome, "extrato_linha_produto");
    var valorP = montaP(produto.valor, "extrato_linha_valor");

    produtoDiv.appendChild(operadorP);
    produtoDiv.appendChild(produtoP);
    produtoDiv.appendChild(valorP);

    operadorP.textContent = compraVenda(produto.tipo);
    produtoP.textContent = produto.nome;
    valorP.textContent = produto.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    return produtoDiv;
}

function montaP(dado, classe){
    var p = document.createElement("p");
    p.TexContent = dado;
    p.classList.add(classe);
    return p;
}

function compraVenda(operador){
    if(operador == "compra"){
        return "+"
    } else{
        return "-"
    }
}