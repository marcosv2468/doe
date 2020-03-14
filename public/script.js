const buttonHeader = document.querySelector('header button')
const form = document.querySelector('.form')

buttonHeader.addEventListener('click', () => {
    form.classList.toggle('hide')
})
