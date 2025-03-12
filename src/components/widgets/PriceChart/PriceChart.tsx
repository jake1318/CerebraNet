import React, { useState, useEffect } from "react";
import "./PriceChart.scss";

interface ChartProps {
  pairName: string;
  timeframe?: "5m" | "15m" | "1h" | "4h" | "1d" | "1w";
  height?: number;
}

interface PricePoint {
  time: number;
  price: number;
  volume?: number;
}

const PriceChart: React.FC<ChartProps> = ({
  pairName,
  timeframe = "1h",
  height = 350,
}) => {
  const [chartData, setChartData] = useState<PricePoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>(timeframe);
  const [priceChange, setPriceChange] = useState<{
    percent: string;
    direction: "up" | "down" | "neutral";
  }>({ percent: "0.00%", direction: "neutral" });

  // Generate mock chart data
  useEffect(() => {
    const generateMockData = () => {
      setLoading(true);

      // Number of points based on timeframe
      let points = 100;
      let volatility = 0.01; // 1%

      switch (selectedTimeframe) {
        case "5m":
          points = 60;
          volatility = 0.005;
          break;
        case "15m":
          points = 60;
          volatility = 0.008;
          break;
        case "1h":
          points = 100;
          volatility = 0.01;
          break;
        case "4h":
          points = 150;
          volatility = 0.02;
          break;
        case "1d":
          points = 200;
          volatility = 0.03;
          break;
        case "1w":
          points = 250;
          volatility = 0.05;
          break;
      }

      // Base price depends on the pair
      let basePrice = 10;
      if (pairName.includes("BTC")) basePrice = 61000;
      else if (pairName.includes("ETH")) basePrice = 3200;
      else if (pairName.includes("SUI")) basePrice = 1.8;
      else if (pairName.includes("USDC") || pairName.includes("USDT"))
        basePrice = 1;

      // Generate random price data
      const now = Date.now();
      let lastPrice = basePrice;

      const data: PricePoint[] = Array.from({ length: points }, (_, i) => {
        const timeOffset =
          i *
          (selectedTimeframe === "5m"
            ? 5 * 60 * 1000
            : selectedTimeframe === "15m"
            ? 15 * 60 * 1000
            : selectedTimeframe === "1h"
            ? 60 * 60 * 1000
            : selectedTimeframe === "4h"
            ? 4 * 60 * 60 * 1000
            : selectedTimeframe === "1d"
            ? 24 * 60 * 60 * 1000
            : 7 * 24 * 60 * 60 * 1000);

        // Random walk for price
        const changePercent = (Math.random() - 0.5) * volatility;
        lastPrice = lastPrice * (1 + changePercent);

        // Generate some volume
        const volume = Math.random() * basePrice * 100;

        return {
          time: now - (points - i) * timeOffset,
          price: lastPrice,
          volume,
        };
      });

      // Calculate price change
      const firstPrice = data[0].price;
      const lastPrice = data[data.length - 1].price;
      const change = ((lastPrice - firstPrice) / firstPrice) * 100;
      const direction: "up" | "down" | "neutral" =
        change > 0 ? "up" : change < 0 ? "down" : "neutral";

      setPriceChange({
        percent: `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`,
        direction,
      });

      setChartData(data);
      setLoading(false);
    };

    generateMockData();
  }, [pairName, selectedTimeframe]);

  const timeframeOptions = ["5m", "15m", "1h", "4h", "1d", "1w"];

  // Calculate position of price points in the chart
  const renderChart = () => {
    if (chartData.length === 0) return null;

    // Find min and max for scaling
    const prices = chartData.map((point) => point.price);
    const minPrice = Math.min(...prices) * 0.995;
    const maxPrice = Math.max(...prices) * 1.005;
    const priceRange = maxPrice - minPrice;

    // Chart dimensions
    const paddingX = 40;
    const paddingY = 30;
    const chartWidth = 1000 - paddingX * 2;
    const chartHeight = height - paddingY * 2;

    // Scale points to chart dimensions
    const scaledPoints = chartData.map((point, i) => {
      const x = paddingX + (i / (chartData.length - 1)) * chartWidth;
      const y =
        height -
        paddingY -
        ((point.price - minPrice) / priceRange) * chartHeight;
      return { x, y, ...point };
    });

    // Create SVG path for the line
    let path = "";
    scaledPoints.forEach((point, i) => {
      if (i === 0) {
        path += `M ${point.x} ${point.y}`;
      } else {
        path += ` L ${point.x} ${point.y}`;
      }
    });

    // Create gradient fill path
    const fillPath =
      path +
      ` L ${scaledPoints[scaledPoints.length - 1].x} ${height - paddingY}` +
      ` L ${paddingX} ${height - paddingY}` +
      " Z";

    // Determine chart color based on price change
    const chartColor =
      priceChange.direction === "up"
        ? "#00ff88"
        : priceChange.direction === "down"
        ? "#ff4466"
        : "#5599ff";

    return (
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 1000 ${height}`}
        preserveAspectRatio="none"
      >
        {/* Background grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = paddingY + ratio * chartHeight;
          const price = maxPrice - ratio * priceRange;
          return (
            <g key={ratio}>
              <line
                x1={paddingX}
                y1={y}
                x2={paddingX + chartWidth}
                y2={y}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <text
                x={paddingX - 5}
                y={y}
                fill="#999"
                fontSize="12"
                textAnchor="end"
                dominantBaseline="middle"
              >
                {price.toLocaleString(undefined, {
                  minimumFractionDigits: price < 10 ? 2 : 0,
                  maximumFractionDigits: price < 10 ? 4 : 0,
                })}
              </text>
            </g>
          );
        })}

        {/* Area fill with gradient */}
        <defs>
          <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={chartColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={chartColor} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path d={fillPath} fill="url(#chartGradient)" />

        {/* Chart line */}
        <path d={path} stroke={chartColor} strokeWidth="2" fill="none" />

        {/* Time labels */}
        {scaledPoints
          .filter((_, i) => i % Math.ceil(chartData.length / 5) === 0)
          .map((point, i) => (
            <text
              key={i}
              x={point.x}
              y={height - paddingY + 15}
              fill="#999"
              fontSize="11"
              textAnchor="middle"
            >
              {new Date(point.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </text>
          ))}
      </svg>
    );
  };

  return (
    <div className="price-chart-container">
      <div className="chart-header">
        <div className="pair-info">
          <h3 className="pair-name">{pairName}</h3>
          <div className={`price-change ${priceChange.direction}`}>
            {priceChange.percent}
          </div>
        </div>

        <div className="timeframe-selector">
          {timeframeOptions.map((option) => (
            <button
              key={option}
              className={`timeframe-button ${
                selectedTimeframe === option ? "active" : ""
              }`}
              onClick={() => setSelectedTimeframe(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-content">
        {loading ? (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Loading chart data...</p>
          </div>
        ) : (
          renderChart()
        )}
      </div>

      <div className="chart-footer">
        <div className="current-price">
          {chartData.length > 0 &&
            chartData[chartData.length - 1].price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6,
            })}
        </div>
      </div>
    </div>
  );
};

export default PriceChart;
