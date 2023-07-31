const { EleventyServerless } = require("@11ty/eleventy");

export default async function handler(
  request,
  response
) {
  const { slug } = request.query;

  let elev = new EleventyServerless("serverless", {
    path: slug, // (required) the URL path
    query: {
      isDynamic: true
    }
  });

  try {
    // returns the HTML for the Eleventy template that matches to the URL
    // Can use with `eleventyConfig.dataFilterSelectors` to put data cascade data into `page.data` here.
    let [page] = await elev.getOutput();
    let html = page.content;

    return response.status(200).send(html);
  } catch(e) {
    return response.status(500).json({ error: e.message });
  }

}
