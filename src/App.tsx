import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import './App.less';
import { navigationBackgroundColor, textColor } from './design/colors';
import { NavFooter } from './navigation/NavFooter';
import { NavHeader } from './navigation/NavHeader';
import { NavigationMenu } from './navigation/NavigationMenu';

function App() {
  const { Header, Content, Footer } = Layout;
  return (
    <div className="App">
      <Layout className='min-h-screen'>
        <Header style={{ backgroundColor: navigationBackgroundColor }}>
          <NavHeader />
        </Header>
        <Content style={{ color: textColor }}>
          <NavigationMenu className='block sm:hidden w-full' />
          <div className='container mx-auto py-8 px-4 sm:px-24'>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ backgroundColor: navigationBackgroundColor }}>
          <NavFooter />
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
