import React, { useEffect, useState } from 'react';

const ProductList = ({ categories }: { categories: string }) => {
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    console.log('Fetching products in category:', categories);
    setProducts(['Clothing', 'Household']);
  }, [categories]);

  return <div>ProductList</div>;
};

export default ProductList;
