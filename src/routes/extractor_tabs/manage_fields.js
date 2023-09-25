import { getFieldsSchema } from "../../data/field_schema";
import { getExtractedData } from "../../data/extracted_data";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { YellowButton, BorderButtonWithIconLeft, BorderButton } from '../../ui-components/button';
import { Icon } from '@fluentui/react/lib/Icon';
import callToaster from "../../helper/CallToaster";
import callLoading from "../../helper/CallLoading";
import TeachingBubble from '../../ui-components/teachingBubble';
import useMountTransition from "../../helper/CallTransition";

/* common elements */
const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background: #F6F8FA;
  justify-content: center;
  padding: 20px 0 30px 0;
  box-sizing: border-box;
`
const FieldSchemaWrapper = styled.div`
    transition: 500ms ease 0s;
    display: flex;
    flex-direction: column;
    background: white;
    border: 1px solid #e1e1e1;
    width: 550px;
    height: fit-content;
    max-height: 100%;
`
const SchemaHeader = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;

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
const FieldsWrapper = styled.div`
  overflow-y: scroll;
`
const FieldsSectionWrapper = styled.div`
  margin-bottom: 12px;
`
const ModelHead = styled.div`
  background: #F6F8FA;
  font-size: 10px;
  font-weight: 600;
  color: #3D8AA1;
  padding: 12px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
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
/* non edit mode elements */
const FieldContainer = styled.div`
  display: flex;
  font-size: 12px;
  padding: 8px 12px;
  transition: 500ms ease 0s;
  justify-content: space-between;
  align-items: center;

  .delete-button {
    display: none;
    width: 20px;
    height: 20px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    text-align: center;
    transition: 500ms ease 0s;
    background: #F0F0F0;
    color: #A19F9D;
    border: 1px solid transparent;

    &:hover {
        color: #F86551;
        background: #FFDDD8;
        border: 1px solid #FFCBC4;
    }
  }

  &.field-container {
    cursor: pointer;

    &:hover {
        background: #f0f0f0;
        padding-left: 28px;

        .delete-button {
            display: flex;
        }
    }
  }

  .input-container {
    margin-right: 6px;

    input {
        padding: 4px;
        border: 1px solid #e1e1e1;
        border-radius: 2px;
        transition: 500ms ease 0s;
        width: 180px;
        padding: 6px;

        &:hover {
            border: 1px solid #999;
        }
    }

    select {
        padding: 4px;
        border: 1px solid #e1e1e1;
        border-radius: 2px;
        transition: 500ms ease 0s;
        width: 180px;
        padding: 6px;

        &:hover {
            border: 1px solid #999;
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

  .field-type {
    opacity: .4;
  }

  .field-container-field-status {
    accent-color: #25D0B1;
  }
`
/* edit mode elem */
const FieldInnerWrapper = styled.div`
    height: ${props => props.height > 0? 'calc(50% - 40px)' : 'calc(100% - 100px)'};
    overflow-y: scroll;
`
const AddFieldButton = styled.div`
  background: #E0EBEF;
  transition: 500ms ease 0s;
  width: 12px;
  height: 12px;
  line-height: 1;
  padding: 6px;
  border-radius: 2px;
  cursor: pointer;
  &:hover {
    background: #B6CED7;
  }
`
const CustomEmpty = styled.div`
    padding: 16px 20px 6px 20px;
    border-top: 1px solid #e1e1e1;
    transition: 500ms ease 0s;

    &:hover {
        padding-left: 28px;
    }

    h4 {
        font-size: 12px;
        font-weight: normal;
        margin: 0;
    }
    p {
        font-size: 12px;
        color: #0078D4;
        cursor: pointer;
        margin: 4px 0 0 0;
        transition: 500ms ease 0s;
        &:hover {
            opacity: .5;
        }
    }
`
const TrainButton = styled.div`
    display: flex;
    gap: 6px;
    justify-content: center;
    align-items: center;
    background: white;
    padding: 6px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 400;
    border: 1px solid #e1e1e1;
    transition: 500ms ease 0s;

    &:hover {
        transform: scale(.95);
        border: 1px solid transparent;
    }
`


