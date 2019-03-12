import styled from "styled-components";
import theme from "../themes/vibrant";
import Link from "next/link";

export default () => (
  <LoginPopup theme={theme}>
    <Overlay theme={theme} />
    <Popup theme={theme}>
      <Line>Welcome to Github Kijimuna Example!</Line>
      <LoginWithGithub theme={theme} href="/auth/github">
        <Span>Login with</Span>
        <i className="fab fa-github" />
      </LoginWithGithub>
    </Popup>
  </LoginPopup>
);

const LoginPopup = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Line = styled.p`
  font-size: 24px;
  line-height: 2em;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.main.secondary};
`;

const Popup = styled.div`
  background-color: ${props => props.theme.back.secondary};
  width: 500px;
  height: 500px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

const Span = styled.span`
  margin-right: 10px;
`;

const LoginWithGithub = styled.a`
  color: ${props => props.theme.main.primary};
  background-color: ${props => props.theme.back.primary};
  font-size: 24px;
  font-weight: 100;
  padding: 10px 20px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
