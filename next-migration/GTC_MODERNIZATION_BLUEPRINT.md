# GTC Group — საიტის სრული მოდერნიზაციის Blueprint

> **პროექტი:** gtcgroup.ge რედიზაინი & Next.js მიგრაცია
> **თარიღი:** 2026-02-21
> **სტატუსი:** Active Blueprint

---

## 📋 სარჩევი

1. [ინფორმაციული არქიტექტურა (Sitemap)](#1-ინფორმაციული-არქიტექტურა)
2. [Wireframe აღწერა — თითოეული გვერდი](#2-wireframe-აღწერა)
3. [დიზაინ-სისტემა](#3-დიზაინ-სისტემა)
4. [კონტენტი — რედაქტირებული ტექსტები (GE/EN/RU)](#4-კონტენტი)
5. [კონტენტის მიგრაციის Checklist](#5-მიგრაციის-checklist)
6. [Launch-ის ტექნიკური Checklist](#6-launch-checklist)

---

## 1. ინფორმაციული არქიტექტურა

### 1.1 Sitemap — ვიზუალური

```
gtcgroup.ge
├── / ─────────────────────── მთავარი (Hero + სლაიდერი)
├── /about-us ─────────────── ჩვენ შესახებ
│   ├── ისტორია
│   ├── მისია & ხედვა
│   ├── გუნდი
│   └── პარტნიორები
├── /doka ─────────────────── DOKA (ექსკლუზიური პარტნიორობა)
├── /services ─────────────── სერვისები (ლისტინგი)
│   ├── /services/engineering ───── ინჟინერია
│   ├── /services/consulting ────── კონსულტაცია და სწავლება
│   ├── /services/rental ────────── საყალიბე სისტემების იჯარა
│   └── /services/optimization ──── პროცესების ოპტიმიზაცია
├── /products ─────────────── პროდუქცია (კატეგორიები)
│   ├── /products/[categorySlug] ── კატეგორიის გვერდი
│   └── /products/[categorySlug]/[productSlug] ── პროდუქტის ბარათი
├── /projects ─────────────── პროექტები (პორტფოლიო)
│   └── /projects/[slug] ────────── პროექტის Case Study
├── /news ─────────────────── სიახლეები
│   └── /news/[slug] ────────────── სიახლის დეტალები
├── /contact ──────────────── კონტაქტი
└── /admin ────────────────── CMS Admin Panel
    ├── /admin/products
    ├── /admin/projects
    ├── /admin/services
    ├── /admin/news
    └── /admin/contacts
```

### 1.2 URL სტრუქტურა — მრავალენოვანი

| გვერდი | GE Route | EN Route | RU Route |
|--------|----------|----------|----------|
| მთავარი | `/ka` | `/en` | `/ru` |
| ჩვენ შესახებ | `/ka/about-us` | `/en/about-us` | `/ru/about-us` |
| DOKA | `/ka/doka` | `/en/doka` | `/ru/doka` |
| სერვისები | `/ka/services` | `/en/services` | `/ru/services` |
| სერვისი (დეტალი) | `/ka/services/[slug]` | `/en/services/[slug]` | `/ru/services/[slug]` |
| პროდუქცია | `/ka/products` | `/en/products` | `/ru/products` |
| კატეგორია | `/ka/products/[cat]` | `/en/products/[cat]` | `/ru/products/[cat]` |
| პროდუქტი | `/ka/products/[cat]/[id]` | `/en/products/[cat]/[id]` | `/ru/products/[cat]/[id]` |
| პროექტები | `/ka/projects` | `/en/projects` | `/ru/projects` |
| პროექტი | `/ka/projects/[slug]` | `/en/projects/[slug]` | `/ru/projects/[slug]` |
| სიახლეები | `/ka/news` | `/en/news` | `/ru/news` |
| სიახლე | `/ka/news/[slug]` | `/en/news/[slug]` | `/ru/news/[slug]` |
| კონტაქტი | `/ka/contact` | `/en/contact` | `/ru/contact` |

### 1.3 ნავიგაციის სტრუქტურა

**Primary Navigation (Header):**
```
[ GTC Logo ]   მთავარი | ჩვენ შესახებ | DOKA | სერვისები ▾ | პროდუქცია ▾ | პროექტები | სიახლეები | კონტაქტი   [GE|EN|RU] [🔍]
```

**სერვისები Dropdown:**
- ინჟინერია
- კონსულტაცია და სწავლება
- საყალიბე სისტემების იჯარა
- პროცესების ოპტიმიზაცია

**პროდუქცია Mega Dropdown:**
- კედლის სისტემა
- გადახურვის სისტემა
- უსაფრთხოების სისტემა
- სივრცული ხარაჩო
- სისტემის ელემენტები
- სამშენებლო ფანერა
- სამშენებლო კოჭი
- სამშენებლო დგარი
- დანადგარები
- აქსესუარები

**Footer:**
```
┌──────────────────────────────────────────────────────────┐
│ [GTC Logo]     კომპანია          სერვისები          კონტაქტი       │
│                ჩვენ შესახებ      ინჟინერია         ტელ: +995...    │
│ 2010 წლიდან    DOKA             კონსულტაცია       Email: info@    │
│ მშენებლობის    პროდუქცია        იჯარა             მისამართი       │
│ პარტნიორი      პროექტები        ოპტიმიზაცია                       │
│                სიახლეები                                           │
│ ──────────────────────────────────────────────────────── │
│ © 2026 GTC Group. ყველა უფლება დაცულია  [FB] [YT] [LI]           │
└──────────────────────────────────────────────────────────┘
```

---

## 2. Wireframe აღწერა

### 2.1 მთავარი გვერდი (`/`)

```
┌─────────────────────────────────────────────────┐
│ [HEADER - Sticky, transparent → solid on scroll]│
├─────────────────────────────────────────────────┤
│                                                 │
│  ██████████████████████████████████████████████  │
│  █                                            █  │
│  █   HERO SECTION                             █  │
│  █   Full-width video/image slider            █  │
│  █   H1: "ხარისხიანი მშენებლობისთვის"        █  │
│  █   Subtitle: დოკას ექსკლუზიური             █  │
│  █   პარტნიორი საქართველოში                   █  │
│  █   [CTA: პროდუქცია]  [CTA: კონტაქტი]       █  │
│  █                                            █  │
│  █   01 ──── 02 ──── 03 ──── 04              █  │
│  █   (slide indicators)                       █  │
│  ██████████████████████████████████████████████  │
│                                                 │
├─────────────────────────────────────────────────┤
│  TRUST BADGES (Logo Strip)                      │
│  [ DOKA ] [ Sveza ] [ Plyterra ] [ Alfix ]     │
│  [ Gherardi ] [ Extraform ]                     │
├─────────────────────────────────────────────────┤
│  STATS COUNTER (Animated on scroll)             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌──────┐ │
│  │  15+    │ │  50+    │ │  200+   │ │ 100+ │ │
│  │  წელი   │ │  თანამშ.│ │  პროექტი│ │კლიენტ│ │
│  └─────────┘ └─────────┘ └─────────┘ └──────┘ │
├─────────────────────────────────────────────────┤
│  SERVICES OVERVIEW (4 cards, grid)              │
│  ┌────────────┐ ┌────────────┐                  │
│  │ 🔧 icon    │ │ 📐 icon    │                  │
│  │ ინჟინერია  │ │ კონსულტაცია│                  │
│  │ 2-line desc│ │ 2-line desc│                  │
│  │ [→ სრულად] │ │ [→ სრულად] │                  │
│  └────────────┘ └────────────┘                  │
│  ┌────────────┐ ┌────────────┐                  │
│  │ 🏗️ icon    │ │ ⚡ icon    │                  │
│  │ იჯარა     │ │ ოპტიმიზაცია│                  │
│  └────────────┘ └────────────┘                  │
├─────────────────────────────────────────────────┤
│  FEATURED PRODUCTS (Horizontal scroll/slider)   │
│  Section Title: "პროდუქცია"                     │
│  [View All →]                                    │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ │
│  │ img  │ │ img  │ │ img  │ │ img  │ │ img  │ │
│  │ name │ │ name │ │ name │ │ name │ │ name │ │
│  │ cat  │ │ cat  │ │ cat  │ │ cat  │ │ cat  │ │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ │
├─────────────────────────────────────────────────┤
│  FEATURED PROJECTS (2-3 large cards)            │
│  Section Title: "პროექტები"                     │
│  ┌───────────────────┐ ┌──────────────────────┐ │
│  │ ████████████████  │ │ ████████████████████ │ │
│  │ █  large img    █ │ │ █  large img        █│ │
│  │ ████████████████  │ │ ████████████████████ │ │
│  │ პროექტის სახელი  │ │ პროექტის სახელი     │ │
│  │ 2020-2024 │ ტეგები│ │ 2021-2023 │ ტეგები  │ │
│  └───────────────────┘ └──────────────────────┘ │
├─────────────────────────────────────────────────┤
│  DOKA PARTNERSHIP BANNER (Full-width)           │
│  ┌─────────────────────────────────────────────┐│
│  │ Dark bg + DOKA logo                         ││
│  │ "დოკას ექსკლუზიური დისტრიბუტორი           ││
│  │  საქართველოში 2018 წლიდან"                  ││
│  │ [გაიგეთ მეტი →]                             ││
│  └─────────────────────────────────────────────┘│
├─────────────────────────────────────────────────┤
│  NEWS SECTION (3 latest cards)                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ img      │ │ img      │ │ img      │        │
│  │ title    │ │ title    │ │ title    │        │
│  │ date     │ │ date     │ │ date     │        │
│  └──────────┘ └──────────┘ └──────────┘        │
├─────────────────────────────────────────────────┤
│  CTA SECTION                                    │
│  "გჭირდებათ კონსულტაცია?"                       │
│  [დაგვიკავშირდით]                               │
├─────────────────────────────────────────────────┤
│ [FOOTER]                                        │
└─────────────────────────────────────────────────┘
```

### 2.2 ჩვენ შესახებ (`/about-us`)

```
┌─────────────────────────────────────────────────┐
│ [HEADER]                                        │
├─────────────────────────────────────────────────┤
│  BREADCRUMB: მთავარი > ჩვენ შესახებ             │
├─────────────────────────────────────────────────┤
│  PAGE HERO                                      │
│  ┌─────────────────────────────────────────────┐│
│  │ Parallax bg image (warehouse/construction)  ││
│  │ H1: "ჩვენ შესახებ"                         ││
│  │ Subtitle: 2010 წლიდან მშენებლობის პარტნიორი││
│  └─────────────────────────────────────────────┘│
├─────────────────────────────────────────────────┤
│  HISTORY / TIMELINE                             │
│  ┌─────────────────────────────────────────────┐│
│  │ Text block (left) + Image (right)           ││
│  │                                             ││
│  │ "ჯითისი ჯგუფი 2010 წლიდან..."              ││
│  │                                             ││
│  │ Timeline:                                   ││
│  │ 2010 ──── 2015 ──── 2018 ──── 2020 ──── ►  ││
│  │ დაარსება   50+ თანამშ.  DOKA    ექსკლ.     ││
│  │                        პარტნ.   დისტრიბ.    ││
│  └─────────────────────────────────────────────┘│
├─────────────────────────────────────────────────┤
│  MISSION & VISION (2-column)                    │
│  ┌──────────────────┐ ┌──────────────────┐      │
│  │ მისია             │ │ ხედვა            │      │
│  │ Icon + text       │ │ Icon + text      │      │
│  └──────────────────┘ └──────────────────┘      │
├─────────────────────────────────────────────────┤
│  PRODUCTS OVERVIEW                              │
│  "მომხმარებლებს ვთავაზობთ:"                     │
│  - საყალიბე სისტემები                            │
│  - სამშენებლო ფანერა, კოჭი, დგარი               │
│  - ხარაჩო                                       │
│  - უსაფრთხოების სისტემები                        │
├─────────────────────────────────────────────────┤
│  SERVICES OVERVIEW                              │
│  - საინჟინრო/საკონსულტაციო მომსახურება           │
│  - მონოლითის ოპტიმიზაცია                        │
│  - პერსონალის გადამზადება                        │
│  - საიჯარო მომსახურება                           │
├─────────────────────────────────────────────────┤
│  ACHIEVEMENTS / KEY NUMBERS                     │
│  (Animated counters)                            │
│  200+ პროექტი | 15+ წელი | 50+ თანამშრომელი    │
├─────────────────────────────────────────────────┤
│  PARTNERS LOGO GRID                             │
│  [ DOKA ] [ Sveza ] [ Plyterra ] ...            │
├─────────────────────────────────────────────────┤
│  PRIORITIES                                     │
│  "კომპანიის პრიორიტეტი..."                     │
│  CTA: [დაგვიკავშირდით]                          │
├─────────────────────────────────────────────────┤
│ [FOOTER]                                        │
└─────────────────────────────────────────────────┘
```

### 2.3 DOKA (`/doka`)

```
┌─────────────────────────────────────────────────┐
│ [HEADER]                                        │
├─────────────────────────────────────────────────┤
│  BREADCRUMB: მთავარი > DOKA                     │
├─────────────────────────────────────────────────┤
│  DOKA HERO (Full-width, dark/industrial)        │
│  ┌─────────────────────────────────────────────┐│
│  │ [DOKA Logo — large, centered]               ││
│  │ H1: "DOKA — მსოფლიო ლიდერი საყალიბე       ││
│  │      ინვენტარში"                            ││
│  │ "ჯითისი ჯგუფი — ექსკლუზიური               ││
│  │  დისტრიბუტორი საქართველოში"                ││
│  └─────────────────────────────────────────────┘│
├─────────────────────────────────────────────────┤
│  PARTNERSHIP STORY                              │
│  ┌─────────────────────────────────────────────┐│
│  │ 2-column: Image + Text                      ││
│  │ "2018 წლიდან... 2020 წელს ექსკლუზიური      ││
│  │  დისტრიბუტორის სტატუსი"                    ││
│  └─────────────────────────────────────────────┘│
├─────────────────────────────────────────────────┤
│  DOKA PRODUCT CATEGORIES (Grid cards)           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ Frami    │ │ DokaDek  │ │ Staxo    │        │
│  │ Xlife   │ │ 30       │ │ 40       │        │
│  │ კედლის  │ │ გადახურვ.│ │ ხარაჩო   │        │
│  └──────────┘ └──────────┘ └──────────┘        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ DokaXligh│ │ Xclimb   │ │ Accessories│     │
│  │ t        │ │ 60       │ │           │        │
│  └──────────┘ └──────────┘ └──────────┘        │
├─────────────────────────────────────────────────┤
│  DOKA IN NUMBERS (World stats)                  │
│  160+ ქვეყანა | 8000+ თანამშრომელი | 1969 წ.   │
├─────────────────────────────────────────────────┤
│  CTA: "იხილეთ DOKA პროდუქცია"                  │
│  [პროდუქცია →] [დაგვიკავშირდით]                 │
├─────────────────────────────────────────────────┤
│ [FOOTER]                                        │
└─────────────────────────────────────────────────┘
```

### 2.4 სერვისები (`/services`)

```
┌─────────────────────────────────────────────────┐
│ [HEADER]                                        │
├─────────────────────────────────────────────────┤
│  BREADCRUMB: მთავარი > სერვისები                │
├─────────────────────────────────────────────────┤
│  PAGE HERO                                      │
│  H1: "სერვისები"                                │
│  Subtitle: "გამოცდილი გუნდი თქვენი              │
│  მშენებლობისთვის"                               │
├─────────────────────────────────────────────────┤
│  4 SERVICE CARDS (Full-width, alternating)       │
│                                                 │
│  ┌─────────────────────────────────────────────┐│
│  │ [Image LEFT]      [Text RIGHT]              ││
│  │                   ინჟინერია                 ││
│  │                   სრული საინჟინრო           ││
│  │                   მომსახურება...              ││
│  │                   [სრულად →]                ││
│  └─────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────┐│
│  │ [Text LEFT]       [Image RIGHT]             ││
│  │ კონსულტაცია                                 ││
│  │ და სწავლება                                 ││
│  │ ...                                         ││
│  └─────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────┐│
│  │ [Image LEFT]      [Text RIGHT]              ││
│  │                   საყალიბე სისტემების       ││
│  │                   იჯარა ...                 ││
│  └─────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────┐│
│  │ [Text LEFT]       [Image RIGHT]             ││
│  │ პროცესების                                  ││
│  │ ოპტიმიზაცია ...                             ││
│  └─────────────────────────────────────────────┘│
├─────────────────────────────────────────────────┤
│  CTA BANNER                                     │
│  "გჭირდებათ პროფესიონალური კონსულტაცია?"        │
│  [დაგვიკავშირდით]                               │
├─────────────────────────────────────────────────┤
│ [FOOTER]                                        │
└─────────────────────────────────────────────────┘
```

**სერვისის დეტალური გვერდი (`/services/[slug]`):**
```
┌─────────────────────────────────────────────────┐
│  BREADCRUMB: მთავარი > სერვისები > ინჟინერია    │
│  H1: სერვისის სახელი                            │
│  Hero image (full-width)                        │
├─────────────────────────────────────────────────┤
│  DESCRIPTION (rich text)                        │
│  სრული აღწერა რა მოიცავს სერვისი               │
├─────────────────────────────────────────────────┤
│  KEY BENEFITS (Icon + text grid, 3-col)         │
│  ┌────────┐ ┌────────┐ ┌────────┐              │
│  │ benefit│ │ benefit│ │ benefit│              │
│  └────────┘ └────────┘ └────────┘              │
├─────────────────────────────────────────────────┤
│  RELATED PROJECTS (slider)                      │
├─────────────────────────────────────────────────┤
│  CTA: [შესაკვეთად დაგვიკავშირდით]              │
└─────────────────────────────────────────────────┘
```

### 2.5 პროდუქცია (`/products`)

```
┌─────────────────────────────────────────────────┐
│ [HEADER]                                        │
├─────────────────────────────────────────────────┤
│  BREADCRUMB: მთავარი > პროდუქცია               │
├─────────────────────────────────────────────────┤
│  PAGE HERO                                      │
│  H1: "პროდუქცია"                                │
├─────────────────────────────────────────────────┤
│  CATEGORY GRID (Large image cards)              │
│  ┌──────────────┐ ┌──────────────┐              │
│  │ ████████████ │ │ ████████████ │              │
│  │ █ full img  █│ │ █ full img  █│              │
│  │ ████████████ │ │ ████████████ │              │
│  │ კედლის      │ │ გადახურვის   │              │
│  │ სისტემა     │ │ სისტემა      │              │
│  │ (12 items)  │ │ (8 items)    │              │
│  └──────────────┘ └──────────────┘              │
│  ┌──────────────┐ ┌──────────────┐              │
│  │ უსაფრთხოების│ │ სივრცული     │              │
│  │ სისტემა     │ │ ხარაჩო       │              │
│  └──────────────┘ └──────────────┘              │
│  ... (10 total categories)                      │
├─────────────────────────────────────────────────┤
│  FEATURED PRODUCTS (carousel)                   │
├─────────────────────────────────────────────────┤
│ [FOOTER]                                        │
└─────────────────────────────────────────────────┘
```

**პროდუქტის კატეგორიის გვერდი (`/products/[category]`):**
```
┌─────────────────────────────────────────────────┐
│  BREADCRUMB: მთავარი > პროდუქცია > კედლის სისტ.│
│  H1: კატეგორიის სახელი                          │
│  Filter/Sort: [ყველა] [DOKA] [Sveza]           │
├─────────────────────────────────────────────────┤
│  PRODUCT GRID (3-col cards)                     │
│  ┌──────┐ ┌──────┐ ┌──────┐                    │
│  │ img  │ │ img  │ │ img  │                    │
│  │ name │ │ name │ │ name │                    │
│  │ brand│ │ brand│ │ brand│                    │
│  │ [→]  │ │ [→]  │ │ [→]  │                    │
│  └──────┘ └──────┘ └──────┘                    │
│  PAGINATION: ← 1 2 3 →                         │
└─────────────────────────────────────────────────┘
```

**პროდუქტის დეტალური გვერდი (`/products/[category]/[id]`):**
```
┌─────────────────────────────────────────────────┐
│  BREADCRUMB: მთავარი > ... > DokaXlight         │
├─────────────────────────────────────────────────┤
│  PRODUCT DETAIL (2-column)                      │
│  ┌──────────────────┐ ┌──────────────────┐      │
│  │ ████████████████ │ │ H1: DokaXlight   │      │
│  │ █  Large image  █│ │                  │      │
│  │ █  + gallery    █│ │ კატეგორია: კედლის│      │
│  │ █  thumbnails   █│ │ ბრენდი: DOKA     │      │
│  │ ████████████████ │ │                  │      │
│  │ [img][img][img]  │ │ CTA Button:      │      │
│  └──────────────────┘ │ [შესაკვეთად     │      │
│                       │  დაგვიკავშირდით] │      │
│                       │ Tel: +995...     │      │
│                       └──────────────────┘      │
├─────────────────────────────────────────────────┤
│  SPECIFICATIONS TABLE                           │
│  ┌─────────────────────────────────────────────┐│
│  │ პარამეტრი          │ მნიშვნელობა           ││
│  │ ────────────────────│──────────────────────  ││
│  │ ტიპი               │ კედლის ყალიბი         ││
│  │ მასალა             │ ალუმინი               ││
│  │ წონა               │ XX კგ                 ││
│  │ ბეტონის წნევა      │ XX kN/m²              ││
│  │ ...                │ ...                   ││
│  └─────────────────────────────────────────────┘│
├─────────────────────────────────────────────────┤
│  DESCRIPTION (Rich text)                        │
│  სრული აღწერა, გამოყენების წესები, უპირატესობები│
├─────────────────────────────────────────────────┤
│  DOCUMENTS / DOWNLOADS                          │
│  [📄 ტექნიკური ფურცელი PDF]                     │
│  [📄 მომხმარებლის სახელმძღვანელო]                │
├─────────────────────────────────────────────────┤
│  RELATED PRODUCTS (Card slider)                 │
│  "მსგავსი პროდუქტები"                           │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│  │ img  │ │ img  │ │ img  │ │ img  │          │
│  │ name │ │ name │ │ name │ │ name │          │
│  └──────┘ └──────┘ └──────┘ └──────┘          │
├─────────────────────────────────────────────────┤
│ [FOOTER]                                        │
└─────────────────────────────────────────────────┘
```

### 2.6 პროექტები (`/projects`)

```
┌─────────────────────────────────────────────────┐
│ [HEADER]                                        │
├─────────────────────────────────────────────────┤
│  BREADCRUMB: მთავარი > პროექტები                │
├─────────────────────────────────────────────────┤
│  PAGE HERO                                      │
│  H1: "პროექტები"                                │
│  Subtitle: "200+ წარმატებული პროექტი"          │
├─────────────────────────────────────────────────┤
│  FILTER BAR                                     │
│  [ყველა] [საცხოვრებელი] [კომერციული]           │
│  [ინფრასტრუქტურა] [სტადიონები]                 │
│  Sort: [ახალი → ძველი] [ძველი → ახალი]         │
├─────────────────────────────────────────────────┤
│  PROJECT GRID (Masonry / 2-col large cards)     │
│  ┌───────────────────┐ ┌──────────────────────┐ │
│  │ ████████████████  │ │ ████████████████████ │ │
│  │ █  project img  █ │ │ █  project img      █│ │
│  │ ████████████████  │ │ ████████████████████ │ │
│  │ ალიანს ცენტროპოლ.│ │ სტადიონი            │ │
│  │ 2022-2025        │ │ 2017-2020            │ │
│  │ [Doka] [Frami]   │ │ [DokaDek] [Staxo]   │ │
│  └───────────────────┘ └──────────────────────┘ │
│  ... PAGINATION                                 │
├─────────────────────────────────────────────────┤
│ [FOOTER]                                        │
└─────────────────────────────────────────────────┘
```

**პროექტის Case Study (`/projects/[slug]`):**
```
┌─────────────────────────────────────────────────┐
│  BREADCRUMB: მთავარი > პროექტები > პროექტი X    │
├─────────────────────────────────────────────────┤
│  PROJECT HERO (Full-width image)                │
│  H1: პროექტის სახელი                            │
├─────────────────────────────────────────────────┤
│  PROJECT META (Card/sidebar)                    │
│  ┌─────────────────────────────────────────────┐│
│  │ დამკვეთი:     ალიანს ჯგუფი                 ││
│  │ კონტრაქტორი:  XXX LLC                      ││
│  │ დაწყება:      2020 წ.                       ││
│  │ დასრულება:    2024 წ.                       ││
│  │ მდებარეობა:   თბილისი                       ││
│  │ ტიპი:         საცხოვრებელი კომპლექსი        ││
│  └─────────────────────────────────────────────┘│
├─────────────────────────────────────────────────┤
│  USED SYSTEMS (Tag badges)                      │
│  [Doka Frami Xlife] [DokaDek 30]               │
│  [Doka Staxo 40] [Protection Screen]            │
├─────────────────────────────────────────────────┤
│  DESCRIPTION / CASE STUDY                       │
│  Rich text: challenge, solution, result         │
├─────────────────────────────────────────────────┤
│  PHOTO GALLERY (Lightbox grid)                  │
│  [img] [img] [img] [img] [img] [img]           │
├─────────────────────────────────────────────────┤
│  RELATED PROJECTS                               │
│  ┌──────┐ ┌──────┐ ┌──────┐                    │
│  └──────┘ └──────┘ └──────┘                    │
├─────────────────────────────────────────────────┤
│ [FOOTER]                                        │
└─────────────────────────────────────────────────┘
```

### 2.7 სიახლეები (`/news`)

```
┌─────────────────────────────────────────────────┐
│ [HEADER]                                        │
├─────────────────────────────────────────────────┤
│  BREADCRUMB: მთავარი > სიახლეები               │
├─────────────────────────────────────────────────┤
│  PAGE HERO                                      │
│  H1: "სიახლეები"                                │
├─────────────────────────────────────────────────┤
│  FILTER BAR                                     │
│  წელი: [2026] [2025] [2024] [ყველა]            │
│  კატეგორია: [ყველა] [კომპანია] [პროდუქცია]     │
│             [პროექტები] [ღონისძიებები]          │
├─────────────────────────────────────────────────┤
│  FEATURED NEWS (Highlighted top card)           │
│  ┌─────────────────────────────────────────────┐│
│  │ [Large img LEFT]  [Content RIGHT]           ││
│  │                   სათაური                   ││
│  │                   თარიღი | კატეგორია        ││
│  │                   2-line preview...          ││
│  │                   [სრულად →]                ││
│  └─────────────────────────────────────────────┘│
├─────────────────────────────────────────────────┤
│  NEWS GRID (3-col cards)                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ img      │ │ img      │ │ img      │        │
│  │ title    │ │ title    │ │ title    │        │
│  │ date|cat │ │ date|cat │ │ date|cat │        │
│  │ preview  │ │ preview  │ │ preview  │        │
│  └──────────┘ └──────────┘ └──────────┘        │
│  PAGINATION: ← 1 2 3 →                         │
├─────────────────────────────────────────────────┤
│ [FOOTER]                                        │
└─────────────────────────────────────────────────┘
```

### 2.8 კონტაქტი (`/contact`)

```
┌─────────────────────────────────────────────────┐
│ [HEADER]                                        │
├─────────────────────────────────────────────────┤
│  BREADCRUMB: მთავარი > კონტაქტი                │
├─────────────────────────────────────────────────┤
│  PAGE HERO                                      │
│  H1: "დაგვიკავშირდით"                           │
├─────────────────────────────────────────────────┤
│  2-COLUMN LAYOUT                                │
│  ┌──────────────────┐ ┌──────────────────┐      │
│  │ CONTACT INFO     │ │ CONTACT FORM     │      │
│  │                  │ │                  │      │
│  │ 📞 ოფისი:       │ │ სახელი *         │      │
│  │ +995 32 221 2161│ │ [____________]   │      │
│  │                  │ │ გვარი *          │      │
│  │ 📞 გაყიდვები:   │ │ [____________]   │      │
│  │ +995 577 037799 │ │ ელ. ფოსტა *      │      │
│  │                  │ │ [____________]   │      │
│  │ 📞 იმპორტი:     │ │ ტელეფონი        │      │
│  │ +995 551 661966 │ │ [____________]   │      │
│  │                  │ │ სათაური          │      │
│  │ 📧 Email:       │ │ [____________]   │      │
│  │ info@gtcgroup.ge│ │ შეტყობინება *    │      │
│  │                  │ │ [____________]   │      │
│  │ 📍 მისამართი:   │ │ [____________]   │      │
│  │ დ. აღმაშენებ.   │ │ [____________]   │      │
│  │ ხეივანი N122    │ │                  │      │
│  │ თბილისი, 0131   │ │ [გაგზავნა ✓]     │      │
│  │                  │ │                  │      │
│  │ 🕐 სამუშაო:     │ │ ✅ Success:      │      │
│  │ ორშ-პარ 10-18   │ │ "შეტყობინება     │      │
│  │                  │ │  წარმატებით      │      │
│  │ [FB][YT][LI]    │ │  გაიგზავნა!"     │      │
│  └──────────────────┘ └──────────────────┘      │
├─────────────────────────────────────────────────┤
│  GOOGLE MAP (Full-width embedded)               │
│  ┌─────────────────────────────────────────────┐│
│  │ [Google Maps - Office Location]             ││
│  │ 41.777678, 44.768144                        ││
│  └─────────────────────────────────────────────┘│
├─────────────────────────────────────────────────┤
│ [FOOTER]                                        │
└─────────────────────────────────────────────────┘
```

---

## 3. დიზაინ-სისტემა

### 3.1 ფერების პალიტრა

```
PRIMARY COLORS
──────────────────────────────────────────
│ GTC Blue (Primary)  │ #1B3A5C │ ██████████ │  Header, Buttons, Links
│ GTC Navy (Dark)     │ #0D1F33 │ ██████████ │  Footer, Dark sections
│ GTC Gold (Accent)   │ #C8933E │ ██████████ │  CTAs, Highlights, Icons
│ GTC White           │ #FFFFFF │ ░░░░░░░░░░ │  Backgrounds
│ GTC Light Gray      │ #F5F6F8 │ ░░░░░░░░░░ │  Section backgrounds

SECONDARY COLORS
──────────────────────────────────────────
│ Steel Gray          │ #4A5568 │ ██████████ │  Body text
│ Medium Gray         │ #A0AEC0 │ ██████████ │  Secondary text, borders
│ Border Gray         │ #E2E8F0 │ ░░░░░░░░░░ │  Card borders, dividers
│ Success Green       │ #38A169 │ ██████████ │  Success messages
│ Error Red           │ #E53E3E │ ██████████ │  Errors, validation
│ DOKA Orange         │ #E87722 │ ██████████ │  DOKA branded sections

GRADIENTS
──────────────────────────────────────────
│ Hero Gradient       │ linear-gradient(135deg, #0D1F33, #1B3A5C)
│ CTA Gradient        │ linear-gradient(90deg, #C8933E, #D4A655)
│ Dark Overlay        │ linear-gradient(180deg, rgba(13,31,51,0.8), rgba(13,31,51,0.4))
```

### 3.2 CSS Variables

```css
:root {
  /* Colors */
  --color-primary: #1B3A5C;
  --color-primary-dark: #0D1F33;
  --color-accent: #C8933E;
  --color-accent-hover: #D4A655;
  --color-white: #FFFFFF;
  --color-bg-light: #F5F6F8;
  --color-text-primary: #0D1F33;
  --color-text-secondary: #4A5568;
  --color-text-muted: #A0AEC0;
  --color-border: #E2E8F0;
  --color-success: #38A169;
  --color-error: #E53E3E;
  --color-doka: #E87722;

  /* Typography Scale (fluid) */
  --font-display: 'Noto Sans Georgian', 'Inter', sans-serif;
  --font-heading: 'Noto Sans Georgian', 'Inter', sans-serif;
  --font-body: 'Noto Sans Georgian', 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.65vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
  --text-3xl: clamp(1.875rem, 1.5rem + 1.5vw, 2.5rem);
  --text-4xl: clamp(2.25rem, 1.8rem + 2.25vw, 3.5rem);
  --text-5xl: clamp(3rem, 2.2rem + 4vw, 5rem);

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  --space-4xl: 6rem;
  --space-section: clamp(4rem, 3rem + 5vw, 8rem);

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --shadow-lg: 0 10px 25px rgba(0,0,0,0.1);
  --shadow-xl: 0 20px 50px rgba(0,0,0,0.15);
  --shadow-card: 0 2px 8px rgba(0,0,0,0.06);
  --shadow-card-hover: 0 8px 25px rgba(0,0,0,0.12);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
  --transition-spring: 500ms cubic-bezier(0.16, 1, 0.3, 1);

  /* Container */
  --container-max: 1280px;
  --container-wide: 1440px;
  --container-padding: clamp(1rem, 2vw, 2rem);

  /* Z-index layers */
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-header: 300;
  --z-overlay: 400;
  --z-modal: 500;
}
```

### 3.3 ტიპოგრაფია

```
HIERARCHY
────────────────────────────────────────────────────────

Display (Hero titles)
  Font:     Noto Sans Georgian SemiCondensed
  Size:     var(--text-5xl) → 48-80px
  Weight:   700
  Tracking: -0.02em
  Color:    var(--color-white) or var(--color-primary-dark)

H1 (Page titles)
  Font:     Noto Sans Georgian
  Size:     var(--text-4xl) → 36-56px
  Weight:   700
  Tracking: -0.01em
  Color:    var(--color-primary-dark)

H2 (Section titles)
  Font:     Noto Sans Georgian
  Size:     var(--text-3xl) → 30-40px
  Weight:   600
  Color:    var(--color-primary-dark)

H3 (Card titles, subsections)
  Font:     Noto Sans Georgian
  Size:     var(--text-2xl) → 24-32px
  Weight:   600
  Color:    var(--color-primary)

H4 (Small headings)
  Font:     Noto Sans Georgian
  Size:     var(--text-xl) → 20-24px
  Weight:   600

Body Large
  Font:     Noto Sans Georgian / Inter
  Size:     var(--text-lg) → 18-20px
  Weight:   400
  Line-h:   1.7
  Color:    var(--color-text-secondary)

Body
  Font:     Noto Sans Georgian / Inter
  Size:     var(--text-base) → 16-18px
  Weight:   400
  Line-h:   1.6
  Color:    var(--color-text-secondary)

Small / Caption
  Font:     Inter / Noto Sans Georgian
  Size:     var(--text-sm) → 14-16px
  Weight:   400
  Color:    var(--color-text-muted)

Label / Tag
  Font:     Inter
  Size:     var(--text-xs) → 12-14px
  Weight:   600
  Tracking: 0.05em
  Transform: uppercase
  Color:    var(--color-accent)
```

### 3.4 კომპონენტები

#### Button Variants
```
PRIMARY:
  bg: var(--color-accent) → hover: var(--color-accent-hover)
  text: white
  padding: 14px 32px
  border-radius: var(--radius-md)
  font-weight: 600
  transition: var(--transition-base)
  hover: translateY(-1px) + shadow-md

SECONDARY:
  bg: transparent
  border: 2px solid var(--color-primary)
  text: var(--color-primary)
  hover: bg var(--color-primary), text white

OUTLINE-LIGHT:
  bg: transparent
  border: 2px solid white
  text: white
  hover: bg white, text var(--color-primary-dark)

GHOST:
  bg: transparent
  text: var(--color-primary)
  hover: bg var(--color-bg-light)

ICON BUTTON:
  40x40 circle
  bg: var(--color-bg-light)
  hover: var(--color-primary), text white
```

#### Card Components
```
PRODUCT CARD:
  ┌──────────────────┐
  │ [Image: 4:3]     │   bg: white
  │                   │   border: 1px solid var(--color-border)
  ├──────────────────┤   border-radius: var(--radius-lg)
  │ Category (label)  │   hover: shadow-card-hover, translateY(-4px)
  │ Product Name (H4) │   transition: var(--transition-spring)
  │ Brand             │
  │ [→ სრულად]       │
  └──────────────────┘

PROJECT CARD:
  ┌──────────────────┐
  │ [Image: 16:9]    │   Overlay gradient on hover
  │  ────────────    │   Tags shown on hover
  │ │ Title        │ │   Date badge (absolute top-right)
  │ │ Date range   │ │
  │ │ [Tag][Tag]   │ │
  │  ────────────    │
  └──────────────────┘

NEWS CARD:
  ┌──────────────────┐
  │ [Image: 16:9]    │   Date badge (overlay, top-left)
  ├──────────────────┤
  │ Category (label)  │
  │ Title (H4)        │
  │ Preview text...   │
  │ [სრულად →]       │
  └──────────────────┘

SERVICE CARD:
  ┌──────────────────┐
  │ [Icon: 48x48]    │   bg: white or var(--color-bg-light)
  │ Title (H3)       │   border-left: 4px solid var(--color-accent)
  │ Description...    │   hover: border-left → var(--color-primary)
  │ [სრულად →]       │
  └──────────────────┘
```

#### Input Components
```
TEXT INPUT:
  height: 48px
  border: 1px solid var(--color-border)
  border-radius: var(--radius-md)
  padding: 12px 16px
  font-size: var(--text-base)
  focus: border-color var(--color-primary), shadow 0 0 0 3px rgba(27,58,92,0.1)
  error: border-color var(--color-error)
  label: above, font-size var(--text-sm), font-weight 600

TEXTAREA:
  Same as input but min-height: 120px, resize: vertical

SELECT:
  Same as input + chevron icon right
```

#### Other Components
```
BREADCRUMB:
  font-size: var(--text-sm)
  separator: ">"
  current page: font-weight 600, color primary

TAG BADGE:
  bg: rgba(27,58,92,0.08)
  text: var(--color-primary)
  padding: 4px 12px
  border-radius: var(--radius-full)
  font-size: var(--text-xs)
  font-weight: 600

STAT COUNTER:
  number: var(--text-4xl), font-weight 700, color var(--color-accent)
  label: var(--text-sm), color var(--color-text-muted), uppercase

PAGINATION:
  active: bg var(--color-primary), text white, rounded
  inactive: bg transparent, text var(--color-text-secondary)
  hover: bg var(--color-bg-light)
  
SECTION HEADER:
  H2 + optional subtitle
  accent line: 60px wide, 3px height, var(--color-accent), below heading
  margin-bottom: var(--space-2xl)

PARTNER LOGO:
  filter: grayscale(100%) opacity(0.5)
  hover: grayscale(0%) opacity(1)
  transition: var(--transition-base)
```

### 3.5 Layout Grid

```
DESKTOP (≥1280px):
  Container: 1280px centered
  Grid: 12 columns, 24px gap
  Section padding: 80px vertical

TABLET (768-1279px):
  Container: fluid, 32px padding
  Grid: 8 columns, 20px gap
  Section padding: 60px vertical

MOBILE (< 768px):
  Container: fluid, 16px padding
  Grid: 4 columns, 16px gap
  Section padding: 40px vertical
  
Navigation: hamburger menu (slide-in from right)
```

### 3.6 Iconography

```
Style: Outlined, 2px stroke, rounded caps
Size variants: 20px, 24px, 32px, 48px
Library: Lucide Icons (open source, consistent)

Key icons:
  🔧 engineering → Wrench / Settings
  📐 consulting → BookOpen / PenTool  
  🏗️ rental → Building / Warehouse
  ⚡ optimization → Zap / TrendingUp
  📞 phone → Phone
  📧 email → Mail
  📍 location → MapPin
  🕐 schedule → Clock
  📄 document → FileText
  ↗ external → ExternalLink
  → arrow → ArrowRight / ChevronRight
```

---

## 4. კონტენტი — რედაქტირებული ტექსტები

### 4.1 მთავარი გვერდი

#### 🇬🇪 ქართული (GE)

**Hero Slide 1:**
> **ხარისხიანი მშენებლობისთვის**
> DOKA-ს ექსკლუზიური დისტრიბუტორი საქართველოში. მსოფლიო სტანდარტის საყალიბე სისტემები თქვენი პროექტისთვის.
> [პროდუქცია] [დაგვიკავშირდით]

**Hero Slide 2:**
> **Sveza-ს ავტორიზებული დილერი**
> პრემიუმ ხარისხის სამშენებლო ფანერა ყველა ტიპის პროექტისთვის.
> [კატალოგი →]

**Hero Slide 3:**
> **Plyterra-ს ავტორიზებული დილერი**
> ლამინირებული ფანერა მაქსიმალური გამძლეობით.
> [კატალოგი →]

**Hero Slide 4:**
> **საყალიბე სისტემების იჯარა**
> DOKA-ს სრული ასორტიმენტი საიჯარო მომსახურებით. ეკონომიური გადაწყვეტა თქვენი მშენებლობისთვის.
> [გაიგეთ მეტი →]

**Hero Slide 5:**
> **ყალიბების ინჟინერია**
> გამოცდილი საინჟინრო გუნდი — პროექტირებიდან მონიტორინგამდე.
> [სერვისები →]

**Hero Slide 6:**
> **ყალიბის სპეციალისტები თქვენი მშენებლობისთვის**
> დაგეგმეთ და აწარმოეთ მშენებლობა პროფესიონალების გუნდთან ერთად!
> [პროექტები →]

**Stats Section:**
> - **15+** წელი ბაზარზე
> - **50+** თანამშრომელი
> - **200+** განხორციელებული პროექტი
> - **100+** პარტნიორი კომპანია

**Services Overview Title:**
> **ჩვენი სერვისები**
> პროფესიონალური მომსახურება მშენებლობის ყველა ეტაპზე

**Services Cards:**

1. **ინჟინერია**
   სრული საინჟინრო მომსახურება — სტრუქტურული ანალიზიდან ზუსტ გაანგარიშებამდე.

2. **კონსულტაცია და სწავლება**
   საყალიბე სისტემების სწორი ექსპლუატაცია — ტრენინგები და საინჟინრო კონსულტაცია.

3. **საყალიბე სისტემების იჯარა**
   DOKA-ს ყველა სახეობის სისტემა საიჯარო მომსახურებით.

4. **პროცესების ოპტიმიზაცია**
   ბეტონირების ციკლის დაჩქარება და ყალიბების ეფექტური დაგეგმარება.

**DOKA Banner:**
> **DOKA — მსოფლიო ლიდერი საყალიბე სისტემებში**
> ჯითისი ჯგუფი 2020 წლიდან DOKA-ს ექსკლუზიური დისტრიბუტორია საქართველოში.
> [DOKA-ს შესახებ →]

**CTA Section:**
> **გჭირდებათ პროფესიონალური კონსულტაცია?**
> ჩვენი გამოცდილი გუნდი მზადაა დაგეხმაროთ ნებისმიერი სირთულის პროექტში.
> [დაგვიკავშირდით]

---

#### 🇬🇧 English (EN)

**Hero Slide 1:**
> **Building with Excellence**
> Exclusive DOKA distributor in Georgia. World-class formwork systems for your project.
> [Products] [Contact Us]

**Hero Slide 2:**
> **Authorized Sveza Dealer**
> Premium construction plywood for projects of any scale.
> [Catalog →]

**Hero Slide 3:**
> **Authorized Plyterra Dealer**
> Laminated plywood with maximum durability.
> [Catalog →]

**Hero Slide 4:**
> **Formwork System Rental**
> Full range of DOKA systems available for rent. A cost-effective solution for your construction project.
> [Learn More →]

**Hero Slide 5:**
> **Formwork Engineering**
> Experienced engineering team — from design to on-site monitoring.
> [Services →]

**Hero Slide 6:**
> **Formwork Specialists for Your Construction**
> Plan and execute construction with a team of professionals!
> [Projects →]

**Stats Section:**
> - **15+** Years on Market
> - **50+** Team Members
> - **200+** Completed Projects
> - **100+** Partner Companies

**Services Overview:**
> **Our Services**
> Professional support at every stage of construction

1. **Engineering**
   Full engineering services — from structural analysis to precise calculations.

2. **Consulting & Training**
   Proper formwork system operation — training sessions and engineering consultation.

3. **Formwork System Rental**
   All types of DOKA systems available for rental.

4. **Process Optimization**
   Accelerate concrete cycles and plan formwork efficiently.

**DOKA Banner:**
> **DOKA — World Leader in Formwork Systems**
> GTC Group has been the exclusive DOKA distributor in Georgia since 2020.
> [About DOKA →]

**CTA:**
> **Need Professional Consultation?**
> Our experienced team is ready to assist with projects of any complexity.
> [Contact Us]

---

#### 🇷🇺 Русский (RU)

**Hero Slide 1:**
> **Качественное строительство**
> Эксклюзивный дистрибьютор DOKA в Грузии. Опалубочные системы мирового стандарта для вашего проекта.
> [Продукция] [Связаться с нами]

**Hero Slide 2:**
> **Авторизованный дилер Sveza**
> Строительная фанера премиум-качества для проектов любого масштаба.
> [Каталог →]

**Hero Slide 3:**
> **Авторизованный дилер Plyterra**
> Ламинированная фанера с максимальной прочностью.
> [Каталог →]

**Hero Slide 4:**
> **Аренда опалубочных систем**
> Полный ассортимент систем DOKA в аренду. Экономичное решение для вашего строительства.
> [Подробнее →]

**Hero Slide 5:**
> **Инженерия опалубки**
> Опытная инженерная команда — от проектирования до мониторинга на объекте.
> [Услуги →]

**Hero Slide 6:**
> **Специалисты по опалубке для вашего строительства**
> Планируйте и ведите строительство с командой профессионалов!
> [Проекты →]

**Stats:**
> - **15+** лет на рынке
> - **50+** сотрудников
> - **200+** реализованных проектов
> - **100+** компаний-партнёров

**Services:**
> **Наши услуги**
> Профессиональное сопровождение на каждом этапе строительства

1. **Инженерия** — Полный инженерный сервис — от структурного анализа до точных расчётов.
2. **Консультации и обучение** — Правильная эксплуатация опалубочных систем — тренинги и инженерные консультации.
3. **Аренда опалубочных систем** — Все виды систем DOKA доступны в аренду.
4. **Оптимизация процессов** — Ускорение цикла бетонирования и эффективное планирование опалубки.

**DOKA Banner:**
> **DOKA — мировой лидер в опалубочных системах**
> GTC Group является эксклюзивным дистрибьютором DOKA в Грузии с 2020 года.
> [О DOKA →]

**CTA:**
> **Нужна профессиональная консультация?**
> Наша опытная команда готова помочь с проектом любой сложности.
> [Связаться с нами]

---

### 4.2 ჩვენ შესახებ

#### 🇬🇪 GE

**Page Title:** ჩვენ შესახებ

**ისტორია:**
> ჯითისი ჯგუფი 2010 წლიდან საქართველოში საყალიბე მასალების ერთ-ერთი უმსხვილესი იმპორტიორია. დაარსების დღიდან კომპანია ზრუნავს რეპუტაციის ამაღლებაზე და ლოიალური მომხმარებლების ზრდაზე. ორი ადამიანის მიერ დაწყებული საქმე დღეს აერთიანებს ორმოცდაათზე მეტ დასაქმებულ პირს.

**პროდუქცია:**
> ჩვენ მომხმარებლებს ვთავაზობთ: საყალიბე სისტემებს, სამშენებლო ფანერას, კოჭს, დგარს, ხარაჩოს, უსაფრთხოების სისტემებს და სხვადასხვა დანიშნულების სამშენებლო მასალებს. ჯითისი წარმოადგენს სფეროს წამყვანი მწარმოებლების — Doka, Sveza, Plyterra, Alfix, Gherardi, Extraform — ოფიციალურ პარტნიორს საქართველოში.

**სერვისები:**
> ჯითისი გამოცდილი და მაღალკვალიფიციური გუნდის საშუალებით სამშენებლო ბაზარზე წარმოდგენილია შემდეგი სერვისებით: ყალიბის საინჟინრო და საკონსულტაციო მომსახურება, მონოლითის სამუშაოების ოპტიმიზაცია, პროექტზე დასაქმებული პერსონალის გადამზადება, საყალიბე და უსაფრთხოების სისტემების საიჯარო მომსახურება. ჩვენი სერთიფიცირებული ინჟინრები და ყალიბის სპეციალისტები უზრუნველყოფენ მონოლითის შესრულების მთლიანი ციკლის დაგეგმვას, განხორციელებას და მონიტორინგს.

**DOKA:**
> ჯითისი ჯგუფი 2018 წლიდან მსოფლიოში საყალიბე ინვენტარის წამყვანი მწარმოებლის — ავსტრიული კომპანია DOKA-ს პარტნიორია. 2020 წელს თანამშრომლობა გაღრმავდა და ჯითისს მიენიჭა საქართველოში DOKA-ს ექსკლუზიური დისტრიბუტორის სტატუსი.

**მიღწევები:**
> ჯითისის მონაწილეობით აშენდა მრავალი სტრატეგიულად მნიშვნელოვანი ინფრასტრუქტურული პროექტი, მაშტაბური საცხოვრებელი და კომერციული დანიშნულების კომპლექსები. კომპანიას აკავშირებს პარტნიორული ურთიერთობა საქართველოში წარმოდგენილ ყველა მსხვილ და ავტორიტეტულ სამშენებლო კომპანიასთან.

**პრიორიტეტი:**
> კომპანიის პრიორიტეტს წარმოადგენს პარტნიორების ნდობის შენარჩუნება და სამშენებლო სფეროს წარმომადგენლებისთვის მუდმივად მაღალი ხარისხის პროდუქციისა და სერვისების შეთავაზება.

**CTA:**
> დაგეგმეთ და აწარმოეთ მშენებლობა პროფესიონალების გუნდთან ერთად!

#### 🇬🇧 EN

**History:**
> GTC Group has been one of the largest importers of formwork materials in Georgia since 2010. From day one, the company has been committed to building its reputation and growing a loyal customer base. What started as a venture of two people now unites more than fifty employees.

**Products:**
> We offer our clients: formwork systems, construction plywood, beams, props, scaffolding, safety systems, and various construction materials. GTC is the official partner of leading manufacturers — Doka, Sveza, Plyterra, Alfix, Gherardi, and Extraform — in Georgia.

**Services:**
> With an experienced and highly qualified team, GTC provides the following services in the construction market: formwork engineering and consulting, monolithic work optimization, on-site personnel training, and rental of formwork and safety systems. Our certified engineers and formwork specialists ensure planning, execution, and monitoring of the complete monolithic cycle.

**DOKA:**
> GTC Group has been a partner of DOKA — the world's leading formwork equipment manufacturer from Austria — since 2018. In 2020, the partnership deepened and GTC was granted the exclusive DOKA distributor status in Georgia.

**Achievements:**
> With GTC's participation, numerous strategically important infrastructure projects and large-scale residential and commercial complexes have been built. The company maintains partnerships with all major and reputable construction companies in Georgia.

**Priority:**
> The company's priority is to maintain the trust of its partners and to consistently offer the highest quality products and services to the construction industry.

#### 🇷🇺 RU

**История:**
> Группа GTC с 2010 года является одним из крупнейших импортёров опалубочных материалов в Грузии. С первого дня компания заботится о росте репутации и увеличении числа лояльных клиентов. Начатое двумя людьми дело сегодня объединяет более пятидесяти сотрудников.

**Продукция:**
> Мы предлагаем клиентам: опалубочные системы, строительную фанеру, балки, стойки, леса, системы безопасности и разнообразные строительные материалы. GTC является официальным партнёром ведущих производителей — Doka, Sveza, Plyterra, Alfix, Gherardi, Extraform — в Грузии.

**Услуги:**
> С помощью опытной и высококвалифицированной команды GTC представлена на строительном рынке следующими услугами: инженерный и консалтинговый сервис опалубки, оптимизация монолитных работ, переподготовка персонала на объектах, аренда опалубочных систем и систем безопасности. Наши сертифицированные инженеры обеспечивают планирование, выполнение и мониторинг полного цикла монолитных работ.

**DOKA:**
> Группа GTC с 2018 года является партнёром DOKA — ведущего мирового производителя опалубочного оборудования из Австрии. В 2020 году сотрудничество углубилось, и GTC получила статус эксклюзивного дистрибьютора DOKA в Грузии.

**Достижения:**
> С участием GTC построено множество стратегически важных инфраструктурных проектов, масштабных жилых и коммерческих комплексов. Компания поддерживает партнёрские отношения со всеми крупными и авторитетными строительными компаниями Грузии.

**Приоритет:**
> Приоритет компании — сохранение доверия партнёров и постоянное предложение продукции и услуг высочайшего качества участникам строительной отрасли.

---

### 4.3 სერვისების აღწერები

#### 🇬🇪 GE

**ინჟინერია:**
> ჯითისი ჯგუფი გთავაზობთ სრულ საინჟინრო მომსახურებას — პროექტის მარტივი სტრუქტურული ანალიზიდან ზუსტ გაანგარიშებამდე. ჩვენი სერთიფიცირებული ინჟინრები შეიმუშავებენ ოპტიმალურ საყალიბე გეგმას თქვენი პროექტის სპეციფიკის გათვალისწინებით.

**კონსულტაცია და სწავლება:**
> ჯითისი ჯგუფი საყალიბე სისტემების სწორი და ეფექტური ექსპლუატაციისათვის გთავაზობთ საინჟინრო გუნდის მომსახურებას. ჩვენი სპეციალისტები ჩაატარებენ ტრენინგებს თქვენს საიტზე და უზრუნველყოფენ უსაფრთხოებისა და ეფექტურობის სტანდარტების დაცვას.

**საყალიბე სისტემების იჯარა:**
> ჯითისი ჯგუფი გთავაზობთ საყალიბე სისტემების საიჯარო მომსახურებას. ჩვენს სასაწყობე ბაზაზე ხელმისაწვდომია DOKA-ს ყველა სახეობის საყალიბე სისტემა. იჯარა საშუალებას გაძლევთ მნიშვნელოვნად შეამციროთ კაპიტალური ხარჯები მშენებლობის პროცესში.

**პროცესების ოპტიმიზაცია:**
> DOKA-ს სპეციალური ინსტრუმენტები მოგცემთ ბეტონირების ციკლის დაჩქარების, საქონლის მარაგების ოპტიმიზაციისა და ყალიბების ეფექტურად დაგეგმარების საშუალებას. გამოიყენეთ თანამედროვე ტექნოლოგიები მშენებლობის ვადებისა და ხარჯების ოპტიმიზაციისთვის.

#### 🇬🇧 EN

**Engineering:**
> GTC Group offers comprehensive engineering services — from straightforward structural analysis to precise calculations. Our certified engineers develop optimal formwork plans tailored to your project's specific requirements.

**Consulting & Training:**
> GTC Group provides engineering team services for proper and efficient formwork system operation. Our specialists conduct on-site training and ensure compliance with safety and efficiency standards.

**Formwork System Rental:**
> GTC Group offers formwork system rental services. Our warehouse facility stocks the full range of DOKA formwork systems. Renting allows you to significantly reduce capital expenditure during the construction process.

**Process Optimization:**
> DOKA's specialized tools enable acceleration of concrete cycles, optimization of inventory management, and efficient formwork planning. Leverage modern technologies to optimize construction timelines and costs.

#### 🇷🇺 RU

**Инженерия:**
> Группа GTC предлагает полный инженерный сервис — от простого структурного анализа до точных расчётов. Наши сертифицированные инженеры разработают оптимальный план опалубки с учётом специфики вашего проекта.

**Консультации и обучение:**
> Группа GTC предоставляет услуги инженерной команды для правильной и эффективной эксплуатации опалубочных систем. Наши специалисты проводят обучение на объекте и обеспечивают соблюдение стандартов безопасности и эффективности.

**Аренда опалубочных систем:**
> Группа GTC предлагает услуги аренды опалубочных систем. На нашей складской базе доступны все виды опалубочных систем DOKA. Аренда позволяет значительно сократить капитальные затраты в процессе строительства.

**Оптимизация процессов:**
> Специализированные инструменты DOKA позволяют ускорить цикл бетонирования, оптимизировать управление запасами и эффективно планировать опалубку. Используйте современные технологии для оптимизации сроков и затрат строительства.

---

### 4.4 კონტაქტის ტექსტები

#### 🇬🇪 GE
```
გვერდის სათაური: დაგვიკავშირდით
ქვესათაური: ჩვენი გუნდი მზადაა დაგეხმაროთ

საკონტაქტო ინფორმაცია:
  ოფისი: +995 32 2 21 21 61
  გაყიდვები: +995 577 037799
  იმპორტი: +995 551 661966 / +995 598 737737
  ელ. ფოსტა: info@gtcgroup.ge
  მისამართი: დავით აღმაშენებლის ხეივანი N122, თბილისი, 0131
  სამუშაო საათები: ორშაბათი — პარასკევი, 10:00 — 18:00

ფორმის ველები:
  სახელი *
  გვარი *
  ელ. ფოსტა *
  ტელეფონი
  სათაური
  შეტყობინება *
  [გაგზავნა]

წარმატების შეტყობინება: "თქვენი შეტყობინება წარმატებით გაიგზავნა! ჩვენი გუნდი 24 საათის განმავლობაში დაგიკავშირდებათ."
შეცდომის შეტყობინება: "შეტყობინების გაგზავნა ვერ მოხერხდა. გთხოვთ, სცადოთ ხელახლა ან დაგვიკავშირდით ტელეფონით."
```

#### 🇬🇧 EN
```
Page Title: Contact Us
Subtitle: Our team is ready to help

Contact Information:
  Office: +995 32 2 21 21 61
  Sales: +995 577 037799
  Import: +995 551 661966 / +995 598 737737
  Email: info@gtcgroup.ge
  Address: David Aghmashenebeli Ave N122, Tbilisi, 0131, Georgia
  Working Hours: Monday — Friday, 10:00 — 18:00

Form fields:
  First Name *
  Last Name *
  Email *
  Phone
  Subject
  Message *
  [Send Message]

Success: "Your message has been sent successfully! Our team will get back to you within 24 hours."
Error: "Failed to send message. Please try again or contact us by phone."
```

#### 🇷🇺 RU
```
Заголовок: Свяжитесь с нами
Подзаголовок: Наша команда готова помочь

Контактная информация:
  Офис: +995 32 2 21 21 61
  Продажи: +995 577 037799
  Импорт: +995 551 661966 / +995 598 737737
  Email: info@gtcgroup.ge
  Адрес: пр. Давида Агмашенебели N122, Тбилиси, 0131, Грузия
  Рабочие часы: Понедельник — Пятница, 10:00 — 18:00

Поля формы:
  Имя *
  Фамилия *
  Email *
  Телефон
  Тема
  Сообщение *
  [Отправить]

Успех: "Ваше сообщение успешно отправлено! Наша команда свяжется с вами в течение 24 часов."
Ошибка: "Не удалось отправить сообщение. Пожалуйста, попробуйте ещё раз или свяжитесь с нами по телефону."
```

---

## 5. კონტენტის მიგრაციის Checklist

### 5.1 მონაცემთა ბაზის მიგრაცია

| # | სტატუსი | ამოცანა | დეტალები |
|---|---------|---------|----------|
| 1 | ⬜ | Supabase სქემის განახლება | არსებული wine-ორიენტირებული სქემა → construction სქემა |
| 2 | ⬜ | `products` ცხრილის რესტრუქტურიზაცია | კატეგორია (კედლის, გადახურვის, etc.), ბრენდი (DOKA, Sveza, etc.) |
| 3 | ⬜ | `product_items` → `products_detail` | სპეციფიკაციები JSONB, PDF-ები, გამოსახულებების გალერეა |
| 4 | ⬜ | `projects` ცხრილის დამატება | name, description, client, contractor, start_date, end_date, category, location, images, used_systems[] |
| 5 | ⬜ | `services` ცხრილის დამატება | slug, name, description, icon, benefits[], related_projects[] |
| 6 | ⬜ | `news` ცხრილის დამატება (blogs-ის ნაცვლად) | title, description, category, year, image, gallery |
| 7 | ⬜ | `contact_us` ცხრილში `subject` ველის დამატება | |
| 8 | ⬜ | Wine-სპეციფიკური ცხრილების წაშლა | `foods`, `product_items_awards`, glass_type enum, etc. |
| 9 | ⬜ | RLS პოლისის განახლება | ახალი ცხრილებისთვის RLS ჩართვა |
| 10 | ⬜ | Seed data მიგრაცია | არსებული gtcgroup.ge-ს მონაცემების იმპორტი |

### 5.2 კონტენტის მიგრაცია

| # | სტატუსი | გვერდი | მიგრაცია |
|---|---------|--------|----------|
| 11 | ⬜ | მთავარი | Hero slides (6), stats, services preview, products preview, projects preview |
| 12 | ⬜ | ჩვენ შესახებ | ისტორია, პროდუქცია, სერვისები, DOKA, მიღწევები, პრიორიტეტი — 3 ენა |
| 13 | ⬜ | DOKA | პარტნიორობის ისტორია, DOKA პროდუქტების კატეგორიები — 3 ენა |
| 14 | ⬜ | სერვისები (4) | თითოეული სერვისის სრული აღწერა — 3 ენა |
| 15 | ⬜ | პროდუქცია კატეგორიები (10) | სახელი, სურათი, აღწერა — 3 ენა |
| 16 | ⬜ | პროდუქტები (30+) | სახელი, სპეციფიკაციები, აღწერა, სურათები, PDF-ები — 3 ენა |
| 17 | ⬜ | პროექტები (20+) | სახელი, case study, მეტა-მონაცემები, სურათები — 3 ენა |
| 18 | ⬜ | სიახლეები | არსებული blog posts-ის მიგრაცია → news format |
| 19 | ⬜ | კონტაქტი | ტელეფონები, მისამართი, სოციალური ქსელები |

### 5.3 სურათების მიგრაცია

| # | სტატუსი | ტიპი | დეტალები |
|---|---------|------|----------|
| 20 | ⬜ | Hero სურათები/ვიდეოები | 6 slide-ისთვის ოპტიმიზებული სურათები |
| 21 | ⬜ | პროდუქციის სურათები | WebP, სხვადასხვა ზომა, lazy loading |
| 22 | ⬜ | პროექტების გალერეა | დიდი სურათები + thumbnails |
| 23 | ⬜ | პარტნიორთა ლოგოები | SVG ფორმატი (DOKA, Sveza, Plyterra, Alfix, Gherardi, Extraform) |
| 24 | ⬜ | სერვისების სურათები | 4 სერვისის ილუსტრაცია |
| 25 | ⬜ | Favicon & OG images | GTC ბრენდირებით |

### 5.4 Dictionary/i18n მიგრაცია

| # | სტატუსი | ფაილი | სტატუსი |
|---|---------|-------|---------|
| 26 | ⬜ | `ge.json` — სრული განახლება | Wine → Construction ტერმინოლოგია, ახალი გვერდების ტექსტები |
| 27 | ⬜ | `en.json` — სრული განახლება | იგივე სტრუქტურა, ინგლისური ტერზმინოლოგია |
| 28 | ⬜ | `ru.json` — სრული განახლება | იგივე სტრუქტურა, რუსული ტერმინოლოგია |
| 29 | ⬜ | Metadata ტექსტები 3 ენაზე | title, description, OG tags |

### 5.5 ბაგ-ფიქსების Checklist

| # | სტატუსი | ბაგი | გამოსწორება |
|---|---------|------|------------|
| 30 | ⬜ | კონტაქტ ფორმის "an_error_has_occurred" | ვალიდაცია + error handling + success state |
| 31 | ⬜ | პროექტების "Jan 1970" თარიღი | timestamp → date parsing fix, null check |
| 32 | ⬜ | `pagination.next` ტექსტი (raw key) | dictionary-ში ტექსტის დამატება |
| 33 | ⬜ | Google Maps "can't load correctly" | API key-ის შემოწმება/განახლება |
| 34 | ⬜ | გატეხილი კატეგორიების ბმულები | URL სტრუქტურის სტანდარტიზაცია |
| 35 | ⬜ | Footer-ში copyright "2019" | → dynamic current year |
| 36 | ⬜ | Empty mailto: link | info@gtcgroup.ge-ს მითითება |
| 37 | ⬜ | ენობრივი შერევა (GE/EN/RU) | ყველა UI ელემენტის dictionary-ზე გადაყვანა |

---

## 6. Launch-ის ტექნიკური Checklist

### 6.1 Performance

| # | სტატუსი | ამოცანა | მიზნობრივი მაჩვენებელი |
|---|---------|---------|----------------------|
| 1 | ⬜ | Largest Contentful Paint (LCP) | < 2.5s |
| 2 | ⬜ | First Input Delay (FID) / INP | < 200ms |
| 3 | ⬜ | Cumulative Layout Shift (CLS) | < 0.1 |
| 4 | ⬜ | Time to First Byte (TTFB) | < 800ms |
| 5 | ⬜ | სურათების ოპტიმიზაცია | Next/Image, WebP, lazy loading, priority hero |
| 6 | ⬜ | Font ოპტიმიზაცია | `font-display: swap`, subset, preload |
| 7 | ⬜ | JavaScript bundle size | < 200KB initial load |
| 8 | ⬜ | CSS Critical path | Inline critical CSS, defer rest |
| 9 | ⬜ | Server-side caching | `revalidate` ISR, CDN caching headers |
| 10 | ⬜ | Lighthouse score | Performance ≥90, Accessibility ≥95 |

### 6.2 SEO

| # | სტატუსი | ამოცანა |
|---|---------|---------|
| 11 | ⬜ | ყველა გვერდს აქვს უნიკალური `<title>` (3 ენაზე) |
| 12 | ⬜ | ყველა გვერდს აქვს `<meta description>` (3 ენაზე) |
| 13 | ⬜ | Open Graph tags (og:title, og:description, og:image) |
| 14 | ⬜ | Twitter Card tags |
| 15 | ⬜ | `hreflang` tags (ka, en, ru) |
| 16 | ⬜ | `<link rel="canonical">` ყველა გვერდზე |
| 17 | ⬜ | Schema.org structured data: Organization |
| 18 | ⬜ | Schema.org: Product (პროდუქციის გვერდებზე) |
| 19 | ⬜ | Schema.org: BreadcrumbList |
| 20 | ⬜ | Schema.org: LocalBusiness |
| 21 | ⬜ | Schema.org: Article (სიახლეებისთვის) |
| 22 | ⬜ | `/sitemap.xml` — ავტოგენერაცია, 3 ენა |
| 23 | ⬜ | `/robots.txt` — განახლებული |
| 24 | ⬜ | 301 Redirects: ძველი URL → ახალი URL |
| 25 | ⬜ | Image alt texts (3 ენაზე) |
| 26 | ⬜ | Heading hierarchy (H1→H2→H3, ერთი H1 თითო გვერდზე) |

### 6.3 Accessibility

| # | სტატუსი | ამოცანა |
|---|---------|---------|
| 27 | ⬜ | WCAG 2.1 AA compliance |
| 28 | ⬜ | Keyboard navigation |
| 29 | ⬜ | Focus indicators |
| 30 | ⬜ | ARIA labels (navigation, buttons, forms) |
| 31 | ⬜ | Color contrast ratios ≥ 4.5:1 |
| 32 | ⬜ | Skip navigation link |
| 33 | ⬜ | Form field labels & error announcements |

### 6.4 Security & Infrastructure

| # | სტატუსი | ამოცანა |
|---|---------|---------|
| 34 | ⬜ | HTTPS everywhere |
| 35 | ⬜ | Content Security Policy headers |
| 36 | ⬜ | XSS protection headers |
| 37 | ⬜ | Form CSRF protection |
| 38 | ⬜ | Rate limiting on contact form |
| 39 | ⬜ | Supabase RLS verified |
| 40 | ⬜ | Environment variables secured (.env.local) |
| 41 | ⬜ | Google Maps API key restricted |
| 42 | ⬜ | Admin route protection (auth middleware) |

### 6.5 Cross-browser & Responsive

| # | სტატუსი | ამოცანა |
|---|---------|---------|
| 43 | ⬜ | Chrome (latest 2 versions) |
| 44 | ⬜ | Firefox (latest 2 versions) |
| 45 | ⬜ | Safari (latest 2 versions) |
| 46 | ⬜ | Edge (latest 2 versions) |
| 47 | ⬜ | iOS Safari |
| 48 | ⬜ | Android Chrome |
| 49 | ⬜ | Mobile 320px – 480px |
| 50 | ⬜ | Tablet 768px – 1024px |
| 51 | ⬜ | Desktop 1280px+ |
| 52 | ⬜ | Large screens 1920px+ |

### 6.6 Analytics & Monitoring

| # | სტატუსი | ამოცანა |
|---|---------|---------|
| 53 | ⬜ | Google Analytics 4 setup |
| 54 | ⬜ | Google Search Console verification |
| 55 | ⬜ | Error monitoring (Sentry or similar) |
| 56 | ⬜ | Uptime monitoring |
| 57 | ⬜ | Contact form submission tracking |

### 6.7 Pre-Launch Final

| # | სტატუსი | ამოცანა |
|---|---------|---------|
| 58 | ⬜ | ყველა ბმულის ტესტირება (broken link checker) |
| 59 | ⬜ | ფორმის ტესტირება (submission + validation + success/error states) |
| 60 | ⬜ | ენის გადართვის ტესტირება (GE↔EN↔RU) |
| 61 | ⬜ | პაგინაციის ტესტირება (პროდუქცია, პროექტები, სიახლეები) |
| 62 | ⬜ | 404 გვერდი — ბრენდირებული |
| 63 | ⬜ | მისამართების redirect ტესტი (ძველი → ახალი) |
| 64 | ⬜ | Favicon ყველა ზომაში |
| 65 | ⬜ | Print stylesheet (საჭიროების შემთხვევაში) |
| 66 | ⬜ | DNS propagation check |
| 67 | ⬜ | SSL certificate valid |
| 68 | ⬜ | CDN cache purge |
| 69 | ⬜ | Final Lighthouse audit |
| 70 | ⬜ | Client sign-off |

---

## Appendix A: ტექნიკური სტეკი

| კომპონენტი | ტექნოლოგია |
|-----------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + SCSS Modules |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| CMS | Custom Admin Panel (Next.js) |
| Hosting | Hostinger VPS / Vercel |
| Images | Supabase Storage + Next/Image |
| i18n | File-based dictionaries (ge/en/ru) |
| Icons | Lucide React |
| Animations | Framer Motion |
| Slider | Swiper.js |
| Maps | Google Maps Embed API |
| Forms | React Hook Form + Zod validation |
| SEO | next-sitemap, JSON-LD |

## Appendix B: პროექტების თარიღის ბაგ-ფიქსი

**პრობლემა:** "Jan 1970" ნაჩვენებია პროექტების თარიღების ნაცვლად.
**მიზეზი:** `start_date` / `end_date` ველები null ან 0 timestamp (epoch) → `new Date(0)` = Jan 1 1970.
**გამოსწორება:**
1. DB-ში `start_date` / `end_date` nullable DATE ტიპად
2. Frontend-ზე null check: `date ? formatDate(date, lang) : '—'`
3. Admin CMS-ში date picker ვალიდაცია

## Appendix C: კონტაქტ ფორმის ბაგ-ფიქსი

**პრობლემა:** "an_error_has_occurred" შეტყობინება ნაჩვენებია გაგზავნისას.
**მიზეზი:** Server action error handling + Supabase RLS policy + missing validation.
**გამოსწორება:**
1. Client-side ვალიდაცია (Zod schema) ფორმის გაგზავნამდე
2. Server action-ში try/catch + structured error response
3. Supabase `contact_us` ცხრილზე INSERT policy: `USING (true)` ანონიმურისთვის
4. Success/Error states UI-ში — dictionary-based შეტყობინებები
5. Loading state გაგზავნის დროს

---

*დოკუმენტის ავტორი: GitHub Copilot — Senior UX/UI Designer + Web Strategist + Frontend Architect*
*ვერსია: 1.0 | თარიღი: 2026-02-21*
