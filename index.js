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
const storage = localStorage.getItem('lista');
const listaAtual = JSON.parse(storage);
const total = document.getElementById('extrato_resultado_total');
const saldoRaw = localStorage.getItem('saldo');
const saldo = JSON.parse(saldoRaw);
if(saldo != null) {
    total.textContent = saldo.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

lucroOuPrejuizo(localStorage.getItem('saldo'));

if (storage != null) {
        listaAtual.forEach(produto => {
        var produtoDiv = montaLinha(produto);
        var conteudo = document.querySelector(".extrato_conteudo");
        conteudo.appendChild(produtoDiv);
        var mensagem = document.getElementById("mensagem_extrato");
        mensagem.classList.add("nao_existe");
        }  
    );                
}

//máscara de números no campo valor
function mascaraValor(evento) {
    const onlyDigits = evento.target.value
          // Transformando a String digitada em uma Array
    .split("")
          // Filtrando a Array e pegando apenas o que for digito
    .filter(s => /\d/.test(s))
          //Juntando tudo na Array em uma String
    .join("")
          // Adicionado os zeros
    .padStart(3, "0");
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
    evento.target.value = maskCurrency(digitsFloat);
    }
    function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
    }).format(valor)
}

//cria tabela a partir do formulário
var botaoAdicionar = document.querySelector(".formulario_compra_botao");

botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();
    var form = document.querySelector(".formulario_compra");
    var produto = obtemProdutoDoFormulario(form);

    if(produto.nome.length != 0 && form.valor.value != 0){

        var produtoDiv = montaLinha(produto);
        var conteudo = document.querySelector(".extrato_conteudo");
        conteudo.appendChild(produtoDiv);
        adicionaStorage (produto, 'lista');
        form.reset();

        var mensagem = document.getElementById("mensagem_extrato");
        mensagem.classList.add("nao_existe");

        const saldoRaw = localStorage.getItem('saldo');
        var saldo = JSON.parse(saldoRaw);
        if(produto.tipo == 'compra'){
            var itemSaldo = produto.valor * 1;
        } else {
            var itemSaldo = produto.valor * -1;
        }
        var total = document.getElementById('extrato_resultado_total');

        if(saldo === null) {
            saldo = itemSaldo;
            localStorage.setItem('saldo', saldo);
            total.textContent = saldo.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            } else {
            saldo = saldo + itemSaldo;
            localStorage.setItem('saldo', saldo);
            total.textContent = saldo.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            }
        lucroOuPrejuizo(window.localStorage.getItem('saldo'));

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
    var resultadoLimpar = confirm("Você tem certeza que quer apagar todos os dados?")
    if (resultadoLimpar == true) {
        localStorage.clear();
        window.location.reload();
        alert("Produtos apagados com sucesso!")    
    }else{
        alert("Você desistiu de excluir todos os dados da lista!");
    }    
}
)

//adiciona elementos no local storage a partir do formulário
function adicionaStorage (produto, lista){
    const storage = localStorage.getItem(lista);

    if(storage === null) {
        window.localStorage.setItem(lista, JSON.stringify([produto]));
    } else {
        const listaAtual = JSON.parse(storage);
 
        listaAtual.push(produto);

        window.localStorage.setItem(lista, JSON.stringify(listaAtual));
    }
}    

//confere se o saldo gerou lucro ou prejuízo

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