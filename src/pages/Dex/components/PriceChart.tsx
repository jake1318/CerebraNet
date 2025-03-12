import React from "react";

interface PriceChartProps {
  data: Array<{
    time: number;
    price: number;
  }>;
}

const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
  return (
    <div className="chart-container">
      {/* In a real app, integrate a chart library like TradingView */}
      <div className="placeholder-chart">
        <div className="chart-title">Price Chart</div>
        <div className="chart-placeholder">
          Interactive Price Chart Would Be Here
          <div className="chart-grid"></div>
          <div className="chart-line"></div>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;