export default function ManageFields(props) {
    
    const MyIcon = (props) => <Icon iconName={props.IconName} className={props.ClassName}/>;
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

    //edit mode handelings
    const [editMode, setEditMode] = useState(false)
    const hasTransitionedIn = useMountTransition(editMode, 100);

    const enterEditMode = () => {
        setEditMode(true)
    }
    //add fields
    const addNewField = () => {
        const newFieldObj = {
            field_name: 'New Field',
            field_type: 'single-line text'
        }
        const newCustomContent = [...currentCustomContent, newFieldObj]
        setCustomContent(newCustomContent)
    }
    useEffect(()=>{
        const elem = document.querySelectorAll('.custom-field-container')
        elem[elem.length-1]?.querySelector('.field-container-field-name').focus()
        elem[elem.length-1]?.querySelector('.field-container-field-name').select()

        if (currentCustomContent.length === 0) {
            document.querySelector('.tab-train-models').style.display = 'none'
        } else {
            document.querySelector('.tab-train-models').style.display = 'block'
        }
    }, [currentCustomContent])
    //delete fields handling
    const deleteField = (fieldName, e) => {
        e.stopPropagation();
        const selectedDiv = e.currentTarget.parentNode;
        selectedDiv.parentNode.removeChild(selectedDiv);
    };
    //save schema
    const saveSchema = () => {
        const newCustomFields = Array.from(document.querySelectorAll('.custom-field-container'))
        const newCustomFieldArray = newCustomFields.map(item => {
            const fieldName = item.querySelector('.field-container-field-name').value.trim().replace(/\s+/g, '_').toLowerCase();
            const fieldType = item.querySelector('.field-container-field-type').value;
            return {field_name: fieldName, field_type: fieldType}
        })
        setCustomContent(newCustomFieldArray)
        sessionStorage.setItem(thisExtractorID + "_newCustomContent", JSON.stringify(newCustomFieldArray));

        const newPreTrainedFields = Array.from(document.querySelectorAll('.pre-trained-field-container'))
        const newPreTrainedFieldArray = newPreTrainedFields.map(item => {
            const fieldName = item.querySelector('.field-container-field-name').textContent;
            const fieldDefaultName = item.querySelector('.field-container-default-field-name').textContent;
            const fieldStatus = item.querySelector('.field-container-field-status').checked? true : false;
            return {field_name: fieldName, default_field_name: fieldDefaultName, field_status: fieldStatus}
        })
        setPreTrainedContent(newPreTrainedFieldArray)
        sessionStorage.setItem(thisExtractorID + "_newPreTrainedContent", JSON.stringify(newPreTrainedFieldArray));

        setEditMode(false)
        callToaster('green', 'Schema Saved')
        props.setRemountPanel(true)
    }
    //discard changes
    const discardChanges = () => {
        setEditMode(false)
    }
    //teaching bubble state handlings
    const dismissBubble = (e) => {
        if (e.currentTarget.parentNode.parentNode.parentNode.classList.contains('edit-field-bubble')) {
            sessionStorage.setItem("EditFieldTutorialCompleted", JSON.stringify(true));
              console.log('executed')
        } 
        if (e.currentTarget.parentNode.parentNode.parentNode.classList.contains('manage-field-bubble')) {
            sessionStorage.setItem("ManageFieldTutorialCompleted", JSON.stringify(true));
        }
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
    const lastBubble = () => {
        const bubble = document.querySelector('.stepTwo')
        const nextBubble = document.querySelector('.stepThree')
        bubble.classList.remove('show')
        nextBubble.classList.add('show')
    }
    useEffect(() => {
        const manageFieldBubble = document.querySelector('.stepOne.manage-field-bubble')
        const manageStatus = JSON.parse(sessionStorage.getItem("ManageFieldTutorialCompleted"))
        if (!manageStatus) {
            manageFieldBubble?.classList.add('show')
        }
        const editFieldBubble = document.querySelector('.stepOne.edit-field-bubble')
        const editStatus = JSON.parse(sessionStorage.getItem("EditFieldTutorialCompleted"))
        if (!editStatus) {
            editFieldBubble?.classList.add('show')
        }
    },[editMode])

    const toTrainModel = () => {
        document.querySelector('.extractor-tab.tab-train-models')?.click()
    }

    //page composition
        return <PageWrapper>
            {editMode? <FieldSchemaWrapper className={`${hasTransitionedIn && 'show'}`}>
                <TeachingBubble title='These are your data fields' content='You can add or remove the fields you want here.' count='1 of 3' arrow='right' xPosition='left: calc(50% - 512px)' yPosition='top: 177px' primaryAction='Next' secondaryAction='' className='stepOne bubble edit-field-bubble' onClick={nextBubble} />
                <TeachingBubble title='Add Custom Fields' content='You can always create your own custom fields using the FormX Custom Model.' count='2 of 3' arrow='right' xPosition='left: calc(50% - 512px)' yPosition='top: 486px' primaryAction='Next' secondaryAction='' className='stepTwo bubble edit-field-bubble' onClick={lastBubble} />
                <TeachingBubble title='Remember saving your changes' content='Save the changes before you leave this page.' count='3 of 3' arrow='topRight' xPosition='left: calc(50% + 30px)' yPosition='top: 130px' primaryAction='Got it' secondaryAction='' className='stepThree bubble edit-field-bubble' onClick={dismissBubble} />
                <SchemaHeader>
                    <div>
                        <h4>Field Schema</h4>
                        <p>Adjust the data fields you want to extract</p>
                    </div>
                    <div style={{display:'flex', gap:'6px'}}>
                        <div onClick={discardChanges}><BorderButton text='Discard Changes' /></div>
                        <div onClick={saveSchema}><YellowButton text='Save' /></div>
                    </div>
                </SchemaHeader>
                <FieldsWrapper className='editing'>

                    {currentPreTrainedContent.length? <FieldsSectionWrapper>
                        <ModelHead>
                            <div>
                                <p>Pre-trained Model Fields ({extractorName})</p>
                                <p className='desc'>Fields that are readily available for extraction without further AI model training needed.</p>
                            </div>
                        </ModelHead>
                        <FieldInnerWrapper height={currentPreTrainedContent.length}>
                            {currentPreTrainedContent.map((dataSets, index) => {
                                return <FieldContainer key={index} className={'field-container pre-trained-field-container'}>
                                    <div style={{display: 'flex', gap:'10px', alignItems:'center'}}>
                                    {dataSets.field_status? <input type='checkbox' className={'field-container-field-status'} defaultChecked={true}></input> : <input className={'field-container-field-status'} type='checkbox'></input>}
                                    <div className={'field-container-field-name'}>{dataSets.field_name}</div>
                                    <div className={'field-container-default-field-name'} style={{display:'none'}}>{dataSets.default_field_name}</div>
                                    </div>
                                    <div className={'field-container-field-type'} style={{display:'none'}}>{dataSets.field_type}</div>
                                </FieldContainer>
                            })}
                        </FieldInnerWrapper>
                    </FieldsSectionWrapper>
                    : ''}

                    {currentCustomContent.length? <FieldsSectionWrapper>
                        <ModelHead>
                            <div>
                                <p>Custom Model Fields (Instant)</p>
                                <p className='desc'>Fields that are readily available for extraction. You can further train the AI model with some sample data later on.</p>
                            </div>
                            <AddFieldButton onClick={addNewField}><MyIcon IconName='Add'/></AddFieldButton>
                        </ModelHead> 
                        <FieldInnerWrapper height={currentPreTrainedContent.length}>
                            {currentCustomContent.map((dataSets, index) => {
                                return <FieldContainer key={index} className={'field-container custom-field-container'}>
                                    <div>
                                        <div className='input-container'>
                                            <input id='fieldName' className={'field-container-field-name'} type='text' placeholder="new field" defaultValue={dataSets.field_name}></input>
                                        </div>
                                        <div className='input-container'>
                                            <select id='fieldType' className={'field-container-field-type'} type='text' defaultValue={dataSets.field_type}>
                                                <option>single-line text</option>
                                                <option>multi-line text</option>
                                                <option>date</option>
                                                <option>time</option>
                                                <option>numbers</option>
                                                <option>monetary_amount</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={'delete-button'} onClick={(e) => deleteField(dataSets.field_name, e)}><MyIcon IconName='Delete'/></div>
                                </FieldContainer>
                            })}
                        </FieldInnerWrapper>
                    </FieldsSectionWrapper>
                    : 
                    <FieldsSectionWrapper>
                        <CustomEmpty>
                            <h4>Don’t see the fields you need? </h4>
                            <p onClick={addNewField}>Add custom fields using FormX Custom Model.</p>
                        </CustomEmpty>
                    </FieldsSectionWrapper> }

                </FieldsWrapper>
            </FieldSchemaWrapper> 
             : 
            <FieldSchemaWrapper>
                <TeachingBubble title='Access your data fields in this tab' content='You can adjust the data you want to extract by editing the field schema inside this tab.' count='1 of 2' arrow='left' xPosition='left: 220px' yPosition='top: 290px' primaryAction='Next' secondaryAction='' className='stepOne bubble manage-field-bubble' onClick={nextBubble} />
                <TeachingBubble title='Click here to edit the data fields' content='Start editing the data fields schema by clicking this button here.' count='2 of 2' arrow='topRight' xPosition='left: calc(50% + 35px)' yPosition='top: 127px' primaryAction='Got it' secondaryAction='' className='stepTwo bubble manage-field-bubble' onClick={dismissBubble} />
                <SchemaHeader>
                    <div>
                        <h4>Field Schema</h4>
                        <p>Adjust the data fields you want to extract</p>
                    </div>
                    <div className='edit-button' onClick={enterEditMode}><BorderButtonWithIconLeft iconName='Edit' text='Edit Schema' /></div>
                </SchemaHeader>
                <FieldsWrapper>
                    {currentPreTrainedContent.length? <FieldsSectionWrapper>
                        {currentPreTrainedContent.map(obj => obj.field_status).filter(value => value === true).length > 0? <ModelHead>Pre-trained Model Fields ({extractorName})</ModelHead> : ''}
                            {currentPreTrainedContent.map((dataSets, index) => {
                                return <>
                                    {dataSets.field_status? <FieldContainer key={index}>
                                        <div>
                                            <div className="green-badge"></div>
                                            <div>{dataSets.field_name}</div>
                                        </div>
                                    </FieldContainer> : ''}
                                </>
                        })}
                    </FieldsSectionWrapper>: ''}

                    {currentCustomContent.length > 0? <FieldsSectionWrapper>
                        <ModelHead><div>Custom Model Fields (Instant)</div><TrainButton onClick={toTrainModel}>Improve Model Accuracy<MyIcon IconName='Forward' /></TrainButton></ModelHead>
                        {currentCustomContent.map((dataSets, index) => {
                            return <FieldContainer key={index}>
                                <div>
                                    <div className="green-badge"></div>
                                    <div>{dataSets.field_name}</div>
                                </div>
                                <div className='field-type'>{dataSets.field_type}</div>
                            </FieldContainer>
                        })}
                    </FieldsSectionWrapper> : ''}

                </FieldsWrapper>
            </FieldSchemaWrapper>}
        </PageWrapper>
}