import { useState, useEffect } from 'react';
import ManageFields from './extractor_tabs/manage_fields';
import TrainModels from './extractor_tabs/train-models';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { Icon } from '@fluentui/react/lib/Icon';
import {Navbar, NavbarCollapsed} from '../ui-components/navbar';
import Guide from '../ui-components/guide';
import FilePicker from '../ui-components/file-picker';
import { getSampleSource } from '../data/fsl_sample_source';
import callToaster from '../helper/CallToaster';
import { getExtractedData, getExtractedRefinedData } from '../data/extracted_data';
import TestPanel from '../ui-components/test-panel';
import callLoading from "../helper/CallLoading";

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    transform: scale(1);
    animation: fadeInAnimation 500ms 1;
    opacity: 1;

    @keyframes fadeInAnimation {
        0% {
            transform: scale(.99);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
      }
`
const ExtractorHeader = styled.div`
    border-bottom: 1px solid #e1e1e1;
    padding: 0px 20px;
`
const Breadcrumb = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
`
const BreadcrumbItem = styled.p`
    display: inline-block;
    transition: 500ms ease 0s;
    font-size: 12px;
    padding: 12px 0;
    margin: 0;

    &.selected {
        font-weight: bold;
    }

    &.link {
        opacity: .5;
        cursor: pointer;

        &:hover {
            opacity: 1;
        }
    }

    &.chevron {
        font-size: 14px;
        opacity: .5;
    }
`
const InnerPageWrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: calc(100% - 42px);
`
const ExtractorSideBar = styled.div`
    min-width: 240px;
    border-right: 1px solid #e1e1e1;
    overflow-y: scroll;
    box-shadow: 4px 8px 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
`
const TabSection = styled.div`
    padding: 6px 12px 18px 12px;
    border-top: 1px solid #e1e1e1;

    &.test-section {
        background: #F6F8FA;
        border-top: none;
        padding: 8px;
    }

    .test-section-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 8px;
        margin-bottom: 10px;
        
        h4 {
            font-size: 11px;
            margin: 0;
            font-weight: 500;
            opacity: .6;
        }
    }
`
const TabItem = styled.div`
    box-sizing: border-box;
    padding: 10px;
    cursor: pointer;
    border: solid 1px #eee;
    transition: 400ms ease 0s;
    background: #F6F8FA;
    font-size: 12px;
    border-radius: 4px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    text-wrap: nowrap;

    &:hover {
        transform: scale(.92);
    }

    &.selected {
        color: #3D8AA1;
        font-weight: 600;
        border: 1px solid #3D8AA1;
    }

    i {
        margin-right: 10px;
    }

    &:last-child {
        margin-bottom: 0px;
    }
`
const TestExtractor = styled.div`
    box-sizing: border-box;
    cursor: pointer;
    border: 1px dashed #9DB7BE;
    transition: 400ms ease 0s;
    border-radius: 4px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    algin-content: center;
    height: 200px;
    position: relative;
    cursor: pointer;
    color: #201F1E;

    &:hover {
        transform: scale(.95);
    }

    h4 {
        font-size: 13px;
        margin: 12px 0 0 0;
        font-weight: 500;
        color: #3D8AA1;
    }

    p {
        font-size: 11px;
        margin: 6px 0 0 0;
        opacity: .5;
    }

    i {
        font-size: 30px;
        color: #3D8AA1;
    }

    img {
        max-width: 120px;
        border-radius: 6px;
    }

    .test-mini-panel-overlay {
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        position: absolute;
        align-items: center;
        justify-content: center;
        color: white;
        display: none;
        transition: 500ms ease 0s;
        backdrop-filter: blur(2px);
    }

    &.uploaded {
        &:hover {
            .test-mini-panel-overlay {
                display: flex;
                gap: 14px;
                border-radius: 4px;
            }
        }
    }
`
const TestAction = styled.div`
    text-align: center;
    transition: 500ms ease 0s;

    p {
        font-size: 12px;
        opacity: 1;
    }

    i {
        font-size: 20px;
        opacity: 1;
        color: #fff;
    }

    &:hover {
        transform: scale(.9);
        opacity: .6;
    }
`
const ToolBtn = styled.div`
    display: inline-block;
    font-size: 11px;
    color: #201F1E;
    transition: 500ms ease 0s;
    cursor: pointer;

    &:hover {
        color: #53B2a1;
    }
    
    i {
        margin-right: 6px;
        font-size: 10px;
        color: #53B2A1;
    }
