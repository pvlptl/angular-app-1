module.exports = {
    mongoose: {
        uri: process.env.MONGO_URL,
        options: {
            "useNewUrlParser": true
        }
    }
};
