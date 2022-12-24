const Register = require('../models/Register')
const News = require('../models/News')
const { multipleMongooseToObject } = require('../../util/mongoose')

class siteController {

    

    // GET /login
    index(req, res, next) {
        var page = req.query.page
        const PAGE_SIZE = 4
        // res.json(page)
        if (page) {
            page = parseInt(page)
            var skip = (page - 1) * PAGE_SIZE

            News.find({})
                .skip(skip).limit(PAGE_SIZE)
                .then(news => {
                    res.render('home', {
                        news: multipleMongooseToObject(news)
                    })
                    // res.json(News)
                })
                .catch(next);
        } else {
            News.find({})
                .then(news => {
                    res.render('home', {
                        news: multipleMongooseToObject(news)
                    })
                    // res.json(News)
                })
                .catch(next);
            // res.json('loi')
        }

    }
    sport(req, res, next) {
        res.render('sport')
    }
    travel(req, res, next) {
        res.render('travel')
    }
    world(req, res, next) {
        res.render('world')
    }
    health(req, res, next) {
        res.render('health')
    }
    technology(req, res, next) {
        res.render('technology')
    }
    education(req, res, next) {
        res.render('education')
    }
    youth(req, res, next) {
        res.render('youth')
    }
    economic(req, res, next) {
        res.render('economic')
    }
}


module.exports = new siteController