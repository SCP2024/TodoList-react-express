import React, { useEffect } from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    message
} from 'antd';
import { TodoListAdd, TodoListUpdate } from '@/api/todolist';
import { TodoListType } from '@/type';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import dayjs from 'dayjs';
import Content from '../Content';
import { TODO_STATUS } from '@/constant/todo';


export default function TodoForm(
    { title,data,
        editData = {
            status: TODO_STATUS.OFF,
        } }: { title: string, data?: Partial<TodoListType>,editData?: Partial<TodoListType> }
) {

    const { TextArea } = Input;
    const router = useRouter();
    const [form] = Form.useForm();


    let user = null;
    if (typeof window !== "undefined") {
        const userStorge = localStorage.getItem("user");
        if (userStorge) {
            user = JSON.parse(userStorge);
        }
    }


    useEffect(() => {
        if (data?._id) {
            console.log(data);
            console.log([data.todo, data.description, data.deadline]);
            form.setFieldsValue({
                todo: data.todo,
                description: data.description
            });
            console.log(form.getFieldsValue());
        }
    }, [form, data]);
    
    

    const handleFinish = async (values: TodoListType) => {
        if (!values.deadline) {
            values.deadline = dayjs(values.deadline).valueOf();
        }
        if (data?._id) {
            await TodoListUpdate( data._id,values);
            message.success('更新成功');
        } else {
              await TodoListAdd(values, "off", user.info.name);
        message.success('创建成功');
        }
        router.push('/todolist');
    }

    return <Content title="事项添加">
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 15 }}
            layout="horizontal"
            onFinish={handleFinish}
        >
            <Form.Item label="Todo" name="todo" rules={[
                {
                    required: true,
                    message: '请输入待办事项'
                }]
            }>
                <Input
                    name="todo"
                    placeholder="请输入"
                    allowClear
                />
            </Form.Item>
            <Form.Item label="截止日期" name="deadline" rules={[
                {
                    required: true,
                    message: '请选择日期'
                }]
            }>
                <DatePicker  name="deadline" placeholder="请选择" />
            </Form.Item>
            <Form.Item label="说明" name="description">
                <TextArea  name="description" rows={4}
                    placeholder="请输入"
                />
            </Form.Item>
            <Form.Item label=" " colon={false}>
                <Button
                    size='large'
                    type="primary"
                    htmlType='submit' className={styles.btn}>
                    {data?._id ? "更新" : "创建"}
                </Button>
            </Form.Item>
        </Form>
    </Content>;
}
