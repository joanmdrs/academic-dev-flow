import React from 'react';

const OptionWithColor = ({ label, color }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
            style={{
                backgroundColor: color,
                width: 12,
                height: 12,
                borderRadius: '50%',
                marginRight: 8,
            }}
        ></div>
        {label}
    </div>
);

export default OptionWithColor;
