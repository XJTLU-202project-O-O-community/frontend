export type Member = {
  email: string,
  photo: string,
  actual_name: string,
  gender: string,
  birth: null,
  signature: string,
  id: number,
  username: string,
  moment: string
};

export type BasicListItemDataType = {
  user_id: string;
  username: string;
  moment: string;
  photo: string;


  
  
  href: string;
  body?: any;
  updatedAt: number;
  createdAt: number;
  

  description: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
  content: string;
  following_list: Member[];
};
