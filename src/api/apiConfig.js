export const idStore = "ijpxNJLM732vm8AeajMR";

export const apiConfig = {
  getStore: `/stores/${idStore}`,
  getProducts: `/stores/${idStore}/products`,
  getProduct: (idProduct) => `/stores/${idStore}/products/${idProduct}`,
  postProduct: `/stores/${idStore}/products`,
  deleteProduct: (idProduct) => `/stores/${idStore}/products/${idProduct}`,
  getStatsCategory: `/stores/${idStore}/stats/categories`,
}