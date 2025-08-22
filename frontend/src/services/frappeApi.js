// Frappe API Service for Two of Us App
const FRAPPE_URL = window.location.origin; // Automatically detect Frappe URL

class FrappeAPI {
    constructor() {
        this.baseURL = FRAPPE_URL;
        this.csrfToken = this.getCSRFToken();
    }

    // Get CSRF token from cookies
    getCSRFToken() {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'csrf_token') {
                return value;
            }
        }
        return null;
    }

    // Generic method to call Frappe methods
    async call(method, args = {}) {
        try {
            const response = await fetch(`${this.baseURL}/api/method/${method}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Frappe-CSRF-Token': this.csrfToken,
                },
                body: JSON.stringify(args),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.message || data;
        } catch (error) {
            console.error('Frappe API Error:', error);
            throw error;
        }
    }

    // Get couple profile
    async getCoupleProfile(partner1Name, partner2Name) {
        try {
            const profiles = await this.call('frappe.client.get_list', {
                doctype: 'Couple Profile',
                filters: {
                    partner1_name: partner1Name,
                    partner2_name: partner2Name
                },
                limit: 1
            });
            return profiles.length > 0 ? profiles[0] : null;
        } catch (error) {
            console.error('Error fetching couple profile:', error);
            return null;
        }
    }

    // Get challenges
    async getChallenges(partner1Name, partner2Name) {
        try {
            return await this.call('frappe.client.get_list', {
                doctype: 'Challenge',
                filters: {
                    partner1_name: partner1Name,
                    partner2_name: partner2Name
                },
                fields: ['*'],
                order_by: 'creation desc'
            });
        } catch (error) {
            console.error('Error fetching challenges:', error);
            return [];
        }
    }

    // Get goals
    async getGoals(partner1Name, partner2Name) {
        try {
            return await this.call('frappe.client.get_list', {
                doctype: 'Goal',
                filters: {
                    partner1_name: partner1Name,
                    partner2_name: partner2Name
                },
                fields: ['*'],
                order_by: 'creation desc'
            });
        } catch (error) {
            console.error('Error fetching goals:', error);
            return [];
        }
    }

    // Get rewards
    async getRewards(partner1Name, partner2Name) {
        try {
            return await this.call('frappe.client.get_list', {
                doctype: 'Reward',
                filters: {
                    partner1_name: partner1Name,
                    partner2_name: partner2Name
                },
                fields: ['*'],
                order_by: 'creation desc'
            });
        } catch (error) {
            console.error('Error fetching rewards:', error);
            return [];
        }
    }

    // Get achievements
    async getAchievements(partner1Name, partner2Name) {
        try {
            return await this.call('frappe.client.get_list', {
                doctype: 'Achievement',
                filters: {
                    partner1_name: partner1Name,
                    partner2_name: partner2Name
                },
                fields: ['*'],
                order_by: 'earned_date desc'
            });
        } catch (error) {
            console.error('Error fetching achievements:', error);
            return [];
        }
    }

    // Get chat messages
    async getChatMessages(partner1Name, partner2Name, limit = 50) {
        try {
            return await this.call('frappe.client.get_list', {
                doctype: 'Chat Message',
                filters: {
                    partner1_name: partner1Name,
                    partner2_name: partner2Name
                },
                fields: ['*'],
                order_by: 'timestamp desc',
                limit: limit
            });
        } catch (error) {
            console.error('Error fetching chat messages:', error);
            return [];
        }
    }

    // Create new challenge
    async createChallenge(challengeData) {
        try {
            return await this.call('frappe.client.insert', {
                doc: {
                    doctype: 'Challenge',
                    ...challengeData
                }
            });
        } catch (error) {
            console.error('Error creating challenge:', error);
            throw error;
        }
    }

    // Create new goal
    async createGoal(goalData) {
        try {
            return await this.call('frappe.client.insert', {
                doc: {
                    doctype: 'Goal',
                    ...goalData
                }
            });
        } catch (error) {
            console.error('Error creating goal:', error);
            throw error;
        }
    }

    // Update challenge status
    async updateChallengeStatus(challengeName, status) {
        try {
            return await this.call('frappe.client.set_value', {
                doctype: 'Challenge',
                name: challengeName,
                fieldname: 'status',
                value: status
            });
        } catch (error) {
            console.error('Error updating challenge status:', error);
            throw error;
        }
    }

    // Update goal progress
    async updateGoalProgress(goalName, progress) {
        try {
            return await this.call('frappe.client.set_value', {
                doctype: 'Goal',
                name: goalName,
                fieldname: 'progress',
                value: progress
            });
        } catch (error) {
            console.error('Error updating goal progress:', error);
            throw error;
        }
    }

    // Send chat message
    async sendChatMessage(messageData) {
        try {
            return await this.call('frappe.client.insert', {
                doc: {
                    doctype: 'Chat Message',
                    ...messageData
                }
            });
        } catch (error) {
            console.error('Error sending chat message:', error);
            throw error;
        }
    }

    // Get current user info
    async getCurrentUser() {
        try {
            return await this.call('frappe.auth.get_logged_user');
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.csrfToken !== null;
    }
}

export default new FrappeAPI();
