import {useState, useEffect,useCallback} from 'react';
import {debounce} from 'lodash';
import dayjs from 'dayjs';
import moment from 'moment';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import IconButton from '@mui/material/IconButton';
import {Slider, DatePicker} from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';

let def = 'YYYY-MM-DD';
const MDSlider = (props) => {
    const [sValue, setSValue] = useState([0, 10]);
    const [modelids, setModelIds] = useState([]);
    const [clickTime, setClickTime] = useState(null);
    const [show, setShow] = useState(true);
    const getDiffDays = (s: any, e: any) => {
        let length: number = moment(s).diff(e, 'days');
        length = Math.abs(length);
        return length;
    };
    let stimeMoment = moment(
        new Date("2022-01-10"),
    );
    let etimeMoment = moment(
        new Date("2022-10-11"),
    );
    let length = getDiffDays(stimeMoment, etimeMoment);
    let proportion = length / 100;

    useEffect(() => {
        let nowtime = moment(new Date());
        if (etimeMoment > nowtime) {
            let e = getDiffDays(stimeMoment, nowtime);
            setSValue([0, e / proportion]);
        } else {
            let e = getDiffDays(stimeMoment, etimeMoment);
            setSValue([0, e / proportion]);
        }
        let modelids=getAllGeometry()
        setModelIds(modelids)
    }, []);
    useEffect(() => {
        debounceEvent(clickTime, changeData);
    }, [sValue]);
    const getAllGeometry=()=>{
        let models=props.viewer.getAllModels()
        let instanceTree=models[0].getData().instanceTree;
        let allDbIdsStr = Object.keys(instanceTree.nodeAccess.dbIdToIndex);
        let ids= allDbIdsStr.map(function(id,index) { return {endtime:stimeMoment.add(index,'h').format(def),  id:parseInt(id)}});
        return ids
    }

    const changeData = (sTime, eTime) => {
        let id= modelids.filter((item)=>{return moment(new Date(item.endtime)).isBetween(moment(new Date(sTime)),moment(new Date(eTime)))})
        let _id=id.map((item)=>item.id)
        props.viewer.isolate(_id)
        if (show) {
            setTimeout(() => {
                setTimeoutFn();
                console.log(sValue)
            }, 1000);
        }
    };

    const debounceEvent = debounce((clickTime, changeData) => {
        if (changeData && clickTime) {
            let stime = clickTime[0].format(def);
            let etime = clickTime[1].format(def);
            changeData(stime, etime);
        }
    }, 900)


    const onChangeSlider = (val) => {
        let s = val[0];
        let e = val[1];
        let st = moment(stimeMoment).add(proportion * s, 'days');
        let et = moment(stimeMoment).add(proportion * e, 'days');
        setClickTime([st, et]);
        setSValue(val);
    };
    //暂停
    const suspend = () => {
        setShow(false);
    };
    //播放
    const play = () => {
        setShow(true);
        setTimeoutFn();
    };

    const setTimeoutFn = () => {
        let vlaue = [...sValue];
        let s = vlaue[0];
        let e = vlaue[1];
        let newE = e + 1;
        if (e > 100) {
            suspend();
            return;
        } else {
            let st = moment(stimeMoment).add(proportion * s, 'days');
            let et = moment(stimeMoment).add(proportion * newE, 'days');
            setClickTime([st,et])
            setSValue([s, newE]);
        }
    };


    const formatter =(e) => {
                    if (e !== undefined) {
                        let n = e * 1;
                        let num = proportion * n;
                        let newnum = moment(stimeMoment).add(num, 'days').format(def);
                        return newnum;
                    }
                    return e;
                }

    return (
        <div>
            {show && (
                <IconButton aria-label="delete" onClick={suspend}>
                    <PlayArrowIcon/>
                </IconButton>
            )}
            {!show && (
                <IconButton aria-label="delete" onClick={play}>
                    <StopIcon/>
                </IconButton>
            )}

            <Slider
                range
                onChange={onChangeSlider}
                value={sValue}
                tooltip={{ formatter }}
            />
        </div>

    );
};
export default MDSlider;
