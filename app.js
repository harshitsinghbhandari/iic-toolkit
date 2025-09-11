const showComingSoon = true; // Toggle this to false for live site

if (showComingSoon) {
  window.location.href = "comingsoon.html";
}
const sectionsData = {
  "discover": {
    "id": "discover",
    "name": "Discover Your Path",
    "description": "Entry point for new students to explore entrepreneurship opportunities",
    "target": "Freshers and curious students",
    "resources": [
      {
        "name": "E-Cell Orientation Sessions",
        "type": "awareness",
        "description": "Introduction to entrepreneurship culture at IIT Bombay",
        "contact": "ecell@iitb.ac.in"
      },
      {
        "name": "EnB Club Meet & Greet",
        "type": "awareness",
        "description": "Networking events for aspiring entrepreneurs",
        "contact": "enb@iitb.ac.in"
      },
      {
        "name": "Entrepreneurial Mindset Assessment",
        "type": "assessment",
        "description": "Evaluate your entrepreneurial potential and interests",
        "contact": "assessment@iitb.ac.in"
      },
      {
        "name": "IIT Bombay Startup Success Stories",
        "type": "inspiration",
        "description": "Learn from successful alumni entrepreneurs",
        "contact": "stories@iitb.ac.in"
      }
    ]
  },
  "foundation": {
    "id": "foundation",
    "name": "Build Your Foundation",
    "description": "Develop fundamental skills and knowledge for entrepreneurship",
    "target": "Students ready to learn entrepreneurship fundamentals",
    "resources": [
      {
        "name": "DSSE Entrepreneurship Courses",
        "type": "course",
        "description": "Comprehensive academic programs in entrepreneurship",
        "contact": "dsse@iitb.ac.in"
      },
      {
        "name": "Design Thinking (DE250)",
        "type": "course",
        "description": "Mandatory course on design thinking and innovation",
        "contact": "de250@iitb.ac.in"
      },
      {
        "name": "MakerSpace 101 Training",
        "type": "workshop",
        "description": "Learn to use fabrication tools and equipment",
        "contact": "makerspace@iitb.ac.in"
      },
      {
        "name": "Business Model Canvas Workshop",
        "type": "workshop",
        "description": "Framework for developing business models",
        "contact": "workshops@iitb.ac.in"
      }
    ]
  },
  "development": {
    "id": "development",
    "name": "Develop Your Ideas",
    "description": "Transform ideas into viable proof-of-concepts and prototypes",
    "target": "Students with ideas ready for development",
    "resources": [
      {
        "name": "IDEAS Program",
        "type": "program",
        "description": "3-level pre-incubation program with alumni mentorship",
        "contact": "ideas@iitb.ac.in"
      },
      {
        "name": "Proof-of-Concept Lab",
        "type": "facility",
        "description": "Fully equipped lab for prototype development",
        "contact": "poclab@iitb.ac.in"
      },
      {
        "name": "Tinkerers' Laboratory",
        "type": "facility",
        "description": "24x7 student-run makerspace for innovation",
        "contact": "tinkerers@iitb.ac.in"
      },
      {
        "name": "Eureka! Competition",
        "type": "competition",
        "description": "Asia's largest business plan competition",
        "contact": "eureka@iitb.ac.in"
      }
    ]
  },
  "scaling": {
    "id": "scaling",
    "name": "Scale Your Venture",
    "description": "Professional incubation and business scaling support",
    "target": "Startups ready for incubation and investment",
    "resources": [
      {
        "name": "SINE Incubation",
        "type": "incubation",
        "description": "Technology business incubator with comprehensive support",
        "contact": "sine@iitb.ac.in"
      },
      {
        "name": "Seed Funding Access",
        "type": "funding",
        "description": "Connect with investors and funding opportunities",
        "contact": "funding@iitb.ac.in"
      },
      {
        "name": "Mentor Network",
        "type": "mentorship",
        "description": "Access to 100+ experienced entrepreneur mentors",
        "contact": "mentors@iitb.ac.in"
      },
      {
        "name": "Office Space at SINE",
        "type": "infrastructure",
        "description": "Fully furnished office spaces for startups",
        "contact": "space@iitb.ac.in"
      }
    ]
  },
  "community": {
    "id": "community",
    "name": "Connect & Grow",
    "description": "Long-term community support and network building",
    "target": "All entrepreneurs at any stage",
    "resources": [
      {
        "name": "Alumni Entrepreneur Network",
        "type": "network",
        "description": "Connect with 68,000+ IIT Bombay alumni worldwide",
        "contact": "alumni@iitb.ac.in"
      },
      {
        "name": "TIH Research Collaborations",
        "type": "research",
        "description": "Technology Innovation Hub partnerships",
        "contact": "tih@iitb.ac.in"
      },
      {
        "name": "ASPIRE Research Park",
        "type": "partnership",
        "description": "Industry collaboration opportunities",
        "contact": "aspire@iitb.ac.in"
      },
      {
        "name": "International Exchanges",
        "type": "program",
        "description": "Global entrepreneurship and innovation programs",
        "contact": "international@iitb.ac.in"
      }
    ]
  }
};

