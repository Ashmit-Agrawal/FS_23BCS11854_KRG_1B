function ProductCard({ product }) {
    const {name, description, price, inStock} = product;
    if (!inStock) {
        return (
            <div className="bg-gray-200 rounded-lg p-4">
                <h2 className="text-xl mt-4">{name}</h2>
                <p className="text-gray-600 mt-2">{description}</p>
                <p className="text-lg font-bold mt-4">${price}</p>
                <p className="text-red-500 mt-2">Out of Stock</p>
            </div>
        );
    }

    else return (
        <div className="bg-white rounded-lg p-4">
            <h2 className="text-xl mt-4">{name}</h2>
            <p className="text-gray-600 mt-2">{description}</p>
            <p className="text-lg font-bold mt-4">${price}</p>
            <button className="mt-4 px-6 py-2" onClick={() => alert(`Added ${name} to cart!`)}>
                Buy Now
            </button>
        </div>
    );
}
export default ProductCard;