import { useState, useEffect } from "react";
import styled from "styled-components";
import { YellowButton, BorderButtonWithIconLeft, BorderButton } from '../../ui-components/button';
import { Icon } from '@fluentui/react/lib/Icon';
import callToaster from "../../helper/CallToaster";
import callLoading from "../../helper/CallLoading";
import TeachingBubble from '../../ui-components/teachingBubble';

const PageWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
`
const LeftWrapper = styled.div`
    width: 100%;
    border-right: 1px solid #e1e1e1;
`
const TabHeader = styled.div`
  padding: 12px 20px;
  border-bottom: 1px solid #e1e1e1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h4{
    font-size: 14px;
    margin: 0 0 6px 0;
  }

  p{
    font-size: 12px;
    opacity: .5;
    margin: 0;
  }
`
const SchemaWrapper = styled.div`
    border-right: solid 1px #e1e1e1;
    width: 30%;
    height: 100%;
`
const FieldsWrapper = styled.div`
    height: 100%;
    
`
const FieldInnerWrapper = styled.div`
    height: calc(50% - 82px);
    overflow-y: scroll;
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
        line-height: 1.5;
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
const TableWrapper = styled.div`
    overflow: scroll;
    height: 100%;
`
const SampleTable = styled.table`
    width: 100%;
    border-spacing: 0px;
    
    .checkbox {
        accent-color: #25D0B1;
    }
`
const TableRow = styled.tr`
    &.table-head {
        background: #FAF9F8;
    }
    transition: 500ms ease 0s;

    &.table-content{
        cursor: pointer;
        &:hover {
            background: #f9f9f9;
        }
    }
`
const TableHead = styled.th`
    font-size: 12px;
    padding: 8px 20px;
    font-weight: normal;
    color: #000;
    text-align: left;

    &.xs {
        width: 50px;
        min-width: 50px;
    }
    &.s {
        width: 100px;
        min-width: 100px;
    }
    &.m {
        width: 150px;    
        min-width: 150px;       
    }
`
const TableCell = styled.td`
    img {
        width: 60px;
        max-height: 80px;
        border-radius: 4px;
    }
    font-size: 12px;
    color: #323130;
    padding: 14px 20px;
    text-align: left;

    &.xs {
        width: 50px;
        min-width: 50px;
    }
    &.s {
        width: 100px;
        min-width: 100px;
    }
    &.m {
        width: 150px;    
        min-width: 150px;    
    }
    .switch {
        position: relative;
        display: inline-block;
        width: 34px;
        height: 21px;
    }
    .switch input { 
        opacity: 0;
        width: 0;
        height: 0;
    }
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }
    .slider:before {
        position: absolute;
        content: "";
        height: 13px;
        width: 13px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }
    input:checked + .slider {
        background-color: #25D0B1;
    }
    input:focus + .slider {
        box-shadow: 0 0 1px #25D0B1;
    }
    input:checked + .slider:before {
        -webkit-transform: translateX(13px);
        -ms-transform: translateX(13px);
        transform: translateX(13px);
    }
    .slider.round {
        border-radius: 34px;
    }
    .slider.round:before {
        border-radius: 50%;
    }
    .badge {
        padding: 4px 8px;
        border-radius: 4px;
        width: fit-content;
        text-align: center;
        text-wrap: nowrap;
        background: ${props => props.status === 'Reviewed'? '#EFFCFA' : '#FFEDE7'};
        color: ${props => props.status === 'Reviewed'? '#27AE60' : '#D83B01'};
    }
    &.delete-button {

        i {
            transition: 500ms ease 0s;
            cursor: pointer;
        
            &:hover {
                color: #791010;
            }
        }
      }
`

export default function TrainModels() {
    const MyIcon = (props) => <Icon iconName={props.IconName} className={props.ClassName}/>;

    const thisExtractorID = JSON.parse(sessionStorage.getItem("selectedExtractorID"));

    const allSchema = JSON.parse(sessionStorage.getItem("allExtractorContent"));
    const schema = allSchema.filter(item => item.extractorID === thisExtractorID)
    const CustomContent = schema[0].CustomFields

    //console.log(getSampleData())
    const allSampleData = JSON.parse(sessionStorage.getItem("allSampleData"));
    const sampleData = allSampleData.filter(item => item.extractorID === thisExtractorID)[0].samples    

    const [currentCustomContent, setCustomContent] = useState(() => {
        const storage = JSON.parse(sessionStorage.getItem(thisExtractorID + "_newCustomContent"));
        if (storage) {
            return storage
        } else {
            return CustomContent
        }
    });
    //page composition
    return <PageWrapper>
        <LeftWrapper>
        <TabHeader>
            <div>
                <h4>Training Sample Data</h4>
                <p>To fine-tune the extraction performance, you can provide FormX with some sample data to train the extraction model.</p>
            </div>
        </TabHeader>
        <Toolbar>
            <div>
                <ToolBtn onClick={''}><MyIcon IconName='Add'/>Add New Sample</ToolBtn>
                <ToolBtn onClick={''}><MyIcon IconName='TestBeaker'/>Extract All Files Again</ToolBtn>
            </div>
            <div>
                <ToolBtn onClick={''} style={{marginRight:'0'}}><MyIcon IconName='Delete'/>Delete All</ToolBtn>
            </div>
        </Toolbar>
        <TableWrapper>
        <SampleTable>
            <TableRow className='table-head'>
                <TableHead className='xs'><input className='checkbox' type='checkbox' /></TableHead>
                <TableHead className='s'>File Image</TableHead>
                <TableHead className='m'>File Name</TableHead>
                <TableHead className='s'>Status</TableHead>
                <TableHead className='s'>Uploaded at</TableHead>
                <TableHead className='m'>Including in Training Set</TableHead>
                <TableHead className='xs'>Action</TableHead>
            </TableRow>
            {sampleData.map((sample,index) => {

                return <TableRow className='table-content'>
                        <TableCell className='xs'><input className='checkbox' type='checkbox' /></TableCell>
                        <TableCell className='s'><img src={`/../img/sample data/${thisExtractorID + '/' + sample.fileName}`} alt='' /></TableCell>
                        <TableCell className='m'>{sample.fileName}</TableCell>
                        <TableCell className='s' status={sample.reviewStatus}><div className='badge'>{sample.reviewStatus}</div></TableCell>
                        <TableCell className='m'>{sample.dateUploaded}</TableCell>
                        <TableCell className='xs'>
                            <label className="switch">
                                <input type="checkbox" defaultChecked={sample.includeStatus} />
                                <span className="slider round"></span>
                            </label>
                        </TableCell>
                        <TableCell className='xs delete-button'><MyIcon IconName='Delete' /></TableCell>
                    </TableRow>
            })}
        </SampleTable>
        </TableWrapper>
        </LeftWrapper>
        <SchemaWrapper>
                <FieldsWrapper>
                {currentCustomContent.length > 0? <ModelHead>Custom Model Fields (Instant)</ModelHead> : ''}
                {currentCustomContent.map((dataSets, index) => {
                    return <FieldContainer key={index}>
                        <div>
                            <div className="green-badge"></div>
                            <div>{dataSets.field_name}</div>
                        </div>
                        <div className='field-type'>{dataSets.field_type}</div>
                    </FieldContainer>
                })}
                </FieldsWrapper>
            </SchemaWrapper>
    </PageWrapper>   
}