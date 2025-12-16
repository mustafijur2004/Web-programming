// ===== Data =====
// IMAGE: Tour card images (800x600px recommended)
const tours = [
  {
    id: 1,
    name: "Cox's Bazar Beach Escape",
    description: "Experience the world's longest natural sea beach with golden sands and stunning sunsets.",
    duration: "4 Days / 3 Nights",
    price: 15000,
    category: "beach",
    // IMAGE: Tour image - Cox's Bazar beach
    image: "images/tours/coxs-bazar.jpg"
  },
  {
    id: 2,
    name: "Sundarbans Safari Adventure",
    description: "Explore the world's largest mangrove forest and spot the Royal Bengal Tiger.",
    duration: "3 Days / 2 Nights",
    price: 18000,
    category: "nature",
    // IMAGE: Tour image - Sundarbans mangrove
    image: "images/tours/sundarbans.jpg"
  },
  {
    id: 3,
    name: "Sylhet Tea Garden Tour",
    description: "Wander through lush green tea plantations and enjoy the serene hill landscapes.",
    duration: "3 Days / 2 Nights",
    price: 12000,
    category: "nature",
    // IMAGE: Tour image - Sylhet tea gardens
    image: "images/tours/sylhet.jpg"
  },
  {
    id: 4,
    name: "Bandarban Hill Trek",
    description: "Trek through misty mountains and experience tribal culture in the hill tracts.",
    duration: "5 Days / 4 Nights",
    price: 22000,
    category: "adventure",
    // IMAGE: Tour image - Bandarban hills
    image: "images/tours/bandarban.jpg"
  },
  {
    id: 5,
    name: "Srimangal Nature Retreat",
    description: "Visit the tea capital of Bangladesh with its rich biodiversity and peaceful atmosphere.",
    duration: "2 Days / 1 Night",
    price: 8000,
    category: "nature",
    // IMAGE: Tour image - Srimangal tea estate
    image: "images/tours/srimangal.jpg"
  },
  {
    id: 6,
    name: "Old Dhaka Heritage Walk",
    description: "Discover the rich history and culture of Old Dhaka with its ancient monuments.",
    duration: "1 Day",
    price: 3500,
    category: "cultural",
    // IMAGE: Tour image - Old Dhaka heritage
    image: "images/tours/dhaka.jpg"
  }
];

// IMAGE: Testimonial avatar images (150x150px recommended)
const testimonials = [
  {
    name: "Sarah Johnson",
    location: "United States",
    text: "An absolutely incredible experience! The Sundarbans tour was breathtaking. Our guide was knowledgeable and made us feel safe throughout. Highly recommend Bangladesh Travels!",
    rating: 5,
    // IMAGE: Avatar - Sarah Johnson
    avatar: "images/avatars/avatar-1.jpg"
  },
  {
    name: "James Chen",
    location: "Singapore",
    text: "The Cox's Bazar trip exceeded all expectations. The beach is truly magnificent and the local seafood was delicious. Great organization from start to finish.",
    rating: 5,
    // IMAGE: Avatar - James Chen
    avatar: "images/avatars/avatar-2.jpg"
  },
  {
    name: "Emma Williams",
    location: "United Kingdom",
    text: "Sylhet tea gardens were magical! The hospitality was outstanding and every detail was taken care of. Can't wait to come back and explore more of Bangladesh.",
    rating: 5,
    // IMAGE: Avatar - Emma Williams
    avatar: "images/avatars/avatar-3.jpg"
  }
];

// IMAGE: Gallery images (800x600px recommended)
const galleryImages = [
  // IMAGE: Gallery 1 - Cox's Bazar aerial
  { src: "images/gallery/gallery-1.jpg", alt: "Cox's Bazar Beach" },
  // IMAGE: Gallery 2 - Sundarbans boat tour
  { src: "images/gallery/gallery-2.jpg", alt: "Sundarbans Mangrove" },
  // IMAGE: Gallery 3 - Sylhet tea landscape
  { src: "images/gallery/gallery-3.jpg", alt: "Sylhet Tea Gardens" },
  // IMAGE: Gallery 4 - Bandarban temple
  { src: "images/gallery/gallery-4.jpg", alt: "Bandarban Hills" },
  // IMAGE: Gallery 5 - River boat sunset
  { src: "images/gallery/gallery-5.jpg", alt: "River Boat Journey" },
  // IMAGE: Gallery 6 - Hill Tracts village
  { src: "images/gallery/gallery-6.jpg", alt: "Tribal Village" }
];

// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const heroSlider = document.getElementById('heroSlider');
const heroDots = document.getElementById('heroDots');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');
const tourGrid = document.getElementById('tourGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialDots = document.getElementById('testimonialDots');
const galleryGrid = document.getElementById('galleryGrid');
const bookingModal = document.getElementById('bookingModal');
const bookingForm = document.getElementById('bookingForm');
const bookingSuccess = document.getElementById('bookingSuccess');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

// ===== State =====
let currentSlide = 0;
let currentTestimonial = 0;
let currentLightboxIndex = 0;
let slideInterval;
let testimonialInterval;

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  renderTours('all');
  renderTestimonials();
  renderGallery();
  initScrollEffects();
  startAutoSlide();
  startTestimonialAutoSlide();
  
  // Initialize Lucide icons after content is rendered
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

// ===== Hero Slider =====
function initHeroSlider() {
  const slides = heroSlider.querySelectorAll('.slide');
  
  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('hero-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    heroDots.appendChild(dot);
  });

  prevSlide.addEventListener('click', () => changeSlide(-1));
  nextSlide.addEventListener('click', () => changeSlide(1));
}

