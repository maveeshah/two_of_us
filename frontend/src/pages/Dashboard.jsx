import React from 'react'
import { Row, Col, Card, Statistic, Progress, Button, Avatar, Typography, Space, Spin, Alert, Tag } from 'antd'
import {
    HeartOutlined,
    TrophyOutlined,
    FlagOutlined,
    GiftOutlined,
    FireOutlined,
    StarOutlined,
    PlusOutlined
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useCouple } from '../context/CoupleContext'

const { Title, Text, Paragraph } = Typography

const Dashboard = () => {
    const {
        coupleProfile,
        challenges,
        goals,
        rewards,
        achievements,
        loading,
        error,
        partnerNames,
        createChallenge,
        createGoal
    } = useCouple();

    // Calculate statistics from real data
    const stats = {
        relationshipScore: coupleProfile?.relationship_score || 0,
        relationshipDuration: coupleProfile?.relationship_duration || 0,
        totalChallenges: challenges.length,
        completedChallenges: challenges.filter(c => c.status === 'completed').length,
        totalGoals: goals.length,
        achievedGoals: goals.filter(g => g.status === 'achieved').length,
        currentStreak: coupleProfile?.current_streak || 0,
        partnerName: partnerNames.partner2,
        partnerAvatar: coupleProfile?.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${partnerNames.partner2}`
    };

    // Get recent challenges (last 3)
    const recentChallenges = challenges
        .slice(0, 3)
        .map(c => ({
            id: c.name,
            title: c.title,
            status: c.status,
            points: c.points,
            description: c.description
        }));

    // Get upcoming goals (not achieved)
    const upcomingGoals = goals
        .filter(g => g.status !== 'achieved')
        .slice(0, 2)
        .map(g => ({
            id: g.name,
            title: g.title,
            progress: g.progress || 0,
            target: g.target_date,
            description: g.description
        }));

    if (loading) {
        return (
            <div style={{ marginLeft: '250px', padding: '24px', textAlign: 'center' }}>
                <Spin size="large" />
                <Text>Loading your relationship data...</Text>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ marginLeft: '250px', padding: '24px' }}>
                <Alert
                    message="Error Loading Data"
                    description={error}
                    type="error"
                    showIcon
                    action={
                        <Button size="small" onClick={() => window.location.reload()}>
                            Retry
                        </Button>
                    }
                />
            </div>
        );
    }

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
                                value={stats.relationshipScore}
                                prefix={<HeartOutlined style={{ color: '#ff6b9d' }} />}
                                valueStyle={{ color: '#ff6b9d', fontSize: '24px' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="hover-card" style={{ textAlign: 'center' }}>
                            <Statistic
                                title="Days Together"
                                value={stats.relationshipDuration}
                                prefix={<StarOutlined style={{ color: '#52c41a' }} />}
                                valueStyle={{ color: '#52c41a', fontSize: '24px' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="hover-card" style={{ textAlign: 'center' }}>
                            <Statistic
                                title="Current Streak"
                                value={stats.currentStreak}
                                prefix={<FireOutlined style={{ color: '#fa8c16' }} />}
                                valueStyle={{ color: '#fa8c16', fontSize: '24px' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="hover-card" style={{ textAlign: 'center' }}>
                            <Statistic
                                title="Completed Challenges"
                                value={stats.completedChallenges}
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
                            className="hover-card"
                            style={{ marginBottom: '24px' }}
                            title={
                                <Space>
                                    <Avatar size={48} src={stats.partnerAvatar} />
                                    <div>
                                        <Title level={4} style={{ margin: 0 }}>
                                            {stats.partnerName}
                                        </Title>
                                        <Text type="secondary">
                                            {coupleProfile?.relationship_status || 'Dating'}
                                        </Text>
                                    </div>
                                </Space>
                            }
                        >
                            <Paragraph>
                                {coupleProfile?.description || 'Your relationship journey together...'}
                            </Paragraph>
                        </Card>

                        {/* Recent Challenges */}
                        <Card
                            className="hover-card"
                            title={
                                <Space>
                                    <FlagOutlined />
                                    Recent Challenges
                                </Space>
                            }
                            extra={
                                <Button type="primary" icon={<PlusOutlined />} size="small">
                                    Add Challenge
                                </Button>
                            }
                            style={{ marginBottom: '24px' }}
                        >
                            {recentChallenges.length > 0 ? (
                                recentChallenges.map(challenge => (
                                    <div key={challenge.id} style={{ marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <Text strong>{challenge.title}</Text>
                                                <br />
                                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                                    {challenge.description}
                                                </Text>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <Tag color={
                                                    challenge.status === 'completed' ? 'success' :
                                                    challenge.status === 'active' ? 'processing' : 'default'
                                                }>
                                                    {challenge.status}
                                                </Tag>
                                                <br />
                                                <Text type="secondary">{challenge.points} pts</Text>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <Text type="secondary">No challenges yet. Create your first one!</Text>
                            )}
                        </Card>
                    </Col>

                    {/* Right Column */}
                    <Col xs={24} lg={8}>
                        {/* Upcoming Goals */}
                        <Card
                            className="hover-card"
                            title={
                                <Space>
                                    <GiftOutlined />
                                    Upcoming Goals
                                </Space>
                            }
                            extra={
                                <Button type="primary" icon={<PlusOutlined />} size="small">
                                    Add Goal
                                </Button>
                            }
                            style={{ marginBottom: '24px' }}
                        >
                            {upcomingGoals.length > 0 ? (
                                upcomingGoals.map(goal => (
                                    <div key={goal.id} style={{ marginBottom: '16px' }}>
                                        <div style={{ marginBottom: '8px' }}>
                                            <Text strong>{goal.title}</Text>
                                        </div>
                                        <Progress
                                            percent={goal.progress}
                                            size="small"
                                            status={goal.progress === 100 ? 'success' : 'active'}
                                        />
                                        <Text type="secondary" style={{ fontSize: '12px' }}>
                                            Target: {goal.target}
                                        </Text>
                                    </div>
                                ))
                            ) : (
                                <Text type="secondary">No goals yet. Set your first goal!</Text>
                            )}
                        </Card>

                        {/* Quick Actions */}
                        <Card
                            className="hover-card"
                            title="Quick Actions"
                        >
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Button type="primary" block icon={<PlusOutlined />}>
                                    New Challenge
                                </Button>
                                <Button block icon={<PlusOutlined />}>
                                    New Goal
                                </Button>
                                <Button block icon={<PlusOutlined />}>
                                    Send Message
                                </Button>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </motion.div>
        </div>
    );
};

export default Dashboard;
