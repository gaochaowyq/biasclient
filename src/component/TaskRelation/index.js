import * as React from 'react';
import {useContext, useEffect, useState} from "react";
import {listmaintask, listsubtask, getuserbyid} from "../../util/bimmanagementAPI/TaskManagement/taskmanagement";
import ReactEChartsCore from 'echarts-for-react/lib/core';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Import charts, all with Chart suffix
import {
    GraphChart
} from 'echarts/charts';
import {
    TooltipComponent,
    TitleComponent,
    LegendComponent
} from 'echarts/components';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
    CanvasRenderer,
} from 'echarts/renderers';

// Register the required components
echarts.use(
    [TitleComponent, LegendComponent, GraphChart, CanvasRenderer, TooltipComponent]
);


const TaskRelation = ({projectid}) => {
    //const {token, admin} = useContext(authContext);
    //const forgeToken = useForgeToken();
    const [graph, SetGraph] = useState({categories: []});

    const calnodeposition = (centerX, centerY, radius, angle) => {
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        return [x, y]
    }

    useEffect(
        () => {
            const fetchData = async (projectid) => {
                let _result = {
                    "nodes":
                        [],
                    "links":
                        [],
                    "categories":
                        [
                            {
                                name: "策划阶段",
                                index:0
                            },
                            {
                                name: "规划设计阶段",
                                index:1
                            },
                            {
                                name: "方案设计阶段",
                                index:2
                            },
                            {
                                name: "施工图设计阶段",
                                index:3
                            },
                            {
                                name: "招投标阶段",
                                index:4
                            },
                            {
                                name: "施工阶段",
                                index:5
                            },
                            {
                                name: "运维阶段",
                                index:6
                            }
                        ]
                }

                for (let i = 0; i < _result.categories.length; i++) {

                    _result.nodes.push(
                        {
                            id: `${i}`,
                            name: _result.categories[i].name,
                            symbolSize: 50,
                            value: "",
                            x: 300 + 200 * i,
                            y: 300,
                            category: i
                        }
                    )
                    _result.links.push(
                        {
                            source: `${i}`,
                            target: `${i+1}`
                        }
                    )
                }

                const maintask = await listmaintask(projectid)


                for (let i = 0; i < maintask.length; i++) {
                    let category=maintask[i].content.category
                    let catnode=_result.nodes[category]
                    console.log(catnode)

                    let xy=calnodeposition(catnode.x,catnode.y,200, Math.random() * Math.PI * 2)

                    _result.nodes.push(
                        {
                            id: `${category};${i}`,
                            name: maintask[i].taskname,
                            symbolSize: 40,
                            value: "",
                            x: xy[0],
                            y: xy[1],
                            category: category
                        }
                    )
                    _result.links.push(
                        {source: `${category};${i}`, target: `${category}`}
                    )
                    let subtask = await listsubtask(maintask[i].id)

                    for (let ii = 0; ii < subtask.length; ii++) {
                        let angle = calnodeposition(xy[0], xy[1], 100, Math.random() * Math.PI * 2)
                        let userid = subtask[ii].creater

                        let user = await getuserbyid(userid)
                        _result.nodes.push({
                            id: `${category};${i};${ii}`,
                            name: user.username,
                            symbolSize: 15,
                            value: subtask[ii].taskname,
                            content: subtask[ii].content,
                            x: angle[0],
                            y: angle[1],
                            category: category
                        })
                        _result.links.push(
                            {source: `${category};${i};${ii}`, target: `${category};${i}`}
                        )
                    }


                }


                return _result

            }

            fetchData(projectid).then(res => {
                SetGraph(res)
            })
        }
        , [])

    const onChartReadyCallback = () => {
        console.log("ready")
    }

    const onChartClick = (param, echarts) => {
        const content = param.data.content;
        switch (content.type) {
            case "API":
                window.open(content.API, '_blank');
                break;
        }

    };


    const getOption = {
        title: {
            text: '任务关系',
            top: 'left',
            left: 'middle'
        },
        tooltip: {},
        legend: [
            {
                // selectedMode: 'single',
                data: graph.categories.map(function (a) {
                    return a.name;
                }),
                align: 'left',
                top: 20
            }
        ],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                type: 'graph',
                layout: 'none',
                data: graph.nodes,
                links: graph.links,
                categories: graph.categories,
                roam: true,
                label: {
                    position: 'inside',
                    formatter: '{b};{c}',
                    show: true
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0
                },
                emphasis: {
                    focus: 'adjacency',
                    lineStyle: {
                        width: 10
                    }
                }
            }
        ]
    }


    return (
        <>
            {
                graph.categories.length === 0 ? "该项目没有创建任务" :
                    <ReactEChartsCore
                        style={{ height: '700px', width: '100%' }}
                        echarts={echarts}
                        option={getOption}
                        notMerge={false}
                        lazyUpdate={true}
                        onChartReady={onChartReadyCallback}
                        onEvents={{
                            'click': onChartClick
                        }}
                    />
            }
        </>


    )
        ;
}

export {TaskRelation}