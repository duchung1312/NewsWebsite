const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose')
const Category = require('../models/Category')


class CategoryController{


    create(req, res, next){
        res.render('categories/createCate')
    }

    store(req,res,next){
        console.log(req.body)
        const category = new Category(req.body)
        category.save()
        .then(() => {
            res.redirect('/login')})
        .catch(error =>{
            res.send('fail')
        })
        res.status(201);
    }

    index(req, res, next) {
        Category.find({})
            .then(category => res.render('news/create', { category }))
            .catch(next)
        
    }
    
}


module.exports = new CategoryController;
