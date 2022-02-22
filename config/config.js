module.exports = {
    environment: 'dev',
    database: {
        dbName: 'island',
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '12345678'
    },
    security: {
        secretKey: 'badgaegaergaerg',
        expiresIn: 60*60*24*30
    },
    wx: {
        appID: '',
        appsecret: '',
        loginUrl: ''
    }
}