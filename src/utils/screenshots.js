// Cloudinary unsigned upload — free forever, no API key needed in code.
// Only requires VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_PRESET env vars.
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const PRESET     = import.meta.env.VITE_CLOUDINARY_PRESET;

export async function captureScreen() {
  try {
    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(document.body, {
      scale: 0.45,
      useCORS: true,
      logging: false,
      imageTimeout: 0,
    });
    const base64 = canvas.toDataURL("image/jpeg", 0.4);

    if (!CLOUD_NAME || !PRESET) return null;

    const fd = new FormData();
    fd.append("file", base64);
    fd.append("upload_preset", PRESET);

    const res  = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: fd,
    });
    const json = await res.json();
    return json?.secure_url ?? null;
  } catch {
    return null;
  }
}
