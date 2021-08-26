import styled from "styled-components";

export const AdminProductCreate = styled.div`
  padding: 30px;

  > img {
    width: 50px;
    cursor: pointer;
  }

  > .content {
    width: 60%;
    margin: 0 auto;
    margin-top: 50px;
    padding: 20px;
    padding-top: 50px;
    background-color: white;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    box-shadow: 3px 3px 5px #d8d8d8;

    > .header {
      width: fit-content;
      color: white;
      background-color: #2a78c3;
      padding: 20px 40px;
      margin-bottom: -60px;
      box-shadow: 3px 3px 5px #21609c;
      border-radius: 4px;
      font-size: 20px;
      transform: translate(15px, -120%);
    }

    .input-box {
      position: relative;
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;

      > label {
        width: fit-content;
        background-color: white;
        font-size: 14px;
        transform: translate(10px, 50%);
        padding: 0 5px;
        color: #6c6e6f;
        user-select: none;
      }

      > div {
        background-color: white;
        height: 40px;
        width: 100%;

        input {
          height: 100%;
          width: -webkit-fill-available;
          padding: 0 15px;
          font-size: 16px;
          border: 1px solid #d2d2d2;
          border-radius: 4px;
          transition: 0.2s;

          :focus {
            border: 1px solid #2a78c3;
          }
          ::-webkit-inner-spin-button {
            -webkit-appearance: none;
          }
        }
      }
      .info {
        text-align: right;
        margin-top: 10px;
        color: #11b50e;
        font-size: 14px;
      }
    }

    > .submit-box {
      display: flex;
      justify-content: flex-end;
      margin: 0;

      > button {
        height: 36px;
        width: 90px;
        background-color: #2a78c3;
        color: white;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
        z-index: 2;
        box-shadow: 1px 1px 2px #21609c;
        transition: 0.2s;

        :hover {
          box-shadow: 3px 3px 5px #21609c;
          transform: scale(1.05);
        }
      }
    }

    .option {
      display: flex;
      justify-content: space-between;

      > .input-box {
        position: relative;
        display: flex;
        width: 45%;

        img {
          position: absolute;
          top: 20px;
          right: -40px;
        }
      }
      > div {
        display: flex;
        flex-direction: column;
        width: 45%;

        > .list {
          display: flex;
          justify-content: space-between;
          align-items: center;

          > div {
            width: 45%;
          }
          > img {
            height: 28px;
            margin-top: -5px;
          }
        }
      }

      img {
        height: 32px;
        cursor: pointer;
        transition: 0.2s;

        :hover {
          transform: scale(1.1);
        }
      }
    }

    > .file {
      height: 50px;
      margin-top: 15px;

      > label {
        font-size: 16px;
        color: #6c6e6f;
        margin-right: 15px;
      }
      > .button {
        position: relative;
        padding: 5px 15px;
        color: white;
        background-color: #2a78c3;
        font-size: 12px;
        border-radius: 4px;
        cursor: pointer;
        z-index: 2;
        box-shadow: 1px 1px 2px #21609c;
        transition: 0.2s;

        :hover {
          box-shadow: 3px 3px 5px #21609c;
          transform: scale(1.1);
        }
      }
    }
  }
`;
