# ByteSpace — Technical Architecture & Documentation Specification

This document provides a comprehensive technical overview of the architecture, tech stack, design tokens, motion system, search engine optimization (SEO), containerization, and CI/CD pipelines implemented in **ByteSpace**.

---

## 1. System Overview & Architecture

ByteSpace is structured as a decoupled full-stack platform:
- **Frontend (`doin-tech`)**: Server-side rendered (SSR) and statically generated (SSG) modern web application built with **Next.js 16 (Turbopack)** and **React 19**, styled using **Tailwind CSS v4** and animated with **Framer Motion**.
- **Backend (`backend`)**: High-performance, lightweight microservice written in **Go (Golang)** providing health monitoring, API endpoints, and CORS middleware for cross-origin client integration.
- **Containerization**: Optimized multi-stage Docker builds orchestrated via **Docker Compose**.
- **Deployment & CI/CD**: Automated GitHub Actions workflow publishing multi-stage images to **GitHub Container Registry (GHCR)** on every push to the `main` branch.

```
                      ┌──────────────────────────────────────────────┐
                      │                 Client Browser               │
                      └───────────────────────┬──────────────────────┘
                                              │
                         ┌────────────────────┴────────────────────┐
                         │                                         │
              HTTP / Static Assets                          REST API Calls
                         │                                         │
                         ▼                                         ▼
            ┌─────────────────────────┐               ┌─────────────────────────┐
            │   Frontend (Next.js)    │               │      Backend (Go)       │
            │   Port: 3000 (Internal) │               │   Port: 8080 (Internal) │
            │   - React 19 / Tailwind │               │   - Standard Library    │
            │   - Framer Motion       │               │   - CORS Middleware     │
            │   - JSON-LD / SEO       │               │   - Health Monitoring   │
            │   - Standalone Output   │               │   - Static Binary       │
            └─────────────────────────┘               └─────────────────────────┘
                         ▲                                         ▲
                         │                                         │
                         └────────────────────┬────────────────────┘
                                              │
                                   ┌──────────────────────┐
                                   │ Docker Compose Bridge│
                                   │ (bytespace-network)  │
                                   └──────────────────────┘
```

---

## 2. Technology Stack & Dependencies

### Frontend (`doin-tech`)

| Package / Technology | Version | Purpose / Role |
| :--- | :--- | :--- |
| **Next.js** | `16.3.6` (Turbopack) | Core framework providing App Router, SSG, SSR, dynamic routes, and standalone output |
| **React & React DOM** | `19.2.8` | Core UI library |
| **TypeScript** | `5.0+` | End-to-end static type safety |
| **Tailwind CSS** | `^4.0.0` | Utility-first styling engine with `@theme` token definitions |
| **Framer Motion** | `^13.4.6` | Hardware-accelerated animations (floating elements, scroll reveals, page transitions) |
| **Tabler Icons** | `^3.48.0` | Comprehensive icon library |
| **@base-ui/react** | `^1.8.0` | Accessible unstyled primitives |
| **Input OTP** | `^1.5.0` | Accessible 6-digit OTP verification inputs |
| **Embla Carousel React**| `^8.6.0` | Touch-enabled responsive carousels |
| **class-variance-authority**| `^0.7.1` | Component variant composition |

### Backend (`backend`)

| Technology | Version | Purpose / Role |
| :--- | :--- | :--- |
| **Go (Golang)** | `1.22+` | Compiled backend language |
| **net/http** | Standard Library | Native HTTP server with timeouts and CORS handling |
| **encoding/json** | Standard Library | High-speed JSON serialization for API responses |
| **os/signal** | Standard Library | Graceful shutdown handling for zero-downtime container terminations |

---

## 3. Design System & Typography

### Color Palette

The color system is defined via CSS custom properties and mapped into Tailwind CSS tokens:

```css
:root {
  --color-brand-blue: #003be2;  /* Primary brand blue */
  --color-brand-lime: #ccfc00;  /* Secondary vibrant lime accent */
  --background: #ffffff;
  --foreground: #0f172a;
}
```

- **Brand Blue (`#003be2`)**: Hero backgrounds, primary branding, CTA headers, and button active states.
- **Brand Lime (`#ccfc00`)**: Call-to-action buttons, search triggers, category icons, progress indicators, and visual accents.
- **Muted Slate (`#64748b`)**: Secondary body text, metadata labels, and subtle borders.

### Global Typography Hierarchy

Typography follows an intentional dual-font pairing optimized through Next.js font loaders (`next/font/google` and `next/font/local`):

