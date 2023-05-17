import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Button from "@mui/material/Button";

const AllProcessStage = () => {


    return (
        <Timeline position="alternate">
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot variant="outlined"/>
                    <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent>策划 </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot variant="outlined" color="primary"/>
                    <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent>投资</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot variant="outlined"/>
                    <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent>规划条件</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot variant="outlined" color="secondary"/>
                    <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent>可研</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot variant="outlined"/>
                    <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent>方案</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot variant="outlined"/>
                    <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent>策划结论</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot variant="outlined"/>
                    <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent>方案设计</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot variant="outlined"/>
                    <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent>初步设计</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot variant="outlined"/>
                    <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent>扩大初步设计</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot variant="outlined"/>
                    <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent>施工图设计</TimelineContent>
            </TimelineItem>
                        <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot variant="outlined"/>
                    <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent>设计审查</TimelineContent>
            </TimelineItem>
                        <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot variant="outlined"/>
                    <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent>施工交底</TimelineContent>
            </TimelineItem>
                        <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot variant="outlined"/>
                    <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent>招标采购</TimelineContent>
            </TimelineItem>
        </Timeline>
    )


}

export default AllProcessStage