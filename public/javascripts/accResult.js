let total_price_sum = 0;
$('span[id="price_sum"]').each(function () {
    console.log($(this).text())
    total_price_sum = total_price_sum + parseFloat($(this).text());
})
$("#total_price_sum").text("￥" + total_price_sum);

let total_cost_sum = 0;
$('span[id="cost_sum"]').each(function () {
    total_cost_sum = total_cost_sum + parseFloat($(this).text());
})
$("#total_cost_sum").text("￥" + total_cost_sum);

let total_profit_sum = 0;
$('span[id="profit_sum"]').each(function () {
    total_profit_sum = total_profit_sum + parseFloat($(this).text());
})
$("#total_profit_sum").text("￥" + total_profit_sum);

function cost() {
    let date = new Date();
    let month = date.getMonth() + 1;

    $.ajax({
        type: "POST",
        url: "/accResult/cost",
        data: {
            month: month
        },
        cache: false,
        success: function (y_mdata) {
            var myChart = echarts.init(document.getElementById('cost'));
            let current_month = month + '月';
            let last_month = (month - 1) + '月';
            let before_month = (month - 2) + '月';

            // 指定图表的配置项和数据
            var option = {
                title: {
                    x: 'center',
                    y: 'top',
                    text: "近3个月各销售员的成本业绩统计直方图"
                },
                tooltip: {},
                legend: {
                    orient: 'horizontal',
                    x: 'center',
                    y: '30px',
                    data: [before_month, last_month, current_month],
                    selectedMode: "single"
                },
                xAxis: [{
                    data: (function () {
                        let d1 = [];
                        let flag = 1;
                        y_mdata.forEach(function (item) {
                            $.each(d1, function (index, Info) {
                                if (Info == item._id) {
                                    flag = 0;
                                }
                            })
                            if (flag) {
                                d1.push(item._id);
                            }

                        })
                        return d1;
                    })()

                }],
                yAxis: {},
                series: [
                    {
                        name: before_month,
                        type: 'bar',
                        data: (function () {
                            let d1 = [];
                            y_mdata.forEach(function (item) {
                                let y_month = new Date(item.start);
                                let m1 = y_month.getMonth() + 1;
                                if (m1 == month - 2) {
                                    d1.push(item.cost_sum);
                                }

                            })
                            return d1;
                        })(),
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var colorList = [
                                        '#C1232B', '#B5C334'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                            }
                        },
                        barWidth: 80
                    },
                    {
                        name: last_month,
                        type: 'bar',
                        data: (function () {
                            let d1 = [];
                            y_mdata.forEach(function (item) {
                                let y_month = new Date(item.start);
                                let m1 = y_month.getMonth() + 1;
                                if (m1 == month - 1) {
                                    d1.push(item.cost_sum);
                                }

                            })
                            return d1;
                        })(),
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var colorList = [
                                        '#C1232B', '#B5C334'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                            }
                        },
                        barWidth: 80
                    },
                    {
                        name: current_month,
                        type: 'bar',
                        data: (function () {
                            let d1 = [];
                            y_mdata.forEach(function (item) {
                                let y_month = new Date(item.start);
                                let m1 = y_month.getMonth() + 1;
                                if (m1 == month) {
                                    d1.push(item.cost_sum);
                                }

                            })
                            return d1;
                        })(),
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var colorList = [
                                        '#C1232B', '#B5C334'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                            }
                        },
                        barWidth: 80
                    }

                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

        }
    })



}


function profit() {
    let date = new Date();
    let month = date.getMonth() + 1;

    $.ajax({
        type: "POST",
        url: "/accResult/cost",
        data: {
            month: month
        },
        cache: false,
        success: function (y_mdata) {
            var myChart = echarts.init(document.getElementById('profit'));
            let current_month = month + '月';
            let last_month = (month - 1) + '月';
            let before_month = (month - 2) + '月';

            // 指定图表的配置项和数据
            var option = {
                title: {
                    x: 'center',
                    y: 'top',
                    text: "近3个月各销售员的利润业绩统计直方图",

                },

                tooltip: {},
                legend: {
                    orient: 'horizontal',
                    x: 'center',
                    y: '30px',
                    data: [before_month, last_month, current_month],
                    selectedMode: "single"
                },
                xAxis: [{
                    data: (function () {
                        let d1 = [];
                        let flag = 1;
                        y_mdata.forEach(function (item) {
                            $.each(d1, function (index, Info) {
                                if (Info == item._id) {
                                    flag = 0;
                                }
                            })
                            if (flag) {
                                d1.push(item._id);
                            }

                        })
                        return d1;
                    })()

                }],
                yAxis: {},
                series: [
                    {
                        name: before_month,
                        type: 'bar',
                        data: (function () {
                            let d1 = [];
                            y_mdata.forEach(function (item) {
                                let y_month = new Date(item.start);
                                let m1 = y_month.getMonth() + 1;
                                if (m1 == month - 2) {
                                    d1.push(item.profit_sum);
                                }

                            })
                            return d1;
                        })(),
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var colorList = [
                                        '#27727B', '#FE8463'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                            }
                        },
                        barWidth: 80
                    },
                    {
                        name: last_month,
                        type: 'bar',
                        data: (function () {
                            let d1 = [];
                            y_mdata.forEach(function (item) {
                                let y_month = new Date(item.start);
                                let m1 = y_month.getMonth() + 1;
                                if (m1 == month - 1) {
                                    d1.push(item.profit_sum);
                                }

                            })
                            return d1;
                        })(),
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var colorList = [
                                        '#27727B', '#FE8463'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                            }
                        },
                        barWidth: 80
                    },
                    {
                        name: current_month,
                        type: 'bar',
                        data: (function () {
                            let d1 = [];
                            y_mdata.forEach(function (item) {
                                let y_month = new Date(item.start);
                                let m1 = y_month.getMonth() + 1;
                                if (m1 == month) {
                                    d1.push(item.profit_sum);
                                }

                            })
                            return d1;
                        })(),
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var colorList = [
                                        '#27727B', '#FE8463'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                            }
                        },
                        barWidth: 80
                    }

                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

        }
    })
}
