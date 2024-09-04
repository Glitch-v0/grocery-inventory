const express = require("express");
const router = express.Router();
const db = require("../db/category-queries");

async function getCategories (req, res) {
    const categoryList = await db.getCategories();
    //console.log(categoryList)
    res.render("category", {itemCategories: categoryList, error: null});
}

async function addNewCategory(req, res) {
    const category = req.body.newCategory;
    
    try {
        await db.addNewCategory(category);
        res.redirect("/categories");
    } catch (err) {
        const categoryList = await db.getCategories();
        res.render("category", {itemCategories: categoryList, error: err});
    } 
}

module.exports ={
    getCategories,
    addNewCategory
}