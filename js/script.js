document.addEventListener('DOMContentLoaded', function () {
    // --- DOM Elements ---
    const loader = document.querySelector('.loader-container');
    const menuToggle = document.getElementById('menuToggle');
    const sidebarNav = document.getElementById('sidebarNav');

    // --- Page Loader ---
    if (loader) {
        setTimeout(function () {
            loader.style.opacity = '0';
            setTimeout(function () {
                loader.style.display = 'none';
            }, 400);
        }, 800); // Muted load time for better UX
    }

    // --- Mobile Menu Toggle ---
    if (menuToggle && sidebarNav) {
        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('active');
            sidebarNav.classList.toggle('active');
        });

        // Close overlay menu on link clicks
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                sidebarNav.classList.remove('active');
            });
        });
    }

    // --- Contact Form Success Feedback ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function () {
            const submitBtn = contactForm.querySelector('.submit-btn');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'INVIATO!';
                submitBtn.style.backgroundColor = '#ffffff';
                submitBtn.style.color = '#000000';
                submitBtn.style.borderColor = '#ffffff';

                setTimeout(function () {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.color = '';
                    submitBtn.style.borderColor = '';
                    contactForm.reset();
                }, 3000);
            }
        });
    }

    // --- Gallery Tabs Switching ---
    const tabBtns = document.querySelectorAll('.gallery-tab-btn');
    const tabContents = document.querySelectorAll('.gallery-tab-content');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const targetTab = this.getAttribute('data-tab');

                // Set active class on buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Show active tab grid instantly (prevents hidden reflow bugs)
                tabContents.forEach(content => {
                    const id = content.getAttribute('id');
                    if (id === 'tab-' + targetTab) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    }

    // --- Lightbox Modal for Gallery ---
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    if (lightboxModal) {
        let currentGalleryItems = [];
        let currentImageIndex = 0;

        // Open Lightbox
        function openLightbox(items, index) {
            currentGalleryItems = Array.from(items);
            currentImageIndex = index;
            updateLightboxImage();
            lightboxModal.classList.add('active');
            lightboxModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Lock background scrolling
        }

        // Close Lightbox
        function closeLightbox() {
            lightboxModal.classList.remove('active');
            lightboxModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'auto'; // Restore background scrolling
        }

        // Update image inside Lightbox
        function updateLightboxImage() {
            if (currentGalleryItems.length === 0) return;
            const currentItem = currentGalleryItems[currentImageIndex];
            const imgEl = currentItem.querySelector('img');
            const src = currentItem.getAttribute('data-src') || (imgEl ? imgEl.src : '');
            
            // Generate clean caption: read translated data-caption or default to index
            const lang = document.documentElement.getAttribute('lang') || 'it';
            const captionText = currentItem.getAttribute(`data-caption-${lang}`) || 
                                currentItem.getAttribute('data-caption') || 
                                (lang === 'en' ? `IMAGE ${currentImageIndex + 1} OF ${currentGalleryItems.length}` : `IMMAGINE ${currentImageIndex + 1} DI ${currentGalleryItems.length}`);
            
            lightboxImg.style.opacity = '0';
            setTimeout(() => {
                lightboxImg.src = src;
                lightboxCaption.textContent = captionText;
                lightboxImg.style.opacity = '1';
            }, 100);
        }

        // Navigate images
        function prevImage() {
            if (currentGalleryItems.length <= 1) return;
            currentImageIndex = (currentImageIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length;
            updateLightboxImage();
        }

        function nextImage() {
            if (currentGalleryItems.length <= 1) return;
            currentImageIndex = (currentImageIndex + 1) % currentGalleryItems.length;
            updateLightboxImage();
        }

        // Bind clicks to items for both tabs
        function setupGalleryItemClicks() {
            tabContents.forEach(tabContent => {
                const items = tabContent.querySelectorAll('.gallery-item');
                items.forEach((item, index) => {
                    item.addEventListener('click', function () {
                        openLightbox(items, index);
                    });
                });
            });
        }

        setupGalleryItemClicks();

        // Control Bindings
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
        if (lightboxNext) lightboxNext.addEventListener('click', nextImage);

        // Click on background closes lightbox
        lightboxModal.addEventListener('click', function (e) {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });

        // Keyboard navigation keys
        document.addEventListener('keydown', function (e) {
            if (!lightboxModal.classList.contains('active')) return;

            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        });
    }

    // --- SEO Translation Data ---
    const seoData = {
        it: {
            index: {
                title: "a.l.arch.studio | Annalisa Lamaddalena Architetto",
                desc: "Studio di architettura specializzato in progettazione architettonica, ristrutturazioni e riqualificazioni. Servizi di project management e consulenze specialistiche a Crema."
            },
            about: {
                title: "About | a.l.arch.studio | Annalisa Lamaddalena Architetto",
                desc: "Profilo professionale dell'architetto Annalisa Lamaddalena e attività dello studio di architettura a Crema. Grandi opere e progetti di ristrutturazione."
            },
            gallery: {
                title: "Gallery | a.l.arch.studio | Grandi Opere e Progetti",
                desc: "Galleria fotografica dei progetti e delle grandi opere dirette dall'architetto Annalisa Lamaddalena. San Raffaele Milano, Carrefour Limbiate e interior design."
            },
            "dove-siamo": {
                title: "Dove Siamo | Contatti e Studio | a.l.arch.studio",
                desc: "Indirizzo, telefono e modulo di contatto dello studio dell'architetto Annalisa Lamaddalena a Crema. Richiedi informazioni o consulenze."
            },
            press: {
                title: "Press & Rassegna Stampa | a.l.arch.studio",
                desc: "Rassegna stampa dello studio dell'architetto Annalisa Lamaddalena: articoli e recensioni su Eventi Culturali Magazine ed Elle Decor."
            },
            "privacy-policy": {
                title: "Privacy Policy & Termini | a.l.arch.studio",
                desc: "Informativa sulla privacy, trattamento dei dati personali (GDPR) e condizioni d'uso del sito web dello studio dell'architetto Annalisa Lamaddalena."
            }
        },
        en: {
            index: {
                title: "a.l.arch.studio | Annalisa Lamaddalena Architect",
                desc: "Architecture studio specializing in architectural design, renovations, and redevelopment. Project management services and specialized consulting in Crema."
            },
            about: {
                title: "About | a.l.arch.studio | Annalisa Lamaddalena Architect",
                desc: "Professional profile of architect Annalisa Lamaddalena and activities of the architecture studio in Crema. Major works and renovation projects."
            },
            gallery: {
                title: "Gallery | a.l.arch.studio | Major Works and Projects",
                desc: "Photo gallery of projects and major works directed by architect Annalisa Lamaddalena. San Raffaele Milan, Carrefour Limbiate, and interior design."
            },
            "dove-siamo": {
                title: "Find Us | Contacts and Studio | a.l.arch.studio",
                desc: "Address, phone, and contact form of the studio of architect Annalisa Lamaddalena in Crema. Request information or consultations."
            },
            press: {
                title: "Press & Media Coverage | a.l.arch.studio",
                desc: "Press review of the studio of architect Annalisa Lamaddalena: articles and media coverage on Eventi Culturali Magazine and Elle Decor."
            },
            "privacy-policy": {
                title: "Privacy Policy & Terms | a.l.arch.studio",
                desc: "Privacy policy, personal data processing (GDPR) and terms of use of the website of the studio of architect Annalisa Lamaddalena."
            }
        }
    };

    function updateSEO(lang) {
        const path = window.location.pathname;
        let page = 'index';
        if (path.includes('about')) page = 'about';
        else if (path.includes('gallery')) page = 'gallery';
        else if (path.includes('dove-siamo')) page = 'dove-siamo';
        else if (path.includes('press')) page = 'press';
        else if (path.includes('privacy-policy')) page = 'privacy-policy';

        if (seoData[lang] && seoData[lang][page]) {
            document.title = seoData[lang][page].title;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', seoData[lang][page].desc);
            }
        }
    }

    // --- Language Switcher Logic ---
    const langBtns = document.querySelectorAll('.lang-btn');
    const formControls = document.querySelectorAll('.form-control[data-placeholder-it]');
    
    function setLanguage(lang) {
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('preferredLanguage', lang);
        
        // Update all switcher buttons active state
        langBtns.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update input placeholders
        formControls.forEach(input => {
            const placeholder = input.getAttribute(`data-placeholder-${lang}`);
            if (placeholder) {
                input.placeholder = placeholder;
            }
        });
        
        // Update dynamic captions if we are on gallery page and lightbox is open
        if (lightboxModal && lightboxModal.classList.contains('active')) {
            updateLightboxImage();
        }
        
        // Update SEO tags
        updateSEO(lang);
    }
    
    // Determine initial language
    let initialLang = localStorage.getItem('preferredLanguage');
    if (!initialLang) {
        const browserLang = navigator.language || navigator.userLanguage;
        initialLang = (browserLang && browserLang.startsWith('en')) ? 'en' : 'it';
    }
    setLanguage(initialLang);
    
    // Bind click events
    if (langBtns.length > 0) {
        langBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const selectedLang = this.getAttribute('data-lang');
                setLanguage(selectedLang);
            });
        });
    }
});