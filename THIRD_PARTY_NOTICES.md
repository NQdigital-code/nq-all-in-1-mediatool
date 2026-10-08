# Third-party notices

NQ All-in-1 MediaTool is built on open-source software. Thank you to these projects. Each component remains under its own license.

| Component | License | Project |
|---|---|---|
| Electron / Chromium | MIT and BSD-style | https://www.electronjs.org/ |
| **FFmpeg** (separate program, 6.1.1, Windows build by gyan.dev) | **GPL v3** | https://ffmpeg.org/ |
| libheif-js / libheif and libde265 (HEIC reading, WebAssembly) | LGPL-3.0 | https://github.com/catdad-experiments/libheif-js |
| sharp | Apache-2.0 | https://sharp.pixelplumbing.com/ |
| libvips (inside sharp) | LGPL-3.0 | https://www.libvips.org/ |
| Real-ESRGAN ncnn Vulkan (and models) | MIT / BSD-3-Clause | https://github.com/xinntao/Real-ESRGAN-ncnn-vulkan |
| whisper.cpp | MIT | https://github.com/ggml-org/whisper.cpp |
| OpenAI Whisper models (ggml conversions) | MIT | https://huggingface.co/ggerganov/whisper.cpp |
| Silero VAD | MIT | https://github.com/snakers4/silero-vad |
| Tesseract OCR via tesseract.js | Apache-2.0 | https://github.com/naptha/tesseract.js |
| ISNet / DIS segmentation model (isnet-general-use) | Apache-2.0 | https://github.com/xuebinqin/DIS |
| MODNet portrait matting model (via Xenova/modnet ONNX) | Apache-2.0 | https://github.com/ZHKKKe/MODNet |
| ONNX Runtime | MIT | https://onnxruntime.ai/ |
| PDF.js | Apache-2.0 | https://mozilla.github.io/pdf.js/ |
| @napi-rs/canvas | MIT | https://github.com/Brooooooklyn/canvas |
| pdf-lib | MIT | https://github.com/Hopding/pdf-lib |
| docx | MIT | https://github.com/dolanmiu/docx |
| mammoth | BSD-2-Clause | https://github.com/mwilliamson/mammoth.js |
| SheetJS (xlsx) 0.18.5 | Apache-2.0 | https://sheetjs.com/ |
| Tailwind CSS | MIT | https://tailwindcss.com/ |

## Source code for GPL / LGPL components

- **FFmpeg 6.1.1** is included as a separate executable (it is not linked into the app's own code). Its complete source code is available at https://ffmpeg.org/releases/ffmpeg-6.1.1.tar.xz . The Windows build and its build configuration are published by gyan.dev at https://www.gyan.dev/ffmpeg/builds/ . You may also request the source by email at kneelq@gmail.com and it will be provided.
- **libvips** (LGPL-3.0) is used as an unmodified dynamic library through sharp. Source: https://github.com/libvips/libvips .

The full license texts of these components are available at the project links above.
