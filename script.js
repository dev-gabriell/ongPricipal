//Transição da img principal
const imgs = [
    'url("./img/Img-3.png")',
    'url("./img/img-principal.png")',
    'url("./img/Img-2.png")'
  ];
  
  let Init = 0;
  const backgroundElement = document.querySelector('.img-fundo');
  
  // Função que muda a imagem de fundo
  function ImgBack() {
    Init = (Init + 1) % imgs.length; 
    backgroundElement.style.backgroundImage = imgs[Init];
  }
  
  // Img muda a cada 3s
  setInterval(ImgBack, 3300);
  
  // Definir a primeira imagem quando a página carregar
  ImgBack();
//FIM


//Animação de scroll
const observar = new IntersectionObserver((visual) =>{
    visual.forEach ((obser) =>{
        if(obser.isIntersecting){
            obser.target.classList.add('animacao')
        }
        else{
            obser.target.classList.remove('animacao')
        }
    })
})

let cards = document.querySelectorAll('.hidden');
cards.forEach((element) => observar.observe(element))


//ANIMAÇÃO DE NÚMERO

function animateNumbers(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);

        // Adiciona o mais na frente dos números
        if (element.classList.contains('with-plus')) {
            element.innerText = (currentValue > 0 ? "+" : "") + currentValue;
        } else {
            element.innerText = currentValue;
        }

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Inicia a animação assim que estiver em tela
function startCounting() {
    const elements = document.querySelectorAll('.count');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = parseInt(element.getAttribute('data-number').replace(/[^\d]/g, ''), 10);
                animateNumbers(element, 0, finalValue, 2000); // Animate over 2 seconds
                observer.unobserve(element); // Stop observing after animating
            }
        });
    }, { threshold: 0.5 });

    elements.forEach((el) => {
        observer.observe(el);
    });
}
document.addEventListener('DOMContentLoaded', startCounting);


//Animação de carrossel nas imgs
const carrossel = document.querySelector('.carrossel');
const patrocinadores = document.querySelectorAll('.patrocinar');
let currentIndex = 0;

function slideNext() {
    // Calcular a largura do container de uma única imagem
    const width = patrocinadores[0].clientWidth;

    // Atualizar o índice para o próximo item
    currentIndex = (currentIndex + 1) % patrocinadores.length;

    // Deslocar o carrossel
    carrossel.style.transform = `translateX(-${currentIndex * width}px)`;
}

// Mudar as imagens a cada 3 segundos
setInterval(slideNext, 3000);

// Redimensionar o carrossel quando a janela for redimensionada
window.addEventListener('resize', () => {
    // Garantir que a transição funcione corretamente após redimensionamento
    carrossel.style.transform = `translateX(-${currentIndex * patrocinadores[0].clientWidth}px)`;
});