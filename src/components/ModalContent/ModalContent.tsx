import React from "react";
import { Input, Button, Form, InputNumber } from "antd";
import { tableColumns, dashBoardListColumnsProps } from "../../helpers/dashBoardListColumns";
import { ModalMode } from "../DashBoard/DashBoard";

type ModalContentProps = {
  visible: boolean
  mode: ModalMode
  initialValues: { [key: string] : string | number }
  onConfirm: (values: dashBoardListColumnsProps) => void
  onClose: () => void
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const ModalContent: React.FC<Omit<ModalContentProps, 'onClose' | 'visible'>> = ({
  initialValues,
  mode,
  onConfirm,
}) => {
  return (
    <Form
        {...layout}
        name="basic"
        initialValues={initialValues}
        onFinish={onConfirm}
      >
      {tableColumns.map((field, i) => (
        <Form.Item
          key={i}
          label={field.label}
          name={field.name}
          rules={[{ required: true, message: `Please enter the  ${field.name}!` }]}
        >
          {field.type === 'number' ? <InputNumber /> : <Input />}
        </Form.Item>
      ))}

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">{`${mode === 'create' ? 'Submit':'Update'}`}</Button>
      </Form.Item>
    </Form>
  )
}