const bcrypt = require('bcryptjs');
const { Sequelize, Model} = require('sequelize');
const {sequelize} = require('../../core/db');

class User extends Model {
    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.fineOne({
            where: {
                email
            }
        });
        if (!user) {
            throw new global.errs.NotFound('账号不存在');
        }
        const correct = bcrypt.compareSync(
            plainPassword, user.password
        )
        if (!correct) {
            throw new global.errs.AuthFailed('密码不正确')
        }
    }
    static async getUserByOpenid(openid) {
        const user = User.findOne({
            where: {
                openid
            }
        });
        return user;
    }

    static async registerByOpenid(openid) {
        return await User.create({
            openid
        })
    }
}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10);
            const psw = bcrypt.hashSync(val, salt);
            this.setDataValue(psw);
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true,
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'isLandUser'
})
module.exports = User;