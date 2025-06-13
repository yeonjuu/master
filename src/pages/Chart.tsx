import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { ICoinHistory } from "../types/CoinDataType";
import ApexChart from "react-apexcharts";
import { useOutletContext } from "react-router-dom";

type ChartProps = {
  coinId: string;
};

function Chart() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data: chartInfo } = useQuery<ICoinHistory[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));

  //data format => serises : [{data : [{x : 123, y : [1,2,3,4]}]}]
  const series =
    chartInfo?.map((data) => {
      return {
        x: new Date(data.time_open).getTime(),
        y: [parseFloat(data.open), parseFloat(data.high), parseFloat(data.low), parseFloat(data.close)],
      };
    }) ?? [];

  return (
    <div>
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
                enabled: true,
                shared: true,
                intersect: false,
                x: {
                  formatter: (val) => new Date(val).toLocaleDateString("ko-KR"),
                },
                custom: function ({ _, seriesIndex, dataPointIndex, w }) {
                  const [o, h, l, c] = w.globals.initialSeries[seriesIndex].data[dataPointIndex].y;

                  return `
                    <div style="padding: 8px; font-size: 13px">
                      <div>📈 Open: $${o.toLocaleString()}</div>
                      <div>📊 High: $${h.toLocaleString()}</div>
                      <div>📉 Low: $${l.toLocaleString()}</div>
                      <div>🔚 Close: $${c.toLocaleString()}</div>
                    </div>
                  `;
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
