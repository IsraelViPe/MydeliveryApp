const { Sale, SaleProduct, Product, User } = require('../database/models');

const order = async (req, res) => {
    const { id: saleId } = req.params;
    const addAttributes = ['id', 'sellerId', 'totalPrice', 'saleDate', 'status', 'userId'];
    
    const sale = await Sale.findOne({ where: { id: saleId },
    attributes: addAttributes,
    include: [{ model: Product,
        as: 'products',
        through: SaleProduct,
    },
    ] });

    const { products: p, sellerId: sId, totalPrice, saleDate, status } = sale;
    const seller = await User
        .findOne({ where: { id: sId }, raw: true, attributes: ['id', 'name'] });

    const products = p.map((prod) => {
        const { id, name, price, SaleProduct: { quantity } } = prod; 
        return { id, name, price, quantity, subTotal: (+quantity * +price).toFixed(2) };
    });

    const response = { id: saleId, totalPrice, saleDate, status, seller, products };
    res.status(200).json(response);
};

module.exports = { order };
