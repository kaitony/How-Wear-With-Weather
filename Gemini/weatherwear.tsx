import React, { useState, useEffect } from "react";
import { Cloud, Sun, Thermometer, Wind, Droplets, ChevronLeft, ChevronRight, Settings, Info, MessageSquare, CheckCircle2, ArrowLeft } from "lucide-react";

/**
 * How wear with weather - 날씨 기반 의상 추천 서비스
 * 1. 기온별 8단계 의상 아이콘 및 추천 리스트 다각화
 * 2. 독립적인 피드백 페이지 구성
 * 3. Local Storage 개인화 설정 유지
 */

// --- Types ---
type Sensitivity = "cold" | "heat" | "normal";
type Step = 1 | 2 | 3 | 4; // 1: Splash, 2: Setup, 3: Main, 4: Feedback

interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  pm10: number;
}

interface Recommendation {
  items: string[];
  icon: string;
  label: string;
}

// --- Outfit Logic (다각화된 데이터) ---
const getOutfitRecommendation = (temp: number, sensitivity: Sensitivity): Recommendation => {
  let adjustedTemp = temp;
  if (sensitivity === "cold") adjustedTemp -= 2.5;
  if (sensitivity === "heat") adjustedTemp += 2.5;

  if (adjustedTemp <= 4) {
    return {
      label: "최강 한파 무장",
      items: ["롱패딩", "누빔 안감", "목도리", "방한장갑", "내복"],
      icon: "🧤",
    };
  }
  if (adjustedTemp <= 8) {
    return {
      label: "따뜻한 겨울 코디",
      items: ["두꺼운 코트", "가죽 자켓", "히트텍", "기모 팬츠"],
      icon: "🧥",
    };
  }
  if (adjustedTemp <= 11) {
    return {
      label: "쌀쌀한 늦가을/초겨울",
      items: ["트렌치 코트", "경량 패딩", "기모 후드티", "여러겹 레이어링"],
      icon: "🧣",
    };
  }
  if (adjustedTemp <= 16) {
    return {
      label: "선선한 간절기",
      items: ["자켓", "가디건", "야상", "청자켓", "치노 팬츠"],
      icon: "🧥",
    };
  }
  if (adjustedTemp <= 19) {
    return {
      label: "활동하기 좋은 날씨",
      items: ["얇은 가디건", "니트", "맨투맨", "긴바지", "면바지"],
      icon: "👕",
    };
  }
  if (adjustedTemp <= 22) {
    return {
      label: "따뜻한 봄/가을",
      items: ["긴팔 티셔츠", "셔츠/블라우스", "슬랙스", "면바지"],
      icon: "👔",
    };
  }
  if (adjustedTemp <= 27) {
    return {
      label: "초여름 더위 시작",
      items: ["반팔 티셔츠", "얇은 셔츠", "반바지", "얇은 면바지"],
      icon: "👕",
    };
  }
  return {
    label: "무더운 한여름",
    items: ["민소매", "린넨 셔츠", "반바지", "샌들", "선글라스"],
    icon: "🩳",
  };
};

