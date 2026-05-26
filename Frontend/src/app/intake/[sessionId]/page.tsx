"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";

export default function IntakePage() {
  const { sessionId } = useParams();
  const router = useRouter();
  
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 8 });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSession();
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white min-h-screen shadow-sm flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-white sticky top-0 z-10 flex items-center justify-between">
          <button onClick={() => router.push("/dashboard")} className="text-slate-500 hover:text-slate-800">
            ← Kembali
          </button>
          <div className="text-center flex-1">
            <h1 className="font-semibold text-slate-800">Intake Medis</h1>
            <div className="w-1/2 mx-auto mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-400 mt-1">{progress.current} / {progress.total} Pertanyaan</p>
          </div>
          <div className="w-16"></div> {/* spacer */}
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div 
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === "user" 
                  ? "bg-blue-600 text-white rounded-br-none" 
                  : "bg-slate-100 text-slate-800 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] bg-slate-100 text-slate-500 rounded-2xl rounded-bl-none px-4 py-3 flex space-x-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-200">
          {isComplete ? (
            <button 
              onClick={handleGenerateReport}
              disabled={loading}
              className="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
            >
              {loading ? "Menyusun Laporan..." : "Buat Laporan Sekarang"}
            </button>
          ) : (
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik jawaban Anda..."
                disabled={loading}
                className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none disabled:bg-slate-50"
              />
              <button 
                type="submit"
                disabled={loading || !input.trim()}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
              >
                Kirim
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
