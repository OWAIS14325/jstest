const API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export async function captureScreen() {
  try {
    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(document.body, {
      scale: 0.45,
      useCORS: true,
      logging: false,
      imageTimeout: 0,
    });
    // strip the "data:image/jpeg;base64," prefix — ImgBB wants raw base64
    const base64 = canvas.toDataURL("image/jpeg", 0.4).split(",")[1];

    if (!API_KEY) return null;

    const fd = new FormData();
    fd.append("image", base64);

    const res  = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
      method: "POST",
      body: fd,
    });
    const json = await res.json();
    return json?.data?.url ?? null;
  } catch {
    return null;
  }
}
