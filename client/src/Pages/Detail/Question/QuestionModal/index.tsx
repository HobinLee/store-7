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
import ValidationInput from "@/Components/Input/ValidationInput";
import { validateTextarea, VALIDATION_ERR_MSG } from "@/utils/validations";
import useValidation from "@/hooks/useValidation";

export const TYPES = ["상품", "배송", "반품", "교환", "환불", "기타"];
interface QuestionModal {
  handleModalOpen: Function;
  submitType: string;
  question?: QuestionForm;
  refetch: () => Promise<QueryObserverResult<unknown>>;
}
const QuestionModal = ({
  handleModalOpen,
  question = { type: "상품", question: "", isSecret: false },
  submitType,
  refetch,
}: QuestionModal) => {
  const questionVal = useInput(question.question);
  const pathname = location.pathname.split("detail/")[1];
  const questionValidation = useValidation(validateTextarea);

  // 문의 유형
  const [type, setType] = useState(question.type);
  const handleSetType = (val: string) => {
    setType(val);
  };

  // 비밀글
  const [isSecret, setIsSecret] = useState<boolean>(question.isSecret);

  const handleSumbit = async () => {
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
        id: question.id,
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

  // 글자 수
  const [contentLen, setContentLen] = useState(0);
  const handleContentInput = ({ target }: { target: HTMLTextAreaElement }) => {
    setContentLen(target.value.length);
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
          <div className="modal__content-label">
            <div>문의 작성</div>
            <div>
              <span>{contentLen}</span>/100
            </div>
          </div>
          <ValidationInput
            input={questionVal}
            validation={questionValidation}
            placeholder="문의 내용을 입력하세요."
            message={VALIDATION_ERR_MSG.INVALID_QUESTION}
            className="question"
            type="textarea"
            onInput={handleContentInput}
            maxLength={99}
          />
        </div>
        <APIButton
          api={handleSumbit}
          primary
          className="submit-btn"
          disabled={!questionValidation.isValid}
        >
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
    &__question-type {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
    &__content {
      ${({ theme }) => theme.font.medium};
      margin-top: 4rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      ${gap("1rem", "column")}
      &-label {
        display: flex;
        justify-content: space-between;
        span {
          color: ${({ theme }) => theme.color.primary1};
          font-weight: 800;
        }
      }
      .question {
        border: 0.1rem solid ${({ theme }) => theme.color.line};
        height: 10rem;
        padding: 1.5rem;
        line-height: 2rem;
        ${({ theme }) => theme.font.medium};
        ${({ theme }) => theme.borderRadius.medium};
      }
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

export default QuestionModal;
