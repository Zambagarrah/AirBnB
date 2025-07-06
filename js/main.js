// Listings data for home page
    const listings = [
      { img: 'https://source.unsplash.com/400x300/?apartment', title: 'Modern Apartment in City Center', price: 120, rating: 4.8, reviews: 120 },
      { img: 'https://source.unsplash.com/400x300/?house', title: 'Cozy Country House', price: 95, rating: 4.6, reviews: 80 },
      { img: 'https://source.unsplash.com/400x300/?villa', title: 'Luxury Villa with Pool', price: 300, rating: 4.9, reviews: 45 },
      { img: 'https://source.unsplash.com/400x300/?cabin', title: 'Rustic Cabin in the Woods', price: 85, rating: 4.7, reviews: 60 },
      { img: 'https://source.unsplash.com/400x300/?loft', title: 'Stylish Loft Apartment', price: 150, rating: 4.9, reviews: 75 },
      { img: 'https://source.unsplash.com/400x300/?bungalow', title: 'Beachfront Bungalow', price: 220, rating: 4.8, reviews: 90 }
    ];

    const listingsContainer = document.getElementById('listingsContainer');

    function createListingCard(listing) {
      const card = document.createElement('div');
      card.className = 'listing-card';
      card.style.width = '300px';
      card.tabIndex = 0;
      card.setAttribute('role', 'article');
      card.setAttribute('aria-label', `${listing.title}, $${listing.price} per night, rating ${listing.rating} stars`);
      card.innerHTML = `
        <img src="${listing.img}" alt="${listing.title}" class="listing-img" />
        <div class="listing-info">
          <div class="listing-title">${listing.title}</div>
          <div class="listing-price">$${listing.price} / night</div>
          <div class="listing-rating" aria-label="Rating">${'⭐'.repeat(Math.round(listing.rating))} (${listing.rating.toFixed(1)})</div>
        </div>
      `;
      return card;
    }

    function loadListings() {
      if (!listingsContainer) return;
      listings.forEach(listing => {
        const card = createListingCard(listing);
        listingsContainer.appendChild(card);
      });
    }

    // Show one section, hide others
    function showSection(id) {
      document.querySelectorAll('section').forEach(sec => {
        if (sec.id === id) {
          sec.classList.add('active');
          window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
        } else {
          sec.classList.remove('active');
        }
      });
    }

    // Navbar link clicks
    document.getElementById('nav-links').addEventListener('click', e => {
      if (e.target.classList.contains('nav-link')) {
        const section = e.target.getAttribute('data-section');
        if (section) {
          e.preventDefault();
          showSection(section);
          // Collapse navbar on mobile after click
          const navbarCollapse = document.querySelector('.navbar-collapse');
          if (navbarCollapse.classList.contains('show')) {
            new bootstrap.Collapse(navbarCollapse).toggle();
          }
        }
      }
    });

    // Brand logo click
    document.getElementById('nav-home').addEventListener('click', () => showSection('home'));

    // Dark mode toggle
    const toggleBtn = document.getElementById('darkModeToggle');
    toggleBtn.addEventListener('click', () => {
      const htmlEl = document.documentElement;
      if (htmlEl.getAttribute('data-theme') === 'light') {
        htmlEl.setAttribute('data-theme', 'dark');
        toggleBtn.textContent = '☀️';
      } else {
        htmlEl.setAttribute('data-theme', 'light');
        toggleBtn.textContent = '🌙';
      }
      toggleBtn.style.transition = 'transform 0.4s ease';
      toggleBtn.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        toggleBtn.style.transform = 'rotate(0deg)';
      }, 400);
      localStorage.setItem('theme', htmlEl.getAttribute('data-theme'));
    });

    // Persist theme on load
    window.addEventListener('DOMContentLoaded', () => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
      toggleBtn.textContent = savedTheme === 'light' ? '🌙' : '☀️';
      loadListings();
      showSection('home'); // Show home on load
    });

    // Search form handler
    document.getElementById('searchForm').addEventListener('submit', e => {
      e.preventDefault();
      const location = document.getElementById('location').value;
      const checkin = document.getElementById('checkin').value;
      const checkout = document.getElementById('checkout').value;
      const guests = document.getElementById('guests').value;

      if (!location) {
        alert('Please select a town in Mombasa.');
        return;
      }
      alert(`Searching stays in ${location} from ${checkin} to ${checkout} for ${guests} guest(s).`);
    });

    // Contact form handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', e => {
        e.preventDefault();
        alert('Thank you for contacting us! We will get back to you soon.');
        contactForm.reset();
      });
    }

    // FAQ toggle
    document.querySelectorAll('.faq-question').forEach(q => {
      q.addEventListener('click', () => {
        const answer = q.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
      });
      q.addEventListener('keypress', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          q.click();
        }
      });
    });