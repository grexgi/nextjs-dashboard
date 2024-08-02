'use client'

import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

interface LineChartProps {
  title: string,
  data: any;
}


const LineChart: React.FC<LineChartProps> = ({ title, data }) => {
  const [option, setOption] = React.useState({});
  useEffect(() => {
    const dates = data.map((item: any) => DateFormatter(item.created_at));
    let feeds;
    switch (title) {
      case 'Kelembapan':
        feeds = data.map((item: any) => item.field1);
        break;
      case 'Suhu':
        feeds = data.map((item: any) => item.field2);
        break;
      case 'Konduktivitas':
        feeds = data.map((item: any) => item.field3);
        break;
      case 'pH':
        feeds = data.map((item: any) => item.field4);
        break;
    }

    const lineChartOption = {
      title: {
        left: 'center',
        top: 30,
        text: title
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
  }, [title, data]);

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