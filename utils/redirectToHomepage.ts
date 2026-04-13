export default async function redirectToHomepage() {
  return await navigateTo('/', {
    external: true,
    redirectCode: 301,
  });
}