1. **Heading Font — Poppins (Google Fonts)**
   - Used for all major headers, hero banners, section titles, and modal headers.
   - Weights: `400`, `500`, `600`, `700`.
   - Variable: `--font-poppins`.
   - Typography specs: `font-weight: 600`, `line-height: 120%`, `letter-spacing: -1%`.

2. **Body & Description Font — Satoshi (Local WOFF2 Variable)**
   - Used for all section descriptions, card subtitles, inputs, buttons, and navigation links.
   - File: `app/fonts/Satoshi-Variable.woff2`.
   - Variable: `--font-satoshi`.
   - Typography specs: `font-weight: 400`, `font-size: 18px` (desktop), `line-height: 160%`, `letter-spacing: 0%`.

---

## 4. Framer Motion & Micro-Animation System

The motion system is encapsulated in `components/motion/motion-elements.tsx` to provide reusable, GPU-accelerated micro-animations without layout thrashing.

### 1. `FloatingElement`
- **Mechanism**: Animates only composite properties (`transform: translateY` and `rotate`).
- **Easing**: `easeInOut` with `repeat: Infinity` and `repeatType: "mirror"`.
- **Performance**: Runs purely on the GPU compositor thread (60/120 fps).
- **Application**:
  - Hero Section 3D shapes: `Mask Group.png`, `Cone.png`, `Frame.png`, `Cone (1).png`.
  - Hero UI badges: "UI/UX Design" badge and "Learning Progress 55%" badge.
  - CTA Banner floating shapes: 7 floating cones and frames with staggered timing (4.2s to 5.8s).
  - Auth Side Art: Lime ring, pyramid, spring element, and student preview cards.

### 2. `ScrollFadeIn`
- **Mechanism**: Subtle entrance translation (`y: 16px -> 0px`) and opacity (`0 -> 1`).
- **Timing**: `duration: 0.55s - 0.6s`, cubic-bezier easing `[0.22, 1, 0.36, 1]`.
- **Viewport**: `viewport={{ once: true, margin: "-50px" }}` ensures animations trigger naturally before scrolling into view and do not re-trigger.

### 3. `StaggerContainer` & `StaggerItem`
- **Mechanism**: Orchestrates staggered entrance animations (0.06s to 0.08s step) across child items.
- **Application**: Course cards, category grids, and testimonial cards.

### 4. Page Transitions (`app/template.tsx`)
- Leveraging the Next.js App Router `template.tsx` convention, every page route change (`/`, `/courses`, `/signin`, `/signup`) renders with an instant, smooth fade and 8px upward lift:
  ```tsx
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
  ```

---

## 5. Next.js SEO & Metadata Architecture

### 1. Dynamic XML Sitemap & Robots.txt
- **`app/sitemap.ts`**: Dynamically generates `/sitemap.xml` containing all static pages plus every course detail page (`/courses/[id]`) with proper `changeFrequency`, `priority`, and `lastmod` dates.
- **`app/robots.ts`**: Automatically renders `/robots.txt` granting crawling access and pointing bots to the sitemap endpoint.

### 2. PWA Manifest & Custom Brand Favicon
- **`app/manifest.ts`**: Generates `/manifest.webmanifest` defining app name, standalone display mode, and brand color `#003be2`.
- **`app/icon.svg`**: Crisp vector favicon centered on a Brand Blue squircle with the exact Brand Lime geometric symbol from the auth logo.
- **`app/apple-icon.svg`**: 180×180 high-DPI iOS home screen touch icon.

### 3. Google Rich Results Schema.org (JSON-LD)
All structured data components are located in `components/seo/json-ld.tsx`:
- **`OrganizationJsonLd`**: Declares ByteSpace as an `EducationalOrganization` with official logo, URL, and social profiles.
- **`WebsiteJsonLd`**: Declares `WebSite` with Google Sitelinks `SearchAction` mapped to `/courses?q={search_term_string}`.
- **`CourseJsonLd`**: Injects full `schema.org/Course` specification on course pages (instructor, pricing in USD, ratings, level, duration).
- **`CourseListJsonLd`**: Generates `schema.org/ItemList` for carousel and catalog search indexing.
- **`BreadcrumbJsonLd`**: Generates `schema.org/BreadcrumbList` for breadcrumb snippets in search engine results pages (SERPs).

---

## 6. Authentication System & Navigation

