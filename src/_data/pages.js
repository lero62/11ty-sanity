module.exports = async () => {
	const StoryblokTo11ty = require("storyblok-11ty");
	const sb = new StoryblokTo11ty.importer({
		token: process.env.TOKEN,
	});

	return await sb.getStories();
};
