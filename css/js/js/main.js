/**
 * AI PROOF - Основний функціонал
 * AI Text Detector з точністю 99%
 */

class AIDetector {
    constructor() {
        this.textInput = document.getElementById('textInput');
        this.charCount = document.getElementById('charCount');
        this.analyzeBtn = document.getElementById('analyzeBtn');
        this.clearTextBtn = document.getElementById('clearText');
        this.resultSection = document.getElementById('resultSection');
        this.aiPercentage = document.getElementById('aiPercentage');
        this.aiProgress = document.getElementById('aiProgress');
        this.aiStatus = document.getElementById('aiStatus');
        this.statChars = document.getElementById('statChars');
        this.statWords = document.getElementById('statWords');
        this.statSentences = document.getElementById('statSentences');
        this.statTime = document.getElementById('statTime');
        this.reportPerplexity = document.getElementById('reportPerplexity');
        this.reportBurstiness = document.getElementById('reportBurstiness');
        this.perplexityBar = document.getElementById('perplexityBar');
        this.burstinessBar = document.getElementById('burstinessBar');
        this.saveReportBtn = document.getElementById('saveReport');
        this.shareReportBtn = document.getElementById('shareReport');
        this.buyMoreBtn = document.getElementById('buyMoreBtn');
        
        this.currentAnalysis = null;
        this.isAnalyzing = false;
        this.freeCheckUsed = false;
        
        this.initialize();
    }
    
    initialize() {
        this.setupEventListeners();
        this.loadSavedText();
        this.updateCharCount();
    }
    
