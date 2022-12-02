// menu lateral
const botaoMenu = document.querySelector('.cabecalho_menu')
const botaoFecharMenu = document.querySelector('.menu_lateral_sair')
const menu = document.querySelector('.menu_lateral')

botaoMenu.addEventListener('click', () => {
    menu.classList.toggle('menu_lateral_ativo')
})

botaoFecharMenu.addEventListener('click', () => {
    menu.classList.toggle('menu_lateral_ativo')
})

// clicar no botão + clicar em limpar
var botaoAdicionar = document.querySelector(".formulario_compra_botao");

var botaoLimpar = document.querySelector("#limpa_dados");

//criar tabela a partir dos produtos no local storage

botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();

    var form = document.querySelector(".formulario_compra");

    var produto = obtemProdutoDoFormulario(form);

    var produtoDiv = montaLinha(produto);

    var conteudo = document.querySelector(".extrato_conteudo");

    conteudo.appendChild(produtoDiv);

    adicionaStorage (produto)

    form.reset();
})

botaoLimpar.addEventListener("click", function(event){
    localStorage.clear();
})

function adicionaStorage (produto){
        const storage = window.localStorage.getItem('lista');
    
        if(storage === null) {
            window.localStorage.setItem('lista', JSON.stringify([produto]));
        } else {
            const pegarListaAtual = window.localStorage.getItem('lista');
            const listaAtual = JSON.parse(pegarListaAtual);
    
            listaAtual.push(produto);
    
            window.localStorage.setItem('lista', JSON.stringify(listaAtual));
        }
    };

function obtemProdutoDoFormulario(form){
    var produto = {
        tipo: form.tipo_transacao.value,
        nome: form.nome_mercadoria.value,
        valor: parseFloat(form.valor.value),
    }

    return produto;
}

/*function obtemProdutoDoLocalStorage(form){
    var linha = JSON.parse(localStorage.getItem('items'))
    linha.forEach((produto)>=
    montaLinha(produto))
    [tipo:+, nome: sdjis, valor: 14]
    [tipo: -, nome: cu, valor: 50]

    return produto;
}*/

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
    valorP.textContent = "R$ " + produto.valor;

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