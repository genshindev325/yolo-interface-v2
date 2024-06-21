import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import highcharts3d from 'highcharts/highcharts-3d';

import { useViewport } from 'contexts/viewport/useViewport'

highcharts3d(Highcharts);

const areaChartOptions = {
    title: {
        text: ''
    },
    xAxis: {
        type: 'datetime',
        labels: { enabled: false }
    },
    yAxis: {
        title: '',
        labels: { enabled: false }
    },
    tooltip: {
        crosshairs: true,
        shared: true,
        valuePrefix: '$'
    },
    exporting: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    chart: {
        backgroundColor: 'transparent',
        animation: false,
        plotBackgroundColor: "rgba(0,0,0,0)",
        events: {
            load: function(){
                if(this.plotBackground) {
                    this.plotBackground.toFront().css({ // move on top to get all events
                        cursor: "all-scroll"  
                    });
                }
            }
        }
    },
    legend: {
        enabled: false
    }
} 

export const AreaChart = ({ series, height, className }) => {
    const ref = useRef();
    const chartRef = useRef();
    const [chartOptions, setChartOptions] = useState(areaChartOptions);
    const { width: windowWidth } = useViewport();

    const formatSeries = (series) => {
        return [{
            name: '',
            data: series.averages,
            zIndex: 1,
            marker: {
                fillColor: 'white',
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[0]
            }
        }, {
            name: '',
            data: series.ranges,
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
            color: Highcharts.getOptions().colors[0],
            fillOpacity: 0.3,
            zIndex: 0,
            marker: {
                enabled: false
            }
        }];
    }

    useEffect(() => {
        if (chartRef?.current?.chart) {
            const chart = chartRef.current.chart;
            chart.setSize(ref.current.clientWidth, height);
            chart.redraw();
        }
    }, [windowWidth, chartRef?.current?.chart, ref?.current])

    useEffect(() => {
        if (!series) return;
        setChartOptions({ ...areaChartOptions, series: formatSeries(series) });
    }, [series])

    useEffect(() => {
        if (ref.current && ref.current?.children[0]?.style) {
            ref.current.style.overflow = "";
            ref.current.children[0].style.overflow = "";
        }
    }, [chartOptions, ref]);

    return (
        <ChartContainer ref = {ref} className={className}>
            <HighchartsReact ref={chartRef} Highcharts={Highcharts} options={chartOptions} allowChartUpdate={true}></HighchartsReact>
        </ChartContainer>
    )
}

const ChartContainer = styled.div`
    width: 100%;
`;