import styled from "styled-components";
import { connect } from "react-redux";
import fetch from "isomorphic-unfetch";
import Router from "next/router";

import Header from "../components/Header";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import Container from "../components/Container";
import LoginPopup from "../components/LoginPopup";
import { set as setUser } from "../reducers/user";
import { set as setToken } from "../reducers/token";
import {
  receive as receiveWs,
  open as openWs,
  clear as clearMessage
} from "../reducers/ws";
import {
  sets as setGroups,
  set as setGroup,
  select as selectGroup
} from "../reducers/group";
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

const getHeaders = ({ req }) => {
  const headers = {
    "content-type": "application/json"
  };
  if (req && req.headers) {
    headers.cookie = req.headers.cookie;
  }
  return headers;
};

const fetchAuth = async ({ store, req, group }) => {
  const res = await fetch(`${config.origin}/auth`, {
    headers: getHeaders({ req })
  });
  const json = await res.json();
  if (res.ok) {
    store.dispatch(setUser(json));
  }
};

const fetchUser = async ({ store, req, res, group }) => {
  const response = await fetch(`${config.origin}/api/me`, {
    headers: getHeaders({ req })
  });
  const json = await response.json();
  store.dispatch(setGroups(json.groups));
  if (!group && json.groups && json.groups.length) {
    if (res) {
      res.writeHead(302, {
        Location: `${config.origin}/groups/${json.groups[0].id}`
      });
      res.end();
    } else {
      Router.replace({
        pathname: "/",
        query: { group: json.groups[0].id },
        asPath: `/groups/${json.groups[0].id}`
      });
    }
  }
};

const fetchGroup = async ({ store, req, group }) => {
  const res = await fetch(
    `${config.origin}/api/groups/${encodeURIComponent(group)}`,
    {
      headers: getHeaders({ req })
    }
  );
  const json = await res.json();
  store.dispatch(setGroup(json));
};

const issueToken = async ({ store, req, group }) => {
  const res = await fetch(`${config.origin}/api/token`, {
    method: "POST",
    headers: getHeaders({ req }),
    body: JSON.stringify({
      group
    })
  });
  const json = await res.json();
  store.dispatch(setToken(json.token));
};

const getGroupFromUrl = pathname => {
  const matched = pathname.match(/^\/groups\/(.+)$/);
  return matched ? matched[1] : "";
};

Main.getInitialProps = async ({ req = {}, asPath, store, isServer, res }) => {
  const group = getGroupFromUrl(asPath);

  store.dispatch(clearMessage());

  if (!store.getState().user.item) {
    await fetchAuth({ req, store, res });
    await fetchUser({ req, store, res, group });
  }

  if (store.getState().user.item && group) {
    await fetchGroup({ req, store, group });
    await issueToken({ req, store, group });
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
