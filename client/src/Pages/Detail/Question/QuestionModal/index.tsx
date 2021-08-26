import Button from "@/Components/Button";
import useInput from "@/hooks/useInput";
import styled from "styled-components";
import ModalWrapper from "@/Components/ModalWrapper";
import { useState } from "react";
import { gap } from "@/styles/theme";
import { postQuestion, patchQuestion } from "@/api/questions";
import Checkbox from "@/Components/Checkbox";
import { QuestionForm } from "@/Pages/MyPage/ContentArea/contents/Question";
import APIButton from "@/Components/APIButton";
import { QueryObserverResult } from "react-query";

export const TYPES = ["상품", "배송", "반품", "교환", "환불", "기타"];
interface QuestionModal {
  handleModalOpen: Function;
  submitType: string;
  qeustion?: QuestionForm;
  refetch: () => Promise<QueryObserverResult<unknown>>;
}
const QuestionModal = ({
  handleModalOpen,
  qeustion = { type: "상품", question: "", isSecret: false },
  submitType,
  refetch,
}: QuestionModal) => {
  const questionVal = useInput(qeustion.question);
  const pathname = location.pathname.split("detail/")[1];

  // 문의 유형
  const [type, setType] = useState(qeustion.type);
  const handleSetType = (val: string) => {
    setType(val);
  };

  // 비밀글
  const [isSecret, setIsSecret] = useState<boolean>(qeustion.isSecret);

  const handleSumbit = async (e) => {
    if (submitType === "post") {
      await postQuestion({
        productId: parseInt(pathname),
        type: type,
        question: questionVal.value,
        isSecret: isSecret,
      });
      handleModalOpen(false, true);
      refetch();
    } else if (submitType === "patch") {
      await patchQuestion({
        id: qeustion.id,
        question: {
          type: type,
          question: questionVal.value,
          isSecret,
        },
      });
      handleModalOpen(false, true);
      refetch();
    }
  };

  return (
    <ModalWrapper title="문의하기" closeModal={() => handleModalOpen(false)}>
      <Wrapper>
        <div className="modal__content">
          <Checkbox
            isChecked={isSecret}
            handleCheck={() => setIsSecret(!isSecret)}
            size="small"
            label="비밀글"
            className="secret-checkbox"
          />
          <div className="modal__content-label">문의 유형</div>
          <div className="modal__question-type">
            {TYPES.map((item, idx) => (
              <TypeBtn
                key={idx}
                onClick={() => handleSetType(item)}
                primary={type === item}
              >
                {item}
              </TypeBtn>
            ))}
          </div>
        </div>

        <div className="modal__content">
          <div className="modal__content-label">문의 내용</div>
          <QuestionInput
            placeholder="문의 내용을 입력하세요."
            defaultValue={questionVal.value}
            onChange={questionVal.onChange}
          />
        </div>
        <APIButton api={handleSumbit} primary className="submit-btn">
          완료
        </APIButton>
      </Wrapper>
    </ModalWrapper>
  );
};

const Wrapper = styled.form`
  ${({ theme }) => theme.flexCenter};
  flex-direction: column;
  width: 100%;
  position: relative;
  .modal {
    &__content {
      margin-top: 4rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      ${gap("1rem", "column")}
      &-label {
        ${({ theme }) => theme.font.medium};
      }
    }
    &__question-type {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }
  .secret-checkbox {
    position: absolute;
    top: -3rem;
    left: 1rem;
  }
  .submit-btn {
    width: 100%;
    margin-top: 3rem;
  }
`;

const TypeBtn = styled(Button)`
  ${({ theme }) => theme.font.medium};
  border: none;
`;

const QuestionInput = styled.textarea`
  border: 0.1rem solid ${({ theme }) => theme.color.line};
  height: 10rem;
  padding: 1.5rem;
  ${({ theme }) => theme.font.medium};
  ${({ theme }) => theme.borderRadius.medium};
`;

export default QuestionModal;
