import { GET } from "@/utils/axios";

// GET /search/:keyword
export const getSearch = ({ keyword }) => GET(`/search/${keyword}`);
