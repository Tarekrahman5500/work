const express = require('express');
const router = express.Router();
const Item = require('../model/Item');
const Category = require('../model/Category');
const catchAsyncErrors = require('../utils/catchAsyncErrors')
const {validateItemInsertRequest, isRequestValidated, validateItemUpdateRequest} = require("../utils/dataVlidator");

router.get('/add', catchAsyncErrors(async (req, res) => {

    const categories = await Category.find();
    res.render('item/add', {categories});

}));

router.post('/add', validateItemInsertRequest, isRequestValidated, catchAsyncErrors(async (req, res) => {
    const {category, title, description, active} = req.body;
    await Item.create({
        category: category,
        title: title,
        description: description,
        active: active
    });
    res.redirect('/item/list');

}));

router.get('/list', catchAsyncErrors(async (req, res) => {

    // Fetch all items with populated category
    const items = await Item.find().populate('category');
    // console.log(items)
    res.render('item/list', {items});

}));

router.get('/update/:id', catchAsyncErrors(async (req, res, next) => {

    await getSingleItem(req, res, next, "item/update")
}));


// Update an item
router.post('/update/:id', validateItemUpdateRequest, isRequestValidated, catchAsyncErrors(async (req, res) => {
    const itemId = req.params.id;
    const {category, title, description} = req.body;

    // Convert the active value to a boolean
    const active = req.body.active === 'true';
    await Item.findByIdAndUpdate(
        itemId,
        {category, title, description, active},
        {new: true} // Return the updated item
    );
    res.redirect('/item/list');

}));

router.get('/delete/:id', catchAsyncErrors(async (req, res, next) => {

    await getSingleItem(req, res, next, "item/delete")

}));


// Delete an item
router.post('/delete/:id', catchAsyncErrors(async (req, res) => {
    const itemId = req.params.id;

    await Item.findByIdAndDelete(itemId);
    res.redirect('/item/list');
}));


const getSingleItem = async (req, res, next, render) => {

    const itemId = req.params.id;
    try {
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).send('Item not found.');
        }
        const categories = await Category.find();
        res.render(`${render}`, {item, categories});
    } catch (error) {
        next(error)
    }
}

module.exports = router;
