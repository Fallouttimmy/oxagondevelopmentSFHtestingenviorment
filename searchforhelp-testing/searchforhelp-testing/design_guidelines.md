# Design Guidelines: Searchforhelp 1.0.0 CB

## Design Approach

**Selected Framework**: Material Design with gov.uk accessibility principles
**Rationale**: Crisis and emergency resource sites require maximum clarity, accessibility, and trust. Material Design provides clear hierarchy and interaction patterns while gov.uk principles ensure usability during distress.

**Core Principles**:
- Clarity over cleverness - information must be immediately scannable
- Trust through simplicity - professional, calm visual treatment
- Mobile-first - many users access helplines from phones in urgent situations
- Zero distractions - no animations, minimal decorative elements

## Typography

**Font Stack**: Inter (primary) via Google Fonts CDN
- Hero/Page Titles: 2.5rem (40px), font-semibold
- Section Headers: 1.75rem (28px), font-semibold  
- Category Titles: 1.25rem (20px), font-medium
- Helpline Names: 1.125rem (18px), font-medium
- Body Text/Descriptions: 1rem (16px), font-normal, line-height relaxed
- Phone Numbers: 1.25rem (20px), font-semibold, monospace
- Emergency Callouts: 1.5rem (24px), font-bold

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4, p-6, p-8
- Section spacing: mb-8, mb-12, mb-16
- Grid gaps: gap-4, gap-6, gap-8
- Container max-width: max-w-6xl for content readability

**Grid Structure**:
- Desktop: 3-column grid for category cards (grid-cols-3)
- Tablet: 2-column grid (md:grid-cols-2)
- Mobile: Single column (grid-cols-1)
- Helpline lists: Single column always for clarity

## Core Components

### Navigation
- Sticky header with site logo "Searchforhelp 1.0.0 CB"
- Primary navigation: Category dropdown menu
- Emergency banner: Fixed top bar with "112 - Emergency" and "113 - Suicide Prevention" always visible
- Search bar: Prominent placement in header, icon + text input

### Homepage Structure
1. **Hero Section** (h-64): Clear value proposition "Vind de juiste hulp wanneer je het nodig hebt", prominent search bar, emergency numbers displayed
2. **Quick Access Cards**: 6-8 category cards with icons (Mental Health, Abuse & Violence, Addiction, Youth Support, LGBTQ+, Domestic Issues, etc.)
3. **Featured Helplines**: 3-4 most accessed resources with direct contact info
4. **Information Section**: Brief explanation of how to use the site, what to expect when calling

### Category Pages
- Breadcrumb navigation
- Category description (2-3 sentences)
- Helpline cards in vertical list format containing:
  - Organization name (bold)
  - Brief description (2 lines max)
  - Phone number (large, clickable tel: link)
  - Website link (if available)
  - Operating hours clearly displayed
  - Language support indicators (if applicable)

### Helpline Card Design
- Card with border, subtle shadow
- Top: Organization logo placeholder (32x32px)
- Organization name + trust indicator (if government/certified)
- Description text
- Contact buttons: Primary (Phone) + Secondary (Website)
- Hours indicator with clear open/closed status

### Search Functionality
- Real-time filtering of helplines
- Search by keyword, category, or issue
- "No results" state with alternative suggestions
- Clear filters/reset option

### Footer
- Quick links to all categories
- About the service
- Privacy statement
- Contact for feedback/updates
- Language selector (NL primary)
- Last updated date for credibility

## Accessibility Requirements

**Critical for Emergency Context**:
- WCAG 2.1 AA minimum compliance
- Keyboard navigation fully functional
- Screen reader optimized (semantic HTML, ARIA labels)
- High contrast ratios (4.5:1 minimum for text)
- Focus indicators clearly visible (3px outline)
- Phone links always use tel: protocol
- Large touch targets (minimum 44x44px)
- No time-based interactions

## Component Library

**Buttons**:
- Primary: Solid fill, medium size, rounded corners
- Secondary: Outline style
- Emergency: Prominent, high-contrast treatment
- All clickable phone numbers styled as buttons

**Cards**:
- Helpline cards: Border, shadow-sm, rounded-lg, p-6
- Category cards: Larger, shadow-md, hover:shadow-lg transition
- Icon + title + description format

**Icons**: Heroicons (outline style) via CDN
- Categories use relevant icons (heart for mental health, shield for safety, etc.)
- Phone icon for all contact numbers
- External link icon for websites

**Forms**:
- Search: Large input field, clear placeholder, search icon
- High contrast borders
- Error states clearly communicated

## Images

**Approach**: Minimal image use - trust through content clarity, not visual decoration

**Required Images**:
- Logo/Icon: Simple, recognizable mark for "Searchforhelp" (64x64px, can be typographic)
- Category Icons: Use Heroicons instead of custom images
- Organization Logos: 32x32px placeholders for verified helplines

**No Hero Image**: Instead use solid background with clear typography and emergency number display. This is a utility site - immediate information access is priority.

## Mobile Optimization

- Bottom sticky bar with emergency numbers always visible
- One-tap calling for all phone numbers
- Simplified navigation menu (hamburger)
- Larger touch targets than desktop
- Search expanded by default on mobile
- Category cards stack vertically with full width

## Trust & Credibility Elements

- Government certification badges where applicable
- "Last verified" dates on helpline information
- Clear privacy messaging
- Professional, calm visual treatment
- Consistent information architecture
- No commercial advertising or distractions