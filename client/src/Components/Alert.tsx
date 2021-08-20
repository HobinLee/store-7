import { AlertType } from "@/shared/type";
import { alertState } from "@/store/state";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const ALERT_TIME = 1000;

const Alert = () => {
  const [alert, setAlert] = useRecoilState(alertState);

  const hideAlert = () => {
    setAlert({
      isOpened: false,
      message: alert.message,
    });
  };

  const showAlert = () => setTimeout(hideAlert, ALERT_TIME);

  useEffect(() => {
    alert.isOpened && showAlert();
  }, [alert.isOpened]);

  return (
    <AlertWrapper>
      <div className={`alert__message ${!alert.isOpened && "hide-alert"}`}>
        {alert.message}
      </div>
    </AlertWrapper>
  );
};

export const alert = (message: string): AlertType => {
  return {
    isOpened: true,
    message,
  };
};

const AlertWrapper = styled.div`
  position: fixed;
  width: 100%;
  bottom: 5vh;
  left: 0;

  .alert__message {
    width: fit-content;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.6);
    font-size: 1.8rem;
    color: white;
    padding: 1.2rem 2.4rem;
    border-radius: 2.4rem;
    opacity: 1;
    transition: 0.5s;
    transform: none;
  }

  .hide-alert {
    transition: 0.5s;
    opacity: 0;
    transform: translateY(100%);
  }
`;

export default Alert;
