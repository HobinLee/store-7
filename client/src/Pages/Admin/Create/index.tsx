import properties from "@/config/properties";
import * as S from "./styles";
import LeftArrowIcon from "../../../assets/left-arrow.png";
import AddIcon from "../../../assets/add.png";
import DeleteIcon from "../../../assets/delete.png";
import { Page } from "..";
import { ChangeEvent, FC, KeyboardEvent, MouseEvent, useState } from "react";
import { useEffect } from "react";
import { postProduct } from "@/api/products";
import { CATEGORY } from "@/shared/type";

interface Props {
  setPage: (name: Page) => void;
}

type Option = {
  name: string;
  stock: number;
};

const AdminProductCreate: FC<Props> = ({ setPage }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountResult, setDiscountResult] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [optionName, setOptionName] = useState("");
  const [options, setOptions] = useState<Option[]>([{ name: "", stock: 0 }]);
  const [image, setImage] = useState<File>();
  const [detailImages, setDetailImages] = useState<File[]>([]);

  const [categoryOpened, setCategoryOpened] = useState(false);
  const [subCategoryOpened, setSubCategoryOpened] = useState(false);

  const backButtonClickHandler = () => {
    setPage("Product");
  };

  const inputChangeHandler = (event, setMethod) => {
    setMethod(event.target.value);
  };

  useEffect(() => {
    if (discount > 100) {
      setDiscount(100);
    }
    const finalPrice = price * (1 - discount / 100);
    setDiscountResult(finalPrice);
  }, [price, discount]);

  const InputBox = (label, inputType, setMethod) => {
    return (
      <div className="input-box">
        <label>{label}</label>
        <div>
          <input
            type={inputType}
            onChange={(e) => inputChangeHandler(e, setMethod)}
          />
        </div>
      </div>
    );
  };

  const ImageBox = (label: string, multiple: boolean, changeHandler, child) => {
    return (
      <div className="file">
        <label>{label}</label>
        <input
          id={label}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={changeHandler}
        />
        <label className="button" htmlFor={label}>
          파일 추가
        </label>
        {child}
      </div>
    );
  };

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0] as File;
    setImage(file);
  };
  const changeDetailImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    let files = [];
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList[i]);
    }
    setDetailImages(files);
  };

  const getOptionList = () => {
    const valueChangeHandler = (
      e: ChangeEvent<HTMLInputElement>,
      option: Option
    ) => {
      const name = e.target.value;
      setOptions(
        options.map((o) => {
          if (o === option) {
            return { name, stock: o.stock };
          }
          return o;
        })
      );
    };
    const stockChangeHandler = (
      e: ChangeEvent<HTMLInputElement>,
      option: Option
    ) => {
      const stock = Number(e.target.value);
      setOptions(
        options.map((o) => {
          if (o === option) {
            return { name: o.name, stock };
          }
          return o;
        })
      );
    };
    const deleteOption = (option: Option) => {
      setOptions(options.filter((o) => o !== option));
    };

    return options.map((option) => {
      return (
        <div className="list">
          <div className="input-box">
            <label>항목</label>
            <div>
              <input
                type="text"
                value={option.name}
                onChange={(e) => valueChangeHandler(e, option)}
              />
            </div>
          </div>
          <div className="input-box">
            <label>재고</label>
            <div>
              <input
                type="number"
                value={option.stock}
                onChange={(e) => stockChangeHandler(e, option)}
              />
            </div>
          </div>
          <img src={DeleteIcon} onClick={() => deleteOption(option)} />
        </div>
      );
    });
  };

  const optionAddClickHandler = () => {
    setOptions(options.concat([{ name: "", stock: 0 }]));
  };

  const addProduct = () => {
    if (name && category && subCategory) {
      if (optionName) {
        const optionValid = options.reduce((acc, cur) => {
          if (cur.name) return acc && true;
          return false;
        }, true);
        if (!optionValid) {
          alert("옵션 항목을 입력해주세요.");
          return;
        }
      }
      if (!image) {
        alert("상품 이미지를 선택해주세요.");
        return;
      }
      if (detailImages.length === 0) {
        alert("상품 세부 이미지를 선택해주세요.");
        return;
      }
      submitProduct({
        name,
        price,
        deliveryCost,
        discount,
        stock,
        category,
        subCategory,
        optionName,
        options,
        image,
        detailImages,
        setPage,
      });
      return;
    }
    alert("상품 정보를 입력해주세요.");
  };

  const getImageInfo = () => {
    const imageName = image ? image.name : "없음";
    return <span>파일 이름: {imageName}</span>;
  };

  const categoryOpenHandler = () => {
    setCategoryOpened(true);
    setSubCategoryOpened(false);
  };

  const subCategoryOpenHandler = () => {
    setCategoryOpened(false);
    setSubCategoryOpened(true);
  };

  const categoryTypeHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const categorySelectHandler = (e: MouseEvent<HTMLElement>) => {
    if (e.target instanceof HTMLLIElement) {
      const selectedCategory = e.target.innerText;
      setCategory(selectedCategory);
      setSubCategory("");
      setCategoryOpened(false);
    }
  };

  const subCategorySelectHandler = (e: MouseEvent<HTMLElement>) => {
    if (e.target instanceof HTMLLIElement) {
      const selectedCategory = e.target.innerText;
      setSubCategory(selectedCategory);
      setSubCategoryOpened(false);
    }
  };

  const getSubCategories = () => {
    if (!category) return [];
    return CATEGORY[category].list.map((subCategoryOfSelected) => (
      <li>{subCategoryOfSelected.name}</li>
    ));
  };

  return (
    <S.AdminProductCreate>
      <img src={LeftArrowIcon} onClick={backButtonClickHandler} />
      <div className="content">
        <div className="header">Add Product</div>
        {InputBox("상품명", "text", setName)}
        {InputBox("상품 가격", "number", setPrice)}
        {InputBox("배송비", "number", setDeliveryCost)}
        <div className="input-box">
          <label>할인률</label>
          <div>
            <input
              type="number"
              onChange={(e) => inputChangeHandler(e, setDiscount)}
            />
          </div>
          <p className="info">할인된 금액: {discountResult}원</p>
        </div>
        {InputBox("재고", "number", setStock)}
        <div className="input-box">
          <label>카테고리</label>
          <div>
            <input
              type="text"
              value={category}
              onKeyDown={categoryTypeHandler}
              onFocus={categoryOpenHandler}
            />
            <S.DropDownList
              opened={categoryOpened}
              onClick={categorySelectHandler}
            >
              <li>문구</li>
              <li>리빙</li>
              <li>책</li>
              <li>배민그린</li>
              <li>ㅋㅋ에디션</li>
              <li>을지로 에디션</li>
              <li>배달이 친구들</li>
              <li>선물하기</li>
              <li>콜라보레이션</li>
            </S.DropDownList>
          </div>
        </div>
        <div
          className={
            "input-box " + (getSubCategories().length == 0 ? "hide" : "")
          }
        >
          <label>서브 카테고리</label>
          <div>
            <input
              type="text"
              value={subCategory}
              onKeyDown={categoryTypeHandler}
              onFocus={subCategoryOpenHandler}
              disabled={getSubCategories().length == 0}
            />
            <S.DropDownList
              opened={subCategoryOpened}
              onClick={subCategorySelectHandler}
            >
              {getSubCategories()}
            </S.DropDownList>
          </div>
        </div>
        <div className="option">
          <div className="input-box">
            <label>옵션</label>
            <div>
              <input
                type="text"
                onChange={(e) => inputChangeHandler(e, setOptionName)}
              />
            </div>
            <img src={AddIcon} onClick={optionAddClickHandler} />
          </div>
          <div>{getOptionList()}</div>
        </div>
        {ImageBox("상품 이미지", false, changeImageHandler, getImageInfo())}
        {ImageBox(
          "설명 이미지",
          true,
          changeDetailImageHandler,
          <span>업로드된 파일: {detailImages.length}개</span>
        )}
        <div className="submit-box">
          <button onClick={addProduct}>상품 추가</button>
        </div>
      </div>
    </S.AdminProductCreate>
  );
};

const submitProduct = async ({
  name,
  price,
  deliveryCost,
  discount,
  stock,
  category,
  subCategory,
  optionName,
  options,
  image,
  detailImages,
  setPage,
}) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("deliveryCost", deliveryCost);
  formData.append("discountRate", discount);
  formData.append("stock", stock);
  formData.append("category", CATEGORY[category].code);
  formData.append(
    "subCategory",
    CATEGORY[category].list.filter(
      (subCategoryOfSelected) => subCategoryOfSelected.name === subCategory
    )[0]?.id
  );
  formData.append("images", image);
  for (let i = 0; i < detailImages.length; i++) {
    formData.append("details", detailImages[i]);
  }
  if (optionName) {
    const optionData = {
      value: optionName,
      list: options,
    };
    formData.append("option", JSON.stringify(optionData));
  }

  postProduct({ data: formData })
    .then(() => {
      alert("상품이 추가되었습니다.");
      setPage("Product");
    })
    .catch((_err) => {
      alert("상품 추가에 실패하였습니다.");
    });
};

export default AdminProductCreate;
