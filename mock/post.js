let list = [
  {
    id: 1,
    href: 'https://ant.design',
    title: `Robin`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'Ant Design11111, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), ' +
      'to help people create their product prototypes beautifully and efficiently.We supply a series of design principle' +
      's, practical patterns and high quality design resources (Sketch and Axure), ',
    likes: 5,
    thumbs: 220,
  },

  {
    id: 2,
    href: 'https://ant.design',
    title: `This is linda`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'Ant Design2222, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), ' +
      'to help people create their product prototypes beautifully and efficiently.We supply a series of design principle' +
      's, practical patterns and high quality design resources (Sketch and Axure), ',
    likes: 0,
    thumbs: 0,
  },

  {
    id: 3,
    href: 'https://ant.design',
    title: `this is mock3`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'Ant Design3333, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), ' +
      'to help people create their product prototypes beautifully and efficiently.We supply a series of design principle' +
      's, practical patterns and high quality design resources (Sketch and Axure), ',
    likes: 10,
    thumbs: 20,
  },
];

export default {
  'GET /api/posts': list,

  'POST /api/addMoment/': (req, res) => {
    const item = {
      id: list.length + 1,
      href: 'https://ant.design',
      title: `Robin`,
      avatar: 'https://joeschmoe.io/api/v1/random',
      description: req.body.description,
      content: req.body.content,
      likes: 0,
      thumbs: 0,
    };
    list.unshift(item);
    const res1 = {
      code: 200,
      data: list,
    };
    res.send(res1);
  },
};
