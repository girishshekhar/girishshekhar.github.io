async function loadRecentPosts() {
  const rssUrl = "http://localhost:41917/blog/index.xml";
  try {
    const response = await fetch(rssUrl);
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");

    const items = xml.querySelectorAll("item");
    const container = document.getElementById("recent-posts");
    container.innerHTML = "";

    for (let i = 0; i < Math.min(items.length, 3); i++) {
      const item = items[i];
      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;

      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = link;
      a.textContent = title;
      li.appendChild(a);
      container.appendChild(li);
    }
  } catch (err) {
    console.error("Failed to load RSS feed", err);
  }
}

// Run on page load
document.addEventListener("DOMContentLoaded", loadRecentPosts);