import { UserType } from "@/type";
import {
  Button,
  Form,
  Input,
  Radio,
  message,
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { register } from "@/api/user";

import styles from "./index.module.css";

export default function RegisterForm() {
  const [form] = Form.useForm();
  const router = useRouter();

  // 注册成功后的回调函数
  const handleFinish = async (values: UserType) => {
    await register(values);
    message.success("创建成功");
    router.push("/login");
  };

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>用户注册</h2>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        onFinish={handleFinish}
      >
        <Form.Item
          label="账号"
          name="name"
          rules={[
            {
              required: true,
              message: "请输入账号",
            },
            {
              pattern: /^[a-zA-Z0-9_-]{3,16}$/, // 用户名正则表达式
              message: "账号只能包含字母、数字、下划线和横线,长度为3-16个字符",
            },
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="名称"
          name="nickName"
          rules={[
            {
              required: true,
              message: "请输入名称",
            },
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="性别"
          name="sex"
          rules={[
            {
              required: true,
              message: "请选择性别",
            },
          ]}
        >
          <Radio.Group>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/, // 密码正则表达式
              message: "密码必须包含字母和数字,长度为6-20个字符",
            },
          ]}
        >
          <Input.Password placeholder="请输入" />
        </Form.Item>
        <Form.Item label="状态" name="status">
          <Radio.Group>
            <Radio value="on">启用</Radio>
            <Radio value="off">禁用</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="角色" name="role">
          <Radio.Group>
            <Radio value="user">用户</Radio>
            <Radio value="admin">管理员</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className={styles.btn}
          >
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
