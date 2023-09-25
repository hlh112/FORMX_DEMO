import styled from "styled-components";
import { YellowButton, BorderButton } from '../ui-components/button';
import { useState, useEffect } from "react";
import { Icon } from '@fluentui/react/lib/Icon';
import callLoading from "../helper/CallLoading";
import callToaster from "../helper/CallToaster";
import useMountTransition from "../helper/CallTransition";

const Modal = styled.div`
    position: absolute;
    right: 0;
    box-shadow: 2px 5px 20px rgba(0,0,0,.2);
    background: white;
    height: 100%;
    width: 75%;
    transition: 500ms ease 0s;

    &.show {
        opacity: 1;
        transform: translateX(0);
        z-index: 1000;
    }

    &.hide {
        opacity: 0;
        transform: translateX(300px);
        z-index: -1;
    }
`
const ModalWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
`
const LeftWrapper = styled.div`
    width: 65%;
    border-right: 1px solid #e1e1e1;
`
const RightWrapper = styled.div`
    width: 35%;
`
const ResultWrapper = styled.div`
    overflow-y: scroll;
    height: calc(100% - 42px);
`
const ButtonWrapper = styled.div`
    border-bottom: 1px solid #e1e1e1;
    padding: 12px 12px;
    display: flex;
    gap: 4px;
`
const TestImageWrapper = styled.div`
    display: flex;
    width: 100%;
    height: calc(100% - 43px);
    justify-content: center;
    align-items: center;
    background: #F6F8FA;

    img {
        width: 80%;
        max-width: fit-content;
        max-height: calc(100% - 100px);
    }
`
const ModelHead = styled.div`
  background: #F6F8FA;
  font-size: 10px;
  font-weight: 600;
  color: #3D8AA1;
  padding: 12px 20px;
  display: flex;
  gap: 10px;
  justify-content: space-between;

    p {
        margin:0;
        line-height: 1.5;
    }

    .desc {
        font-weight: 400;
        color: #605E5C;
        margin: 4px 0 0 0;
    }
`
const FieldContainer = styled.div`
  font-size: 12px;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  transition: 500ms ease 0s;
  align-items: center;
  
  .green-badge {
    width: 10px;
    height: 10px;
    background: #25D19D;
    border-radius: 2px;
    margin-right: 10px;
  }

  div {
    display: inline-block;
  }
