'use client'

import React, { useState, useEffect, useCallback } from 'react';
import ReactECharts from 'echarts-for-react';

interface LineChartProps {
  title: string,
  cropCode: string,
  data: any;
}

const LineChart: React.FC<LineChartProps> = ({ title, cropCode }) => {
  const [option, setOption] = React.useState({});
  const [data, setData] = useState<any[]>([]); // Assuming data is an array

  const fetchData = useCallback(async () => {
    try {
      const foundSensor = findSensorByCropCode(cropCode)
      const response = await fetch(`https://api.thingspeak.com/channels/${foundSensor?.channelID}/feeds.json?api_key=${foundSensor?.apiKey}&timezone=Asia/Jakarta&results=${(1440 / 5) * 7}`); // maksimum 8000 entry atau 1 bulan (28 hari)
      const fetchedData = await response.json();
      setData(fetchedData.feeds);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors appropriately (display error message, etc.)
    }
  }, []); // Empty dependency array for manual fetching

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, [fetchData]); // Only run when fetchData changes

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
          start: 0,
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

function findSensorByCropCode(cropCode: string) {
  return sensors.find(sensor => sensor.polybag === cropCode);
}

const sensors = [
  {
    polybag: 'B2-N2P1(3)',
    channelID: '2573088',
    apiKey: '2EUPVXHC5QO8ZPOY',
    sensor: 'Auto 1',
  },
  {
    polybag: 'B2-N2P3(2)',
    channelID: '2573089',
    apiKey: 'CYTZ5PANCCUVVCMT',
    sensor: 'Auto 2',
  },
  {
    polybag: 'B2-N2P2(3)',
    channelID: '2573090',
    apiKey: 'WJF8BQGGMR6JA9AE',
    sensor: 'Auto 3',
  },
  {
    polybag: 'B3-N2P1(3)',
    channelID: '2573092',
    apiKey: 'AOSOFGA4WVDQCL04',
    sensor: 'Auto 4',
  },
  {
    polybag: 'B3-N2P3(1)',
    channelID: '2573093',
    apiKey: 'BO3FWSZVUSMHFLH1',
    sensor: 'Auto 5',
  },
  {
    polybag: 'B3-N2P2(4)',
    channelID: '2573094',
    apiKey: 'LBX668AWWPMJAM2J',
    sensor: 'Auto 6',
  },
  // { polybag:'Auto 7', channelID: '2573096', apiKey: 'SVMLCJ53ABB2K0IP'}, // belum ada entry
  // sensor Auto tidak ada tds field5-7=npk
  // sensor Time field5=tds && field6-8=npk
  {
    polybag: 'B4-N3P2(4)',
    channelID: '2580652',
    apiKey: 'VCD4PPD4ZVAMOAJG',
    sensor: 'Time 1',
  },
  {
    polybag: 'B9-N3P3(3)',
    channelID: '2580653',
    apiKey: 'WYPUBPC0DLJWPNKC',
    sensor: 'Time 2',
  },
  {
    polybag: 'B11-N3P1(2)',
    channelID: '2580655',
    apiKey: 'LQEI4ENFE68DWD75',
    sensor: 'Time 3',
  },
  {
    polybag: 'B6-N2P1(6)',
    channelID: '2580656',
    apiKey: 'YPPQMF5T2F1HH6B0',
    sensor: 'Time 4',
  },
  {
    polybag: 'B8-N2P2(1)',
    channelID: '2580657',
    apiKey: 'U0D3LFQTEOND6L9O',
    sensor: 'Time 5',
  },
  {
    polybag: 'B10-N2P3(5)',
    channelID: '2580659',
    apiKey: 'IUM51GU125UVW9B4',
    sensor: 'Time 6',
  },
  {
    polybag: 'B4-N3P3(4)',
    channelID: '2580664',
    apiKey: 'TTX87BGPJK2KTFCT',
    sensor: 'Time 7',
  },
  {
    polybag: 'B8-N2P3(1)',
    channelID: '2580665',
    apiKey: '8HWN2H29SBPJ0JAD',
    sensor: 'Time 8',
  },
  // { polybag:'Ardi 1', channelID: '2495370', apiKey: 'SH0R26GMJVP5Q3IB'},
];