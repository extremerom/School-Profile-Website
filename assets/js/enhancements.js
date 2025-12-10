/**
 * Ecolify University - JavaScript Enhancements
 * Device detection, animations, and UX improvements
 */

(function() {
    'use strict';

    // ============================================
    // Device Detection and Adaptive Features
    // ============================================
    const DeviceDetector = {
        init: function() {
            this.detectDevice();
            this.detectOrientation();
            this.addDeviceClasses();
            this.logDeviceInfo();
        },

        detectDevice: function() {
            const ua = navigator.userAgent.toLowerCase();
            const platform = navigator.platform.toLowerCase();
            
            // Detect OS
            this.isAndroid = /android/.test(ua);
            this.isIOS = /iphone|ipad|ipod/.test(ua);
            this.isWindows = /win/.test(platform);
            this.isMac = /mac/.test(platform);
            this.isLinux = /linux/.test(platform) && !this.isAndroid;
            
            // Detect device type
            this.isMobile = /mobile/.test(ua) || this.isAndroid || this.isIOS;
            this.isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(ua);
            this.isDesktop = !this.isMobile && !this.isTablet;
            
            // Detect browser
            this.isChrome = /chrome/.test(ua) && !/edge/.test(ua);
            this.isFirefox = /firefox/.test(ua);
            this.isSafari = /safari/.test(ua) && !/chrome/.test(ua);
            this.isEdge = /edge/.test(ua);
            
            // Touch capability
            this.hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        },

        detectOrientation: function() {
            this.isPortrait = window.innerHeight > window.innerWidth;
            this.isLandscape = !this.isPortrait;
        },

        addDeviceClasses: function() {
            const body = document.body;
            
            // OS classes
            if (this.isAndroid) body.classList.add('device-android');
            if (this.isIOS) body.classList.add('device-ios');
            if (this.isWindows) body.classList.add('device-windows');
            if (this.isMac) body.classList.add('device-mac');
            if (this.isLinux) body.classList.add('device-linux');
            
            // Device type classes
            if (this.isMobile) body.classList.add('device-mobile');
            if (this.isTablet) body.classList.add('device-tablet');
            if (this.isDesktop) body.classList.add('device-desktop');
            
            // Touch class
            if (this.hasTouch) body.classList.add('has-touch');
            
            // Orientation classes
            if (this.isPortrait) body.classList.add('orientation-portrait');
            if (this.isLandscape) body.classList.add('orientation-landscape');
        },

        logDeviceInfo: function() {
            console.log('🖥️ Device Information:');
            console.log(`- OS: ${this.getOSName()}`);
            console.log(`- Type: ${this.getDeviceType()}`);
            console.log(`- Browser: ${this.getBrowserName()}`);
            console.log(`- Touch: ${this.hasTouch ? 'Yes' : 'No'}`);
            console.log(`- Orientation: ${this.isPortrait ? 'Portrait' : 'Landscape'}`);
            console.log(`- Screen: ${window.innerWidth}x${window.innerHeight}`);
        },

        getOSName: function() {
            if (this.isAndroid) return 'Android';
            if (this.isIOS) return 'iOS';
            if (this.isWindows) return 'Windows';
            if (this.isMac) return 'macOS';
            if (this.isLinux) return 'Linux';
            return 'Unknown';
        },

        getDeviceType: function() {
            if (this.isMobile) return 'Mobile';
            if (this.isTablet) return 'Tablet';
            if (this.isDesktop) return 'Desktop';
            return 'Unknown';
        },

        getBrowserName: function() {
            if (this.isChrome) return 'Chrome';
            if (this.isFirefox) return 'Firefox';
            if (this.isSafari) return 'Safari';
            if (this.isEdge) return 'Edge';
            return 'Unknown';
        }
    };

    // ============================================
    // Page Loader
    // ============================================
    const PageLoader = {
        init: function() {
            this.createLoader();
            window.addEventListener('load', () => this.hideLoader());
        },

        createLoader: function() {
            const loader = document.createElement('div');
            loader.className = 'page-loader';
            loader.innerHTML = `
                <div class="loader-content">
                    <div class="spinner"></div>
                    <h3>Loading Ecolify University...</h3>
                </div>
            `;
            document.body.insertBefore(loader, document.body.firstChild);
            this.loader = loader;
        },

        hideLoader: function() {
            setTimeout(() => {
                if (this.loader) {
                    this.loader.classList.add('hidden');
                    setTimeout(() => this.loader.remove(), 500);
                }
            }, 500);
        }
    };

    // ============================================
    // Scroll Animations
    // ============================================
    const ScrollAnimations = {
        init: function() {
            this.addScrollClasses();
            this.observeElements();
            this.handleHeaderScroll();
        },

        addScrollClasses: function() {
            const animatedElements = document.querySelectorAll(
                '.features-post, .section-heading, #tabs, .contact-info, .video-item'
            );
            
            animatedElements.forEach(el => {
                if (!el.classList.contains('animate-on-scroll')) {
                    el.classList.add('animate-on-scroll');
                }
            });
        },

        observeElements: function() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        // Add stagger effect for multiple elements
                        const siblings = entry.target.parentElement.children;
                        Array.from(siblings).forEach((sibling, index) => {
                            if (sibling.classList.contains('animate-on-scroll')) {
                                setTimeout(() => {
                                    sibling.classList.add('animated');
                                }, index * 100);
                            }
                        });
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            });
        },

        handleHeaderScroll: function() {
            const header = document.querySelector('.main-header');
            let lastScroll = 0;

            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;

                if (currentScroll > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                // Hide header on scroll down, show on scroll up (for mobile)
                if (DeviceDetector.isMobile) {
                    if (currentScroll > lastScroll && currentScroll > 500) {
                        header.style.transform = 'translateY(-100%)';
                    } else {
                        header.style.transform = 'translateY(0)';
                    }
                }

                lastScroll = currentScroll;
            });
        }
    };

    // ============================================
    // Smooth Scroll Enhancement
    // ============================================
    const SmoothScroll = {
        init: function() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    if (href === '#' || href === '#menu') return;
                    
                    e.preventDefault();
                    const target = document.querySelector(href);
                    
                    if (target) {
                        const offset = DeviceDetector.isMobile ? 60 : 80;
                        const targetPosition = target.offsetTop - offset;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    };

    // ============================================
    // Interactive Form Enhancements
    // ============================================
    const FormEnhancements = {
        init: function() {
            this.addFloatingLabels();
            this.addValidation();
            this.enhanceSubmit();
        },

        addFloatingLabels: function() {
            const inputs = document.querySelectorAll('#contact input, #contact textarea');
            
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        this.parentElement.classList.remove('focused');
                    }
                });
            });
        },

        addValidation: function() {
            const form = document.getElementById('contact');
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                input.addEventListener('invalid', function(e) {
                    e.preventDefault();
                    this.classList.add('error');
                    this.setAttribute('placeholder', 'This field is required!');
                });
                
                input.addEventListener('input', function() {
                    this.classList.remove('error');
                });
            });
        },

        enhanceSubmit: function() {
            const form = document.getElementById('contact');
            const submitBtn = document.getElementById('form-submit');
            
            if (submitBtn && form) {
                submitBtn.addEventListener('click', function() {
                    if (form.checkValidity()) {
                        // Add success animation
                        this.innerHTML = '✓ Sending...';
                        this.style.background = '#2c5f2d';
                    }
                });
            }
        }
    };

    // ============================================
    // Parallax Effect
    // ============================================
    const ParallaxEffect = {
        init: function() {
            if (!DeviceDetector.isMobile) {
                this.addParallax();
            }
        },

        addParallax: function() {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.main-banner, .video-overlay');
                
                parallaxElements.forEach(el => {
                    const speed = 0.5;
                    el.style.transform = `translateY(${scrolled * speed}px)`;
                });
            });
        }
    };

    // ============================================
    // Orientation Change Handler
    // ============================================
    const OrientationHandler = {
        init: function() {
            window.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    DeviceDetector.detectOrientation();
                    this.updateLayout();
                }, 100);
            });
        },

        updateLayout: function() {
            const body = document.body;
            body.classList.remove('orientation-portrait', 'orientation-landscape');
            
            if (DeviceDetector.isPortrait) {
                body.classList.add('orientation-portrait');
            } else {
                body.classList.add('orientation-landscape');
            }
            
            console.log(`📱 Orientation changed to: ${DeviceDetector.isPortrait ? 'Portrait' : 'Landscape'}`);
        }
    };

    // ============================================
    // Touch Gestures (for mobile/tablet)
    // ============================================
    const TouchGestures = {
        touchStartX: 0,
        touchEndX: 0,
        
        init: function() {
            if (DeviceDetector.hasTouch) {
                this.addSwipeSupport();
            }
        },

        addSwipeSupport: function() {
            document.addEventListener('touchstart', (e) => {
                this.touchStartX = e.changedTouches[0].screenX;
            });
            
            document.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            });
        },

        handleSwipe: function() {
            const swipeThreshold = 50;
            const diff = this.touchStartX - this.touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    console.log('⬅️ Swiped left');
                    // Handle left swipe
                } else {
                    console.log('➡️ Swiped right');
                    // Handle right swipe
                }
            }
        }
    };

    // ============================================
    // Performance Monitoring
    // ============================================
    const PerformanceMonitor = {
        init: function() {
            if ('PerformanceObserver' in window) {
                this.observePerformance();
            }
        },

        observePerformance: function() {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.log(`⚡ ${entry.name}: ${entry.duration.toFixed(2)}ms`);
                }
            });
            
            observer.observe({ entryTypes: ['measure', 'navigation'] });
        }
    };

    // ============================================
    // Adaptive Images based on device
    // ============================================
    const AdaptiveImages = {
        init: function() {
            this.optimizeImages();
        },

        optimizeImages: function() {
            const images = document.querySelectorAll('img');
            
            images.forEach(img => {
                // Add loading="lazy" for better performance
                if (!img.hasAttribute('loading')) {
                    img.setAttribute('loading', 'lazy');
                }
                
                // Adjust quality based on device
                if (DeviceDetector.isMobile) {
                    img.style.imageRendering = 'auto';
                }
            });
        }
    };

    // ============================================
    // Initialize All Enhancements
    // ============================================
    function initializeEnhancements() {
        console.log('🚀 Initializing Ecolify University Enhancements...');
        
        DeviceDetector.init();
        PageLoader.init();
        
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initializeModules();
            });
        } else {
            initializeModules();
        }
    }

    function initializeModules() {
        ScrollAnimations.init();
        SmoothScroll.init();
        FormEnhancements.init();
        ParallaxEffect.init();
        OrientationHandler.init();
        TouchGestures.init();
        PerformanceMonitor.init();
        AdaptiveImages.init();
        
        console.log('✅ All enhancements initialized successfully!');
    }

    // Start initialization
    initializeEnhancements();

})();
