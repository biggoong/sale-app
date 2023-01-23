import { Spin } from "antd";
import { useEffect, useReducer } from "react";
import { ProductCard } from "./ProductCard";
import { fetchArticles, fetchProducts } from "../../api";
import {
  ArticlesActionTypes,
  articlesReducer,
  initialArticlesState,
  TArticle,
} from "../../reducers/articlesReducer";
import {
  ProductsActionTypes,
  productsReducer,
  initialProductsState,
} from "../../reducers/productsReducer";

export const ProductsList = () => {
  const [products, dispatchProducts] = useReducer(
    productsReducer,
    initialProductsState
  );
  const [articles, dispatchArticles] = useReducer(
    articlesReducer,
    initialArticlesState
  );

  const handleFetchProducts = async () => {
    dispatchProducts({ type: ProductsActionTypes.LOAD_INIT });
    try {
      const products = await fetchProducts();
      dispatchProducts({
        type: ProductsActionTypes.LOAD_SUCCESS,
        payload: products,
      });
    } catch (e: any) {
      dispatchProducts({ type: ProductsActionTypes.LOAD_FAIL, error: true });
    }
  };

  const handleFetchArticles = async () => {
    dispatchArticles({ type: ArticlesActionTypes.LOAD_INIT, payload: [] });

    try {
      const articles = await fetchArticles();
      dispatchArticles({
        type: ArticlesActionTypes.LOAD_SUCCESS,
        payload: articles,
      });
    } catch (e: any) {
      dispatchArticles({
        type: ArticlesActionTypes.LOAD_FAIL,
        error: true,
        payload: [],
      });
    }
  };

  // Fetch products list and articles list
  useEffect(() => {
    handleFetchProducts();
    handleFetchArticles();
  }, []);

  const handleUpdateArticles = (newArticles: TArticle[]) => {
    dispatchArticles({
      type: ArticlesActionTypes.UPDATE_ARTICLES,
      payload: newArticles,
    });
  };

  if (products.loading || articles.loading) {
    return <Spin />;
  }

  if (products.error || articles.error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="card-container">
      {products.products?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          articles={articles.articles}
          onUpdateArticles={handleUpdateArticles}
        />
      ))}
    </div>
  );
};
