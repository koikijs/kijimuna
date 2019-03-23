import styled from "styled-components";
import { connect } from "react-redux";
import fetch from "isomorphic-unfetch";
import Router from "next/router";

import getHeaders from "../helpers/header";
import Header from "../components/Header";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import Container from "../components/Container";
import LoginPopup from "../components/LoginPopup";
import { fetchUser } from "../reducers/user";
import { issueToken } from "../reducers/token";
import {
  receive as receiveWs,
  open as openWs,
  clear as clearMessage
} from "../reducers/ws";
import { fetchGroups, fetchGroup } from "../reducers/group";
import config from "../config";

function Main({ user, groups, group, token, ws, receiveWs, openWs }) {
  return (
    <Div>
      {!user ? (
        <LoginPopup />
      ) : (
        <Container>
          <LeftPanel groups={groups} selected={group} />
          <RightPanel
            token={token}
            ws={ws}
            group={group}
            onReceive={receiveWs}
            onClose={() => {}}
            onOpen={openWs}
          />
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

const getGroupFromUrl = pathname => {
  const matched = pathname.match(/^\/groups\/([^\?\/]+)/);
  return matched ? matched[1] : "";
};

Main.getInitialProps = async ({ req = {}, asPath, store, isServer, res }) => {
  const group = getGroupFromUrl(asPath);

  store.dispatch(clearMessage());

  if (!store.getState().user.item) {
    await store.dispatch(fetchUser({ req, res }));
    await store.dispatch(fetchGroups({ req, res, group }));
  }

  if (store.getState().user.item && group) {
    await store.dispatch(fetchGroup({ req, group }));
    await store.dispatch(issueToken({ req, group }));
  }
  return {};
};

export default connect(
  state => ({
    user: state.user.item,
    group: state.group.item,
    groups: state.group.items,
    token: state.token.item,
    ws: state.ws
  }),
  {
    receiveWs,
    openWs
  }
)(Main);
