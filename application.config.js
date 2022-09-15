const CONFIG = {
  inventory: {
    headerDataSet: [
      "id",
      "productSku",
      "stockQuantity",
      "stockBatch",
      "stockUnitPrice",
      "applicableGST",
      "comment",
      "vendorName",
    ],
    searchFieldHeaderSet: [
      "productSku",
      "stockQuantity",
      "stockUnitPrice",
      "comment",
      "vendorName",
    ],
  },
  supplier: {
    headerDataSet: ["id", "name", "fullName"],
  },
};

export default CONFIG;
