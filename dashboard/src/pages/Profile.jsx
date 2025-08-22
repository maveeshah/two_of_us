import React, { useState } from 'react'
import {
    Row,
    Col,
    Card,
    Button,
    Avatar,
    Typography,
    Space,
    Statistic,
    Progress,
    Tag,
    Timeline,
    Divider,
    Upload,
    message
} from 'antd'
import {
    UserOutlined,
    EditOutlined,
    HeartOutlined,
    TrophyOutlined,
    CalendarOutlined,
    FireOutlined,
    StarOutlined,
    CameraOutlined
} from '@ant-design/icons'
import { motion } from 'framer-motion'

const { Title, Text, Paragraph } = Typography

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false)

    // Mock data - in real app this would come from API
    const coupleProfile = {
        partner1: {
            name: 'John',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
            email: 'john@example.com',
            joinedDate: '2023-01-15'
        },
        partner2: {
            name: 'Sarah',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
            email: 'sarah@example.com',
            joinedDate: '2023-01-15'
        },
        relationship: {
            anniversaryDate: '2023-01-15',
            duration: 365,
            status: 'In a relationship',
            relationshipScore: 750,
            level: 'Lovebirds',
            streak: 7
        },
        stats: {
            totalChallenges: 45,
            completedChallenges: 38,
            totalGoals: 12,
            achievedGoals: 8,
            totalPoints: 1250,
            achievements: 15
        }
    }

    const achievements = [
        { id: 1, title: 'First Challenge', description: 'Completed your first challenge together', date: '2023-01-20', icon: '🏆' },
        { id: 2, title: 'Week Warrior', description: 'Completed 7 challenges in a week', date: '2023-02-15', icon: '🔥' },
        { id: 3, title: 'Goal Getter', description: 'Achieved your first relationship goal', date: '2023-03-10', icon: '🎯' },
        { id: 4, title: 'Point Master', description: 'Earned 1000+ points', date: '2023-04-05', icon: '⭐' },
        { id: 5, title: 'Streak Champion', description: 'Maintained a 7+ day streak', date: '2023-05-01', icon: '🔥' }
    ]

    const handleEditProfile = () => {
        setIsEditing(!isEditing)
    }

    const handleAvatarUpload = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} uploaded successfully`)
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} upload failed`)
        }
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
                        <UserOutlined /> Couple Profile
                    </Title>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={handleEditProfile}
                        style={{ backgroundColor: '#ff6b9d', borderColor: '#ff6b9d' }}
                    >
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </Button>
                </div>

                {/* Profile Overview */}
                <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
                    <Col xs={24} lg={16}>
                        <Card className="hover-card">
                            <Row gutter={[24, 24]}>
                                {/* Partner 1 */}
                                <Col xs={24} md={12}>
                                    <div style={{ textAlign: 'center' }}>
                                        <Upload
                                            name="avatar"
                                            showUploadList={false}
                                            onChange={handleAvatarUpload}
                                            disabled={!isEditing}
                                        >
                                            <Avatar
                                                size={120}
                                                src={coupleProfile.partner1.avatar}
                                                icon={<UserOutlined />}
                                                style={{ cursor: isEditing ? 'pointer' : 'default' }}
                                            />
                                        </Upload>
                                        <Title level={3} style={{ marginTop: '16px' }}>
                                            {coupleProfile.partner1.name}
                                        </Title>
                                        <Text type="secondary">{coupleProfile.partner1.email}</Text>
                                        <br />
                                        <Text type="secondary">Joined: {coupleProfile.partner1.joinedDate}</Text>
                                    </div>
                                </Col>

                                {/* Relationship Heart */}
                                <Col xs={24} md={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <HeartOutlined
                                            className="heart-beat"
                                            style={{
                                                fontSize: '80px',
                                                color: '#ff6b9d',
                                                marginBottom: '16px'
                                            }}
                                        />
                                        <Title level={4} style={{ color: '#ff6b9d', margin: 0 }}>
                                            {coupleProfile.relationship.level}
                                        </Title>
                                        <Text type="secondary">Level {Math.floor(coupleProfile.relationship.relationshipScore / 100)}</Text>
                                    </div>
                                </Col>

                                {/* Partner 2 */}
                                <Col xs={24} md={12}>
                                    <div style={{ textAlign: 'center' }}>
                                        <Upload
                                            name="avatar"
                                            showUploadList={false}
                                            onChange={handleAvatarUpload}
                                            disabled={!isEditing}
                                        >
                                            <Avatar
                                                size={120}
                                                src={coupleProfile.partner2.avatar}
                                                icon={<UserOutlined />}
                                                style={{ cursor: isEditing ? 'pointer' : 'default' }}
                                            />
                                        </Upload>
                                        <Title level={3} style={{ marginTop: '16px' }}>
                                            {coupleProfile.partner2.name}
                                        </Title>
                                        <Text type="secondary">{coupleProfile.partner2.email}</Text>
                                        <br />
                                        <Text type="secondary">Joined: {coupleProfile.partner2.joinedDate}</Text>
                                    </div>
                                </Col>
                            </Row>

                            <Divider />

                            {/* Relationship Info */}
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={8}>
                                    <div style={{ textAlign: 'center' }}>
                                        <CalendarOutlined style={{ fontSize: '24px', color: '#ff6b9d' }} />
                                        <br />
                                        <Text strong>Anniversary</Text>
                                        <br />
                                        <Text>{coupleProfile.relationship.anniversaryDate}</Text>
                                    </div>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <div style={{ textAlign: 'center' }}>
                                        <StarOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                                        <br />
                                        <Text strong>Days Together</Text>
                                        <br />
                                        <Text>{coupleProfile.relationship.duration} days</Text>
                                    </div>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <div style={{ textAlign: 'center' }}>
                                        <FireOutlined style={{ fontSize: '24px', color: '#fa8c16' }} />
                                        <br />
                                        <Text strong>Current Streak</Text>
                                        <br />
                                        <Text>{coupleProfile.relationship.streak} days</Text>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    {/* Stats Sidebar */}
                    <Col xs={24} lg={8}>
                        <Card title="Relationship Stats" className="hover-card" style={{ marginBottom: '16px' }}>
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <div>
                                    <Text>Relationship Score</Text>
                                    <Progress
                                        percent={Math.round((coupleProfile.relationship.relationshipScore / 1000) * 100)}
                                        strokeColor="#ff6b9d"
                                        format={() => `${coupleProfile.relationship.relationshipScore}/1000`}
                                    />
                                </div>
                                <div>
                                    <Text>Challenges Progress</Text>
                                    <Progress
                                        percent={Math.round((coupleProfile.stats.completedChallenges / coupleProfile.stats.totalChallenges) * 100)}
                                        strokeColor="#52c41a"
                                        format={() => `${coupleProfile.stats.completedChallenges}/${coupleProfile.stats.totalChallenges}`}
                                    />
                                </div>
                                <div>
                                    <Text>Goals Progress</Text>
                                    <Progress
                                        percent={Math.round((coupleProfile.stats.achievedGoals / coupleProfile.stats.totalGoals) * 100)}
                                        strokeColor="#1890ff"
                                        format={() => `${coupleProfile.stats.achievedGoals}/${coupleProfile.stats.totalGoals}`}
                                    />
                                </div>
                            </Space>
                        </Card>

                        <Card title="Quick Stats" className="hover-card">
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <Statistic
                                        title="Total Points"
                                        value={coupleProfile.stats.totalPoints}
                                        prefix={<TrophyOutlined />}
                                        valueStyle={{ color: '#ff6b9d' }}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Statistic
                                        title="Achievements"
                                        value={coupleProfile.stats.achievements}
                                        prefix={<StarOutlined />}
                                        valueStyle={{ color: '#52c41a' }}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                {/* Achievements */}
                <Card title="Achievements & Milestones" className="hover-card" style={{ marginBottom: '32px' }}>
                    <Timeline
                        items={achievements.map(achievement => ({
                            color: '#ff6b9d',
                            children: (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <Text strong style={{ fontSize: '16px' }}>
                                            {achievement.icon} {achievement.title}
                                        </Text>
                                        <br />
                                        <Text type="secondary">{achievement.description}</Text>
                                    </div>
                                    <Tag color="success">{achievement.date}</Tag>
                                </div>
                            )
                        }))}
                    />
                </Card>

                {/* Relationship Timeline */}
                <Card title="Relationship Timeline" className="hover-card">
                    <Timeline
                        items={[
                            {
                                color: '#ff6b9d',
                                children: (
                                    <div>
                                        <Text strong>Started Dating</Text>
                                        <br />
                                        <Text type="secondary">January 15, 2023</Text>
                                    </div>
                                )
                            },
                            {
                                color: '#52c41a',
                                children: (
                                    <div>
                                        <Text strong>First Challenge Completed</Text>
                                        <br />
                                        <Text type="secondary">January 20, 2023</Text>
                                    </div>
                                )
                            },
                            {
                                color: '#1890ff',
                                children: (
                                    <div>
                                        <Text strong>First Goal Achieved</Text>
                                        <br />
                                        <Text type="secondary">March 10, 2023</Text>
                                    </div>
                                )
                            },
                            {
                                color: '#fa8c16',
                                children: (
                                    <div>
                                        <Text strong>Reached 1000 Points</Text>
                                        <br />
                                        <Text type="secondary">April 5, 2023</Text>
                                    </div>
                                )
                            }
                        ]}
                    />
                </Card>
            </motion.div>
        </div>
    )
}

export default Profile
