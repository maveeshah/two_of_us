import React from 'react'
import { Row, Col, Card, Statistic, Progress, Button, Avatar, Typography, Space } from 'antd'
import {
    HeartOutlined,
    TrophyOutlined,
    FlagOutlined,
    GiftOutlined,
    FireOutlined,
    StarOutlined
} from '@ant-design/icons'
import { motion } from 'framer-motion'

const { Title, Text, Paragraph } = Typography

const Dashboard = () => {
    // Mock data - in real app this would come from API
    const coupleData = {
        relationshipScore: 750,
        relationshipDuration: 365,
        totalChallenges: 45,
        completedChallenges: 38,
        totalGoals: 12,
        achievedGoals: 8,
        currentStreak: 7,
        partnerName: 'Sarah',
        partnerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    }

    const recentChallenges = [
        { id: 1, title: 'Cook dinner together', status: 'completed', points: 15 },
        { id: 2, title: 'Plan weekend getaway', status: 'active', points: 25 },
        { id: 3, title: 'Share daily gratitude', status: 'active', points: 10 }
    ]

    const upcomingGoals = [
        { id: 1, title: 'Save for vacation', progress: 65, target: '2024-06-01' },
        { id: 2, title: 'Improve communication', progress: 40, target: '2024-05-15' }
    ]

    return (
        <div style={{ marginLeft: '250px', padding: '24px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Title level={2} style={{ color: '#ff6b9d', marginBottom: '24px' }}>
                    Welcome back! 💕
                </Title>

                {/* Relationship Stats */}
                <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="hover-card" style={{ textAlign: 'center' }}>
                            <Statistic
                                title="Relationship Score"
                                value={coupleData.relationshipScore}
                                prefix={<HeartOutlined style={{ color: '#ff6b9d' }} />}
                                valueStyle={{ color: '#ff6b9d', fontSize: '24px' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="hover-card" style={{ textAlign: 'center' }}>
                            <Statistic
                                title="Days Together"
                                value={coupleData.relationshipDuration}
                                prefix={<StarOutlined style={{ color: '#52c41a' }} />}
                                valueStyle={{ color: '#52c41a', fontSize: '24px' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="hover-card" style={{ textAlign: 'center' }}>
                            <Statistic
                                title="Current Streak"
                                value={coupleData.currentStreak}
                                prefix={<FireOutlined style={{ color: '#fa8c16' }} />}
                                valueStyle={{ color: '#fa8c16', fontSize: '24px' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="hover-card" style={{ textAlign: 'center' }}>
                            <Statistic
                                title="Completed Challenges"
                                value={coupleData.completedChallenges}
                                prefix={<TrophyOutlined style={{ color: '#1890ff' }} />}
                                valueStyle={{ color: '#1890ff', fontSize: '24px' }}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Main Content */}
                <Row gutter={[24, 24]}>
                    {/* Left Column */}
                    <Col xs={24} lg={16}>
                        {/* Partner Section */}
                        <Card
                            title={
                                <Space>
                                    <Avatar size={40} src={coupleData.partnerAvatar} />
                                    <span>Your Partner: {coupleData.partnerName}</span>
                                </Space>
                            }
                            className="hover-card"
                            style={{ marginBottom: '24px' }}
                        >
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <Text strong>Challenges Progress</Text>
                                    <Progress
                                        percent={Math.round((coupleData.completedChallenges / coupleData.totalChallenges) * 100)}
                                        status="active"
                                        strokeColor="#ff6b9d"
                                    />
                                </Col>
                                <Col span={12}>
                                    <Text strong>Goals Progress</Text>
                                    <Progress
                                        percent={Math.round((coupleData.achievedGoals / coupleData.totalGoals) * 100)}
                                        status="active"
                                        strokeColor="#52c41a"
                                    />
                                </Col>
                            </Row>
                        </Card>

                        {/* Recent Challenges */}
                        <Card
                            title="Recent Challenges"
                            extra={<Button type="link" style={{ color: '#ff6b9d' }}>View All</Button>}
                            className="hover-card"
                        >
                            {recentChallenges.map(challenge => (
                                <div key={challenge.id} style={{
                                    padding: '12px 0',
                                    borderBottom: '1px solid #f0f0f0',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <Text strong>{challenge.title}</Text>
                                        <br />
                                        <Text type="secondary">{challenge.points} points</Text>
                                    </div>
                                    <Button
                                        type={challenge.status === 'completed' ? 'default' : 'primary'}
                                        size="small"
                                        style={{
                                            backgroundColor: challenge.status === 'completed' ? '#52c41a' : '#ff6b9d',
                                            borderColor: challenge.status === 'completed' ? '#52c41a' : '#ff6b9d'
                                        }}
                                    >
                                        {challenge.status === 'completed' ? 'Completed' : 'Active'}
                                    </Button>
                                </div>
                            ))}
                        </Card>
                    </Col>

                    {/* Right Column */}
                    <Col xs={24} lg={8}>
                        {/* Quick Actions */}
                        <Card title="Quick Actions" className="hover-card" style={{ marginBottom: '24px' }}>
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Button
                                    type="primary"
                                    block
                                    icon={<TrophyOutlined />}
                                    style={{ backgroundColor: '#ff6b9d', borderColor: '#ff6b9d' }}
                                >
                                    Start New Challenge
                                </Button>
                                <Button
                                    block
                                    icon={<FlagOutlined />}
                                    style={{ borderColor: '#52c41a', color: '#52c41a' }}
                                >
                                    Set New Goal
                                </Button>
                                <Button
                                    block
                                    icon={<GiftOutlined />}
                                    style={{ borderColor: '#fa8c16', color: '#fa8c16' }}
                                >
                                    View Rewards
                                </Button>
                            </Space>
                        </Card>

                        {/* Upcoming Goals */}
                        <Card title="Upcoming Goals" className="hover-card">
                            {upcomingGoals.map(goal => (
                                <div key={goal.id} style={{ marginBottom: '16px' }}>
                                    <Text strong>{goal.title}</Text>
                                    <Progress
                                        percent={goal.progress}
                                        size="small"
                                        strokeColor="#52c41a"
                                        style={{ marginTop: '8px' }}
                                    />
                                    <Text type="secondary" style={{ fontSize: '12px' }}>
                                        Target: {goal.target}
                                    </Text>
                                </div>
                            ))}
                        </Card>
                    </Col>
                </Row>
            </motion.div>
        </div>
    )
}

export default Dashboard
