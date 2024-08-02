'use client'

import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

interface LineChartProps {
  data: {
    feeds: any[],
    created_at: string;
    field1: number;
  }[];
}


const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const [option, setOption] = React.useState({});
  // console.log("Data ", data);
  useEffect(() => {
    const feeds = data.map((item: any) => item.field1);
    const dates = data.map((item: any) => DateFormatter(item.created_at));

    const lineChartOption = {
      title: {
        left: 'center',
        top: 30,
        text: 'Humidity'
      },
      tooltip: {
        trigger: 'axis',
        position: function (pt: any) {
          return [pt[0], '10%'];
        }
      },
      xAxis: {
        type: 'category',
        data: dates,
      },
      yAxis: {
        type: 'value',
        min: function (value: any) {
          return value.min;
        }
      },
      dataZoom: [
        {
          type: 'inside',
          start: 90,
          end: 100
        },
        {
          start: 0,
          end: 10
        }
      ],
      series: [
        {
          data: feeds,
          type: 'line',
          sampling: 'average',
        },
      ],
    };

    setOption(lineChartOption);
  }, [data]);

  return <ReactECharts option={option} />;
}

export default LineChart;

function DateFormatter(date: string) {
  const fullDate = new Date(date);
  const year = fullDate.getFullYear().toString().slice(-2);
  const formattedDate = fullDate.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).replace(/\d{4}/, year); // Replace the 4-digit year with the 2-digit year

  return formattedDate;
}