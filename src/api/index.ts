const BASE_URL = "http://localhost:7000";

// Get all products
export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  if (response.ok) {
    return response.json();
  }

  throw new Error("Something went wrong");
};

// Get all articles
export const fetchArticles = async () => {
  const response = await fetch(`${BASE_URL}/articles`);
  if (response.ok) {
    return response.json();
  }

  throw new Error("Something went wrong");
};

type saleData = {
  productId: string;
  amountSold: number;
};

// Register sale
export const registerSale = async (data: saleData) => {
  const response = await fetch(`${BASE_URL}/sales`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error("Something went wrong");
};

type articleData = {
    id: string,
    amountToSubtract: number,
}

// Update articles in bulk
export const updateArticles = async (data: articleData[]) => {
    const response = await fetch(`${BASE_URL}/articles`, {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      return response.json();
    }
  
    throw new Error("Something went wrong");
  };
  