import { useState, useEffect } from 'react';
import ManageFields from './extractor_tabs/manage_fields';
import TrainModels from './extractor_tabs/train-models';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { Icon } from '@fluentui/react/lib/Icon';
import {Navbar, NavbarCollapsed} from '../ui-components/navbar';
import Guide from '../ui-components/guide';

const ExtractorHeader = styled.div`
    border-bottom: 1px solid #e1e1e1;
    padding: 0px 20px;
`
const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const InnerPageWrapper = styled.div`
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
    font-size: 16px;

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
const TabBar = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
`
const TabItem = styled.div`
    box-sizing: border-box;
    padding: 10px;
    font-size: 14px;
    opacity: .5;
    cursor: pointer;

    &.selected {
        border-bottom: solid 3px #25D0B1;
        opacity: 1;
    } 
`

export default function Extractor() {

    const MyIcon = (props) => <Icon iconName={props.IconName} className={props.ClassName}/>;

    const [currentTab, setCurrentTab] = useState('manage-fields')
    const navigate = useNavigate();

    const selectTab = (e) => {
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

    //page composition
    return <>
        
        <NavbarCollapsed />
        <PageWrapper>
        <ExtractorHeader>
            <Breadcrumb>
                <BreadcrumbItem className='link' href='../extractors' onClick={handleClick}>Extractors</BreadcrumbItem>
                <BreadcrumbItem className='chevron'><MyIcon IconName='ChevronRight'/></BreadcrumbItem>
                <BreadcrumbItem className='selected'>Receipt</BreadcrumbItem>
            </Breadcrumb>
            <TabBar>
                <TabItem className='extractor-tab selected tab-manage-fields' data-label='manage-fields' onClick={selectTab}>Manage Fields</TabItem>
                <TabItem className='extractor-tab tab-train-models' data-label='train-models' onClick={selectTab}>Train Models</TabItem>
                <TabItem className='extractor-tab' data-label=''>Formatter</TabItem>
                <TabItem className='extractor-tab' data-label=''>Workflow</TabItem>
                <TabItem className='extractor-tab' data-label=''>API</TabItem>
                <TabItem className='extractor-tab' data-label=''>Extraction Panel</TabItem>
                <TabItem className='extractor-tab' data-label=''>Settings</TabItem>
            </TabBar>
        </ExtractorHeader>

        <InnerPageWrapper>     
            {
                (() => {
                    if(currentTab === 'manage-fields') {
                            return (
                                <ManageFields />
                            )
                        } else if (currentTab === 'train-models') {
                            return (
                                <TrainModels />
                            )
                        }
                })()  
            }  
        </InnerPageWrapper>
        <Guide />
        </PageWrapper>
    </>    
}