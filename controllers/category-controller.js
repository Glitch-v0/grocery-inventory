const express = require("express");
const router = express.Router();
const db = require("../db/category-queries");
const stringsMethods = require('../utils/stringMethods');

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

async function updateCategory(req, res) {
    let newName = req.body.updatedCategory;
    newName = stringsMethods.removeNonAlphanumericAndAmpersand(newName)
    newName = stringsMethods.toTitleCase(newName)
    const categoryID = parseInt(req.params.id);
    try {
        const result = await db.updateCategory(newName, categoryID);
        res.redirect("/categories");
    } catch {
        const categoryList = await db.getCategories();
        res.render("category", {itemCategories: categoryList, error: err});
    }
}

async function deleteCategory(req, res) {
    const categoryID = parseInt(req.params.id);
    console.log(categoryID)
    try {
        console.log('Deleting...')
        await db.deleteCategory(categoryID);
        res.redirect("/categories");
    } catch (err) {
        const categoryList = await db.getCategories();
        res.render("category", {itemCategories: categoryList, error: err});
    }
}

module.exports ={
    getCategories,
    addNewCategory,
    updateCategory,
    deleteCategory
}