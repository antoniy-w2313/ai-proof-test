/**
 * AI PROOF - Власна система аналітики
 * Без Google Analytics, повна конфіденційність
 */

class AProofAnalytics {
    constructor() {
        this.endpoint = '/api/analytics'; // Буде налаштовано на бекенді
        this.isLocal = true;
        this.sessionId = this.generateSessionId();
        this.pageViews = 0;
        this.analysisCount = 0;
        
        this.initialize();
    }
    
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    generateUserId() {
        let userId = localStorage.getItem('aiProofUserId');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('aiProofUserId', userId);
        }
        return userId;
    }
    
    initialize() {
        this.userId = this.generateUserId();
        this.trackPageView();
        this.setupEventListeners();
        
        // Синхронізація локальних даних
        this.syncLocalData();
    }
    
    trackPageView() {
        const pageData = {
            event: 'page_view',
            session_id: this.sessionId,
            user_id: this.userId,
            page: window.location.pathname,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent,
            language: navigator.language,
            screen_resolution: `${window.screen.width}x${window.screen.height}`,
            page_load_time: performance.timing.loadEventEnd - performance.timing.navigationStart
        };
        
        this.pageViews++;
        this.storeLocally(pageData);
        this.sendToServer(pageData);
    }
    
    trackEvent(eventName, eventData = {}) {
        const event = {
            event: event_name,
            session_id: this.sessionId,
            user_id: this.userId,
            timestamp: new Date().toISOString(),
            ...eventData
        };
        
        this.storeLocally(event);
        this.sendToServer(event);
    }
    
    trackAnalysis(data) {
        this.analysisCount++;
        this.trackEvent('analysis_completed', data);
    }
    
    trackPayment(plan, amount) {
        this.trackEvent('payment_initiated', {
            plan: plan,
            amount: amount,
            currency: 'USD'
        });
    }
    
    trackConversion(plan, amount) {
        this.trackEvent('conversion_completed', {
            plan: plan,
            amount: amount,
            currency: 'USD',
            revenue: amount
        });
    }
    
    storeLocally(data) {
        try {
            const analyticsData = JSON.parse(localStorage.getItem('aiProofAnalyticsData') || '[]');
            analyticsData.push(data);
            
            // Зберігаємо тільки останні 1000 подій
            if (analyticsData.length > 1000) {
                analyticsData.splice(0, analyticsData.length - 1000);
            }
            
            localStorage.setItem('aiProofAnalyticsData', JSON.stringify(analyticsData));
        } catch (error) {
            console.error('Failed to store analytics locally:', error);
        }
    }
    
    async sendToServer(data) {
        if (this.isLocal) return; // На локальному хостингу тільки зберігаємо
        
        try {
            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('Server responded with ' + response.status);
            }
            
            return await response.json();
        } catch (error) {
            console.warn('Failed to send analytics to server:', error);
            // Дані вже збережено локально, синхронізуємо пізніше
        }
    }
    
    async syncLocalData() {
        if (this.isLocal) return;
        
        try {
            const localData = JSON.parse(localStorage.getItem('aiProofAnalyticsData') || '[]');
            
            if (localData.length > 0) {
                // Відправляємо всі локальні дані
                const response = await fetch(this.endpoint + '/batch', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        events: localData,
                        user_id: this.userId,
                        session_id: this.sessionId
                    })
                });
                
                if (response.ok) {
                    // Очищаємо локальні дані після успішної синхронізації
                    localStorage.removeItem('aiProofAnalyticsData');
                }
            }
        } catch (error) {
            console.warn('Failed to sync local analytics data:', error);
        }
    }
    
    setupEventListeners() {
        // Відстеження кліків по тарифних планах
        document.querySelectorAll('[data-plan], [data-size]').forEach(element => {
            element.addEventListener('click', (e) => {
                const plan = e.target.getAttribute('data-plan') || 
                            e.target.getAttribute('data-size');
                const amount = this.getPlanAmount(plan);
                
                this.trackEvent('plan_clicked', {
                    plan: plan,
                    amount: amount
                });
            });
        });
        
        // Відстеження аналізів
        window.addEventListener('analysisCompleted', (e) => {
            this.trackAnalysis(e.detail);
        });
        
        // Відстеження скролу (25%, 50%, 75%, 100%)
        let scrollPositions = [25, 50, 75, 100];
        let trackedPositions = new Set();
        
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
            
            scrollPositions.forEach(position => {
                if (scrollPercent >= position && !trackedPositions.has(position)) {
                    this.trackEvent('scroll_depth', {
                        depth: position,
                        page: window.location.pathname
                    });
                    trackedPositions.add(position);
                }
            });
        });
        
        // Відстеження часу на сайті
        let timeOnPage = 0;
        setInterval(() => {
            timeOnPage += 5;
            
            if (timeOnPage === 30 || timeOnPage === 60 || timeOnPage === 120) {
                this.trackEvent('time_on_page', {
                    seconds: timeOnPage,
                    page: window.location.pathname
                });
            }
        }, 5000);
        
        // Відстеження виходу з сайту
        window.addEventListener('beforeunload', () => {
            this.trackEvent('session_ended', {
                session_duration: timeOnPage,
                page_views: this.pageViews,
                analysis_count: this.analysisCount
            });
        });
    }
    
    getPlanAmount(plan) {
        const prices = {
            'basic': 15,
            'smart': 30,
            'business': 99,
            'small': 5,
            'medium': 10,
            'large': 20
        };
        
        return prices[plan] || 0;
    }
    
    // Методи для отримання статистики
    getStats() {
        return {
            sessionId: this.sessionId,
            userId: this.userId,
            pageViews: this.pageViews,
            analysisCount: this.analysisCount,
            timestamp: new Date().toISOString()
        };
    }
    
    // Експорт даних для адмін-панелі
    exportData() {
        try {
            const localData = JSON.parse(localStorage.getItem('aiProofAnalyticsData') || '[]');
            const stats = this.getStats();
            
            return {
                metadata: stats,
                events: localData
            };
        } catch (error) {
            console.error('Failed to export analytics data:', error);
            return null;
        }
    }
}

// Глобальна ініціалізація
document.addEventListener('DOMContentLoaded', () => {
    window.analytics = new AProofAnalytics();
    
    // Експорт для адмін-панелі
    window.getAnalyticsData = () => window.analytics.exportData();
});

// Експорт для модулів
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AProofAnalytics;
}
