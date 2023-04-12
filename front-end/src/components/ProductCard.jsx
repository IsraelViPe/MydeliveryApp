import PropTypes from 'prop-types';
import ProductSetQty from './ProductSetQty';
import styleProducts from '../pages/Products/Products.module.css';

function ProductCard(props) {
  const { product } = props;

  return (
    <div
      className={ styleProducts.containerProductCard }
      key={ product.id }
    >
      <p
        className={ styleProducts.textPrice }
        data-testid={ `customer_products__element-card-price-${product.id}` }
      >
        {`R$ ${(product.price).replace(/\./, ',')}`}
      </p>

      <img
        className={ styleProducts.imgProduct }
        src={ product.urlImage }
        alt={ product.name }
        data-testid={ `customer_products__img-card-bg-image-${product.id}` }
      />

      <p
        className={ styleProducts.nameProduct }
        data-testid={ `customer_products__element-card-title-${product.id}` }
      >
        {product.name}
      </p>
      <ProductSetQty product={ product } />
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    urlImage: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }),
}.isRequired;

export default ProductCard;
