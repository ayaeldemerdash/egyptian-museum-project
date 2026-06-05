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

// الخطوة 1: تحديث التماثيل الـ 6 بالـ apiName و المسارات الصحيحة لتطابق السيرفر
const initialStatues = [
  { 
    id: '1', 
    name: 'Amenhotep II', 
    fullName: 'Amenhotep II',
    apiName: 'amenhotep_ii', 
    image: '/images/photo-1566214358736-df5a0048a9db.jpg',
    model_3d: '/images/amenhotep_ii.glb',
    description: 'Amenhotep II was a pharaoh of the 18th Dynasty, celebrated for his immense physical strength and military achievements. This statue captures the royal dignity and athletic build for which he was famous.',
    material: 'Quartzite',
    height: '150 cm',
    period: 'New Kingdom',
    dynasty: '18th Dynasty',
    tags: ['Pharaoh', 'Warrior', 'Athlete'],
    quick_facts: ['Known as the "Athlete King"', 'Son of Thutmose III', 'His tomb is KV35']
  },
  { 
    id: '2', 
    name: 'Cleopatra', 
    fullName: 'Cleopatra Bust',
    apiName: 'cleopatra_bust', 
    image: '/images/photo-1695902263765-9636769b5833.jpg',
    model_3d: '/images/cleopatra_bust.glb',
    description: 'The last active ruler of the Ptolemaic Kingdom of Egypt. This bust represents Cleopatra VII, a woman of great intelligence and political acumen who spoke multiple languages and navigated the complex world of Roman-Egyptian relations.',
    material: 'Marble',
    height: '55 cm',
    period: 'Ptolemaic Period',
    dynasty: 'Ptolemaic Dynasty',
    tags: ['Queen', 'Ptolemaic', 'Politics'],
    quick_facts: ['Last active ruler of the Ptolemaic Kingdom', 'Known for her intelligence and charisma', 'Fluent in multiple languages']
  },
  { 
    id: '3', 
    name: 'Ramesses II', 
    fullName: 'Ramesses II',
    apiName: 'colossal_bust_ramesses_ii_-_livestream_tutorial', 
    image: '/images/photo-1738935457671-76b950b9262e.jpg',
    model_3d: '/images/colossal_bust_ramesses_ii_-_livestream_tutorial.glb',
    description: 'Ramesses the Great, one of the most powerful pharaohs in history. This colossal bust showcases the idealized features of the king who ruled for 66 years and built more monuments than any other pharaoh.',
    material: 'Granite',
    height: '267 cm',
    period: 'New Kingdom',
    dynasty: '19th Dynasty',
    tags: ['Pharaoh', 'Great', 'Builder'],
    quick_facts: ['Often regarded as the greatest Pharaoh', 'Ruled for 66 years', 'Built Abu Simbel']
  },
  { 
    id: '4', 
    name: 'Khufu', 
    fullName: 'Khufu Statuette',
    apiName: 'ivory_statuette_of_khufu', 
    image: '/images/photo-1728739831383-d8a2cdc283cb.jpg',
    model_3d: '/images/ivory_statuette_of_khufu.glb',
    description: 'A tiny ivory statuette found at Abydos, representing Khufu wearing the Red Crown of Lower Egypt. While it is the most famous and widely accepted three-dimensional image of the Great Pyramid\'s builder, its small size (only 7.5 cm) contrasts sharply with the scale of his architectural achievements.',
    material: 'Ivory',
    height: '7.5 cm',
    period: 'Old Kingdom',
    dynasty: '4th Dynasty',
    tags: ['Pharaoh', 'Pyramid', 'Ivory'],
    quick_facts: ['Only surviving three-dimensional image of Khufu', 'Found at Abydos', 'Builder of the Great Pyramid','the most famous surviving small statuette']
  },
  { 
    id: '5', 
    name: 'King Djoser', 
    fullName: 'King Djoser',
    apiName: 'ka_statue_of_king_djoser', 
    image: '/images/photo-1637356216542-0d0a4e93f992.jpg',
    model_3d: '/images/ka_statue_of_king_djoser.glb',
    description: 'The Ka statue of Djoser was designed to house the pharaoh\'s spirit. Djoser is famous for commissioning the Step Pyramid at Saqqara, the first large-scale stone structure in history.',
    material: 'Limestone',
    height: '142 cm',
    period: 'Old Kingdom',
    dynasty: '3rd Dynasty',
    tags: ['Pharaoh', 'Ka', 'Step Pyramid'],
    quick_facts: ['Commissioned the Step Pyramid at Saqqara', 'First pyramid builder', 'His Ka statue was found in a serdab']
  },
  { 
    id: '6', 
    name: 'Thutmose III', 
    fullName: 'Thutmose III',
    apiName: 'thutmose_iii_statue_from_karnak_temple_egypt', 
    image: '/images/photo-1566214358736-df5a0048a9db.jpg',
    model_3d: '/images/thutmose_iii_statue_from_karnak_temple_egypt.glb',
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
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const [isTalking, setIsTalking] = useState(false);
  const sourceRef = useRef(null);
  const activeStatue = useMemo(() => statues.find(s => s.id === activeId) || statues[0], [activeId, statues]);

  const statueDetails = useMemo(() => {
    if (!activeStatue) return null;
    let modelUrl = activeStatue.model_3d;
    if (modelUrl && typeof modelUrl === 'string' && modelUrl.includes('pythonanywhere.com')) {
      modelUrl = `/api/proxy?url=${encodeURIComponent(modelUrl)}`;
    }
    return { ...activeStatue, model_3d: modelUrl };
  }, [activeStatue]);

  // الخطوة 9: تصفير حالة التحدث والأخطاء فوراً عند انتقال المستخدم لتمثال آخر
  useEffect(() => { 
    setModelError(false); 
    setIsTalking(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [activeId]);

  useEffect(() => {
    import('@google/model-viewer').then(() => {
      const viewer = modelViewerRef.current;
      if (viewer) {
        const handleCamera = () => {
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
 }, [activeId, activeStatue]);


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
            return apiMatch ? { ...local, ...apiMatch, id: local.id } : local;
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

  useEffect(() => {
    const unlockAudio = () => {
      const audio = new Audio();
      audio.play().catch(() => {});
    };
    document.addEventListener("click", unlockAudio, { once: true });
    return () => document.removeEventListener("click", unlockAudio);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);


  // 🔥 تحديث الدالة لتتوافق تماماً مع الخطوات (2، 3، 4، 5، 6، 7) لـ 6 تماثيل ديناميكية
  const handleSendQuestion = async (textOverride = null) => {
    const userMsg = textOverride || question;
    if (!userMsg.trim()) return;

    // الخطوة 3: عمل Reset وتحضير الأنيميشن والصوت قبل استقبال الرد الجديد
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsTalking(false);

    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setQuestion('');
    setIsTyping(true);

    try {
        // الخطوة 2: إرسال الـ apiName والـ ID المختار ديناميكياً إلى السيرفر
        const response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: userMsg,
                statue: statueDetails?.apiName, // إرسال apiName مثل amenhotep_ii
                statue_id: parseInt(activeId),
            }),
        });

        const data = await response.json();
        const aiText = data.response || "No response from AI";
        setMessages(prev => [...prev, { role: 'bot', text: aiText }]);

        const speakRes = await fetch("http://127.0.0.1:5000/speak", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: aiText }),
        });
        const speakData = await speakRes.json();

        if (speakData.audio_base64) {
            if (!audioRef.current) {
                audioRef.current = new Audio();
                audioRef.current.crossOrigin = "anonymous";
            }

            // الخطوة 4: مسح الـ source القديم لمنع تكرار الاتصال بالمتصفح
            sourceRef.current = null;

            // تعيين ملف الصوت القادم
            audioRef.current.src = "data:audio/mp3;base64," + speakData.audio_base64;

            // الخطوة 5: إنشاء اتصال جديد دائماً (NEW analyzer connection) لكل رد صوتي جديد
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContextRef.current = new AudioContext();
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 256;

            const source = audioContextRef.current.createMediaElementSource(audioRef.current);
            source.connect(analyserRef.current);
            analyserRef.current.connect(audioContextRef.current.destination);
            sourceRef.current = source; // تخزين الـ source الجديد

            if (audioContextRef.current.state === 'suspended') {
                await audioContextRef.current.resume();
            }

            try {
                setIsTalking(true);
                // الخطوة 6: تشغيل الصوت وبدء اللوب الخاصة بتحريك الفم (animateMouth) فوراً بعدها
                await audioRef.current.play();

                // 4. دالة الـ Animation Loop (المسؤولة عن الـ Lipsync)
                const freqData = new Uint8Array(analyserRef.current.frequencyBinCount);
                
                const loop = () => {
                    if (!audioRef.current || audioRef.current.paused || audioRef.current.ended) {
                        setIsTalking(false);
                        return;
                    }

                    analyserRef.current.getByteFrequencyData(freqData);
                    const volume = freqData.reduce((a, b) => a + b, 0) / freqData.length;
                    
                    const mouth = document.querySelector(`.${styles.mouthOverlay}`);
                    if (mouth) {
                        mouth.style.height = `${10 + volume / 4}px`; 
                        mouth.style.opacity = volume > 5 ? 1 : 0.3;
                    }

                    requestAnimationFrame(loop);
                };

                loop();

                // الخطوة 7: عند انتهاء تشغيل الصوت بالكامل، نرجع الفم لوضعه الساكن الأصلي
                audioRef.current.onended = () => {
                    setIsTalking(false);
                    const mouth = document.querySelector(`.${styles.mouthOverlay}`);
                    if (mouth) {
                        mouth.style.height = '10px';
                        mouth.style.opacity = '0.3';
                    }
                };
                
            } catch (err) {
                console.error("Audio play failed:", err);
                setIsTalking(false);
            }
        }
    } catch (err) {
        console.error("Chat error:", err);
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
    if (modelViewerRef.current) modelViewerRef.current.zoom(1);
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 50));
    if (modelViewerRef.current) modelViewerRef.current.zoom(-1);
  };

  const handleVoiceInput = () => {
    if (isListening) {
      wasStoppedManually.current = true;
      recognitionRef.current?.stop();
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMessages(prev => [...prev, { role: 'bot', text: "عذراً، متصفحك لا يدعم خاصية التعرف على الصوت. 🎙️" }]);
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
      transcriptRef.current = ''; 
    };

    recognition.onresult = (event) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setQuestion(currentTranscript);
      transcriptRef.current = currentTranscript;
    };

    recognition.onend = () => {
      setIsListening(false);
      if (transcriptRef.current.trim() && !wasStoppedManually.current) {
        handleSendQuestion(transcriptRef.current);
      }
      wasStoppedManually.current = false;
    };

    recognition.start();
  };

  return (
    <>
      <NavBar />
      <main className={styles.statuesMain}>
        <header className={styles.collectionHeader}>
          <h1 className={styles.collectionTitle}>STATUES COLLECTION</h1>
          <button 
            className={styles.bookTicketBtn} 
            onClick={() => window.open('https://visit-gem.com/en/AdmissionTkt', '_blank')}
          >
            <Ticket className={styles.ticketIcon} />
            <span>Book a Ticket</span>
          </button>
        </header>

        <section className={styles.statuesSection}>
          <div ref={sliderRef} className={styles.statuesContainer}>
            {statues.map((statue) => (
              <motion.button
                key={statue.id}
                onClick={() => setActiveId(statue.id)}
                className={styles.statueButton}
                whileHover={activeId === statue.id ? {} : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: activeId === statue.id ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <div className={`${styles.statueImageWrapper} ${activeId === statue.id ? styles.statueImageWrapperActive : ''}`}>
                  <img
                    src={statue.image || '/placeholder.svg'}
                    alt={statue.name}
                    className={styles.statueImage}
                    onError={(e) => { e.target.src = `https://picsum.photos/seed/${statue.name}/800/600`; }}
                  />
                </div>
                <span className={`${styles.statueName} ${activeId === statue.id ? styles.statueNameActive : ''}`}>
                  {statue.name}
                </span>
              </motion.button>
            ))}
          </div>
          <div className={styles.statuesAccentLine} />
        </section>

        <section className={styles.contentGrid}>
          {/* الخطوة 8: الحفاظ على الفم التفاعلي (mouthOverlay) بداخل الـ viewerDisplay تماماً متراكباً فوق الـ 3D Model */}
          <div className={styles.viewerCard}>
            <div className={styles.viewerHeader}><h2 className={styles.viewerTitle}>3D Model Viewer</h2></div>
            <div className={styles.viewerDisplay}>
              {statueDetails?.model_3d && !modelError ? (
                <model-viewer
                  ref={modelViewerRef}
                  src={statueDetails.model_3d}
                  alt={statueDetails.name}
                  camera-controls
                  shadow-intensity="1"
                  environment-image="neutral"
                  exposure="1"
                  interaction-prompt="none"
                  style={{ width: '100%', height: '100%', backgroundColor: '#ffffff' }}
                  camera-orbit={`${rotation}deg 75deg auto`}
                  onError={() => setModelError(true)}
                ></model-viewer>
              ) : (
                <img
                  src={activeStatue?.image}
                  alt={activeStatue?.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#ffffff' }}
                  onError={(e) => { e.target.src = `https://picsum.photos/seed/${activeStatue.name}/800/600`; }}
                />
              )}
              
              {/* طبقة الفم المتحركة مع التعديل المطلوب لـ CSS الانيميشن عند الحديث */}
              <div
                className={styles.mouthOverlay}
                style={{
                  animation: isTalking ? 'talk 0.15s infinite alternate' : 'none'
                }}
              ></div>
              
              <div className={styles.viewerOverlayTopLeft}>{zoom}%</div>
              <div className={styles.viewerOverlayTopRight}>{rotation}°</div>
            </div>

            <div className={styles.viewerControlsContainer}>
              <div className={styles.viewerActions}>
                <button className={styles.rotateBtn} onClick={handleRotateClick}>
                  <RotateCw className="w-3 h-3 mr-1" /><span>Rotate</span>
                </button>
                <button className={styles.zoomBtn} onClick={handleZoomIn}><ZoomIn className="w-4 h-4" /></button>
                <button className={styles.zoomBtn} onClick={handleZoomOut}><ZoomOut className="w-4 h-4" /></button>
              </div>
              <p className={styles.viewerCaption}>Use mouse to rotate and controls to zoom</p>
            </div>
          </div>

          <section className={styles.chatSection}>
            <div className={styles.chatHeader}>
              <h2 className={styles.chatTitle}>Ask About This Statue</h2>
              <button className={styles.quickFactsBtn} onClick={handleQuickFacts}>
                <Info className="w-4 h-4" /><span>Quick Facts</span>
              </button>
            </div>

            <div className={`${styles.chatMessagesContainer} custom-scrollbar`}>
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${styles.messageWrapper} ${msg.role === 'user' ? styles.userMessageWrapper : styles.botMessageWrapper}`}
                  >
                    <div className={`${styles.chatBubble} ${msg.role === 'user' ? styles.userBubble : ''}`}>
                      <p className={styles.chatText}>{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className={styles.botMessageWrapper}>
                    <div className={styles.chatBubble}>
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-[var(--egyptian-green)] rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-[var(--egyptian-green)] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-1.5 h-1.5 bg-[var(--egyptian-green)] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
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
                <button className={`${styles.micBtn} ${isListening ? styles.micBtnActive : ''}`} onClick={handleVoiceInput}>
                  <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
                </button>
                <button className={styles.sendBtn} onClick={() => handleSendQuestion()}>
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
                  <p className={styles.detailsSubtitle}>{statueDetails.dynasty} • {statueDetails.period}</p>
                </div>
                <div className={styles.detailsTags}>
                  {(statueDetails.tags || []).map((tag, i) => (
                    <span key={i} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}><span className={styles.infoLabel}>Material</span><span className={styles.infoValue}>{statueDetails.material}</span></div>
                <div className={styles.infoItem}><span className={styles.infoLabel}>Height</span><span className={styles.infoValue}>{statueDetails.height}</span></div>
                <div className={styles.infoItem}><span className={styles.infoLabel}>Period</span><span className={styles.infoValue}>{statueDetails.period}</span></div>
              </div>
              <p className={styles.detailsDescription}>{statueDetails.description}</p>
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