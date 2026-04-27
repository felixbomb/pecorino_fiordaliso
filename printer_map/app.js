const UMD_LAT = 38.9896967;
const UMD_LON = -76.93776;

const map = L.map("map").setView([UMD_LAT, UMD_LON], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

async function loadPrinters() {
  const url =
    "https://wepanow.com/utils/get-near-kiosks/?" +
    new URLSearchParams({
      latitude: UMD_LAT,
      longitude: UMD_LON,
      radius: 5
    });

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    data.forEach(printer => {
      const lat = printer.latitude || printer.lat;
      const lon = printer.longitude || printer.lng || printer.lon;

      if (!lat || !lon) return;

      const name = printer.name || printer.location || "WEPA Printer";
      const status = printer.status || "Unknown";

      L.marker([lat, lon])
        .addTo(map)
        .bindPopup(`
          <strong>${name}</strong><br>
          WEPA status: ${status}<br>
          Student notes: coming soon
        `);
    });
  } catch (err) {
    console.error("Could not load printer data:", err);
    document.getElementById("info").innerHTML +=
      "<p><strong>Could not load live WEPA data.</strong> This may be a CORS issue.</p>";
  }
}

loadPrinters();