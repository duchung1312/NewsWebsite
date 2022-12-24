const News = require('../models/News')
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose');


class MeController{
   

    // [GET]/stored/peoples
    storedNews(req, res, next){
        News.find({})
        .then(news => res.render('me/stored-news',{
            news: multipleMongooseToObject(news)})
        ).catch(next)
    }
    // [GET]/trash/peoples
    trashNews(req, res, next){
        News.findDeleted({})
        .then(news => res.render('me/trash-news',{
            news: multipleMongooseToObject(news)})
        ).catch(next)
    }
    
}

module.exports = new MeController;
