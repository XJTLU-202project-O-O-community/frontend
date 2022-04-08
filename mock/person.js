let data = [
  {
    username: 'Sakura1',
    name: 'Mike Martin',
    id: 1,
    gender: 'Male',
    city: 'Suzhou',
    date: '20000809',
    text: 'testtesttesttesttesttesttesttesttesttesttesttesttest',
    avatar: 'https://th.bing.com/th/id/OIP.Jj--APqfnW9dNtbzDkFFBQAAAA?pid=ImgDet&rs=1',
  },
  {
    username: 'Robin2',
    name: 'Mike Martin',
    id: 2,
    gender: 'Male',
    city: 'Changzhou',
    date: '20000809',
    text: 'testtesttesttesttesttesttesttesttesttesttesttesttest',
    avatar: 'https://th.bing.com/th/id/OIP.Jj--APqfnW9dNtbzDkFFBQAAAA?pid=ImgDet&rs=1',
  },
  {
    username: 'Linda3',
    name: 'Mike Martin',
    id: 3,
    gender: 'Male',
    city: 'Changzhou',
    date: '20000809',
    text: 'testtesttesttesttesttesttesttesttesttesttesttesttest',
    avatar: 'https://th.bing.com/th/id/OIP.Jj--APqfnW9dNtbzDkFFBQAAAA?pid=ImgDet&rs=1',
  },
];

export default {
  // 'GET /api/user/currentUser/': (req,res)=>{
  //   console.log(req.query.userid,3333)
  //   res.send({
  //     code: 200,
  //     data: data[req.query.userid-1],
  //   })
  //
  // },
  'POST /api/user/changeProfile/': (req, res) => {
    data.username = req.body.username;
    data.city = req.body.city;
    data.date = req.body.date;
    res.send({
      code: 200,
      data: data,
    });
  },
};
