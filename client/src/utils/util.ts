import { CartType, ICart, PartialCart } from "@/shared/type";
import dayjs from "dayjs";

export const imageZoom = (imgID: string, resultID: string, lensID: string) => {
  const moveLens = (e: MouseEvent) => {
    e.preventDefault();

    const pos = getCursorPos(e);

    let x = pos.x - lens.offsetWidth / 2;
    let y = pos.y - lens.offsetHeight / 2;

    if (x > img.width - lens.offsetWidth) {
      x = img.width - lens.offsetWidth;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > img.height - lens.offsetHeight) {
      y = img.height - lens.offsetHeight;
    }
    if (y < 0) {
      y = 0;
    }

    lens.style.left = x + "px";
    lens.style.top = y + "px";

    result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
  };

  const getCursorPos = (e: MouseEvent) => {
    const a = img.getBoundingClientRect();

    let x = e.pageX - a.left;
    let y = e.pageY - a.top;

    x -= window.pageXOffset;
    y -= window.pageYOffset;
    return { x: x, y: y };
  };

  const img = document.getElementById(imgID) as HTMLImageElement;
  const result = document.getElementById(resultID);
  const lens = document.getElementById(lensID) as HTMLElement;

  img.parentElement.insertBefore(lens, img);

  const cx = result.offsetWidth / lens.offsetWidth;
  const cy = result.offsetHeight / lens.offsetHeight;

  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = img.width * cx + "px " + img.height * cy + "px";

  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);

  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
};

export const getCurrentPrice = (price: number, discountRate: number) => {
  const saledPrice = calSaledPrice(price, discountRate);
  return convertToKRW(saledPrice);
};

export const calSaledPrice = (price: number, discountRate: number) => {
  return (price * (100 - discountRate)) / 100;
};

export const convertToKRW = (price) => {
  return (price?.toLocaleString() ?? 0) + "원";
};

export const YYYY_M_D_H_m = (date: Date) =>
  dayjs(date).format("YYYY년 M월 D일 H시 m분");

export const YYYYMMDD = (date: Date) => dayjs(date).format("YYYYMMDD");
export const YYYYMMDD_DOT = (date: Date) => dayjs(date).format("YYYY.MM.DD");
// 문자열 중간에 char 삽입
export const insertChar = (str, index, char) => {
  return str.substring(0, index) + char + str.substring(index, str.length);
};

//숫자만 받아서 전화번호 form으로 만들기
// string에 입력된 숫자만 추출
export const convertToNumber = (str: string): string => {
  const regex = new RegExp("[^0-9]", "g");
  const maxLength = 11;

  return str.replace(regex, "").substring(0, maxLength);
};

export const convertToPhoneNumber = (origin?: string): string => {
  if (!origin) return "";

  //010-23O8-1O24
  const numbers = convertToNumber(origin);

  //01023081024
  let form = numbers;

  //010-2
  if (numbers.length > 3) {
    form = insertChar(form, 3, "-");
  }
  //010-2308-1
  if (numbers.length > 7) {
    form = insertChar(form, 8, "-");
  }
  return form;
};
