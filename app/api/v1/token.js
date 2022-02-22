const Router = require('koa-router');
const {LoginType} = require('../../lib/enum');
const {TokenValidator, NotEmptyValidator} = require('../../validators/validator');
const {User} = require('../../models/user');
const {generateToken} = require('../../../core/util');
const WXManager = require('../../services/wx');

const router = new Router({
    prefix: '/v1/token'
});


router.post('/', async ctx => {
    const v = await new TokenValidator().validate(ctx);
    let token;
    switch (v.get('body.type')) {
        case LoginType.USER_EMAIL:
            token = await emailLogin(v.get('body.account'), v.get('body.secret'));
            break;
        case LoginType.USER_MIMI_PROGRAM:
            token = await WXManager.codeToToken(v.get('body.account'))
            break;
        default:
            break;
    }
});

router.post('/verify', async (ctx) => {
    const v = new NotEmptyValidator().validate(ctx);
    const result = Auth.verifyToken(v.get('body.token'));
    ctx.body = {
        result
    };
});

async function emailLogin(account, secret) {
    const user = await User.verifyEmailPassword(account, secret);
    return generateToken(user.id, Auth.user);
}
module.exports = router;