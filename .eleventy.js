module.exports = function (eleventyConfig) {
    // Copiar archivos CSS y JS al directorio de salida
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
  
    // Crear colección personalizada 'posts', ordenada por fecha descendente
    eleventyConfig.addCollection("posts", function (collectionApi) {
      return collectionApi.getFilteredByGlob("src/blog/posts/**/*.md").sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
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
        dataTemplateEngine: 'njk', };

};





