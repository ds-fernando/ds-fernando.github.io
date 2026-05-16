const { execSync } = require("child_process");
const markdownIt = require("markdown-it");

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
    return collectionApi
      .getFilteredByGlob("src/blog/posts/**/*.md")
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Solo ordenar por fecha sin limitar
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
      const allPosts = eleventyConfig.collections?.allPosts || [];
      return content.replace(/\[\[([\w-]+)\]\]/g, (match, slug) => {
        return `<a href="/blog/posts/${slug}/">${slug}</a>`;
      });
    }
    return content;
  });
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
