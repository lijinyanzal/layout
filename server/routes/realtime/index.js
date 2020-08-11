// eslint-disable-next-line no-unused-vars
const realtime = async (ctx, next) => {
  // eslint-disable-next-line no-unused-vars
  const { frequency } = ctx.request.body;

};

module.exports = {
  method: 'post',
  url: '/api/realtime',
  middleware: realtime
};
