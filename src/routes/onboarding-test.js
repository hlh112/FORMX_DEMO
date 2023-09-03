import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { Icon } from '@fluentui/react/lib/Icon';
import { getFieldsSchema } from "../data/field_schema";
import { getExtractedData } from "../data/extracted_data";
import { YellowButton, BorderButton } from '../ui-components/button';
import callToaster from "../helper/CallToaster";
import callLoading from '../helper/CallLoading';
import TeachingBubble from '../ui-components/teachingBubble';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 91px);
  position: relative;
  height: 100%;
`
const Header = styled.div`
    border-bottom: 1px solid #e1e1e1;
    padding: 20px;

    h3{
        font-size: 24px;
        font-weight: normal;
        margin: 20px 0px 4px 0px;
    }

    p{
        margin: 0;
        font-size: 14px;
        opacity: .5;
    }
`

const EditModeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`
const MainWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`
const SchemaWrapper = styled.div`
    border-right: solid 1px #e1e1e1;
    width: 30%;
    overflow-y: scroll;
    position: relative;
`
const TestingWrapper = styled.div`
  background: #F6FDFC;
  width: 70%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
`
const InnerTestingWrapper = styled.div`
  width: 100%;
  border: dashed 2px #25D0B1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    color: #25D0B1;
    font-weight: 400;
    margin: 16px 0 0 0;
  }

  p {
    font-size: 14px;
    opacity: .7;
    margin: 6px 0 24px 0;
  }
`
const ModelHead = styled.div`
  background: #F6F8FA;
  font-size: 12px;
  font-weight: bold;
  color: #3D8AA1;
  padding: 12px 12px 12px 20px;
  display: flex;
  gap: 10px;
  justify-content: space-between;

    p {
        margin:0;
    }

    .desc {
        font-weight: 400;
        color: #605E5C;
        margin: 4px 0 0 0;
    }

  .train-model-button {
    font-weight: 400;
    cursor: pointer;
    transition: 500ms ease 0s;

    i {
        margin-left: 8px;
    }

    &:hover {
        opacity: .5;
    }
  }
`
const FieldContainer = styled.div`
  font-size: 12px;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  transition: 500ms ease 0s;
  align-items: center;

  &.display-only {
    opacity: .4;
  }

  .delete-button {
    display: none;
    padding: 0px 1px;
    transition: 500ms ease 0s;

    &:hover {
        color: #791010;
    }
  }

  &.field-container {
    cursor: pointer;

    &:hover {
        background: #f0f0f0;
        padding-left: 28px;

        .delete-button {
            display: block;
        }

        .field-container-field-type {
            display: none;
        }
    }
    }

  &.active {
    background-color: #f0f0f0;
    font-weight: bold;
  }
  
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

  &:last-child {
    margin-bottom: 24px;
  }

  .field-type {
    opacity: .4;
  }
  .field-container-field-type {
    opacity: .4;
    font-weight: normal;
  }

  .field-container-field-status {
    accent-color: #25D0B1;
  }
`

const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: white;
  padding: 10px 20px;
`
const ToolBtn = styled.div`
    margin-right: 20px;
    display: inline-block;
    font-size: 12px;
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
const TestImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`
const Dialog = styled.div`
    position: absolute;
    left: -450px;
    bottom: 20px;
    width: 400px;
    padding: 20px;
    border-left: 3px solid #6888FA;
    box-shadow: 2px 5px 10px #00000025;
    background: white;
    transition: 500ms ease 0s;
    opacity: 0;
    
    h4 {
        margin: 0;
    }
    p {
        font-size: 12px;
        opacity: .5;
        margin: 6px 0 16px 0;
    }
    div {
        margin-bottom: 8px;
        width: fit-content;
    }

    &.show {
        left: 20px;
        opacity: 1;
    }
`

