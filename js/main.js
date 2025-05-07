// Animación de elementos al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    // Añadir clase fade-in a elementos que queremos animar
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.classList.add('fade-in');
    });
    
    // Función para verificar si un elemento está en el viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
      );
    }
    
    // Función para manejar el scroll y mostrar elementos
    function handleScroll() {
      const fadeElements = document.querySelectorAll('.fade-in');
      fadeElements.forEach(element => {
        if (isInViewport(element)) {
          element.classList.add('visible');
        }
      });
    }
    
    // Ejecutar al cargar la página
    handleScroll();
    
    // Listener para el scroll
    window.addEventListener('scroll', handleScroll);
    
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
    
    // Crear modal para certificados
    const body = document.body;
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalImg = document.createElement('img');
    modalImg.className = 'modal-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '&times;';
    
    modal.appendChild(modalImg);
    modal.appendChild(closeBtn);
    body.appendChild(modal);
    
    // Función para abrir el modal
    function openModal(src) {
      modalImg.src = src;
      modal.classList.add('show');
      document.body.style.overflow = 'hidden'; // Evitar scroll
    }
    
    // Función para cerrar el modal
    function closeModal() {
      modal.classList.remove('show');
      document.body.style.overflow = ''; // Restaurar scroll
    }
    
    // Añadir evento click a todas las imágenes de certificados
    const certificados = document.querySelectorAll('.galeria-certificados img');
    certificados.forEach(img => {
      img.addEventListener('click', function() {
        openModal(this.src);
      });
    });
    
    // Cerrar modal al hacer clic en el botón de cierre o fuera de la imagen
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    // Cerrar modal con la tecla ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  });