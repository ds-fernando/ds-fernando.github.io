module.exports = function (eleventyConfig) {
    // Copiar archivos CSS y JS al directorio de salida
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
  
    // Crear colección personalizada 'posts', ordenada por fecha descendente
    eleventyConfig.addCollection("posts", function (collectionApi) {
      return collectionApi.getFilteredByGlob("src/blog/posts/**/*.md")
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Ordenar por fecha
        .slice(0, 3); // Seleccionar solo los primeros 3
    });
    
    eleventyConfig.addCollection("allPosts", function (collectionApi) {
      return collectionApi.getFilteredByGlob("src/blog/posts/**/*.md")
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
    
    return{
        dir:{
            input: "src",
            includes: "_includes",
            output: "docs"
        },
        templateFormats: ['md', 'njk', 'html'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: "njk",
        // Agregar pathPrefix para GitHub Pages
        pathPrefix: "/webpersonal-eleventy/", 
    };
};




