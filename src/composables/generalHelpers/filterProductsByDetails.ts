// availabilityOptions={} priceOptions={} productTypeOptions={} sizeOptions={}

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

export function productsAvailableFilters(
  filterType:
    | "all"
    | "swanfest"
    | "sale"
    | "tour"
    | "best"
    | "newest"
    | "productCategory",
  productCategory?: string
) {
  const availabilityOptions: any = [];
  const priceOptions: any = [];
  const productTypeOptions: any = [];
  const sizeOptions: any = [];
  // every item must have these properties :  value: string;name: string;itemsNumberAvailable: number;
  // left here
  return { availabilityOptions, priceOptions, productTypeOptions, sizeOptions };
}
