import React from 'react';
import {Button, Row, Col, Card, Icon, Pagination, Badge} from 'antd';

const FriendsList = (props) => {
  // console.log("FriendsList", JSON.stringify(props.friends.list));
  const friendsPerPage = 15;
  const currentFriendList = props.friends.list.slice((props.friends.page - 1) * friendsPerPage,
      props.friends.page * friendsPerPage);
  // console.log("currentFriendList", currentFriendList);
  
  const pagination = <div className="friend-pagination">
    <Pagination id="pagination" pageSize={friendsPerPage} total={props.friends.list.length}
                current={props.friends.page} onChange={props.changeFriendListPageNumber}/>
  </div>;
  
  return <div>
    <h1 id="GitMax好友列表">
      <span>GitMax好友列表</span>
      <a href="#GitMax好友列表" className="anchor">#</a>
      <span className="refresh-btn">
        <Button type="primary" icon="reload" onClick={() => props.onFetchFriends()}>
          刷新
        </Button>
      </span>
    </h1>
    <p>好友总数：
      <a>
      <Badge count={props.friends.list.length} overflowCount={9999} className ="friendsCount"
             style={{backgroundColor: '#87d068'}}/>
      </a>
    </p>
    
    <div className="friend-list-container">
      <Row gutter={16} className="new-friends-container">
        {
          currentFriendList.map(friend => {
            let detail = [];
            if (friend.friendLocation) detail.push(<div>
              <span className="details">
                <Icon type="environment-o"/>
                {`位置：${friend.friendLocation}`}
              </span>
            </div>);
            else if (friend.friendCompany) detail.push(<div>
              <span className="details">
                <Icon type="team"/>
                {`组织：${friend.friendCompany}`}
              </span>
            </div>);
            detail.push(<div>
              <span className="details">
                <Icon type="clock-circle-o"/>
                {`加入GitHub：${friend.friendCreated_at.split("T")[0]}`}
              </span>
            </div>);
            
            return <Col xs={24} sm={24} md={12} lg={8} className="friend-col">
              <a href={"https://github.com/" + friend.friendLogin} target="_blank" className="friend-list-link">
              <Card bodyStyle={{padding: 0}} className="friend-list-card">
                <Col span={8}>
                  <div className="new-friend-image">
                      <img alt={friend.friendLogin} width="100%" src={friend.friendAvatarUrl}/>
                  </div>
                </Col>
                <Col span={14} offset={1}>
                  <div className="friend-name">
                    
                      {friend.friendName ? friend.friendName : friend.friendLogin}
                    
                  </div>
                  <div>
                    {detail}
                  </div>
                </Col>
              
              </Card>
              </a>
            </Col>
          })
        }
      </Row>
    </div>
    
    {pagination}
  </div>
};

export default FriendsList;
