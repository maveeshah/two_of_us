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
    Badge,
    Avatar
} from 'antd'
import {
    TrophyOutlined,
    PlusOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    FireOutlined
} from '@ant-design/icons'
import { motion } from 'framer-motion'

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
const { RangePicker } = DatePicker

const Challenges = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [form] = Form.useForm()

    // Mock data - in real app this would come from API
    const challenges = [
        {
            id: 1,
            title: 'Cook dinner together',
            description: 'Prepare a meal together and enjoy it without distractions',
            category: 'Quality Time',
            difficulty: 'Easy',
            points: 15,
            status: 'active',
            startDate: '2024-01-15',
            endDate: '2024-01-22',
            progress: 60,
            partnerName: 'Sarah',
            partnerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
        },
        {
            id: 2,
            title: 'Plan weekend getaway',
            description: 'Research and plan a romantic weekend trip together',
            category: 'Adventure',
            difficulty: 'Medium',
            points: 25,
            status: 'active',
            startDate: '2024-01-10',
            endDate: '2024-01-31',
            progress: 30,
            partnerName: 'Sarah',
            partnerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
        },
        {
            id: 3,
            title: 'Share daily gratitude',
            description: 'Tell each other three things you appreciate every day',
            category: 'Communication',
            difficulty: 'Easy',
            points: 10,
            status: 'completed',
            startDate: '2024-01-01',
            endDate: '2024-01-07',
            progress: 100,
            partnerName: 'Sarah',
            partnerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
        },
        {
            id: 4,
            title: 'Learn a new skill together',
            description: 'Pick something neither of you know and learn it together',
            category: 'Growth',
            difficulty: 'Hard',
            points: 40,
            status: 'upcoming',
            startDate: '2024-02-01',
            endDate: '2024-02-28',
            progress: 0,
            partnerName: 'Sarah',
            partnerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
        }
    ]

    const categories = ['Quality Time', 'Adventure', 'Communication', 'Growth', 'Romance', 'Fitness']
    const difficulties = ['Easy', 'Medium', 'Hard']

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'processing'
            case 'completed': return 'success'
            case 'upcoming': return 'default'
            default: return 'default'
        }
    }

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return 'green'
            case 'Medium': return 'orange'
            case 'Hard': return 'red'
            default: return 'blue'
        }
    }

    const handleCreateChallenge = (values) => {
        console.log('Creating challenge:', values)
        setIsModalVisible(false)
        form.resetFields()
    }

    const handleCompleteChallenge = (challengeId) => {
        console.log('Completing challenge:', challengeId)
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
                        <TrophyOutlined /> Challenges
                    </Title>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => setIsModalVisible(true)}
                        style={{ backgroundColor: '#ff6b9d', borderColor: '#ff6b9d' }}
                    >
                        Create Challenge
                    </Button>
                </div>

                {/* Challenge Stats */}
                <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                    <Col xs={24} sm={12} md={6}>
                        <Card className="hover-card" style={{ textAlign: 'center' }}>
                            <Title level={3} style={{ color: '#ff6b9d', margin: 0 }}>
                                {challenges.filter(c => c.status === 'active').length}
                            </Title>
                            <Text>Active Challenges</Text>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card className="hover-card" style={{ textAlign: 'center' }}>
                            <Title level={3} style={{ color: '#52c41a', margin: 0 }}>
                                {challenges.filter(c => c.status === 'completed').length}
                            </Title>
                            <Text>Completed</Text>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card className="hover-card" style={{ textAlign: 'center' }}>
                            <Title level={3} style={{ color: '#1890ff', margin: 0 }}>
                                {challenges.reduce((sum, c) => sum + c.points, 0)}
                            </Title>
                            <Text>Total Points</Text>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card className="hover-card" style={{ textAlign: 'center' }}>
                            <Title level={3} style={{ color: '#fa8c16', margin: 0 }}>
                                <FireOutlined /> 7
                            </Title>
                            <Text>Day Streak</Text>
                        </Card>
                    </Col>
                </Row>

                {/* Challenges Grid */}
                <Row gutter={[24, 24]}>
                    {challenges.map(challenge => (
                        <Col xs={24} md={12} lg={8} key={challenge.id}>
                            <motion.div
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card
                                    className="hover-card"
                                    title={
                                        <Space>
                                            <Avatar size={32} src={challenge.partnerAvatar} />
                                            <span>{challenge.title}</span>
                                        </Space>
                                    }
                                    extra={
                                        <Tag color={getStatusColor(challenge.status)}>
                                            {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                                        </Tag>
                                    }
                                    actions={[
                                        challenge.status === 'active' && (
                                            <Button
                                                type="primary"
                                                size="small"
                                                icon={<CheckCircleOutlined />}
                                                onClick={() => handleCompleteChallenge(challenge.id)}
                                                style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
                                            >
                                                Complete
                                            </Button>
                                        )
                                    ].filter(Boolean)}
                                >
                                    <Paragraph ellipsis={{ rows: 2 }}>
                                        {challenge.description}
                                    </Paragraph>

                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Tag color={getDifficultyColor(challenge.difficulty)}>
                                                {challenge.difficulty}
                                            </Tag>
                                            <Text strong style={{ color: '#ff6b9d' }}>
                                                {challenge.points} pts
                                            </Text>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                                {challenge.category}
                                            </Text>
                                            <Badge
                                                count={challenge.progress}
                                                showZero
                                                style={{ backgroundColor: challenge.progress === 100 ? '#52c41a' : '#1890ff' }}
                                            />
                                        </div>

                                        {challenge.status === 'active' && (
                                            <Progress
                                                percent={challenge.progress}
                                                size="small"
                                                strokeColor="#ff6b9d"
                                                showInfo={false}
                                            />
                                        )}

                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                                            <Text type="secondary">
                                                <ClockCircleOutlined /> {challenge.startDate}
                                            </Text>
                                            <Text type="secondary">
                                                Due: {challenge.endDate}
                                            </Text>
                                        </div>
                                    </Space>
                                </Card>
                            </motion.div>
                        </Col>
                    ))}
                </Row>

                {/* Create Challenge Modal */}
                <Modal
                    title="Create New Challenge"
                    open={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={null}
                    width={600}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleCreateChallenge}
                    >
                        <Form.Item
                            name="title"
                            label="Challenge Title"
                            rules={[{ required: true, message: 'Please enter a title' }]}
                        >
                            <Input placeholder="e.g., Cook dinner together" />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: 'Please enter a description' }]}
                        >
                            <TextArea
                                rows={3}
                                placeholder="Describe what this challenge involves..."
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
                                    name="difficulty"
                                    label="Difficulty"
                                    rules={[{ required: true, message: 'Please select difficulty' }]}
                                >
                                    <Select placeholder="Select difficulty">
                                        {difficulties.map(diff => (
                                            <Select.Option key={diff} value={diff}>{diff}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="points"
                                    label="Points"
                                    rules={[{ required: true, message: 'Please enter points' }]}
                                >
                                    <Input type="number" placeholder="10" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="dates"
                                    label="Duration"
                                    rules={[{ required: true, message: 'Please select duration' }]}
                                >
                                    <RangePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>

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
                                    Create Challenge
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>
            </motion.div>
        </div>
    )
}

export default Challenges
