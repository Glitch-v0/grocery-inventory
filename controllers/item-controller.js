const express = require("express");
const router = express.Router();
const itemDB = require("../db/item-queries");
const categoryDB = require("../db/category-queries.js");
const regionDB = require("../db/region-queries");
const connectionsDB = require("../db/connection-queries");
const stringsMethods = require("../utils/stringMethods");

async function addItem(req, res) {
  const itemName = req.body.newItem;
  const addedItem = await itemDB.addItem(itemName);
  console.log(addedItem[0].id);
  const currentItemList = await itemDB.getAllItems();
  res.redirect(`items/${addedItem[0].id}`);
}

async function getItems(req, res) {
  const groceryList = await itemDB.getAllItems();
  res.render("items", { itemList: groceryList, error: null });
}

async function getItemDetails(req, res) {
  const itemID = parseInt(req.params.id);
  if (!itemID) {
    return res.render("error", {
      errorCode: 404,
      errorMessage: "Invalid Page",
    });
  }
  const itemDetails = await itemDB.getItemDetails(itemID); // returns all details of item for each region
  // console.log({ itemDetails });
  const itemCategories = await categoryDB.getCategoriesByItemID(itemID); // to determine how many categories to display
  // console.log({ itemCategories });
  const categoryList = await categoryDB.getCategories(); // to show different options to select
  const regionList = await regionDB.getRegions(); // to show all region options for pricing
  // console.log({ regionList });
  if (itemDetails.length === 0) {
    // Handle the case where no rows are found
    res.render("error", { errorCode: 404, errorMessage: "Item not found" });
  }
  res.render("item-details", {
    id: itemID,
    itemStats: itemDetails,
    categories: categoryList,
    itemCategories: itemCategories,
    regions: regionList,
    error: null,
  });
}

async function updateItem(req, res) {
  console.log(req.body);
  const { itemName, prices, regions, ...otherCategories } = req.body;
  const itemID = parseInt(req.params.id);

  const categoriesToAdd = [];
  for (const category of Object.values(otherCategories)) {
    if (category && category !== "DELETE") {
      categoriesToAdd.push(category);
    } else if (category === "DELETE") {
      await connectionsDB.removeItemCategories(itemID);
    }
  }
  if (!itemID) {
    return res.render("error", {
      errorCode: 404,
      errorMessage: "Invalid Page",
    });
  }
  // Deal with item update first
  newName = stringsMethods.removeNonAlphanumericAndAmpersand(itemName);
  newName = stringsMethods.toTitleCase(itemName);
  await itemDB.updateItemName(itemName, itemID);

  // Deal with category update second
  if (categoriesToAdd.length > 0) {
    await connectionsDB.removeItemCategories(itemID);
    for (const category of categoriesToAdd) {
      const categoryID = await categoryDB.getCategoryIDByName(category);
      await connectionsDB.createItemCategory(itemID, categoryID[0].id);
    }
  }

  // Deal with prices
  regions.forEach(async (region, index) => {
    const regionID = await regionDB.getRegionIDByName(region);
    const price = prices[index];
    console.log(
      `Passing price $${price} to region ${region} with ID-${regionID[0].id}`,
    );
    await connectionsDB.updatePrice(price, itemID, regionID[0].id);
  });

  res.redirect("/items");
}

async function deleteItem(req, res) {
  const itemID = parseInt(req.params.id);
  if (!itemID) {
    return res.render("error", {
      errorCode: 404,
      errorMessage: "Invalid Page",
    });
  }
  const deletedItem = await itemDB.deleteItem(itemID);
  const currentItemList = await itemDB.getAllItems();
  res.render("items", { itemList: currentItemList, error: null });
}

module.exports = {
  addItem,
  getItems,
  getItemDetails,
  updateItem,
  deleteItem,
};
