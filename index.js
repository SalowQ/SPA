const botaoMenu = document.querySelector('.cabecalho_menu')
const botaoFecharMenu = document.querySelector('.menu-lateral_sair')
const menu = document.querySelector('.menu-lateral')

botaoMenu.addEventListener('click', () => {
    menu.classList.toggle('menu-lateral--ativo')
})

botaoFecharMenu.addEventListener('click', () => {
    menu.classList.toggle('menu-lateral--ativo')
})