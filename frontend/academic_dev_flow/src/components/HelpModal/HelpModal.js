import React, { useState } from "react";
import { Modal, Button, Tooltip, Card } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "./HelpModal.css";

const HelpModal = ({ info }) => {
  
        return (
            <div className="help-modal">
                <p>{info}</p>
            </div>
        )
};

export default HelpModal;
