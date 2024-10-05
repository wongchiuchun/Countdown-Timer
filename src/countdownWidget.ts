import './countdownWidget.css';

interface CountdownWidgetOptions {
  containerId: string;
  initialConfig?: Partial<CountdownConfig>;
}

interface CountdownConfig {
  targetDate: Date;
  message: string;
  buttonText: string;
  buttonUrl: string;
  position: 'static' | 'floating-top' | 'floating-bottom';
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
  endMessage: string;
}

const defaultConfig: CountdownConfig = {
  targetDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
  message: '免費體驗後限時優惠$13,499',
  buttonText: '了解更多',
  buttonUrl: 'https://example.com',
  position: 'static',
  backgroundColor: '#ffffff',
  textColor: '#000000',
  buttonColor: '#0066cc',
  buttonTextColor: '#ffffff',
  endMessage: '優惠已經結束!感謝你的支持!',
};

export function createCountdownWidget(options: CountdownWidgetOptions): void {
  const container = document.getElementById(options.containerId);
  if (!container) return;

  let config: CountdownConfig = { ...defaultConfig, ...options.initialConfig };

  // Generate a unique ID for this instance
  const instanceId = `countdown_${Math.random().toString(36).substr(2, 9)}`;

  // Load or set the target date for this instance
  const storedTargetDate = localStorage.getItem(`countdownTargetDate_${instanceId}`);
  if (storedTargetDate) {
    config.targetDate = new Date(storedTargetDate);
  } else {
    localStorage.setItem(`countdownTargetDate_${instanceId}`, config.targetDate.toISOString());
  }

  function renderWidget() {
    const widgetHtml = `
      <div class="countdown-widget" style="background-color: ${config.backgroundColor}; color: ${config.textColor};">
        <p class="message">${config.message}</p>
        <div class="timer">
          <div class="time-block">
            <span class="days">00</span>
            <span class="label">日</span>
          </div>
          <div class="time-block">
            <span class="hours">00</span>
            <span class="label">時</span>
          </div>
          <div class="time-block">
            <span class="minutes">00</span>
            <span class="label">分</span>
          </div>
          <div class="time-block">
            <span class="seconds">00</span>
            <span class="label">秒</span>
          </div>
        </div>
        <a href="${config.buttonUrl}" class="cta-button" style="background-color: ${config.buttonColor}; color: ${config.buttonTextColor};">${config.buttonText}</a>
      </div>
      <button class="config-toggle">⚙️</button>
      <div class="config-panel" style="display: none;">
        <h3>Countdown Configuration</h3>
        <label>
          End Date:
          <input type="datetime-local" id="targetDate_${instanceId}" value="${config.targetDate.toISOString().slice(0, 16)}">
        </label>
        <label>
          Message:
          <input type="text" id="message_${instanceId}" value="${config.message}">
        </label>
        <label>
          End Message:
          <input type="text" id="endMessage_${instanceId}" value="${config.endMessage}">
        </label>
        <label>
          Button Text:
          <input type="text" id="buttonText_${instanceId}" value="${config.buttonText}">
        </label>
        <label>
          Button URL:
          <input type="url" id="buttonUrl_${instanceId}" value="${config.buttonUrl}">
        </label>
        <label>
          Position:
          <select id="position_${instanceId}">
            <option value="static" ${config.position === 'static' ? 'selected' : ''}>Static</option>
            <option value="floating-top" ${config.position === 'floating-top' ? 'selected' : ''}>Floating Top</option>
            <option value="floating-bottom" ${config.position === 'floating-bottom' ? 'selected' : ''}>Floating Bottom</option>
          </select>
        </label>
        <label>
          Background Color:
          <input type="color" id="backgroundColor_${instanceId}" value="${config.backgroundColor}">
        </label>
        <label>
          Text Color:
          <input type="color" id="textColor_${instanceId}" value="${config.textColor}">
        </label>
        <label>
          Button Color:
          <input type="color" id="buttonColor_${instanceId}" value="${config.buttonColor}">
        </label>
        <label>
          Button Text Color:
          <input type="color" id="buttonTextColor_${instanceId}" value="${config.buttonTextColor}">
        </label>
        <button id="applyConfig_${instanceId}">Apply Changes</button>
      </div>
    `;

    container.innerHTML = widgetHtml;
    updatePosition();
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = config.targetDate.getTime() - now;

    if (distance < 0) {
      container.innerHTML = `
        <div class="countdown-over" style="background-color: ${config.backgroundColor}; color: ${config.textColor};">
          <div class="emoji">🎉</div>
          <p class="message">${config.endMessage}</p>
        </div>
      `;
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    container.querySelector('.days').textContent = days.toString().padStart(2, '0');
    container.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
    container.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
    container.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
  }

  function updatePosition() {
    container.className = `countdown-container ${config.position}`;
  }

  function initEventListeners() {
    const configToggle = container.querySelector('.config-toggle');
    const configPanel = container.querySelector('.config-panel');
    const applyConfigButton = container.querySelector(`#applyConfig_${instanceId}`);

    configToggle.addEventListener('click', () => {
      configPanel.style.display = configPanel.style.display === 'none' ? 'block' : 'none';
    });

    applyConfigButton.addEventListener('click', () => {
      config = {
        ...config,
        targetDate: new Date(container.querySelector<HTMLInputElement>(`#targetDate_${instanceId}`).value),
        message: container.querySelector<HTMLInputElement>(`#message_${instanceId}`).value,
        endMessage: container.querySelector<HTMLInputElement>(`#endMessage_${instanceId}`).value,
        buttonText: container.querySelector<HTMLInputElement>(`#buttonText_${instanceId}`).value,
        buttonUrl: container.querySelector<HTMLInputElement>(`#buttonUrl_${instanceId}`).value,
        position: container.querySelector<HTMLSelectElement>(`#position_${instanceId}`).value as CountdownConfig['position'],
        backgroundColor: container.querySelector<HTMLInputElement>(`#backgroundColor_${instanceId}`).value,
        textColor: container.querySelector<HTMLInputElement>(`#textColor_${instanceId}`).value,
        buttonColor: container.querySelector<HTMLInputElement>(`#buttonColor_${instanceId}`).value,
        buttonTextColor: container.querySelector<HTMLInputElement>(`#buttonTextColor_${instanceId}`).value,
      };
      localStorage.setItem(`countdownTargetDate_${instanceId}`, config.targetDate.toISOString());
      renderWidget();
      initEventListeners();
    });
  }

  renderWidget();
  initEventListeners();
  setInterval(updateCountdown, 1000);
}