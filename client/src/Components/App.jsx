import React from 'react';
import {Menu, Row, Col, Icon} from 'antd';
import {Link} from 'react-router';
import NavContainer from './NavContainer';
import Footer from './Footer';

const App = (props) => {
  
  const getSelectedKey = () => {
    // console.log("props.router.location.pathname", props.router.location.pathname);
    switch(props.router.location.pathname){
      case "/app/addFollower": return "1";
      case "/app/friends": return "2";
      default: return "x";
    }
  };
  
  const onMenuClick = ({item, key, keyPath}) => {
    // console.log("item, key, keyPath", item, key, keyPath);
    switch (key) {
      case "2":
        props.goToFriendsListPage(props.router);
        // console.log("followModalOpen start");
        break;
      case "3":
        props.userLogout();
        break;
    }
  };
  
  const leftBar = <Menu
      onClick={onMenuClick}
      style={{width: "100%", height: "100%"}}
      defaultOpenKeys={['sub1']}
      mode="inline"
      selectedKeys = {getSelectedKey()}
  >
    <Menu.Item key="1"><Link to="/app/addFollower">添加好友</Link></Menu.Item>
    <Menu.Item key="2">我的好友</Menu.Item>
    <Menu.Item key="3"><Icon type="poweroff" />登出</Menu.Item>
  </Menu>;
  
  return (
      <div>
        <div className="page-wrapper">
          <NavContainer router={props.router}/>
          <div className="main-wrapper">
            <Row>
              <Col span={4}>
                {leftBar}
              </Col>
              
              <Col className="main-container" span={20}>
                <div className="markdown">
                  {props.children}
                </div>
              </Col>
            </Row>
          </div>
          <Footer/>
        </div>
      </div>
  );
};

export default App;