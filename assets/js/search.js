document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  // Define search data for the AsobaCloud business site
  const searchData = [
    {
      title: "Home",
      url: "/index.html",
      content: "AsobaCloud provides AI-powered solutions for solar asset management, including Ona Terminal for energy asset management, PolicyAnalyst for regulatory compliance, and Distributed Compute for edge computing services.",
      sections: [
        { title: "Products", id: "products" },
        { title: "Use Cases", id: "use-cases" },
        { title: "Business Users", id: "business-users" },
        { title: "Support", id: "support" }
      ]
    },
    {
      title: "Ona Terminal",
      url: "/products/terminal.html",
      content: "AI-powered command-line interface for energy asset management with OODA workflow capabilities. Features include real-time monitoring, predictive maintenance, work order management, and AI assistant chat.",
      sections: [
        { title: "Overview", id: "overview" },
        { title: "Key Features", id: "key-features" },
        { title: "OODA Workflow Integration", id: "ooda-workflow-integration" },
        { title: "Energy Asset Management", id: "energy-asset-management" },
        { title: "Developer-Friendly", id: "developer-friendly" },
        { title: "Advanced Analytics", id: "advanced-analytics" },
        { title: "User-Friendly Dashboard Interface", id: "user-friendly-dashboard-interface" },
        { title: "Getting Started", id: "getting-started" }
      ]
    },
    {
      title: "PolicyAnalyst",
      url: "/products/analyst.html",
      content: "AI-powered regulatory compliance analysis for energy policies. Uses fine-tuned Mistral-7B-v0.3 model to analyze complex regulatory documents and provide compliance guidance.",
      sections: [
        { title: "Overview", id: "overview" },
        { title: "Key Features", id: "key-features" },
        { title: "Getting Started", id: "getting-started" },
        { title: "Q&A Example", id: "qa-example" }
      ]
    },
    {
      title: "Distributed Compute",
      url: "/products/distributed-compute.html",
      content: "Edge computing services for solar asset owners. Provides on-site cloud infrastructure for real-time data processing and local AI inference.",
      sections: [
        { title: "Overview", id: "overview" },
        { title: "How It Works", id: "how-it-works" },
        { title: "Benefits for Solar Asset Owners", id: "benefits" },
        { title: "Technical Requirements", id: "technical-requirements" },
        { title: "Revenue Model", id: "revenue-model" },
        { title: "Getting Started", id: "getting-started" }
      ]
    },
    {
      title: "Business Users",
      url: "/business-users.html",
      content: "Solutions designed for solar asset owners, O&M teams, and energy managers who need to optimize performance and maximize returns.",
      sections: [
        { title: "Asset Performance Monitoring", id: "asset-performance-monitoring" },
        { title: "Predictive Maintenance", id: "predictive-maintenance" },
        { title: "Financial Impact Analysis", id: "financial-impact-analysis" },
        { title: "Getting Started for Business Users", id: "getting-started-for-business-users" },
        { title: "Success Stories", id: "success-stories" }
      ]
    },
    {
      title: "Operations & Maintenance",
      url: "/use-cases/oam.html",
      content: "Comprehensive O&M solutions using the OODA (Observe-Orient-Decide-Act) loop methodology for solar asset management that maximizes uptime, minimizes costs, and protects revenue.",
      sections: [
        { title: "Overview", id: "overview" },
        { title: "Key Benefits", id: "key-benefits" },
        { title: "Implementation", id: "implementation" },
        { title: "Success Stories", id: "success-stories" }
      ]
    },
    {
      title: "Insurance & Risk Management",
      url: "/use-cases/insurance.html",
      content: "AI-powered insurance and risk management solutions for energy assets. Features automated claims processing, parametric triggers, and compliance monitoring.",
      sections: [
        { title: "Overview", id: "overview" },
        { title: "System Architecture", id: "system-architecture" },
        { title: "Document Processing", id: "document-processing" },
        { title: "Agent Workflow Orchestration", id: "agent-workflow-orchestration" },
        { title: "Forecasting Agents", id: "forecasting-agents" },
        { title: "Compliance Agents", id: "compliance-agents" },
        { title: "Parametric Trigger Agents", id: "parametric-trigger-agents" },
        { title: "Continuous OODA Loop", id: "continuous-ooda-loop" },
        { title: "Automated Claims Processing", id: "automated-claims-processing" },
        { title: "Ona Power Tools Integration", id: "ona-power-tools-integration" }
      ]
    },
    {
      title: "FAQ",
      url: "/faq.html",
      content: "Frequently asked questions about AsobaCloud products and services, including technical requirements, pricing, and support information.",
      sections: [
        { title: "General Questions", id: "general-questions" },
        { title: "Technical Requirements", id: "technical-requirements" },
        { title: "Pricing & Plans", id: "pricing-plans" },
        { title: "Support & Documentation", id: "support-documentation" }
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