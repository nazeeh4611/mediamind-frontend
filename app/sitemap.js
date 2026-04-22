export default async function sitemap() {
    const baseUrl = "https://mediaminddigital.ae";
  
    let works = [];
  
    try {
      const res = await fetch("https://mediamind-p521.onrender.com/api/works", {
        cache: "no-store",
      });
  
      works = await res.json();
    } catch (error) {
      works = [];
    }
  
    const staticPages = [
      {
        url: baseUrl,
        priority: 1,
        changeFrequency: "weekly",
      },
      {
        url: `${baseUrl}/about`,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contact`,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/services`,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/works`,
        priority: 0.9,
      },
    ];
  
    const workPages = works.map((item) => ({
      url: `${baseUrl}/works/${item.slug}`,
      lastModified: item.updatedAt || new Date(),
      priority: 0.8,
    }));
  
    return [...staticPages, ...workPages];
  }