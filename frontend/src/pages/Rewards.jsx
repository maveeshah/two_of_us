import React from 'react'
import { Row, Col, Card, Button, Tag, Typography, Space, Progress, Avatar, Badge } from 'antd'
import { GiftOutlined, LockOutlined, UnlockOutlined, StarOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'

const { Title, Text, Paragraph } = Typography

const Rewards = () => {
    // Mock data - in real app this would come from API
    const rewards = [
        {
            id: 1,
            title: 'Movie Night',
            description: 'Choose any movie and enjoy a cozy evening together',
            pointsRequired: 100,
            status: 'unlocked',
            unlockedOn: '2024-01-10',
            category: 'Entertainment'
        },
        {
            id: 2,
            title: 'Massage Session',
            description: '30-minute relaxing massage from your partner',
            pointsRequired: 150,
            status: 'unlocked',
            unlockedOn: '2024-01-15',
            category: 'Wellness'
        },
        {
            id: 3,
            title: 'Weekend Getaway',
            description: 'Plan a romantic weekend trip together',
            pointsRequired: 500,
            status: 'locked',
            pointsNeeded: 200,
            category: 'Adventure'
        },
        {
            id: 4,
            title: 'Dinner Date',
            description: 'Fancy dinner at a restaurant of your choice',
            pointsRequired: 200,
            status: 'available',
            category: 'Dining'
        },
        {
            id: 5,
            title: 'Spa Day',
            description: 'Couple spa treatment and relaxation',
            pointsRequired: 300,
            status: 'locked',
            pointsNeeded: 150,
            category: 'Wellness'
        },
        {
            id: 6,
            title: 'Shopping Spree',
            description: 'Shopping trip with a budget of $200',
            pointsRequired: 400,
            status: 'locked',
            pointsNeeded: 300,
            category: 'Shopping'
        }
    ]

    const currentPoints = 350
    const totalUnlocked = rewards.filter(r => r.status === 'unlocked').length

    const getStatusColor = (status) => {
        switch (status) {
            case 'unlocked': return 'success'
            case 'available': return 'processing'
            case 'locked': return 'default'
            default: return 'default'
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'unlocked': return <UnlockOutlined />
            case 'available': return <StarOutlined />
            case 'locked': return <LockOutlined />
            default: return <LockOutlined />
        }
    }

    const handleUnlockReward = (rewardId) => {
        console.log('Unlocking reward:', rewardId)
        // In real app, this would call an API
    }

    return (
        <div style={{ marginLeft: '250px', padding: '24px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Title level={2} style={{ color: '#ff6b9d', marginBottom: '24px' }}>
                    <GiftOutlined /> Rewards
                </Title>

                {/* Points Overview */}
                <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
                    <Col xs={24} md={8}>
                        <Card className="hover-card" style={{ textAlign: 'center' }}>
                            <Title level={2} style={{ color: '#ff6b9d', margin: 0 }}>
                                {currentPoints}
                            </Title>
                            <Text>Current Points</Text>
                        </Card>
                    </Col>
                    <Col xs={24} md={8}>
                        <Card className="hover-card" style={{ textAlign: 'center' }}>
                            <Title level={2} style={{ color: '#52c41a', margin: 0 }}>
                                {totalUnlocked}
                            </Title>
                            <Text>Rewards Unlocked</Text>
                        </Card>
                    </Col>
                    <Col xs={24} md={8}>
                        <Card className="hover-card" style={{ textAlign: 'center' }}>
                            <Title level={2} style={{ color: '#1890ff', margin: 0 }}>
                                {rewards.filter(r => r.status === 'available').length}
                            </Title>
                            <Text>Available to Unlock</Text>
                        </Card>
                    </Col>
                </Row>

                {/* Rewards Grid */}
                <Row gutter={[24, 24]}>
                    {rewards.map(reward => (
                        <Col xs={24} md={12} lg={8} key={reward.id}>
                            <motion.div
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card
                                    className="hover-card"
                                    title={
                                        <Space>
                                            <GiftOutlined style={{ color: '#ff6b9d' }} />
                                            <span>{reward.title}</span>
                                        </Space>
                                    }
                                    extra={
                                        <Tag color={getStatusColor(reward.status)} icon={getStatusIcon(reward.status)}>
                                            {reward.status.charAt(0).toUpperCase() + reward.status.slice(1)}
                                        </Tag>
                                    }
                                    actions={
                                        reward.status === 'available' ? [
                                            <Button
                                                type="primary"
                                                size="small"
                                                onClick={() => handleUnlockReward(reward.id)}
                                                style={{ backgroundColor: '#ff6b9d', borderColor: '#ff6b9d' }}
                                            >
                                                Unlock ({reward.pointsRequired} pts)
                                            </Button>
                                        ] : reward.status === 'unlocked' ? [
                                            <Text type="success">Unlocked on {reward.unlockedOn}</Text>
                                        ] : [
                                            <Text type="secondary">
                                                Need {reward.pointsNeeded} more points
                                            </Text>
                                        ]
                                    }
                                >
                                    <Paragraph ellipsis={{ rows: 2 }}>
                                        {reward.description}
                                    </Paragraph>

                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Tag color="blue">{reward.category}</Tag>
                                            <Text strong style={{ color: '#ff6b9d' }}>
                                                {reward.pointsRequired} pts
                                            </Text>
                                        </div>

                                        {reward.status === 'locked' && (
                                            <div>
                                                <Text type="secondary">Progress to unlock:</Text>
                                                <Progress
                                                    percent={Math.round(((currentPoints - (reward.pointsRequired - reward.pointsNeeded)) / reward.pointsRequired) * 100)}
                                                    size="small"
                                                    strokeColor="#ff6b9d"
                                                    showInfo={false}
                                                />
                                            </div>
                                        )}
                                    </Space>
                                </Card>
                            </motion.div>
                        </Col>
                    ))}
                </Row>

                {/* Achievement Badges */}
                <Card title="Achievement Badges" className="hover-card" style={{ marginTop: '32px' }}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={6}>
                            <div style={{ textAlign: 'center', padding: '16px' }}>
                                <Badge count={totalUnlocked} showZero>
                                    <Avatar
                                        size={64}
                                        icon={<GiftOutlined />}
                                        style={{ backgroundColor: '#ff6b9d' }}
                                    />
                                </Badge>
                                <div style={{ marginTop: '8px' }}>
                                    <Text strong>Reward Collector</Text>
                                    <br />
                                    <Text type="secondary">Unlock rewards together</Text>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <div style={{ textAlign: 'center', padding: '16px' }}>
                                <Avatar
                                    size={64}
                                    icon={<StarOutlined />}
                                    style={{ backgroundColor: '#52c41a' }}
                                />
                                <div style={{ marginTop: '8px' }}>
                                    <Text strong>Point Master</Text>
                                    <br />
                                    <Text type="secondary">Earn 1000+ points</Text>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <div style={{ textAlign: 'center', padding: '16px' }}>
                                <Avatar
                                    size={64}
                                    icon={<StarOutlined />}
                                    style={{ backgroundColor: '#fa8c16' }}
                                />
                                <div style={{ marginTop: '8px' }}>
                                    <Text strong>Streak Champion</Text>
                                    <br />
                                    <Text type="secondary">7+ day streak</Text>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <div style={{ textAlign: 'center', padding: '16px' }}>
                                <Avatar
                                    size={64}
                                    icon={<StarOutlined />}
                                    style={{ backgroundColor: '#1890ff' }}
                                />
                                <div style={{ marginTop: '8px' }}>
                                    <Text strong>Goal Crusher</Text>
                                    <br />
                                    <Text type="secondary">Complete 10+ goals</Text>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </motion.div>
        </div>
    )
}

export default Rewards
