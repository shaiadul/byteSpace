<div align="center">

<img width="1898" height="936" alt="ByteSpace Hero Preview" src="https://github.com/user-attachments/assets/2ee00d5d-5e41-43b1-b2e4-781beeae5462" />

# ByteSpace 🚀
### Modern Tech & Creative Learning Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.3.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Go](https://img.shields.io/badge/Go-1.22+-00ADD8?style=for-the-badge&logo=go)](https://golang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?style=for-the-badge&logo=github-actions)](https://github.com/features/actions)

<p align="center">
  A high-performance, aesthetically crafted digital learning platform engineered with Next.js 16, React 19, Framer Motion, and Go. Designed for creators, engineers, and digital innovators.
</p>

[Features](#-key-features) •
[Docker Quickstart](#-docker-quickstart-recommended) •
[Local Development](#-local-development-setup) •
[Project Structure](#-project-structure) •
[CI/CD & GHCR](#-cicd--container-registry) •
[Documentation](#-documentation)

</div>

---

## ✨ Key Features

- **🎨 Modern Aesthetic Design**: Curated brand identity using Brand Blue (`#003be2`) and vibrant Brand Lime (`#ccfc00`), typography powered by `Poppins` for headings and `Satoshi` for body text.
- **✨ Smooth Micro-Animations**: Lightweight, GPU-accelerated floating 3D elements, staggered scroll reveals, and buttery App Router page transitions with Framer Motion.
- **🔍 Comprehensive SEO & Rich Snippets**:
  - Dynamic XML Sitemap (`/sitemap.xml`) & `robots.txt`
  - Structured Data (JSON-LD) for `EducationalOrganization`, `WebSite` (with `SearchAction`), and `Course` rich snippets
  - Crisp custom SVG Favicon and Apple Touch Icon generated from the official brand mark
  - Full OpenGraph & Twitter Card previews
- **⚡ Next.js 16 Standalone Output**: Optimized Docker image reduced from ~1GB to just **105MB**.
- **🐹 High-Performance Go Backend**: Lightweight microservice with `/health` endpoints, CORS support, and graceful shutdowns (**6.5MB** compressed image).
- **🐳 Multi-Stage Docker & Compose**: Production-ready orchestrations with health checks and non-root security.
- **🚀 Automated GitHub Actions CI/CD**: Automatically builds and hosts multi-stage container images on GitHub Container Registry (GHCR) on every push to `main`.

---

## 🐳 Docker Quickstart (Recommended)

Run both the frontend and backend in production-optimized containers with a single command.

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) (v20+)
- [Docker Compose](https://docs.docker.com/compose/) (v2+)

### Run with Docker Compose

1. **Clone the repository:**
   ```bash
   git clone git@github.com:shaiadul/byteSpace.git
   cd byteSpace
   ```

2. **Start all services:**
   ```bash
   docker compose up --build -d
   ```

3. **Verify running containers:**
   ```bash
   docker compose ps
   ```

4. **Access the applications:**
   - 🌐 **Frontend (Next.js)**: [http://localhost:3000](http://localhost:3000)
   - ⚙️ **Backend API (Go)**: [http://localhost:8080/health](http://localhost:8080/health)

5. **Stop containers:**
   ```bash
   docker compose down
   ```

> [!TIP]
> If port `3000` or `8080` is in use on your system, you can override ports with environment variables:
> ```bash
> FRONTEND_PORT=3002 BACKEND_PORT=8081 docker compose up -d
> ```

---

## 💻 Local Development Setup

If you prefer running services directly on your host machine for development:

### Prerequisites
- **Node.js**: v20+ or v22+
- **npm**: v10+
- **Go**: v1.22+ (for backend)

---

### 1. Frontend Setup (`doin-tech`)

```bash
# Navigate to the frontend directory
cd doin-tech

# Install dependencies
npm install

# Start development server
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Build production bundle: `npm run build`
- Run production server locally: `npm run start`

---

### 2. Backend Setup (`backend`)

```bash
# Navigate to backend directory
cd backend

# Run the Go server
go run main.go
```

- The API server will start on [http://localhost:8080](http://localhost:8080).
- Health check verification:
  ```bash
  curl http://localhost:8080/health
  ```
  Expected output:
  ```json
  {"status":"ok","service":"bytespace-backend","version":"1.0.0"}
  ```

---

## 📁 Project Structure

```plaintext
byteSpace/
├── .github/
│   └── workflows/
│       └── docker-publish.yml     # Automated GHCR CI/CD pipeline
├── backend/                       # Go Backend Service
│   ├── Dockerfile                 # Multi-stage static Go binary build (Alpine runner)
│   ├── .dockerignore
│   ├── go.mod                     # Go module definitions
│   └── main.go                    # HTTP server, health check & CORS
├── doin-tech/                     # Next.js 16 Web Application
│   ├── app/                       # App Router (pages, layouts, templates, sitemap)
│   │   ├── courses/               # Course catalog & dynamic course detail pages
│   │   ├── signin/ & signup/      # Authentication pages
│   │   ├── icon.svg               # High-res SVG favicon (brand mark)
│   │   ├── apple-icon.svg         # iOS Touch Icon
│   │   ├── sitemap.ts             # Dynamic XML sitemap generator
│   │   ├── robots.ts              # Search engine directives
│   │   ├── manifest.ts            # PWA Web App manifest
│   │   └── template.tsx           # Page transition motion wrapper
│   ├── components/                # Modular UI components
│   │   ├── auth/                  # Auth forms (signin, signup, otp, social buttons)
│   │   ├── course/                # Course tabs, video player, sidebar
│   │   ├── motion/                # FloatingElement, ScrollFadeIn, Stagger
│   │   ├── sections/              # Hero, Courses, Categories, Growth, CTA, Testimonials
│   │   ├── seo/                   # JSON-LD Schema.org structured data
│   │   └── ui/                    # Reusable primitives (buttons, inputs, dialogs)
│   ├── public/                    # Static assets and images
│   ├── Dockerfile                 # Multi-stage standalone Next.js build
│   ├── .dockerignore
│   ├── next.config.ts             # Standalone output configuration
│   └── package.json
├── docker-compose.yml             # Orchestration for local and production deployment
├── document.md                    # In-depth architectural & technical specification
└── README.md
```

---

## 🚀 CI/CD & Container Registry

The repository includes an automated GitHub Actions workflow in [`.github/workflows/docker-publish.yml`](.github/workflows/docker-publish.yml).

### Workflow Capabilities:
- Triggers on every `push` to the `main` branch.
- Generates semantic Docker tags (`latest`, branch name, git short SHA).
- Builds optimized multi-stage images with GitHub Actions layer caching (`type=gha`).
- Authenticates and publishes images directly to **GitHub Container Registry (GHCR)**:
  - Frontend: `ghcr.io/<owner>/doin-tech:latest`
  - Backend: `ghcr.io/<owner>/backend:latest`

---

## 📖 Documentation

For an in-depth breakdown of the technology choices, typography, color tokens, Framer Motion implementation, and Schema.org JSON-LD SEO configuration, see [document.md](document.md).

---

## 📄 License

This project is licensed under the MIT License.
