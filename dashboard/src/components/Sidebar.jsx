import React from 'react'
import { Layout, Menu } from 'antd'
import {
    DashboardOutlined,
    TrophyOutlined,
    FlagOutlined,
    GiftOutlined,
    MessageOutlined,
    UserOutlined
} from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'

const { Sider } = Layout

const Sidebar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const menuItems = [
        {
            key: '/',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
            onClick: () => navigate('/')
        },
        {
            key: '/challenges',
            icon: <TrophyOutlined />,
            label: 'Challenges',
            onClick: () => navigate('/challenges')
        },
        {
            key: '/goals',
            icon: <FlagOutlined />,
            label: 'Goals',
            onClick: () => navigate('/goals')
        },
        {
            key: '/rewards',
            icon: <GiftOutlined />,
            label: 'Rewards',
            onClick: () => navigate('/rewards')
        },
        {
            key: '/chat',
            icon: <MessageOutlined />,
            label: 'Chat',
            onClick: () => navigate('/chat')
        },
        {
            key: '/profile',
            icon: <UserOutlined />,
            label: 'Profile',
            onClick: () => navigate('/profile')
        }
    ]

    return (
        <Sider
            width={250}
            style={{
                background: 'white',
                boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 64,
                bottom: 0,
                zIndex: 1000
            }}
        >
            <div style={{
                padding: '24px 16px',
                textAlign: 'center',
                borderBottom: '1px solid #f0f0f0'
            }}>
                <h3 style={{
                    margin: 0,
                    color: '#ff6b9d',
                    fontWeight: '600'
                }}>
                    Menu
                </h3>
            </div>

            <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                style={{
                    borderRight: 0,
                    padding: '16px 0'
                }}
                items={menuItems}
            />
        </Sider>
    )
}

export default Sidebar
