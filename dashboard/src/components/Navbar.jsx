import React from 'react'
import { Layout, Avatar, Badge, Dropdown, Space, Button } from 'antd'
import { BellOutlined, UserOutlined, HeartOutlined, SettingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Header } = Layout

const Navbar = () => {
    const navigate = useNavigate()

    const userMenuItems = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'Profile',
            onClick: () => navigate('/profile')
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Settings',
            onClick: () => navigate('/settings')
        },
        {
            type: 'divider'
        },
        {
            key: 'logout',
            label: 'Logout',
            onClick: () => {
                // Handle logout
                console.log('Logout clicked')
            }
        }
    ]

    const notificationItems = [
        {
            key: '1',
            label: 'New challenge available!',
            onClick: () => navigate('/challenges')
        },
        {
            key: '2',
            label: 'Your partner completed a goal!',
            onClick: () => navigate('/goals')
        },
        {
            key: '3',
            label: 'You earned 50 points!',
            onClick: () => navigate('/rewards')
        }
    ]

    return (
        <Header className="navbar" style={{
            background: 'linear-gradient(135deg, #ff6b9d 0%, #e91e63 100%)',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}>
            <div className="navbar-left" style={{ display: 'flex', alignItems: 'center' }}>
                <HeartOutlined
                    className="heart-beat"
                    style={{
                        fontSize: '28px',
                        color: 'white',
                        marginRight: '16px',
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/')}
                />
                <h1 style={{
                    color: 'white',
                    margin: 0,
                    fontSize: '24px',
                    fontWeight: '600',
                    cursor: 'pointer'
                }} onClick={() => navigate('/')}>
                    Two of Us
                </h1>
            </div>

            <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Dropdown
                    menu={{ items: notificationItems }}
                    placement="bottomRight"
                    trigger={['click']}
                >
                    <Badge count={3} size="small">
                        <Button
                            type="text"
                            icon={<BellOutlined />}
                            style={{ color: 'white', fontSize: '18px' }}
                        />
                    </Badge>
                </Dropdown>

                <Dropdown
                    menu={{ items: userMenuItems }}
                    placement="bottomRight"
                    trigger={['click']}
                >
                    <Avatar
                        size={40}
                        icon={<UserOutlined />}
                        style={{
                            cursor: 'pointer',
                            border: '2px solid white',
                            backgroundColor: 'rgba(255,255,255,0.2)'
                        }}
                    />
                </Dropdown>
            </div>
        </Header>
    )
}

export default Navbar
