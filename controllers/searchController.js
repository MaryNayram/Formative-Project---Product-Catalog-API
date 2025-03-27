const Item = require("../models/Product");

const findItems = async (req, res) => {
    try {
        const { keyword, categoryId, priceMin, priceMax } = req.query;
        let searchCriteria = {};

        if (keyword) {
            searchCriteria.$or = [
                { title: new RegExp(keyword, "i") },
                { details: new RegExp(keyword, "i") }
            ];
        }

        if (categoryId) searchCriteria.category = categoryId;
        if (priceMin) searchCriteria.price = { ...searchCriteria.price, $gte: Number(priceMin) };
        if (priceMax) searchCriteria.price = { ...searchCriteria.price, $lte: Number(priceMax) };

        const items = await Item.find(searchCriteria).populate("category").populate("options");
        return res.status(200).json({ success: true, data: items });
    } catch (err) {
        return res.status(500).json({ success: false, error: "Error retrieving search results" });
    }
};

module.exports = { findItems };
