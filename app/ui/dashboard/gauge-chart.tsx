'use client'

import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { color, distance } from 'framer-motion';

interface GaugeChartProps {
  title: string,
  index: number;
  minValue: number;
  maxValue: number;
  minSafe: number;
  maxSafe: number;
}


const GaugeChart: React.FC<GaugeChartProps> = ({ title, index, minValue, maxValue, minSafe, maxSafe }) => {
  const [option, setOption] = React.useState({});
  useEffect(() => {
    const gaugeChartOption = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '30%'],
          radius: '100%',
          min: minValue,
          max: maxValue,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [minSafe, '#F7443B'],
                [maxSafe, '#22C55E'],
                [1, '#F7443B']
              ]
            }
          },
          splitLine: {
            show: false
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 16,
            offsetCenter: [0, '-60%'],
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            show: true,
            distance: 1,
            lineStyle: {
              color: 'auto'
            }
          },
          axisLabel: {
            show: false
          },
          title: {
            offsetCenter: [0, '10%'],
            fontSize: 14
          },
          detail: {
            fontSize: 18,
            offsetCenter: [0, '-20%'],
            valueAnimation: true,
            formatter: function (value: number) {
              return value;
            },
            color: 'inherit'
          },
          data: [
            {
              value: index,
              name: title
            }
          ]
        }
      ]
    };

    setOption(gaugeChartOption);
  }, [title, index, minValue, maxValue, minSafe, maxSafe]);

  return <div className='h-28 w-28'><ReactECharts className='h-28' option={option} /> </div>;
}

export default GaugeChart;