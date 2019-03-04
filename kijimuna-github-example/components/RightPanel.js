import styled from "styled-components";
import SendMessage from "../components/SendMessage";
import Header from "../components/Header";
import theme from "../themes/vibrant";

export default () => (
  <RightPanel>
    <Header />
    <Messages theme={theme}>
      <Message>Hoge Group</Message>
      <Message>Hage Group</Message>
    </Messages>
    <SendMessage />
  </RightPanel>
);

const RightPanel = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  flex-direction: column;
`;

const Messages = styled.ul`
  color: ${props => props.theme.back.tertiary};
  background-color: ${props => props.theme.main.tertiary};
  height: 100%;
`;
const Message = styled.li``;
