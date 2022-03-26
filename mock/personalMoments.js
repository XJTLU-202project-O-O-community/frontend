let list = [
  {
    id: 0,
    href: 'https://ant.design',
    title: `Robin1`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'Ant Design11111, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), ' +
      'to help people create their product prototypes beautifully and efficiently.We supply a series of design principle' +
      's, practical patterns and high quality design resources (Sketch and Axure), ',
    thumbs: 0,
    likes: 0,
  },

  {
    id: 1,
    href: 'https://ant.design',
    title: `Robin2`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'Ant Design2222, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), ' +
      'to help people create their product prototypes beautifully and efficiently.We supply a series of design principle' +
      's, practical patterns and high quality design resources (Sketch and Axure), ',
    thumbs: 0,
    likes: 0,
  },
  {
    id: 2,
    href: 'https://ant.design',
    title: `Robin3`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'Ant Design11111, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), ' +
      'to help people create their product prototypes beautifully and efficiently.We supply a series of design principle' +
      's, practical patterns and high quality design resources (Sketch and Axure), ',
    thumbs: 0,
    likes: 0,
  },

  {
    id: 3,
    href: 'https://ant.design',
    title: `Robin4`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'Ant Design2222, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), ' +
      'to help people create their product prototypes beautifully and efficiently.We supply a series of design principle' +
      's, practical patterns and high quality design resources (Sketch and Axure), ',
    thumbs: 0,
    likes: 0,
  },
];

export default {
  'GET /api/postPersonal/': list,

  'POST /api/deleteMoment/': (req, res) => {
    list.splice(req.body.id, 1);
    const res1 = {
      code: 200,
      data: list,
    };
    res.send(res1);
  },
};
