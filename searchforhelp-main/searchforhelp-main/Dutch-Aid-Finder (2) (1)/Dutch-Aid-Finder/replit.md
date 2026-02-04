# Searchforhelp - Dutch Helpline Directory

## Overview
A static HTML/CSS/JavaScript website that helps Dutch people find help services and helplines for issues like mental health, abuse, addiction, and more. This app is designed to run on Cloudflare Pages without any build process.

## Project Structure
```
/
├── index.html          # Homepage with search and featured helplines
├── categories.html     # All categories listing page
├── category.html       # Individual category detail page
├── about.html          # About page with information
├── styles.css          # All styling
├── app.js              # Main JavaScript functionality
├── data.js             # Helpline and category data
├── favicon.svg         # Site icon
└── server.py           # Local development server (not needed for Cloudflare)
```

## Deployment to Cloudflare Pages

### Option 1: Direct Upload
1. Create a ZIP file containing ONLY these files:
   - index.html
   - categories.html
   - category.html
   - about.html
   - styles.css
   - app.js
   - data.js
   - favicon.svg

2. Go to Cloudflare Pages and upload the ZIP
3. No build settings needed - it's pure static HTML/CSS/JS

### Option 2: Git Integration
1. Push these files to a GitHub/GitLab repository
2. Connect Cloudflare Pages to the repository
3. Set build output to the root directory (or leave empty)
4. No build command needed

## Features
- Search functionality for finding helplines
- Category filtering (Mental Health, Abuse, Addiction, Youth, LGBTQ+, Domestic, Financial, Legal)
- Emergency quick-dial buttons (112, 113)
- Mobile-responsive design
- Click-to-call phone links
- Dutch language interface

## Technical Notes
- No TypeScript, no build process required
- Pure vanilla JavaScript (ES6+)
- All data is stored in data.js as JavaScript objects
- Mobile navigation with hamburger menu
- Debounced search for better performance

## Local Development
Run the Python server: `python server.py`
Access at: http://localhost:5000
