// ==================== LOADING SCREEN ====================
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('mainContent');
    
    // Hide loader after page fully loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Show main content immediately after loading
            mainContent.classList.add('visible');
            
            // Trigger animations for home section
            const homeSection = document.querySelector('#home');
            if (homeSection) {
                homeSection.classList.add('visible');
            }
        }, 1500); // 1.5 seconds minimum display time
    });
});

// ==================== AUTH MODAL (OPTIONAL) ====================
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('authModal');
    const modalClose = document.getElementById('modalClose');
    const openSignin = document.getElementById('openSignin');
    const openSignup = document.getElementById('openSignup');
    const modalTabs = document.querySelectorAll('.modal-tab');
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');

    // Open modal functions
    function openModal(tab = 'signin') {
        modal.classList.add('active');
        if (tab === 'signup') {
            switchTab('signup');
        } else {
            switchTab('signin');
        }
    }

    // Close modal function - NOW OPTIONAL
    function closeModal() {
        modal.classList.remove('active');
    }

    // Tab switching
    function switchTab(tabName) {
        modalTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            }
        });

        if (tabName === 'signin') {
            signinForm.classList.add('active');
            signupForm.classList.remove('active');
        } else {
            signupForm.classList.add('active');
            signinForm.classList.remove('active');
        }
    }

    // Event listeners
    if (openSignin) {
        openSignin.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('signin');
        });
    }

    if (openSignup) {
        openSignup.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('signup');
        });
    }

    // Close button now works!
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Tab click handlers
    modalTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.dataset.tab);
        });
    });

    // Form submissions
    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signinEmail').value;
            const password = document.getElementById('signinPassword').value;
            
            if (email && password) {
                console.log('Signed in as:', email);
                // Close modal after successful login
                closeModal();
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirm = document.getElementById('signupConfirm').value;
            
            if (password !== confirm) {
                alert('Passwords do not match!');
                return;
            }
            
            if (name && email && password) {
                console.log('Registered as:', name, email);
                // Close modal after successful registration
                closeModal();
            }
        });
    }
});

// ==================== NAVBAR SCROLL EFFECT ====================
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ==================== MOBILE MENU TOGGLE ====================
const menuIcon = document.getElementById("menu-icon");
const menuList = document.getElementById("menu-list");
const navLinks = document.querySelectorAll("#menu-list a");

if (menuIcon && menuList) {
    menuIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        menuList.classList.toggle("hidden");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            menuList.classList.add("hidden");
        });
    });

    document.addEventListener("click", (e) => {
        if (!menuList.contains(e.target) && !menuIcon.contains(e.target)) {
            menuList.classList.add("hidden");
        }
    });

    menuList.addEventListener("click", (e) => {
        e.stopPropagation();
    });
}

// ==================== SCROLL REVEAL ANIMATIONS ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
        
        // Add stagger effect to member cards
        const cards = entry.target.querySelectorAll('.card-member, .card-admin');
        cards.forEach((card, cardIndex) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(30px) scale(0.9)';
          card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
          
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, cardIndex * 100);
        });
      }, index * 100);
    }
  });
}, observerOptions);

// Initialize scroll observer after page is ready
setTimeout(() => {
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}, 100);

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==================== CARD HOVER EFFECTS ====================
document.querySelectorAll('.card-member, .card-admin').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
