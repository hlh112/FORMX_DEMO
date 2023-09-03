import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { Icon } from '@fluentui/react/lib/Icon';
import { YellowButton, BorderButton } from '../ui-components/button';
import { getFieldsSchema } from "../data/field_schema";
import LoadingState from '../ui-components/loading';
import callLoading from '../helper/CallLoading';

const PageWrapper = styled.div`
    padding: 32px;
    width: 100%;
    background: #FAF9F8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const TestWrapper = styled.div`
    background: white;
    border: 1px solid #e1e1e1;
    padding: 20px 20px 30px 20px;
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 640px;
    box-sizing: border-box;
    border-radius: 4px;

    h3 {
        color: #605E5C;
        margin: 12px 0;
    }
    strong {
        color: #25D0B1;
    }
    p {
        font-size: 12px;
        opacity: .5;
        margin: 0px;
        line-height: 1.5;
    }
`
const InputWrapper = styled.div`
    border: 1px solid #25D0B1;
    padding: 4px;
    background: #white;
    border-radius: 4px;
    display: flex;
    gap: 10px;
    height: fit-content;
    margin-top: 12px;
    margin-bottom: 12px;

    input {
        width: 100%;
        border: none;
        padding-left: 8px;

        &:focus {
            outline: none;
        }
    }
`
const ToolBtn = styled.div`
    display: inline-block;
    font-size: 12px;
    color: #201F1E;
    transition: 500ms ease 0s;
    cursor: pointer;
    margin-bottom: 8px;
    width: 640px;

    &:hover {
        color: #53B2a1;
    }
    
    i {
        margin-right: 6px;
        font-size: 10px;
        color: #53B2A1;
    }
`
const ChipsWrapper = styled.div`
    border: 1px solid #e1e1e1;
    background: #faf9f8;
    padding: 8px;
    height: 320px;
    overflow-y: scroll;
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    border-radius: 4px;
    margin-bottom: 12px;
    align-content: flex-start;
`
const Chip = styled.div`
    background: white;
    border-radius: 4px;
    padding: 8px 10px;
    font-size: 12px;
    width: fit-content;
    height: fit-content;
    cursor: pointer;
    display: flex;
    gap: 8px;
    border: 1px solid #e1e1e1;
    align-items: center;
    transition: 500ms ease 0s;

    &:hover {
        background: #eee;
    }

    i {
        color: #53B2A1;
        font-size: 12px;
    }
`

export default function OnboardingCustom() {
    const navigate = useNavigate();
    const MyIcon = (props) => <Icon iconName={props.IconName} className={props.ClassName}/>;

    const schema = getFieldsSchema()
    const CustomContent = schema[0].CustomFields

    const [currentCustomContent, setCustomContent] = useState(() => {
        const storage = JSON.parse(sessionStorage.getItem("newCustomContent"));
        if (storage) {
            return storage
        } else {
            return CustomContent
        }
    });

    const [DocType, SetDocType] = useState('')

    const generateFields = () => {
        const docTypeValue = document.querySelector('#docType').value
        SetDocType(docTypeValue)
        document.querySelector('#docType').value = ''
    }

    const goBack = () => {
        SetDocType('')
    }

    const removeChip = (e) => {
        console.log('removed')
    }

    const addNewField = (e) => {
        const inputValue = document.querySelector('#fieldName').value
        const newFieldObj = {
            field_name: inputValue,
            field_type: 'single-line text'
        }

        const newCustomContent = [...currentCustomContent, newFieldObj]
        setCustomContent(newCustomContent)

        sessionStorage.setItem("newCustomContent", JSON.stringify(newCustomContent));
    }

    //page composition
    return <>
        <PageWrapper style={{marginTop: '-100px', background:'radial-gradient(farthest-corner at 50% 50%, #B3F0E8 0%, #fdfdfd 60%)'}}>
            <ToolBtn onClick={() => goBack()}><MyIcon IconName='Back'/>Back</ToolBtn>
            {DocType? <TestWrapper>
                <h3>Are the <strong>Fields</strong> below what you want to extract?</h3>
                <p>Review and adjust the fields you want to extract using FormX</p>
                <InputWrapper>
                    <input id='fieldName' type='text' placeholder='Enter a field name'></input>
                    <div onClick={(e) => addNewField(e)}><YellowButton text='Add New Fields' /></div>
                </InputWrapper>
                <ChipsWrapper>
                    {currentCustomContent.map((content, key) => {
                        return <Chip>{content.field_name}<div style={{height:'12px'}} onClick={(e) => removeChip(e)}><MyIcon IconName='Cancel'/></div></Chip>
                    })}
                </ChipsWrapper>
                <div style={{textAlign:'right'}} onClick={() => callLoading('Finish Setting Up Your Account...', navigate, '../extractors')}><YellowButton text='Proceed with these fields' /></div>
            </TestWrapper>
            : <TestWrapper>
                <h3>What type of <strong>Document</strong> are you extracting?</h3>
                <p>Please provide a descriptive and meaningful document name in full form<br></br>e.g. use Business Registration' instead of 'BR’</p>
                <InputWrapper>
                    <input id='docType' type='text' placeholder='Try "movie ticket"'></input>
                    <div onClick={() => callLoading('Generating Fields...', generateFields)}><YellowButton text='Generate Fields' /></div>
                </InputWrapper>
            </TestWrapper>}
            <img style={{position:'absolute', bottom:'50px'}} src='/../img/formx_logo.png' alt='' />
        </PageWrapper>
    </>
}