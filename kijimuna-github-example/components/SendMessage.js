import styled from "styled-components";
import theme from "../themes/vibrant";

export default () => (
  <SendMessage theme={theme}>
    <TextArea theme={theme} />
    <SendButton theme={theme}>
      <i className="fas fa-running" />
    </SendButton>
  </SendMessage>
);

const SendMessage = styled.div`
  color: ${props => props.theme.main.primary};
  background-color: ${props => props.theme.back.primary};
  height: 8em;
  display: flex;
  justify-content: stretch;
  align-items: center;
  position: relative;
`;

const TextArea = styled.textarea`
  width: 100%;
  margin: 0 20px;
  border-radius: 1em;
  height: 2em;
  outline: none;
  padding: 1em;
  resize: none;
  font-size: 16px;
`;

const SendButton = styled.button`
  width: 20px;
  height: 27.5px;
  position: absolute;
  color: ${props => props.theme.back.secondary};
  right: 40px;
  font-size: 25px;
`;
