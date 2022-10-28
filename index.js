const botaoMenu = document.querySelector('.cabecalho_menu')
const botaoFecharMenu = document.querySelector('.menu_lateral_sair')
const menu = document.querySelector('.menu_lateral')

botaoMenu.addEventListener('click', () => {
    menu.classList.toggle('menu_lateral_ativo')
})

botaoFecharMenu.addEventListener('click', () => {
    menu.classList.toggle('menu_lateral_ativo')
})