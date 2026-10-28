import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  PhoneCall, 
  Mail, 
  SendHorizontal, 
  ArrowUpRight,
  PackageCheck,
  Globe2,
  TrendingUp,
  FileText
} from 'lucide-react';
import { sendContactMessage } from '../lib/contactService';

import { useLanguage } from '../context/LanguageContext';

interface QuickOption {
  label: string;
  value: string;
  category?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  type?: 'text' | 'contact_card' | 'order_summary';
  text?: string;
  timestamp: string;
  options?: QuickOption[];
}

interface OrderState {
  step: 'GREETING' | 'NICHE' | 'METRICS' | 'PACKAGE_SELECTION' | 'ORDER_DETAILS' | 'CLOSED';
  niche?: string;
  metricType?: 'DA40' | 'DR70' | 'GENERAL' | 'EDU_GEO';
  selectedPackage?: string;
  targetUrl?: string;
  targetKeywords?: string;
  language: 'id' | 'en' | 'km';
}

export const Chatbot: React.FC = () => {
  const { language: siteLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [orderState, setOrderState] = useState<OrderState>({
    step: 'NICHE',
    language: siteLanguage === 'km' ? 'km' : siteLanguage === 'id' ? 'id' : 'en',
  });

  // Sync state if user changes global site language
  useEffect(() => {
    setOrderState((prev) => ({
      ...prev,
      language: siteLanguage === 'km' ? 'km' : siteLanguage === 'id' ? 'id' : 'en',
    }));
  }, [siteLanguage]);

  const initialMessages: Message[] = [
    {
      id: 'sarah-intro',
      sender: 'bot',
      text: siteLanguage === 'km'
        ? "👋 សួស្តី! ខ្ញុំគឺ **Sarah**, Senior Technical Sales Director នៅ Nexalogic។\n\nខ្ញុំគ្រប់គ្រងបណ្តាញ **12,000+ premium aged domains** (PBNs, EDUs & Guest Posts) ជាមួយនឹងការគ្រប់គ្រង Outbound Link យ៉ាងហ្មត់ចត់។\n\nដើម្បីទទួលបានកម្លាំង Ranking ខ្ពស់បំផុត តើគេហទំព័ររបស់អ្នកស្ថិតក្នុង **Niche អ្វីដែរ?** *(យើងទទួល Casino, Crypto, E-commerce, Gray & General)*"
        : siteLanguage === 'id'
        ? "👋 Halo! Saya **Sarah**, Senior Technical Sales Director di Nexalogic.\n\nSaya mengelola private network **12.000+ domain berumur premium** (PBN, EDU & Guest Post) dengan kontrol link keluar yang ketat.\n\nUntuk mendongkrak peringkat website Anda, **apa niche website Anda saat ini?** *(Kami menerima Casino, Slot, Crypto, Gray, dan General)*"
        : "👋 Hi! I'm **Sarah**, Senior Technical Sales Director at Nexalogic.\n\nI manage our private network of **12,000+ premium aged domains** (high-authority PBNs, EDUs & curated guest posts) with strict outbound link control.\n\nTo get you the optimal ranking power, **what niche is your website in?** *(We accept Casino, Crypto, E-commerce, Gray, & General niches)*",
      timestamp: formatTime(),
      options: [
        { label: 'Casino / iGaming / Betting', value: 'Casino / iGaming' },
        { label: 'Crypto / Forex / Finance', value: 'Crypto / Finance' },
        { label: 'General / Tech / Affiliate', value: 'General Affiliate / Tech' },
        { label: 'Other / Gray Niche', value: 'Gray Niche / Custom' },
      ],
    },
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, open]);

  // Detect language helper (supports English, Indonesian, and Khmer)
  const detectLanguage = (text: string): 'id' | 'en' | 'km' => {
    // Khmer Unicode range: \u1780-\u17FF
    if (/[\u1780-\u17FF]/.test(text) || text.toLowerCase().includes('khmer') || text.toLowerCase().includes('cambodia')) {
      return 'km';
    }
    const idKeywords = ['halo', 'hai', 'bosku', 'gan', 'kak', 'harga', 'berapa', 'jual', 'bisa', 'mau', 'link', 'diskon', 'apakah', 'pagi', 'siang', 'malam'];
    const lower = text.toLowerCase();
    const hasId = idKeywords.some((w) => new RegExp(`\\b${w}\\b`, 'i').test(lower));
    return hasId ? 'id' : 'en';
  };

  const handleSend = async (userQuery: string) => {
    const textToSend = userQuery.trim();
    if (!textToSend || isSending) return;

    const detectedLang = detectLanguage(textToSend);
    const activeLang = (detectedLang === 'km' || orderState.language === 'km')
      ? 'km'
      : (orderState.language === 'id' || detectedLang === 'id')
      ? 'id'
      : 'en';

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: formatTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsSending(true);

    // Forward interaction inquiry automatically to sales inbox sales@nexalogic.site
    try {
      const emailFound = extractEmail(textToSend);
      if (emailFound || textToSend.length > 25 || orderState.step === 'ORDER_DETAILS') {
        sendContactMessage({
          name: 'Sarah Chat Lead',
          email: emailFound || 'sales-lead@nexalogic.site',
          message: `[Live Sarah Chat] Step: ${orderState.step} | Lang: ${activeLang}\nMessage: ${textToSend}`,
          source: 'Live Chat with Sarah',
        }).catch((err) => console.warn('Email auto-dispatch log:', err));
      }
    } catch (e) {
      console.warn('Logging silent fail', e);
    }

    setTimeout(() => {
      processSarahResponse(textToSend, activeLang);
      setIsSending(false);
    }, 550);
  };

  const processSarahResponse = (text: string, lang: 'id' | 'en' | 'km') => {
    const lower = text.toLowerCase();
    const isIndo = lang === 'id';
    const isKhmer = lang === 'km';

    // 1. OBJECTION: Full Domain List Request
    if (
      lower.includes('domain list') ||
      lower.includes('list domain') ||
      lower.includes('lihat list') ||
      lower.includes('daftar domain') ||
      lower.includes('full list') ||
      lower.includes('all domains') ||
      lower.includes('show domains')
    ) {
      const replyText = isKhmer
        ? "ដើម្បីការពារបណ្តាញ និងអតិថិជនពី footprint របស់ Google យើងមិនដែលចែករំលែក Database ទាំង 12,000 domains ជាសាធារណៈឡើយ។\n\nទោះជាយ៉ាងណា ខ្ញុំអាចផ្ញើ **Sample Batch 3–5 URLs** ជូនអ្នកដើម្បីពិនិត្យផ្ទៀងផ្ទាត់ Ahrefs & Moz ដោយខ្លួនឯង។ តើអ្នកចង់មើល Sample ដែរឬទេ?"
        : isIndo
        ? "Untuk melindungi network dan klien kami dari footprint Google, kami tidak pernah membagikan database full 12,000 domain secara terbuka bosku.\n\nTapi tenang, saya bisa kirimkan **sample batch 3–5 URL** agar bosku bisa cek langsung metrik Ahrefs & Moz-nya sendiri. Mau saya siapkan sample-nya kak?"
        : "To protect our network and our clients from Google footprints, we never share the full database. However, I can send you a **sample batch of 3–5 URLs** so you can verify the Ahrefs and Moz metrics yourself.\n\nWould you like to review a sample batch?";

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: replyText,
          timestamp: formatTime(),
          options: [
            { label: isIndo ? 'Ya, kirimkan sample 3-5 URL' : 'Yes, show me sample batch', value: 'Send me a 3-5 sample batch' },
            { label: isIndo ? 'Lanjut pilih paket' : 'Show package options', value: 'Show package options' },
          ],
        },
      ]);
      return;
    }

    // 2. OBJECTION: Discount / Bulk Pricing
    if (
      lower.includes('discount') ||
      lower.includes('diskon') ||
      lower.includes('murah') ||
      lower.includes('cheaper') ||
      lower.includes('nego') ||
      lower.includes('best price')
    ) {
      const replyText = isIndo
        ? "Rate wholesale kami sudah dipotong maksimal khusus agency fulfillment gan. Tapi kalau bosku order **500+ link**, saya bisa langsung hubungkan dengan Admin kami untuk custom bulk pricing spesial."
        : "Our wholesale rates are already heavily discounted for agency fulfillment. However, if you are ordering **500+ links**, I can connect you directly with our Admin for customized bulk pricing.";

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: replyText,
          timestamp: formatTime(),
          options: [
            { label: isIndo ? 'Hubungi Admin via Telegram' : 'Contact Admin for 500+ Links', value: 'I need bulk pricing for 500+ links' },
            { label: isIndo ? 'Lihat paket standar' : 'View standard packages', value: 'Show standard packages' },
          ],
        },
      ]);
      return;
    }

    // 3. OBJECTION: Indexation
    if (
      lower.includes('index') ||
      lower.includes('indeks') ||
      lower.includes('indexation') ||
      lower.includes('crawl') ||
      lower.includes('terindeks')
    ) {
      const replyText = isIndo
        ? "Tingkat indeksasi kami konsisten di **95%+** bosku. Kami menggunakan sistem drip-feed bertahap yang alami dan indexer premium berbayar bila diperlukan."
        : "We maintain a verified **95%+ indexation rate**. We drip-feed the links naturally and deploy premium indexers to ensure safe, solid crawling.";

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: replyText,
          timestamp: formatTime(),
          options: [
            { label: isIndo ? 'Lanjut ke pemilihan paket' : 'Select backlink package', value: 'Select backlink package' },
          ],
        },
      ]);
      return;
    }

    // 4. OBJECTION / QUESTION: Ranking Guarantee
    if (
      lower.includes('guarantee page 1') ||
      lower.includes('garansi page 1') ||
      lower.includes('jaminan ranking') ||
      lower.includes('rank 1') ||
      lower.includes('page 1') ||
      lower.includes('garansi ranking')
    ) {
      const replyText = isIndo
        ? "Kami tidak memberikan janji palsu garansi Page 1 instan, karena ranking Google juga dipengaruhi oleh on-page SEO dan intensitas kompetisi bosku. Namun kami menyuplai **kekuatan metrik DR/DA riil** & link equity terbersih untuk mendorong lonjakan otoritas website Anda."
        : "We never guarantee Page 1 rankings as search algorithms depend heavily on your on-page optimization, content depth, and competitor strength. What we provide is verified high-metric power, clean anchors, and pristine authority to push your domain up.";

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: replyText,
          timestamp: formatTime(),
        },
      ]);
      return;
    }

    // 5. ESCALATION: Angry / Payment issue / Telegram admin request
    if (
      lower.includes('complain') ||
      lower.includes('komplain') ||
      lower.includes('refund') ||
      lower.includes('admin') ||
      lower.includes('human') ||
      lower.includes('problem') ||
      lower.includes('error') ||
      lower.includes('transfer')
    ) {
      const replyText = isIndo
        ? "Baik bosku, untuk bantuan prioritas transaksi, kendala, atau konsultasi partnership langsung, silakan langsung hubungi Admin kami di Telegram **@smartlinker786** atau email **sales@nexalogic.site**."
        : "Understood. For immediate priority billing support, custom partnerships, or personal assistance, please reach out directly to our Admin on Telegram **@smartlinker786** or via **sales@nexalogic.site**.";

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: replyText,
          timestamp: formatTime(),
        },
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          type: 'contact_card',
          timestamp: formatTime(),
        },
      ]);
      return;
    }

    // 6. REQUEST ALL PRICES
    if (
      lower.includes('all price') ||
      lower.includes('all prices') ||
      lower.includes('semua harga') ||
      lower.includes('full pricelist') ||
      lower.includes('price list') ||
      lower.includes('daftar harga')
    ) {
      const replyText = isIndo
        ? "📋 **Katalog Lengkap Nexalogic ($1 = Rp 15.000):**\n\n**TIER 1: GENERAL & NICHE**\n• General Blogpost: 100 links = $15 (Rp 225.000)\n• General Blogroll: 100 links = $20 (Rp 300.000)\n• Spam/Gray Niche Blogpost: 100 links = $20 (Rp 300.000)\n• Spam/Gray Niche Blogroll: 100 links = $25 (Rp 375.000)\n\n**TIER 2: HIGH METRIC (DA/DR)**\n• High DA Blogpost: 100 links = $25 (Rp 375.000)\n• High DR Blogpost: 100 links = $30 (Rp 450.000)\n• DA/DR 90+ Blogpost: 100 links = $80 (Rp 1.200.000)\n• Premium DR70 Blogpost: 100 links = $60 (Rp 900.000)\n\n**TIER 3: PREMIUM COUNTRY & EDU**\n• .co.uk / .us / .ca / .nl / .fr: 100 links = $60 (Rp 900.000)\n• ID General Blogpost: 100 links = $50 (Rp 750.000)\n• ID Premium Blogpost: 100 links = $80 (Rp 1.200.000)\n• EDU Blogpost: 100 links = $70 (Rp 1.050.000)\n• EDU Comment: 100 links = $15 (Rp 225.000)\n\nPaket mana yang ingin bosku ambil?"
        : "📋 **Nexalogic Wholesale Pricing Overview:**\n\n**TIER 1: GENERAL & NICHE SITES**\n• General Blogpost: 100 links = $15\n• General Blogroll: 100 links = $20\n• Spam/Gray Niche Blogpost: 100 links = $20\n• Spam/Gray Niche Blogroll: 100 links = $25\n\n**TIER 2: HIGH METRIC (DA/DR)**\n• High DA Blogpost: 100 links = $25\n• High DR Blogpost: 100 links = $30\n• DA/DR 90+ Blogpost: 100 links = $80\n• Premium DR70 Blogpost: 100 links = $60\n\n**TIER 3: PREMIUM GEO & EDU**\n• .co.uk / .us / .ca / .nl / .fr: 100 links = $60\n• ID General Blogpost: 100 links = $50\n• ID Premium Blogpost: 100 links = $80\n• EDU Blogpost: 100 links = $70\n• EDU Comment: 100 links = $15\n\nWhich package fits your target campaign?";

      setOrderState((prev) => ({ ...prev, language: lang, step: 'PACKAGE_SELECTION' }));
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: replyText,
          timestamp: formatTime(),
          options: [
            { label: 'High DR Blogpost ($30)', value: 'High DR Blogpost: 100 links = $30' },
            { label: 'Premium DR70 Blogpost ($60)', value: 'Premium DR70 Blogpost: 100 links = $60' },
            { label: 'DA/DR 90+ Blogpost ($80)', value: 'DA/DR 90+ Blogpost: 100 links = $80' },
            { label: 'General Blogpost ($15)', value: 'General Blogpost: 100 links = $15' },
          ],
        },
      ]);
      return;
    }

    // 7. STEP 4: ORDER DETAILS PROVIDED (Target Website URL & Keywords)
    const hasUrl = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-z]{2,})/i.test(text);
    if (orderState.step === 'ORDER_DETAILS' || (hasUrl && (orderState.selectedPackage || lower.includes('keyword') || lower.includes('anchor')))) {
      setOrderState((prev) => ({ ...prev, step: 'CLOSED' }));

      // Dispatch order details directly to sales@nexalogic.site
      sendContactMessage({
        name: 'Confirmed Buyer via Sarah',
        email: extractEmail(text) || 'buyer-order@nexalogic.site',
        message: `[CONFIRMED ORDER]\nPackage: ${orderState.selectedPackage || 'Custom Package Selected'}\nClient Details:\n${text}`,
        source: 'Sarah 4-Step Closing System',
      }).catch((e) => console.warn(e));

      const closingReply = isIndo
        ? "Mantap bosku! Rincian pesanan sudah saya catat.\n\nSilakan kirimkan detail pesanan dan preferensi pembayaran bosku ke Admin kami **@smartlinker786** via Telegram atau email **sales@nexalogic.site** untuk finalisasi penempatan dan proses backlink sekarang juga!"
        : "Perfect. Please send your details and payment preference to our Admin **@smartlinker786** on Telegram or **sales@nexalogic.site** to finalize the placement!";

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: closingReply,
          timestamp: formatTime(),
        },
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          type: 'contact_card',
          timestamp: formatTime(),
        },
      ]);
      return;
    }

    // 8. 4-STEP CLOSING FLOW STEP MACHINE

    // Current State: NICHE -> Transition to METRICS (STEP 1: QUALIFY)
    if (orderState.step === 'NICHE' || orderState.step === 'GREETING') {
      const nicheDetected = text;
      setOrderState((prev) => ({
        ...prev,
        niche: nicheDetected,
        step: 'METRICS',
        language: lang,
      }));

      const reply = isIndo
        ? `Sip bosku, untuk niche **${nicheDetected}** kami punya inventory dengan authority terkuat.\n\nApakah bosku mencari network **DA/DR 40+** standar, atau network **premium DR 70+ / DA 90+** kami?`
        : `Understood. For the **${nicheDetected}** space, link power and outbound link control are paramount.\n\nAre you looking for **DA/DR 40+** or our **premium 70+ network**?`;

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: reply,
          timestamp: formatTime(),
          options: [
            { label: 'DA/DR 40+ Network', value: 'Looking for DA/DR 40+' },
            { label: 'Premium 70+ / DA90 Network', value: 'Looking for Premium 70+' },
            { label: isIndo ? 'EDU & Regional (.id / .us)' : 'EDU & Country (.co.uk/.us/EDU)', value: 'Interested in EDU / Country' },
          ],
        },
      ]);
      return;
    }

    // Current State: METRICS -> Transition to QUOTE (STEP 2: QUOTE 2 TARGETED OPTIONS)
    if (orderState.step === 'METRICS') {
      let option1 = '';
      let option2 = '';
      let replyIntro = '';

      if (lower.includes('70') || lower.includes('90') || lower.includes('premium')) {
        setOrderState((prev) => ({ ...prev, metricType: 'DR70', step: 'PACKAGE_SELECTION', language: lang }));
        if (isIndo) {
          replyIntro = 'Untuk mendongkrak keyword kompetitif di niche ini, ini 2 opsi premium terbaik kami:';
          option1 = '• **Premium DR70 Blogpost**: 100 links = $60 (Rp 900.000)\n  (Metrik DR 70+ asli, dofollow, clean anchor)';
          option2 = '• **DA/DR 90+ Blogpost**: 100 links = $80 (Rp 1.200.000)\n  (Kekuatan link equity maksimal tier teratas)';
        } else {
          replyIntro = 'To dominate competitive terms with maximum link equity, here are our 2 best high-tier options:';
          option1 = '• **Premium DR70 Blogpost**: 100 links = $60\n  (Verified DR 70+, permanent dofollow, controlled outbound profile)';
          option2 = '• **DA/DR 90+ Blogpost**: 100 links = $80\n  (Top-tier search authority for steep keyword climbs)';
        }
      } else if (lower.includes('edu') || lower.includes('country') || lower.includes('geo')) {
        setOrderState((prev) => ({ ...prev, metricType: 'EDU_GEO', step: 'PACKAGE_SELECTION', language: lang }));
        if (isIndo) {
          replyIntro = 'Untuk authority institusi dan trust signal tinggi, kami rekomendasikan:';
          option1 = '• **EDU Blogpost**: 100 links = $70 (Rp 1.050.000)';
          option2 = '• **ID Premium Blogpost**: 100 links = $80 (Rp 1.200.000)';
        } else {
          replyIntro = 'For institution-grade trust signals and regional dominance:';
          option1 = '• **EDU Blogpost**: 100 links = $70 (High authority institutional placement)';
          option2 = '• **Country / GEO Blogpost (.co.uk/.us/.ca)**: 100 links = $60 (Targeted geo relevance)';
        }
      } else {
        setOrderState((prev) => ({ ...prev, metricType: 'DA40', step: 'PACKAGE_SELECTION', language: lang }));
        if (isIndo) {
          replyIntro = 'Untuk skala volume dan cost-efficiency terbaik, ini 2 rekomendasi paket kami:';
          option1 = '• **High DA Blogpost**: 100 links = $25 (Rp 375.000)\n  (DA 40+ verified Moz authority)';
          option2 = '• **High DR Blogpost**: 100 links = $30 (Rp 450.000)\n  (DR 40-50+ Ahrefs verified)';
        } else {
          replyIntro = 'For high volume link velocity and balanced cost efficiency, here are 2 targeted recommendations:';
          option1 = '• **High DA Blogpost**: 100 links = $25 (100 links, DA 40+ verified Moz metrics)';
          option2 = '• **High DR Blogpost**: 100 links = $30 (100 links, DR 40-50+ verified Ahrefs metrics)';
        }
      }

      const promptQuestion = isIndo
        ? 'Mana dari kedua opsi ini yang paling pas dengan target ranking bosku?'
        : 'Which of these 2 options fits your ranking goal best?';

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: `${replyIntro}\n\n${option1}\n\n${option2}\n\n${promptQuestion}`,
          timestamp: formatTime(),
          options: [
            { label: 'Option 1', value: option1.split('\n')[0].replace('• ', '') },
            { label: 'Option 2', value: option2.split('\n')[0].replace('• ', '') },
            { label: isIndo ? 'Tampilkan semua harga' : 'Show all prices', value: 'Show all prices' },
          ],
        },
      ]);
      return;
    }

    // Current State: PACKAGE_SELECTION -> Transition to STEP 4: CLOSE & ORDER DETAILS
    if (orderState.step === 'PACKAGE_SELECTION') {
      const selected = text;
      setOrderState((prev) => ({
        ...prev,
        selectedPackage: selected,
        step: 'ORDER_DETAILS',
        language: lang,
      }));

      const reply = isIndo
        ? `Pilihan yang mantap bosku! Kami akan kunci paket **${selected}** untuk campaign Anda.\n\nUntuk memulai setup penempatan, silakan berikan:\n1. **Target Website URL**\n2. **Target Keywords (Anchor Text)**\n3. **Paket yang Dipilih** *(sudah tercatat: ${selected})*\n\nBisa langsung ketik di sini atau kirimkan via form di bawah!`
        : `Excellent choice. I have reserved **${selected}** for your campaign.\n\nTo initiate the placement workflow, please provide exactly:\n1. **Target Website URL**\n2. **Target Keywords (Anchor Text)**\n3. **Package Selected** *(Recorded: ${selected})*\n\nPlease reply with your details right here:`;

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: reply,
          timestamp: formatTime(),
        },
      ]);
      return;
    }

    // Default Fallback: Prompt gently or ask to escalate
    const defaultReply = isIndo
      ? "Saya Sarah dari tim Nexalogic bosku. Untuk membantu Anda mendapatkan paket backlink yang paling tepat, apa niche website Anda saat ini atau ada yang ingin ditanyakan tentang jaringan domain kami?"
      : "I'm Sarah from Nexalogic. To help pinpoint the highest-converting link placements for your site, what niche is your website in, or which metrics are you looking to target?";

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'bot',
        text: defaultReply,
        timestamp: formatTime(),
        options: [
          { label: 'Casino / iGaming', value: 'Casino / iGaming' },
          { label: 'Crypto / Finance', value: 'Crypto / Finance' },
          { label: 'General Niche', value: 'General Niche' },
        ],
      },
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Trigger Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="group flex items-center gap-3 px-4 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 font-bold shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all duration-300"
          aria-label="Open support chat"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6 text-dark-900 fill-dark-900" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-900 animate-pulse" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="block text-xs font-extrabold tracking-wide uppercase">
              Chat with Sarah
            </span>
            <span className="block text-[10px] text-dark-800 font-semibold opacity-90">
              Technical Sales Director
            </span>
          </div>
        </button>
      )}

      {/* Chatbot Popup Window */}
      {open && (
        <div className="w-[375px] sm:w-[420px] max-w-[94vw] h-[580px] max-h-[88vh] bg-[#0d1117] border border-gold-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          {/* Chat Header */}
          <div className="p-4 bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900 border-b border-gold-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-bold text-dark-900 shadow-md ring-2 ring-gold-500/40">
                <span className="text-base font-extrabold tracking-tight">S</span>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-dark-900 rounded-full" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm flex items-center gap-1.5">
                  Sarah Mitchell
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-300 font-medium">
                    Sales Director
                  </span>
                </h3>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Nexalogic 12,000+ Domain Inventory
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-dark-900/95 text-gray-100 text-sm">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Sender Tag */}
                {m.sender === 'bot' && (
                  <span className="text-[10px] font-semibold text-gold-400 mb-1 px-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Sarah (Nexalogic)
                  </span>
                )}

                {/* Text Message Bubble */}
                {m.text && (
                  <div
                    className={`px-4 py-3 rounded-2xl max-w-[88%] text-xs sm:text-sm leading-relaxed shadow-md ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 font-semibold rounded-tr-none'
                        : 'bg-dark-800 border border-gold-500/25 text-gray-100 rounded-tl-none space-y-1.5'
                    }`}
                  >
                    <div className="whitespace-pre-line">{formatMarkdown(m.text)}</div>
                  </div>
                )}

                {/* Interactive Inline Choice Chips */}
                {m.options && m.options.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[90%]">
                    {m.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(opt.value)}
                        className="text-left text-xs px-3 py-1.5 rounded-xl bg-dark-700 hover:bg-gold-500/20 border border-gold-500/30 hover:border-gold-500 text-gray-200 hover:text-gold-300 transition-all font-medium shadow-sm"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Structured Contact Card Component */}
                {m.type === 'contact_card' && (
                  <div className="w-full bg-dark-800/95 border border-gold-500/30 rounded-2xl p-4 text-white space-y-3 shadow-xl my-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold uppercase text-gold-400 tracking-wider">
                        Direct Fulfillment & Admin:
                      </p>
                      <span className="text-[10px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full border border-green-500/30">
                        Online
                      </span>
                    </div>

                    <div className="space-y-2">
                      {/* Telegram Admin */}
                      <a
                        href="https://t.me/smartlinker786"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 font-semibold text-xs transition-all group"
                      >
                        <div className="flex items-center gap-2.5">
                          <SendHorizontal className="w-4 h-4 text-blue-400" />
                          <span>Telegram Admin: @smartlinker786</span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>

                      {/* WhatsApp */}
                      <a
                        href="https://wa.me/923118895477"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 font-semibold text-xs transition-all group"
                      >
                        <div className="flex items-center gap-2.5">
                          <PhoneCall className="w-4 h-4 text-green-400" />
                          <span>WhatsApp: +923118895477</span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>

                      {/* Direct Email */}
                      <a
                        href="mailto:sales@nexalogic.site"
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 text-gold-400 font-semibold text-xs transition-all group"
                      >
                        <div className="flex items-center gap-2.5">
                          <Mail className="w-4 h-4 text-gold-400" />
                          <span>Email: sales@nexalogic.site</span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                )}

                <span className="text-[10px] text-gray-500 mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ / Objections Bar */}
          <div className="px-3 py-2 bg-dark-800/90 border-t border-dark-700 flex gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <button
              onClick={() => handleSend('Can I see a 3-5 sample batch of URLs?')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-dark-700 hover:bg-gold-500/20 border border-white/10 hover:border-gold-500/40 text-gray-300 hover:text-gold-400 transition-all whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-gold-500" />
              Sample Batch
            </button>
            <button
              onClick={() => handleSend('What is your indexation rate?')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-dark-700 hover:bg-gold-500/20 border border-white/10 hover:border-gold-500/40 text-gray-300 hover:text-gold-400 transition-all whitespace-nowrap"
            >
              <TrendingUp className="w-3.5 h-3.5 text-gold-500" />
              Indexation Rate
            </button>
            <button
              onClick={() => handleSend('Can I get a discount for bulk orders?')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-dark-700 hover:bg-gold-500/20 border border-white/10 hover:border-gold-500/40 text-gray-300 hover:text-gold-400 transition-all whitespace-nowrap"
            >
              <PackageCheck className="w-3.5 h-3.5 text-gold-500" />
              Bulk Pricing
            </button>
            <button
              onClick={() => handleSend('Show me all prices')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-dark-700 hover:bg-gold-500/20 border border-white/10 hover:border-gold-500/40 text-gray-300 hover:text-gold-400 transition-all whitespace-nowrap"
            >
              <Globe2 className="w-3.5 h-3.5 text-gold-500" />
              All Prices
            </button>
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-3 bg-dark-900 border-t border-gold-500/20 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tell Sarah your niche or website URL..."
              className="flex-1 bg-dark-800 border border-dark-600 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isSending}
              className="p-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 font-bold hover:from-gold-400 hover:to-gold-500 transition-all disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-dark-900 fill-dark-900" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

function formatTime(): string {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function extractEmail(text: string): string | null {
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : null;
}

function formatMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={i} className="italic text-gray-300">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

export default Chatbot;
