<div align="center">

<img width="1898" height="936" alt="ByteSpace Hero Preview" src="https://github.com/user-attachments/assets/2ee00d5d-5e41-43b1-b2e4-781beeae5462" />

# ByteSpace 🚀
### Modern Tech & Creative Learning Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.3.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Go](https://img.shields.io/badge/Go-1.22+-00ADD8?style=for-the-badge&logo=go)](https://golang.org/)
[![Docker](https://img.shields.io/badge/Docker-Images_Ready-2496ED?style=for-the-badge&logo=docker)](https://github.com/shaiadul/byteSpace/pkgs/container/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?style=for-the-badge&logo=github-actions)](https://github.com/features/actions)

<p align="center">
  A high-performance, aesthetically crafted digital learning platform engineered with Next.js 16, React 19, Framer Motion, and Go. Designed for creators, engineers, and digital innovators.
</p>

[Docker Images](#-docker-images-github-container-registry) •
[Docker Compose Quickstart](#-docker-compose-quickstart) •
[Local Development](#-local-development-setup) •
[Features](#-key-features) •
[Project Structure](#-project-structure) •
[CI/CD Pipeline](#-cicd--container-registry) •
[Documentation](#-documentation)

</div>

---

## 📦 Docker Images (GitHub Container Registry)

Every push to the `main` branch automatically compiles and publishes optimized, production-ready multi-stage Docker images to **GitHub Container Registry (GHCR)**:

| Service | Component | Registry Image URL | Compressed Size | Port | Security |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Frontend** | Next.js 16 (Standalone) | `ghcr.io/shaiadul/doin-tech:latest` | **105 MB** | `3000` | Non-root `nextjs:nodejs` |
| **Backend** | Go Microservice | `ghcr.io/shaiadul/backend:latest` | **6.54 MB** | `8080` | Non-root `appuser:appgroup` |

### 1. Pull Images Directly from GHCR

```bash
# Pull the Next.js Frontend Image
docker pull ghcr.io/shaiadul/doin-tech:latest

# Pull the Go Backend Image
docker pull ghcr.io/shaiadul/backend:latest
```

### 2. Run Containers Individually with `docker run`

You can run each service independently without cloning the entire source code:

```bash
# 1. Run the Go Backend
docker run -d \
  --name bytespace-backend \
  -p 8080:8080 \
  -e PORT=8080 \
  --restart unless-stopped \
  ghcr.io/shaiadul/backend:latest

# 2. Run the Next.js Frontend
docker run -d \
  --name bytespace-frontend \
  -p 3000:3000 \
  -e PORT=3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_API_URL=http://localhost:8080 \
  --restart unless-stopped \
  ghcr.io/shaiadul/doin-tech:latest
```

---

## 🐳 Docker Compose Quickstart

Run both the frontend and backend together with automated networking, dependency ordering, and health checks.

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) (v20+)
- [Docker Compose](https://docs.docker.com/compose/) (v2+)

### Step-by-Step Instructions

1. **Clone the repository:**
   ```bash
   git clone git@github.com:shaiadul/byteSpace.git
   cd byteSpace
   ```

2. **Start all services in detached mode:**
   ```bash
   docker compose up --build -d
   ```
   *Docker Compose will compile the multi-stage builds locally for both services and attach them to the shared `bytespace-network` bridge.*

3. **Verify container health and status:**
   ```bash
   docker compose ps
   ```
   Expected output:
   ```plaintext
   NAME                 IMAGE           STATUS                    PORTS
   bytespace-backend    task-backend    Up (healthy)              0.0.0.0:8080->8080/tcp
   bytespace-frontend   task-frontend   Up (healthy)              0.0.0.0:3000->3000/tcp
   ```

4. **Access the running services:**
   - 🌐 **Frontend (Next.js Application)**: [http://localhost:3000](http://localhost:3000)
   - ⚙️ **Backend Health Endpoint**: [http://localhost:8080/health](http://localhost:8080/health)

5. **Stop and remove containers:**
   ```bash
   docker compose down
   ```

> [!TIP]
> **Custom Port Override**: If port `3000` or `8080` is already in use by another process on your machine, pass environment variables:
> ```bash
> FRONTEND_PORT=3002 BACKEND_PORT=8081 docker compose up -d
> ```

---

## 💻 Local Development Setup

If you prefer running services directly on your host machine for development without Docker:

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

# Start development server with Turbopack
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Run production build: `npm run build`
- Start production server: `npm run start`

---

### 2. Backend Setup (`backend`)

```bash
# Navigate to backend directory
cd backend

# Run the Go HTTP server
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

## ✨ Key Features

- **🎨 Modern Aesthetic Design**: Curated brand identity using Brand Blue (`#003be2`) and vibrant Brand Lime (`#ccfc00`), with `Poppins` for titles and `Satoshi` for body text.
- **✨ Smooth Micro-Animations**: Lightweight, GPU-accelerated floating 3D elements, staggered scroll reveals, and buttery App Router page transitions with Framer Motion.
- **🔍 Comprehensive SEO & Rich Snippets**:
  - Dynamic XML Sitemap (`/sitemap.xml`) & `robots.txt`
  - Structured Data (JSON-LD) for `EducationalOrganization`, `WebSite` (with `SearchAction`), and `Course` rich snippets
  - Crisp custom SVG Favicon and Apple Touch Icon generated from the official brand mark
  - Full OpenGraph & Twitter Card previews
- **⚡ Next.js 16 Standalone Output**: Optimized Docker image reduced from ~1GB to just **105MB**.
- **🐹 High-Performance Go Backend**: Lightweight microservice with `/health` endpoints, CORS support, and graceful shutdowns (**6.54MB** compressed image).
- **🐳 Multi-Stage Docker & Compose**: Production-ready orchestrations with health checks and non-root security.
- **🚀 Automated GitHub Actions CI/CD**: Automatically builds and hosts multi-stage container images on GitHub Container Registry (GHCR) on every push to `main`.

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
- **Trigger**: Runs on every `push` to the `main` branch and pull requests.
- **Tagging**: Generates semantic Docker tags (`latest`, branch name, git short SHA).
- **Caching**: Builds multi-stage images using GitHub Actions layer caching (`type=gha`).
- **Registry Publishing**: Authenticates and publishes images directly to **GitHub Container Registry (GHCR)**:
  - Frontend: `ghcr.io/shaiadul/doin-tech:latest`
  - Backend: `ghcr.io/shaiadul/backend:latest`

---

## 📖 Documentation

For an in-depth breakdown of the technology choices, typography, color tokens, Framer Motion implementation, and Schema.org JSON-LD SEO configuration, see [document.md](document.md).

---

## 📄 License

This project is licensed under the MIT License.
