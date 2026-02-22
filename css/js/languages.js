/**
 * AI PROOF - Мультимовна система
 * Підтримка: українська, англійська, польська, німецька, французька
 */

const translations = {
    uk: {
        // Загальні
        "login": "Вхід",
        "logout": "Вихід",
        "loading": "Завантаження...",
        "save": "Зберегти",
        "cancel": "Скасувати",
        "confirm": "Підтвердити",
        "close": "Закрити",
        
        // Шапка
        "home": "Головна",
        "pricing": "Ціни",
        "features": "Можливості",
        "about": "Про нас",
        "contact": "Контакти",
        
        // Детектор
        "detector_title": "Детектор <span class='text-accent'>AI-текстів</span>",
        "detector_subtitle": "Перевірте будь-який текст на наявність штучного інтелекту з точністю <span class='text-success font-bold'>99%</span>",
        "enter_text": "Введіть текст для аналізу:",
        "select_lang": "Мова тексту:",
        "auto_detect": "Автовизначення",
        "detection_mode": "Режим детекції:",
        "fast_mode": "Швидкий",
        "deep_mode": "Поглиблений",
        "analyze_button": "🔍 Аналізувати текст",
        "free_check": "Перша перевірка безкоштовна (до 1,000 символів)",
        
        // Результати
        "analysis_result": "Результат аналізу",
        "ai_probability": "Ймовірність AI:",
        "confidence": "Впевненість аналізу:",
        "confidence_text": "Найвища точність",
        "text_stats": "Статистика:",
        "characters": "Символів:",
        "words": "Слів:",
        "sentences": "Речень:",
        "reading_time": "Час читання:",
        "detailed_report": "Детальний звіт:",
        "perplexity_score": "Складність тексту:",
        "perplexity_desc": "Вища складність = більш людський текст",
        "burstiness_score": "Варіативність:",
        "burstiness_desc": "AI часто має однакову довжину речень",
        "human_text": "Текст людський",
        "ai_text": "Текст згенеровано AI",
        "likely_human": "Ймовірно людський",
        "likely_ai": "Ймовірно AI",
        
        // Дії
        "save_report": "Зберегти звіт",
        "share": "Поділитися",
        "buy_credits": "Купити аналізи",
        "clear": "Очистити",
        
        // Ціни
        "pricing_title": "Тарифні плани",
        "pricing_subtitle": "Обирайте план, який підходить саме вам. Всі ціни в USD.",
        "plan_basic": "Basic",
        "plan_smart": "Smart",
        "plan_business": "Business",
        "billed_monthly": "Щомісячна оплата",
        "popular": "ПОПУЛЯРНИЙ",
        "one_time_analysis": "Разові аналізи",
        "small_text": "Маленький текст",
        "medium_text": "Середній текст",
        "large_text": "Великий текст",
        "up_to_2000": "До 2,000 символів",
        "up_to_5000": "До 5,000 символів",
        "up_to_10000": "До 10,000 символів",
        "buy_now": "Купити",
        "choose_plan": "Обрати план",
        
        // Фічі
        "feature_1000_chars": "1,000 символів за раз",
        "feature_3_daily": "3 аналізи на день",
        "feature_basic_report": "Базовий звіт",
        "feature_no_api": "API доступ",
        "feature_no_team": "Командний доступ",
        "feature_5000_chars": "5,000 символів за раз",
        "feature_10_daily": "10 аналізів на день",
        "feature_detailed_report": "Детальний звіт",
        "feature_statistics": "Статистика",
        "feature_unlimited_chars": "Необмежений обсяг",
        "feature_unlimited_analysis": "Необмежена кількість",
        "feature_api_access": "API доступ (1,000/день)",
        "feature_team_access": "Командний доступ (5)",
        "feature_priority_support": "Пріоритетна підтримка",
        
        // Футер
        "footer_description": "Професійний детектор AI-текстів для Європи. Точність 99%.",
        "quick_links": "Швидкі посилання",
        "legal": "Юридична інформація",
        "terms": "Умови використання",
        "privacy": "Політика конфіденційності",
        "cookies": "Cookie",
        "refund": "Політика повернення",
        "contact": "Контакти",
        "support_24_7": "Підтримка 24/7",
        "europe_coverage": "Покриття по всій Європі",
        "copyright": "© 2024 AI PROOF. Всі права захищені.",
        
        // Модальні вікна
        "login_to_account": "Вхід в акаунт",
        "email": "Email:",
        "password": "Пароль:",
        "login_button": "Увійти",
        "no_account": "Немає акаунту?",
        "register_here": "Зареєструватися",
        "payment": "Оплата",
        "processing": "Обробка...",
        "success": "Успішно!",
        "error": "Помилка!",
        
        // Помилки
        "error_empty_text": "Будь ласка, введіть текст для аналізу",
        "error_too_long": "Текст занадто довгий. Максимум 10,000 символів",
        "error_server": "Помилка сервера. Спробуйте пізніше",
        "error_network": "Помилка мережі. Перевірте з'єднання",
        
        // Успіх
        "success_analysis": "Аналіз завершено успішно!",
        "success_payment": "Оплата пройшла успішно!",
        "success_saved": "Звіт збережено!",
        
        // Інше
        "chars": "сим.",
        "words": "сл.",
        "minutes": "хв.",
        "seconds": "сек."
    },
    
    en: {
        // General
        "login": "Login",
        "logout": "Logout",
        "loading": "Loading...",
        "save": "Save",
        "cancel": "Cancel",
        "confirm": "Confirm",
        "close": "Close",
        
        // Header
        "home": "Home",
        "pricing": "Pricing",
        "features": "Features",
        "about": "About",
        "contact": "Contact",
        
        // Detector
        "detector_title": "AI Text <span class='text-accent'>Detector</span>",
        "detector_subtitle": "Check any text for artificial intelligence with <span class='text-success font-bold'>99%</span> accuracy",
        "enter_text": "Enter text for analysis:",
        "select_lang": "Text language:",
        "auto_detect": "Auto-detect",
        "detection_mode": "Detection mode:",
        "fast_mode": "Fast",
        "deep_mode": "Deep",
        "analyze_button": "🔍 Analyze Text",
        "free_check": "First check free (up to 1,000 characters)",
        
        // Results
        "analysis_result": "Analysis Result",
        "ai_probability": "AI Probability:",
        "confidence": "Confidence:",
        "confidence_text": "Highest accuracy",
        "text_stats": "Text Statistics:",
        "characters": "Characters:",
        "words": "Words:",
        "sentences": "Sentences:",
        "reading_time": "Reading time:",
        "detailed_report": "Detailed Report:",
        "perplexity_score": "Perplexity Score:",
        "perplexity_desc": "Higher perplexity = more human-like text",
        "burstiness_score": "Burstiness:",
        "burstiness_desc": "AI often has uniform sentence length",
        "human_text": "Human text",
        "ai_text": "AI generated text",
        "likely_human": "Likely human",
        "likely_ai": "Likely AI",
        
        // Actions
        "save_report": "Save Report",
        "share": "Share",
        "buy_credits": "Buy Credits",
        "clear": "Clear",
        
        // Pricing
        "pricing_title": "Pricing Plans",
        "pricing_subtitle": "Choose the plan that's right for you. All prices in USD.",
        "plan_basic": "Basic",
        "plan_smart": "Smart",
        "plan_business": "Business",
        "billed_monthly": "Billed monthly",
        "popular": "POPULAR",
        "one_time_analysis": "One-Time Analysis",
        "small_text": "Small Text",
        "medium_text": "Medium Text",
        "large_text": "Large Text",
        "up_to_2000": "Up to 2,000 characters",
        "up_to_5000": "Up to 5,000 characters",
        "up_to_10000": "Up to 10,000 characters",
        "buy_now": "Buy Now",
        "choose_plan": "Choose Plan",
        
        // Features
        "feature_1000_chars": "1,000 characters at once",
        "feature_3_daily": "3 analyses per day",
        "feature_basic_report": "Basic report",
        "feature_no_api": "API access",
        "feature_no_team": "Team access",
        "feature_5000_chars": "5,000 characters at once",
        "feature_10_daily": "10 analyses per day",
        "feature_detailed_report": "Detailed report",
        "feature_statistics": "Statistics",
        "feature_unlimited_chars": "Unlimited volume",
        "feature_unlimited_analysis": "Unlimited analyses",
        "feature_api_access": "API access (1,000/day)",
        "feature_team_access": "Team access (5 users)",
        "feature_priority_support": "Priority support",
        
        // Footer
        "footer_description": "Professional AI text detector for Europe. 99% accuracy.",
        "quick_links": "Quick Links",
        "legal": "Legal",
        "terms": "Terms of Service",
        "privacy": "Privacy Policy",
        "cookies": "Cookies",
        "refund": "Refund Policy",
        "contact": "Contact",
        "support_24_7": "24/7 Support",
        "europe_coverage": "Coverage across Europe",
        "copyright": "© 2024 AI PROOF. All rights reserved.",
        
        // Modals
        "login_to_account": "Login to Account",
        "email": "Email:",
        "password": "Password:",
        "login_button": "Login",
        "no_account": "No account?",
        "register_here": "Register here",
        "payment": "Payment",
        "processing": "Processing...",
        "success": "Success!",
        "error": "Error!",
        
        // Errors
        "error_empty_text": "Please enter text for analysis",
        "error_too_long": "Text is too long. Maximum 10,000 characters",
        "error_server": "Server error. Please try again later",
        "error_network": "Network error. Check your connection",
        
        // Success
        "success_analysis": "Analysis completed successfully!",
        "success_payment": "Payment successful!",
        "success_saved": "Report saved!",
        
        // Other
        "chars": "chars",
        "words": "words",
        "minutes": "min",
        "seconds": "sec"
    },
    
    pl: {
        // Polish translations (skrócone - tylko klucчеві фрази)
        "login": "Logowanie",
        "detector_title": "Detektor <span class='text-accent'>Tekstów AI</span>",
        "pricing_title": "Plany Cenowe",
        "plan_basic": "Podstawowy",
        "plan_smart": "Smart",
        "plan_business": "Biznesowy",
        "buy_now": "Kup Teraz"
    },
    
    de: {
        // German translations (skrócone)
        "login": "Anmelden",
        "detector_title": "AI-Text <span class='text-accent'>Detektor</span>",
        "pricing_title": "Preispläne",
        "plan_basic": "Basic",
        "plan_smart": "Smart",
        "plan_business": "Business",
        "buy_now": "Jetzt Kaufen"
    },
    
    fr: {
        // French translations (skrócone)
        "login": "Connexion",
        "detector_title": "Détecteur de <span class='text-accent'>Textes IA</span>",
        "pricing_title": "Tarifs",
        "plan_basic": "Basique",
        "plan_smart": "Smart",
        "plan_business": "Business",
        "buy_now": "Acheter"
    }
};

