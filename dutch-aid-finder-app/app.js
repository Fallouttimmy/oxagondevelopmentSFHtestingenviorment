
document.addEventListener('DOMContentLoaded', function() {
  initPage();
  initMobileMenu();
});

function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => mobileNav.classList.toggle('active'));
  }
}

function initPage() {
  const path = window.location.pathname;
  if (path === '/' || path === '/index.html' || path === '') {
    initHomePage();
  } else if (path === '/categories.html') {
    initCategoriesPage();
  } else if (path === '/category.html') {
    initCategoryDetailPage();
  }
}

function initHomePage() {
  renderCategories(categories.slice(0, 6), 'categoriesGrid');
  renderFeaturedHelplines();
  initSearch();
}

function initCategoriesPage() {
  renderCategories(categories, 'allCategoriesGrid');
}

function renderCategories(categoryList, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = categoryList.map(category => `
    <a href="/category.html?slug=${category.slug}" class="category-card">
      <div class="category-icon">
        ${iconSVGs[category.icon] || iconSVGs.help}
      </div>
      <div>
        <h3>${category.nameNl}</h3>
        <p>${category.descriptionNl}</p>
      </div>
    </a>
  `).join('');
}

function renderFeaturedHelplines() {
  const featured = helplines.filter(h => h.isFeatured).slice(0, 3);
  renderHelplines(featured, 'featuredHelplines');
}

function renderHelplines(helplinesList, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (helplinesList.length === 0) {
    container.innerHTML = '<p class="text-muted">Geen hulplijnen gevonden.</p>';
    return;
  }

  container.innerHTML = helplinesList.map(helpline => `
    <div class="helpline-card">
        <h3>${helpline.name}</h3>
        <p class="helpline-description">${helpline.descriptionNl}</p>
        <div class="helpline-actions">
            <a href="tel:${helpline.phone.replace(/\s/g, '')}" class="btn btn-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                Bel ${helpline.phone}
            </a>
            ${helpline.website ? `<a href="${helpline.website}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Website</a>` : ''}
        </div>
    </div>
  `).join('');
}

function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const clearSearch = document.getElementById('clearSearch');
  const searchResults = document.getElementById('searchResults');
  const mainContent = document.getElementById('mainContent');
  const searchResultsList = document.getElementById('searchResultsList');
  const searchResultsTitle = document.getElementById('searchResultsTitle');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    clearSearch.style.display = query ? 'block' : 'none';
    
    if (query.length > 1) {
      const results = helplines.filter(h => 
        h.name.toLowerCase().includes(query) || 
        h.descriptionNl.toLowerCase().includes(query) ||
        h.tags.some(t => t.toLowerCase().includes(query))
      );
      displaySearchResults(results, query);
    } else {
      hideSearchResults();
    }
  });

  clearSearch.addEventListener('click', () => {
    searchInput.value = '';
    clearSearch.style.display = 'none';
    hideSearchResults();
  });

  function displaySearchResults(results, query) {
    mainContent.style.display = 'none';
    searchResults.style.display = 'block';
    searchResultsTitle.textContent = `Zoekresultaten voor "${query}"`;
    renderHelplines(results, 'searchResultsList');
  }

  function hideSearchResults() {
    mainContent.style.display = 'block';
    searchResults.style.display = 'none';
  }
}
