"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  ColorType,
  createChart,
  IChartApi,
  ISeriesApi,
  LineStyle,
} from "lightweight-charts";

const Chart: React.FC<any> = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [tradePrice, setTradePrice] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [tradePriceLine, setTradePriceLine] = useState<any>(null); // Line for trade price
  const [tradeDirection, setTradeDirection] = useState<"up" | "down" | null>(
    null
  );
  const [markers, setMarkers] = useState<any[]>([]); // Track markers for countdown

  const initializeChart = () => {
    if (chartRef.current || !chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 750,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#fff",
        attributionLogo: false,
      },
      grid: {
        vertLines: { color: "#505050", style: LineStyle.Dotted, visible: true },
        horzLines: { color: "#505050", style: LineStyle.Dotted, visible: true },
      },
      timeScale: {
        borderColor: "#505050",
        timeVisible: true,
        secondsVisible: true,
      },
      rightPriceScale: {
        borderColor: "transparent",
        autoScale: true,
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
    });

    chartRef.current = chart;
    addSeries();
    setUpWebSocket();
  };

  const addSeries = () => {
    if (seriesRef.current && chartRef.current) {
      chartRef.current.removeSeries(seriesRef.current);
    }

    const series = chartRef.current!.addCandlestickSeries({
      upColor: "#4CAF50",
      downColor: "#F44336",
      borderVisible: false,
      wickUpColor: "#4CAF50",
      wickDownColor: "#F44336",
    });

    seriesRef.current = series;
  };

  useEffect(() => {
    initializeChart();
  }, []);

  const setUpWebSocket = () => {
    if (ws) {
      ws.close();
    }

    const binanceSocket = new WebSocket(
      `wss://stream.binance.com:9443/ws/btcusdt@kline_1m`
    );
    setWs(binanceSocket);

    binanceSocket.onopen = () => {
      console.log("WebSocket connection opened.");
    };

    binanceSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const candlestick = message.k;

      const chartData = {
        time: candlestick.t / 5000,
        open: parseFloat(candlestick.o),
        high: parseFloat(candlestick.h),
        low: parseFloat(candlestick.l),
        close: parseFloat(candlestick.c),
      };

      // Update series data
      seriesRef.current?.update(chartData as any);

      // Update current price
      setCurrentPrice(chartData.close);
    };

    binanceSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    binanceSocket.onclose = () => {
      console.log("WebSocket connection closed.");
    };
  };
  const handleTradeClick = (direction: "up" | "down") => {
    if (!currentPrice || !chartContainerRef.current || !seriesRef.current)
      return;

    setTradeDirection(direction);
    setTradePrice(currentPrice);
    setCountdown(60);

    const lineColor = direction === "up" ? "green" : "red";

    // Get the coordinate for the current price from the series
    const priceCoordinate = seriesRef.current.priceToCoordinate(currentPrice);
    if (!priceCoordinate) return; // Ensure the coordinate exists

    // Create a custom div for the price line
    const lineDiv = document.createElement("div");
    lineDiv.style.position = "absolute";
    lineDiv.style.width = "100px"; // Fixed width
    lineDiv.style.height = "2px";
    lineDiv.style.backgroundColor = lineColor;
    lineDiv.style.top = `${priceCoordinate}px`; // Position near candle
    lineDiv.style.left = `${chartContainerRef.current.clientWidth / 2 - 50}px`; // Center it horizontally
    lineDiv.style.zIndex = "10";

    // Create a label for the price line showing trade time and countdown
    const labelDiv = document.createElement("div");
    labelDiv.style.position = "absolute";
    labelDiv.style.top = `${priceCoordinate}px`;
    labelDiv.style.left = `${chartContainerRef.current.clientWidth / 2 - 50}px`; // Same as line position
    labelDiv.style.transform = "translateY(-100%)"; // Show it slightly above the line
    labelDiv.style.color = "#fff";

    // Initial text for the label, including countdown
    labelDiv.innerHTML = `Trade: ${direction.toUpperCase()} - ${new Date().toLocaleTimeString()} - 60s`;

    // Append the elements to the chart container
    chartContainerRef.current.appendChild(lineDiv);
    chartContainerRef.current.appendChild(labelDiv);

    // Set a timer for countdown and updating the line/label
    const intervalId = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(intervalId);
          setCountdown(null);

          // After countdown, check if trade is successful
          if (
            tradeDirection === "up" &&
            currentPrice &&
            currentPrice > tradePrice!
          ) {
            alert("Trade Success! Price went up.");
          } else if (
            tradeDirection === "down" &&
            currentPrice &&
            currentPrice < tradePrice!
          ) {
            alert("Trade Success! Price went down.");
          } else {
            alert("Trade Failed!");
          }

          // Remove custom price line and label
          chartContainerRef.current?.removeChild(lineDiv);
          chartContainerRef.current?.removeChild(labelDiv);

          setTradeDirection(null);
          setTradePrice(null);
          return null;
        }

        // Update the label text with countdown
        labelDiv.innerHTML = `Trade: ${direction.toUpperCase()} - ${new Date().toLocaleTimeString()} - ${
          prev! - 1
        }s`;

        return prev! - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.resize(
          chartContainerRef.current.clientWidth,
          chartContainerRef.current.clientHeight
        );
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="container px-10 py-5  overflow-hidden">
        <div
          ref={chartContainerRef}
          className="chart-container"
          style={{
            // height: '100vh',
            position: "relative",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
    </>
  );
};

export default React.memo(Chart);