class LanguageManager {
    constructor() {
        this.currentLang = this.getSavedLanguage() || 'uk';
        this.initialize();
    }
    
    getSavedLanguage() {
        return localStorage.getItem('aiProofLang') || 
               (navigator.language.startsWith('uk') ? 'uk' : 
                navigator.language.startsWith('pl') ? 'pl' :
                navigator.language.startsWith('de') ? 'de' :
                navigator.language.startsWith('fr') ? 'fr' : 'en');
    }
    
    saveLanguage(lang) {
        localStorage.setItem('aiProofLang', lang);
        this.currentLang = lang;
    }
    
    initialize() {
        this.updatePageLanguage();
        this.setupEventListeners();
    }
    
    updatePageLanguage() {
        // Зміна атрибута lang в html
        document.documentElement.lang = this.currentLang;
        
        // Оновлення всіх елементів з data-translate
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key);
            
            if (translation) {
                if (element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                    element.value = translation;
                } else {
                    element.innerHTML = translation;
                }
            }
        });
        
        // Оновлення активних прапорців
        document.querySelectorAll('.language-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === this.currentLang) {
                btn.classList.add('border-2', 'border-accent');
                btn.classList.remove('border', 'border-gray-600');
            } else {
                btn.classList.remove('border-2', 'border-accent');
                btn.classList.add('border', 'border-gray-600');
            }
        });
        
        // Збереження в localStorage
        this.saveLanguage(this.currentLang);
        
        // Відправка події для інших модулів
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: this.currentLang }
        }));
    }
    
    getTranslation(key) {
        const langData = translations[this.currentLang];
        if (!langData) return translations['en'][key] || key;
        
        return langData[key] || translations['en'][key] || key;
    }
    
    translate(key, lang = this.currentLang) {
        const langData = translations[lang];
        return langData?.[key] || translations['en'][key] || key;
    }
    
    setupEventListeners() {
        // Кліки на прапорці
        document.querySelectorAll('.language-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                this.currentLang = lang;
                this.updatePageLanguage();
                
                // Анімація зміни
                btn.classList.add('animate-pulse');
                setTimeout(() => btn.classList.remove('animate-pulse'), 300);
            });
        });
        
        // Зміна мови при зміні селекту (якщо є)
        const langSelect = document.getElementById('languageSelect');
        if (langSelect) {
            langSelect.addEventListener('change', (e) => {
                this.currentLang = e.target.value;
                this.updatePageLanguage();
            });
        }
    }
    
    // Метод для динамічного перекладу (використовується в JS)
    t(key, params = {}) {
        let translation = this.getTranslation(key);
        
        // Заміна параметрів {param}
        Object.entries(params).forEach(([key, value]) => {
            translation = translation.replace(new RegExp(`{${key}}`, 'g'), value);
        });
        
        return translation;
    }
}

// Глобальний екземпляр
window.languageManager = new LanguageManager();

// Допоміжна функція для швидкого доступу
function t(key, params = {}) {
    return window.languageManager.t(key, params);
}

// Експорт для модулів
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LanguageManager, translations, t };
}
