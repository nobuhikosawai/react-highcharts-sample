import React from 'react';
import goodIcon from './ic_good_oval_12.svg';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import roundedCorner from './plugin/rounded-corner';
import './App.css';

// using plugin
roundedCorner(Highcharts);

const options: any = {
  chart: {
      type: 'column',
      styledMode: true,
      height: '65%',
  },
  title: {
      text: '歩数',
      align: 'left',
      className: 'highcharts-title',
  },
  xAxis: {
      categories: ['日', '月', '火', '水', '木', '金', '土'],
      className: 'highcharts-xaxis'
  },
  yAxis: {
    title: null,
    labels: {
      formatter: function(this: Highcharts.AxisLabelsFormatterContextObject): string{
        return this.value.toLocaleString();
      },
      align: 'left',
      reserveSpace: true
    },
    lineWidth: 1,
    className: 'highcharts-yaxis'
  },
  legend: {
    align: 'right',
    x: -30,
    verticalAlign: 'top',
    y: 0,
    floating: true,
    shadow: false,
    className: 'highcarts-legend'
  },
  credits: {
      enabled: false
  },
  tooltip: {
    enabled: false
  },
  plotOptions: {
      column: {
        animation: false,
        grouping: false,
        borderRadiusTopLeft: '50%',
        borderRadiusTopRight: '50%',
        className: 'highcharts-column',
      },
      line: {
        marker: {
          enabled: false,
        },
        animation: false,
        className: 'highcharts-line',
      }
  },
  series: [{
    type: 'column',
    name: '歩数',
    data: [2600, 10000, 7400, 11000, 8300, 7600, 2400],
    showInLegend: false,
  },
  {
    type: 'line',
    name: '目標: 8,300歩',
    data: [8300, 8300, 8300, 8300, 8300, 8300, 8300],
  }
]
}

const App: React.FC = (props: HighchartsReact.Props) => {
  const chartCallback = (chart: Highcharts.Chart) => {
    chart.series[0].data.forEach((point: Highcharts.Point, idx: number) => {
      const value = (point && point.y) || 0;
      if (value >= 8300) {
        point.update({ ...point.options, colorIndex: 1}, true)

        chart.renderer.image(goodIcon,
          point.plotX + chart.plotLeft - 15,
          point.plotY + chart.plotTop - 35,
          30,
          30
        )
        .add()
        .attr({zIndex: 5});
      }
    });
  }

  return (
    <div>
      <HighchartsReact
          highcharts={Highcharts}
          options={options}
          callback={chartCallback}
          {...props}
      />
    </div>
  );
}

export default App;
