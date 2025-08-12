// Smooth scrolling para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animações ao rolar a página
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animações aos elementos
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-item, .gallery-item, .about-content, .results-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Header fixo com mudança de cor ao rolar
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(17, 17, 17, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#111111';
        header.style.backdropFilter = 'none';
    }
});

// Formulário de contato
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simular envio do formulário
    const submitBtn = this.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = 'Mensagem Enviada!';
        submitBtn.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
            this.reset();
        }, 2000);
    }, 1500);
});

// Menu mobile (responsivo)
function createMobileMenu() {
    const header = document.querySelector('.header .container');
    const nav = document.querySelector('.nav');
    
    // Criar botão hamburger
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.style.display = 'none';
    hamburger.style.fontSize = '1.5rem';
    hamburger.style.cursor = 'pointer';
    hamburger.style.color = 'white';
    
    // Inserir hamburger antes do nav
    header.insertBefore(hamburger, nav);
    
    // Toggle menu mobile
    hamburger.addEventListener('click', function() {
        nav.classList.toggle('mobile-active');
    });
    
    // Fechar menu ao clicar em link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('mobile-active');
        });
    });
}

// Inicializar menu mobile
document.addEventListener('DOMContentLoaded', createMobileMenu);

// Contador animado para resultados
function animateCounters() {
    const counters = document.querySelectorAll('.graph-item p');
    
    counters.forEach(counter => {
        const text = counter.textContent;
        const numbers = text.match(/\d+/g);
        
        if (numbers) {
            numbers.forEach(num => {
                const finalValue = parseInt(num);
                let currentValue = 0;
                const increment = finalValue / 50;
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        currentValue = finalValue;
                        clearInterval(timer);
                    }
                    counter.textContent = text.replace(num, Math.floor(currentValue));
                }, 30);
            });
        }
    });
}

// Ativar contador quando a seção de resultados for visível
const resultsSection = document.querySelector('.results');
if (resultsSection) {
    const resultsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                resultsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    resultsObserver.observe(resultsSection);
}

