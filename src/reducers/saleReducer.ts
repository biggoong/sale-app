export enum SaleActionTypes {
  SALE_INIT = "sale_init",
  SALE_SUCCESS = "sale_success",
  SALE_FAIL = "sale_fail",
}

export type TSale = {
  id: string;
  productId: string;
  createAt: string;
  amountSold: number;
};

type TSaleAction = {
  type: SaleActionTypes;
  payload: TSale[];
  error?: boolean;
};

export type TSaleState = {
  sales: TSale[];
  loading: boolean;
  error?: boolean;
};

export const initialSaleState: TSaleState = {
  sales: [],
  loading: false,
  error: false,
};

export function saleReducer(
  state: TSaleState,
  action: TSaleAction
): TSaleState {
  switch (action.type) {
    case SaleActionTypes.SALE_INIT:
      return { sales: [], loading: true, error: false };
    case SaleActionTypes.SALE_SUCCESS:
      return { sales: action.payload, error: false, loading: false };
    case SaleActionTypes.SALE_FAIL:
      return { sales: [], error: action.error, loading: false };

    default:
      throw new Error();
  }
}
