import styled from "styled-components";
import theme from "../themes/vibrant";

export default () => <Header theme={theme}>Hoge Group</Header>;

const Header = styled.div`
  color: ${props => props.theme.main.primary};
  background-color: ${props => props.theme.back.primary};
  height: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
`;
