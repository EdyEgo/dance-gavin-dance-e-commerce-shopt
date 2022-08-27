// availabilityOptions={} priceOptions={} productTypeOptions={} sizeOptions={}

interface itemFilterObject {
  value: string;
  name: string;
  itemsNumberAvailable: number;
  selected: boolean;
}

export function findFitFilteringType(
  collectionTypeParams: string
):
  | "all"
  | "tour"
  | "swanfest"
  | "sale"
  | "best"
  | "newest"
  | "productCategory" {
  if (collectionTypeParams === "dance-gavin-dance") {
    return "all";
  }
  if (collectionTypeParams === "new-arrivals") {
    return "newest";
  }
  if (collectionTypeParams === "swanfest") {
    return "swanfest";
  }
  if (collectionTypeParams === "best-sellers") {
    return "best";
  }
  if (collectionTypeParams === "sale") {
    return "sale";
  }

  return "all";
}

// function excludeProductsByfilterType(
//   filterType:
//     | "all"
//     | "swanfest"
//     | "sale"
//     | "tour"
//     | "best"
//     | "newest"
//     | "productCategory",
//   productsList: any[]
// ) {
//   if (filterType === "all") {
//     return productsList;
//   }
// }

function findIfProductIsAvailable(productObject: {
  numberItemsAvailable: null | number;
  sizesAvailable: null | {
    [key: string]: {
      price: string;
      numberItemsAvailable: string;
      sold: number;
    };
  };
}) {
  const { numberItemsAvailable, sizesAvailable } = productObject;
  let isAvailable = false;
  if (numberItemsAvailable != null && numberItemsAvailable > 0) {
    return true;
  }
  if (sizesAvailable != null) {
    const sizesAvailableArray = Object.entries(sizesAvailable);
    for (const sizeIndex of sizesAvailableArray) {
      const sizeObject = sizeIndex[1];
      const numberItemsAvailableNumber =
        typeof sizeObject.numberItemsAvailable === "string"
          ? parseInt(sizeObject.numberItemsAvailable)
          : sizeObject.numberItemsAvailable;
      if (numberItemsAvailableNumber > 0) {
        isAvailable = true;
        break;
      }
    }

    return isAvailable;
  }
  // if a size has even an size with numberItmesAvailable bigger than 0 than break and return true
}

function modifyPriceRange(
  productObject: {
    price: null | number;
    sizesAvailable: null | {
      [key: string]: {
        price: string;
        numberItemsAvailable: string;
        sold: number;
      };
    };
  },
  currentPriceRange: [number, number]
) {
  const newPriceRange = [...currentPriceRange];

  const { price, sizesAvailable } = productObject;
  if (price != null && currentPriceRange[0] <= 0) {
    // if price is zero than add a first price
    newPriceRange.splice(0, 1, price);
  }

  if (price != null && price < currentPriceRange[0]) {
    // / if there is a smaller price than add that price
    newPriceRange.splice(0, 1, price);
  }

  if (price != null && price > currentPriceRange[1]) {
    // if there is a bigger price then add than price as the new limit of the price range
    newPriceRange.splice(1, 1, price);
  }

  if (sizesAvailable != null) {
    const sizesAvailableArray = Object.entries(sizesAvailable);

    for (const sizeIndex of sizesAvailableArray) {
      const sizeObject = sizeIndex[1];
      const priceNumber =
        typeof sizeObject.price === "string"
          ? parseInt(sizeObject.price)
          : sizeObject.price;
      const numberItemsAvailableNumber =
        typeof sizeObject.numberItemsAvailable === "string"
          ? parseInt(sizeObject.numberItemsAvailable)
          : sizeObject.numberItemsAvailable;

      if (currentPriceRange[0] <= 0 && numberItemsAvailableNumber > 0) {
        // if price is zero than add a first price
        newPriceRange.splice(0, 1, priceNumber);
      }

      if (
        priceNumber < currentPriceRange[0] &&
        numberItemsAvailableNumber > 0
      ) {
        // / if there is a smaller price than add that price
        newPriceRange.splice(0, 1, priceNumber);
      }

      if (
        priceNumber > currentPriceRange[1] &&
        numberItemsAvailableNumber > 0
      ) {
        // if there is a bigger price then add than price as the new limit of the price range
        newPriceRange.splice(1, 1, priceNumber);
      }
    }
  }

  return newPriceRange;
}

