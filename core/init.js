/**
 * @file
 * @author jiaoyueyue
*/

const requireDirectory = require('require-directory');
const {HttpException} = require('./http-exception');
const Router = require('koa-router');

class InitManager {
    static initCore(app) {
        InitManager.app = app;
        InitManager.initLoadRouters(app);
        InitManager.loadHttpExecption();
        InitManager.loadConfig();
    }

    static initLoadRouters() {
        const apiDireectory = `${process.cwd()}/app/api`;
        requireDirectory(module, apiDireectory, {
            visit: whenLoadModule
        });
        
        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes());
            }
        }
        
    }

    static loadHttpExecption() {
        const errors = new HttpException();
        global.errs = errors;
    }

    static loadConfig(path = '') {
        const configPath = path || process.cwd() + '/config/config.js';
        const config = require(configPath);
        global.config = config;
    }
}

module.exports = InitManager;