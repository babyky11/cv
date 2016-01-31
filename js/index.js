require.config({
    paths: {
        echarts: 'js/echarts'
    }
});
require(
    [
        'echarts',
        //'echarts/chart/line',   // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
        'echarts/chart/radar'
    ],
    function (ec) {
        var myChart = ec.init(document.getElementById('chart'));
        var option = {
            tooltip : {
                trigger: 'axis'
            },
            calculable : false,
            polar : [
                {
                    indicator : [
                        {text : '进攻', max  : 100},
                        {text : '防守', max  : 100},
                        {text : '体能', max  : 100},
                        {text : '速度', max  : 100},
                        {text : '力量', max  : 100},
                        {text : '技巧', max  : 100}
                    ],
                    name : {
                        formatter:'{value}',
                        textStyle: {color:'white'}
                    },
                    
                    center : ['50%', '50%'],
                    radius : 70
                }
            ],
            
            series : [
                {
                    name: '完全实况球员数据',
                    type: 'radar',
                    // itemStyle: {
                    //     normal: {
                    //         areaStyle: {
                    //             type: 'default'
                    //         }
                    //     }
                    // },
                    symbol:'none',
                    itemStyle: {
                        normal: {
                            lineStyle: {
                              width:2
                            },
                            areaStyle: {
                                color: (function (){
                                    var zrColor = require('zrender/tool/color');
                                    var x = document.getElementById('chart').offsetWidth - 250;
                                    return zrColor.getRadialGradient(
                                        x, 210, 0, x, 200, 150,
                                        [[0, 'rgba(255,255,0,0.3)'],[1, 'rgba(255,0,0,0.5)']]
                                    )
                                })()
                            }
                        },
                        emphasis : {
                            areaStyle: {color:'rgba(0,250,0,0.3)'}
                        },
                        
                    },
                    data : [
                        {
                            value : [97, 42, 88, 94, 90, 86],
                            name : '舍普琴科'
                            
                        }
                    ]
                }
            ]
        };
                            
        myChart.setOption(option);
    }
);