function modifySizeOptions(
  productObject: {
    sizesAvailable: null | {
      [key: string]: {
        price: string;
        numberItemsAvailable: string;
        sold: number;
      };
    };
  },
  currentSizeList: { [key: string]: itemFilterObject }
) {
  const { sizesAvailable } = productObject;
  if (sizesAvailable == null) {
    return currentSizeList;
  }
  const newSizeList = { ...currentSizeList };
  // this does not make any sens , why don't i just edit the object itself without makeing a copy :/ bruh
  const sizesAvailableArray = Object.entries(sizesAvailable);

  for (const sizeIndex of sizesAvailableArray) {
    const sizeName: any = sizeIndex[0].trim();
    const sizeObject = sizeIndex[1];

    // here add the model as number of available items not the number of sizes available
    const numberItemsAvailableNumber =
      typeof sizeObject.numberItemsAvailable === "string"
        ? parseInt(sizeObject.numberItemsAvailable)
        : sizeObject.numberItemsAvailable;

    const isSizeNameInSizeList = Object.hasOwn(newSizeList, sizeName);

    if (numberItemsAvailableNumber > 0 && isSizeNameInSizeList) {
      // add to an allready existing size
      newSizeList[sizeName] = {
        ...newSizeList[sizeName],
        itemsNumberAvailable: newSizeList[sizeName].itemsNumberAvailable + 1,
      };
    }
    if (numberItemsAvailableNumber > 0 && isSizeNameInSizeList === false) {
      newSizeList[sizeName] = {
        itemsNumberAvailable: 1, // numberItemsAvailableNumber,
        name: sizeName,
        value: sizeName.toLowerCase(),
        selected: false,
      };
    }
  }

  return newSizeList;
}

function modifyProductTypeOptions(
  productObject: {
    productCategory: string;
  },
  currentProductTypeList: { [key: string]: itemFilterObject }
) {
  const { productCategory } = productObject;

  const newProductTypeList = { ...currentProductTypeList };

  if (Object.hasOwn(newProductTypeList, productCategory)) {
    newProductTypeList[productCategory] = {
      ...newProductTypeList[productCategory],
      itemsNumberAvailable:
        newProductTypeList[productCategory].itemsNumberAvailable + 1,
    };
    return newProductTypeList;
  }
  newProductTypeList[productCategory] = {
    itemsNumberAvailable: 1,
    name: productCategory,
    value: productCategory.toLowerCase(),
    selected: false,
  };
  return newProductTypeList;
}

export function productsAvailableFilters(
  filterType:
    | "all"
    | "swanfest"
    | "sale"
    | "tour"
    | "best"
    | "newest"
    | "productCategory",
  productsList: any[],
  productCategory?: string
) {
  const availabilityOptions: {
    inStock: { name: "In stock"; numberItems: number; selected: boolean };
    outOfStock: {
      name: "Out of Stock";
      numberItems: number;
      selected: boolean;
    };
  } = {
    inStock: { name: "In stock", numberItems: 0, selected: false },
    outOfStock: { name: "Out of Stock", numberItems: 0, selected: false },
  };
  let priceRange: [number, number] = [0, 0];
  let productTypeOptions: { [key: string]: itemFilterObject } = {};
  let sizeOptions: { [key: string]: itemFilterObject } = {};
  // every item must have these properties :  value: string;name: string;itemsNumberAvailable: number;
  // left here

  const filteredProducts: any[] = [];

  // productsList.forEach((productObjectValue: any) => {
  //   if (
  //     filterType === "newest" &&
  //     productObjectValue?.new != null &&
  //     productObjectValue.new
  //   ) {
  //     filteredProducts.push(productObjectValue);
  //   }

  // });

  function addToRangesNumbers(productObjectValue: any) {
    const productAvailable = findIfProductIsAvailable(productObjectValue);
    const newPriceRange: any = modifyPriceRange(productObjectValue, priceRange);
    const newSizesAvailable = modifySizeOptions(
      productObjectValue,
      sizeOptions
    );
    const newProductTypeOptions: any = modifyProductTypeOptions(
      productObjectValue,
      productTypeOptions
    );

    if (productAvailable === true) {
      availabilityOptions.inStock.numberItems += 1;
      // left here
    }
    if (productAvailable === false) {
      availabilityOptions.outOfStock.numberItems += 1;
    }

    priceRange = newPriceRange;
    productTypeOptions = newProductTypeOptions;
    sizeOptions = newSizesAvailable;
  }

  const filterTypes: { [key: string]: (productObjectValue: any) => void } = {
    all: (productObjectValue: any) => {
      filteredProducts.push(productObjectValue);
      addToRangesNumbers(productObjectValue);
    },
    sale: (productObjectValue: any) => {
      filteredProducts.push(productObjectValue);
      addToRangesNumbers(productObjectValue);
    },
    best: (productObjectValue: any) => {
      if (
        productObjectValue?.best != null &&
        productObjectValue.best === true
      ) {
        filteredProducts.push(productObjectValue);
        addToRangesNumbers(productObjectValue);
      }
    },
    tour: (productObjectValue: any) => {
      if (
        productObjectValue?.tour != null &&
        productObjectValue.tour === true
      ) {
        filteredProducts.push(productObjectValue);
        addToRangesNumbers(productObjectValue);
      }
    },
    newest: (productObjectValue: any) => {
      if (productObjectValue?.new != null && productObjectValue.new) {
        filteredProducts.push(productObjectValue);
        addToRangesNumbers(productObjectValue);
      }
    },
  };

  for (const productObjectValue of productsList) {
    filterTypes[filterType](productObjectValue);
  }

  return {
    availabilityOptions,
    priceRange,
    productTypeOptions,
    sizeOptions,
    filteredProducts,
  };
}
