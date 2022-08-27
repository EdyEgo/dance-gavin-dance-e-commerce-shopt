interface ProductsListByFilterProps {
  type: string; // "all" | "best" | "tour" | "newest"
}

// add to products , bestSeller:boolean , tourMerch:boolean , newProduct:is taken from registeredAt
// not older than 1 month

const ProductsListByFilter: React.FC<ProductsListByFilterProps> = ({
  type,
}) => {
  return (
    <div className="filtered-product-list-container">
      <div className="filtered-products-list"></div>
    </div>
  );
};

export default ProductsListByFilter;
