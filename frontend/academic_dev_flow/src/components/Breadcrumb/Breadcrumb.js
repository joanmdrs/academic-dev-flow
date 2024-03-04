import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const CustomBreadcrumb = ({ routes }) => {
  return (
    <Breadcrumb style={{margin: "20px"}}>
      {routes.map((route, index) => (
        <Breadcrumb.Item key={index}>
          {route.path ? <Link to={route.path}>{route.title}</Link> : route.title}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
