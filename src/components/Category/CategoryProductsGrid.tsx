import ProductCard from "../Product/ProductCard";
import { CategoryType, ProductType } from "../../misc/types";

type Props = {
	category: CategoryType;
	products: ProductType[];
};

const CategoryProductsGrid: React.FC<Props> = ({ category, products }) => {
	return (
		<div className="category-products-grid">
			
			<section className="normal-layout-products">
				{products.map((prod) => (
					<article key={prod.id}>
						<ProductCard product={prod} />
					</article>
				))}
			</section>
		</div>
	);
};

export default CategoryProductsGrid;