export default function OnboardingTest() {
    const navigate = useNavigate();
    const MyIcon = (props) => <Icon iconName={props.IconName} className={props.ClassName}/>;

    const schema = getFieldsSchema()
    const PreTrainedContent = schema[0].PreTrainedFields

    const [extractStatus, setExtractStatus] = useState(false)

    const [currentPreTrainedContent, setPreTrainedContent] = useState(() => {
        const storage = JSON.parse(sessionStorage.getItem("newPreTrainedContent"));
        if (storage) {
            return storage
        } else {
            return PreTrainedContent
        }
    });

    const resetTest = () => {
        setExtractStatus(false)
    }

    //test extractor related handelings
    const [extractedPreTrainedData, setExtractedPreTrainedData] = useState([])
    const [nullPreTrainedData, setNullPreTrainedData] = useState([])

    const updateSchema = () => {
        const newPreTrainedFields = Array.from(document.querySelectorAll('.pre-trained-field-container'))
        const newPreTrainedFieldArray = newPreTrainedFields.map(item => {
            const fieldName = item.querySelector('.field-container-field-name').textContent;
            const fieldDefaultName = item.querySelector('.field-container-default-field-name').textContent;
            const fieldStatus = item.querySelector('.field-container-field-status').checked? true : false;
            return {field_name: fieldName, default_field_name: fieldDefaultName, field_status: fieldStatus}
        })
        setPreTrainedContent(newPreTrainedFieldArray)
        sessionStorage.setItem("newPreTrainedContent", JSON.stringify(newPreTrainedFieldArray));
    }

    const testExtractor = (e) => {

        //callLoading('Extracting Document...')

        const extractedPreTrainModelData = getExtractedData()[0].PreTrainedModelResults

        const SelectedPreTrainedContent = currentPreTrainedContent.filter(field =>
              field.field_status === true
        );

        const matchingPreTrainedFields = extractedPreTrainModelData.filter(obj1 =>
            SelectedPreTrainedContent.some(obj2 => obj2.default_field_name === obj1.field_name)
        );

        const nonMatchingPreTrainedFields = SelectedPreTrainedContent.filter(obj1 =>
            extractedPreTrainModelData.every(obj2 => obj2.field_name !== obj1.default_field_name)
        );

        setExtractedPreTrainedData(matchingPreTrainedFields)
        setNullPreTrainedData(nonMatchingPreTrainedFields)
        setExtractStatus(true)


        setTimeout(showDialog, 1200)
    }

    const showDialog = () => {
        const dialog = document.querySelectorAll('.tutorial-dialog')
        dialog[0].classList.add('show')
    }

    const contactUs = () => {
        callToaster('green', 'We will come back to you shortly! Stay tuned:)')
    }

    useEffect(() => {
        const bubble = document.querySelector('.stepOne')
        bubble?.classList.add('show')
      },[])

      const dismissBubble = () => {
        const bubbles = document.querySelectorAll('.bubble')
        bubbles.forEach(bubble => {
            bubble.classList.remove('show')
        })
      }

      const nextBubble = () => {
        const bubble = document.querySelector('.stepOne')
        const nextBubble = document.querySelector('.stepTwo')
        bubble.classList.remove('show')
        nextBubble.classList.add('show')
      }

    //page composition
    return <PageWrapper>
        <TeachingBubble title='The data to extract' content='These Data fields are readily available for extraction right out of the box using the FormX pre-built solution. Feel free to play around and select the fields that suit your needs!' count='1 of 2' arrow='left' xPosition='left: 20%' yPosition='top: 120px' primaryAction='Next' secondaryAction='' className='stepOne bubble' onClick={nextBubble} />
        <TeachingBubble title='Test the data extraction here' content='Then, followed by uploading a file and see how the FormX data extraction works! Don’t have a file on hand? No worries, you can use our dummy samples to test the data extraction for now and setup later!' count='2 of 2' arrow='right' xPosition='right: 50%' yPosition='top: 55%' primaryAction='Got it' secondaryAction='' className='stepTwo bubble' onClick={dismissBubble} />
        <EditModeWrapper>
        <Header>
            <ToolBtn onClick={() => navigate('../onboarding')}><MyIcon IconName='Back'/>Back</ToolBtn>
            <h3>Receipt</h3>
            <p>The data fields below are readily available for extraction without the need for any training, right out of the box!</p>
        </Header>
        <MainWrapper>
            {extractStatus===false? <>
                <SchemaWrapper>
                        <ModelHead>
                            <div>
                                <p>Data Fields</p>
                            </div>
                        </ModelHead>
                        {currentPreTrainedContent.map((dataSets, index) => {
                            return <FieldContainer key={index} className={'field-container pre-trained-field-container'}>
                                <div style={{display: 'flex', gap:'10px', alignItems:'center'}}>
                                {dataSets.field_status? <input type='checkbox' className={'field-container-field-status'} defaultChecked={true} onClick={() => updateSchema()}></input> : <input className={'field-container-field-status'} type='checkbox' onClick={() => updateSchema()}></input>}
                                <div className={'field-container-field-name'}>{dataSets.field_name}</div>
                                <div className={'field-container-default-field-name'} style={{display:'none'}}>{dataSets.default_field_name}</div>
                                </div>
                                <div className={'field-container-field-type'} style={{display:'none'}}>{dataSets.field_type}</div>
                            </FieldContainer>
                        })}
                </SchemaWrapper>
                <TestingWrapper>
                        <InnerTestingWrapper>
                        <img src='/../img/upload icon.png' alt='' />
                        <h2>Quick Test With a File</h2>
                        <p>Drag or upload a file to test the extraction performance.</p>
                        <div onClick={() => callLoading('Extracting Document...', testExtractor)}><YellowButton text='Upload Files' /></div>
                        </InnerTestingWrapper>
                </TestingWrapper>
            </> : <>
            <SchemaWrapper>
                {currentPreTrainedContent.map(obj => obj.field_status).filter(value => value === true).length > 0? <ModelHead>Data Fields<div>Extracted Data</div></ModelHead> : ''}
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
                                <div>null</div>
                            </FieldContainer>
                    })}
                    </SchemaWrapper>
                <TestingWrapper style={{padding: 0}}>
                        <Toolbar>
                            <div>
                                <ToolBtn onClick={resetTest}><MyIcon IconName='Code'/>View in JSON</ToolBtn>
                                <ToolBtn onClick={resetTest}><MyIcon IconName='Download'/>Download XLSX</ToolBtn>
                            </div>
                            <div>
                                <ToolBtn onClick={resetTest} style={{marginRight:'0'}}><MyIcon IconName='TestBeaker'/>Test Another file</ToolBtn>
                            </div>
                        </Toolbar>
                        <TestImageWrapper>
                            <img src='/../img/test image/receipt.png' alt='' />
                        </TestImageWrapper>
                </TestingWrapper>
            </>}        
        </MainWrapper>
        </EditModeWrapper>
        <Dialog className='tutorial-dialog'>
            <h4>So What’s Next?</h4>
            <p>Now you have a glimpse of how FormX works, and there are so much more you can do!</p>
            <div onClick={() => callLoading('Finish Setting Up Your Account...', navigate, '../extractors')}><YellowButton text='I want to keep testing the extractor' /></div>
            <div onClick={() => callLoading('Finish Setting Up Your Account...', navigate, '../extractors')}><YellowButton text='I want to add additional data fields for extraction' /></div>
            <div onClick={contactUs}><BorderButton text='Contact FormX Team' /></div>
        </Dialog> 
        </PageWrapper>   
}