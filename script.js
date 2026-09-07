
        // Actualizar año dinámicamente en el footer
        document.getElementById('year').textContent = new Date().getFullYear();

        // Cerrar menú móvil automáticamente al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        const menuCollapse = new bootstrap.Collapse(document.getElementById('navbarNav'), { toggle: false });
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    menuCollapse.hide();
                }
            });
        });

        // Animación suave al hacer scroll (Intersection Observer)
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach((el) => {
            observer.observe(el);
        });