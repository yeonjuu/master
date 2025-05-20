import { ThemeProvider } from "styled-components";
import Router from "./Router";
import { GlobalStyle } from "./style/GlobalStyle";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRecoilState } from "recoil";
import { isDarkMode } from "./atom";
import { darkTheme, lightTheme } from "./style/theme";

function App() {
  const isDark = useRecoilState(isDarkMode);
  console.log(isDark);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </>
  );
}

export default App;
