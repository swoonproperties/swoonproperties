// ---------------------------------------------------------------------------
// New Project listings — single source of truth.
//
// Edit this list to add, remove, or update a project. Both the homepage
// preview and the New Project listings page read from this same list, so
// you only ever need to make a change here.
//
// Fields:
//   tag       "New Project" or "Early Bird" — shown as a small badge on the card
//   type      "landed" or "condo" — used by the filter buttons on the New
//             Project page (must be exactly one of these two words)
//   price     e.g. "From RM 420,000"
//   location  e.g. "Rawang, Selangor — Double-storey terrace, Phase 2"
//   beds      number of bedrooms
//   baths     number of bathrooms
//   sqft      floor area, as text (e.g. "980")
//   featured  true to also show this listing in the homepage preview
//             (the homepage only shows featured listings, up to 3)
// ---------------------------------------------------------------------------

const PROJECT_LISTINGS = [
  {
    tag: "New Project",
    type: "landed",
    price: "From RM 420,000",
    location: "Rawang, Selangor — Double-storey terrace, Phase 2",
    beds: 3,
    baths: 2,
    sqft: "980",
    featured: true
  },
  {
    tag: "New Project",
    type: "condo",
    price: "From RM 380,000",
    location: "Sungai Buloh, Selangor — Serviced apartment",
    beds: 2,
    baths: 2,
    sqft: "750",
    featured: true
  },
  {
    tag: "New Project",
    type: "landed",
    price: "From RM 650,000",
    location: "Kundang, Selangor — Semi-detached, freehold",
    beds: 4,
    baths: 3,
    sqft: "1,800",
    featured: true
  },
  {
    tag: "Early Bird",
    type: "condo",
    price: "From RM 350,000",
    location: "Batu Caves, Selangor — Condominium",
    beds: 3,
    baths: 2,
    sqft: "900",
    featured: false
  }
];