const App = () => {
  const [step, setStep] = useState<Step>(1);
  const [sensitivity, setSensitivity] = useState<Sensitivity>("normal");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [address] = useState("서울시 강남구");
  const [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("how-wear-weather-config");
    if (saved) {
      setSensitivity(JSON.parse(saved).sensitivity);
      setStep(3);
    }

    // Mock Data (현업에서는 API 호출 로직이 들어갈 자리)
    setWeather({
      temp: 14,
      feelsLike: 12.5,
      humidity: 40,
      windSpeed: 2.1,
      condition: "Sunny",
      pm10: 25,
    });
  }, []);

  const saveConfig = (s: Sensitivity) => {
    setSensitivity(s);
    localStorage.setItem("how-wear-weather-config", JSON.stringify({ sensitivity: s }));
    setStep(3);
  };

  const submitFeedback = (value: string) => {
    console.log(`User feedback received: ${value}`);
    setFeedbackSent(true);
    setTimeout(() => {
      setStep(3);
      setFeedbackSent(false);
    }, 1500);
  };

  const recommendation = weather ? getOutfitRecommendation(weather.temp, sensitivity) : null;

  // --- Render 1: Splash ---
  if (step === 1) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-100 to-amber-50 p-6 text-center" onClick={() => setStep(2)}>
        <div className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center shadow-xl mb-8 transform rotate-12">
          <div className="relative transform -rotate-12">
            <Cloud className="text-sky-400 w-16 h-16" />
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-amber-400 rounded-full border-4 border-white shadow-sm"></div>
          </div>
        </div>
        <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">
          How wear
          <br />
          with weather
        </h1>
        <p className="text-slate-500 font-medium">날씨에 맞게, 고민 없이</p>
        <p className="mt-20 text-[10px] text-slate-400 tracking-[0.2em] animate-pulse">TOUCH TO START</p>
      </div>
    );
  }

  // --- Render 2: Setup ---
  if (step === 2) {
    return (
      <div className="flex flex-col h-screen bg-white p-8">
        <h2 className="text-3xl font-black text-slate-900 mt-12 mb-2 leading-tight">
          반가워요!
          <br />
          평소 체질은 어떤가요?
        </h2>
        <p className="text-slate-400 text-sm mb-12 font-medium">개인에게 딱 맞는 의상을 추천해 드릴게요.</p>

        <div className="space-y-4 flex-1">
          {[
            { id: "heat", label: "더위를 많이 타요 ☀️", sub: "시원한 옷차림을 선호해요" },
            { id: "normal", label: "보통이에요 😊", sub: "추천 가이드대로 입을게요" },
            { id: "cold", label: "추위를 많이 타요 ❄️", sub: "따뜻하게 껴입는 걸 좋아해요" },
          ].map((item) => (
            <button key={item.id} onClick={() => saveConfig(item.id as Sensitivity)} className={`w-full p-6 rounded-3xl text-left border-2 transition-all duration-300 ${sensitivity === item.id ? "border-indigo-500 bg-indigo-50/50 shadow-md translate-y-[-2px]" : "border-slate-100"}`}>
              <div className="font-bold text-lg text-slate-800">{item.label}</div>
              <div className="text-sm text-slate-400 font-medium">{item.sub}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // --- Render 4: Feedback Page ---
  if (step === 4) {
    return (
      <div className="flex flex-col h-screen bg-slate-50 p-6">
        <header className="flex items-center mb-10 pt-4">
          <button onClick={() => setStep(3)} className="p-2 bg-white rounded-full shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <h2 className="flex-1 text-center font-bold text-lg mr-8">착장 피드백</h2>
        </header>

        {feedbackSent ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-xl font-bold">의견이 반영되었습니다!</h3>
            <p className="text-slate-400">데이터 보정을 통해 더 정확한 코디를 추천할게요.</p>
          </div>
        ) : (
          <div className="flex-1 space-y-8">
            <div className="text-center">
              <div className="text-5xl mb-4">{recommendation?.icon}</div>
              <h3 className="text-xl font-bold">오늘 추천은 어떠셨나요?</h3>
              <p className="text-slate-400 text-sm mt-2">사용자님의 피드백은 추천 로직 보정에 활용됩니다.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { label: "너무 더웠어요 🔥", value: "too-hot" },
                { label: "조금 더웠어요 🌤️", value: "hot" },
                { label: "딱 좋았어요! ✨", value: "perfect" },
                { label: "조금 추웠어요 ☁️", value: "cold" },
                { label: "너무 추웠어요 ❄️", value: "too-cold" },
              ].map((option) => (
                <button key={option.value} onClick={() => submitFeedback(option.value)} className="w-full py-5 bg-white rounded-2xl font-bold text-slate-700 shadow-sm hover:shadow-md transition-all active:scale-95">
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- Render 3: Main ---
  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden font-sans">
      <header className="bg-white px-8 pt-14 pb-6 shadow-sm rounded-b-[2rem]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-full">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-slate-400">{address}</span>
          </div>
          <button onClick={() => setStep(2)} className="p-2 text-slate-300 hover:text-indigo-500 transition-colors">
            <Settings size={20} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button className="p-2">
            <ChevronLeft size={20} className="text-slate-200" />
          </button>
          <div className="text-center">
            <div className="text-xl font-black text-slate-800">5월 10일 (금)</div>
            <div className="text-[10px] text-indigo-500 font-black uppercase tracking-widest mt-1">Today</div>
          </div>
          <button className="p-2">
            <ChevronRight size={20} className="text-slate-200" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Main Recommendation Card */}
        <section className="bg-white rounded-[2.5rem] p-8 shadow-sm text-center relative overflow-hidden border border-slate-50">
          <div className="absolute top-6 right-6">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${weather && weather.pm10 > 30 ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600"}`}>
              <span className="text-[9px] font-black uppercase tracking-wider">{weather && weather.pm10 > 30 ? "Mask Required" : "Good Air"}</span>
            </div>
          </div>

          <div className="text-7xl mb-6 filter drop-shadow-md">{recommendation?.icon}</div>

          <div className="mb-6">
            <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-1">{recommendation?.label}</h4>
            <h3 className="text-2xl font-black text-slate-800">오늘의 추천 코디</h3>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 mb-10">
            {recommendation?.items.map((item, idx) => (
              <span key={idx} className="bg-slate-50 px-5 py-2.5 rounded-2xl text-sm font-bold text-slate-600 border border-slate-100/50">
                {item}
              </span>
            ))}
          </div>

          <div className="flex justify-around items-center bg-slate-50/50 rounded-3xl p-6">
            <div className="text-center">
              <div className="text-[9px] text-slate-400 mb-1 font-black uppercase tracking-tighter">Temperature</div>
              <div className="text-2xl font-black text-slate-700">{weather?.temp}°</div>
            </div>
            <div className="w-px h-8 bg-slate-200/50"></div>
            <div className="text-center">
              <div className="text-[9px] text-slate-400 mb-1 font-black uppercase tracking-tighter">Feels Like</div>
              <div className="text-2xl font-black text-indigo-500">{weather?.feelsLike}°</div>
            </div>
          </div>
        </section>

        {/* Weather Details Row */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-[2rem] flex items-center gap-4 shadow-sm">
            <div className="bg-blue-50 p-2.5 rounded-xl text-blue-500 shadow-inner">
              <Wind size={18} />
            </div>
            <div>
              <div className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Wind</div>
              <div className="text-base font-black text-slate-700">{weather?.windSpeed}m/s</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[2rem] flex items-center gap-4 shadow-sm">
            <div className="bg-teal-50 p-2.5 rounded-xl text-teal-500 shadow-inner">
              <Droplets size={18} />
            </div>
            <div>
              <div className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Humidity</div>
              <div className="text-base font-black text-slate-700">{weather?.humidity}%</div>
            </div>
          </div>
        </section>

        {/* Feedback Entry Point */}
        <section className="pt-2">
          <button onClick={() => setStep(4)} className="w-full bg-slate-800 text-white p-6 rounded-3xl flex items-center justify-between shadow-lg shadow-slate-200 active:scale-[0.98] transition-all">
            <div className="flex items-center gap-3">
              <div className="bg-slate-700 p-2 rounded-lg text-amber-400">
                <MessageSquare size={18} fill="currentColor" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-400">Feedback</p>
                <p className="font-bold text-sm">오늘 추천 어떠셨나요?</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-slate-500" />
          </button>
        </section>
      </main>

      <footer className="p-8 text-center bg-slate-50">
        <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">How wear with weather</p>
      </footer>
    </div>
  );
};

export default App;
