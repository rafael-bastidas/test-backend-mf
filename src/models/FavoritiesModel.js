const { Schema, model } = require('mongoose');

const FavoritiesSchema = new Schema({
    userId: { type: Number, required: true},
    name: { type: String, required: true},
    products: [
        {
            name: { type: String, required: true},
            price:{ type: String, required: true},
            imagen:{ type: String, required: true}
        }
    ]
});

module.exports = model('Favorities', FavoritiesSchema);
