import React from "react";
import styled from "styled-components";
import SendMessage from "../components/SendMessage";
import Header from "../components/Header";
import theme from "../themes/vibrant";
import config from "../config";
import ws from "../helpers/ws";

export default class RightPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      websocket: {
        send: () => {},
        close: () => {}
      }
    };
    this.connect = this.connect.bind(this);
  }
  componentDidMount() {
    this.connect(this.props.token);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token !== this.props.token) {
      this.state.websocket.close();
      this.connect(nextProps.token);
    }
  }
  componentWillUnmount() {
    this.state.websocket.close();
  }

  connect(token) {
    const websocket = ws(`${config.kijimuna.ws}/ws/connects/${token}`);
    websocket.onopen = () => {
      this.props.onOpen();
    };
    websocket.onclose = () => {
      this.props.onClose();
    };
    websocket.onmessage = message => {
      let json = {};
      try {
        json = JSON.parse(message.data);
      } catch (e) {}
      this.props.onReceive(json);
    };
    this.setState({
      websocket
    });
  }

  render() {
    const attendees = this.props.group.attendees;
    const findUser = user =>
      (attendees.find(attendee => attendee.id === user) || {}).icon;
    return (
      <Div>
        <Header title={this.props.group.id} icon={this.props.group.icon} />
        <Messages theme={theme}>
          {this.props.ws.messages.map(message => (
            <Message key={message.id}>
              <User>
                <Icon src={findUser(message.posted)} theme={theme} />
                <Name>{message.posted}</Name>
              </User>
              <Text theme={theme}>{message.message}</Text>
            </Message>
          ))}
        </Messages>
        <SendMessage websocket={this.state.websocket} />
      </Div>
    );
  }
}

const Div = styled.div`
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
  padding: 20px;
  overflow-y: scroll;
`;
const Message = styled.li`
  margin-bottom: 10px;
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Name = styled.div`
  font-weight: bold;
`;

const Icon = styled.div`
  width: 25px;
  height: 25px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
  margin-right: 10px;
  background-position: center;
  background-color: ${props => props.theme.main.primary};
`;
const Text = styled.pre`
  margin-left: 35px;
  font-weight: 300;
  color: ${props => props.theme.back.primary};
  font-size: 1.2em;
  font-family: Roboto;
`;
