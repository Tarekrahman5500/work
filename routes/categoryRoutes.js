const express = require('express');
const router = express.Router();
const Category = require('../model/Category');
const catchAsyncErrors = require('../utils/catchAsyncErrors')
const {
    validateCategoryAddRequest,
    isRequestValidated,
    validateCategoryUpdateRequest
} = require("../utils/dataVlidator");

router.get('/add', (req, res) => {
    res.render('category/add');
});

router.post('/add', validateCategoryAddRequest, isRequestValidated, catchAsyncErrors(async (req, res) => {
    const {title, description, active} = req.body;
    await Category.create({
        title: title,
        description: description,
        active: active
    });
    res.redirect('/category/list');

}));

router.get('/list', catchAsyncErrors(async (req, res) => {

    const categories = await Category.find();
    res.render('category/list', {categories});

}));


// get single category for update
router.get('/update/:id', catchAsyncErrors(async (req, res, next) => {

    await getSingleCategory(req, res, next, "category/update")


}));

// Update a category
router.post('/update/:id', validateCategoryUpdateRequest, isRequestValidated, catchAsyncErrors(async (req, res) => {
    const categoryId = req.params.id;
    const {title, description} = req.body;
    const active = req.body.active === 'on'; // Convert "on" to boolean
    await Category.findByIdAndUpdate(
        categoryId,
        {title, description, active},
        {new: true}
    );
    res.redirect('/category/list');

}));


router.get('/delete/:id', catchAsyncErrors(async (req, res, next) => {

    await getSingleCategory(req, res, next, "category/delete")

}));

router.post('/delete/:id', catchAsyncErrors(async (req, res) => {
    const categoryId = req.params.id;


    // Delete the category
    await Category.findByIdAndDelete(categoryId);
    res.redirect('/category/list');

}));


const getSingleCategory = async (req, res, next, render) => {

    const categoryId = req.params.id;

    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).send('Category not found.');
        }
        res.render(`${render}`, {category});
    } catch (error) {
        next(error);

    }
}


module.exports = router;
