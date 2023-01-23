import { useMemo, useReducer } from "react";
import { Card, Typography, Space, Button } from "antd";
import { registerSale, updateArticles } from "../../api";
import { TProduct } from "../../reducers/productsReducer";
import { TArticle } from "../../reducers/articlesReducer";
import {
  saleReducer,
  initialSaleState,
  SaleActionTypes,
} from "../../reducers/saleReducer";

const { Text } = Typography;

interface IProductCardProps {
  product: TProduct;
  articles?: TArticle[];
  onUpdateArticles: (newArticles: TArticle[]) => void;
}

export const ProductCard = ({
  product,
  articles,
  onUpdateArticles,
}: IProductCardProps) => {
  const [sales, dispatchSales] = useReducer(saleReducer, initialSaleState);

  // Compute product articles data from articles objects
  const articlesList = useMemo(() => {
    if (!articles) {
      return [];
    }

    return product.articles.map((article) => {
      const articleData = articles.find((art) => art.id === article.id);

      if (articleData) {
        return { ...article, ...articleData };
      }

      return undefined;
    });
  }, [articles, product.articles]);

  // Count product quantity from articles stock data
  const productQuantity = useMemo(() => {
    const countArticlesForProducts = articlesList?.map((article) =>
      article ? Math.floor(article.amountInStock / article.amountRequired) : 0
    );

    return Math.min(...countArticlesForProducts);
  }, [articlesList]);

  const handleSaleOneProduct = async () => {
    dispatchSales({ type: SaleActionTypes.SALE_INIT, payload: [] });
    try {
      const articlesDataToUpdate = product.articles.map(
        ({ id, amountRequired }) => ({ id, amountToSubtract: amountRequired })
      );

      // Register sale 1 product and update articles stock quantity
      const promiseAllResponses = await Promise.all([
        registerSale({ productId: product.id, amountSold: 1 }),
        updateArticles(articlesDataToUpdate),
      ]);

      const newArticles = promiseAllResponses[1];

      if (newArticles) {
        onUpdateArticles(newArticles);
      }

      dispatchSales({
        type: SaleActionTypes.SALE_SUCCESS,
        payload: promiseAllResponses[0],
      });
    } catch (error) {
      // TODO: add proper error showing
      console.log(error, "register sale error");
      dispatchSales({ type: SaleActionTypes.SALE_FAIL, payload: [] });
    }
  };

  return (
    <Card style={{ minWidth: "250px" }} key={product.id} title={product.name}>
      <Space direction="vertical">
        {articlesList?.map(
          (article) => article && <Text key={article.id}>{article.name}</Text>
        )}

        <Text strong>Quantity: {productQuantity}</Text>

        {productQuantity > 0 && (
          <Button
            type="primary"
            onClick={handleSaleOneProduct}
            loading={sales.loading}
          >
            Sale 1
          </Button>
        )}
      </Space>
    </Card>
  );
};
