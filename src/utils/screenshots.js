const API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

async function captureFromStream(stream) {
  const track = stream.getVideoTracks()[0];
  if (!track || track.readyState !== "live") return null;

  // Try ImageCapture API (Chrome/Edge)
  if (typeof ImageCapture !== "undefined") {
    try {
      const capture = new ImageCapture(track);
      const bitmap  = await capture.grabFrame();
      const canvas  = document.createElement("canvas");
      canvas.width  = bitmap.width;
      canvas.height = bitmap.height;
      canvas.getContext("2d").drawImage(bitmap, 0, 0);
      return canvas.toDataURL("image/jpeg", 0.5).split(",")[1];
    } catch {}
  }

  // Fallback: video element (Firefox)
  const video = document.createElement("video");
  video.muted = true;
  video.srcObject = new MediaStream([track]);
  await new Promise((r) => { video.onloadedmetadata = r; video.play(); });
  await new Promise((r) => setTimeout(r, 200));
  const canvas  = document.createElement("canvas");
  canvas.width  = video.videoWidth  || 1280;
  canvas.height = video.videoHeight || 720;
  canvas.getContext("2d").drawImage(video, 0, 0);
  video.pause();
  video.srcObject = null;
  return canvas.toDataURL("image/jpeg", 0.5).split(",")[1];
}

async function captureFromDOM() {
  const { default: html2canvas } = await import("html2canvas");
  const canvas = await html2canvas(document.body, {
    scale: 0.45, useCORS: true, logging: false, imageTimeout: 0,
  });
  return canvas.toDataURL("image/jpeg", 0.4).split(",")[1];
}

export async function captureScreen(stream = null) {
  try {
    const base64 = stream?.active
      ? (await captureFromStream(stream)) ?? (await captureFromDOM())
      : await captureFromDOM();

    if (!API_KEY || !base64) return null;

    const fd = new FormData();
    fd.append("image", base64);
    const res  = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, { method: "POST", body: fd });
    const json = await res.json();
    return json?.data?.url ?? null;
  } catch {
    return null;
  }
}
