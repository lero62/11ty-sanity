let Nunjucks = require("nunjucks");
let render = require("storyblok-rich-text-react-renderer");
const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");
require("dotenv").config();

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
		name: "serverless", // The serverless function name from your permalink object
		redirects: false,
	});

	eleventyConfig.addNunjucksFilter("rich", function (document) {
		return render
			.render(document, {
				nodeResolvers: {
					[render.NODE_PARAGRAPH]: (children) =>
						`<p>${children ? children.join("") : ""}</p>`,
					[render.NODE_QUOTE]: (children) =>
						`<blockquote>${children.join("")}</blockquote>`,
					[render.NODE_CODEBLOCK]: (children) =>
						`<pre><code>${children}</code></pre>`,
					[render.NODE_OL]: (children) => `<ol>${children.join("")}</ol>`,
					[render.NODE_UL]: (children) => `<ul>${children.join("")}</ul>`,
					[render.NODE_LI]: (children) => {
						return `<li>${children.join("")}</li>`;
					},
					[render.NODE_HR]: () => `<hr />`,
					[render.NODE_BR]: () => `<br />`,
					[render.NODE_IMAGE]: (children, { src, alt }) =>
						`<img src="${src}" alt="${alt}" />`,
					[render.NODE_HEADING]: (children, { level }) =>
						`<h${level}>${children.join("")}</h${level}>`,
				},
				markResolvers: {
					[render.MARK_BOLD]: (children) => `<strong>${children}</strong>`,
					[render.MARK_ITALIC]: (children) => `<em>${children}</em>`,
					[render.MARK_CODE]: (children) => `<code>${children}</code>`,
					[render.MARK_TEXT_STYLE]: (children, { color }) =>
						`<span style="color: ${color}">${children}</span>`,
					[render.MARK_UNDERLINE]: (children) => `<u>${children}</u>`,

					[render.MARK_LINK]: (
						children,
						{ linktype, href, target, anchor, uuid, custom }
					) => `<a href="${href}">${children}</a>`,
				},
			})
			.join("");
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