- **Components**:
  - `components/auth/signin-form.tsx`
  - `components/auth/signup-form.tsx`
  - `components/auth/forgot-password-form.tsx`
  - `components/auth/otp-form.tsx`
  - `components/auth/auth-social-buttons.tsx`
  - `components/auth-modal.tsx`
- **Client-Side Navigation**: All form submissions utilize Next.js's native `useRouter.push("/courses")` from `next/navigation` to preserve client-side state and provide instant page transitions without full browser reloads.
- **Cascading Render Prevention**: In `auth-modal.tsx`, state adjustments are executed during render using `prevDefaultMode` checks, eliminating React 19 `useEffect` cascading render warnings.
- **Social Auth**: Rounded squircles (`rounded-[22px]`) featuring inline SVGs for Google, Facebook, and Apple.

---

## 7. Backend Microservice Architecture

The Go backend (`backend/main.go`) is engineered for low latency, zero overhead, and resilience:

### Endpoints
- `GET /health`: JSON response confirming service health, version, and UTC timestamp.
- `GET /api/health`: Alias health check for API gateway routing.
- `OPTIONS *`: Automatic CORS preflight resolution.

### Server Configuration
- `ReadTimeout: 10s`, `WriteTimeout: 10s`, `IdleTimeout: 60s`.
- Graceful shutdown handles `SIGINT` / `SIGTERM` signals with a 5-second context timeout to finish ongoing requests.

---

## 8. Docker Multi-Stage Containerization

Both services are containerized using multi-stage Dockerfiles to minimize final image footprint and eliminate build-time dependencies from production.

### Go Backend (`backend/Dockerfile`)
1. **Stage 1 (Builder)**: `golang:1.24-alpine` builds static binary with `CGO_ENABLED=0` and `-ldflags="-s -w -extldflags '-static'"`.
2. **Stage 2 (Runner)**: `alpine:3.20` with non-root user `appuser:appgroup` and `ca-certificates`.
- **Resulting Image**: **6.54 MB** compressed.

### Next.js Frontend (`doin-tech/Dockerfile`)
1. **Stage 1 (Base)**: `node:22-alpine` with `libc6-compat`.
2. **Stage 2 (Deps)**: `npm ci` installs production dependencies deterministically.
3. **Stage 3 (Builder)**: `npm run build` compiles standalone bundle via `output: "standalone"`.
4. **Stage 4 (Runner)**: Minimal alpine image running as non-root user `nextjs:nodejs` copying only `.next/standalone`, public assets, and static files.
- **Resulting Image**: **105 MB** compressed (down from ~1 GB standard node image).

### Docker Compose Orchestration (`docker-compose.yml`)
- Service dependency: `frontend` waits for `backend` to report `service_healthy`.
- Health checks: Configured with automated `wget` probes.
- Port parameterization: `${FRONTEND_PORT:-3000}:3000` and `${BACKEND_PORT:-8080}:8080`.

---

## 9. GitHub Actions CI/CD Pipeline

The workflow defined in `.github/workflows/docker-publish.yml` executes on every push to `main`:

```yaml
name: Build and Publish Docker Images to GHCR
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:
```

### Steps:
1. **Checkout & Buildx**: Checks out code and prepares Docker Buildx with QEMU multi-architecture support.
2. **Name Sanitization**: Normalizes GitHub repository owner to lowercase for GHCR compliance.
3. **Authentication**: Authenticates securely using the automatic `${{ secrets.GITHUB_TOKEN }}` with `packages: write` permission.
4. **Metadata Extraction**: Generates tags (`latest`, branch name, and commit SHA).
5. **Build & Push**: Builds and publishes both images simultaneously to:
   - `ghcr.io/<owner>/backend`
   - `ghcr.io/<owner>/doin-tech`
6. **Cache**: Utilizes GitHub Actions layer cache (`type=gha`) for fast incremental builds.

---

## 10. Verification & Validation Checklist

- [x] **Next.js Standalone Build**: Verified with `npm run build` (exit code `0`, clean TypeScript compilation).
- [x] **Go Static Compilation**: Verified with `go build -o /dev/null main.go` (exit code `0`).
- [x] **Docker Multi-Stage Build**: Both images built locally via `docker compose build`.
- [x] **Container Runtime & Networking**: Verified via `docker compose up -d` with healthy status.
- [x] **Sitemap & Robots**: Verified on `http://localhost:3000/sitemap.xml` and `/robots.txt`.
- [x] **Favicon & Apple Icons**: High-res SVG favicon active on `/icon.svg` and `/apple-icon.svg`.
- [x] **JSON-LD Structured Data**: Verified server-side `<script type="application/ld+json">` output.