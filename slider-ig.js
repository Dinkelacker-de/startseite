// Image Slider with multiple features:
// - Loop functionality
// - Draggable slides
// - Navigation dots
// - Pause on hover
// - Auto slide
// - Adjustable number of slides to show

document.addEventListener('DOMContentLoaded', () => {
    class ImageSlider {
      constructor(options) {
        // Default options
        this.options = {
          sliderSelector: '.slider',
          trackSelector: '.track',
          slideSelector: '.slide',
          dotsSelector: '.dots',
          slidesToShow: 1,
          autoplaySpeed: 3000,
          loop: true,
          draggable: true,
          autoplay: true,
          pauseOnHover: true,
          ...options
        };
  
        // DOM elements
        this.slider = document.querySelector(this.options.sliderSelector);
        if (!this.slider) return;
        
        this.track = this.slider.querySelector(this.options.trackSelector);
        this.slides = Array.from(this.slider.querySelectorAll(this.options.slideSelector));
        this.dotsContainer = this.slider.querySelector(this.options.dotsSelector);
        
        if (!this.track || !this.slides.length) return;
        
        // State variables
        this.totalSlides = this.slides.length;
        this.currentSlide = 0;
        this.slideWidth = 0;
        this.isDragging = false;
        this.startPosX = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;
        this.animationID = 0;
        this.autoplayInterval = null;
        
        // Initialize
        this.init();
      }
      
      init() {
        // Set up slider track based on slidesToShow
        this.setupSlider();
        
        // Create dots
        this.createDots();
        
        // Update dots
        this.updateDots();
        
        // Add event listeners
        this.addEventListeners();
        
        // Start autoplay if enabled
        if (this.options.autoplay) {
          this.startAutoplay();
        }
      }
      
      setupSlider() {
        // Calculate slide width based on slidesToShow
        this.slideWidth = this.slider.offsetWidth / this.options.slidesToShow;
        
        // Set width for each slide
        this.slides.forEach(slide => {
          slide.style.width = `${this.slideWidth}px`;
        });
        
        // Set track width
        this.track.style.width = `${this.slideWidth * this.totalSlides}px`;
        
        // Apply transition
        this.track.style.transition = 'transform 0.3s ease-out';
      }
      
      createDots() {
        // Clear existing dots
        this.dotsContainer.innerHTML = '';
        
        // Create new dots
        for (let i = 0; i < this.totalSlides; i++) {
          const dot = document.createElement('span');
          dot.classList.add('dot');
          dot.dataset.index = i;
          this.dotsContainer.appendChild(dot);
        }
        
        // Add click event to dots
        this.dots = Array.from(this.dotsContainer.querySelectorAll('.dot'));
        this.dots.forEach(dot => {
          dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);
            this.goToSlide(index);
          });
        });
      }
      
      updateDots() {
        this.dots.forEach((dot, index) => {
          if (index === this.currentSlide) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
      
      addEventListeners() {
        // Resize event
        window.addEventListener('resize', () => {
          this.setupSlider();
          this.goToSlide(this.currentSlide);
        });
        
        // Dragging events
        if (this.options.draggable) {
          // Mouse events
          this.track.addEventListener('mousedown', this.startDrag.bind(this));
          this.track.addEventListener('mousemove', this.drag.bind(this));
          this.track.addEventListener('mouseup', this.endDrag.bind(this));
          this.track.addEventListener('mouseleave', this.endDrag.bind(this));
          
          // Touch events
          this.track.addEventListener('touchstart', this.startDrag.bind(this));
          this.track.addEventListener('touchmove', this.drag.bind(this));
          this.track.addEventListener('touchend', this.endDrag.bind(this));
          
          // Prevent context menu
          this.track.addEventListener('contextmenu', e => e.preventDefault());
        }
        
        // Pause on hover
        if (this.options.pauseOnHover && this.options.autoplay) {
          this.slider.addEventListener('mouseenter', this.pauseAutoplay.bind(this));
          this.slider.addEventListener('mouseleave', this.startAutoplay.bind(this));
        }
      }
      
      startDrag(e) {
        if (!this.options.draggable) return;
        
        this.isDragging = true;
        this.startPosX = this.getPositionX(e);
        this.prevTranslate = this.currentTranslate;
        
        // Stop transition during drag
        this.track.style.transition = 'none';
        
        // Stop autoplay during drag
        if (this.options.autoplay) {
          this.pauseAutoplay();
        }
        
        // Request animation frame
        cancelAnimationFrame(this.animationID);
        this.animationID = requestAnimationFrame(this.animation.bind(this));
      }
      
      drag(e) {
        if (!this.isDragging) return;
        
        const currentPosition = this.getPositionX(e);
        const diff = currentPosition - this.startPosX;
        this.currentTranslate = this.prevTranslate + diff;
        
        // Limit translation if loop is disabled
        if (!this.options.loop) {
          const minTranslate = -((this.totalSlides - this.options.slidesToShow) * this.slideWidth);
          const maxTranslate = 0;
          this.currentTranslate = Math.max(Math.min(this.currentTranslate, maxTranslate), minTranslate);
        }
      }
      
      endDrag() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        cancelAnimationFrame(this.animationID);
        
        // Calculate the closest slide
        const movedBy = this.currentTranslate - this.prevTranslate;
        
        // Determine direction and threshold
        if (movedBy < -100) {
          this.goToSlide(this.currentSlide + 1);
        } else if (movedBy > 100) {
          this.goToSlide(this.currentSlide - 1);
        } else {
          this.goToSlide(this.currentSlide);
        }
        
        // Restore transition
        this.track.style.transition = 'transform 0.3s ease-out';
        
        // Restart autoplay if enabled
        if (this.options.autoplay) {
          this.startAutoplay();
        }
      }
      
      animation() {
        this.setSliderPosition();
        if (this.isDragging) {
          this.animationID = requestAnimationFrame(this.animation.bind(this));
        }
      }
      
      getPositionX(e) {
        return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      }
      
      setSliderPosition() {
        this.track.style.transform = `translateX(${this.currentTranslate}px)`;
      }
      
      goToSlide(index) {
        // Handle loop
        if (this.options.loop) {
          if (index < 0) {
            index = this.totalSlides - this.options.slidesToShow;
          } else if (index > this.totalSlides - this.options.slidesToShow) {
            index = 0;
          }
        } else {
          // Limit index if loop is disabled
          index = Math.max(0, Math.min(index, this.totalSlides - this.options.slidesToShow));
        }
        
        // Update current slide
        this.currentSlide = index;
        
        // Update dots
        this.updateDots();
        
        // Set new translate position
        this.currentTranslate = -index * this.slideWidth;
        this.prevTranslate = this.currentTranslate;
        
        // Apply transition
        this.track.style.transition = 'transform 0.3s ease-out';
        this.setSliderPosition();
      }
      
      startAutoplay() {
        if (!this.options.autoplay) return;
        
        // Clear existing interval
        this.pauseAutoplay();
        
        // Set new interval
        this.autoplayInterval = setInterval(() => {
          this.goToSlide(this.currentSlide + 1);
        }, this.options.autoplaySpeed);
      }
      
      pauseAutoplay() {
        clearInterval(this.autoplayInterval);
      }
    }
  
    // Initialize the slider with options
    const slider = new ImageSlider({
      sliderSelector: '.slider-ig',
      slidesToShow: 1,
      autoplaySpeed: 5000,
      loop: true,
      draggable: true,
      autoplay: true,
      pauseOnHover: true
    });
  });