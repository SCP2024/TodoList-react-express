import { Button, Col, Form, Input, message, Modal, Row, Select, Space, Table, TablePaginationConfig, Tag, Tooltip } from "antd";  
// 从 Ant Design 导入所需的组件

import { useRouter } from "next/router";  // 导入 Next.js 的路由钩子，用于页面跳转
import { useEffect, useState } from "react";  // 导入 React 的 hooks，用于管理组件状态和副作用
import styles from "./index.module.css";  // 导入局部样式
import dayjs from "dayjs";  // 导入 dayjs 库，用于处理日期
import { getTodoList, TodoListDelete, TodoListUpdate } from "@/api/todolist";  
// 导入自定义 API 请求方法，用于获取、删除和更新待办事项

import Content from "@/components/Content";  // 导入自定义 Content 组件，用于页面布局
import { TodoListQueryType } from "@/type";  // 导入自定义类型，用于定义待办事项查询的类型

// 定义状态常量，用于表示待办事项的状态
const STATUS = {
  DONE: "on",  // 已完成状态
  NOT_DONE: "off",  // 未完成状态
};

// 定义状态选项，用于状态下拉菜单
export const STATUS_OPTIONS = [
  { label: "已完成", value: STATUS.DONE },  // 已完成选项
  { label: "未完成", value: STATUS.NOT_DONE },  // 未完成选项
];

// 定义表格列配置
const COLUMNS = [
  {
    title: '事项',
    dataIndex: 'todo',
    key: 'todo',
    width: 400  // 定义事项列的宽度
  },
  {
    title: '说明',
    dataIndex: 'description',
    key: 'description',
    width: 400,
    ellipsis: true,  // 设置文本超出时显示省略号
    render: (text: string) => {
      return <Tooltip title={text} placement="topLeft">
         {text}  {/* 将说明文本显示在 Tooltip 中，鼠标悬停时显示完整文本 */}
      </Tooltip>
    }
  },
  {
    title: '截止日期',
    dataIndex: 'deadline',
    key: 'deadline',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD'),  // 格式化日期
    width: 240,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text: string, record: any) => {
      const deadline = dayjs(record.deadline);  // 获取截止日期
      const now = dayjs();  // 获取当前日期
      // 根据状态和时间显示不同的标签颜色
      if (now.isAfter(deadline) && text === STATUS.NOT_DONE) {
        return <Tag color="red">已逾期</Tag>;  // 如果未完成且已过期，显示红色标签
      } else {
        return text === STATUS.NOT_DONE ? <Tag color="orange">未完成</Tag> : <Tag color="green">已完成</Tag>;
      }
    },
    width: 120,
  }
];

