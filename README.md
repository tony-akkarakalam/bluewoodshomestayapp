# Bluewoods Homestay Website

Production-ready static Next.js website for **Bluewoods Homestay** with Tailwind CSS, Framer Motion, and Swiper.

## Run locally

```bash
npm install
npm run dev
```

## Production build (static export)

```bash
npm run build
```

Static output is generated in the `out/` directory (configured via `output: "export"`).

## Image folders

Replace or add your final property photos in:

- `public/images/hero/hero1.jpg`
- `public/images/hero/hero2.jpg`
- `public/images/hero/hero3.jpg`
- `public/images/logo/logo.png`
- `public/images/owner/owner.jpg`
- `public/images/exterior/`
- `public/images/rooms/`
- `public/images/bathroom/`
- `public/images/views/`
- `public/images/common-area/`
- `public/images/balcony-garden/`
- `public/images/night-view/`

Gallery images are auto-discovered from the folders above during build.
