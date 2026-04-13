export default function checkIsLandingPage(data: { page: string }) {
  const {
    page,
  } = data;

  if (!page.trim() || typeof page !== 'string') return false;

  const landingPagesRoutes = new Set([
    'college_lp',
    'land-college',
  ]);

  return landingPagesRoutes.has(page);
}
