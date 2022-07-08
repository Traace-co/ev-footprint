import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import './App.less';
import { NavHeader } from './navigation/NavHeader';

function App() {
  const { Header, Content } = Layout;
  return (
    <div className="App">
      <Layout>
        <Header className='bg-white'>
          <NavHeader />
        </Header>
        <Content> 
          <div className='container mx-auto py-8 px-4 sm:px-24'>
          <Outlet />
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
