import styled from "styled-components";
import { connect } from "react-redux";
import fetch from "isomorphic-unfetch";

import Header from "../components/Header";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import Container from "../components/Container";
import LoginPopup from "../components/LoginPopup";
import { set as setUser } from "../reducers/user";
import config from "../config";

function Main({ user }) {
  return (
    <Div>
      {!user ? (
        <LoginPopup />
      ) : (
        <Container>
          <LeftPanel />
          <RightPanel />
        </Container>
      )}
    </Div>
  );
}

const Div = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

Main.getInitialProps = async ({ req, store, isServer }) => {
  if (req.user) {
    store.dispatch(
      setUser({
        id: req.user.id,
        name: req.user.username
      })
    );
    const res = await fetch(`${config.origin}/api/sync`, {
      headers: req.headers
    });
    const json = await res.json();
  }
  return {};
};

export default connect(
  state => ({
    user: state.user.item
  }),
  {}
)(Main);