// Global state
let currentSection = 'home';
let visitedSections = new Set(['home']);
let currentStoryIndex = 0;
let allResources = [];
let filteredResources = [];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing application...');
  initializeApp();
  setupEventListeners();
  renderResources();
  startStoriesCarousel();
});

function initializeApp() {
  console.log('Setting up application data...');
  
  // Collect all resources for search
  Object.values(sectionsData).forEach(section => {
    section.resources.forEach(resource => {
      allResources.push({
        ...resource,
        sectionId: section.id,
        sectionName: section.name
      });
    });
  });
  filteredResources = [...allResources];
  
  console.log('Total resources loaded:', allResources.length);
}

function setupEventListeners() {
  console.log('Setting up event listeners...');
  
  // Navigation buttons
  document.querySelectorAll('.nav__item').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('data-section');
      console.log('Navigation clicked:', sectionId);
      showSection(sectionId);
    });
  });

  // Search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        searchResources();
      }
    });
    
    // Real-time search
    searchInput.addEventListener('input', function() {
      searchResources();
    });
  }

  // Close modal on outside click
  const modal = document.getElementById('assessmentModal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeAssessment();
      }
    });
  }
}

function showSection(sectionId) {
  console.log('Showing section:', sectionId);
  
  // Hide current section
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });

  // Show target section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
    console.log('Section activated:', sectionId);
  } else {
    console.error('Section not found:', sectionId);
    return;
  }

  // Update navigation
  document.querySelectorAll('.nav__item').forEach(btn => {
    btn.classList.remove('active');
  });

  const activeBtn = document.querySelector(`[data-section="${sectionId}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  // Update state and progress
  currentSection = sectionId;
  visitedSections.add(sectionId);
  updateProgress();

  // Scroll to top
  window.scrollTo(0, 0);
}

function updateProgress() {
  const totalSections = 6; // home + 5 main sections
  const progress = (visitedSections.size / totalSections) * 100;
  const progressFill = document.getElementById('progressFill');
  if (progressFill) {
    progressFill.style.width = `${progress}%`;
  }
  console.log('Progress updated:', progress + '%');
}

function renderResources() {
  console.log('Rendering resources...');
  
  Object.keys(sectionsData).forEach(sectionId => {
    const container = document.getElementById(`${sectionId}Resources`);
    if (container) {
      const section = sectionsData[sectionId];
      container.innerHTML = generateResourcesHTML(section.resources, sectionId);
      console.log('Resources rendered for:', sectionId);
    }
  });
}

function generateResourcesHTML(resources, sectionId) {
  return resources.map(resource => `
    <div class="resource-card" data-type="${resource.type}" data-section="${sectionId}">
      <div class="resource-type">${resource.type}</div>
      <h3 class="resource-name">${resource.name}</h3>
      <p class="resource-description">${resource.description}</p>
      <div class="resource-contact">
        <strong>Contact:</strong> ${resource.contact}
      </div>
      <div class="resource-actions">
        <button class="btn btn--primary btn--sm" onclick="learnMore('${resource.name.replace(/'/g, "\\'")}')">Learn More</button>
        <button class="btn btn--outline btn--sm" onclick="contactResource('${resource.contact}')">Contact</button>
      </div>
    </div>
  `).join('');
}

function searchResources() {
  const searchInput = document.getElementById('searchInput');
  const typeFilter = document.getElementById('typeFilter');
  
  if (!searchInput || !typeFilter) {
    console.error('Search elements not found');
    return;
  }
  
  const searchTerm = searchInput.value.toLowerCase().trim();
  const typeFilterValue = typeFilter.value;
  
  console.log('Searching for:', searchTerm, 'Type filter:', typeFilterValue);
  
  filteredResources = allResources.filter(resource => {
    const matchesSearch = !searchTerm || 
      resource.name.toLowerCase().includes(searchTerm) ||
      resource.description.toLowerCase().includes(searchTerm) ||
      resource.type.toLowerCase().includes(searchTerm);
    
    const matchesType = !typeFilterValue || resource.type === typeFilterValue;
    
    return matchesSearch && matchesType;
  });

  console.log('Filtered resources:', filteredResources.length);
  displaySearchResults();
}

function filterResources() {
  searchResources(); // Reuse search logic with current search term
}

function displaySearchResults() {
  console.log('Displaying search results...');
  
  // Show all sections first
  Object.keys(sectionsData).forEach(sectionId => {
    const container = document.getElementById(`${sectionId}Resources`);
    if (container) {
      // Filter resources for this section
      const sectionResources = filteredResources.filter(r => r.sectionId === sectionId);
      
      if (sectionResources.length > 0) {
        container.innerHTML = sectionResources.map(resource => `
          <div class="resource-card" data-type="${resource.type}" data-section="${resource.sectionId}">
            <div class="resource-type">${resource.type}</div>
            <h3 class="resource-name">${resource.name}</h3>
            <p class="resource-description">${resource.description}</p>
            <div class="resource-contact">
              <strong>Contact:</strong> ${resource.contact}
            </div>
            <div class="resource-actions">
              <button class="btn btn--primary btn--sm" onclick="learnMore('${resource.name.replace(/'/g, "\\'")}')">Learn More</button>
              <button class="btn btn--outline btn--sm" onclick="contactResource('${resource.contact}')">Contact</button>
            </div>
          </div>
        `).join('');
      } else {
        container.innerHTML = '<div class="no-results" style="text-align: center; padding: 20px; color: var(--color-text-secondary);">No resources found matching your criteria.</div>';
      }
    }
  });
}

function focusSearch() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.focus();
    searchInput.scrollIntoView({ behavior: 'smooth' });
  }
}

function learnMore(resourceName) {
  alert(`More information about "${resourceName}" would be displayed here. This would typically open a detailed view or navigate to the resource's dedicated page.`);
}

