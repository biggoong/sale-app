export enum ProductsActionTypes {
  LOAD_INIT = "load_products_init",
  LOAD_SUCCESS = "load_products_success",
  LOAD_FAIL = "load_products_fail",
}

type TArticleInProduct = {
  id: string;
  amountRequired: number;
};

export type TProduct = {
  name: string;
  id: string;
  articles: TArticleInProduct[];
};

export type TProductsState = {
  products?: TProduct[];
  loading: boolean;
  error?: boolean;
};

type TProductsAction = {
  type: ProductsActionTypes;
  payload?: TProduct[];
  error?: boolean;
};

export const initialProductsState: TProductsState = {
  products: [],
  loading: false,
  error: false,
};

export function productsReducer(
  state: TProductsState,
  action: TProductsAction
): TProductsState {
  switch (action.type) {
    case ProductsActionTypes.LOAD_INIT:
      return { products: [], loading: true, error: false };
    case ProductsActionTypes.LOAD_SUCCESS:
      return { products: action.payload, error: false, loading: false };
    case ProductsActionTypes.LOAD_FAIL:
      return { products: [], error: action.error, loading: false };
    default:
      throw new Error();
  }
}
