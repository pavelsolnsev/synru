export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', (response) => {
    response.body = response.body.replace(
      '<head>',
      '<head itemscope itemtype="https://schema.org/WPHeader">',
    ).replace(
      '<title>',
      '<title itemscope="" itemprop="headline">',
    ).replace(
      '<meta name="description"',
      '<meta itemprop="description" name="description"',
    );

    return response;
  });
});
