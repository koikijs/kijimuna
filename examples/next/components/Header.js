import styled from "styled-components";
import theme from "../themes/vibrant";

export default ({ title, icon }) => (
  <Header theme={theme}>
    {icon ? <Icon src={icon} theme={theme} /> : null}
    {title}
  </Header>
);

const Header = styled.div`
  color: ${props => props.theme.main.primary};
  background-color: ${props => props.theme.back.primary};
  height: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
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
