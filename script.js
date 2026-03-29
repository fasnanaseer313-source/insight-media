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
    const revealElements = document.querySelectorAll('.reveal, .reveal-3d, .reveal-left, .reveal-right, .reveal-up');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Hero Background Motion (Particles) ---
    const particleContainer = document.getElementById('particles-js');
    if (particleContainer) {
        for (let i = 0; i < 30; i++) {
            createParticle(particleContainer);
        }
    }

    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'light-particle';
        
        const size = Math.random() * 4 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 20 + 10;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(212, 175, 55, 0.4);
            border-radius: 50%;
            top: ${posY}%;
            left: ${posX}%;
            filter: blur(2px);
            animation: floatParticle ${duration}s infinite linear;
            animation-delay: -${delay}s;
        `;
        
        container.appendChild(particle);
    }

    // --- 3D Mouse Tilt (Optional but Premium) ---
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        window.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            heroContent.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    }

    // =======================================
    // WHO WE SUPPORT — 3D Cards & Detail Panel
    // =======================================

    // Detail panel data for each card
    const wwsDetailData = [
        {
            icon: 'fa-solid fa-feather-pointed',
            title: 'First Nations Employment & Training',
            desc: 'We partner with First Nations employment and training programs to build practical, culturally grounded systems that connect community members with meaningful career pathways.',
            features: [
                'Employment program design & workflow optimization',
                'Client tracking systems with cultural sensitivity',
                'Training delivery frameworks tailored to community needs',
                'Job readiness & skills assessment tools',
                'Partnership development with local employers'
            ]
        },
        {
            icon: 'fa-solid fa-building-columns',
            title: 'Ontario Works Delivery Teams',
            desc: 'Supporting OW delivery teams with streamlined processes, practical metrics, and systems that reduce administrative burden while improving client outcomes.',
            features: [
                'Case management workflow simplification',
                'Outcome tracking & reporting dashboards',
                'Inter-agency referral process design',
                'Staff training & capacity building programs',
                'Compliance & accountability frameworks'
            ]
        },
        {
            icon: 'fa-solid fa-people-group',
            title: 'Community Program Staff',
            desc: 'Equipping frontline staff with intuitive tools and clear processes so they can focus on what matters most — serving their community.',
            features: [
                'User-friendly data entry & tracking systems',
                'Clear process documentation & manuals',
                'Workload management tools & templates',
                'Team communication & coordination frameworks',
                'Professional development pathways'
            ]
        },
        {
            icon: 'fa-solid fa-user-tie',
            title: 'Managers & Directors',
            desc: 'Empowering program leaders with data-driven decision tools, clear performance metrics, and strategic planning frameworks.',
            features: [
                'Executive dashboards & visual reporting',
                'Strategic planning & goal-setting frameworks',
                'Budget alignment & resource optimization',
                'Staff performance & development systems',
                'Board reporting & stakeholder communication'
            ]
        },
        {
            icon: 'fa-solid fa-landmark',
            title: 'Band Administration',
            desc: 'Building efficient governance and administrative frameworks that honour community values while meeting operational and regulatory requirements.',
            features: [
                'Administrative process modernization',
                'Policy development & documentation',
                'Financial tracking & accountability systems',
                'Community engagement & feedback frameworks',
                'Data sovereignty & OCAP compliance'
            ]
        }
    ];

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
});
