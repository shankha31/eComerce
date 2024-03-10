const mongoose = require('mongoose');
const {Schema} = mongoose;


const BargainSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true},
    user:{ type: Schema.Types.ObjectId, ref: 'User', required: true},
    price: { type: Number, required: true},
})

module.exports = mongoose.model('Bargain', BargainSchema);