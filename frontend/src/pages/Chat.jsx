import React, { useState, useRef, useEffect } from 'react'
import {
    Card,
    Input,
    Button,
    Avatar,
    Typography,
    Space,
    Divider,
    List,
    Badge,
    Tooltip
} from 'antd'
import {
    SendOutlined,
    HeartOutlined,
    SmileOutlined,
    CameraOutlined,
    PaperClipOutlined
} from '@ant-design/icons'
import { motion } from 'framer-motion'

const { TextArea } = Input
const { Title, Text, Paragraph } = Typography

const Chat = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Good morning! 💕 How did you sleep?",
            sender: 'partner',
            timestamp: '09:00 AM',
            type: 'text'
        },
        {
            id: 2,
            text: "Good morning! I slept great, thanks for asking. How about you?",
            sender: 'me',
            timestamp: '09:02 AM',
            type: 'text'
        },
        {
            id: 3,
            text: "Pretty well! I'm excited about our challenge today - cooking dinner together!",
            sender: 'partner',
            timestamp: '09:05 AM',
            type: 'text'
        },
        {
            id: 4,
            text: "Me too! I've been thinking about what we should make. Any ideas?",
            sender: 'me',
            timestamp: '09:07 AM',
            type: 'text'
        },
        {
            id: 5,
            text: "How about that pasta recipe we tried last month? It was delicious!",
            sender: 'partner',
            timestamp: '09:10 AM',
            type: 'text'
        }
    ])
    const [newMessage, setNewMessage] = useState('')
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message = {
                id: messages.length + 1,
                text: newMessage,
                sender: 'me',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: 'text'
            }
            setMessages([...messages, message])
            setNewMessage('')
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const sendQuickMessage = (text) => {
        const message = {
            id: messages.length + 1,
            text: text,
            sender: 'me',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'text'
        }
        setMessages([...messages, message])
    }

    const quickMessages = [
        "I love you! 💕",
        "Good morning!",
        "Good night!",
        "How are you?",
        "Miss you!",
        "Can't wait to see you!"
    ]

    return (
        <div style={{ marginLeft: '250px', padding: '24px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Title level={2} style={{ color: '#ff6b9d', marginBottom: '24px' }}>
                    💬 Couple Chat
                </Title>

                <Row gutter={24}>
                    {/* Chat Area */}
                    <Col xs={24} lg={18}>
                        <Card className="hover-card" style={{ height: '70vh' }}>
                            {/* Chat Header */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '16px 0',
                                borderBottom: '1px solid #f0f0f0',
                                marginBottom: '16px'
                            }}>
                                <Badge dot offset={[-2, 2]} color="#52c41a">
                                    <Avatar
                                        size={40}
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                                    />
                                </Badge>
                                <div style={{ marginLeft: '12px' }}>
                                    <Text strong>Sarah</Text>
                                    <br />
                                    <Text type="secondary" style={{ fontSize: '12px' }}>
                                        Online now
                                    </Text>
                                </div>
                            </div>

                            {/* Messages */}
                            <div style={{
                                height: 'calc(70vh - 200px)',
                                overflowY: 'auto',
                                padding: '16px 0'
                            }}>
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        style={{
                                            display: 'flex',
                                            justifyContent: message.sender === 'me' ? 'flex-end' : 'flex-start',
                                            marginBottom: '16px'
                                        }}
                                    >
                                        <div style={{
                                            maxWidth: '70%',
                                            display: 'flex',
                                            flexDirection: message.sender === 'me' ? 'row-reverse' : 'row',
                                            alignItems: 'flex-end'
                                        }}>
                                            {message.sender === 'partner' && (
                                                <Avatar
                                                    size={32}
                                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                                                    style={{ marginRight: '8px' }}
                                                />
                                            )}

                                            <div style={{
                                                backgroundColor: message.sender === 'me' ? '#ff6b9d' : '#f0f0f0',
                                                color: message.sender === 'me' ? 'white' : 'black',
                                                padding: '12px 16px',
                                                borderRadius: '18px',
                                                maxWidth: '100%',
                                                wordWrap: 'break-word'
                                            }}>
                                                <Text style={{ color: message.sender === 'me' ? 'white' : 'inherit' }}>
                                                    {message.text}
                                                </Text>
                                            </div>

                                            {message.sender === 'me' && (
                                                <Avatar
                                                    size={32}
                                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Me"
                                                    style={{ marginLeft: '8px' }}
                                                />
                                            )}
                                        </div>

                                        <div style={{
                                            fontSize: '11px',
                                            color: '#999',
                                            marginTop: '4px',
                                            textAlign: message.sender === 'me' ? 'right' : 'left',
                                            width: '100%'
                                        }}>
                                            {message.timestamp}
                                        </div>
                                    </motion.div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Quick Messages */}
                            <div style={{ marginBottom: '16px' }}>
                                <Text type="secondary" style={{ fontSize: '12px' }}>Quick messages:</Text>
                                <div style={{ marginTop: '8px' }}>
                                    {quickMessages.map((msg, index) => (
                                        <Button
                                            key={index}
                                            size="small"
                                            style={{
                                                margin: '4px',
                                                borderRadius: '16px',
                                                borderColor: '#ff6b9d',
                                                color: '#ff6b9d'
                                            }}
                                            onClick={() => sendQuickMessage(msg)}
                                        >
                                            {msg}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Message Input */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-end',
                                gap: '8px'
                            }}>
                                <TextArea
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    autoSize={{ minRows: 1, maxRows: 4 }}
                                    style={{ flex: 1 }}
                                />
                                <Space>
                                    <Tooltip title="Add emoji">
                                        <Button icon={<SmileOutlined />} />
                                    </Tooltip>
                                    <Tooltip title="Attach file">
                                        <Button icon={<PaperClipOutlined />} />
                                    </Tooltip>
                                    <Tooltip title="Take photo">
                                        <Button icon={<CameraOutlined />} />
                                    </Tooltip>
                                    <Button
                                        type="primary"
                                        icon={<SendOutlined />}
                                        onClick={handleSendMessage}
                                        style={{ backgroundColor: '#ff6b9d', borderColor: '#ff6b9d' }}
                                    >
                                        Send
                                    </Button>
                                </Space>
                            </div>
                        </Card>
                    </Col>

                    {/* Sidebar */}
                    <Col xs={24} lg={6}>
                        <Card title="Chat Features" className="hover-card" style={{ marginBottom: '16px' }}>
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Button
                                    block
                                    icon={<HeartOutlined />}
                                    style={{ borderColor: '#ff6b9d', color: '#ff6b9d' }}
                                >
                                    Send Love
                                </Button>
                                <Button
                                    block
                                    icon={<SmileOutlined />}
                                    style={{ borderColor: '#52c41a', color: '#52c41a' }}
                                >
                                    Mood Check-in
                                </Button>
                            </Space>
                        </Card>

                        <Card title="Recent Activities" className="hover-card">
                            <List
                                size="small"
                                dataSource={[
                                    { text: 'Completed challenge: Cook dinner together', time: '2 hours ago' },
                                    { text: 'Earned 15 points', time: '3 hours ago' },
                                    { text: 'Set new goal: Weekend getaway', time: '1 day ago' }
                                ]}
                                renderItem={item => (
                                    <List.Item>
                                        <div>
                                            <Text style={{ fontSize: '12px' }}>{item.text}</Text>
                                            <br />
                                            <Text type="secondary" style={{ fontSize: '11px' }}>{item.time}</Text>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </motion.div>
        </div>
    )
}

export default Chat
