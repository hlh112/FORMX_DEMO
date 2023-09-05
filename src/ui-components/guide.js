import styled from "styled-components";
import { Icon } from '@fluentui/react/lib/Icon';
import { useState } from "react";
import { BorderButtonWithIconLeft } from "./button";
import callToaster from "../helper/CallToaster";

const TriggerWrapper = styled.div`
    position: absolute;
    bottom: 25px;
    right: 25px;
    background: white;
    box-shadow: 2px 5px 20px #0000002f;
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 8px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: 500ms ease 0s;

    p {
        margin: 0;
        font-size: 12px;
    }

    &:hover {
        box-shadow: none;
        background: #f5f5f5;
    }

    &.hide {
        display: none;
    }
`
const IconWrapper = styled.div`
    background: #25D0B1;
    border-radius: 3px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
        color: white;
    }
`
const GuideWrapper = styled.div`
    position: absolute;
    bottom: 85px;
    right: 25px;
    background: white;
    box-shadow: 2px 5px 20px #0000002f;
    padding: 8px 10px;
    border-radius: 5px;
    transition: 500ms ease 0s;
    width: 300px;
`
const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 8px;
    p {
        font-size: 14px;
    }
    div {
        display: flex;
        gap: 10px;
        align-items: center;
    }
    .close-btn {
        transition: 500ms ease 0s;
        cursor: pointer;

        &:hover {
            opacity: .2;
        }
    }
`
const Tip = styled.div`
    background: #f8f8f8;
    border: 1px solid #e1e1e1;
    font-size: 11px;
    padding: 8px;
    border-radius: 2px;
    margin-bottom: 16px;
    line-height: 1.5;
    p {
        margin: 0;
    }
`
const Section = styled.div`

    margin-bottom: 20px;

    h4 {
        margin: 0 0 8px 0;
        font-size: 11px;
    }

    div {
        background: #F5F5FD;
        border: 1px solid #C5C5F3;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 6px;
        font-size: 12px;
        padding: 8px 8px;
        border-radius: 2px;
        transition: 500ms ease 0s;
        cursor: pointer;

        p {
            margin: 0;
        }

        &:hover {
            background: #E4E4FF;
            padding: 8px 12px;
        }
    }
`
const ButtonWrapper = styled.div`
    width: 100%;

    button {
        width: 100%;
    }
`

export default function Guide(props) {

    const [Toggled, setToggled] = useState(false)

    const changeTab = (identifier) => {
        const tab = document.querySelectorAll(identifier)
        tab[0]?.click()
        if (identifier === '.tab-manage-fields') {
            sessionStorage.setItem("EditFieldTutorialCompleted", JSON.stringify(false));
            sessionStorage.setItem("ManageFieldTutorialCompleted", JSON.stringify(false));
        }
    }

    const MyIcon = (props) => <Icon iconName={props.IconName} className={props.ClassName}/>;

    //page composition
    return <>
    {Toggled? <GuideWrapper>
        <Header><div><IconWrapper><MyIcon IconName='BookAnswers'/></IconWrapper><p>Extractor Setup Guide</p></div><div className='close-btn' onClick={() => setToggled(false)}><MyIcon IconName='Cancel'/></div></Header>
        <Tip><p>This is the checklist of every steps you need to fully setup the extractor</p></Tip>
        <Section>
            <h4>Basic Setups</h4>
            <div onClick={() => changeTab('.tab-manage-fields')}><p>Setup a <strong>Data Field Schema</strong></p><MyIcon IconName='ChevronRight'/></div>
            <div onClick={() => changeTab('.tab-train-models')}><p>Train the <strong>AI Extraction Model</strong></p><MyIcon IconName='ChevronRight'/></div>
            <div><p>Formatting Extracted Data</p><MyIcon IconName='ChevronRight'/></div>
        </Section>
        <Section>
            <h4>Extraction Input and Output</h4>
            <div><p>Extract with <strong>API Integration</strong></p><MyIcon IconName='ChevronRight'/></div>
            <div><p>Batch Uploading with CSV Export</p><MyIcon IconName='ChevronRight'/></div>
            <div><p>Setup Automated Workflows</p><MyIcon IconName='ChevronRight'/></div>
        </Section>
        <ButtonWrapper onClick={() => callToaster('green', 'We will get in touch with you soon!')}><BorderButtonWithIconLeft text='Contact FormX Team' iconName='Headset' /></ButtonWrapper>

    </GuideWrapper>
    : ''}
    <TriggerWrapper className='guide-trigger' onClick={() => setToggled(true)}>
        <IconWrapper><MyIcon IconName='BookAnswers'/></IconWrapper><p>Setup Guide</p>
    </TriggerWrapper>   
    </>
}