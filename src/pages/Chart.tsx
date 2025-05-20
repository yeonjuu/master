import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { ICoinHistory } from "../types/CoinDataType";
import ApexChart from "react-apexcharts";

type ChartProps = {
  coinId: string;
};

// I gonna use https://apexcharts.com/ for chart
function Chart({ coinId }: ChartProps) {
  const { isLoading, data: chartInfo } = useQuery<ICoinHistory[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));

  console.log(chartInfo);
  //data format => serises : [{data : [{x : 123, y : [1,2,3,4]}]}]
  const series =
    chartInfo?.map((data) => {
      return {
        x: new Date(data.time_open).getTime(),
        y: [data.open, data.high, data.low, data.close],
      };
    }) ?? [];

  return (
    <div>
      <h2>Chart</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ApexChart
            type="candlestick"
            width={450}
            height={350}
            series={[
              {
                data: series,
              },
            ]}
            options={{
              chart: {
                toolbar: { show: false },
              },
              xaxis: {
                labels: { show: false },
                // axisBorder: { show: false },
                axisTicks: { show: false },
              },
              yaxis: {
                labels: { show: false },
                axisBorder: { show: false },
                axisTicks: { show: false },
                tooltip: { enabled: false },
              },
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
export default Chart;