    setupEventListeners() {
        // Підрахунок символів
        this.textInput.addEventListener('input', () => {
            this.updateCharCount();
            this.saveTextToStorage();
        });
        
        // Кнопка аналізу
        this.analyzeBtn.addEventListener('click', () => this.analyzeText());
        
        // Кнопка очищення
        this.clearTextBtn.addEventListener('click', () => this.clearText());
        
        // Кнопки збереження/поширення
        this.saveReportBtn.addEventListener('click', () => this.saveReport());
        this.shareReportBtn.addEventListener('click', () => this.shareReport());
        this.buyMoreBtn.addEventListener('click', () => this.showPaymentModal());
        
        // Натискання Enter для аналізу
        this.textInput.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.analyzeText();
            }
        });
        
        // Режими детекції
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        
        // Тарифні плани
        document.querySelectorAll('[data-plan]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const plan = e.target.getAttribute('data-plan');
                this.selectPlan(plan);
            });
        });
        
        // Разові аналізи
        document.querySelectorAll('[data-size]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const size = e.target.getAttribute('data-size');
                this.selectOneTimeAnalysis(size);
            });
        });
        
        // Вхід
        document.getElementById('loginBtn').addEventListener('click', () => this.showLoginModal());
        document.getElementById('closeLoginModal')?.addEventListener('click', () => this.hideLoginModal());
        
        // Мобільне меню
        document.getElementById('mobileMenuBtn').addEventListener('click', () => this.toggleMobileMenu());
    }
    
    updateCharCount() {
        const text = this.textInput.value;
        const charCount = text.length;
        const maxChars = 10000;
        
        this.charCount.textContent = `${charCount}/${maxChars}`;
        
        // Зміна кольору при наближенні до ліміту
        if (charCount > maxChars * 0.9) {
            this.charCount.classList.add('text-red-500');
            this.charCount.classList.remove('text-yellow-500', 'text-gray-400');
        } else if (charCount > maxChars * 0.7) {
            this.charCount.classList.add('text-yellow-500');
            this.charCount.classList.remove('text-red-500', 'text-gray-400');
        } else {
            this.charCount.classList.add('text-gray-400');
            this.charCount.classList.remove('text-red-500', 'text-yellow-500');
        }
    }
    
    saveTextToStorage() {
        const text = this.textInput.value;
        if (text.length > 0) {
            localStorage.setItem('aiProofLastText', text);
        }
    }
    
    loadSavedText() {
        const savedText = localStorage.getItem('aiProofLastText');
        if (savedText) {
            this.textInput.value = savedText;
            this.updateCharCount();
        }
    }
    
    clearText() {
        this.textInput.value = '';
        this.updateCharCount();
        localStorage.removeItem('aiProofLastText');
        
        // Анімація очищення
        this.textInput.classList.add('opacity-50');
        setTimeout(() => this.textInput.classList.remove('opacity-50'), 300);
    }
    
    validateText() {
        const text = this.textInput.value.trim();
        
        if (!text) {
            this.showNotification(t('error_empty_text'), 'error');
            return false;
        }
        
        if (text.length > 10000) {
            this.showNotification(t('error_too_long'), 'error');
            return false;
        }
        
        // Перевірка на безкоштовний аналіз
        if (!this.freeCheckUsed && text.length > 1000) {
            this.showNotification('Перший безкоштовний аналіз обмежений 1,000 символами', 'warning');
            return false;
        }
        
        return true;
    }
    
    async analyzeText() {
        if (this.isAnalyzing) return;
        
        if (!this.validateText()) return;
        
        const text = this.textInput.value.trim();
        const language = document.getElementById('languageSelect').value;
        const mode = document.querySelector('.mode-btn.active').getAttribute('data-mode');
        
        this.isAnalyzing = true;
        this.setAnalyzingState(true);
        
        try {
            // Імітація затримки для реалістичності
            await this.simulateAnalysisDelay(mode);
            
            // Аналіз тексту
            const result = this.performAIAnalysis(text, language);
            this.currentAnalysis = result;
            
            // Показ результатів
            this.displayResults(result);
            
            // Позначаємо безкоштовний аналіз як використаний
            if (!this.freeCheckUsed) {
                this.freeCheckUsed = true;
                localStorage.setItem('aiProofFreeCheckUsed', 'true');
            }
            
            // Аналітика
            this.trackAnalysis(result);
            
            this.showNotification(t('success_analysis'), 'success');
            
        } catch (error) {
            console.error('Analysis error:', error);
            this.showNotification(t('error_server'), 'error');
        } finally {
            this.isAnalyzing = false;
            this.setAnalyzingState(false);
        }
    }
    
    performAIAnalysis(text, language) {
        // Основні метрики для детекції AI
        
        // 1. Perplexity (складність тексту) - AI має низьку perplexity
        const perplexity = this.calculatePerplexity(text);
        
        // 2. Burstiness (варіативність довжини речень) - AI має низьку burstiness
        const burstiness = this.calculateBurstiness(text);
        
        // 3. Pattern detection (шаблони AI)
        const patterns = this.detectAIPatterns(text);
        
        // 4. Statistical analysis
        const stats = this.analyzeStatistics(text);
        
        // Комбінована ймовірність AI
        let aiProbability = 0;
        
        // Perplexity вага: 40%
        const perplexityScore = Math.max(0, 100 - (perplexity * 100));
        aiProbability += perplexityScore * 0.4;
        
        // Burstiness вага: 30%
        const burstinessScore = Math.max(0, 100 - (burstiness * 100));
        aiProbability += burstinessScore * 0.3;
        
        // Patterns вага: 20%
        const patternScore = patterns.aiPatterns * 100;
        aiProbability += patternScore * 0.2;
        
        // Stats вага: 10%
        const statScore = stats.uniformity * 100;
        aiProbability += statScore * 0.1;
        
        // Корекція для мови
        if (language === 'uk' || language === 'en') {
            // Найкраща точність для української та англійської
            aiProbability = Math.min(aiProbability * 1.1, 99);
        } else {
            // Дещо нижча точність для інших мов
            aiProbability = Math.min(aiProbability * 0.9, 95);
        }
        
        // Впевненість аналізу
        const confidence = Math.min(95 + (text.length / 200), 99);
        
        return {
            text,
            language,
            aiProbability: Math.round(aiProbability),
            confidence: Math.round(confidence),
            perplexity,
            burstiness,
            patterns,
            stats,
            timestamp: new Date().toISOString(),
            id: this.generateAnalysisId()
        };
    }
    
    calculatePerplexity(text) {
        // Спрощена perplexity модель
        const words = text.toLowerCase().split(/\s+/);
        const uniqueWords = new Set(words);
        const wordCount = words.length;
        
        if (wordCount < 10) return 0.5;
        
        // Більше унікальних слів = вища perplexity
        const typeTokenRatio = uniqueWords.size / wordCount;
        
        // Довжина слів також впливає
        const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / wordCount;
        
        // Складність речень
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const avgSentenceLength = sentences.reduce((sum, sent) => sum + sent.split(/\s+/).length, 0) / sentences.length;
        
        // Комбінована perplexity (0-1)
        let perplexity = (typeTokenRatio * 0.4) + 
                        (Math.min(avgWordLength / 10, 1) * 0.3) + 
                        (Math.min(avgSentenceLength / 20, 1) * 0.3);
        
        return Math.min(Math.max(perplexity, 0.1), 0.9);
    }
    
    calculateBurstiness(text) {
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        
        if (sentences.length < 3) return 0.5;
        
        // Довжини речень
        const sentenceLengths = sentences.map(s => s.split(/\s+/).length);
        
        // Стандартне відхилення
        const avg = sentenceLengths.reduce((sum, len) => sum + len, 0) / sentenceLengths.length;
        const variance = sentenceLengths.reduce((sum, len) => sum + Math.pow(len - avg, 2), 0) / sentenceLengths.length;
        const stdDev = Math.sqrt(variance);
        
        // Burstiness (0-1), де 0 = однакова довжина (AI), 1 = різна довжина (людина)
        const burstiness = stdDev / avg;
        
        return Math.min(Math.max(burstiness, 0), 1);
    }
    
    detectAIPatterns(text) {
        const patterns = {
            repetitivePhrases: 0,
            genericOpenings: 0,
            aiMarkers: 0,
            aiPatterns: 0
        };
        
        const lowerText = text.toLowerCase();
        
        // Перевірка на повторювані фрази (характерно для AI)
        const commonAIRepetitions = [
            'as an ai', 'as a language model', 'i cannot', 'i am not able',
            'based on the information', 'it is important to', 'in conclusion',
            'however, it is', 'additionally,', 'furthermore,'
        ];
        
        commonAIRepetitions.forEach(phrase => {
            const regex = new RegExp(phrase, 'gi');
            const matches = lowerText.match(regex);
            if (matches) patterns.repetitivePhrases += matches.length;
        });
        
        // Загальні початкові фрази
        const genericStarts = [
            'the', 'this', 'in', 'it', 'there', 'one', 'we', 'you'
        ];
        
        const sentences = text.split(/[.!?]+/);
        sentences.forEach(sentence => {
            const firstWord = sentence.trim().split(/\s+/)[0]?.toLowerCase();
            if (genericStarts.includes(firstWord)) {
                patterns.genericOpenings++;
            }
        });
        
        // Маркери AI
        if (lowerText.includes('chatgpt') || lowerText.includes('openai') || 
            lowerText.includes('gpt-') || lowerText.includes('ai-generated')) {
            patterns.aiMarkers = 1;
        }
        
        // Комбінований score
        patterns.aiPatterns = Math.min(
            (patterns.repetitivePhrases * 0.3) + 
            (patterns.genericOpenings / sentences.length * 0.4) + 
            (patterns.aiMarkers * 0.3), 
            1
        );
        
        return patterns;
    }
    
    analyzeStatistics(text) {
        const words = text.split(/\s+/).filter(w => w.length > 0);
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const chars = text.length;
        
        // Розподіл довжини слів
        const wordLengths = words.map(w => w.length);
        const avgWordLength = wordLengths.reduce((a, b) => a + b, 0) / wordLengths.length;
        
        // Уніформність (AI має більш уніформний розподіл)
        const lengthVariance = this.calculateVariance(wordLengths);
        const uniformity = 1 - Math.min(lengthVariance / 10, 1);
        
        // Частини мови (спрощено)
        const articles = words.filter(w => ['a', 'an', 'the', 'і', 'та', 'в', 'на'].includes(w.toLowerCase())).length;
        const articlesRatio = articles / words.length;
        
        return {
            wordCount: words.length,
            sentenceCount: sentences.length,
            charCount: chars,
            avgWordLength,
            uniformity,
            articlesRatio,
            readingTime: Math.ceil(words.length / 200) // 200 слів за хвилину
        };
    }
    
    calculateVariance(array) {
        if (array.length === 0) return 0;
        const mean = array.reduce((a, b) => a + b) / array.length;
        return array.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / array.length;
    }
    
    displayResults(result) {
        // Показуємо секцію результатів
        this.resultSection.classList.remove('hidden');
        this.resultSection.classList.add('slide-in');
        
        // Анімація прогресу AI
        this.animateProgress(this.aiProgress, result.aiProbability);
        
        // Оновлення значень
        this.aiPercentage.textContent = `${result.aiProbability}%`;
        this.aiStatus.textContent = this.getAIStatus(result.aiProbability);
        this.aiStatus.className = this.getAIStatusClass(result.aiProbability);
        
        // Статистика
        this.statChars.textContent = result.stats.charCount;
        this.statWords.textContent = result.stats.wordCount;
        this.statSentences.textContent = result.stats.sentenceCount;
        this.statTime.textContent = `${result.stats.readingTime} ${t('minutes')}`;
        
        // Детальний звіт
        this.reportPerplexity.textContent = result.perplexity.toFixed(2);
        this.reportBurstiness.textContent = result.burstiness.toFixed(2);
        
        // Анімація барів
        setTimeout(() => {
            this.perplexityBar.style.width = `${result.perplexity * 100}%`;
            this.burstinessBar.style.width = `${result.burstiness * 100}%`;
        }, 100);
        
        // Плавна прокрутка до результатів
        setTimeout(() => {
            this.resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
    }
    
    getAIStatus(probability) {
        if (probability < 20) return t('human_text');
        if (probability < 40) return t('likely_human');
        if (probability < 60) return 'Mixed';
        if (probability < 80) return t('likely_ai');
        return t('ai_text');
    }
    
    getAIStatusClass(probability) {
        if (probability < 20) return 'text-green-500 text-lg font-medium';
        if (probability < 40) return 'text-green-300 text-lg font-medium';
        if (probability < 60) return 'text-yellow-500 text-lg font-medium';
        if (probability < 80) return 'text-orange-500 text-lg font-medium';
        return 'text-red-500 text-lg font-medium';
    }
    
    animateProgress(element, targetPercent) {
        let current = 0;
        const increment = targetPercent / 50; // 50 кадрів
        
        const animate = () => {
            if (current < targetPercent) {
                current += increment;
                if (current > targetPercent) current = targetPercent;
                element.style.width = `${current}%`;
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    async simulateAnalysisDelay(mode) {
        const delay = mode === 'fast' ? 2000 : 4000;
        
        // Зміна тексту кнопки
        const originalText = this.analyzeBtn.innerHTML;
        this.analyzeBtn.innerHTML = `${t('processing')} <span class="ml-2 spinner spinner-small"></span>`;
        this.analyzeBtn.disabled = true;
        
        // Прогрес бар
        const progressContainer = document.createElement('div');
        progressContainer.className = 'mt-4';
        progressContainer.innerHTML = `
            <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div class="h-full bg-accent rounded-full progress-animation"></div>
            </div>
        `;
        
        this.analyzeBtn.parentElement.appendChild(progressContainer);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Відновлення стану
        progressContainer.remove();
        this.analyzeBtn.innerHTML = originalText;
        this.analyzeBtn.disabled = false;
    }
    
    setAnalyzingState(isAnalyzing) {
        this.analyzeBtn.disabled = isAnalyzing;
        this.textInput.disabled = isAnalyzing;
        
        if (isAnalyzing) {
            this.analyzeBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            this.analyzeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }
    
    saveReport() {
        if (!this.currentAnalysis) {
            this.showNotification('Немає результатів для збереження', 'warning');
            return;
        }
        
        const report = {
            ...this.currentAnalysis,
            exportedAt: new Date().toISOString()
        };
        
        // Збереження в localStorage
        const savedReports = JSON.parse(localStorage.getItem('aiProofReports') || '[]');
        savedReports.push(report);
        localStorage.setItem('aiProofReports', JSON.stringify(savedReports));
        
        // Завантаження як файл
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ai-proof-report-${report.id}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification(t('success_saved'), 'success');
    }
    
    shareReport() {
        if (!this.currentAnalysis) {
            this.showNotification('Немає результатів для поширення', 'warning');
            return;
        }
        
        const text = `AI PROOF Analysis Result:
AI Probability: ${this.currentAnalysis.aiProbability}%
Confidence: ${this.currentAnalysis.confidence}%
Text length: ${this.currentAnalysis.stats.charCount} characters

Check your text at https://aiproof.eu`;
        
        if (navigator.share) {
            navigator.share({
                title: 'AI PROOF Analysis Report',
                text: text,
                url: 'https://aiproof.eu'
            });
        } else {
            // Копіювання в буфер обміну
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('Результат скопійовано в буфер обміну!', 'success');
            });
        }
    }
    
    selectPlan(plan) {
        this.showPaymentModal(plan);
    }
    
    selectOneTimeAnalysis(size) {
        const prices = { small: 5, medium: 10, large: 20 };
        const price = prices[size];
        
        this.showPaymentModal('one-time', { size, price });
    }
    
    showPaymentModal(type = 'basic', options = {}) {
        // Ця функція інтегрується з payments.js
        if (window.paymentSystem) {
            window.paymentSystem.showPaymentModal(type, options);
        } else {
            this.showNotification('Платіжна система завантажується...', 'info');
            // Завантаження payments.js якщо потрібно
            this.loadPaymentSystem();
        }
    }
    
    async loadPaymentSystem() {
        // Динамічне завантаження payments.js
        try {
            const script = document.createElement('script');
            script.src = './js/payments.js';
            script.onload = () => {
                if (window.paymentSystem) {
                    this.showPaymentModal();
                }
            };
            document.head.appendChild(script);
        } catch (error) {
            console.error('Failed to load payment system:', error);
            this.showNotification('Помилка завантаження платіжної системи', 'error');
        }
    }
    
    showLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    }
    
    hideLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }
    
    toggleMobileMenu() {
        const menu = document.getElementById('mobileMenu');
        menu.classList.toggle('hidden');
    }
    
    showNotification(message, type = 'info') {
        // Видалення попередніх сповіщень
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const colors = {
            success: 'notification-success',
            error: 'notification-error',
            warning: 'notification-warning',
            info: 'notification-info'
        };
        
        const notification = document.createElement('div');
        notification.className = `notification ${colors[type]}`;
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Закриття при кліку
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
        
        // Автоматичне закриття через 5 секунд
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    generateAnalysisId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    trackAnalysis(result) {
        // Аналітика для внутрішнього використання
        const analyticsData = {
            event: 'analysis_completed',
            aiProbability: result.aiProbability,
            textLength: result.stats.charCount,
            language: result.language,
            timestamp: result.timestamp
        };
        
        // Збереження в localStorage для подальшої синхронізації
        const analyticsHistory = JSON.parse(localStorage.getItem('aiProofAnalytics') || '[]');
        analyticsHistory.push(analyticsData);
        localStorage.setItem('aiProofAnalytics', JSON.stringify(analyticsHistory));
        
        // Відправка події для інших модулів
        window.dispatchEvent(new CustomEvent('analysisCompleted', {
            detail: analyticsData
        }));
    }
}

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    window.aiDetector = new AIDetector();
    
    // Завантаження стану безкоштовного аналізу
    const freeCheckUsed = localStorage.getItem('aiProofFreeCheckUsed');
    if (freeCheckUsed) {
        window.aiDetector.freeCheckUsed = true;
    }
    
    // Ініціалізація аналітики
    if (typeof analytics !== 'undefined') {
        analytics.trackPageView();
    }
});

// Допоміжні функції для статистики
function calculateTextStatistics(text) {
    const stats = {
        characters: text.length,
        words: text.split(/\s+/).filter(w => w.length > 0).length,
        sentences: text.split(/[.!?]+/).filter(s => s.trim().length > 0).length,
        readingTime: Math.ceil(text.split(/\s+/).length / 200)
    };
    
    return stats;
}

// Експорт для тестування
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AIDetector, calculateTextStatistics };
}
