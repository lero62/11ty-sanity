export default async function handler(
  request,
  response
) {
    return response.redirect(301, `${request.headers['x-forwarded-proto']}://${request.headers.host}/api/dynamic/home`);
}
