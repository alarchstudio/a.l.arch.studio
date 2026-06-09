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
            
            // Generate clean caption: read data-caption or default to index
            const captionText = currentItem.getAttribute('data-caption') || 
                                `IMMAGINE ${currentImageIndex + 1} DI ${currentGalleryItems.length}`;
            
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
});