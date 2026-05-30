"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";

export default function IntakePage() {
  const { sessionId } = useParams();
  const router = useRouter();
  
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 10 });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSession();
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const fetchSession = async () => {
    try {
      const res = await api.get(`/intake/session/${sessionId}`);
      const hist = res.data.messages;
      setMessages(hist);
      
      if (res.data.session.status === "completed") {
        setIsComplete(true);
      }
      
      if (hist.length === 0) {
        // Init message
        setMessages([{ role: "assistant", content: "Halo! Saya Catatkeluh. Silakan sampaikan apa keluhan utama yang kamu rasakan hari ini?" }]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading || isComplete) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await api.post("/intake/respond", {
        session_id: sessionId,
        message: userMessage
      });
      
      const aiData = res.data;
      let aiText = aiData.message;
      if (aiData.empathy) aiText = aiData.empathy + " " + aiText;
      
      setMessages((prev) => [...prev, { role: "assistant", content: aiText }]);
      setProgress(aiData.progress || progress);
      
      if (aiData.is_complete) {
        setIsComplete(true);
      }
    } catch (err) {
      alert("Terjadi kesalahan, silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    try {
      setLoading(true);
      const res = await api.post("/report/generate", { session_id: sessionId });
      router.push(`/report/${res.data.id}`);
    } catch (err) {
      alert("Gagal membuat laporan");
    } finally {
      setLoading(false);
    }
  };

  const progressPercent = Math.min((progress.current / progress.total) * 100, 100);

  return (
    <div className="bg-background text-on-surface font-body-md overflow-hidden flex flex-col h-screen">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 w-full z-50 bg-surface shadow-sm px-4 md:px-8 py-3 max-w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push("/dashboard")}
            aria-label="Back" 
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold text-on-surface">Sesi Intake</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden">
            <img alt="Assistant Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQdW67MRhS31buSN1T01jvWbZZITiQkm1MapoNckWWWbSFEed6S1OlTFbG70uJHY-Ies3HvpDGMo0jYSqeHgxVMk5ZQWhy6KZ4mMgwuke20QGRCO2eAd_ugxneCnpgUn6g60BVv8dRHYS6y15jfAGaBto5nKkCX2IJLahw6jPFLsCKLYxYnlhP5ec6YS1xQHeXLn9r-e9pd0ws4b0NHW4j4I4T_sTcJI56iB0IlBbRYY0v-n6MbNmxQG34a_ZkTiuiI6WxmQZcY2I" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col w-full max-w-3xl mx-auto relative px-4 pt-4 overflow-hidden">
        {/* Progress Section */}
        <div className="mb-4 shrink-0">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-on-surface-variant">{progress.current}/{progress.total} Pertanyaan Dijawab</span>
            <span className="text-xs text-primary font-bold">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-secondary rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        {/* Chat History Container */}
        <div className="chat-container flex-grow overflow-y-auto space-y-4 pb-8 flex flex-col">
          {messages.map((msg, idx) => (
            <div key={idx} className={msg.role === "user" ? "flex flex-col items-end w-full" : "flex flex-col items-start max-w-[85%]"}>
              <div 
                className={`p-3 rounded-2xl shadow-sm ${
                  msg.role === "user" 
                  ? "bg-primary-container text-on-primary-container rounded-tr-none" 
                  : "bg-surface-container-low text-on-surface rounded-tl-none"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
              <span className={`text-[10px] text-outline mt-1 ${msg.role === "user" ? "mr-1" : "ml-1"}`}>
                {msg.role === "user" ? "Kamu" : "Catatkeluh Assistant"}
              </span>
            </div>
          ))}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex flex-col items-start max-w-[85%]">
              <div className="bg-surface-container-low p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center h-10">
                <span className="w-1.5 h-1.5 bg-outline rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-outline rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                <span className="w-1.5 h-1.5 bg-outline rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
              </div>
              <span className="text-[10px] text-outline mt-1 ml-1">Catatkeluh Assistant</span>
            </div>
          )}
          
          <div ref={messagesEndRef} className="shrink-0 h-4" />
        </div>
      </main>

      {/* Floating Input Area */}
      <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-3 px-4 shrink-0">
        <div className="max-w-3xl mx-auto relative">
          {isComplete ? (
             <button 
               onClick={handleGenerateReport}
               disabled={loading}
               className="w-full flex justify-center items-center gap-2 py-3 bg-secondary text-on-secondary font-bold rounded-xl shadow-sm hover:bg-secondary/90 active:scale-95 transition-all"
             >
               <span className="material-symbols-outlined text-[20px]">summarize</span>
               <span className="text-sm">{loading ? "Menyusun Laporan..." : "Buat Laporan Medis Sekarang"}</span>
             </button>
          ) : (
            <div className="flex items-center gap-2 bg-surface rounded-full border border-outline-variant p-1 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all duration-200 shadow-sm">
              <button type="button" onClick={() => alert("Fitur lampiran file medis sedang dalam pengembangan.")} className="w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-variant transition-colors shrink-0">
                <span className="material-symbols-outlined text-[20px]">attach_file</span>
              </button>
              <input 
                className="flex-grow bg-transparent border-none focus:ring-0 text-sm px-2 py-1.5 outline-none placeholder:text-outline" 
                placeholder="Ketik jawaban kamu..." 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={loading}
              />
              <button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-primary text-white hover:scale-105 active:scale-95 transition-all shadow-sm disabled:opacity-50 disabled:hover:scale-100"
              >
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
              </button>
            </div>
          )}
          {!isComplete && (
            <p className="text-center text-[10px] text-outline mt-2">Data Anda diamankan dengan enkripsi standar medis.</p>
          )}
        </div>
      </footer>
    </div>
  );
}
