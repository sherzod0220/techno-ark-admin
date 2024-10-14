import React, { useState,useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { NavLink, Outlet,useLocation } from "react-router-dom";
import { routes } from '../../router/routes';
import logo from '../../assets/logo.svg'
import { Logout } from "@modals";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("");

  useEffect(() => {
    // Find the active route and set the selected key based on the current path
    const currentRouteIndex = routes.findIndex(
      route => route.path === location.pathname
    );
    // console.log(currentRouteIndex);
    if (currentRouteIndex !== -1) {
      setSelectedKey(currentRouteIndex.toString());
    }
  }, [location.pathname]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        style={{
            minHeight: "100vh",
            width: "400px",
            overflow: "auto",
          }}
        width={250}  
        >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "",
            padding: collapsed ? "16px 8px" : "20px",
            marginBottom: "16px",
          }}
        >
          <img
            src={logo}
            alt="Main Logo"
            // style={{ width: collapsed ? 48 : 48 }}
            style={{width: 40}}
          />
          {!collapsed && (
            <h1 className='text-[22px] text-[#d55200] font-extrabold'>EXNOARK</h1>
          )}
        </div>        
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]} // Dynamically set selected keys
          items={routes.map((item, index) => ({
            key: index.toString(), // Use string keys for consistency
            icon: item.icon,
            label: <NavLink to={item.path} style={{fontSize:"20px"}}>{item.title}</NavLink>,
          }))}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer}}>
            <div className='flex justify-between items-center'>
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined style={{fontSize:"22px"}}/> :   <MenuFoldOutlined style={{fontSize:"22px"}}/>}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                  }}
                />
                <Logout/>
            </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;