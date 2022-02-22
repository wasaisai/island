const Router = require('koa-router');
const Auth = require('../../../middlewares/auth');
const {PositiveIntegerValidator} = require('../../validators/validator');
const router = new Router({
    prefix: '/v1/classic'
});

router.get('/latest', new Auth().m,  (ctx, next) => {
   ctx.body = ctx.auth.id;
});

module.exports = router;