import React from 'react';
import ProForm, { ProFormText, ProFormRadio,  ProFormGroup,  ProFormDatePicker,ProFormTextArea, ProFormUploadButton,} from '@ant-design/pro-form';
import Mock from 'mockjs';
import { Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import './index.css';
export const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};
const Demo = () => (
        <PageContainer>
        <div style={{
        padding: 24,
    }}>
    <div className='infomation1'>
    <Card>
    <ProForm submitter={{
      searchConfig:{
        resetText:'Reset',
        submitText:'Submit',
      },
    }} name="validate_other" initialValues={{
        username: 'Sakura',
        name:'Mike',
        radio: 'male',
        city:'Suzhou',
        text:'testtesttesttest'
    }} onValuesChange={(_, values) => {
        console.log(values);
    }} onFinish={async (value) => console.log(value)}>
      <ProFormGroup label="Basic">
        <ProFormText width="sm" name="username" label="Username"placeholder="input your username"/>
        <ProFormText width="sm" name="name" label="Name"placeholder="input your name"/>
        <ProFormUploadButton 
        title="Click to upload" 
        name="upload"
        label="Upload"
        withCredentials={true}
        max={1}
        fieldProps={{
          name: 'file',
          listType: 'picture-card',
        }} 
        action="/upload.do"
        extra="This is your avatar"
      />
      </ProFormGroup>
      <ProFormGroup label="Gender & Birthday" style={{
        gap: '0 32px',
    }}>
        <ProFormRadio.Group name="radio" layout="vertical" options={[
        {
            label: 'Male',
            value: 'male',
        },
        {
            label: 'Female',
            value: 'female',
        },
    ]}/>
    <ProFormDatePicker name="date" label="Birthday"/>

      </ProFormGroup>
      <ProFormGroup label="Address">
        <ProFormText width="md" name="city" label="City"placeholder="input your city"/>
      </ProFormGroup>
      <ProFormGroup label="Signature">
      <ProFormTextArea
        width="xl"
        name="text"
        placeholder="input your signature"
      />
      </ProFormGroup>

    </ProForm>
    </Card>
    </div>
  </div>
  </PageContainer>
  );
export default Demo;