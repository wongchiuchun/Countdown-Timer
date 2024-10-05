import './index.css';
import { createCountdownWidget } from './countdownWidget';

// Create first countdown widget (24 hours)
createCountdownWidget({
  containerId: 'countdown-widget-1',
  initialConfig: {
    targetDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    message: '免費體驗後限時優惠$13,499',
    buttonText: '了解更多',
    buttonUrl: 'https://example.com',
    endMessage: '優惠已經結束!感謝你的支持!',
  },
});

// Create second countdown widget (48 hours)
createCountdownWidget({
  containerId: 'countdown-widget-2',
  initialConfig: {
    targetDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
    message: '限時特惠活動即將結束',
    buttonText: '立即購買',
    buttonUrl: 'https://example.com/shop',
    endMessage: '優惠已經結束!感謝你的支持!',
    backgroundColor: '#f0f0f0',
    textColor: '#333333',
    buttonColor: '#ff6600',
  },
});

// Create third countdown widget (5 seconds for demonstration)
createCountdownWidget({
  containerId: 'countdown-widget-3',
  initialConfig: {
    targetDate: new Date(Date.now() + 5 * 1000), // 5 seconds from now
    message: '快速倒數示範',
    buttonText: '點擊這裡',
    buttonUrl: 'https://example.com/demo',
    endMessage: '優惠已經結束!感謝你的支持!',
    backgroundColor: '#e6f7ff',
    textColor: '#0066cc',
    buttonColor: '#ff9900',
    buttonTextColor: '#ffffff',
  },
});