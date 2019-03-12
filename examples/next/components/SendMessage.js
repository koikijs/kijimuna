import React from "react";
import styled from "styled-components";
import { PROPS, ACTION_ID } from "../../../kijimuna-server/src/constants";
import theme from "../themes/vibrant";

export default class SendMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }
  render() {
    return (
      <Div theme={theme}>
        <TextArea
          theme={theme}
          onChange={event => {
            this.setState({ message: event.target.value });
          }}
          value={this.state.message}
        />
        <SendButton
          theme={theme}
          onClick={() => {
            this.props.websocket.send(
              JSON.stringify({
                [PROPS.ACTION]: ACTION_ID.SEND,
                [PROPS.DATA]: {
                  [PROPS.MESSAGE]: this.state.message
                }
              })
            );
            this.setState({
              message: ""
            });
          }}
        >
          <i className="fas fa-running" />
        </SendButton>
      </Div>
    );
  }
}

const Div = styled.div`
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
  height: 2.5em;
  outline: none;
  padding: 10px;
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
