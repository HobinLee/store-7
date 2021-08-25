import * as S from "../styles";
import SearchIcon from "../../../../assets/search.png";
import { ChangeEvent, FC, KeyboardEvent, useState } from "react";

interface Props {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

const SearchInput: FC<Props> = ({ keyword, setKeyword }) => {
  const [input, setInput] = useState(keyword);

  const typeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const element = e.target;
    setInput(element.value);
  };

  const typeEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      searchHandler();
    }
  };

  const searchHandler = () => {
    setKeyword(input);
  };

  return (
    <S.SearchBox>
      <input
        value={input}
        type="text"
        placeholder="Search..."
        onChange={typeHandler}
        onKeyDown={typeEnterHandler}
      />
      <img src={SearchIcon} alt="Search" onClick={searchHandler} />
    </S.SearchBox>
  );
};

export default SearchInput;
