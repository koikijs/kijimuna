import styled from "styled-components";
import { connect } from "react-redux";
import fetch from "isomorphic-unfetch";
import { Router } from "../server/routes";

import Header from "../components/Header";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import Container from "../components/Container";
import LoginPopup from "../components/LoginPopup";
import { set as setUser } from "../reducers/user";
import { set as setToken } from "../reducers/token";
import { receive as receiveWs, open as openWs } from "../reducers/ws";
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

const fetchUser = async ({ store, req, res, group }) => {
  const response = await fetch(`${config.origin}/api/me`, {
    headers: req.headers
  });
  const json = await response.json();
  store.dispatch(setGroups(json.groups));
  if (!group && json.groups && json.groups.length) {
    if (res) {
      res.redirect(`${config.origin}/groups/${json.groups[0].id}`);
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
      headers: req.headers
    }
  );
  const json = await res.json();
  store.dispatch(setGroup(json));
};

const issueToken = async ({ store, req, group }) => {
  const res = await fetch(`${config.origin}/api/token`, {
    method: "POST",
    headers: {
      ...req.headers,
      "Content-Type": "application/json"
    },
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

  if (req.user) {
    store.dispatch(
      setUser({
        id: req.user.id,
        name: req.user.username
      })
    );
    await fetchUser({ req, store, res, group });
  }
  const user = store.getState().user.item;
  if (user && group) {
    await Promise.all([
      fetchGroup({ req, store, group }),
      issueToken({
        req,
        store,
        group
      })
    ]);
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
