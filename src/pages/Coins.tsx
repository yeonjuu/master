import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { Coin, CoinsList, Container, Header, Loader, Title } from "../components";
import { CoinObject } from "../types/CoinDataType";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useRecoilState } from "recoil";
import { isDarkMode } from "../atom";

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.accentColor};
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
`;

function Coins() {
  const { isLoading, data: coins } = useQuery<CoinObject[]>("allCoins", fetchCoins);

  const [isDark, setIsDark] = useRecoilState(isDarkMode);
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <StyledButton></StyledButton>
        <Title>코인</Title>
        <StyledButton onClick={toggleTheme}>{isDark ? "🌙" : "☀️"}</StyledButton>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {coins?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ coinId: coin.id }}>
                <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
