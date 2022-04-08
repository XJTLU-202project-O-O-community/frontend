import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'O%O community',
  });
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Ant Design Pro',
          title: 'O%O community',

          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,

          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'O%O community',

          blankTarget: true,
        },
      ]}
    />
  );
};
