document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initPage();
});

function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
    });
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
  } else if (path === '/about.html') {
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

function initCategoryDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');
  
  if (!slug) {
    showNotFound();
    return;
  }
  
  const category = categories.find(c => c.slug === slug);
  
  if (!category) {
    showNotFound();
    return;
  }
  
  document.title = `${category.nameNl} - Searchforhelp`;
  document.getElementById('categoryTitle').textContent = category.nameNl;
  document.getElementById('categoryDescription').textContent = category.descriptionNl;
  document.getElementById('categoryIcon').innerHTML = iconSVGs[category.icon] || iconSVGs.help;
  
  const categoryHelplines = helplines.filter(h => h.categoryId === category.id);
  document.getElementById('helplineCount').textContent = `${categoryHelplines.length} hulplijnen gevonden`;
  
  renderHelplines(categoryHelplines, 'categoryHelplines');
}

function showNotFound() {
  document.getElementById('categoryHeader').style.display = 'none';
  document.getElementById('helplineCount').style.display = 'none';
  document.getElementById('categoryHelplines').style.display = 'none';
  document.getElementById('notFound').style.display = 'block';
}

function renderCategories(categoriesList, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = categoriesList.map(category => `
    <a href="/category.html?slug=${category.slug}" class="category-card">
      <div class="category-icon">
        ${iconSVGs[category.icon] || iconSVGs.help}
      </div>
      <div class="category-info">
        <h3>${category.nameNl}</h3>
        <p>${category.descriptionNl}</p>
      </div>
    </a>
  `).join('');
}

function renderFeaturedHelplines() {
  const featured = helplines.filter(h => h.isFeatured).slice(0, 4);
  renderHelplines(featured, 'featuredHelplines');
}

function renderHelplines(helplinesList, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  if (helplinesList.length === 0) {
    container.innerHTML = `
      <div class="card" style="text-align: center; padding: 2rem;">
        <p>Geen hulplijnen gevonden.</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = helplinesList.map(helpline => `
    <div class="helpline-card">
      <div class="helpline-header">
        <span class="helpline-name">${helpline.name}</span>
        ${helpline.isEmergency ? '<span class="badge badge-emergency">Noodlijn</span>' : ''}
        ${helpline.isFeatured ? '<span class="badge badge-featured">Aanbevolen</span>' : ''}
      </div>
      <p class="helpline-description">${helpline.descriptionNl}</p>
      <div class="helpline-meta">
        ${helpline.hoursNl ? `
          <div class="helpline-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>${helpline.hoursNl}</span>
          </div>
        ` : ''}
        ${helpline.languages && helpline.languages.length > 0 ? `
          <div class="helpline-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span>${helpline.languages.join(', ')}</span>
          </div>
        ` : ''}
      </div>
      <div class="helpline-actions">
        ${helpline.phone ? `
          <a href="tel:${helpline.phone.replace(/\s/g, '')}" class="btn btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span class="helpline-phone">${helpline.phone}</span>
          </a>
        ` : ''}
        ${helpline.website ? `
          <a href="${helpline.website}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            Website
          </a>
        ` : ''}
      </div>
    </div>
  `).join('');
}

function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const clearSearch = document.getElementById('clearSearch');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const searchResults = document.getElementById('searchResults');
  const mainContent = document.getElementById('mainContent');
  
  if (!searchInput) return;
  
  let debounceTimer;
  
  searchInput.addEventListener('input', function() {
    const query = this.value.trim();
    
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (query.length >= 2) {
        performSearch(query);
        clearSearch.style.display = 'block';
      } else {
        hideSearchResults();
        clearSearch.style.display = 'none';
      }
    }, 300);
  });
  
  clearSearch.addEventListener('click', function() {
    searchInput.value = '';
    hideSearchResults();
    this.style.display = 'none';
  });
  
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', function() {
      searchInput.value = '';
      hideSearchResults();
      clearSearch.style.display = 'none';
    });
  }
  
  function performSearch(query) {
    const lowerQuery = query.toLowerCase();
    const results = helplines.filter(h =>
      h.name.toLowerCase().includes(lowerQuery) ||
      h.descriptionNl.toLowerCase().includes(lowerQuery) ||
      h.description.toLowerCase().includes(lowerQuery) ||
      (h.phone && h.phone.includes(query))
    );
    
    showSearchResults(query, results);
  }
  
  function showSearchResults(query, results) {
    document.getElementById('searchResultsTitle').textContent = `Zoekresultaten voor "${query}"`;
    
    if (results.length === 0) {
      document.getElementById('searchResultsList').innerHTML = `
        <div class="card" style="text-align: center; padding: 2rem;">
          <p style="margin-bottom: 0.5rem;">Geen hulplijnen gevonden voor "${query}"</p>
          <p class="text-small text-muted">Probeer andere zoektermen of bekijk de categorieën hieronder.</p>
        </div>
      `;
    } else {
      renderHelplines(results, 'searchResultsList');
    }
    
    searchResults.style.display = 'block';
    mainContent.style.display = 'none';
  }
  
  function hideSearchResults() {
    searchResults.style.display = 'none';
    mainContent.style.display = 'block';
  }
}
