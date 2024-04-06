import { Tag } from "antd";

export const customizeRequiredMark = (label, { required }) => (
    <>
        {label}
        {required ? null : <Tag style={{marginLeft: "5px"}} color="warning">Opcional </Tag> }
    </>
);
