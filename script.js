// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Typewriter Effect
const words = ["Developer", "Designer", "Creator", "Innovator"];
let i = 0;
let timer;

function typeWriter(word, index = 0) {
  if (index === 0) document.getElementById('typewriter').textContent = '';
  if (index < word.length) {
    document.getElementById('typewriter').textContent += word.charAt(index);
    setTimeout(() => typeWriter(word, index + 1), 100);
  } else {
    setTimeout(deleteWriter, 2000);
  }
}

function deleteWriter() {
  const current = document.getElementById('typewriter').textContent;
  if (current.length > 0) {
    document.getElementById('typewriter').textContent = current.slice(0, -1);
    setTimeout(deleteWriter, 50);
  } else {
    i = (i + 1) % words.length;
    typeWriter(words[i]);
  }
}

typeWriter(words[i]);

// Skill Bar Animation
const fillBars = () => {
  document.querySelectorAll('.fill').forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width + '%';
  });
};

// Scroll Reveal
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      if (entry.target.closest('.about')) fillBars();
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(sec => {
  sec.classList.add('scroll-reveal');
  observer.observe(sec);
});

// Add CSS for reveal
const style = document.createElement('style');
style.textContent = `
  .scroll-reveal { opacity: 0; transform: translateY(50px); transition: all 0.8s ease; }
  .scroll-reveal.revealed { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);

// Project Filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.project-card').forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.style.display = 'block';
        setTimeout(() => card.style.opacity = 1, 100);
      } else {
        card.style.opacity = 0;
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  });
});

// Contact Form
document.querySelector('.contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Message sent! (This is a demo)');
  e.target.reset();
});

// ——— DARK MODE TOGGLE ———
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
  body.setAttribute('data-theme', 'light');
  themeSwitch.checked = true;
} else {
  body.removeAttribute('data-theme');
  themeSwitch.checked = false;
}

// Toggle theme
themeSwitch.addEventListener('change', () => {
  if (themeSwitch.checked) {
    body.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    body.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
  }
});

// LOAD PROJECTS FROM projects.json
async function loadProjects() {
  try {
    const res = await fetch('projects.json');
    const projects = await res.json();

    const container = document.getElementById('projects-container');
    container.innerHTML = '';

    projects.forEach(p => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.dataset.category = p.category;

      card.innerHTML = `
        <div class="project-img" style="background-image: url('${p.image}');"></div>
        <div class="project-info">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <div class="project-links">
            ${p.live ? `<a href="${p.live}" target="_blank"><i class="fas fa-external-link-alt"></i> Live</a>` : ''}
            ${p.code ? `<a href="${p.code}" target="_blank"><i class="fab fa-github"></i> Code</a>` : ''}
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load projects.json');
  }
}

// Run when page loads
document.addEventListener('DOMContentLoaded', loadProjects);