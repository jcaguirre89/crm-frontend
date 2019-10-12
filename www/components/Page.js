import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Meta from './Meta';
import Header from './Header';
import media from './styles/media';

const theme = {
  ...media,
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightGrey: '#E1E1E1',
  blue: '#243485',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  border: 1px solid goldenrod;
  grid-template-columns: 300px 1fr;
  height: 100vh;
  ${({ theme }) => theme.tablet`
      grid-template-columns: 1fr;
   `}
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

const Main = styled.div`
  overflow-y: scroll;
`;

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    @import url('https://fonts.googleapis.com/css?family=Open+Sans');
    font-family: 'Open Sans', sans-serif;
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.black}
  }
`;

export default function Page({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <GlobalStyles />
        <Meta />
        <Grid>
          <Main>
            <Header />
            <Inner>{children}</Inner>
          </Main>
        </Grid>
      </StyledPage>
    </ThemeProvider>
  );
}
