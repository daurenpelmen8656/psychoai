import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';

const LANGUAGES = {
  en: 'English', ru: 'Русский', kz: 'Қазақша',
  de: 'Deutsch', fr: 'Français', es: 'Español',
  zh: '中文', ar: 'العربية', tr: 'Türkçe', ja: '日本語', hi: 'हिन्दी'
};

const TRANSLATIONS = {
  en: {
    newChat: 'New Chat', today: 'Today', yesterday: 'Yesterday',
    settings: 'Settings', profile: 'Profile', games: 'Games',
    placeholder: 'Share what\'s on your mind…',
    welcome: 'Hello! I\'m your AI psychologist.',
    welcomeSub: 'I\'m here to listen, support and help you understand yourself better. What would you like to talk about?',
    theme: 'Theme', language: 'Language', fontSize: 'Font Size',
    light: 'Light', dark: 'Dark', accessible: 'Accessible',
    small: 'Small', medium: 'Medium', large: 'Large',
    send: 'Send', thinking: 'Thinking…',
    suggest1: 'I feel anxious lately', suggest2: 'Help me with stress',
    suggest3: 'I can\'t sleep well', suggest4: 'I feel lonely',
    logout: 'Log out', history: 'Chat History',
  },
  ru: {
    newChat: 'Новый чат', today: 'Сегодня', yesterday: 'Вчера',
    settings: 'Настройки', profile: 'Профиль', games: 'Игры',
    placeholder: 'Расскажите что вас беспокоит…',
    welcome: 'Привет! Я ваш ИИ-психолог.',
    welcomeSub: 'Я здесь чтобы слушать, поддерживать и помогать вам лучше понять себя. О чём хотите поговорить?',
    theme: 'Тема', language: 'Язык', fontSize: 'Размер шрифта',
    light: 'Светлая', dark: 'Тёмная', accessible: 'Для слабовидящих',
    small: 'Маленький', medium: 'Средний', large: 'Большой',
    send: 'Отправить', thinking: 'Думаю…',
    suggest1: 'Я чувствую тревогу', suggest2: 'Помоги со стрессом',
    suggest3: 'Я плохо сплю', suggest4: 'Я чувствую одиночество',
    logout: 'Выйти', history: 'История чатов',
  },
  kz: {
    newChat: 'Жаңа чат', today: 'Бүгін', yesterday: 'Кеше',
    settings: 'Параметрлер', profile: 'Профиль', games: 'Ойындар',
    placeholder: 'Не мазалайтынын айтыңыз…',
    welcome: 'Сәлем! Мен сіздің ЖИ психологыңызбын.',
    welcomeSub: 'Мен тыңдауға, қолдауға және өзіңізді жақсы түсінуге көмектесуге дайынмын.',
    theme: 'Тақырып', language: 'Тіл', fontSize: 'Қаріп өлшемі',
    light: 'Жарық', dark: 'Қараңғы', accessible: 'Нашар көретіндер үшін',
    small: 'Кіші', medium: 'Орта', large: 'Үлкен',
    send: 'Жіберу', thinking: 'Ойлауда…',
    suggest1: 'Мен алаңдаймын', suggest2: 'Стресске көмектес',
    suggest3: 'Ұйқым нашар', suggest4: 'Жалғыздық сезінемін',
    logout: 'Шығу', history: 'Чат тарихы',
  },
  de: {
    newChat: 'Neuer Chat', today: 'Heute', yesterday: 'Gestern',
    settings: 'Einstellungen', profile: 'Profil', games: 'Spiele',
    placeholder: 'Teile was dich beschäftigt…',
    welcome: 'Hallo! Ich bin dein KI-Psychologe.',
    welcomeSub: 'Ich bin hier um zuzuhören, zu unterstützen und dir zu helfen, dich besser zu verstehen.',
    theme: 'Thema', language: 'Sprache', fontSize: 'Schriftgröße',
    light: 'Hell', dark: 'Dunkel', accessible: 'Barrierefreiheit',
    small: 'Klein', medium: 'Mittel', large: 'Groß',
    send: 'Senden', thinking: 'Denke nach…',
    suggest1: 'Ich fühle mich ängstlich', suggest2: 'Hilf mir mit Stress',
    suggest3: 'Ich schlafe schlecht', suggest4: 'Ich fühle mich einsam',
    logout: 'Abmelden', history: 'Chatverlauf',
  },
  fr: {
    newChat: 'Nouveau chat', today: "Aujourd'hui", yesterday: 'Hier',
    settings: 'Paramètres', profile: 'Profil', games: 'Jeux',
    placeholder: 'Partagez ce qui vous préoccupe…',
    welcome: 'Bonjour! Je suis votre psychologue IA.',
    welcomeSub: 'Je suis ici pour écouter, soutenir et vous aider à mieux vous comprendre.',
    theme: 'Thème', language: 'Langue', fontSize: 'Taille de police',
    light: 'Clair', dark: 'Sombre', accessible: 'Accessibilité',
    small: 'Petit', medium: 'Moyen', large: 'Grand',
    send: 'Envoyer', thinking: 'Je réfléchis…',
    suggest1: 'Je me sens anxieux', suggest2: "Aidez-moi avec le stress",
    suggest3: 'Je dors mal', suggest4: 'Je me sens seul',
    logout: 'Déconnexion', history: 'Historique',
  },
  es: {
    newChat: 'Nuevo chat', today: 'Hoy', yesterday: 'Ayer',
    settings: 'Configuración', profile: 'Perfil', games: 'Juegos',
    placeholder: 'Comparte lo que te preocupa…',
    welcome: '¡Hola! Soy tu psicólogo IA.',
    welcomeSub: 'Estoy aquí para escuchar, apoyar y ayudarte a entenderte mejor.',
    theme: 'Tema', language: 'Idioma', fontSize: 'Tamaño de fuente',
    light: 'Claro', dark: 'Oscuro', accessible: 'Accesible',
    small: 'Pequeño', medium: 'Mediano', large: 'Grande',
    send: 'Enviar', thinking: 'Pensando…',
    suggest1: 'Me siento ansioso', suggest2: 'Ayúdame con el estrés',
    suggest3: 'Duermo mal', suggest4: 'Me siento solo',
    logout: 'Cerrar sesión', history: 'Historial',
  },
  zh: {
    newChat: '新对话', today: '今天', yesterday: '昨天',
    settings: '设置', profile: '个人资料', games: '游戏',
    placeholder: '分享您的想法…',
    welcome: '你好！我是您的AI心理咨询师。',
    welcomeSub: '我在这里倾听、支持并帮助您更好地了解自己。',
    theme: '主题', language: '语言', fontSize: '字体大小',
    light: '浅色', dark: '深色', accessible: '无障碍',
    small: '小', medium: '中', large: '大',
    send: '发送', thinking: '思考中…',
    suggest1: '我感到焦虑', suggest2: '帮我缓解压力',
    suggest3: '我睡眠不好', suggest4: '我感到孤独',
    logout: '退出', history: '聊天记录',
  },
  ar: {
    newChat: 'محادثة جديدة', today: 'اليوم', yesterday: 'أمس',
    settings: 'الإعدادات', profile: 'الملف الشخصي', games: 'الألعاب',
    placeholder: 'شارك ما يشغل بالك…',
    welcome: 'مرحباً! أنا طبيبك النفسي الذكاء الاصطناعي.',
    welcomeSub: 'أنا هنا للاستماع والدعم ومساعدتك على فهم نفسك بشكل أفضل.',
    theme: 'المظهر', language: 'اللغة', fontSize: 'حجم الخط',
    light: 'فاتح', dark: 'داكن', accessible: 'إمكانية الوصول',
    small: 'صغير', medium: 'متوسط', large: 'كبير',
    send: 'إرسال', thinking: 'أفكر…',
    suggest1: 'أشعر بالقلق', suggest2: 'ساعدني في التعامل مع الضغط',
    suggest3: 'نومي سيء', suggest4: 'أشعر بالوحدة',
    logout: 'تسجيل الخروج', history: 'سجل المحادثات',
  },
  tr: {
    newChat: 'Yeni Sohbet', today: 'Bugün', yesterday: 'Dün',
    settings: 'Ayarlar', profile: 'Profil', games: 'Oyunlar',
    placeholder: 'Aklınızdakileri paylaşın…',
    welcome: 'Merhaba! Ben yapay zeka psikologunuzum.',
    welcomeSub: 'Dinlemek, desteklemek ve kendinizi daha iyi anlamanıza yardımcı olmak için buradayım.',
    theme: 'Tema', language: 'Dil', fontSize: 'Yazı Boyutu',
    light: 'Açık', dark: 'Koyu', accessible: 'Erişilebilir',
    small: 'Küçük', medium: 'Orta', large: 'Büyük',
    send: 'Gönder', thinking: 'Düşünüyorum…',
    suggest1: 'Kendimi kaygılı hissediyorum', suggest2: 'Stresle başa çıkmama yardım et',
    suggest3: 'Uyku sorunum var', suggest4: 'Yalnız hissediyorum',
    logout: 'Çıkış Yap', history: 'Sohbet Geçmişi',
  },
  ja: {
    newChat: '新しいチャット', today: '今日', yesterday: '昨日',
    settings: '設定', profile: 'プロフィール', games: 'ゲーム',
    placeholder: '気になることを話してください…',
    welcome: 'こんにちは！私はあなたのAI心理士です。',
    welcomeSub: '聞いて、サポートして、自分自身をより良く理解するお手伝いをします。',
    theme: 'テーマ', language: '言語', fontSize: 'フォントサイズ',
    light: 'ライト', dark: 'ダーク', accessible: 'アクセシブル',
    small: '小', medium: '中', large: '大',
    send: '送信', thinking: '考え中…',
    suggest1: '不安を感じています', suggest2: 'ストレスを助けてください',
    suggest3: '眠れません', suggest4: '孤独を感じています',
    logout: 'ログアウト', history: 'チャット履歴',
  },
  hi: {
    newChat: 'नई बातचीत', today: 'आज', yesterday: 'कल',
    settings: 'सेटिंग्स', profile: 'प्रोफ़ाइल', games: 'खेल',
    placeholder: 'अपने मन की बात साझा करें…',
    welcome: 'नमस्ते! मैं आपका AI मनोवैज्ञानिक हूँ।',
    welcomeSub: 'मैं यहाँ सुनने, समर्थन करने और आपको खुद को बेहतर समझने में मदद करने के लिए हूँ।',
    theme: 'थीम', language: 'भाषा', fontSize: 'फ़ॉन्ट आकार',
    light: 'हल्का', dark: 'गहरा', accessible: 'सुलभ',
    small: 'छोटा', medium: 'मध्यम', large: 'बड़ा',
    send: 'भेजें', thinking: 'सोच रहा हूँ…',
    suggest1: 'मुझे चिंता हो रही है', suggest2: 'तनाव में मदद करो',
    suggest3: 'मुझे नींद नहीं आती', suggest4: 'मैं अकेला महसूस करता हूँ',
    logout: 'लॉग आउट', history: 'चैट इतिहास',
  },
};

