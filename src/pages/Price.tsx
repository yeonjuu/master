import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import { ICoinHistory } from "../types/CoinDataType";
import { styled } from "styled-components";

type PriceProps = {
  coinId: string;
};

const formatCurrency = (value: number) => `$${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

function Price() {
  const { coinId } = useOutletContext<PriceProps>();
  const { isLoading, data: priceInfo } = useQuery<ICoinHistory[]>(["prices", coinId], () => fetchCoinHistory(coinId));

  console.log("priceInfo:", priceInfo);

  if (isLoading) {
    return <Wrapper>Loading...</Wrapper>;
  }

  const todayPrice = priceInfo && priceInfo.length > 0 ? priceInfo[0] : undefined;

  if (!priceInfo || priceInfo.length === 0) {
    return <Wrapper>Price data not available</Wrapper>;
  }

  if (!todayPrice) {
    return null;
  }

  const open = parseFloat(todayPrice.open);
  const close = parseFloat(todayPrice.close);
  const high = parseFloat(todayPrice.high);
  const low = parseFloat(todayPrice.low);
  const volume = parseFloat(todayPrice.volume);
  const change = close - open;
  const changeRate = ((change / open) * 100).toFixed(2);
  const up = change > 0;

  return (
    <Wrapper>
      <Title>📊 Today's Price</Title>
      <Row>
        <Label>Open</Label>
        <Value>{formatCurrency(open)}</Value>
      </Row>
      <Row>
        <Label>Close</Label>
        <Value>{formatCurrency(close)}</Value>
      </Row>
      <Row>
        <Label>High</Label>
        <Value>{formatCurrency(high)}</Value>
      </Row>
      <Row>
        <Label>Low</Label>
        <Value>{formatCurrency(low)}</Value>
      </Row>
      <Row>
        <Label>Volume</Label>
        <Value>{volume.toLocaleString()} BTC</Value>
      </Row>
      <Row>
        <Label>Change</Label>
        <Value style={{ color: up ? "#00cb00" : "#cb0000" }}>
          {change > 0 ? "+" : ""}
          {formatCurrency(change)} ({changeRate}%)
        </Value>
      </Row>
    </Wrapper>
  );
}

// Styled Components
const Wrapper = styled.div`
  border-radius: 12px;
  background-color: ${(props) => props.theme.backgroundOverlay};
  color: ${(props) => props.theme.textOnOverlay};
  padding: 24px;
  margin-top: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 12px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const Label = styled.span`
  font-weight: 400;
`;

const Value = styled.span`
  font-weight: 600;
`;

export default Price;
