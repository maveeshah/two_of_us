// Frappe API service for Two of Us app
const FRAPPE_API_BASE = '/api/method/two_of_us.api';

class FrappeApiService {
    constructor() {
        this.baseUrl = FRAPPE_API_BASE;
    }

    // Generic method to call Frappe API
    async callApi(method, params = {}) {
        try {
            const response = await fetch(`${this.baseUrl}.${method}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Frappe-CSRF-Token': this.getCsrfToken(),
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.message && data.message.error) {
                throw new Error(data.message.error);
            }

            return data.message || data;
        } catch (error) {
            console.error(`API Error in ${method}:`, error);
            throw error;
        }
    }

    // Get CSRF token from meta tag
    getCsrfToken() {
        const metaTag = document.querySelector('meta[name="csrf-token"]');
        return metaTag ? metaTag.getAttribute('content') : '';
    }

    // Dashboard API calls
    async getDashboardData(partner1Name, partner2Name) {
        return this.callApi('get_dashboard_data', {
            partner1_name: partner1Name,
            partner2_name: partner2Name
        });
    }

    // Challenges API calls
    async getChallenges(partner1Name, partner2Name, status = null) {
        return this.callApi('get_challenges_list', {
            partner1_name: partner1Name,
            partner2_name: partner2Name,
            status: status
        });
    }

    async createChallenge(challengeData) {
        return this.callApi('create_challenge', challengeData);
    }

    async completeChallenge(challengeName, completionNotes = '') {
        return this.callApi('complete_challenge', {
            challenge_name: challengeName,
            completion_notes: completionNotes
        });
    }

    // Goals API calls
    async getGoals(partner1Name, partner2Name, status = null) {
        return this.callApi('get_goals_list', {
            partner1_name: partner1Name,
            partner2_name: partner2Name,
            status: status
        });
    }

    async createGoal(goalData) {
        return this.callApi('create_goal', goalData);
    }

    async updateGoalProgress(goalName, progress) {
        return this.callApi('update_goal_progress', {
            goal_name: goalName,
            progress: progress
        });
    }

    // Rewards API calls
    async getRewards(partner1Name, partner2Name) {
        return this.callApi('get_rewards_list', {
            partner1_name: partner1Name,
            partner2_name: partner2Name
        });
    }

    async unlockReward(rewardName, partner1Name, partner2Name) {
        return this.callApi('unlock_reward', {
            reward_name: rewardName,
            partner1_name: partner1Name,
            partner2_name: partner2Name
        });
    }

    // Chat API calls
    async getChatMessages(partner1Name, partner2Name, limit = 50) {
        return this.callApi('get_chat_messages', {
            partner1_name: partner1Name,
            partner2_name: partner2Name,
            limit: limit
        });
    }

    async sendChatMessage(text, senderName, partner1Name, partner2Name, messageType = 'text') {
        return this.callApi('send_chat_message', {
            text: text,
            sender_name: senderName,
            partner1_name: partner1Name,
            partner2_name: partner2Name,
            message_type: messageType
        });
    }

    // Achievements API calls
    async getAchievements(partner1Name, partner2Name) {
        return this.callApi('get_achievements', {
            partner1_name: partner1Name,
            partner2_name: partner2Name
        });
    }

    // Couple Profile API calls
    async createCoupleProfile(partner1Name, partner1Email, partner2Name, partner2Email, anniversaryDate) {
        return this.callApi('create_couple_profile', {
            partner1_name: partner1Name,
            partner1_email: partner1Email,
            partner2_name: partner2Name,
            partner2_email: partner2Email,
            anniversary_date: anniversaryDate
        });
    }

    async getCoupleProfile(partner1Name, partner2Name) {
        return this.callApi('get_couple_profile', {
            partner1_name: partner1Name,
            partner2_name: partner2Name
        });
    }
}

// Create and export a singleton instance
const frappeApi = new FrappeApiService();
export default frappeApi;
