let Nunjucks = require("nunjucks");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/assets");

	let nunjucksEnvironment = new Nunjucks.Environment(
		new Nunjucks.FileSystemLoader("src/_includes"),
		{
			autoescape: false,
		}
	);
	eleventyConfig.setLibrary("njk", nunjucksEnvironment);

	return {
		addPassthroughFileCopy: true,
		markdownTemplateEngine: "njk",
		HTMLTemplateEngine: "njk",
		dataTemplateEngine: "njk",
		templateFormats: ["html", "njk", "md"],
		dir: {
			input: "src",
			output: "dist",
			includes: "_includes",
			layouts: "_layouts",
		},
	};
};
