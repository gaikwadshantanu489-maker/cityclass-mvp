# CityClass MVP

## What is included
- Home page
- Camera/image upload
- Gemini vision analysis through `/api/analyze`
- Structured AI lesson
- Micro challenge and feedback
- LocalStorage Learning Journal
- Basic XP
- Responsive UI

## Run locally

1. Install Node.js 20+.
2. Copy `.env.example` to `.env.local`.
3. Put your Gemini API key in `.env.local`:
   `GEMINI_API_KEY=...`
4. Run:
   `npm install`
   `npm run dev`
5. Open http://localhost:3000

The Gemini API key is server-side only and is never placed in browser code.

## Competition demo
Use a clear object such as a traffic signal, bridge, plant, vehicle, electric pole, or electronic component. The flow is:
Scan -> Analyze -> Learn -> Challenge -> Feedback -> Journal
