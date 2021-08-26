export interface ProductReviewsQuery {
  sortBy?: "popularity" | "latest";
  isPhotoOnly?: "true" | "false";
  rating?: "1" | "2" | "3" | "4" | "5" | "all";
}
