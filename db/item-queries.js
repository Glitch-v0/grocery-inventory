const pool = require("./pool")

async function getList() {
    const { rows } = await pool.query("SELECT * FROM items");
    return rows;
}

async function getItemByID(itemID){
    const { rows } = await pool.query("SELECT * FROM items WHERE id = $1", [itemID]);
    return rows[0];
}

async function getItemDetails(itemID){
    const query = `
    SELECT 
        items.id,
        items.name,
        categories.id,
        categories.name as category,
        regions.id,
        regions.name as region_name,
        regional_prices.price
    FROM 
        items
    LEFT JOIN 
        item_categories ON items.id = item_categories.item_id
    LEFT JOIN 
        categories ON item_categories.category_id = categories.id
    LEFT JOIN 
        regional_prices ON items.id = regional_prices.item_id
    LEFT JOIN 
        regions ON regional_prices.region_id = regions.id
    WHERE 
        items.id = $1;
`;


        const { rows } = await pool.query(query, [itemID]);
        return rows
}

module.exports = {
    getList,
    getItemByID,
    getItemDetails
}