const { execSync } = require("child_process");
const markdownIt = require("markdown-it");
let slugMap = {};
const fs = require("fs");
const markdownItLib = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true,
});

markdownItLib.disable("link");

module.exports = function (eleventyConfig) {
  // Copiar archivos CSS y JS al directorio de salida
  eleventyConfig.addPassthroughCopy("src/css/.");
  eleventyConfig.addPassthroughCopy("src/js/.");
  eleventyConfig.addFilter("date", function (dateObj) {
    return new Date(dateObj).toISOString().split("T")[0]; // Formato: YYYY-MM-DD
  });

  eleventyConfig.addFilter("lastModified", function (inputPath) {
    try {
      const date = execSync(`git log -1 --format="%ci" -- "${inputPath}"`)
        .toString()
        .trim();
      return date ? date.split(" ")[0] : null;
    } catch (e) {
      return null;
    }
  });

  // Crear colección personalizada 'posts', ordenada por fecha descendente
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/blog/posts/**/*.md")
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // Ordenar por fecha
      .slice(0, 4); // Seleccionar solo los primeros 3
  });

  eleventyConfig.addCollection("allPosts", function (collectionApi) {
    const posts = collectionApi
      .getFilteredByGlob("src/blog/posts/**/*.md")
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    posts.forEach((post) => {
      if (post.data.slug) {
        slugMap[post.data.slug] = post.data.title;
      }
    });

    return posts;
  });

  eleventyConfig.setBrowserSyncConfig({
    server: {
      baseDir: "docs",
    },
    serveStaticOptions: {
      extensions: ["html"], // Habilitar rutas limpias
    },
  });

  eleventyConfig.addTransform("wikilinks", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      return content.replace(/\[\[([\w-]+)\]\]/g, (match, slug) => {
        const title = slugMap[slug] || slug;
        return `<a href="/blog/posts/${slug}/">${title}</a>`;
      });
    }
    return content;
  });

  const fs = require("fs");

  eleventyConfig.addCollection("graphData", function (collectionApi) {
    const posts = collectionApi.getFilteredByGlob("src/blog/posts/**/*.md");

    const nodes = posts.map((post) => ({
      id: post.data.slug,
      label: post.data.title,
      url: post.url,
    }));

    const links = [];
    posts.forEach((post) => {
      const content = fs.readFileSync(post.inputPath, "utf-8");
      const wikilinks = [...content.matchAll(/\[\[([\w-]+)\]\]/g)];
      wikilinks.forEach((match) => {
        links.push({
          source: post.data.slug,
          target: match[1],
        });
      });
    });

    return { nodes, links };
  });

  eleventyConfig.setLibrary("md", markdownItLib);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "docs",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    // Agregar pathPrefix para GitHub Pages
    pathPrefix: "/",
  };
};
