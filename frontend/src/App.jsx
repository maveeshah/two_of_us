import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { CoupleProvider } from './context/CoupleContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Challenges from './pages/Challenges'
import Goals from './pages/Goals'
import Rewards from './pages/Rewards'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import './App.css'

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ff6b9d',
                    colorSuccess: '#52c41a',
                    colorWarning: '#faad14',
                    colorError: '#ff4d4f',
                    colorInfo: '#1890ff',
                    borderRadius: 8,
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                },
            }}
        >
            <CoupleProvider>
                <div className="app-layout">
                    <Navbar />
                    <div className="app-container">
                        <Sidebar />
                        <main className="main-content">
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/challenges" element={<Challenges />} />
                                <Route path="/goals" element={<Goals />} />
                                <Route path="/rewards" element={<Rewards />} />
                                <Route path="/chat" element={<Chat />} />
                                <Route path="/profile" element={<Profile />} />
                            </Routes>
                        </main>
                    </div>
                </div>
            </CoupleProvider>
        </ConfigProvider>
    )
}

export default App
