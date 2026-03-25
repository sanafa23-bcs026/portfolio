// ========================================
// RENDER SKILLS FUNCTION
// ========================================
function renderSkills() {
    const container = document.getElementById('skillsGrid');
    if (!container) return;
    
    container.innerHTML = '';
    skillsData.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.innerHTML = `
            <i class="${skill.icon}"></i>
            ${skill.name}
        `;
        skillCard.addEventListener('click', () => {
            showToast(`🔬 ${skill.name} — core competency in academic & industry projects.`);
        });
        container.appendChild(skillCard);
    });
}

// ========================================
// RENDER PROJECTS FUNCTION
// ========================================
function renderProjects() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;
    container.innerHTML = '';
    
    universityProjects.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-img">
                <i class="${proj.icon}" style="font-size: 3rem;"></i>
            </div>
            <div class="project-info">
                <div class="uni-badge"><i class="fas fa-university"></i> ${proj.uniBadge}</div>
                <h3>${proj.title}</h3>
                <p>${proj.description}</p>
                <div class="project-tags">
                    ${proj.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="#" class="project-link" data-project="${proj.title}">
                    <i class="fas fa-external-link-alt"></i> View Project Details →
                </a>
            </div>
        `;
        container.appendChild(card);
    });

    // Project links click
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projectName = link.getAttribute('data-project');
            showToast(`📂 "${projectName}" - Request project details via contact form!`);
        });
    });
}

// ========================================
// TOAST NOTIFICATION
// ========================================
let toastTimeout;
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toastMsg');
    if (!toast) return;
    if (toastTimeout) clearTimeout(toastTimeout);
    toast.textContent = message;
    toast.style.opacity = '1';
    toastTimeout = setTimeout(() => {
        toast.style.opacity = '0';
    }, duration);
}

// ========================================
// THEME TOGGLE
// ========================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
}

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

// ========================================
// ACTIVE NAVIGATION ON SCROLL
// ========================================
function initActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    function setActiveSection() {
        let current = '';
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinkItems.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveSection);
    setActiveSection();
}

// ========================================
// CONTACT FORM HANDLER
// ========================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const message = document.getElementById('message')?.value.trim();
        
        if (!name || !email || !message) {
            showToast('⚠️ Please fill all fields before sending.');
            return;
        }
        
        if (!email.includes('@')) {
            showToast('⚠️ Please enter a valid email address.');
            return;
        }
        
        // Clear form and show success
        contactForm.reset();
        showToast(`✅ Thank you ${name}, your message has been sent!`);
    });
}

// ========================================
// INIT ALL FUNCTIONS ON LOAD
// ========================================
window.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    renderProjects();
    initThemeToggle();
    initMobileMenu();
    initActiveNavigation();
    initContactForm();
});