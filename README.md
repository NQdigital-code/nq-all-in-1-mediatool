# NQ All-in-1 MediaTool (Tester build)

Convert, compress, clean up and transcribe your images, videos, documents and audio — **on your own PC**. Your files are never uploaded anywhere.

> **Status: free tester build (v1.0.0-tester.1).** It is being tested before a full release. Features, limits and pricing may change. Your feedback is what shapes it — see [Feedback](#feedback).
>
> **Testing period: 30 days from first use.** After that the app shows "Testing period is over. Contact kneelq@gmail.com to avail the pro version." and stops working.

## Download

Go to the **[Releases page](../../releases/latest)** and download `NQ-All-in-1-MediaTool-Tester-portable.exe` (about 237 MB).

No installation needed: double-click to run. The app unpacks itself every time you start it, so the first screen can take 10–30 seconds to appear. Please wait for the launch screen.

## What it does

| Tool | What you can do |
|---|---|
| Image Converter | PNG, JPG, WebP, AVIF, GIF, TIFF — also reads iPhone **HEIC** photos |
| Video Converter | MP4, MKV, MOV, WebM, AVI, GIF, or extract MP3 audio |
| Image to Text (OCR) | Read text from images and save as .txt (English) |
| Compress Image | Smaller files with no visible quality loss |
| Compress Video | H.265 re-encode, optional NVIDIA GPU encoding |
| Remove Background | AI cut-out for people and objects; transparent, white or colour background, square crop; optional edge smoothing for product and website images |
| **Refine** (after Remove Background) | Paint **Keep** / **Erase** over the result to fix any spot, with undo, zoom and an **Auto smooth edges** button |
| Enhance Image / Video | AI upscaling (Real-ESRGAN, uses your GPU) |
| PDF & Documents | PDF ⇄ text / Word / images (scanned pages use OCR) |
| Spreadsheets & Tables | Excel, CSV, ODS, HTML, JSON, PDF — including PDF tables to Excel |
| Speech to Text | Transcribe audio or video (Whisper), or record from your microphone; works with accents |
| **Batch mode** | Add a whole folder; many files are processed in one go |

## Requirements

- Windows 10 or 11, 64-bit
- 8 GB RAM recommended
- About 1 GB free disk space (the app unpacks itself while it runs)
- A graphics card that supports Vulkan is needed for image/video enhancement (most PCs from the last several years do)
- Internet is **only** needed to download optional AI models the first time you use them (see below)
- Please keep your PC's date and time correct: setting the clock back locks the app

## First-time notes

**Windows warning ("Windows protected your PC").** The tester build is not code-signed yet. Click **More info → Run anyway**. You can confirm your download is genuine by comparing its SHA-256 checksum with the one on the release page:

```powershell
Get-FileHash .\NQ-All-in-1-MediaTool-Tester-portable.exe -Algorithm SHA256
```

**One-time model downloads.** To keep the download small, these are fetched the first time you pick them, then work offline afterwards:

| When you use… | Download |
|---|---|
| Remove Background | 196 MB (two models: 26 MB + 170 MB) |
| Speech to Text → "Better" accuracy (default) | 181 MB |
| Speech to Text → "High accuracy" (best for accents) | 574 MB |

## Known limitations (tester build)

- Background removal works best on clear subjects. Dark clothing with white graphics, hair that touches the edge of the picture, and very busy backgrounds can leave imperfect spots — use **Refine** to fix them.
- Speech to Text runs on the CPU, so long recordings take time ("High accuracy" is the slowest).
- Video enhancement is slow and needs a lot of free disk space.
- PDF-to-Word keeps text only, not layout or fonts. PDF tables work best on text-based (not scanned) PDFs.
- Word support is `.docx` only (not old `.doc`).
- Windows only for now.

## Privacy

The app has **no tracking, no analytics and no accounts**. Files you process stay on your PC. The only network activity is the optional model downloads above, and email if you choose to send feedback.

## Feedback

Please tell us what worked and what didn't:

- Click **Send feedback** inside the app, or email **kneelq@gmail.com**
- Useful details: what you were doing, what happened, your Windows version and RAM

## Legal

- Tester terms: [TERMS.md](TERMS.md)
- Open-source components and licenses: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)

© 2026 Neil Quigao. All rights reserved.
