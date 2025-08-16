# **PRD – Show Detail Page**

## **Purpose**

The Show Detail Page provides a comprehensive view of a movie or TV show, including synopsis, key metadata, availability, related content, and user engagement actions. It supports both TV shows (with seasons) and movies (no seasons).

---

## **Key Page Sections & Components**

### 1. **Header Area**

* **Background Hero Image**

  * Large banner (16:9 ratio recommended) from the show/movie backdrop.
  * Dark gradient overlay to ensure text legibility.
* **Title & Synopsis**

  * Show/Movie title (H1).
  * Short description (max 3 lines, truncate with ellipsis if overflow).
* **Primary Action Buttons**

  * `+ Add to List` (toggles between “Add” and “Added” states).
  * `Watch Trailer` (opens in modal or navigates to video player).
* **Ratings**

  * **User Score**: Numeric (1–10), colored badge using accent color.
  * **Critics Score**: Percentage (0–100%), colored badge using accent color.

---

### 2. **Info & Production Details**

Two-column layout:

**Show Details**

* First Air Date / Release Date
* Genres (comma-separated list, clickable to search/filter by genre)
* Created By (clickable names for person detail pages)
* Network (clickable to network profile page)

**Production**

* Status (e.g., Returning Series, Ended, Released)
* Budget (if available, formatted in millions)
* Revenue (if available, human-readable)
* Production Companies (comma-separated, clickable links)

---

### 3. **Seasons (TV Shows Only)**

* Section only appears if `type = TV Show`.
* **Season Poster Tiles**

  * Larger tile size than standard posters.
  * Season title + episode count or release year.
  * Status indicator for upcoming seasons (e.g., “Coming 2025”).

---

### 4. **Cast**

* Horizontal scrollable row.
* **Circle Avatars**:

  * Actor image (cropped, center-aligned).
  * Actor name (clickable to person detail page).
  * Character name (below actor name, smaller font).
* Limit: Show top-billed cast (configurable, e.g., top 10).

---

### 5. **Where to Watch**

* Small clickable pill-style buttons for streaming platforms.
* Opens an external link to the platform’s watch page.
* Multiple services possible.

---

### 6. **Recommended Shows**

* Horizontal row of standard poster tiles (same size as “Similar Shows”).
* Tiles display:

  * Poster image.
  * Score badge (top-left).
  * Clicking navigates to that show’s detail page.

---

### 7. **Similar Shows**

* Same layout & behavior as Recommended Shows.
* Ordered by similarity score from API.

---

## **Poster Tile Types**

* **Standard Poster Tile** (Recommended/Similar Shows):

  * Aspect ratio: 2:3.
  * Image, title (optional in hover/tooltip), rating badge.
* **Large Season Poster Tile**:

  * Same ratio but larger size.
  * Season number and metadata displayed underneath.

---

## **Accent Color**

* The system’s global accent color (e.g., `#FF6600`) applies to:

  * Rating badges.
  * Selected state for pills/buttons.
  * Key interactive states (hover, active).

---

## **Data & API Requirements**

* **Backend Endpoints**:

  * `/shows/{id}`: Core metadata, ratings, streaming providers.
  * `/shows/{id}/seasons`: List of seasons with poster, title, episode count.
  * `/shows/{id}/cast`: Ordered list of cast with images.
  * `/shows/{id}/recommendations`: Recommended shows.
  * `/shows/{id}/similar`: Similar shows.

* **Conditional Rendering**:

  * `type = movie`: Hide Seasons section.
  * `type = tv`: Show Seasons section.

---

## **Responsive Behavior**

* Mobile:

  * Collapse two-column info into stacked sections.
  * Horizontal scroll for Recommended & Similar shows.
* Tablet/Desktop:

  * Two-column info layout.
  * Multi-tile visible in Recommended/Similar sections.

---

## **Non-Functional Requirements**

* Page load target: < 2.5s on standard broadband.
* Image lazy-loading for non-visible tiles.
* Accessible:

  * ARIA labels for buttons and scores.
  * High-contrast mode support.
