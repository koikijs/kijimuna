import styled from "styled-components";
import theme from "../themes/vibrant";
import { Link } from "../server/routes";

export default ({ groups, selected }) => (
  <Navigation theme={theme}>
    <Title>Organizations</Title>
    <List>
      {groups.map(group => (
        <Item key={group.id}>
          <Link
            as={`/groups/${encodeURIComponent(group.id)}`}
            href={`/?group=${group.id}`}
          >
            <A theme={theme} isSelected={selected.id === group.id}>
              <Icon src={group.icon} theme={theme} />
              {group.id}
            </A>
          </Link>
        </Item>
      ))}
    </List>
  </Navigation>
);

const Title = styled.h1`
  font-size: 1.3em;
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const Navigation = styled.div`
  display: flex;
  color: ${props => props.theme.main.secondary};
  background-color: ${props => props.theme.back.secondary};
  width: 250px;
  height: 100%;
  max-width: 250px;
  font-weight: 300;
  flex-direction: column;
  padding: 20px 0;
  @media (max-width: 700px) {
    position: absolute:
    left: -100%;
    &.isOpen {
      left: 0%;
      
    }
  }
`;

const List = styled.ul`
  width: 100%;
  margin: 20px 0;
`;
const Item = styled.li``;

const A = styled.a`
  color: ${props =>
    props.isSelected ? props.theme.back.secondary : props.theme.main.secondary};
  background-color: ${props =>
    props.isSelected ? props.theme.main.secondary : "none"};
  padding: 10px;
  font-size: 1em;
  display: flex;
  align-items: center;
  transition: color, background-color 0.2s;
  &:hover {
    color: ${props => props.theme.back.secondary};
    background-color: ${props => props.theme.main.secondary};
    opacity: 0.7;
  }
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
