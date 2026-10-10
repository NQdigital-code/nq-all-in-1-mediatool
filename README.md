# NQ All-in-1 MediaTool

**By Neil Quigao.** Convert, compress, clean up and transcribe your images, videos, documents and audio, **on your own PC**. Your files are never uploaded anywhere.

**Website:** [https://nqdigital-code.github.io/nq-all-in-1-mediatool/](https://nqdigital-code.github.io/nq-all-in-1-mediatool/)

Free to use, with no account. A **Pro key** unlocks the extra tools and removes the daily limits (see [Free and Pro](#free-and-pro)).

## Download

Go to the **[Releases page](../../releases/latest)** and download `NQ-All-in-1-MediaTool-portable.exe` (about 150 MB). Check the SHA-256 checksum in `SHA256SUMS.txt` (see below).

No installation: double-click to run. The app unpacks itself every time you start it, so the first screen can take 10 to 30 seconds to appear on a slower PC. Please wait for the launch screen to finish.

## What it does (22 tools)

| Group | Tool | What you can do |
|---|---|---|
| Images | Image Converter | PNG, JPG, WebP, AVIF, GIF, TIFF. Also reads iPhone **HEIC** photos. A file already in the chosen format is skipped. |
| Images | Compress Image | Smaller files with no visible quality loss |
| Images | Crop | Square, 4:5, 16:9 or any shape, with a live box on the picture. Works on a whole folder. |
| Images | Image to Text (OCR) | Read the text in a photo or scan (English) |
| Images | Remove Background | Cuts out people, pets and products. Transparent, white or colour background. **Refine** brush to fix any spot. |
| Images | Enhance Image (Pro) | AI upscaling for small pictures |
| Images | Watermark Printer (Pro) | Stamp your name or logo on a whole folder |
| Images | Product Studio (Pro) | Clean, square listing photos with a soft shadow |
| Images | ID Photo Maker (Pro, **beta**) | Finds the face and prepares ID pictures and print sheets |
| Images | Smart Crop (Pro, **beta**) | Finds the product and sizes it the same in every picture |
| Video & audio | Video Converter | MP4, MKV, MOV, WebM, AVI or GIF. A file already in the chosen format is skipped. |
| Video & audio | Extract Audio | Save the sound of a video as MP3, M4A, WAV, FLAC or OGG, or copy it without re-encoding |
| Video & audio | Compress Video | H.265 re-encode, optional NVIDIA GPU encoding |
| Video & audio | Speech to Text | Transcribe audio or video (Whisper), or record from your microphone. Works with accents. |
| Video & audio | Enhance Video (Pro) | AI upscaling for low-resolution footage |
| Video & audio | Subtitle Maker (Pro) | Writes captions, lets you fix them, then prints them onto the video |
| Video & audio | Silence Remover (Pro) | Cuts the dead air out of recordings |
| Video & audio | Voice Cleanup (Pro) | Less hiss and hum, even volume |
| Video & audio | Text to Speech (Pro) | Voiceovers from your script, using the voices installed on your PC |
| Documents | PDF & Documents | PDF to text, Word or images, and Word, text or images to PDF. Scanned pages are read with OCR. |
| Documents | Spreadsheets & Tables | Excel, CSV, ODS, HTML, JSON and PDF, including tables from a PDF into Excel |
| Documents | PDF Toolkit (Pro) | Join, split, rotate and sign PDFs |

**Beta** means the tool works but its results are not always ideal yet, so please check each result before you rely on it.

Every tool handles many files at once ("batch"). Results are shown as a preview first: press **Save** to keep one or **Retry** to run it again with different settings, and nothing reaches your folder until you save. You can turn this off with the "Review before saving" box.

## Free and Pro

| | Free | Pro |
|---|---|---|
| Price | Free, no account | Free during early access (one key per PC, limited time) |
| Remove Background | 10 a day | Unlimited |
| Speech to Text | Clips up to 2 minutes | Any length |
| Tools marked (Pro) above | Locked | Unlocked |

To get Pro: open the app, click **Pro** at the bottom of the left menu, copy your **Device ID** and send it to us (see the website). We reply with a key; paste it into the same window. The key works offline and is tied to your PC.

## Requirements

- Windows 10 or 11, 64-bit
- 8 GB RAM recommended (16 GB or more for the High detail background removal)
- About 1 GB free disk space (the app unpacks itself while it runs)
- A graphics card that supports Vulkan for Enhance Image and Enhance Video (most PCs from the last several years do)
- Internet is only needed to download the optional AI models below the first time you use them, and for an occasional check that a Pro key has not been cancelled. Everything else works offline.
- Please keep your PC's date and time correct.

## First-time notes

**Windows warning ("Windows protected your PC").** The app is not code-signed yet, so Windows may warn you. Click **More info**, then **Run anyway**. You can confirm your download is genuine by comparing its SHA-256 checksum with `SHA256SUMS.txt`:

```powershell
Get-FileHash .\NQ-All-in-1-MediaTool-portable.exe -Algorithm SHA256
```

**One-time model downloads.** To keep the app small, these are fetched the first time you pick them and then work offline:

| When you use | Download |
|---|---|
| Remove Background, Standard detail | 192 MB |
| Remove Background, High detail | 224 MB |
| Enhance Image, Photo / Anime | 33 MB / 9 MB |
| Speech to Text, Standard accuracy | 60 MB |
| Speech to Text, Better accuracy | 190 MB |
| Speech to Text, High accuracy (best for accents) | 574 MB |

The app starts each tool on the setting that suits your PC: a strong PC begins on High detail and High accuracy, a weaker one on the lighter settings. You can change any setting.

## Known limitations

- Background removal works best on clear subjects. Glass, smoke, very fine hair and fur can come out rough: use High detail and the Refine brush.
- ID Photo Maker and Smart Crop are in **beta**: check the framing of every result.
- Speech to Text runs on the CPU, so long recordings take time (High accuracy is the slowest).
- Video enhancement is slow and needs a lot of free disk space.
- PDF to Word keeps text only, not layout or fonts. PDF tables work best on text-based (not scanned) PDFs.
- Word support is `.docx` only (not old `.doc`).
- Windows only for now.

## Privacy

The app has **no tracking, no analytics and no accounts**. Files you process stay on your PC. The only network activity is the optional model downloads above, an occasional check that a Pro key has not been cancelled, and email if you choose to send feedback.

## Feedback and support

Click **Send feedback** inside the app, or email **kneelq@gmail.com**. Useful details: what you were doing, what happened, your Windows version and RAM.

## Legal

- Terms: [TERMS.md](TERMS.md)
- Open-source components and licences: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)

© 2026 Neil Quigao. All rights reserved.
