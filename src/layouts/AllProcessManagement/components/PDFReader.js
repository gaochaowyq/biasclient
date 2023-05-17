import React, {useState, useEffect, useMemo} from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {Document, Page, pdfjs} from 'react-pdf';
import Box from '@mui/material/Box';
import {authContext} from "../../../context/AuthContext";
import FunPageLayout from "examples/LayoutContainers/FunPageLayout";
import {useParams} from "react-router-dom";
import {pdfSummary} from "../../../util/bimmanagementAPI/fetchProject";
import {AiChat} from "../../../examples/Chat";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import {getOssObject} from "util/alioss/oss";

import Grid from "@mui/material/Grid";

const PDFReader = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pdfData, setPdfData] = useState("");
    const {bucketkey, objectname} = useParams();
    const [alldata, setAllData] = useState("你有什么关于该文本的问题，由我为你解答");


    const anlysisPDFHandle = async (prompt) => {
        let _text = ""
        if (pdfData) {
            const pdf = await pdfjs.getDocument({data: pdfData}).promise
            for (var pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
                // get the page object
                let page = await pdf.getPage(pageNumber)
                let textContent = await page.getTextContent()
                // get the text content of the page

                // loop through each text item
                for (var i = 0; i < textContent.items.length; i++) {
                    // get the text string
                    var text = textContent.items[i].str;
                    const regx=/[\u0020\u002e]/g
                    let printableStr = text.replace(regx,'');
                    _text = _text + printableStr;
                }

            }

            pdfSummary(prompt, _text.substring(500, 3500)).then(res => {
                setAllData(res)

            })
        }
    }

    const onDocumentLoadSuccess = (document) => {

        setNumPages(document.numPages);


    }

    useEffect(() => {
        getOssObject(bucketkey, objectname).then(res => {
            setPdfData(res)
        });
    }, [])
    const questionHandle = (question) => {

        anlysisPDFHandle(question).then()

    }
    return (
        <FunPageLayout>
            <Grid container spacing={3} sx={{height: "100vh"}}>
                <Grid item xs={3} md={3} lg={3}>
                    <AiChat question={questionHandle} aicallback={alldata}/>

                </Grid>
                <Grid item xs={8} md={8} lg={8}>
                    <Stack direction="row" spacing={2}>
                        <Button color="secondary" onClick={() => {
                            setPageNumber(pageNumber - 1)
                        }}>前一页</Button>
                        <Button variant="contained" onClick={() => {
                            setPageNumber(pageNumber + 1)
                        }} color="success">
                            后一页
                        </Button>
                        <Typography variant="h1" gutterBottom>
                            {`全文共${pdfData.length}字`}
                        </Typography>
                    </Stack>

                    {pdfData &&
                        <Box
                            sx={{
                                width: "100%",
                                height: "90vh",
                                overflow: "auto"
                            }}
                        >
                            <Document file={{data: pdfData}} onLoadSuccess={onDocumentLoadSuccess}>

                                <Page width={900} pageNumber={pageNumber}/>

                            </Document>
                            <p>
                                Page {pageNumber} of {numPages}
                            </p>
                        </Box>
                    }
                </Grid>
                <Grid item xs={1} md={1} lg={1}>
                    {
                        alldata && <Box
                            sx={{
                                width: "100%",
                                height: "90vh",
                                overflow: "auto"
                            }}
                        >
                        </Box>
                    }

                </Grid>
            </Grid>


        </FunPageLayout>
    )
        ;
};

export default PDFReader