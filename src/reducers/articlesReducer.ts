export enum ArticlesActionTypes {
  LOAD_INIT = "load_articles_init",
  LOAD_SUCCESS = "load_articles_success",
  LOAD_FAIL = "load_articles_fail",
  UPDATE_ARTICLES = "update_articles",
}

export type TArticle = {
  id: string;
  name: string;
  amountInStock: number;
};

type TArticlesAction = {
  type: ArticlesActionTypes;
  payload: TArticle[];
  error?: boolean;
};

export type TArticlesState = {
  articles: TArticle[];
  loading: boolean;
  error?: boolean;
};

export const initialArticlesState: TArticlesState = {
  articles: [],
  loading: false,
  error: false,
};

export function articlesReducer(
  state: TArticlesState,
  action: TArticlesAction
): TArticlesState {
  switch (action.type) {
    case ArticlesActionTypes.LOAD_INIT:
      return { articles: [], loading: true, error: false };
    case ArticlesActionTypes.LOAD_SUCCESS:
      return { articles: action.payload, error: false, loading: false };
    case ArticlesActionTypes.LOAD_FAIL:
      return { articles: [], error: action.error, loading: false };
    case ArticlesActionTypes.UPDATE_ARTICLES:
      const newState = [...state.articles];
      action.payload?.forEach((newItem) => {
        const foundIndex = newState.findIndex((x) => x.id === newItem.id);

        newState[foundIndex] = newItem;
      });
      return { articles: newState, loading: false, error: false };

    default:
      throw new Error();
  }
}