export default function TodoList() {
  // 定义一个异步函数用于获取待办事项数据
  async function fetchData(search?: TodoListQueryType) {
    const res = await getTodoList({
      current: pagination.current,  // 获取当前页码
      pageSize: pagination.pageSize,  // 获取每页显示条数
      ...search,  // 添加搜索条件
    });
    const { data } = res;  // 解构数据
    setData(data);  // 设置待办事项数据
    setPagination({ ...pagination, total: res.total });  // 更新分页信息
  }

  useEffect(() => {
    fetchData();  // 在组件首次渲染时获取数据
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  // 空依赖数组表示该副作用只在组件挂载时执行一次

  const [form] = Form.useForm();  // 使用 Ant Design 表单钩子创建表单实例
  const [data, setData] = useState([]);  // 定义待办事项数据的状态
  const [filteredData, setFilteredData] = useState([]);  // 定义过滤后的待办事项数据状态
  const router = useRouter();  // 获取路由对象
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,  // 当前页码
    pageSize: 20,  // 每页显示的条数
    showSizeChanger: true,  // 显示每页显示条数的选择器
    showQuickJumper: true,  // 显示快速跳转输入框
    total: 0  // 总条数，初始为0
  });

  // 处理状态变化的函数，用于更新待办事项的状态
  const handleStatusChange = async (row) => {
    const status = row.status === STATUS.DONE ? STATUS.NOT_DONE : STATUS.DONE;  // 切换状态

    await TodoListUpdate(row._id, {
      ...row,
      status,  // 更新状态
    });
    fetchData(form.getFieldsValue());  // 更新数据列表
  };

  // 过滤数据的副作用，依赖 data 状态
  useEffect(() => {
    let user = null;
    if (typeof window !== "undefined") {  // 确保在客户端环境中执行
      const userStorage = localStorage.getItem("user");  // 从本地存储中获取用户信息
      if (userStorage) {
        user = JSON.parse(userStorage);  // 解析用户信息
      }
    }

    const namesToDisplay = user?.info ? [user?.info.name] : [];  // 获取当前用户的姓名
    const filtered = data.filter(item => namesToDisplay.includes(item.user));  // 过滤待办事项列表，只显示属于当前用户的事项
    setFilteredData(filtered);  // 更新过滤后的数据
    setPagination(prev => ({ ...prev, total: filtered.length }));  // 更新分页信息中的 total 为过滤后的数据长度

  }, [data]);  // 依赖 data 状态，当 data 变化时重新执行

  // 处理搜索表单提交的函数
  const handleSearchFinish = async (values:TodoListQueryType) => {
    const res = await getTodoList({
      ...values,
      current: 1,  // 搜索后重置页码为 1
      pageSize: pagination.pageSize,
    });
    console.log(res.data);  // 输出搜索结果到控制台
    setData(res.data);  // 更新待办事项数据
    setPagination({ ...pagination, current: 1, total: res.total });  // 更新分页信息
  };

  // 处理删除待办事项的函数
  const handleTodoListDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除?',  // 提示信息
      okText: '确认',
      cancelText: '取消',
      async onOk() {
        await TodoListDelete(id)  // 删除待办事项
        message.success('删除成功');  // 提示删除成功
        fetchData(form.getFieldsValue());  // 重新获取数据
      }
    })
  }

  // 处理编辑待办事项的函数
  const handleTodoEdit = (id: string) => {
    router.push(`/todolist/edit/${id}`);  // 跳转到编辑页面
  }

  // 处理表格分页、排序、筛选变化的函数
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);  // 更新分页信息
    const query = form.getFieldsValue();  // 获取表单中填写的搜索条件
    getTodoList({
      current: pagination.current,  // 获取当前页码
      pageSize: pagination.pageSize,  // 获取每页显示的条数
      ...query,  // 添加搜索条件
    });
  }

  // 在表格列定义的基础上，添加操作列
  const columns = [
    ...COLUMNS,
    {
      title: '操作',
      key: 'action',
      render: (_: any, row: any) => (
        <Space>
          <Button
            type="link"
            onClick={() => { handleTodoEdit(row._id) }}>  // 编辑按钮
            编辑
          </Button>
          <Button
            type="link"
            danger={row.status === STATUS.DONE ? true : false}  // 如果状态为已完成，按钮显示为危险按钮
            onClick={() => {
              handleStatusChange(row);  // 切换状态
            }}
          >
            {row.status === STATUS.NOT_DONE ? "完成" : "取消完成"}  // 根据当前状态显示按钮文本
          </Button>
          <Button type="link" danger
            onClick={() => {
              handleTodoListDelete(row._id)  // 删除按钮
            }}
          >删除</Button>
        </Space>
      ),
    }
  ];

  // 渲染页面内容
  return (
    <Content title="TodoList" 
      operation={
        <Button
          type="primary"
          onClick={() => {
            router.push("/todolist/add");  // 点击添加按钮时跳转到添加页面
          }}
        >
          添加
        </Button>
      }>
      <Form
        name="search"
        onFinish={handleSearchFinish}  // 提交搜索表单时调用的函数
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="todo" label="事项">
              <Input placeholder="请输入" allowClear />  // 输入框，用于输入搜索条件
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="status" label="状态">
              <Select placeholder="请选择" options={STATUS_OPTIONS} allowClear></Select>  // 状态下拉菜单，用于筛选待办事项状态
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Button type="primary" htmlType="submit">  // 搜索按钮
                搜索
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles.tableWrap}>
        <Table
          dataSource={filteredData}  // 表格数据源
          columns={columns}  // 表格列配置
          scroll={{ x: 1000 }}  // 表格横向滚动
          onChange={handleTableChange}  // 表格分页、排序、筛选变化时调用的函数
          pagination={{ ...pagination, showTotal: () => `共${pagination.total}条` }}  // 分页配置
        />
      </div>
    </Content>
  );
}
