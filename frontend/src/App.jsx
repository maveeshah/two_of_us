import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Challenges from './pages/Challenges'
import Goals from './pages/Goals'
import Rewards from './pages/Rewards'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import './App.css'

const { Content } = Layout

function App() {
    return (
        <Layout className="app-layout">
            <Navbar />
            <Layout>
                <Sidebar />
                <Layout className="main-content">
                    <Content className="content-area">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/challenges" element={<Challenges />} />
                            <Route path="/goals" element={<Goals />} />
                            <Route path="/rewards" element={<Rewards />} />
                            <Route path="/chat" element={<Chat />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default App