function contactResource(email) {
  if (email && email.includes('@')) {
    window.open(`mailto:${email}`, '_blank');
  } else {
    alert(`Contact: ${email}`);
  }
}

// Success Stories Carousel
function startStoriesCarousel() {
  console.log('Starting stories carousel...');
  setInterval(nextStory, 5000); // Auto-advance every 5 seconds
}

function nextStory() {
  const stories = document.querySelectorAll('.story-card');
  if (stories.length === 0) return;
  
  stories[currentStoryIndex].classList.remove('active');
  currentStoryIndex = (currentStoryIndex + 1) % stories.length;
  stories[currentStoryIndex].classList.add('active');
}

function previousStory() {
  const stories = document.querySelectorAll('.story-card');
  if (stories.length === 0) return;
  
  stories[currentStoryIndex].classList.remove('active');
  currentStoryIndex = currentStoryIndex === 0 ? stories.length - 1 : currentStoryIndex - 1;
  stories[currentStoryIndex].classList.add('active');
}

// FAQ Functionality
function toggleFAQ(index) {
  const faqItems = document.querySelectorAll('.faq-item');
  const faqItem = faqItems[index];
  
  if (faqItem) {
    const wasActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    faqItems.forEach(item => {
      item.classList.remove('active');
    });
    
    // Toggle current item
    if (!wasActive) {
      faqItem.classList.add('active');
    }
  }
}

// Assessment Modal
function startAssessment() {
  console.log('Starting assessment...');
  const modal = document.getElementById('assessmentModal');
  if (modal) {
    modal.classList.remove('hidden');
    // Reset form
    document.querySelectorAll('input[type="radio"]').forEach(input => {
      input.checked = false;
    });
  } else {
    console.error('Assessment modal not found');
  }
}

function closeAssessment() {
  const modal = document.getElementById('assessmentModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function getRecommendation() {
  const year = document.querySelector('input[name="year"]:checked')?.value;
  const idea = document.querySelector('input[name="idea"]:checked')?.value;
  const experience = document.querySelector('input[name="experience"]:checked')?.value;

  if (!year || !idea || !experience) {
    alert('Please answer all questions to get your recommendation.');
    return;
  }

  let recommendation = '';
  
  // Logic for recommendations
  if (year === 'fresh' || experience === 'none') {
    recommendation = 'discover';
  } else if (idea === 'none' || idea === 'vague') {
    recommendation = 'foundation';
  } else if (idea === 'clear') {
    recommendation = 'development';
  } else if (idea === 'prototype') {
    recommendation = 'scaling';
  } else {
    recommendation = 'community';
  }

  closeAssessment();
  
  // Show recommendation message
  const sectionName = sectionsData[recommendation]?.name || 'Discover Your Path';
  alert(`Based on your answers, we recommend starting with: "${sectionName}". We'll take you there now!`);
  
  // Navigate to recommended section
  setTimeout(() => {
    showSection(recommendation);
  }, 100);
}

// Utility Functions
function resetFilters() {
  const searchInput = document.getElementById('searchInput');
  const typeFilter = document.getElementById('typeFilter');
  
  if (searchInput) searchInput.value = '';
  if (typeFilter) typeFilter.value = '';
  
  filteredResources = [...allResources];
  renderResources();
}

// Global function exports
window.showSection = showSection;
window.startAssessment = startAssessment;
window.closeAssessment = closeAssessment;
window.getRecommendation = getRecommendation;
window.toggleFAQ = toggleFAQ;
window.nextStory = nextStory;
window.previousStory = previousStory;
window.searchResources = searchResources;
window.filterResources = filterResources;
window.focusSearch = focusSearch;
window.learnMore = learnMore;
window.contactResource = contactResource;