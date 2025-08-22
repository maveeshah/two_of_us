import React, { createContext, useContext, useState, useEffect } from 'react';
import frappeApi from '../services/frappeApi';

const CoupleContext = createContext();

export const useCouple = () => {
    const context = useContext(CoupleContext);
    if (!context) {
        throw new Error('useCouple must be used within a CoupleProvider');
    }
    return context;
};

export const CoupleProvider = ({ children }) => {
    const [coupleProfile, setCoupleProfile] = useState(null);
    const [challenges, setChallenges] = useState([]);
    const [goals, setGoals] = useState([]);
    const [rewards, setRewards] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Temporary partner names for demo - in real app this would come from user authentication
    const [partnerNames, setPartnerNames] = useState({
        partner1: 'John',
        partner2: 'Sarah'
    });

    // Load all couple data
    const loadCoupleData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [
                profile,
                challengesData,
                goalsData,
                rewardsData,
                achievementsData,
                messagesData
            ] = await Promise.all([
                frappeApi.getCoupleProfile(partnerNames.partner1, partnerNames.partner2),
                frappeApi.getChallenges(partnerNames.partner1, partnerNames.partner2),
                frappeApi.getGoals(partnerNames.partner1, partnerNames.partner2),
                frappeApi.getRewards(partnerNames.partner1, partnerNames.partner2),
                frappeApi.getAchievements(partnerNames.partner1, partnerNames.partner2),
                frappeApi.getChatMessages(partnerNames.partner1, partnerNames.partner2, 20)
            ]);

            setCoupleProfile(profile);
            setChallenges(challengesData);
            setGoals(goalsData);
            setRewards(rewardsData);
            setAchievements(achievementsData);
            setChatMessages(messagesData);
        } catch (err) {
            console.error('Error loading couple data:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Refresh specific data
    const refreshChallenges = async () => {
        try {
            const data = await frappeApi.getChallenges(partnerNames.partner1, partnerNames.partner2);
            setChallenges(data);
        } catch (err) {
            console.error('Error refreshing challenges:', err);
        }
    };

    const refreshGoals = async () => {
        try {
            const data = await frappeApi.getGoals(partnerNames.partner1, partnerNames.partner2);
            setGoals(data);
        } catch (err) {
            console.error('Error refreshing goals:', err);
        }
    };

    const refreshRewards = async () => {
        try {
            const data = await frappeApi.getRewards(partnerNames.partner1, partnerNames.partner2);
            setRewards(data);
        } catch (err) {
            console.error('Error refreshing rewards:', err);
        }
    };

    const refreshChatMessages = async () => {
        try {
            const data = await frappeApi.getChatMessages(partnerNames.partner1, partnerNames.partner2, 20);
            setChatMessages(data);
        } catch (err) {
            console.error('Error refreshing chat messages:', err);
        }
    };

    // Create new items
    const createChallenge = async (challengeData) => {
        try {
            const newChallenge = await frappeApi.createChallenge({
                ...challengeData,
                partner1_name: partnerNames.partner1,
                partner2_name: partnerNames.partner2,
                status: 'upcoming'
            });
            await refreshChallenges();
            return newChallenge;
        } catch (err) {
            console.error('Error creating challenge:', err);
            throw err;
        }
    };

    const createGoal = async (goalData) => {
        try {
            const newGoal = await frappeApi.createGoal({
                ...goalData,
                partner1_name: partnerNames.partner1,
                partner2_name: partnerNames.partner2,
                status: 'planning',
                progress: 0
            });
            await refreshGoals();
            return newGoal;
        } catch (err) {
            console.error('Error creating goal:', err);
            throw err;
        }
    };

    const sendChatMessage = async (text, senderName) => {
        try {
            const newMessage = await frappeApi.sendChatMessage({
                text,
                sender_name: senderName,
                partner1_name: partnerNames.partner1,
                partner2_name: partnerNames.partner2,
                message_type: 'text',
                timestamp: new Date().toISOString()
            });
            await refreshChatMessages();
            return newMessage;
        } catch (err) {
            console.error('Error sending chat message:', err);
            throw err;
        }
    };

    // Update items
    const updateChallengeStatus = async (challengeName, status) => {
        try {
            await frappeApi.updateChallengeStatus(challengeName, status);
            await refreshChallenges();
        } catch (err) {
            console.error('Error updating challenge status:', err);
            throw err;
        }
    };

    const updateGoalProgress = async (goalName, progress) => {
        try {
            await frappeApi.updateGoalProgress(goalName, progress);
            await refreshGoals();
        } catch (err) {
            console.error('Error updating goal progress:', err);
            throw err;
        }
    };

    // Load data on mount
    useEffect(() => {
        if (frappeApi.isLoggedIn()) {
            loadCoupleData();
        } else {
            setLoading(false);
            setError('Not logged in to Frappe');
        }
    }, [partnerNames.partner1, partnerNames.partner2]);

    const value = {
        // State
        coupleProfile,
        challenges,
        goals,
        rewards,
        achievements,
        chatMessages,
        loading,
        error,
        partnerNames,

        // Actions
        loadCoupleData,
        refreshChallenges,
        refreshGoals,
        refreshRewards,
        refreshChatMessages,
        createChallenge,
        createGoal,
        sendChatMessage,
        updateChallengeStatus,
        updateGoalProgress,
        setPartnerNames
    };

    return (
        <CoupleContext.Provider value={value}>
            {children}
        </CoupleContext.Provider>
    );
};
