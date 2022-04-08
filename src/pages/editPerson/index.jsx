import React, { useEffect, useState } from 'react';
import ProForm, {
  ProFormText,
  ProFormRadio,
  ProFormGroup,
  ProFormDatePicker,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import Mock from 'mockjs';
import { Card, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import './index.css';
import { GetPersonInfo } from '@/services/person';
import { changeProfile } from '@/services/person';
import { Profile } from '@/services/posts';

export const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const getProfile = async () => {
  const data = await GetPersonInfo();
  return { data: data };
};

const uploadProfile = async (values) => {
  const res = await changeProfile(values);
  if (res.code == 200) {
    message.success('add successfully');
  } else message.error('error');
};

const Demo = () => {
  let [profileData, setdata] = useState([]);

  useEffect(async () => {
    const resData = await getProfile();
    console.log(resData);
    setdata(resData.data);
  }, []);
  return (
    <PageContainer>
      <div
        style={{
          padding: 24,
        }}
      >
        <div className="infomation1">
          <Card>
            <ProForm
              submitter={{
                searchConfig: {
                  resetText: 'Reset',
                  submitText: 'Submit',
                },
              }}
              name="validate_other"
              onFinish={async (value) => {
                uploadProfile(value);
                location.reload();
                return true;
              }}
            >
              <ProFormGroup label="Basic">
                <ProFormText
                  name="username"
                  initialValue={profileData.username}
                  width="sm"
                  label="username"
                />
                <ProFormText name="name" initialValue={profileData.name} width="sm" label="Name" />
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
              <ProFormGroup
                label="Gender & Birthday"
                style={{
                  gap: '0 32px',
                }}
              >
                <ProFormRadio.Group
                  name="radio"
                  layout="vertical"
                  options={[
                    {
                      label: 'Male',
                      value: 'male',
                    },
                    {
                      label: 'Female',
                      value: 'female',
                    },
                  ]}
                />
                <ProFormDatePicker name="date" label="Birthday" />
              </ProFormGroup>
              <ProFormGroup label="Address">
                <ProFormText width="md" name="city" label="City" initialValue={profileData.city} />
              </ProFormGroup>
              <ProFormGroup label="Signature">
                <ProFormTextArea width="xl" name="text" initialValue={profileData.text} />
              </ProFormGroup>
            </ProForm>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default Demo;
