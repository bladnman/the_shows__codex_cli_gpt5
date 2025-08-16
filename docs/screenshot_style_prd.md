# Screenshot Style PRD

**Project:** Video App Redesign – Discover & Detail Pages
**Reference Screenshots:** `design_discover.png` (Home/Discover) and `design_details.png` (Detail Page)

---

## 1. Common Updates (Global)

### 1.1 Visual Theme

* Application moves to a **light theme** overall.
* Hero/header sections remain **dark background with show imagery**.
* Full-bleed hero sections (no left/right margins).
* Main content retains margins.

### 1.2 Accent Color

* A single accent color is used throughout: the **orange (#FF2600 from screenshots)**.
* Accent applies to:

  * Ratings (circular badges on tiles).
  * Call-to-action buttons (Add to List, Watch Trailer, etc).
  * Section headers (icons or markers).

### 1.3 Tiles

* **Two primary tile types**:

  * **Poster tiles** (portrait format, used for cast, recommended/similar shows).
  * **Screenshot tiles** (landscape 4:3 or 16:9, used for excitement lists on Discover).
* Poster tiles must indicate **Movie vs TV Show** with a small visual marker.
* **Rating badge**: Circular, orange, top-right corner.

### 1.4 Header Bar

* Top-left: *The Shows* (home link).
* Center: Search bar.
* Right: Profile/avatar.

---

## 2. Discover (Home) Page

### 2.1 Hero Section Carousel

* **New feature**: A carousel of trending or popular shows.
* Toggle (top-right) switches between **Trending** and **Popular**.
* Full-bleed with show image background.
* Overlay includes: title, short description, and action buttons:

  * Add to List (dropdown for excitement level).
  * More Info (navigates to details page).
* Navigation controls:

  * Left/right arrows.
  * Pagination dots.

### 2.2 Excitement Sections

* Content organized by **excitement level**:

  * *Highly Excited* (largest screenshot tiles).
  * *Excited* (medium screenshot tiles).
  * *On List* (standard poster tiles).
  * *History* (poster tiles, past watched/rated).
* Excitement states replace “Add to Watchlist.”

  * New Add-to-List dropdown: **Highly Excited, Excited, Normal**.
* Tile sizing conveys excitement priority: large → medium → small.

---

## 3. Detail Page

### 3.1 Hero Section

* Full-bleed show artwork background.
* Overlay includes:

  * Title & description.
  * User score (circle), critic score (percent).
  * Action buttons: Add to List (dropdown), Watch Trailer.

### 3.2 Show Details Section

* **Two-column layout** with Show Info (left) and Production Info (right).
* Info includes: First air date, Genres, Created by, Network.
* Production info: Status, Budget, Revenue, Production Companies.

### 3.3 Seasons Section

* Horizontal scrollable row.
* Each season tile includes:

  * Season number.
  * Thumbnail.
  * Episodes count.

### 3.4 Cast Section

* Circular avatar tiles for cast members.
* Includes name + role.

### 3.5 Where to Watch Section

* Button list of streaming platforms (e.g., HBO Max, Sky Atlantic, Now TV).
* Grouping: “Stream,” “Rent,” “Buy.”

### 3.6 Recommendations & Similar Shows

* **Recommended Shows** section.
* **Similar Shows** section.
* Both use **poster tiles with rating badges** (consistent with Discover).

---

## 4. Out of Scope

* No backend or API changes requested.
* All changes are visual/component-level.
* Existing grids, data sources, and list-management logic remain unchanged.
