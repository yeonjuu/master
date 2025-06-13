import { Link, Outlet, Params, useLocation, useMatch, useParams } from "react-router-dom";
import { Container, Header, Loader, Title } from "../components";
import { styled } from "styled-components";
import { InfoData, PriceData } from "../types/CoinDataType";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTicker } from "../api";
import { Helmet } from "react-helmet-async";
import { BackIcon } from "../components/icons";

interface RouteState {
  name: string;
}

interface RouteParams extends Params {
  coinId: string;
}

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.backgroundOverlay};
  color: ${(props) => props.theme.textOnOverlay};
  color: #fff;
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => (props.$isActive ? props.theme.textOnAccent : "#fff")};
  a {
    display: block;
  }
`;

const BackButton = styled.button`
  color: ${(props) => props.theme.iconColor}; // ← currentColor에 영향을 줌
  background: none;
  border: none;
  display: flex;
  align-items: center;
`;
function Coin() {
  const { coinId } = useParams<RouteParams>();
  const location = useLocation();
  const state = location.state as RouteState;

  const piceMatch = useMatch(`/:coinId/price`); // useMatch는 현재 URL이 주어진 경로와 일치하는지 확인하는 훅, 일치하지 않는 경우 null 반환
  const chartMatch = useMatch(`/:coinId/chart`);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId!));
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(["price", coinId], () =>
    fetchCoinTicker(coinId!)
  );

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : loading ? "Loading" : infoData?.name}</title>
      </Helmet>
      <Header>
        <Link to="/">
          <BackButton>
            <BackIcon />
          </BackButton>
        </Link>
        <Title>{state?.name ? state.name : loading ? "Loading" : infoData?.name}</Title>
        <span style={{ visibility: "hidden" }}>
          <BackButton>
            <BackIcon />
          </BackButton>
        </span>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab $isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`} state={{ name: infoData?.name }}>
                Chart
              </Link>
            </Tab>
            <Tab $isActive={piceMatch !== null}>
              <Link to={`/${coinId}/price`} state={{ name: infoData?.name }}>
                Price
              </Link>
            </Tab>
          </Tabs>
          <Outlet context={{ coinId }} />
        </>
      )}
    </Container>
  );
}

export default Coin;
