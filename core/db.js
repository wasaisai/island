const Sequelize = require('sequelize');

const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database;

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql', // 数据库类型
    host,
    port,
    logging: true,
    timezone: '+08:00',
    define: {
        timestamps: true,
        paranoid: true,
        underscored: true        
    }
});
sequelize.sync();

sequelize.authenticate().then(() => { // 3、 连接数据库是否成功
    console.log('link success');
  }).catch(err => {
    console.log('link err')
});

module.exports = {
    sequelize
}