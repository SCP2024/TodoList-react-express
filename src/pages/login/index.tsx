import { login } from "@/api/user";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/router";
import styles from "./index.module.css";

export default function Home() {
  const router = useRouter();

  const handleFinish = async (values: { name: string; password: string }) => {
    try {
      const res = await login(values);
      // {data:{id:xx,name:xxx}}
      if (res.success) {
        message.success("登陆成功");

        // user save
        localStorage.setItem("user", JSON.stringify({ info: res.data, token: res.token }));

        router.push("/todolist");
      } else {
        message.error("用户名或密码错误");
      }
    } catch (error) {
      message.error("登录失败，请稍后重试");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>TodoList</h2>
      <Form onFinish={handleFinish}>
        <Form.Item
          label="账号"
          name="name"
          rules={[{ required: true, message: "请输入账号" }]}
        >
          <Input placeholder="请输入账号" autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password placeholder="请输入密码" autoComplete="off" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className={styles.btn}
          >
            登陆
          </Button>
          <Button
            type="default"
            size="large"
            className={styles.btn}
            onClick={() => {
              router.push("/register");
            }}
          >
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
