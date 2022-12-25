
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose')
const News = require('../models/News')
const Category = require('../models/Category')

class NewsController {

    // [GET]/ Newss/:slug
    show(req, res, next) {
        News.findOne({ slug: req.params.slug })
            .then((News) => {
                res.render('news/show', { News: mongooseToObject(News) })
            }).catch(next)

    }

    // [GET]/ peoples/create
    create(req, res, next) {
        // res.render('news/create')
        Category.find({})
            .then(category => {
                console.log('a');
                res.render('news/create', { category: multipleMongooseToObject(category) })
            })
            .catch(next)
    }
    //search
    async search(req, res, next) {
        const { name } = req.query
        let data = await News.find({
            "$or": [
                { name: { $regex: name.toString() } }
            ]
        })
            .then(data => {
                data = data.map(data => data.toObject())
                res.render('news/search', { data })
            })
    }
    // upload

    PostArticle(req, res, next) {
        const { body, file } = req;
        const name = body.name;
        const description = body.description;
        const content = body.content;
        const categories = body.categories
        const image = file.filename.replace(/\\/g, '/');
        // const people = new People(req.body)

        const news = new News({ name, description, content, categories, image })
        console.log("suc", news);
        news.save()
            // res.send('Save')
            .then(() => res.redirect('/me/stored/news'))
            .catch(next)
    }

    edit(req, res, next) {
        Promise.all([News.findById(req.params.id), Category.find()])
            .then(news => {
            res.render('news/edit', {
                news: mongooseToObject(news[0]),
                category: multipleMongooseToObject(news[1])
            })
            // res.json(news)
        })
        .catch(next);
        // News.findById(req.params.id)
        //     .then(news => res.render('news/edit', {
        //         news: mongooseToObject(news)
        //     })
        //     ).catch(next)
    }

    // [PUT]/ peoples/:id
    update(req, res, next) {
        const { body, file } = req;
        const name = body.name;
        const description = body.description;
        const content = body.content;
        const image = file.filename.replace(/\\/g, '/');
        const categories = body.categories



        News.findByIdAndUpdate(req.params.id, { name, description, content, image, categories })
            .then(() => res.redirect('/me/stored/news'))
            .catch(next)


    }

    // [POST]/ peoples/store
    store(req, res, next) {
        // res.json(req.body)
        const news = new News(req.body)
        news.save()
            // res.send('Save')
            .then(() => res.redirect('/me/stored/news'))
            .catch(error => {

            })

    }
    // [GET]/ peoples/create
    getByCategory(req, res, next) {
        const categoryId = req.params.id
        News.find({categories: categoryId }).then(news => {
            res.render('home', { news: multipleMongooseToObject(news) })
        })
        .catch(next)
    }

    // [Delete]/ peoples/:id
    remove(req, res, next) {
        News.delete({ _id: req.params.id })
            .then(() => res.redirect('back')
            ).catch(next)
    }
    // [Delete]/ Newss/:id/force
    forceRemove(req, res, next) {
        News.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back')
            ).catch(next)
    }

    // [Restore]/ Newss/:id/restore
    restore(req, res, next) {
        News.restore({ _id: req.params.id })
            .then(() => res.redirect('back')
            ).catch(next)
    }
}

module.exports = new NewsController;
