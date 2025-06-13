import { ThemeProvider } from "styled-components";
import Router from "./Router";
import { GlobalStyle } from "./style/GlobalStyle";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRecoilState } from "recoil";
import { isDarkMode } from "./atom";
import { darkTheme, lightTheme } from "./style/theme";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const [isDark] = useRecoilState(isDarkMode);

  return (
    <HelmetProvider>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
