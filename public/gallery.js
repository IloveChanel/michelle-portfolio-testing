// Pinterest Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize gallery
    initGallery();
    initFilters();
    initInfiniteScroll();
    initLightbox();
    
    function initGallery() {
        // Animate gallery items on scroll
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        galleryItems.forEach(item => {
            observer.observe(item);
        });
        
        // Set dynamic grid row spans based on image heights
        setTimeout(() => {
            galleryItems.forEach((item, index) => {
                const img = item.querySelector('img');
                if (img.complete) {
                    setGridSpan(item, img);
                } else {
                    img.addEventListener('load', () => {
                        setGridSpan(item, img);
                    });
                }
            });
        }, 100);
    }
    
    function setGridSpan(item, img) {
        const aspectRatio = img.naturalHeight / img.naturalWidth;
        const baseSpan = 40;
        const span = Math.ceil(baseSpan * aspectRatio);
        item.style.gridRowEnd = `span ${span}`;
    }
    
    function initFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter items with animation
                galleryItems.forEach((item, index) => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        setTimeout(() => {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.classList.add('visible');
                            }, 50);
                        }, index * 50);
                    } else {
                        item.classList.remove('visible');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    function initInfiniteScroll() {
        const loadMoreBtn = document.querySelector('.load-more-btn');
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                // Simulate loading more content
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    // Add more gallery items (simulation)
                    addMoreGalleryItems();
                    
                    this.innerHTML = '<i class="fas fa-plus"></i> Load More Projects';
                    this.disabled = false;
                }, 2000);
            });
        }
    }
    
    function addMoreGalleryItems() {
        const grid = document.getElementById('gallery-grid');
        const newItems = [
            {
                category: 'interior',
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=480&fit=crop',
                title: 'Luxury Living Space',
                description: 'Premium finish with custom color consultation'
            },
            {
                category: 'exterior',
                image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=520&fit=crop',
                title: 'Modern Farmhouse',
                description: 'Complete exterior transformation'
            },
            {
                category: 'cabinet',
                image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=400&h=400&fit=crop',
                title: 'Custom Kitchen Cabinets',
                description: 'Hand-painted with premium durability'
            }
        ];
        
        newItems.forEach((item, index) => {
            const galleryItem = createGalleryItem(item);
            grid.appendChild(galleryItem);
            
            // Animate new items
            setTimeout(() => {
                galleryItem.classList.add('visible');
            }, index * 200);
        });
    }
    
    function createGalleryItem(data) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-category', data.category);
        
        item.innerHTML = `
            <div class="gallery-card">
                <img src="${data.image}" alt="${data.title}" loading="lazy">
                <div class="gallery-overlay">
                    <div class="gallery-info">
                        <h3>${data.title}</h3>
                        <p>${data.description}</p>
                        <div class="gallery-tags">
                            <span class="tag">${data.category}</span>
                        </div>
                    </div>
                    <div class="gallery-actions">
                        <button class="gallery-btn" onclick="openLightbox(this)">
                            <i class="fas fa-expand"></i>
                        </button>
                        <button class="gallery-btn">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        return item;
    }
    
    function initLightbox() {
        // Heart button functionality
        document.addEventListener('click', function(e) {
            if (e.target.closest('.gallery-btn') && e.target.closest('.gallery-btn').querySelector('.fa-heart')) {
                const heartBtn = e.target.closest('.gallery-btn');
                const icon = heartBtn.querySelector('i');
                
                if (icon.classList.contains('fas')) {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    heartBtn.style.background = 'rgba(255, 255, 255, 0.2)';
                } else {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    heartBtn.style.background = '#e91e63';
                }
            }
        });
    }
    
    // Keyboard navigation for gallery
    document.addEventListener('keydown', function(e) {
        const lightbox = document.getElementById('lightbox');
        
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });
    
    // Performance optimization for scroll events
    let ticking = false;
    
    function updateGallery() {
        // Gallery scroll effects here
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateGallery);
            ticking = true;
        }
    });
});

// Lightbox Functions
function openLightbox(button) {
    const galleryCard = button.closest('.gallery-card');
    const img = galleryCard.querySelector('img');
    const title = galleryCard.querySelector('h3').textContent;
    const description = galleryCard.querySelector('p').textContent;
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxTitle.textContent = title;
    lightboxDescription.textContent = description;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close lightbox when clicking outside image
document.addEventListener('click', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Gallery Search Functionality (bonus feature)
function initGallerySearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search projects...';
    searchInput.className = 'gallery-search';
    
    // Add search to filter controls
    const filterControls = document.querySelector('.filter-controls');
    if (filterControls) {
        filterControls.appendChild(searchInput);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            galleryItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

console.log('🎨 Pinterest Gallery initialized!');
console.log('✨ MVP Decor showcase ready!');
console.log('📸 Interactive filtering and lightbox active!');