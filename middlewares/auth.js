const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');
class Auth {
    constructor(level) {
        this.level = level || 1;
        Auth.USER = 8;
        Auth.ADMIN = 16;
        Auth.SUPER_USER = 32;
    }
    get m() {
        return async (ctx, next) => {
            // token检测 HttpBasicAuth
            const userToken = basicAuth(ctx.req);
            let errMsg = 'token不合法';
            if (!userToken && !userToken.name) {
                throw new global.errs.Forbbiden(errMsg);
            }
            try {
                var decode = jwt.verify(userToken.name, global.config.security.secretKey)
            }catch(err) {
                if (error.name == 'TokenExpiredError') {
                    errMsg = 'token已过期'
                }
                throw new global.errs.Forbbiden(errMsg);
            }
            if (decode.scope < this.level) {
                throw new global.config.Forbbiden('权限不足');
            }
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }
            ctx.body = userToken;
        }
    }
    static verifyToken(token) {
        try {
            jwt.verify(token,
                global.config.security.secretKey);
            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = Auth;