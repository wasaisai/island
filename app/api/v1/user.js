const bcrypt = require('bcryptjs');
const Router = require('koa-router');
const {RegisterValidator} = require('../../validators/validator');
const {User} = require('../../models/user');
const router = new Router();

router.post('/register', async (ctx) => {
    const v = await new RegisterValidator().validate(ctx);
    const salt = bcrypt.genSaltSync(10);
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password2'),
        nickname: v.get('body.nickname')
    }
    const r = await User.create(user);
    throw new global.ResizeObserverSize.Success();
});
module.exports = router;