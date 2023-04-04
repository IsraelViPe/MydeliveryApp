import PropTypes from 'prop-types';
import ProductSetQty from './ProductSetQty';

function ProductCard(props) {
  const { product } = props;

  return (
    <div>
      <div key={ product.id }>
        <p
          data-testid={ `customer_products__element-card-price-${product.id}` }
        >
          {(product.price).replace(/\./, ',')}
        </p>

        <img
          src={ product.urlImage }
          alt={ product.name }
          width="100px"
          height="100px"
          data-testid={ `customer_products__img-card-bg-image-${product.id}` }
        />

        <p
          data-testid={ `customer_products__element-card-title-${product.id}` }
        >
          {product.name}
        </p>
        <ProductSetQty product={ product } />
      </div>
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
