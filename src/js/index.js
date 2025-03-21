// Configuração do ScrollMagic
const controller = new ScrollMagic.Controller();

// Animação para as seções
new ScrollMagic.Scene({
  triggerElement: "#sobre",
  duration: 300,
  triggerHook: 0.8,
})
  .setTween("#sobre", { opacity: 1, y: 0, duration: 1 })
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: "#linguagens",
  duration: 300,
  triggerHook: 0.8,
})
  .setTween("#linguagens", { opacity: 1, y: 0, duration: 1 })
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: "#projetos",
  duration: 300,
  triggerHook: 0.8,
})
  .setTween("#projetos", { opacity: 1, y: 0, duration: 1 })
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: "#contato",
  duration: 300,
  triggerHook: 0.8,
})
  .setTween("#contato", { opacity: 1, y: 0, duration: 1 })
  .addTo(controller);

// Rolagem suave ao clicar nos links do menu
document.querySelectorAll('nav ul li a, .hero .btn').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({
      behavior: 'smooth', // Rolagem suave
      block: 'start'
    });
  });
});

// Abrir e fechar modais
const modais = document.querySelectorAll('.modal');
const fecharModalBtns = document.querySelectorAll('.fechar');
const verDetalhesBtns = document.querySelectorAll('.ver-detalhes');

verDetalhesBtns.forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const targetModal = document.querySelector(this.getAttribute('href'));
    targetModal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Inicializa o Swiper dentro do modal aberto
    const swiper = new Swiper(targetModal.querySelector('.swiper-container'), {
      pagination: {
        el: targetModal.querySelector('.swiper-pagination'),
        clickable: true,
      },
      navigation: {
        nextEl: targetModal.querySelector('.swiper-button-next'),
        prevEl: targetModal.querySelector('.swiper-button-prev'),
      },
    });

    // Adiciona o evento de clique apenas para as imagens no Swiper
    targetModal.querySelectorAll('.swiper-slide img').forEach(imagem => {
      imagem.addEventListener('click', () => {
        ativarModoApresentacao(imagem);
      });
    });
  });
});

// Função para ativar o modo de apresentação
function ativarModoApresentacao(media) {
  const modoApresentacao = document.createElement('div');
  modoApresentacao.classList.add('modo-apresentacao');

  const mediaClone = media.cloneNode(true);
  modoApresentacao.appendChild(mediaClone);

  document.body.appendChild(modoApresentacao);

  modoApresentacao.addEventListener('click', () => {
    document.body.removeChild(modoApresentacao);
  });
}

// Fechar modal ao clicar no botão de fechar
fecharModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    modal.querySelectorAll('video').forEach(video => {
      video.pause();
      video.currentTime = 0;
    });
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
});

// Fechar modal ao clicar fora dele
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    const modal = e.target;
    modal.querySelectorAll('video').forEach(video => {
      video.pause();
      video.currentTime = 0;
    });
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Fechar modal com a tecla Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modais.forEach(modal => {
      if (modal.style.display === 'block') {
        modal.querySelectorAll('video').forEach(video => {
          video.pause();
          video.currentTime = 0;
        });
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }
});

// Função para trocar a mídia principal ao clicar nas miniaturas
document.querySelectorAll('.thumbnail').forEach(thumbnail => {
  thumbnail.addEventListener('click', function () {
    const mainMediaContainer = this.closest('.gallery').querySelector('.main-media');
    const mediaSrc = this.getAttribute('data-media');
    const mediaType = this.getAttribute('data-type');

    mainMediaContainer.innerHTML = '';

    if (mediaType === 'image') {
      const img = document.createElement('img');
      img.src = mediaSrc;
      img.alt = 'Mídia do Projeto';
      mainMediaContainer.appendChild(img);
    } else if (mediaType === 'video') {
      const video = document.createElement('video');
      video.src = mediaSrc;
      video.controls = true; // Adiciona controles ao vídeo
      video.autoplay = false; // Remove o autoplay
      mainMediaContainer.appendChild(video);
    }

    document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
    this.classList.add('active');
  });
});

// Validação do formulário
document.getElementById('form-contato').addEventListener('submit', function (e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  if (nome === '') {
    alert('Por favor, insira seu nome.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Por favor, insira um e-mail válido.');
    return;
  }

  if (mensagem === '') {
    alert('Por favor, insira sua mensagem.');
    return;
  }

  alert('Formulário enviado com sucesso!');
  this.reset();
});

// Menu de Hambúrguer
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

// Abrir/Fechar o menu ao clicar no botão de hambúrguer
mobileMenu.addEventListener('click', () => {
  navList.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Fechar o menu ao clicar em um link
document.querySelectorAll('.nav-list li a').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
});
