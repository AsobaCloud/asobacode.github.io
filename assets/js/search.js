document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  // Define static search data for basic functionality with h2 and h3 headers
  const searchData = [
    {
      title: "Introduction",
      url: "/index.html",
      content: "Welcome to the Ona API Platform! Here's how you can get started with onboarding and integrating our powerful API into your systems. You have the option of accessing Ona's capabilities via our On-Demand web app, or by embedding the API directly within your own technology stack.",
      sections: [
        { title: "Getting Started", id: "getting-started" },
        { title: "Onboarding: On-Demand Web App", id: "onboarding-web-app" },
        { title: "Onboarding: API Integration", id: "onboarding-api-integration" },
        { title: "Data Preparation", id: "data-preparation" },
        { title: "API Configuration and Integration", id: "api-configuration" },
        { title: "Testing and Validation", id: "testing-validation" }
      ]
    },
    {
      title: "API Endpoints",
      url: "/endpoints.html",
      content: "This guide details the APIs available in the Ona ecosystem, including their base URLs, endpoints, request parameters, and response structures. The API system dynamically routes requests to the appropriate regional endpoint based on a region query parameter, processed via CloudFront and Lambda@Edge.",
      sections: [
        { title: "ingestHistoricalLoadData API", id: "ingestHistoricalLoadData" },
        { title: "ingestNowcastLoadData API", id: "ingestNowcastLoadData" },
        { title: "trainForecaster API", id: "trainForecaster" },
        { title: "returnForecastingResults API", id: "returnForecastingResults" },
        { title: "interpolateData API", id: "interpolateData" }
      ]
    },
    {
      title: "Ona SDK",
      url: "/sdk.html",
      content: "This reference documents every object and method available in Ona's SDK for seamless integration with the Ona API Platform. Use our SDK to upload large historical datasets, retrieve pre-signed URLs for secure file uploads, and interact programmatically with Ona's APIs for energy forecasting, dispatching, and analysis.",
      sections: [
        { title: "Getting Started with the Ona SDK", id: "getting-started" },
        { title: "Installation", id: "installation" },
        { title: "Usage Examples", id: "usage-examples" },
        { title: "API Reference", id: "api-reference" },
        { title: "Troubleshooting", id: "troubleshooting" }
      ]
    },
    {
      title: "Ona On-Demand",
      url: "/analyst.html",
      content: "Welcome to Ona On-Demand—your comprehensive web app for navigating complex energy policies and managing grid operations with ease. This guide will help you get started quickly, understand best practices for interacting with the app, and explore key features.",
      sections: [
        { title: "Getting Started with Ona On-Demand", id: "getting-started-with-ona-on-demand" },
        { title: "Ona Policy Analyst", id: "ona-policy-analyst" },
        { title: "Grid Operations", id: "grid-operations" },
        { title: "On-Demand Model Training", id: "on-demand-model-training" }
      ]
    }
  ];

  // Handle search input
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    
    // Clear results if query is empty
    if (!query) {
      searchResults.innerHTML = '';
      searchResults.style.display = 'none';
      return;
    }

    // Perform search
    const results = performSearch(query, searchData);
    
    // Display results
    if (results.length > 0) {
      let resultsHtml = '<ul>';
      results.forEach(result => {
        resultsHtml += `<li><a href="${result.url}">${result.title}</a>: ${result.preview}</li>`;
      });
      resultsHtml += '</ul>';
      searchResults.innerHTML = resultsHtml;
      searchResults.style.display = 'block';
    } else {
      searchResults.innerHTML = '<p>No results found</p>';
      searchResults.style.display = 'block';
    }
  });

  // Enhanced search function that includes sections
  function performSearch(query, data) {
    const results = [];
    
    // Search through each page and its sections
    data.forEach(page => {
      const title = page.title.toLowerCase();
      const content = page.content.toLowerCase();
      const pageMatch = title.includes(query) || content.includes(query);
      let sectionMatch = false;
      let matchedSection = null;
      
      // Check if any section titles match the query
      if (page.sections) {
        for (const section of page.sections) {
          if (section.title.toLowerCase().includes(query)) {
            sectionMatch = true;
            matchedSection = section;
            break;
          }
        }
      }
      
      if (pageMatch || sectionMatch) {
        let preview = '...';
        let url = page.url;
        
        if (sectionMatch && matchedSection) {
          // If a section matched, use its title and link to the section
          preview = `Found in section: ${matchedSection.title}`;
          url = `${page.url}#${matchedSection.id}`;
        } else if (pageMatch) {
          // If main content matched, find the relevant snippet
          let previewIndex = content.indexOf(query);
          
          if (previewIndex !== -1) {
            // Get a snippet around the query
            const start = Math.max(0, previewIndex - 40);
            const end = Math.min(content.length, previewIndex + query.length + 40);
            preview += content.substring(start, end) + '...';
          } else {
            // If query is not found in content but title matched, use the beginning
            preview += content.substring(0, 80) + '...';
          }
        }
        
        results.push({
          title: page.title + (sectionMatch ? ` > ${matchedSection.title}` : ''),
          url: url,
          preview: preview
        });
      }
    });
    
    return results;
  }

  // Close search results when clicking elsewhere
  document.addEventListener('click', function(event) {
    if (!searchResults.contains(event.target) && event.target !== searchInput) {
      searchResults.style.display = 'none';
    }
  });
}); 