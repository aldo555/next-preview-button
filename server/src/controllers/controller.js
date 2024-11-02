const controller = ({ strapi }) => ({
  index(ctx) {
    const model = ctx.request.query.model;
    const config = strapi.config.get('plugin::next-preview-button');

    const contentType = config.contentTypes.find((contentType) => contentType.model === model);

    if (!contentType) {
      return ctx.throw(404, 'Content type not found in plugin configuration!');
    }

    ctx.body = contentType
  },
});

export default controller;
