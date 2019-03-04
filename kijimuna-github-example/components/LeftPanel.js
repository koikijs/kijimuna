import styled from "styled-components";
import theme from "../themes/vibrant";

export default () => (
  <Navigation theme={theme}>
    <List>
      <Item>Hoge Group</Item>
      <Item>Hage Group</Item>
    </List>
  </Navigation>
);

const Navigation = styled.div`
  display: flex;
  color: ${props => props.theme.main.secondary};
  background-color: ${props => props.theme.back.secondary};
  width: 30%;
  max-width: 250px;
`;

const List = styled.ul`
  width: 100%;
  margin: 20px;
`;
const Item = styled.li`
  padding-bottom: 10px;
`;
