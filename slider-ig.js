document.addEventListener('DOMContentLoaded', () => {
    class ImageSlider {
      constructor(options) {
        // Standard-Optionen
        this.options = {
          sliderSelector: '.slider-ig',
          trackSelector: '.track',
          slideSelector: '.slide',
          dotsSelector: '#dots',
          slidesToShow: 8, // Change default to 5 here
          autoplaySpeed: 3000,
          loop: true,
          draggable: true,
          autoplay: true,
          pauseOnHover: true,
          breakpoints: {}, // New property for responsive settings
          ...options
        };
        
        // Apply responsive settings based on current viewport
        this.checkResponsiveSettings();
        
        // Rest of the constructor remains the same
        this.slider = document.querySelector(this.options.sliderSelector);
        if (!this.slider) return;
        
        this.track = this.slider.querySelector(this.options.trackSelector);
        this.originalSlides = Array.from(this.slider.querySelectorAll(this.options.slideSelector));
        this.dotsContainer = document.querySelector(this.options.dotsSelector);
        
        if (!this.track || !this.originalSlides.length) return;
        
        // Status-Variablen
        this.originalSlidesCount = this.originalSlides.length;
        this.currentSlide = 0;
        this.slideWidth = 0;
        this.slideGap = 0;
        this.isDragging = false;
        this.startPosX = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;
        this.animationID = 0;
        this.autoplayInterval = null;
        
        // Initialisierung
        this.init();
      }
      
      // New method to handle responsive settings
      checkResponsiveSettings() {
        if (this.options.breakpoints) {
          // Sort breakpoints from largest to smallest for proper cascade
          const breakpointSizes = Object.keys(this.options.breakpoints)
                                        .map(size => parseInt(size))
                                        .sort((a, b) => b - a); // Sort descending
          
          // Apply appropriate settings based on current viewport width
          const viewportWidth = window.innerWidth;
          
          // Reset to default first
          this.slidesToShow = this.options.slidesToShow;
          
          // Find the first breakpoint that applies
          for (const size of breakpointSizes) {
            if (viewportWidth <= size) {
              // Apply settings for this breakpoint
              Object.assign(this.options, this.options.breakpoints[size]);
            }
          }
        }
      }
      
      createClones() {
        // Klonen aller Slides für nahtloses Looping
        this.originalSlides.forEach(slide => {
          const clone = slide.cloneNode(true);
          this.track.appendChild(clone);
        });
      }
      
      setupSlider() {
        const sliderWidth = this.slider.offsetWidth;
        const totalGapWidth = this.slideGap * (this.options.slidesToShow - 1);
        
        // Correct calculation: total width minus total gaps, divided by number of slides
        this.slideWidth = (sliderWidth - totalGapWidth) / this.options.slidesToShow;
        
        // Breite für jeden Slide festlegen
        this.slides.forEach(slide => {
          slide.style.minWidth = `${this.slideWidth}px`;
          slide.style.width = `${this.slideWidth}px`;
        });
        
        // Initial setzen
        this.goToSlide(this.currentSlide, false);
      }
      
      createDots() {
        // Bestehende Dots löschen
        if (this.dotsContainer) {
          this.dotsContainer.innerHTML = '';
          
          // Dots nur für die Originalslides erstellen (nicht für Klone)
          for (let i = 0; i < this.originalSlidesCount; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.index = i;
            this.dotsContainer.appendChild(dot);
          }
          
          // Click-Event für Dots hinzufügen
          this.dots = Array.from(this.dotsContainer.querySelectorAll('.dot'));
          this.dots.forEach(dot => {
            dot.addEventListener('click', () => {
              const index = parseInt(dot.dataset.index);
              this.goToSlide(index);
            });
          });
        }
      }
      
      updateDots() {
        if (this.dots) {
          // Berechne den tatsächlichen Index für die Dots
          const actualIndex = this.getRealIndex();
          
          this.dots.forEach((dot, index) => {
            if (index === actualIndex) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });
        }
      }
      
      getRealIndex() {
        // Konvertiert den aktuellen Slide-Index zum tatsächlichen Index für die Dots
        // Bei loop ist der Index modulo der Anzahl der Original-Slides
        return this.options.loop ? 
          (this.currentSlide % this.originalSlidesCount) : 
          this.currentSlide;
      }
      
      init() {
        // Clones für das Infinite Loop erstellen
        if (this.options.loop) {
          this.createClones();
        }
        
        // Alle Slides nach dem Klonen erfassen
        this.slides = Array.from(this.slider.querySelectorAll(this.options.slideSelector));
        this.totalSlides = this.slides.length;
        
        // Slider-Track basierend auf slidesToShow einrichten
        this.setupSlider();
        
        // Dots erstellen
        this.createDots();
        
        // Dots aktualisieren
        this.updateDots();
        
        // Event-Listener hinzufügen
        this.addEventListeners();
        
        // Autoplay starten, falls aktiviert
        if (this.options.autoplay) {
          this.startAutoplay();
        }
      }
      
      addEventListeners() {
        // Resize-Event updated to check responsive settings
        window.addEventListener('resize', () => {
          this.checkResponsiveSettings(); // Check if breakpoint has changed
          this.setupSlider();
        });
        
        // Drag-Events
        if (this.options.draggable) {
          // Maus-Events
          this.track.addEventListener('mousedown', this.startDrag.bind(this));
          window.addEventListener('mousemove', this.drag.bind(this));
          window.addEventListener('mouseup', this.endDrag.bind(this));
          
          // Touch-Events
          this.track.addEventListener('touchstart', this.startDrag.bind(this));
          window.addEventListener('touchmove', this.drag.bind(this));
          window.addEventListener('touchend', this.endDrag.bind(this));
        }
        
        // Pause on hover
        if (this.options.pauseOnHover && this.options.autoplay) {
          this.slider.addEventListener('mouseenter', this.pauseAutoplay.bind(this));
          this.slider.addEventListener('mouseleave', this.startAutoplay.bind(this));
        }
        
        // Transition-Ende-Event für Loops
        this.track.addEventListener('transitionend', this.checkPosition.bind(this));
      }
      
      checkPosition() {
        if (!this.options.loop) return;
        
        // Wenn wir über die Hälfte der Klone hinaus sind, springen wir zurück ohne Animation
        if (this.currentSlide >= this.originalSlidesCount) {
          const newIndex = this.currentSlide % this.originalSlidesCount;
          this.goToSlide(newIndex, false);
        }
      }
      
      startDrag(e) {
        if (!this.options.draggable) return;
        
        // Prevent default to avoid text selection during drag
        e.preventDefault();
        
        this.isDragging = true;
        this.startPosX = this.getPositionX(e);
        this.prevTranslate = this.currentTranslate;
        
        // Übergang während des Ziehens stoppen
        this.track.style.transition = 'none';
        
        // Autoplay während des Ziehens stoppen
        if (this.options.autoplay) {
          this.pauseAutoplay();
        }
        
        // Animation Frame anfordern
        cancelAnimationFrame(this.animationID);
        this.animationID = requestAnimationFrame(this.animation.bind(this));
      }
      
      drag(e) {
        if (!this.isDragging) return;
        
        const currentPosition = this.getPositionX(e);
        const diff = currentPosition - this.startPosX;
        this.currentTranslate = this.prevTranslate + diff;
        
        // Translation begrenzen, wenn Loop deaktiviert ist
        if (!this.options.loop) {
          const minTranslate = -((this.totalSlides - this.options.slidesToShow) * (this.slideWidth + this.slideGap));
          const maxTranslate = 0;
          this.currentTranslate = Math.max(Math.min(this.currentTranslate, maxTranslate), minTranslate);
        }
      }
      
      endDrag() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        cancelAnimationFrame(this.animationID);
        
        // Bewegungsdistanz berechnen
        const movedBy = this.currentTranslate - this.prevTranslate;
        
        // Richtung und Schwellenwert bestimmen
        if (movedBy < -50) {
          this.goToSlide(this.currentSlide + 1);
        } else if (movedBy > 50) {
          this.goToSlide(this.currentSlide - 1);
        } else {
          this.goToSlide(this.currentSlide);
        }
        
        // Übergang wiederherstellen
        this.track.style.transition = 'transform 0.3s ease-out';
        
        // Autoplay neu starten, falls aktiviert
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
        return e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
      }
      
      setSliderPosition() {
        this.track.style.transform = `translateX(${this.currentTranslate}px)`;
      }

      goToSlide(index, animate = true) {
        // Index-Handling für Loop
        if (this.options.loop) {
          // Loop-Verhalten: Wir erlauben jede Indexposition
          if (index < 0) {
            index = this.originalSlidesCount - 1;
          } else if (index >= this.totalSlides) {
            index = 0;
          }
        } else {
          // Nicht-Loop-Verhalten: Index begrenzen
          index = Math.max(0, Math.min(index, this.totalSlides - this.options.slidesToShow));
        }
        
        // Aktuellen Slide aktualisieren
        this.currentSlide = index;
        
        // Neue Translate-Position festlegen - correct calculation to account for gaps
        this.currentTranslate = -index * (this.slideWidth + this.slideGap);
        this.prevTranslate = this.currentTranslate;
        
        // Übergang anwenden oder nicht
        this.track.style.transition = animate ? 'transform 0.3s ease-out' : 'none';
        this.setSliderPosition();
        
        // Dots aktualisieren
        this.updateDots();
      }
      
      startAutoplay() {
        if (!this.options.autoplay) return;
        
        // Bestehendes Intervall löschen
        this.pauseAutoplay();
        
        // Neues Intervall setzen
        this.autoplayInterval = setInterval(() => {
          // Wenn wir am Ende sind und loop aktiviert ist
          if (this.currentSlide === this.totalSlides - 1 && this.options.loop) {
            // Zum nächsten slide gehen (zum ersten)
            this.goToSlide(0);
          } else {
            // Normal zum nächsten Slide gehen
            this.goToSlide(this.currentSlide + 1);
          }
        }, this.options.autoplaySpeed);
      }
      
      pauseAutoplay() {
        clearInterval(this.autoplayInterval);
      }
    }
  
    // Initialize slider with options including breakpoints
    const slider = new ImageSlider({
      sliderSelector: '.slider-ig',
      slidesToShow: 5, // Default for large screens
      autoplaySpeed: 5000,
      loop: true,
      draggable: true,
      autoplay: true,
      pauseOnHover: true,
      breakpoints: {
        1300: { // When viewport width is less than 1300px
          slidesToShow: 4
        },
        1024: { slidesToShow: 3 },
        768: { slidesToShow: 2 },
        480: { slidesToShow: 1 }
      }
    });
});