function changeSlide(direction) {
  const slides = heroSlider.querySelectorAll('.slide');
  const dots = heroDots.querySelectorAll('.hero-dot');
  
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
  
  resetAutoSlide();
}

function goToSlide(index) {
  const slides = heroSlider.querySelectorAll('.slide');
  const dots = heroDots.querySelectorAll('.hero-dot');
  
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  
  currentSlide = index;
  
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
  
  resetAutoSlide();
}

function startAutoSlide() {
  slideInterval = setInterval(() => changeSlide(1), 5000);
}

function resetAutoSlide() {
  clearInterval(slideInterval);
  startAutoSlide();
}

// ===== Tours =====
function renderTours(filter) {
  const filteredTours = filter === 'all' 
    ? tours 
    : tours.filter(tour => tour.category === filter);
  
  tourGrid.innerHTML = filteredTours.map(tour => `
    <div class="tour-card" data-category="${tour.category}">
      <div class="tour-image">
        <img src="${tour.image}" alt="${tour.name}" loading="lazy">
        <span class="tour-badge">${tour.category}</span>
      </div>
      <div class="tour-content">
        <h3>${tour.name}</h3>
        <p>${tour.description}</p>
        <div class="tour-meta">
          <span class="tour-duration"><i data-lucide="calendar"></i> ${tour.duration}</span>
          <span class="tour-price">৳${tour.price.toLocaleString()} <span>/person</span></span>
        </div>
        <button class="tour-btn" onclick="openBookingModal('${tour.name}')">Book Now</button>
      </div>
    </div>
  `).join('');
}

// Filter functionality
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTours(btn.dataset.filter);
    
    // Refresh Lucide icons after filtering
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  });
});

// ===== Testimonials =====
function renderTestimonials() {
  testimonialTrack.innerHTML = testimonials.map(t => `
    <div class="testimonial-card">
      <img src="${t.avatar}" alt="${t.name}" class="testimonial-avatar">
      <p class="testimonial-text">"${t.text}"</p>
      <h4 class="testimonial-name">${t.name}</h4>
      <p class="testimonial-location">${t.location}</p>
      <div class="testimonial-rating">${'★'.repeat(t.rating)}</div>
    </div>
  `).join('');

  // Create dots
  testimonials.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('testimonial-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(index));
    testimonialDots.appendChild(dot);
  });
}

function goToTestimonial(index) {
  const dots = testimonialDots.querySelectorAll('.testimonial-dot');
  dots[currentTestimonial].classList.remove('active');
  
  currentTestimonial = index;
  testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;
  
  dots[currentTestimonial].classList.add('active');
}

function startTestimonialAutoSlide() {
  testimonialInterval = setInterval(() => {
    const nextIndex = (currentTestimonial + 1) % testimonials.length;
    goToTestimonial(nextIndex);
  }, 6000);
}

// ===== Gallery =====
function renderGallery() {
  galleryGrid.innerHTML = galleryImages.map((img, index) => `
    <div class="gallery-item" onclick="openLightbox(${index})">
      <img src="${img.src}" alt="${img.alt}" loading="lazy">
      <div class="gallery-overlay">
        <span><i data-lucide="search"></i></span>
      </div>
    </div>
  `).join('');
}

function openLightbox(index) {
  currentLightboxIndex = index;
  lightboxImage.src = galleryImages[index].src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function changeLightboxImage(direction) {
  currentLightboxIndex = (currentLightboxIndex + direction + galleryImages.length) % galleryImages.length;
  lightboxImage.src = galleryImages[currentLightboxIndex].src;
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') changeLightboxImage(-1);
  if (e.key === 'ArrowRight') changeLightboxImage(1);
});

// ===== Booking Modal =====
function openBookingModal(destination = '') {
  bookingModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  bookingForm.style.display = 'block';
  bookingSuccess.style.display = 'none';
  
  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('travelDate').min = today;
  
  // Pre-select destination if provided
  if (destination) {
    const select = document.getElementById('destination');
    const options = select.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].text.toLowerCase().includes(destination.toLowerCase().split(' ')[0])) {
        select.selectedIndex = i;
        break;
      }
    }
  }
}

function closeBookingModal() {
  bookingModal.classList.remove('active');
  document.body.style.overflow = '';
  bookingForm.reset();
}

function handleBookingSubmit(e) {
  e.preventDefault();
  
  // Simulate API call
  const submitBtn = bookingForm.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Submitting...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    bookingForm.style.display = 'none';
    bookingSuccess.style.display = 'block';
    submitBtn.textContent = 'Submit Booking Request';
    submitBtn.disabled = false;
  }, 1500);
}

// Close modal on overlay click
bookingModal.addEventListener('click', (e) => {
  if (e.target === bookingModal) closeBookingModal();
});

// ===== Scroll Effects =====
function initScrollEffects() {
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Intersection Observer for animations
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

  // Observe elements
  document.querySelectorAll('.tour-card, .feature-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ===== Smooth Scroll =====
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// ===== Mobile Menu =====
mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
  });
});

// ===== Nav CTA Button =====
document.querySelector('.nav-cta').addEventListener('click', () => openBookingModal());
