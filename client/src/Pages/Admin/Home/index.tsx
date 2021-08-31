import { getStocksOfCategories, getStocksOfHotCategories } from "@/api/admin";
import DoughnutChart from "@/Components/DoughnutChart";
import BarChart from "@/Components/BarChart";
import { useEffect, useState } from "react";
import * as S from "./styles";

const CATEGORY_STRING = {
  100: "문구",
  200: "리빙",
  300: "책",
  400: "배민그린",
  500: "ㅋㅋ에디션",
  600: "을지로 에디션",
  700: "배달이 친구들",
  800: "선물하기",
  900: "골라보레이션",
};

const AdminHome = () => {
  const [categoryStock, setCategoryStocks] = useState({});
  const [hotCategoryStock, setHotCategoryStock] = useState({});

  useEffect(() => {
    getCategoryStock(getStocksOfCategories, "등록량").then((response) => {
      setCategoryStocks(response);
    });
    getCategoryStock(getStocksOfHotCategories, "주문량").then((response) => {
      console.log(response);
      setHotCategoryStock(response);
    });
  }, []);

  return (
    <S.AdminHome>
      <S.ChartVerticalLayer>
        <S.ChartBox>
          <BarChart title="상품 등록량" data={categoryStock} />
        </S.ChartBox>
        <S.ChartBox>
          <DoughnutChart title="카테고리별 인기도" data={hotCategoryStock} />
          미완성,,,,
        </S.ChartBox>
      </S.ChartVerticalLayer>
    </S.AdminHome>
  );
};

const getCategoryStock = async (getMethod, label) => {
  const response = await getMethod();
  const labels = [],
    data = [];
  response.forEach((category) => {
    labels.push(CATEGORY_STRING[category.category]);
    data.push(category.stock);
  });

  return {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
};

export default AdminHome;
