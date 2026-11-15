# Chaos VFX Studio — Shopify Hydrogen

## Installation
```bash
npm install @mediapipe/tasks-vision
```

Place `ChaosVfxStudio.jsx` in `app/components/`.

## Usage
```jsx
import ChaosVfxStudio from '~/components/ChaosVfxStudio';

export default function VideoPage() {
  return (
    <main>
      <ChaosVfxStudio videoSrc="https://YOUR-CDN.example/kass-christmas.mp4" />
    </main>
  );
}
```

The MP4 must be reachable by the browser. If hosted on another origin, configure CORS to allow your Shopify storefront domain. The file must be 16:9 for the 1280×720 compositor geometry to align as intended.

## Included
- Client-only initialization compatible with Hydrogen SSR.
- Low-pass bass analysis (20–120 Hz), 150 ms moving baseline, deterministic onset impulses and 85–90 ms cooldown.
- Beat-drop purple flame layer driven by bass energy.
- MediaPipe FaceLandmarker loaded dynamically in VIDEO mode; face landmarks are smoothed and held for up to six missed frames.
- Horns in the snowy alley, two eye-anchored X marks in the gaming finale, three final intensity stages.
- Intro negative/thermal flash and CRT collapse from 142.8 s through 144 s.

## Important implementation note
This is a real-time browser compositor/preview component. It does not encode or download a rendered MP4. To export, capture the canvas plus source audio with a MediaRecorder/export pipeline or render the same timing/effects in a video pipeline. The source MP4 is not modified.
