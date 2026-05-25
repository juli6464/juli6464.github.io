/*!
* Portfolio – Julian David Alzate Cuervo
* Custom scripts: smooth scroll, clean URL (no #), scrollspy
*/

window.addEventListener('DOMContentLoaded', () => {

    // ── 1. Smooth scroll + URL limpia (sin #) ────────────────
    document.querySelectorAll('a.js-scroll-trigger[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href').slice(1);
            const target   = document.getElementById(targetId);
            if (!target) return;

            target.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Quitar el # de la URL — usa el path limpio
            history.replaceState(null, '', window.location.pathname + window.location.search);
        });
    });

    // ── 2. Intersection Observer → marca el nav-link activo ──
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('#navbarResponsive .nav-link');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') === '#' + id
                    );
                });
                // Mantener URL siempre limpia al hacer scroll
                history.replaceState(null, '', window.location.pathname + window.location.search);
            }
        });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));

    // ── 3. Cierra el menú hamburguesa al hacer click en un link
    const navbarToggler  = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarResponsive');

    document.querySelectorAll('#navbarResponsive .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarToggler && navbarToggler.click();
            }
        });
    });

    // ── 4. Limpiar # si la página carga con uno en la URL ────
    if (window.location.hash) {
        const targetId = window.location.hash.slice(1);
        const target   = document.getElementById(targetId);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.replaceState(null, '', window.location.pathname + window.location.search);
            }, 100);
        }
    }

});
