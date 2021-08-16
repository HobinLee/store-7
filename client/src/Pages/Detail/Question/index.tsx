import React from "react";
import styled from "styled-components";
import Button from "@/Components/Button";
import QuestionBox from "./QuestionBox";
import { useState } from "react";
import QuestionModal from "./QuestionModal";
import { questions } from "@/shared/dummy";

const Question = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const handleModalOpen = (val: boolean) => {
    if (!val) {
      const submit = window.confirm(
        "작성하고 있던 내용이 유실됩니다. 정말 다른 페이지로 이동하시겠어요?"
      );
      if (submit) setIsModalOpened(val);
    } else setIsModalOpened(val);
  };

  return (
    <div>
      <Header>
        <div>
          상품문의 <span className="total">{questions.totalCount}</span>
        </div>

        <Button onClick={() => handleModalOpen(true)} primary>
          문의하기
        </Button>
      </Header>
      {questions.questions.map((question, idx) => (
        <QuestionBox {...question} key={idx} />
      ))}

      {isModalOpened && <QuestionModal {...{ handleModalOpen }} />}
    </div>
  );
};

const Header = styled.div`
  ${({ theme }) => theme.flexCenter};
  ${({ theme }) => theme.font.xlarge};
  justify-content: space-between;
  .total {
    color: ${({ theme }) => theme.color.primary1};
  }
`;

export default Question;
