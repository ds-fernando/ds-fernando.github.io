module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addCollection('posts', function(collectionApi){
        return collectionApi.getFilteredByGlob('src/blog/posts/**/*.md');
    })    


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





