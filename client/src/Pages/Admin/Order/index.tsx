import { getOrders, patchOrders } from "@/api/orders";
import properties from "@/config/properties";
import { MyOrderType } from "@/shared/type";
import { useEffect } from "react";
import { MouseEvent } from "react";
import { useState } from "react";
import * as S from "./styles";

const OrderStatusColor = {
  배송준비중: "red",
  배송중: "yellow",
  배송완료: "green",
};

const AdminOrder = () => {
  const [orders, setOrders] = useState<MyOrderType[]>([]);

  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
    });
  }, []);

  return (
    <S.AdminOrder>
      <S.Header>
        <div>Total ({orders.length})</div>
      </S.Header>
      <S.OrderListHeader>
        <div>주문번호</div>
        <div>상품명</div>
        <div>옵션</div>
        <div>주문자</div>
        <div>주문량</div>
        <div>주문 금액</div>
        <div>주문 상태</div>
      </S.OrderListHeader>
      <S.OrderList>{convertProductsToElement(orders, setOrders)}</S.OrderList>
    </S.AdminOrder>
  );
};

const convertProductsToElement = (orders: MyOrderType[], setOrders) => {
  const getOption = (order: MyOrderType) => {
    if (order.productOptionId) {
      return order.optionName + " | " + order.optionValue;
    }
    return "없음";
  };

  return orders.map((order) => {
    const changeOrderStatus = (e: MouseEvent<HTMLElement>, id) => {
      if (e.target instanceof HTMLLIElement) {
        const status = e.target.innerText;
        patchOrders({ id, data: { status } })
          .then(() => {
            alert(`${id}번 주문의 상태가 [${status}]로 변경 되었습니다`);
            setOrders(
              orders.map((order) => {
                if (order.id === id) {
                  order.status = status;
                }
                return order;
              })
            );
          })
          .catch((err) => {
            alert("뭔가 변경이 안되나봐요?!;;;");
          });
      }
    };

    return (
      <S.OrderItem>
        <div>{order.id}</div>
        <div>
          <img src={getImage(order.image)} />
          {order.productName}
        </div>
        <div>{getOption(order)}</div>
        <div>{order.addressee}</div>
        <div>{order.amount}개</div>
        <div>{order.price}원</div>
        <div className="status">
          <label className={OrderStatusColor[order.status]}>
            {order.status}
          </label>
          <S.OrderItemStatus onClick={(e) => changeOrderStatus(e, order.id)}>
            <li className="red">배송준비중</li>
            <li className="yellow">배송중</li>
            <li className="green">배송완료</li>
          </S.OrderItemStatus>
        </div>
      </S.OrderItem>
    );
  });
};

const getImage = (name: string) => {
  return properties.imgURL + name;
};

export default AdminOrder;
