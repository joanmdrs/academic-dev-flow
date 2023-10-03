import React from "react";
import './Search.css';
import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Search = (props) => {
    return (
        <Button className="button-search" type="default" icon={<SearchOutlined />}>
            {props.name}
        </Button>
    );
}

export default Search;