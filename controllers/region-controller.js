const express = require("express");
const router = express.Router();
const db = require("../db/region-queries");
const stringsMethods = require('../utils/stringMethods');

async function getRegions (req, res) {
    const regionList = await db.getRegions();
    res.render("region", {regions: regionList, error: null});
}

async function addNewregion(req, res) {
    let newRegion = req.body.newRegion;
    newRegion = stringsMethods.removeNonAlphanumericAndAmpersand(newRegion)
    newRegion = stringsMethods.toTitleCase(newRegion)
    console.log(newRegion)
    try {
        await db.addNewregion(newRegion);
        res.redirect("/regions");
    } catch (err) {
        const regionList = await db.getregions();
        res.render("region", {regions: regionList, error: err});
    } 
}

async function updateRegion(req, res) {
    let newName = req.body.newName;
    console.log(newName)
    newName = stringsMethods.removeNonAlphanumericAndAmpersand(newName)
    newName = stringsMethods.toTitleCase(newName)
    const categoryID = parseInt(req.params.id);
    try {
        await db.updateRegion(newName, categoryID);
        res.redirect("/regions");
    } catch {
        const regionList = await db.getRegions();
        res.render("region", {regions: regionList, error: err});
    }
    console.log(categoryID)
}

async function deleteRegion(req, res){
    const regionID = parseInt(req.params.id);
    try {
        await db.deleteRegion(regionID);
        res.redirect("/regions");
    } catch (err) {
        const regionList = await db.getRegions();
        res.render("region", {regions: regionList, error: err});
    }
}

module.exports = {
    getRegions,
    addNewregion,
    updateRegion,
    deleteRegion
}