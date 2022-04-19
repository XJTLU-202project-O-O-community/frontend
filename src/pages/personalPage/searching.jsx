import React, { useEffect, useState } from 'react';
import { GetPersonInfo } from '@/services/person';
import { Avatar, Card } from 'antd';

const index_PersonInfo = async (values) => {
  const res = await GetPersonInfo(values);
  console.log(res.data[0].fields.name);
  return res.data[0].fields;
};

const Searching = (props) => {
  const id = props.match.params.userid;
  console.log(id);
  const data1 = { his_id: id };
  let [dataPerson, setpersonInfo] = useState([]);
  useEffect(async () => {
    const infoData = await index_PersonInfo(data1);
    console.log(infoData, 400);
    setpersonInfo(infoData);
  }, []);

  return (
    <div>
      <h1>hello user+{id}</h1>
      <Card style={{ textAlign: 'center', width: 300 }} title="Personal Info">
        <Avatar shape="square" size={50} src={'http://localhost:8000/media/' + dataPerson.photo} />,
        <h2 onClick={console.log(id)} style={{ marginTop: 20 }}>
          {dataPerson.name}
        </h2>
        <h3 style={{ textAlign: 'left' }}>description:</h3>
        <h5 style={{ textAlign: 'left' }}>{dataPerson.signature}</h5>
      </Card>
    </div>
  );
};

export default Searching;
