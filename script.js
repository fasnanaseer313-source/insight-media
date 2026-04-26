// Navigation and Interaction Logic for Insight Pathways
document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Logic ---
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update scroll variable for parallax
        document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    });


    // --- Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // --- Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-3d, .reveal-left, .reveal-right, .reveal-up, .reveal-bounce');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));


    // =======================================
    // WHO WE SUPPORT — 3D Cards & Detail Panel
    // =======================================

    // Detail panel data for each card
    const wwsDetailData = [
        {
            icon: 'fa-solid fa-feather-pointed',
            title: 'First Nations Employment & Training',
            desc: 'We work alongside First Nations employment and training programs to build practical, community-centered systems that help connect people with meaningful career pathways.',
            features: [
                'Building practical workflows that support day-to-day staff work',
                'Defining meaningful metrics that reflect community progress',
                'Practical support for connecting community members with training',
                'Simple, usable tools for tracking program outcomes',
                'Grounding program systems in community values'
            ]
        },
        {
            icon: 'fa-solid fa-building-columns',
            title: 'Ontario Works Support Teams',
            desc: 'Supporting social assistance teams with streamlined processes and practical systems that reduce administrative burden while focusing on what matters most for people.',
            features: [
                'Building clear, manageable workflows for frontline staff',
                'Defining meaningful metrics that simplify reporting',
                'Practical support for connecting people with community services',
                'Focused, usable systems built with communities',
                'Aligning program data with community priorities'
            ]
        },
        {
            icon: 'fa-solid fa-people-group',
            title: 'Community Program Staff',
            desc: 'Equipping frontline teams with intuitive tools and clear processes so they can focus on supporting their community, not managing complex data.',
            features: [
                'Defining clear systems that support day-to-day work',
                'Practical tools for tracking program health',
                'Grounding systems in real-world program experience',
                'Support for clear, natural communication flows',
                'Usable templates designed with frontline staff'
            ]
        },
        {
            icon: 'fa-solid fa-user-tie',
            title: 'Managers & Directors',
            desc: 'Supporting program leads with practical tools for decision-making, clear metrics that reflect real needs, and supportive planning frameworks.',
            features: [
                'Clear visual tools that reflect what truly matters to communities',
                'Support for practical planning grounded in community reality',
                'Building systems that support team growth and confidence',
                'Grounded insights to help focus resources where they work best',
                'Practical support for community-driven reporting'
            ]
        },
        {
            icon: 'fa-solid fa-landmark',
            title: 'Band Administration',
            desc: 'Building efficient governance and administrative frameworks that honour community values and respect First Nations data sovereignty.',
            features: [
                'Building clear, practical administrative systems',
                'Practical support for community-driven policies',
                'Systems that reflect community values and accountability',
                'Support for community-controlled data systems',
                'Practical application of OCAP and data sovereignty'
            ]
        }
    ];

    // Clone for Marquee continuous scrolling effect
    const wwsGrid = document.getElementById('wws-grid');
    const wwsTrack = document.getElementById('wws-marquee-track');
    if (wwsGrid && wwsTrack) {
        const clone = wwsGrid.cloneNode(true);
        clone.id = 'wws-grid-clone';
        clone.setAttribute('aria-hidden', 'true');
        wwsTrack.appendChild(clone);
    }

    const wwsCards = document.querySelectorAll('.wws-card');
    const detailPanel = document.getElementById('wws-detail-panel');
    const detailContent = document.getElementById('wws-detail-content');
    const detailClose = document.getElementById('wws-detail-close');
    const detailBackdrop = document.getElementById('wws-detail-backdrop');

    // 3D Tilt effect on mouse move for each card
    wwsCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 12;
            const rotateY = (x - centerX) / 12;
            card.style.transform = `translateY(-12px) scale(1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });

        // Click — ripple + open detail panel
        card.addEventListener('click', (e) => {
            // Ripple
            const rippleContainer = card.querySelector('.wws-ripple-container');
            const ripple = document.createElement('div');
            ripple.className = 'wws-ripple';
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            rippleContainer.appendChild(ripple);
            setTimeout(() => ripple.remove(), 700);

            // Open detail panel
            const idx = parseInt(card.getAttribute('data-wws'));
            openWWSDetail(idx);
        });
    });

    function openWWSDetail(idx) {
        const data = wwsDetailData[idx];
        if (!data || !detailContent) return;

        let featuresHTML = data.features.map(f =>
            `<div class="detail-feature">
                <i class="fa-solid fa-circle-check"></i>
                <span>${f}</span>
            </div>`
        ).join('');

        detailContent.innerHTML = `
            <div class="detail-icon"><i class="${data.icon}"></i></div>
            <h3>${data.title}</h3>
            <p class="detail-desc">${data.desc}</p>
            <div class="detail-features">${featuresHTML}</div>
            <a href="contact.html" class="detail-cta">
                <span>Get Started</span>
                <i class="fa-solid fa-arrow-right"></i>
            </a>
        `;

        detailPanel.classList.add('open');
        detailBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeWWSDetail() {
        detailPanel.classList.remove('open');
        detailBackdrop.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (detailClose) detailClose.addEventListener('click', closeWWSDetail);
    if (detailBackdrop) detailBackdrop.addEventListener('click', closeWWSDetail);

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeWWSDetail();
    });

    // Parallax scroll for WWS background
    const wwsSection = document.querySelector('.wws-section');
    const wwsBgImg = document.querySelector('.wws-bg-img');
    if (wwsSection && wwsBgImg) {
        window.addEventListener('scroll', () => {
            const rect = wwsSection.getBoundingClientRect();
            const scrollPercent = -rect.top / (rect.height + window.innerHeight);
            const translate = scrollPercent * 40;
            wwsBgImg.style.transform = `scale(1.08) translateY(${translate}px)`;
        }, { passive: true });
    }

    // =======================================
    // PREMIUM SERVICES — Scroll Merge Animation
    // =======================================
    const servicesWrapper = document.querySelector('.premium-services-wrapper');
    const cards = document.querySelectorAll('.luxury-card');
    const progressDots = document.querySelectorAll('.progress-dot');

    if (servicesWrapper && cards.length > 0) {
        window.addEventListener('scroll', () => {
            const wrapperRect = servicesWrapper.getBoundingClientRect();
            const wrapperHeight = wrapperRect.height;
            const viewHeight = window.innerHeight;
            
            let totalProgress = -wrapperRect.top / (wrapperHeight - viewHeight);
            totalProgress = Math.max(0, Math.min(1, totalProgress));

            const mergeEnd = 0.3; // First 30% is the simultaneous merge
            const peelStart = mergeEnd;
            const peelZone = 1 - mergeEnd; // Remaining 70% for peeling
            const numCards = cards.length;
            const peelPerCard = peelZone / numCards;

            cards.forEach((card, index) => {
                const side = card.dataset.side; // "left" or "right"
                
                // --- PHASE 1: SIMULTANEOUS MERGE (0.0 to 0.3) ---
                if (totalProgress <= mergeEnd) {
                    const p = totalProgress / mergeEnd; // local 0 to 1
                    const xMove = side === 'left' ? -150 + (150 * p) : 150 - (150 * p);
                    const rotate = side === 'left' ? -10 + (10 * p) : 10 - (10 * p);
                    const opacity = p;
                    const blur = 10 * (1 - p);
                    
                    // Add a tiny stack offset so they aren't perfectly aligned
                    const stackOffset = index * -2; // slightly higher as we go 

                    card.style.transform = `translate(calc(-50% + ${xMove}%), calc(-50% + ${stackOffset}px)) rotate(${rotate}deg)`;
                    card.style.opacity = opacity;
                    card.style.filter = `blur(${blur}px)`;
                    
                    // Update dots: for merge phase, show first dot or interpolate?
                    // Let's just highlight the first dot until peeling starts
                    progressDots.forEach(dot => dot.classList.remove('active'));
                    if (progressDots[0]) progressDots[0].classList.add('active');
                    
                } 
                // --- PHASE 2: SEQUENTIAL PEELING (0.3 to 1.0) ---
                else {
                    const localPeelStart = peelStart + (index * peelPerCard);
                    const localPeelEnd = localPeelStart + peelPerCard;
                    
                    if (totalProgress < localPeelStart) {
                        // Card is still in the stack
                        card.style.transform = `translate(-50%, calc(-50% + ${index * -2}px)) rotate(0deg)`;
                        card.style.opacity = "1";
                        card.style.filter = "blur(0px)";
                    } 
                    else if (totalProgress <= localPeelEnd) {
                        // Card is currently peeling off
                        const p = (totalProgress - localPeelStart) / peelPerCard; // 0 to 1
                        const yMove = -150 * p; // slide up
                        const rotate = -5 * p; // slight tilt
                        const opacity = 1 - p;
                        const blur = p * 4;

                        card.style.transform = `translate(-50%, calc(-50% + ${index * -2}px + ${yMove}px)) rotate(${rotate}deg)`;
                        card.style.opacity = opacity;
                        card.style.filter = `blur(${blur}px)`;
                        
                        // Active dot
                        progressDots.forEach(dot => dot.classList.remove('active'));
                        if (progressDots[index]) progressDots[index].classList.add('active');
                    } 
                    else {
                        // Card is gone
                        card.style.opacity = "0";
                        card.style.pointerEvents = "none";
                    }
                }
            });
        }, { passive: true });
    }
    // --- Core Focus — Flip & Bounce Animation ---
    const focusCards = document.querySelectorAll('.focus-card.focus-reveal');
    const focusObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Get the delay from the style attribute if it exists, otherwise use a default stagger
                const delayStr = entry.target.style.transitionDelay || '0.1s';
                const delay = parseFloat(delayStr) * 1000;
                
                setTimeout(() => {
                    entry.target.classList.add('active-flip');
                }, delay);
                
                focusObserver.unobserve(entry.target); // Trigger once
            }
        });
    }, { threshold: 0.2 });

    focusCards.forEach(card => focusObserver.observe(card));

    // --- Enhanced Mobile Marquee JS ---
    const wwsContainer = document.querySelector('.wws-marquee-container');
    if (wwsContainer && wwsGrid) {
        let isMoving = true;
        let resumeTimer;
        
        // Use a small speed variable for subtle movement
        const scrollSpeed = 0.6; 

        function marqueeLoop() {
            if (isMoving && window.innerWidth <= 1024) {
                // Ensure snapping is off during automatic smooth motion to prevent jitter
                wwsContainer.style.scrollSnapType = 'none';
                
                wwsContainer.scrollLeft += scrollSpeed;
                
                const gridWidth = wwsGrid.offsetWidth;
                if (gridWidth > 0 && wwsContainer.scrollLeft >= gridWidth) {
                    wwsContainer.scrollLeft = 0;
                }
            }
            requestAnimationFrame(marqueeLoop);
        }

        // Detect user interaction and pause/resume
        const pauseAuto = () => {
            isMoving = false;
            clearTimeout(resumeTimer);
            // Enable snapping for manual interaction
            wwsContainer.style.scrollSnapType = 'x mandatory';
        };

        const resumeAuto = () => {
            clearTimeout(resumeTimer);
            resumeTimer = setTimeout(() => {
                isMoving = true;
                // Snapping will be disabled inside marqueeLoop when it starts moving again
            }, 3000); // 3 seconds delay after manual interaction
        };

        // Touch Events
        wwsContainer.addEventListener('touchstart', pauseAuto, { passive: true });
        wwsContainer.addEventListener('touchend', resumeAuto, { passive: true });
        
        // Mouse Events for testing on desktop with mobile view
        wwsContainer.addEventListener('mousedown', pauseAuto);
        window.addEventListener('mouseup', (e) => {
            if (!isMoving) resumeAuto();
        });

        // Prevent layout break on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                wwsContainer.style.scrollSnapType = '';
                wwsContainer.scrollLeft = 0;
            }
        });
        
        // Initial start
        setTimeout(() => {
            requestAnimationFrame(marqueeLoop);
        }, 1000);
    }

    // --- Luxury Card Click to Scroll ---
    const luxuryCards = document.querySelectorAll('.luxury-card');
    luxuryCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetSection = document.getElementById('home-services');
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
