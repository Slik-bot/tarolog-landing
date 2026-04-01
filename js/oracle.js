/* ═══ ORACLE CHAT — Webhook ═══ */

const ORACLE_WEBHOOK_URL = 'https://fenesotired.beget.app/webhook/oracle';
const ORACLE_MAX_QUESTIONS = 3;

function createOracleChat() {
  const overlay = document.createElement('div');
  overlay.className = 'oracle-overlay';
  overlay.id = 'oracleOverlay';
  overlay.innerHTML = `
    <div class="oracle-box">
      <div class="oracle-chat-header">
        <div class="oracle-chat-avatar">&#9883;</div>
        <div class="oracle-chat-info">
          <p class="oracle-chat-name">Елизавета</p>
          <p class="oracle-chat-sub">Помощница Аглаи</p>
        </div>
        <button class="oracle-chat-close" aria-label="Закрыть">&times;</button>
      </div>
      <div class="oracle-chat-counter">Осталось вопросов: <span id="oracleQLeft">${ORACLE_MAX_QUESTIONS}</span></div>
      <div class="oracle-chat-messages" id="oracleMessages">
        <div class="oracle-msg oracle-msg--bot">Здравствуй. Я Елизавета, помощница Аглаи. Ты можешь задать мне до трёх вопросов — о любви, отношениях, работе или том, что тревожит душу. Я постараюсь помочь тебе увидеть ситуацию глубже.</div>
        <div class="oracle-typing" id="oracleTyping"><span></span><span></span><span></span></div>
      </div>
      <div class="oracle-form-banner" id="oracleFormBanner">
        <p>Аглая сможет разобраться с твоей ситуацией глубже на личной сессии</p>
        <a href="#contact" id="oracleFormLink">Записаться на консультацию</a>
      </div>
      <div class="oracle-input-area" id="oracleInputArea">
        <textarea class="oracle-chat-input" id="oracleInput" rows="1" placeholder="Задай свой вопрос..."></textarea>
        <button class="oracle-chat-send" id="oracleSend">&#10148;</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  return overlay;
}

function addOracleMessage(text, role) {
  const messagesEl = document.getElementById('oracleMessages');
  const typing = document.getElementById('oracleTyping');
  const div = document.createElement('div');
  div.className = 'oracle-msg ' + (role === 'user' ? 'oracle-msg--user' : 'oracle-msg--bot');
  div.textContent = text;
  messagesEl.insertBefore(div, typing);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function setOracleTyping(show) {
  const typing = document.getElementById('oracleTyping');
  typing.style.display = show ? 'block' : 'none';
  const messagesEl = document.getElementById('oracleMessages');
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function showOracleFormBanner(closeFn) {
  const banner = document.getElementById('oracleFormBanner');
  const inputArea = document.getElementById('oracleInputArea');
  const counter = document.querySelector('.oracle-chat-counter');
  banner.style.display = 'block';
  inputArea.style.display = 'none';
  if (counter) counter.textContent = 'Продолжи работу с Аглаей лично';
  const link = document.getElementById('oracleFormLink');
  link.addEventListener('click', (e) => {
    e.preventDefault();
    closeFn();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  });
}

async function handleOracleSend(state, closeFn) {
  const input = document.getElementById('oracleInput');
  const sendBtn = document.getElementById('oracleSend');
  const text = input.value.trim();
  if (!text || state.count >= ORACLE_MAX_QUESTIONS) return;

  input.value = '';
  sendBtn.disabled = true;
  input.disabled = true;

  addOracleMessage(text, 'user');
  state.count++;
  const left = Math.max(0, ORACLE_MAX_QUESTIONS - state.count);
  document.getElementById('oracleQLeft').textContent = left;
  setOracleTyping(true);

  try {
    const res = await fetch(ORACLE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: state.sessionId,
        messages: state.messages,
        new_message: text,
      }),
    });
    const data = await res.json();
    const reply = data.content?.[0]?.text || data.reply || 'Звёзды молчат... Попробуй ещё раз.';
    setOracleTyping(false);
    addOracleMessage(reply, 'bot');
    state.messages.push({ role: 'user', content: text });
    state.messages.push({ role: 'assistant', content: reply });

    if (state.count >= ORACLE_MAX_QUESTIONS) {
      setTimeout(() => showOracleFormBanner(closeFn), 800);
    } else {
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
    }
  } catch {
    setOracleTyping(false);
    addOracleMessage('Связь с оракулом прервалась... Попробуй ещё раз.', 'bot');
    input.disabled = false;
    sendBtn.disabled = false;
  }
}

function bindOracleChatEvents(overlay, openFn, closeFn, state) {
  const btn = document.getElementById('oracleBtn');
  const closeBtn = overlay.querySelector('.oracle-chat-close');
  const sendBtn = document.getElementById('oracleSend');
  const input = document.getElementById('oracleInput');

  if (btn) btn.addEventListener('click', openFn);
  closeBtn.addEventListener('click', closeFn);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeFn(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeFn();
  });
  sendBtn.addEventListener('click', () => handleOracleSend(state, closeFn));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleOracleSend(state, closeFn);
    }
  });
}

function initOracle() {
  const state = {
    sessionId: 'session_' + Math.random().toString(36).substr(2, 9),
    messages: [],
    count: 0,
  };
  const overlay = createOracleChat();
  const openFn = () => { overlay.classList.add('open'); document.body.classList.add('modal-open'); };
  const closeFn = () => { overlay.classList.remove('open'); document.body.classList.remove('modal-open'); };
  bindOracleChatEvents(overlay, openFn, closeFn, state);
}

const startOracle = () => {
  initOracle();
  ['mousemove', 'touchstart', 'scroll'].forEach(evt =>
    document.removeEventListener(evt, startOracle)
  );
};
['mousemove', 'touchstart', 'scroll'].forEach(evt =>
  document.addEventListener(evt, startOracle, { once: true, passive: true })
);
