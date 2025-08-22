import React, { useState } from 'react'
import {
    Row,
    Col,
    Card,
    Button,
    Tag,
    Progress,
    Modal,
    Form,
    Input,
    DatePicker,
    Select,
    Typography,
    Space,
    Timeline,
    Avatar
} from 'antd'
import {
    FlagOutlined,
    PlusOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    TrophyOutlined
} from '@ant-design/icons'
import { motion } from 'framer-motion'

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input

const Goals = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [form] = Form.useForm()

    // Mock data - in real app this would come from API
    const goals = [
        {
            id: 1,
            title: 'Save for vacation',
            description: 'Save $5000 for a romantic getaway to Hawaii',
            category: 'Financial',
            priority: 'High',
            targetDate: '2024-06-01',
            status: 'in_progress',
            progress: 65,
            milestones: [
                { id: 1, title: 'Set up joint savings account', completed: true },
                { id: 2, title: 'Save first $1000', completed: true },
                { id: 3, title: 'Save $3000', completed: true },
                { id: 4, title: 'Book flights and hotel', completed: false },
                { id: 5, title: 'Reach $5000 goal', completed: false }
            ]
        },
        {
            id: 2,
            title: 'Improve communication',
            description: 'Practice active listening and express feelings openly',
            category: 'Communication',
            priority: 'Medium',
            targetDate: '2024-05-15',
            status: 'in_progress',
            progress: 40,
            milestones: [
                { id: 1, title: 'Read communication book together', completed: true },
                { id: 2, title: 'Practice daily check-ins', completed: true },
                { id: 3, title: 'Attend couples workshop', completed: false },
                { id: 4, title: 'Implement new techniques', completed: false }
            ]
        },
        {
            id: 3,
            title: 'Buy a house together',
            description: 'Purchase our first home as a couple',
            category: 'Life Goals',
            priority: 'High',
            targetDate: '2025-12-31',
            status: 'planning',
            progress: 20,
            milestones: [
                { id: 1, title: 'Research neighborhoods', completed: true },
                { id: 2, title: 'Get pre-approved for mortgage', completed: false },
                { id: 3, title: 'Find real estate agent', completed: false },
                { id: 4, title: 'View properties', completed: false },
                { id: 5, title: 'Make offer and close', completed: false }
            ]
        }
    ]

    const categories = ['Financial', 'Communication', 'Life Goals', 'Health', 'Travel', 'Career']
    const priorities = ['Low', 'Medium', 'High']

    const getStatusColor = (status) => {
        switch (status) {
            case 'in_progress': return 'processing'
            case 'achieved': return 'success'
            case 'planning': return 'default'
            default: return 'default'
        }
    }

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'red'
            case 'Medium': return 'orange'
            case 'Low': return 'green'
            default: return 'blue'
        }
    }

    const handleCreateGoal = (values) => {
        console.log('Creating goal:', values)
        setIsModalVisible(false)
        form.resetFields()
    }

    const handleAchieveGoal = (goalId) => {
        console.log('Achieving goal:', goalId)
        // In real app, this would call an API
    }

    return (
        <div style={{ marginLeft: '250px', padding: '24px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <Title level={2} style={{ color: '#ff6b9d', margin: 0 }}>
                        <FlagOutlined /> Relationship Goals
                    </Title>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => setIsModalVisible(true)}
                        style={{ backgroundColor: '#ff6b9d', borderColor: '#ff6b9d' }}
                    >
                        Set New Goal
                    </Button>
                </div>

                {/* Goal Stats */}
                <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                    <Col xs={24} sm={12} md={6}>
                        <Card className="hover-card" style={{ textAlign: 'center' }}>
                            <Title level={3} style={{ color: '#ff6b9d', margin: 0 }}>
                                {goals.filter(g => g.status === 'in_progress').length}
                            </Title>
                            <Text>Active Goals</Text>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card className="hover-card" style={{ textAlign: 'center' }}>
                            <Title level={3} style={{ color: '#52c41a', margin: 0 }}>
                                {goals.filter(g => g.status === 'achieved').length}
                            </Title>
                            <Text>Achieved</Text>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card className="hover-card" style={{ textAlign: 'center' }}>
                            <Title level={3} style={{ color: '#1890ff', margin: 0 }}>
                                {goals.reduce((sum, g) => sum + g.milestones.filter(m => m.completed).length, 0)}
                            </Title>
                            <Text>Milestones Completed</Text>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card className="hover-card" style={{ textAlign: 'center' }}>
                            <Title level={3} style={{ color: '#fa8c16', margin: 0 }}>
                                <TrophyOutlined /> 8
                            </Title>
                            <Text>Total Achieved</Text>
                        </Card>
                    </Col>
                </Row>

                {/* Goals Grid */}
                <Row gutter={[24, 24]}>
                    {goals.map(goal => (
                        <Col xs={24} lg={12} key={goal.id}>
                            <motion.div
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card
                                    className="hover-card"
                                    title={
                                        <Space>
                                            <FlagOutlined style={{ color: '#ff6b9d' }} />
                                            <span>{goal.title}</span>
                                        </Space>
                                    }
                                    extra={
                                        <Space>
                                            <Tag color={getPriorityColor(goal.priority)}>
                                                {goal.priority}
                                            </Tag>
                                            <Tag color={getStatusColor(goal.status)}>
                                                {goal.status.replace('_', ' ').charAt(0).toUpperCase() + goal.status.replace('_', ' ').slice(1)}
                                            </Tag>
                                        </Space>
                                    }
                                    actions={[
                                        goal.status === 'in_progress' && (
                                            <Button
                                                type="primary"
                                                size="small"
                                                icon={<CheckCircleOutlined />}
                                                onClick={() => handleAchieveGoal(goal.id)}
                                                style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
                                            >
                                                Mark Achieved
                                            </Button>
                                        )
                                    ].filter(Boolean)}
                                >
                                    <Paragraph ellipsis={{ rows: 2 }}>
                                        {goal.description}
                                    </Paragraph>

                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                                {goal.category}
                                            </Text>
                                            <Text strong style={{ color: '#ff6b9d' }}>
                                                {goal.progress}% Complete
                                            </Text>
                                        </div>

                                        <Progress
                                            percent={goal.progress}
                                            strokeColor="#ff6b9d"
                                            showInfo={false}
                                        />

                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                                            <Text type="secondary">
                                                <ClockCircleOutlined /> Target: {goal.targetDate}
                                            </Text>
                                        </div>

                                        <div style={{ marginTop: '16px' }}>
                                            <Text strong>Milestones:</Text>
                                            <Timeline
                                                size="small"
                                                style={{ marginTop: '8px' }}
                                                items={goal.milestones.map(milestone => ({
                                                    color: milestone.completed ? '#52c41a' : '#d9d9d9',
                                                    children: (
                                                        <Text
                                                            style={{
                                                                textDecoration: milestone.completed ? 'line-through' : 'none',
                                                                color: milestone.completed ? '#52c41a' : 'inherit'
                                                            }}
                                                        >
                                                            {milestone.title}
                                                        </Text>
                                                    )
                                                }))}
                                            />
                                        </div>
                                    </Space>
                                </Card>
                            </motion.div>
                        </Col>
                    ))}
                </Row>

                {/* Create Goal Modal */}
                <Modal
                    title="Set New Goal"
                    open={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={null}
                    width={600}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleCreateGoal}
                    >
                        <Form.Item
                            name="title"
                            label="Goal Title"
                            rules={[{ required: true, message: 'Please enter a title' }]}
                        >
                            <Input placeholder="e.g., Save for vacation" />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: 'Please enter a description' }]}
                        >
                            <TextArea
                                rows={3}
                                placeholder="Describe what you want to achieve together..."
                            />
                        </Form.Item>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="category"
                                    label="Category"
                                    rules={[{ required: true, message: 'Please select a category' }]}
                                >
                                    <Select placeholder="Select category">
                                        {categories.map(cat => (
                                            <Select.Option key={cat} value={cat}>{cat}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="priority"
                                    label="Priority"
                                    rules={[{ required: true, message: 'Please select priority' }]}
                                >
                                    <Select placeholder="Select priority">
                                        {priorities.map(pri => (
                                            <Select.Option key={pri} value={pri}>{pri}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            name="targetDate"
                            label="Target Date"
                            rules={[{ required: true, message: 'Please select target date' }]}
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                            <Space>
                                <Button onClick={() => setIsModalVisible(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ backgroundColor: '#ff6b9d', borderColor: '#ff6b9d' }}
                                >
                                    Set Goal
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>
            </motion.div>
        </div>
    )
}

export default Goals
