let Nunjucks = require("nunjucks");
const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");
require("dotenv").config();

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
		name: "serverless", // The serverless function name from your permalink object
		redirects: false,
	});

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