const AI_RESPONSES = [
  "I hear you. That sounds really challenging. Can you tell me more about when you first started feeling this way?",
  "Thank you for sharing that with me. Your feelings are completely valid. Let's explore this together — what do you think triggered this?",
  "It takes courage to talk about this. I want you to know you're not alone. What would feel most helpful right now — to talk through what happened, or to focus on how you're feeling?",
  "That's a really important insight. Sometimes our emotions are trying to tell us something. What does this feeling remind you of from the past?",
  "I understand. It sounds like you've been carrying a lot. Let's take it one step at a time. What's the heaviest thing on your mind right now?",
];

const MOCK_HISTORY = [
  { id: 1, title: 'Anxiety at work', time: 'today' },
  { id: 2, title: 'Sleep problems', time: 'today' },
  { id: 3, title: 'Relationship stress', time: 'yesterday' },
  { id: 4, title: 'Self-confidence', time: 'yesterday' },
];

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState('light'); // light | dark | accessible
  const [lang, setLang] = useState('en');
  const [fontSize, setFontSize] = useState('medium');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(1);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const fontSizeMap = { small: '14px', medium: '16px', large: '19px' };

  // Load messages from Supabase on mount
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const userId = localStorage.getItem('mb_user_id') || 'anonymous';
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: true });
        
        if (!error && data && data.length > 0) {
          const loadedMessages = data.map(msg => ({
            id: msg.id,
            role: msg.role,
            text: msg.content,
            time: new Date(msg.created_at),
          }));
          setMessages(loadedMessages);
          setShowWelcome(false);
        }
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    loadMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text) => {
    const content = text || input.trim();
    if (!content) return;
    setInput('');
    setShowWelcome(false);

    const userMsg = { id: Date.now(), role: 'user', text: content, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    
    // Save user message to Supabase
    try {
      await supabase.from('messages').insert([
        {
          user_id: localStorage.getItem('mb_user_id') || 'anonymous',
          role: 'user',
          content: content,
          created_at: new Date(),
        }
      ]);
    } catch (error) {
      console.error('Error saving message:', error);
    }
    
    setIsTyping(true);

    setTimeout(() => {
      const aiText = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      const aiMsg = { id: Date.now() + 1, role: 'ai', text: aiText, time: new Date() };
      setIsTyping(false);
      setMessages(prev => [...prev, aiMsg]);
      
      // Save AI response to Supabase
      supabase.from('messages').insert([
        {
          user_id: localStorage.getItem('mb_user_id') || 'anonymous',
          role: 'ai',
          content: aiText,
          created_at: new Date(),
        }
      ]).catch(error => console.error('Error saving AI response:', error));
    }, 1500 + Math.random() * 1000);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setShowWelcome(true);
    setActiveChat(null);
  };

  const themeStyles = {
    light: {
      bg: '#F8FAFC', sidebar: '#FFFFFF', card: '#FFFFFF',
      text: '#1E293B', textSec: '#64748B', border: '#E2E8F0',
      input: '#FFFFFF', userBubble: 'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
      aiBubble: '#F1F5F9', aiText: '#1E293B',
    },
    dark: {
      bg: '#0F172A', sidebar: '#1E293B', card: '#1E293B',
      text: '#F1F5F9', textSec: '#94A3B8', border: '#334155',
      input: '#1E293B', userBubble: 'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
      aiBubble: '#334155', aiText: '#F1F5F9',
    },
    accessible: {
      bg: '#FFFBEB', sidebar: '#FFFFFF', card: '#FFFFFF',
      text: '#1A1A1A', textSec: '#444444', border: '#D4A017',
      input: '#FFFFFF', userBubble: '#1A1A1A',
      aiBubble: '#FEF3C7', aiText: '#1A1A1A',
    },
  };

  const s = themeStyles[theme];

  const styles = {
    root: {
      display: 'flex', height: '100vh', overflow: 'hidden',
      background: s.bg, color: s.text,
      fontFamily: "'Inter', sans-serif",
      fontSize: fontSizeMap[fontSize],
      transition: 'all 0.3s ease',
    },
    sidebar: {
      width: sidebarOpen ? '260px' : '0',
      minWidth: sidebarOpen ? '260px' : '0',
      background: s.sidebar,
      borderRight: `1px solid ${s.border}`,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
    },
    sidebarInner: {
      width: '260px', display: 'flex', flexDirection: 'column',
      height: '100%', padding: '16px',
    },
    main: {
      flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden',
    },
    topbar: {
      height: '60px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 20px',
      borderBottom: `1px solid ${s.border}`,
      background: s.sidebar,
    },
    messages: {
      flex: 1, overflowY: 'auto', padding: '24px 20px',
      display: 'flex', flexDirection: 'column', gap: '20px',
    },
    inputArea: {
      padding: '16px 20px',
      borderTop: `1px solid ${s.border}`,
      background: s.sidebar,
    },
    inputWrap: {
      display: 'flex', alignItems: 'flex-end', gap: '10px',
      background: s.input,
      border: `1.5px solid ${s.border}`,
      borderRadius: '16px', padding: '10px 14px',
      transition: 'border-color 0.2s',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    },
    textarea: {
      flex: 1, border: 'none', outline: 'none', resize: 'none',
      background: 'transparent', color: s.text,
      fontFamily: 'inherit', fontSize: 'inherit',
      lineHeight: '1.5', maxHeight: '120px',
    },
    sendBtn: {
      width: '36px', height: '36px', borderRadius: '10px',
      background: 'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
      border: 'none', cursor: 'pointer', color: 'white',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, transition: 'transform 0.15s, opacity 0.15s',
    },
    iconBtn: {
      background: 'none', border: 'none', cursor: 'pointer',
      color: s.textSec, padding: '8px', borderRadius: '8px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'background 0.2s',
      fontSize: '18px',
    },
    newChatBtn: {
      width: '100%', padding: '10px 14px', borderRadius: '10px',
      background: 'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
      color: 'white', border: 'none', cursor: 'pointer',
      fontWeight: '600', fontSize: '0.9rem',
      display: 'flex', alignItems: 'center', gap: '8px',
      justifyContent: 'center', marginBottom: '16px',
      transition: 'transform 0.15s, box-shadow 0.15s',
      boxShadow: '0 4px 14px rgba(74,108,247,0.4)',
    },
    historyItem: (active) => ({
      padding: '10px 12px', borderRadius: '10px', cursor: 'pointer',
      background: active ? 'linear-gradient(135deg,rgba(74,108,247,0.12),rgba(139,92,246,0.12))' : 'transparent',
      border: active ? '1px solid rgba(74,108,247,0.2)' : '1px solid transparent',
      transition: 'all 0.2s', marginBottom: '4px',
      color: s.text,
    }),
    settingsPanel: {
      position: 'fixed', top: '70px', right: '16px',
      background: s.card, border: `1px solid ${s.border}`,
      borderRadius: '16px', padding: '20px', width: '280px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
      zIndex: 200, animation: 'slideDown 0.2s ease',
    },
    langPanel: {
      position: 'fixed', top: '70px', right: '60px',
      background: s.card, border: `1px solid ${s.border}`,
      borderRadius: '16px', padding: '16px', width: '220px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
      zIndex: 200, animation: 'slideDown 0.2s ease',
      maxHeight: '360px', overflowY: 'auto',
    },
    themeBtn: (active) => ({
      flex: 1, padding: '8px', borderRadius: '8px', border: 'none',
      cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500',
      background: active ? 'linear-gradient(135deg,#4A6CF7,#8B5CF6)' : s.bg,
      color: active ? 'white' : s.textSec,
      transition: 'all 0.2s',
    }),
    welcomeBox: {
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px', textAlign: 'center',
      animation: 'fadeIn 0.6s ease',
    },
    aiAvatar: {
      width: '64px', height: '64px', borderRadius: '20px',
      background: 'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '28px', marginBottom: '20px',
      boxShadow: '0 8px 24px rgba(74,108,247,0.4)',
      animation: 'pulse 2s ease infinite',
    },
    suggests: {
      display: 'flex', flexWrap: 'wrap', gap: '10px',
      justifyContent: 'center', marginTop: '24px', maxWidth: '500px',
    },
    suggestBtn: {
      padding: '10px 16px', borderRadius: '20px',
      border: `1.5px solid ${s.border}`,
      background: s.card, color: s.text,
      cursor: 'pointer', fontSize: '0.85rem',
      transition: 'all 0.2s',
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(100,116,139,0.3); border-radius: 4px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { box-shadow: 0 8px 24px rgba(74,108,247,0.4); } 50% { box-shadow: 0 8px 32px rgba(139,92,246,0.6); } }
        @keyframes blink { 0%,100% { opacity: 0.3; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-4px); } }
        .msg-enter { animation: fadeIn 0.35s ease forwards; }
        .icon-btn:hover { background: rgba(74,108,247,0.1) !important; color: #4A6CF7 !important; }
        .new-chat-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(74,108,247,0.5) !important; }
        .history-item:hover { background: rgba(74,108,247,0.07) !important; }
        .send-btn:hover { transform: scale(1.1); }
        .suggest-btn:hover { border-color: #4A6CF7 !important; color: #4A6CF7 !important; background: rgba(74,108,247,0.06) !important; }
        @media (max-width: 768px) {
          .sidebar-wrap { position: fixed !important; z-index: 150; height: 100vh; box-shadow: 4px 0 20px rgba(0,0,0,0.15); }
          .overlay { display: block !important; }
          .welcome-title { font-size: 1.2rem !important; }
          .suggest-btn { font-size: 0.8rem !important; padding: 8px 12px !important; }
          .msg-bubble { max-width: 85% !important; }
          .settings-panel { right: 8px !important; left: 8px !important; width: auto !important; }
          .lang-panel { right: 8px !important; left: 8px !important; width: auto !important; }
        }
      `}</style>

      <div style={styles.root}>
        {/* OVERLAY for mobile */}
        <div
          className="overlay"
          onClick={() => setSidebarOpen(false)}
          style={{
            display: 'none', position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.4)', zIndex: 140,
          }}
        />

        {/* SIDEBAR */}
        <div className="sidebar-wrap" style={styles.sidebar}>
          <div style={styles.sidebarInner}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: '16px',
              }}>🧠</div>
              <span style={{ fontWeight: '700', fontSize: '1.1rem', color: s.text }}>MindBridge</span>
            </div>

            {/* New Chat */}
            <button className="new-chat-btn" style={styles.newChatBtn} onClick={startNewChat}>
              ✏️ {t.newChat}
            </button>

            {/* History */}
            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: s.textSec, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t.history}
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {['today', 'yesterday'].map(period => (
                <div key={period}>
                  <div style={{ fontSize: '0.72rem', color: s.textSec, padding: '8px 4px 4px', fontWeight: '500' }}>
                    {t[period]}
                  </div>
                  {MOCK_HISTORY.filter(h => h.time === period).map(item => (
                    <div
                      key={item.id}
                      className="history-item"
                      style={styles.historyItem(activeChat === item.id)}
                      onClick={() => { setActiveChat(item.id); setShowWelcome(false); }}
                    >
                      <div style={{ fontSize: '0.85rem', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        💬 {item.title}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Bottom nav */}
            <div style={{ borderTop: `1px solid ${s.border}`, paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { icon: '🎮', label: t.games, onClick: () => navigate('/games') },
                { icon: '👤', label: t.profile, onClick: () => navigate('/profile') },
                { icon: '🚪', label: t.logout, onClick: () => {
                  localStorage.removeItem('mb_user');
                  navigate('/');
                }},
              ].map(item => (
                <button key={item.label} onClick={item.onClick} style={{
                  ...styles.iconBtn, width: '100%', justifyContent: 'flex-start',
                  gap: '10px', fontSize: '0.9rem', color: s.text, borderRadius: '8px',
                }}>
                  <span>{item.icon}</span> {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div style={styles.main}>
          {/* TOPBAR */}
          <div style={styles.topbar}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button className="icon-btn" style={styles.iconBtn} onClick={() => setSidebarOpen(p => !p)}>
                ☰
              </button>
              <span style={{ fontWeight: '600', color: s.text }}>AI Psychologist</span>
            </div>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              {/* Language btn */}
              <button className="icon-btn" style={styles.iconBtn} onClick={() => { setLangOpen(p => !p); setSettingsOpen(false); }}>
                🌐
              </button>
              {/* Settings btn */}
              <button className="icon-btn" style={styles.iconBtn} onClick={() => { setSettingsOpen(p => !p); setLangOpen(false); }}>
                ⚙️
              </button>
            </div>
          </div>

          {/* SETTINGS PANEL */}
          {settingsOpen && (
            <div className="settings-panel" style={styles.settingsPanel}>
              <div style={{ fontWeight: '700', marginBottom: '16px', color: s.text }}>⚙️ {t.settings}</div>

              {/* Theme */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.8rem', color: s.textSec, marginBottom: '8px', fontWeight: '600' }}>{t.theme}</div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[['light', '☀️', t.light], ['dark', '🌙', t.dark], ['accessible', '👁', t.accessible]].map(([val, icon, label]) => (
                    <button key={val} style={styles.themeBtn(theme === val)} onClick={() => setTheme(val)}>
                      {icon} {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font size */}
              <div>
                <div style={{ fontSize: '0.8rem', color: s.textSec, marginBottom: '8px', fontWeight: '600' }}>{t.fontSize}</div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[['small', t.small], ['medium', t.medium], ['large', t.large]].map(([val, label]) => (
                    <button key={val} style={styles.themeBtn(fontSize === val)} onClick={() => setFontSize(val)}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* LANGUAGE PANEL */}
          {langOpen && (
            <div className="lang-panel" style={styles.langPanel}>
              <div style={{ fontWeight: '700', marginBottom: '12px', color: s.text }}>🌐 {t.language}</div>
              {Object.entries(LANGUAGES).map(([code, name]) => (
                <button key={code} onClick={() => { setLang(code); setLangOpen(false); }} style={{
                  width: '100%', padding: '9px 12px', borderRadius: '8px', border: 'none',
                  background: lang === code ? 'linear-gradient(135deg,rgba(74,108,247,0.15),rgba(139,92,246,0.15))' : 'transparent',
                  color: lang === code ? '#4A6CF7' : s.text,
                  cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem',
                  fontWeight: lang === code ? '600' : '400',
                  borderLeft: lang === code ? '3px solid #4A6CF7' : '3px solid transparent',
                  transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                  {lang === code && '✓ '}{name}
                </button>
              ))}
            </div>
          )}

          {/* MESSAGES / WELCOME */}
          {showWelcome ? (
            <div style={styles.welcomeBox}>
              <div style={styles.aiAvatar}>🧠</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: s.text, marginBottom: '10px' }}>
                {t.welcome}
              </h2>
              <p style={{ color: s.textSec, maxWidth: '440px', lineHeight: '1.6' }}>
                {t.welcomeSub}
              </p>
              <div style={styles.suggests}>
                {[t.suggest1, t.suggest2, t.suggest3, t.suggest4].map((sug, i) => (
                  <button key={i} className="suggest-btn" style={styles.suggestBtn} onClick={() => sendMessage(sug)}>
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={styles.messages}>
              {messages.map(msg => (
                <div key={msg.id} className="msg-enter" style={{
                  display: 'flex', gap: '10px', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-end',
                }}>
                  {msg.role === 'ai' && (
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0,
                      background: 'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px',
                    }}>🧠</div>
                  )}
                  <div style={{
                    maxWidth: '70%', padding: '12px 16px', borderRadius: '18px',
                    borderBottomLeftRadius: msg.role === 'ai' ? '4px' : '18px',
                    borderBottomRightRadius: msg.role === 'user' ? '4px' : '18px',
                    background: msg.role === 'user' ? styles.root.userBubble || 'linear-gradient(135deg,#4A6CF7,#8B5CF6)' : s.aiBubble,
                    backgroundImage: msg.role === 'user' ? 'linear-gradient(135deg,#4A6CF7,#8B5CF6)' : 'none',
                    color: msg.role === 'user' ? 'white' : s.aiText,
                    fontSize: '0.93rem', lineHeight: '1.6',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                  }}>
                    {msg.text}
                    <div style={{ fontSize: '0.72rem', opacity: 0.6, marginTop: '4px', textAlign: 'right' }}>
                      {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="msg-enter" style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '10px',
                    background: 'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px',
                  }}>🧠</div>
                  <div style={{
                    padding: '14px 18px', borderRadius: '18px', borderBottomLeftRadius: '4px',
                    background: s.aiBubble, display: 'flex', gap: '5px', alignItems: 'center',
                  }}>
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <div key={i} style={{
                        width: '7px', height: '7px', borderRadius: '50%',
                        background: '#94A3B8',
                        animation: `blink 1.2s ${delay}s ease infinite`,
                      }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* INPUT */}
          <div style={styles.inputArea}>
            <div style={styles.inputWrap}>
              <textarea
                ref={inputRef}
                rows={1}
                style={styles.textarea}
                placeholder={t.placeholder}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                onInput={e => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                }}
              />
              <button
                className="send-btn"
                style={{ ...styles.sendBtn, opacity: input.trim() ? 1 : 0.5 }}
                onClick={() => sendMessage()}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}