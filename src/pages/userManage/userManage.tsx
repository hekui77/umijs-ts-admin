import type { ColumnsType } from "antd/lib/table";
import { Table, Button, Space, Popconfirm } from "antd";
import { useRequest } from "umi"
import dayjs from 'dayjs';

interface dataType {
  id: number;
  nickname: string;
  phone: string;
  email: string;
  createTime: string;
  updataTime: string;
}
const columns: ColumnsType<dataType> = [
  {
    title: '昵称',
    dataIndex: 'nickname',
  },
  {
    title: '电话',
    dataIndex: 'phone',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    render: (_, { createTime }) => (
      <span>{ dayjs(createTime).format('YYYY-MM-DD HH:mm:ss') }</span>
    )
  },
  {
    title: '更新时间',
    dataIndex: 'updataTime',
    render: (_, { updataTime }) => (
      <span>{ dayjs(updataTime).format('YYYY-MM-DD HH:mm:ss') }</span>
    )
  },
  {
    title: '操作',
    dataIndex: '',
    render: () => (
      <Space>
        <Popconfirm
          title="确定启用该用户？"
          okText="确定"
          cancelText=""
          placement="leftTop"
        >
          <Button type="primary" size="small" ghost>启用</Button>
        </Popconfirm>
        <Popconfirm
          title="确定禁用该用户？"
          okText="确定"
          cancelText=""
          placement="leftTop"
        >
          <Button size="small" danger>禁用</Button>
        </Popconfirm>
      </Space>
    ),
  },
]

export default function UserManage() {

  const { data, loading } = useRequest(() => ({
    url: '/api/user',
  }))

  
  return <Table columns={columns} dataSource={data} loading={loading} rowKey={ (record) => record.id } />
}