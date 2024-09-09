const express = require("express");
const router = express.Router();
const db = require("../db/region-queries");
const stringsMethods = require("../utils/stringMethods");

async function getRegions(req, res) {
  const regionList = await db.getRegions();
  res.render("region", { regions: regionList, error: null });
}

async function addRegion(req, res) {
  let newRegion = req.body.newRegion;
  newRegion = stringsMethods.removeNonAlphanumericAndAmpersand(newRegion);
  newRegion = stringsMethods.toTitleCase(newRegion);
  console.log(newRegion);
  try {
    await db.addRegion(newRegion);
    res.redirect("/regions");
  } catch (err) {
    const regionList = await db.getRegions();
    res.render("region", { regions: regionList, error: err });
  }
}

async function updateRegion(req, res) {
  let newName = req.body.newRegion;
  newName = stringsMethods.removeNonAlphanumericAndAmpersand(newName);
  const regionID = parseInt(req.params.id);
  try {
    await db.updateRegion(newName, regionID);
    res.redirect("/regions");
  } catch {
    const regionList = await db.getRegions();
    res.render("region", { regions: regionList, error: err });
  }
  console.log(regionID);
}

async function deleteRegion(req, res) {
  const regionID = parseInt(req.params.id);
  try {
    await db.deleteRegion(regionID);
    res.redirect("/regions");
  } catch (err) {
    const regionList = await db.getRegions();
    res.render("region", { regions: regionList, error: err });
  }
}

module.exports = {
  getRegions,
  addRegion,
  updateRegion,
  deleteRegion,
};
