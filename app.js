const UMD_LAT = 38.9896967;
const UMD_LON = -76.93776;

const map = L.map("map").setView([UMD_LAT, UMD_LON], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

async function loadPrinters() {
  try {
    const res = await fetch("wepa_kiosks.json");
    const data = await res.json();

    console.log(data);

    data.forEach(printer => {
      const lat = printer.lat;
      const lon = printer.lng;

      if (!lat || !lon) return;

      const name = printer.shortName || "WEPA Printer";
      const location = printer.location || "Unknown location";
      const building = printer.building || "Unknown building";
      const status = printer.status || "Unknown status";
      const description = printer.description || "No description available";

      L.marker([lat, lon])
      .addTo(map)
      .bindPopup(`
        <strong>${name}</strong><br>
        <strong>Building:</strong> ${building}<br>
        <strong>Location:</strong> ${location}<br>
        <strong>Status:</strong> ${status}<br>
        <em>${description}</em>
        <hr>
        <strong>Student notes:</strong> coming soon
      `);
    });
  } catch (err) {
    console.error("Could not load printer data:", err);
    document.getElementById("info").innerHTML +=
      "<p><strong>Printer data failed</strong> Check formatting/console, doofus.</p>";
  }
}

loadPrinters();