`
const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background: white;
  padding: 18px 20px;
  border-bottom: 1px solid #e1e1e1;
`
const ToolBtn = styled.div`
    margin-left: 24px;
    display: inline-block;
    font-size: 10px;
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

export default function TestPanel(props) {

    const MyIcon = (props) => <Icon iconName={props.IconName} className={props.ClassName}/>;

    const hasTransitionedIn = useMountTransition(props.openPanel, 100);

    //load schema content for this form
    const allSchema = JSON.parse(sessionStorage.getItem("allExtractorContent"));
    const thisExtractorID = JSON.parse(sessionStorage.getItem("selectedExtractorID"));
    const schema = allSchema.filter(item => item.extractorID === thisExtractorID)
    const extractorName = schema[0].extractorName
    const PreTrainedContent = schema[0].PreTrainedFields
    const CustomContent = schema[0].CustomFields

    const [currentPreTrainedContent, setPreTrainedContent] = useState(() => {
        const storage = JSON.parse(sessionStorage.getItem(thisExtractorID + "_newPreTrainedContent"));
        if (storage) {
            return storage
        } else {
            return PreTrainedContent
        }
    });

    const [currentCustomContent, setCustomContent] = useState(() => {
        const storage = JSON.parse(sessionStorage.getItem(thisExtractorID + "_newCustomContent"));
        if (storage) {
            return storage
        } else {
            return CustomContent
        }
    });

    useEffect(() => {
        sessionStorage.setItem("key-here", JSON.stringify(currentPreTrainedContent));
    }, [currentPreTrainedContent])

    useEffect(() => {
        if (props.runTesting === true) {
            runTesting()
            //props.resetTest()
        }
    }, [props.runTesting])

    //test extractor related handelings
    const [extractedPreTrainedData, setExtractedPreTrainedData] = useState([])
    const [extractedCustomData, setExtractedCustomData] = useState([])
    const [nullPreTrainedData, setNullPreTrainedData] = useState([])
    const [nullCustomData, setNullCustomData] = useState([])
    const [selectedImage, setSelectedImage] = useState('')

    const runTesting = () => {
        //////
        console.log('diu',props.testData)
        const sampleData = props.testData
        const extractedPreTrainModelData = sampleData[0].PreTrainedModelResults
        const extractedCustomModelData = sampleData[0].CustomModelResults

        const SelectedPreTrainedContent = currentPreTrainedContent.filter(field =>
              field.field_status === true
        );

        const matchingPreTrainedFields = extractedPreTrainModelData.filter(obj1 =>
            SelectedPreTrainedContent.some(obj2 => obj2.default_field_name === obj1.field_name)
        );

        const nonMatchingPreTrainedFields = SelectedPreTrainedContent.filter(obj1 =>
            extractedPreTrainModelData.every(obj2 => obj2.field_name !== obj1.default_field_name)
        );

        const matchingCustomFields = extractedCustomModelData.filter(obj1 =>
            currentCustomContent.some(obj2 => obj2.field_name === obj1.field_name)
        );

        const nonMatchingCustomFields = currentCustomContent.filter(obj1 =>
            extractedCustomModelData.every(obj2 => obj2.field_name !== obj1.field_name)
        );

        setExtractedPreTrainedData(matchingPreTrainedFields)
        setNullPreTrainedData(nonMatchingPreTrainedFields)
        setExtractedCustomData(matchingCustomFields)
        setNullCustomData(nonMatchingCustomFields)
        setSelectedImage(sampleData[0].filePath)
        props.upDateTestImage()
    }

    const closePanel = () => {
        props.resetRunTesting()
        props.setOpenPanel(false)
    }

    const testExtractor = (e) => {
        ///
        props.resetRunTesting()
        ///
        document.querySelector('.file-picker.test-extractor').classList.add('show')
    }



    //page composition
    return <>
        <Modal className={`${hasTransitionedIn? 'show' : 'hide'} test-panel`}>
            <ModalWrapper>
                <LeftWrapper>
                    <ButtonWrapper>
                        <div onClick={closePanel}><BorderButton text='Close' /></div>
                        <div onClick={testExtractor}><BorderButton text='Test Another File' /></div>
                    </ButtonWrapper>
                    <TestImageWrapper>
                        <img src={props.testData[0]?.filePath} alt='' />
                    </TestImageWrapper>
                </LeftWrapper>
                <RightWrapper>
                <Toolbar>
                    <div>
                        <ToolBtn onClick={() => callToaster('red', 'Feature not implemented')}><MyIcon IconName='Code'/>View Json</ToolBtn>
                        <ToolBtn onClick={() => callToaster('red', 'Feature not implemented')}><MyIcon IconName='Download'/>Download .xlsx</ToolBtn>
                    </div>
                </Toolbar>
                <ResultWrapper>
                    {currentPreTrainedContent.map(obj => obj.field_status).filter(value => value === true).length > 0? <ModelHead><div>Pre-trained Model Fields ({extractorName})</div><div>Extracted Data</div></ModelHead> : ''}
                    {extractedPreTrainedData.map((dataSets, index) => {
                            return <FieldContainer key={index}>
                                <div>
                                    <div className="green-badge"></div>
                                    <div>{currentPreTrainedContent.filter(data => data.default_field_name === dataSets.field_name)[0].field_name}</div>
                                </div>
                                <div>{dataSets.extracted_data}</div>
                            </FieldContainer>
                    })}
                    {nullPreTrainedData.map((dataSets, index) => {
                            return <FieldContainer key={index}>
                                <div>
                                    <div className="green-badge"></div>
                                    <div>{dataSets.field_name}</div>
                                </div>
                                <div style={{opacity:'.4'}}>No Data Extracted</div>
                            </FieldContainer>
                    })}
                    {currentCustomContent.length > 0? <ModelHead><div>Custom Model Fields (Instant)</div><div>Extracted Data</div></ModelHead> : ''}
                    {extractedCustomData.map((dataSets, index) => {
                            return <FieldContainer key={index}>
                                <div>
                                    <div className="green-badge"></div>
                                    <div>{dataSets.field_name}</div>
                                </div>
                                <div>{dataSets.extracted_data}</div>
                            </FieldContainer>
                    })}
                    {nullCustomData.map((dataSets, index) => {
                            return <FieldContainer key={index}>
                                <div>
                                    <div className="green-badge"></div>
                                    <div>{dataSets.field_name}</div>
                                </div>
                                <div style={{opacity:'.4'}}>No Data Extracted</div>
                            </FieldContainer>
                    })}
                </ResultWrapper>
                </RightWrapper>
            </ModalWrapper>
        </Modal>
    </>   
}