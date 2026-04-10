import React, { useState, useEffect, useMemo, useRef } from 'react';
import styles from './Status.module.css';
import NavBar from "../shared/NavBar";
import Footer from "../shared/Footer";
import { Ticket, Info, RotateCw, ZoomIn, ZoomOut, Mic, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");
const KNOWLEDGE_BASE_URL = 'https://khalid.pythonanywhere.com/media/knowledge_base.txt';
const STATUES_API_URL = 'https://yousrasakr.pythonanywhere.com/api/';

const initialStatues = [
  { 
    id: '1', 
    name: 'Sekhmet', 
    fullName: 'Sekhmet Statue',
    apiName: 'a_statue_of_sekhmet', 
    image: '/images/photo-1728739831383-d8a2cdc283cb.jpg',
    model_3d: 'https://yousrasakr.pythonanywhere.com/media/models_3d/a_statue_of_sekhmet.glb',
    description: 'A powerful lioness-headed goddess, daughter of Ra. This statue depicts Sekhmet seated, representing both her destructive power in war and her legendary healing abilities. Such statues were often placed in temples to protect the pharaoh.',
    material: 'Diorite / Granite',
    height: '210 cm',
    period: 'New Kingdom',
    dynasty: '18th Dynasty',
    tags: ['Goddess', 'Protection', 'Healing'],
    quick_facts: ['Sekhmet was the goddess of war and healing', 'Represented as a lioness', 'Found in the Temple of Mut']
  },
  { 
    id: '2', 
    name: 'Amenhotep II', 
    fullName: 'Amenhotep II',
    apiName: 'amenhotep_ii', 
    image: '/images/photo-1566214358736-df5a0048a9db.jpg',
    model_3d: 'public/images/amenhotep_ii.glb',
    description: 'Amenhotep II was a pharaoh of the 18th Dynasty, celebrated for his immense physical strength and military achievements. This statue captures the royal dignity and athletic build for which he was famous.',
    material: 'Quartzite',
    height: '150 cm',
    period: 'New Kingdom',
    dynasty: '18th Dynasty',
    tags: ['Pharaoh', 'Warrior', 'Athlete'],
    quick_facts: ['Known as the "Athlete King"', 'Son of Thutmose III', 'His tomb is KV35']
  },
  { 
    id: '3', 
    name: 'Cleopatra', 
    fullName: 'Cleopatra Bust',
    apiName: 'cleopatra_bust', 
    image: '/images/photo-1695902263765-9636769b5833.jpg',
    model_3d: 'public/images/cleopatra_bust.glb',
    description: 'The last active ruler of the Ptolemaic Kingdom of Egypt. This bust represents Cleopatra VII, a woman of great intelligence and political acumen who spoke multiple languages and navigated the complex world of Roman-Egyptian relations.',
    material: 'Marble',
    height: '55 cm',
    period: 'Ptolemaic Period',
    dynasty: 'Ptolemaic Dynasty',
    tags: ['Queen', 'Ptolemaic', 'Politics'],
    quick_facts: ['Last active ruler of the Ptolemaic Kingdom', 'Known for her intelligence and charisma', 'Fluent in multiple languages']
  },
  { 
    id: '4', 
    name: 'Ramesses II', 
    fullName: 'Ramesses II',
    apiName: 'colossal_bust_ramesses_ii_-_livestream_tutorial', 
    image: '/images/photo-1738935457671-76b950b9262e.jpg',
    model_3d: 'public/images/colossal_bust_ramesses_ii_-_livestream_tutorial.glb',
    description: 'Ramesses the Great, one of the most powerful pharaohs in history. This colossal bust showcases the idealized features of the king who ruled for 66 years and built more monuments than any other pharaoh.',
    material: 'Granite',
    height: '267 cm',
    period: 'New Kingdom',
    dynasty: '19th Dynasty',
    tags: ['Pharaoh', 'Great', 'Builder'],
    quick_facts: ['Often regarded as the greatest Pharaoh', 'Ruled for 66 years', 'Built Abu Simbel']
  },
  { 
    id: '5', 
    name: 'Khufu', 
    fullName: 'Khufu Statuette',
    apiName: 'ivory_statuette_of_khufu', 
    image: '/images/photo-1728739831383-d8a2cdc283cb.jpg',
    model_3d: 'public/images/ivory_statuette_of_khufu.glb',
    description: 'A tiny ivory statuette found at Abydos, representing Khufu wearing the Red Crown of Lower Egypt. While it is the most famous and widely accepted three-dimensional image of the Great Pyramid\'s builder, its small size (only 7.5 cm) contrasts sharply with the scale of his architectural achievements.',
    material: 'Ivory',
    height: '7.5 cm',
    period: 'Old Kingdom',
    dynasty: '4th Dynasty',
    tags: ['Pharaoh', 'Pyramid', 'Ivory'],
    quick_facts: ['Only surviving three-dimensional image of Khufu', 'Found at Abydos', 'Builder of the Great Pyramid','the most famous surviving small statuette']
  },
  { 
    id: '6', 
    name: 'King Djoser', 
    fullName: 'King Djoser',
    apiName: 'ka_statue_of_king_djoser', 
    image: '/images/photo-1637356216542-0d0a4e93f992.jpg',
    model_3d: 'public/images/ka_statue_of_king_djoser.glb',
    description: 'The Ka statue of Djoser was designed to house the pharaoh\'s spirit. Djoser is famous for commissioning the Step Pyramid at Saqqara, the first large-scale stone structure in history.',
    material: 'Limestone',
    height: '142 cm',
    period: 'Old Kingdom',
    dynasty: '3rd Dynasty',
    tags: ['Pharaoh', 'Ka', 'Step Pyramid'],
    quick_facts: ['Commissioned the Step Pyramid at Saqqara', 'First pyramid builder', 'His Ka statue was found in a serdab']
  },
  { 
    id: '7', 
    name: 'Khafre', 
    fullName: 'Khafre Seated',
    apiName: 'seated_statue_of_khafre', 
    image: 'public/images/imagee.webp',
    model_3d: 'https://yousrasakr.pythonanywhere.com/media/models_3d/seated_statue_of_khafre.glb',
    description: 'A masterpiece of Old Kingdom sculpture, depicting Khafre seated on his throne. The Horus falcon perches behind his head, spreading its wings in a gesture of divine protection over the king.',
    material: 'Anorthosite Gneiss',
    height: '168 cm',
    period: 'Old Kingdom',
    dynasty: '4th Dynasty',
    tags: ['Pharaoh', 'Horus', 'Protection'],
    quick_facts: ['Builder of the second largest pyramid at Giza', 'Protected by the Horus falcon', 'Found in the Valley Temple']
  },
  { 
    id: '8', 
    name: 'Amun & Horemheb', 
    fullName: 'Amun & Horemheb',
    apiName: 'statue_of_amun_and_horemheb', 
    image: '/images/photo-1695902263765-9636769b5833.jpg',
    model_3d: 'https://yousrasakr.pythonanywhere.com/media/models_3d/statue_of_amun_and_horemheb.glb',
    description: 'This statue shows the pharaoh Horemheb seated beside the god Amun. It symbolizes the divine legitimacy of Horemheb\'s reign after the Amarna period, showing the king as the chosen of the gods.',
    material: 'Granite',
    height: '190 cm',
    period: 'New Kingdom',
    dynasty: '18th Dynasty',
    tags: ['Pharaoh', 'God', 'Legitimacy'],
    quick_facts: ['Horemheb was the last pharaoh of the 18th dynasty', 'Depicts the king with the god Amun', 'Symbolizes divine approval of kingship']
  },
  { 
    id: '9', 
    name: 'Hatshepsut', 
    fullName: 'Hatshepsut',
    apiName: 'statue_of_hatshepsut', 
    image: '/images/photo-1728739831383-d8a2cdc283cb.jpg',
    model_3d: 'https://yousrasakr.pythonanywhere.com/media/models_3d/statue_of_hatshepsut_1akBmid.glb',
    description: 'Hatshepsut was one of the most successful pharaohs, ruling for over 20 years. This statue depicts her with the traditional regalia of a pharaoh, asserting her authority as a legitimate ruler of Egypt.',
    material: 'Indurated Limestone',
    height: '195 cm',
    period: 'New Kingdom',
    dynasty: '18th Dynasty',
    tags: ['Queen', 'Pharaoh', 'Trade'],
    quick_facts: ['One of the few female pharaohs', 'Established major trade routes', 'Built Deir el-Bahari']
  },
  { 
    id: '10', 
    name: 'Thutmose III', 
    fullName: 'Thutmose III',
    apiName: 'thutmose_iii_statue_from_karnak_temple_egypt', 
    image: '/images/photo-1566214358736-df5a0048a9db.jpg',
    model_3d: 'public/images/thutmose_iii_statue_from_karnak_temple_egypt.glb',
    description: 'Thutmose III, the great conqueror who expanded Egypt\'s borders to their maximum extent. This statue from Karnak shows the pharaoh in a classic pose of royal authority and strength.',
    material: 'Basalt',
    height: '200 cm',
    period: 'New Kingdom',
    dynasty: '18th Dynasty',
    tags: ['Pharaoh', 'Empire', 'Conqueror'],
    quick_facts: ['The "Napoleon of Egypt"', 'Great military strategist', 'Expanded the empire to its greatest extent']
  },
];


export default function Status() {
  const [statues, setStatues] = useState(initialStatues);
  const [activeId, setActiveId] = useState('2');
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [aiKnowledge, setAiKnowledge] = useState("");
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [modelError, setModelError] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const wasStoppedManually = useRef(false);
  const transcriptRef = useRef('');
  const sliderRef = useRef(null);
  const chatEndRef = useRef(null);
  const modelViewerRef = useRef(null);

  const activeStatue = useMemo(() => statues.find(s => s.id === activeId) || statues[0], [activeId, statues]);

  const statueDetails = useMemo(() => {
    if (!activeStatue) return null;
    let modelUrl = activeStatue.model_3d;
    if (modelUrl && typeof modelUrl === 'string' && modelUrl.includes('pythonanywhere.com')) {
      modelUrl = `/api/proxy?url=${encodeURIComponent(modelUrl)}`;
    }
    return { ...activeStatue, model_3d: modelUrl };
  }, [activeStatue]);

  useEffect(() => { setModelError(false); }, [activeId]);

  useEffect(() => {
    import('@google/model-viewer').then(() => {
      const viewer = modelViewerRef.current;
      if (viewer) {
        const handleCamera = (event) => {
          const orbit = viewer.getCameraOrbit();
          const theta = (orbit.theta * 180) / Math.PI;
          setRotation(Math.round(theta % 360));
        };
        viewer.addEventListener('camera-change', handleCamera);
        return () => viewer.removeEventListener('camera-change', handleCamera);
      }
    }).catch(err => {
      console.error("Failed to load model-viewer:", err);
    });
  }, []);

  useEffect(() => {
    if (activeStatue) {
      setMessages([{
        role: 'bot',
        text: `أهلاً بك في رحاب الحضارة المصرية القديمة! 🏛️ أنا مرشدك السياحي الذكي، يسعدني جداً مساعدتك في اكتشاف أسرار ${activeStatue.fullName || activeStatue.name}. ما الذي تود معرفته اليوم؟`
      }]);
    }
  }, [activeId]);

  useEffect(() => {
    const fetchKnowledge = async () => {
      if (!KNOWLEDGE_BASE_URL) return;
      try {
        const proxiedUrl = `/api/proxy?url=${encodeURIComponent(KNOWLEDGE_BASE_URL)}`;
        const response = await fetch(proxiedUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.text();
        setAiKnowledge(data);
      } catch (error) {
        console.error('Error fetching AI knowledge:', error);
      }
    };
    fetchKnowledge();
  }, []);

  useEffect(() => {
    const fetchStatues = async () => {
      try {
        const proxiedApiUrl = `/api/proxy?url=${encodeURIComponent(STATUES_API_URL)}`;
        const response = await fetch(proxiedApiUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        if (Array.isArray(data)) {
          const mergedStatues = initialStatues.map(local => {
            const apiMatch = data.find(api => 
              api.id?.toString() === local.id?.toString() || 
              api.name?.toLowerCase() === local.name?.toLowerCase()
            );
            if (apiMatch) {
              return {
                ...local,
                ...apiMatch,
                id: local.id
              };
            }
            return local;
          });

          data.forEach(api => {
            const exists = mergedStatues.some(m => 
              m.id?.toString() === api.id?.toString() || 
              m.name?.toLowerCase() === api.name?.toLowerCase()
            );
            if (!exists) {
              mergedStatues.push({
                ...api,
                id: api.id?.toString() || Math.random().toString(36).substr(2, 9)
              });
            }
          });

          setStatues(mergedStatues);
        }
      } catch (error) {
        console.error('Error fetching statues from API:', error);
      }
    };
    fetchStatues();
  }, []);


  const handleSendQuestion = async (directMsg = null) => {
    if (isListening && !directMsg) {
      wasStoppedManually.current = false;
      recognitionRef.current?.stop();
      setIsListening(false);
    }

    const msgToSend = (typeof directMsg === 'string' ? directMsg : null) || question;
    if (!msgToSend.trim()) return;

    const userMsg = msgToSend;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setQuestion('');
    setIsTyping(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        setMessages(prev => [...prev, { role: 'bot', text: "عذراً، مفتاح API الخاص بـ Gemini غير متوفر. يرجى إعداده في الإعدادات." }]);
        return;
      }
      
      const response = await ai.models.generateContentStream({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: {
          systemInstruction: `You are a professional and engaging Museum Guide at the Grand Egyptian Museum. 
          Your tone is historical, respectful, and captivating. 
          
          Statue Context:
          - Name: ${statueDetails?.fullName || statueDetails?.name || 'this Ancient Egyptian statue'}
          - Material: ${statueDetails?.material || 'unknown'}
          - Period: ${statueDetails?.period || 'Ancient Egypt'}
          - Dynasty: ${statueDetails?.dynasty || 'unknown'}
          - Description: ${statueDetails?.description || ''}
          
          CRITICAL KNOWLEDGE BASE:
          ${aiKnowledge || 'No specific knowledge base provided yet.'}
          
          INSTRUCTIONS:
          1. ALWAYS prioritize the information provided in the "CRITICAL KNOWLEDGE BASE" above.
          2. If the answer is in the knowledge base, use it as your primary source.
          3. If the knowledge base doesn't contain the answer, use your general historical knowledge about Ancient Egypt to provide a helpful response.
          4. Never use the word "undefined".
          5. Keep the answer concise but immersive.
          6. Use a welcoming tone as if you are standing right next to the visitor.
          7. Respond in the same language as the user's question (Arabic or English).`
        }
      });
      
      let fullResponse = '';
      setMessages(prev => [...prev, { role: 'bot', text: '' }]);
      
      for await (const chunk of response) {
        const chunkText = chunk.text;
        fullResponse += chunkText;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = fullResponse;
          return newMessages;
        });
      }
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'bot', text: "عذراً، واجهت مشكلة في الاتصال بأرشيف المتحف حالياً. يرجى المحاولة مرة أخرى." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickFacts = () => {
    if (statueDetails && statueDetails.quick_facts) {
      const factsText = statueDetails.quick_facts
        .map((fact, i) => `${i + 1}. ${typeof fact === 'string' ? fact : fact.fact}`)
        .join('\n');
      
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: `Here are some quick facts about ${statueDetails.name}:\n\n${factsText}` 
      }]);
    }
  };

  const handleCameraChange = (event) => {
    const orbit = event.target.getCameraOrbit();
    const theta = (orbit.theta * 180) / Math.PI;
    setRotation(Math.round(theta % 360));
  };

  const handleRotateClick = () => {
    const newRotation = (rotation + 30) % 360;
    setRotation(newRotation);
    if (modelViewerRef.current) {
      const orbit = modelViewerRef.current.getCameraOrbit();
      modelViewerRef.current.cameraOrbit = `${newRotation}deg ${orbit.phi}rad ${orbit.radius}m`;
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 200));
    if (modelViewerRef.current) {
      modelViewerRef.current.zoom(1.1);
    }
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 50));
    if (modelViewerRef.current) {
      modelViewerRef.current.zoom(0.9);
    }
  };

  const handleVoiceInput = () => {
    if (isListening) {
      wasStoppedManually.current = true;
      recognitionRef.current?.stop();
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: "عذراً، متصفحك لا يدعم خاصية التعرف على الصوت. 🎙️" 
      }]);
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'ar-EG'; 
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onstart = () => {
      setIsListening(true);
      wasStoppedManually.current = false;
      transcriptRef.current = question; 
    };

    recognition.onresult = (event) => {
      let newTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        newTranscript += event.results[i][0].transcript;
      }
      const fullText = transcriptRef.current + (transcriptRef.current ? ' ' : '') + newTranscript;
      setQuestion(fullText);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      wasStoppedManually.current = false;
      if (event.error !== 'no-speech') {
        setMessages(prev => [...prev, { 
          role: 'bot', 
          text: "حدث خطأ أثناء محاولة تسجيل الصوت. يرجى المحاولة مرة أخرى." 
        }]);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      setQuestion(prev => {
        if (prev.trim()) {
          handleSendQuestion(prev);
        }
        return '';
      });
      wasStoppedManually.current = false;
      transcriptRef.current = '';
    };

    recognition.start();
  };

  return (
    <>
      <NavBar />
      <main className={styles.statuesMain}>
        {/* Collection Header Section (Ticket Booking) */}
        <header className={styles.collectionHeader}>
          <h1 className={styles.collectionTitle}>STATUES COLLECTION</h1>
          <button className={styles.bookTicketBtn}>
            <Ticket className={styles.ticketIcon} />
            <span>Book a Ticket</span>
          </button>
        </header>

        {/* Slider Section */}
        <section className={styles.statuesSection}>
          <div ref={sliderRef} className={styles.statuesContainer}>
            {statues.map((statue) => (
              <motion.button
                key={statue.id}
                onClick={() => setActiveId(statue.id)}
                className={styles.statueButton}
                whileHover={activeId === statue.id ? {} : { 
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  scale: activeId === statue.id ? 1.1 : 1,
                  y: 0
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 30
                }}
              >
                <div
                  className={`${styles.statueImageWrapper} ${
                    activeId === statue.id ? styles.statueImageWrapperActive : ''
                  }`}
                  style={{
                    borderWidth: '4px', 
                  }}
                >
                  <img
                    src={statue.image || '/placeholder.svg'}
                    alt={statue.name}
                    className={styles.statueImage}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.target.src = `https://picsum.photos/seed/${statue.name}/800/600`;
                    }}
                  />
                </div>
                <span
                  className={`${styles.statueName} ${activeId === statue.id ? styles.statueNameActive : ''}`}
                >
                  {statue.name}
                </span>
              </motion.button>
            ))}
          </div>
          <div className={styles.statuesAccentLine} />
        </section>

        {/* Content Grid */}
        <section className={styles.contentGrid}>
          <div className={styles.viewerCard}>
            <div className={styles.viewerHeader}>
              <h2 className={styles.viewerTitle}>3D Model Viewer</h2>
            </div>

            <div className={styles.viewerDisplay}>
              {statueDetails?.model_3d && !modelError ? (
                <model-viewer
                  ref={modelViewerRef}
                  src={statueDetails.model_3d}
                  alt={statueDetails.name}
                  auto-rotate
                  camera-controls
                  shadow-intensity="1"
                  environment-image="neutral"
                  exposure="1"
                  loading="lazy"
                  reveal="auto"
                  ar
                  ar-modes="webxr scene-viewer quick-look"
                  interaction-prompt="auto"
                  style={{ width: '100%', height: '100%', backgroundColor: '#ffffff' }}
                  camera-orbit={`${rotation}deg 75deg auto`}
                  onError={() => setModelError(true)}
                ></model-viewer>
              ) : activeStatue?.image ? (
                <img
                  src={activeStatue.image}
                  alt={activeStatue.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#ffffff' }}
                  onError={(e) => {
                    e.target.src = `https://picsum.photos/seed/${activeStatue.name}/800/600`;
                  }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-white p-8 text-center">
                  <div className="w-12 h-12 border-4 border-[var(--egyptian-gold)] border-t-transparent rounded-full animate-spin mb-4"></div>
                </div>
              )}
              
              <div className={styles.viewerOverlayTopLeft}>
                {zoom}%
              </div>
              
              <div className={styles.viewerOverlayTopRight}>
                {rotation}°
              </div>
            </div>

            <div className={styles.viewerControlsContainer}>
              <div className={styles.viewerActions}>
                <button className={styles.rotateBtn} onClick={handleRotateClick}>
                  <RotateCw className="w-3 h-3 mr-1" />
                  <span>Rotate</span>
                </button>
                <button className={styles.zoomBtn} onClick={handleZoomIn}>
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button className={styles.zoomBtn} onClick={handleZoomOut}>
                  <ZoomOut className="w-4 h-4" />
                </button>
              </div>
              <p className={styles.viewerCaption}>Use controls to rotate and zoom the model</p>
            </div>
          </div>

          <section className={styles.chatSection}>
            <div className={styles.chatHeader}>
              <h2 className={styles.chatTitle}>Ask About This Statue</h2>
              <button className={styles.quickFactsBtn} onClick={handleQuickFacts}>
                <Info className="w-4 h-4" />
                <span>Quick Facts</span>
              </button>
            </div>

            <div className={`${styles.chatMessagesContainer} custom-scrollbar`}>
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`${styles.messageWrapper} ${msg.role === 'user' ? styles.userMessageWrapper : styles.botMessageWrapper}`}
                  >
                    <div className={`${styles.chatBubble} ${msg.role === 'user' ? styles.userBubble : ''}`}>
                      <p className={styles.chatText}>{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={styles.botMessageWrapper}
                  >
                    <div className={styles.chatBubble}>
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-[var(--egyptian-green)] rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-[var(--egyptian-green)] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-1.5 h-1.5 bg-[var(--egyptian-green)] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </AnimatePresence>
            </div>

            <div className={styles.chatInputWrapper}>
              <div className={styles.chatInputBar}>
                <input
                  type="text"
                  placeholder="Ask a question..."
                  className={styles.chatInputField}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendQuestion()}
                />
                <button 
                  className={`${styles.micBtn} ${isListening ? styles.micBtnActive : ''}`} 
                  onClick={handleVoiceInput}
                >
                  <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
                </button>
                <button className={styles.sendBtn} onClick={handleSendQuestion}>
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className={styles.chatCaption}>Type your question or use voice input</p>
            </div>
          </section>
        </section>

        {statueDetails && (
          <>
            <section className={styles.detailsCard}>
              <div className={styles.detailsHeader}>
                <div>
                  <h2 className={styles.detailsMainTitle}>{statueDetails.fullName || statueDetails.name}</h2>
                  <p className={styles.detailsSubtitle}>
                    {statueDetails.dynasty} • {statueDetails.period}
                  </p>
                </div>
                <div className={styles.detailsTags}>
                  {(statueDetails.tags || []).map((tag, i) => (
                    <span key={i} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Material</span>
                  <span className={styles.infoValue}>{statueDetails.material}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Height</span>
                  <span className={styles.infoValue}>{statueDetails.height}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Period</span>
                  <span className={styles.infoValue}>{statueDetails.period}</span>
                </div>
              </div>

              <p className={styles.detailsDescription}>
                {statueDetails.description}
              </p>
            </section>

            <section className={styles.quickFactsSection}>
              <div className={styles.quickFactsTitleGroup}>
                <Info size={20} className={styles.infoIcon} />
                <h2 className={styles.quickFactsTitle}>Quick Facts</h2>
              </div>
              <ul className={styles.factsList}>
                {(statueDetails.quick_facts || []).map((fact, i) => (
                  <li key={i} className={styles.factItem}>
                    <span className={styles.factDot} />
                    <span>{typeof fact === 'string' ? fact : fact.fact}</span>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