`


export default function Extractor() {

    const MyIcon = (props) => <Icon iconName={props.IconName} className={props.ClassName}/>;
    const [currentTab, setCurrentTab] = useState('manage-fields')
    const navigate = useNavigate();

    const allSchema = JSON.parse(sessionStorage.getItem("allExtractorContent"));
    const thisExtractorID = JSON.parse(sessionStorage.getItem("selectedExtractorID"));
    const schema = allSchema.filter(item => item.extractorID === thisExtractorID)
    const extractorName = schema[0].extractorName
    const currentPreTrainedContent = schema[0].PreTrainedFields
    const currentCustomContent = schema[0].CustomFields
    
    const selectTab = (e) => {
        setOpenPanel(false)
        const activeElements = document.querySelectorAll('.extractor-tab');
        activeElements.forEach(element => {
            element.classList.remove('selected')
          });
          e.currentTarget.classList.add('selected')

        const tabValue = e.currentTarget.getAttribute('data-label')
        setCurrentTab(tabValue)
    }

    const handleClick = (e) => {
        const path = e.target.getAttribute('href')
        navigate(path);
      };
    //fsl sample testing handings
    const FSLSampleData = getSampleSource()

    const allSampleData = JSON.parse(sessionStorage.getItem("allFSLSampleContent"));
    const rawSampleData = allSampleData.filter(item => item.extractorID === thisExtractorID)[0].samples 
    const [sampleData, setSampleData] = useState(rawSampleData)


    //Test extractor handling
    const [selectedImage, setSelectedImage] = useState('')
    const [openPanel, setOpenPanel] = useState(false)

    const extractedData = getExtractedData()
    const extractedRefinedData = getExtractedRefinedData()
    const [FSLSampleCount, setFSLSampleCount] = useState(false)
    
    const [dataSet, setDataSet] = useState(() => {
        const storage = JSON.parse(sessionStorage.getItem("sampleCount"));
        if (storage === true) {
            return extractedRefinedData
        } else {
            return extractedData
        }
    })

    useEffect(() => {
        const storage = JSON.parse(sessionStorage.getItem("sampleCount"));
        if ( storage === true) {
            return setDataSet(extractedRefinedData)
        } else {
            return setDataSet(extractedData)
    }}, [FSLSampleCount])

    sessionStorage.setItem("sampleCount", JSON.stringify(FSLSampleCount));

    const [runTesting, setRunTesting] = useState(false)
    const [uploadedTestSample, setUploadedTestSample] = useState(false)

    const displayTestResults = (selectedImageData) => {
        setRunTesting(true)
        setOpenPanel(true)
        console.log('ran', selectedImageData)
        sessionStorage.setItem("testExtractor", JSON.stringify(selectedImageData));
        setTestPanelData(selectedImageData)
        //document.querySelector('.test-panel').classList.add('show')
    }

    const [testPanelData, setTestPanelData] = useState(() => {
        const storage = JSON.parse(sessionStorage.getItem("testExtractor"));
        if (storage) {
            return storage
        } else {
            return ''
        }
    })

    const resetDisplayTestResults = (selectedImageData) => {
        setRunTesting(false)
    }

    const contactUs = () => {
        callToaster('green', 'We will come back to you shortly! Stay tuned:)')
    }

    const testExtractor = (e) => {
        setRunTesting(false)
        document.querySelector('.file-picker.test-extractor').classList.add('show')
    }

    const updateTestImage = () => {
        setUploadedTestSample(true)
    }

    const clearTestImage = () => {
        setUploadedTestSample(false)
        setOpenPanel(false)
    }

    const reTestImage = () => {
        resetDisplayTestResults()
        console.log(dataSet)
        const updatedDataSet = dataSet.filter(set => set.fileName === testPanelData[0].fileName)
        callLoading('Extracting Document...', displayTestResults, updatedDataSet)
    }

    const pageNotImplemented = () => {
        setOpenPanel(false)
        callToaster('red', 'Page not implemented')
    }

    const [remountPanel, setRemountPanel] = useState(false)

    useEffect(() => {
        if (remountPanel) {
            setRemountPanel(false)
        }
    }) 

    //page composition
    return <>
        {remountPanel===false? <TestPanel testData={testPanelData} runTesting={runTesting} openPanel={openPanel} setOpenPanel={setOpenPanel} resetRunTesting={resetDisplayTestResults} upDateTestImage={updateTestImage}/> : ''}
        <FilePicker images={FSLSampleData} extractorID={thisExtractorID} setSampleData={setSampleData} />
        <FilePicker images={dataSet} setSampleData={setSelectedImage} displayTestResults={displayTestResults} className='test-extractor'/>
        <NavbarCollapsed />
        <PageWrapper>
            <ExtractorHeader>
                <Breadcrumb>
                    <BreadcrumbItem className='link' href='../extractors' onClick={handleClick}>Extractors</BreadcrumbItem>
                    <BreadcrumbItem className='chevron'><MyIcon IconName='ChevronRight'/></BreadcrumbItem>
                    <BreadcrumbItem className='selected'>{extractorName}</BreadcrumbItem>
                </Breadcrumb>
            </ExtractorHeader>

            <InnerPageWrapper>     
                <ExtractorSideBar>
                        <TabSection className='test-section'>
                            {uploadedTestSample === false? <>
                                <TestExtractor onClick={testExtractor}>
                                    <MyIcon IconName='Camera'/>
                                    <h4>Test Extractor Performance</h4>
                                    <p>Drag or Upload a File</p>
                                </TestExtractor>
                            </> : <>
                                <div className='test-section-head'>
                                    <h4>Test Extraction Result</h4>
                                    <ToolBtn onClick={clearTestImage}><MyIcon IconName='Clear'/>Clear File</ToolBtn>
                                </div>
                                <TestExtractor className='uploaded'>
                                    <div className='test-mini-panel-overlay'>
                                        <TestAction onClick={reTestImage}>
                                            <MyIcon IconName='Refresh'/>
                                            <p>Re-Test This File</p>
                                        </TestAction>
                                        <TestAction onClick={testExtractor}>
                                            <MyIcon IconName='Upload'/>
                                            <p>Test New File</p>
                                        </TestAction>
                                    </div>
                                    <img src={testPanelData[0].filePath} alt='' />
                                </TestExtractor>
                                
                            </> }
                        </TabSection>
                        <TabSection>
                            <div className='test-section-head'>
                                <h4>Extractor Preparations</h4>
                            </div>
                            <TabItem className='extractor-tab selected tab-manage-fields' data-label='manage-fields' onClick={selectTab}><MyIcon IconName='ChevronRight'/>Manage Field Schema</TabItem>
                            <TabItem className='extractor-tab tab-train-models' data-label='train-models' onClick={selectTab}><MyIcon IconName='ChevronRight'/>Train AI Models</TabItem>
                            <TabItem className='extractor-tab' data-label='' onClick={pageNotImplemented}><MyIcon IconName='ChevronRight'/>Format Output Data</TabItem>
                        </TabSection>
                        <TabSection>
                            <div className='test-section-head'>
                                <h4>Extraction Input and Output</h4>
                            </div>
                        <TabItem className='extractor-tab' data-label='' onClick={pageNotImplemented}><MyIcon IconName='ChevronRight'/>Bulk Import and CSV Export</TabItem>
                            <TabItem className='extractor-tab' data-label='' onClick={pageNotImplemented}><MyIcon IconName='ChevronRight'/>Workflow Integrations</TabItem>
                            <TabItem className='extractor-tab' data-label='' onClick={pageNotImplemented}><MyIcon IconName='ChevronRight'/>API Integrations</TabItem>
                        </TabSection>
                        <TabSection>
                            <div className='test-section-head'>
                                <h4>Supports</h4>
                            </div>
                            <TabItem className='extractor-tab' data-label='' onClick={pageNotImplemented}><MyIcon IconName='Settings'/>Extractor Settings</TabItem>
                            <TabItem className='extractor-tab' data-label='' onClick={contactUs}><MyIcon IconName='Headset'/>Contact FormX Team</TabItem>
                        </TabSection>
                </ExtractorSideBar>
                {
                    (() => {
                        if(currentTab === 'manage-fields') {
                                return (
                                    <ManageFields selectedImage={selectedImage} runTesting={runTesting} resetTest={resetDisplayTestResults} setRemountPanel={setRemountPanel}/>
                                )
                            } else if (currentTab === 'train-models') {
                                return (
                                    <TrainModels sampleData={sampleData} setSampleData={setSampleData} setFSLSampleCount={setFSLSampleCount}/>
                                )
                            }
                    })()  
                }  
            </InnerPageWrapper>
        </PageWrapper>
    </>    
}