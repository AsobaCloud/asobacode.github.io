document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  // Search data based on actual documentation pages
  const searchData = [
    {
      title: "Home",
      url: "/",
      content: "Ona Energy Management Platform - AI-powered infrastructure automation for your terminal. Transform reactive operations into proactive intelligence with industry-specific AI models."
    },
    {
      title: "Introduction",
      url: "/introduction.html",
      content: "Ona Platform: AI-Driven Solar Asset Management. Comprehensive end-to-end solution for energy analytics and forecasting that transforms raw data into actionable insights, enabling predictive maintenance, optimized energy dispatch, and enhanced operational efficiency."
    },
    {
      title: "Getting Started",
      url: "/getting-started.html",
      content: "Quick start guide for developers to get up and running with Ona Terminal CLI. Install, configure, and start using the Ona Terminal CLI for energy asset management and forecasting. Includes prerequisites, installation steps, and first steps."
    },
    {
      title: "User Guide",
      url: "/user-guide.html",
      content: "Customer Onboarding Guide: Ona Platform. Step-by-step guide to get your Ona Platform up and running with minimum viable usage. Configure all necessary components and start generating insights from your solar assets."
    },
    {
      title: "Use Cases",
      url: "/archive/om-use-case.html",
      content: "Example O&M Use Case - Real-world solar operations & maintenance transformation with Ona Terminal. The business problem, Ona Terminal solution, MCP framework advantage, business impact analysis, technical implementation, and implementation roadmap."
    },
    {
      title: "Deployment",
      url: "/deployment.html",
      content: "Ona Terminal CLI Deployment - Complete deployment guide for the Ona Terminal CLI tool and related services. Includes Docker deployment, systemd service deployment, monitoring and logging, security considerations, and troubleshooting."
    },
    {
      title: "PoC Deployment",
      url: "/poc-deployment.html",
      content: "PoC Deployment Guide - Comprehensive guide for deploying Proof-of-Concept implementations of the Ona platform. Step-by-step instructions for MVP/PoC setup, testing, validation, and demo preparation."
    },
    {
      title: "API Reference",
      url: "/api-reference.html",
      content: "Complete documentation for all Ona API endpoints and services. Data ingestion APIs, data processing APIs, machine learning APIs, energy management APIs, weather integration APIs, and management APIs. Includes authentication, request/response formats, and SDK integration."
    },
    {
      title: "Shared Components",
      url: "/shared-components.html",
      content: "Documentation for shared components and utilities used across the Ona API platform. Authentication and authorization, data processing, error handling, logging and monitoring, database operations, configuration management, and utility functions."
    },
    {
      title: "CLI Tools",
      url: "/cli-tools.html",
      content: "Complete documentation for the Ona Terminal CLI commands and utilities. Command-line interface for energy asset management, forecasting, and automation. Includes data management, model management, forecasting, system commands, and configuration."
    },
    {
      title: "Integration",
      url: "/integration.html",
      content: "Comprehensive guide for integrating with the Ona API ecosystem. Python SDK, JavaScript SDK, webhooks, authentication, integration patterns, batch processing, real-time data streaming, error handling, and testing."
    },
    {
      title: "Development",
      url: "/development.html",
      content: "Development Guide - Guide for contributing to the Ona platform development. Development setup, codebase structure, development workflow, API development, CLI development, database development, Docker development, testing strategy, and documentation."
    },
    {
      title: "Resources",
      url: "/resources.html",
      content: "Additional resources, examples, and community support for the Ona platform. Documentation links, code examples, tutorials, community support channels, tools and utilities, API status monitoring, security resources, training and certification."
    },
    {
      title: "Changelog",
      url: "/changelog.html",
      content: "All notable changes to the Ona Platform. Version history, new features, improvements, bug fixes, and performance enhancements. Follows Keep a Changelog format and Semantic Versioning."
    },
    {
      title: "FAQ",
      url: "/faq.html",
      content: "Frequently Asked Questions about Ona's energy management platform. Technical questions, business questions, distributed compute questions, and support information. Includes system requirements, scalability, integration, pricing, ROI, and deployment options."
    },
    {
      title: "Legal",
      url: "/legal.html",
      content: "Legal Documentation - Terms of Service, End User License Agreement (EULA), and Privacy Policy. Access to Asoba's legal documentation including service description, user accounts, API usage, intellectual property rights, and privacy information."
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
        resultsHtml += `<li><a href="${result.url}"><strong>${result.title}</strong><br><span style="font-size: 0.9em; color: #666;">${result.preview}</span></a></li>`;
      });
      resultsHtml += '</ul>';
      searchResults.innerHTML = resultsHtml;
      searchResults.style.display = 'block';
    } else {
      searchResults.innerHTML = '<p>No results found</p>';
      searchResults.style.display = 'block';
    }
  });

  // Enhanced search function
  function performSearch(query, data) {
    const results = [];
    const queryWords = query.split(/\s+/).filter(word => word.length > 0);
    
    // Score each page
    data.forEach(page => {
      const title = page.title.toLowerCase();
      const content = page.content.toLowerCase();
      
      let score = 0;
      let matches = [];
      
      // Check title matches (higher weight)
      queryWords.forEach(word => {
        if (title.includes(word)) {
          score += 10;
          matches.push('title');
        }
      });
      
      // Check content matches
      queryWords.forEach(word => {
        if (content.includes(word)) {
          score += 2;
          if (!matches.includes('content')) {
            matches.push('content');
          }
        }
      });
      
      // If we have matches, add to results
      if (score > 0) {
        // Generate preview
        let preview = '';
        const contentLower = content.toLowerCase();
        
        // Try to find a relevant snippet
        for (const word of queryWords) {
          const index = contentLower.indexOf(word);
          if (index !== -1) {
            const start = Math.max(0, index - 60);
            const end = Math.min(content.length, index + word.length + 60);
            preview = content.substring(start, end).trim();
            if (start > 0) preview = '...' + preview;
            if (end < content.length) preview = preview + '...';
            break;
          }
        }
        
        // If no snippet found, use beginning of content
        if (!preview) {
          preview = content.substring(0, 120) + '...';
        }
        
        results.push({
          title: page.title,
          url: page.url,
          preview: preview,
          score: score
        });
      }
    });
    
    // Sort by score (highest first)
    results.sort((a, b) => b.score - a.score);
    
    // Limit to top 10 results
    return results.slice(0, 10);
  }

  // Close search results when clicking elsewhere
  document.addEventListener('click', function(event) {
    if (!searchResults.contains(event.target) && event.target !== searchInput && !searchInput.contains(event.target)) {
      searchResults.style.display = 'none';
    }
  });

  // Handle keyboard navigation
  searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      searchResults.style.display = 'none';
      searchInput.blur();
    }
  });
});
