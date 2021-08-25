import Button from "@/Components/Button";
import useInput from "@/hooks/useInput";
import styled from "styled-components";
import ModalWrapper from "@/Components/ModalWrapper";
import { useState } from "react";
import { gap } from "@/styles/theme";
import { postQuestion, patchQuestion } from "@/api/questions";
import Checkbox from "@/Components/Checkbox";

export const OPTIONS = ["상품", "배송", "반품", "교환", "환불", "기타"];
interface QuestionModal {
  handleModalOpen: (boolean) => void;
  submitType: string;
  qeustion?: {
    id?: number;
    option: string;
    value: string;
    isSecret: boolean;
  };
}
const QuestionModal = ({
  handleModalOpen,
  qeustion = { option: "상품", value: "", isSecret: false },
  submitType,
}: QuestionModal) => {
  const reviewVal = useInput(qeustion.value);
  const pathname = location.pathname.split("detail/")[1];

  // 문의 유형
  const [option, setOption] = useState(qeustion.option);
  const handleSetOption = (val: string) => {
    setOption(val);
  };

  // 비밀글
  const [isSecret, setIsSecret] = useState(qeustion.isSecret);

  const handleSumbit = async (e) => {
    submitType === "post"
      ? await postQuestion({
          productId: parseInt(pathname),
          type: option,
          question: reviewVal.value,
          isSecret: isSecret,
        })
      : submitType === "patch"
      ? await patchQuestion({
          id: qeustion.id,
          question: {
            type: option,
            question: reviewVal.value,
            isSecret,
          },
        })
      : "";
  };

  return (
    <ModalWrapper title="문의하기" closeModal={() => handleModalOpen(false)}>
      <Wrapper onSubmit={handleSumbit}>
        <div className="modal__content">
          <Checkbox
            isChecked={isSecret}
            handleCheck={() => setIsSecret(!isSecret)}
            size="small"
            label="비밀글"
            className="secret-checkbox"
          />
          <div className="modal__content-label">문의 유형</div>
          <div className="modal__question-option">
            {OPTIONS.map((item, idx) => (
              <OptionBtn
                key={idx}
                onClick={() => handleSetOption(item)}
                primary={option === item}
              >
                {item}
              </OptionBtn>
            ))}
          </div>
        </div>

        <div className="modal__content">
          <div className="modal__content-label">문의 내용</div>
          <QuestionInput
            placeholder="문의 내용을 입력하세요."
            defaultValue={reviewVal.value}
            onChange={reviewVal.onChange}
          />
        </div>

        <SubmitBtn type="submit" primary>
          완료
        </SubmitBtn>
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
    &__question-option {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }
  .secret-checkbox {
    position: absolute;
    top: -3rem;
    left: 1rem;
  }
`;

const OptionBtn = styled(Button)`
  ${({ theme }) => theme.font.medium};
  border: none;
`;

const QuestionInput = styled.textarea`
  border: 0.1rem solid ${({ theme }) => theme.color.line};
  height: 10rem;
  padding: 1.5rem;
`;

const SubmitBtn = styled(Button)`
  width: 100%;
  margin-top: 3rem;
`;

export default QuestionModal;
