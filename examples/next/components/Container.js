import styled from "styled-components";

export default ({ children }) => <Container>{children}</Container>;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: stretch;
  height: 100%;
`;
