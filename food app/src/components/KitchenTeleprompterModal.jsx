import React, { useState, useEffect, useRef } from "react";
import {
  X, ChevronLeft, ChevronRight, CheckCircle2, Volume2, VolumeX, Timer,
  Play, Pause, RotateCcw, Mic, MicOff, Sparkles, ChefHat, Wrench
} from "lucide-react";
import { useKitchenTimer } from "../hooks/useKitchenTimer";
import styles from "./KitchenTeleprompterModal.module.css";

export default function KitchenTeleprompterModal({ recipe, onClose }) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState(false);
  const [autoVoice, setAutoVoice] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [wakeLockActive, setWakeLockActive] = useState(false);
  const recognitionRef = useRef(null);

  const kitchenTimer = useKitchenTimer(5);

  // 1. Screen Wake Lock API to prevent screen sleeping during cooking
  useEffect(() => {
    let wakeLock = null;

    const requestWakeLock = async () => {
      if ("wakeLock" in navigator) {
        try {
          wakeLock = await navigator.wakeLock.request("screen");
          setWakeLockActive(true);
        } catch (err) {
          console.log("Wake Lock request failed:", err);
        }
      }
    };

    requestWakeLock();

    return () => {
      if (wakeLock) {
        wakeLock.release().catch(() => {});
        setWakeLockActive(false);
      }
    };
  }, []);

  // 2. Multi-Tier Resilient Step Parser
  const getStructuredSteps = () => {
    if (!recipe) return [];

    // Source 1: analyzedInstructions steps
    if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0) {
      const stepsArr = recipe.analyzedInstructions[0].steps;
      if (stepsArr && stepsArr.length > 0) return stepsArr;
    }

    // Source 2: plain text instructions
    if (recipe.instructions) {
      const cleanText = recipe.instructions.replace(/<[^>]*>?/gm, "").trim();
      const sentences = cleanText.split(/(?<=[.!?])\s+/).filter((s) => s.length > 5);
      if (sentences.length > 0) {
        return sentences.map((s, idx) => ({
          number: idx + 1,
          step: s,
          ingredients: [],
          equipment: [],
        }));
      }
    }

    // Source 3: summary sentences
    if (recipe.summary) {
      const cleanSummary = recipe.summary.replace(/<[^>]*>?/gm, "").trim();
      const sentences = cleanSummary.split(/(?<=[.!?])\s+/).filter((s) => s.length > 10);
      if (sentences.length > 0) {
        return sentences.map((s, idx) => ({
          number: idx + 1,
          step: s,
          ingredients: [],
          equipment: [],
        }));
      }
    }

    // Source 4: Assembly Guide generated from extendedIngredients
    if (recipe.extendedIngredients && recipe.extendedIngredients.length > 0) {
      const ingNames = recipe.extendedIngredients.map((i) => i.name).join(", ");
      return [
        {
          number: 1,
          step: `Gather and prep your ingredients: ${ingNames}.`,
          ingredients: recipe.extendedIngredients,
          equipment: [],
        },
        {
          number: 2,
          step: `Combine ingredients as directed for ${recipe.title}.`,
          ingredients: [],
          equipment: [],
        },
        {
          number: 3,
          step: `Cook to desired doneness, season to taste, and serve hot!`,
          ingredients: [],
          equipment: [],
        },
      ];
    }

    return [
      {
        number: 1,
        step: `Follow preparation instructions for ${recipe.title || "this recipe"}.`,
        ingredients: [],
        equipment: [],
      },
    ];
  };

  const steps = getStructuredSteps();
  const currentStep = steps[currentStepIdx] || steps[0];
  const progressPercent = steps.length > 0 ? ((currentStepIdx + 1) / steps.length) * 100 : 100;

  // 3. Auto Step-Timer Detector (e.g. "cook for 8 minutes")
  const detectStepTime = (text) => {
    if (!text) return null;
    const match = text.match(/(\d+)\s*(mins?|minutes?|hours?)/i);
    if (match) {
      let num = parseInt(match[1], 10);
      const unit = match[2].toLowerCase();
      if (unit.startsWith("hour")) num *= 60;
      return num;
    }
    return null;
  };

  const detectedMinutes = detectStepTime(currentStep?.step);

  // 4. Web Speech Text-to-Speech (Voice Narration)
  const speakStepText = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsVoiceSpeaking(false);
      utterance.onerror = () => setIsVoiceSpeaking(false);
      setIsVoiceSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopVoice = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsVoiceSpeaking(false);
    }
  };

  // 5. Speech Recognition for Hands-Free Voice Commands ("Next", "Back", "Repeat")
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition && isListening) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
          const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
          console.log("Voice Command Recognized:", transcript);

          if (transcript.includes("next") || transcript.includes("forward") || transcript.includes("continue")) {
            handleNext();
          } else if (transcript.includes("back") || transcript.includes("previous") || transcript.includes("prev")) {
            handlePrev();
          } else if (transcript.includes("repeat") || transcript.includes("read") || transcript.includes("speak")) {
            speakStepText(currentStep.step);
          } else if (transcript.includes("stop") || transcript.includes("exit") || transcript.includes("close")) {
            stopVoice();
            onClose();
          }
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => {
          if (isListening) {
            try { recognition.start(); } catch (e) {}
          }
        };

        recognition.start();
        recognitionRef.current = recognition;
      } catch (e) {
        console.log("Speech recognition start failed", e);
      }
    } else if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening, currentStepIdx]);

  // 6. Keyboard navigation listener (Left, Right, Space, Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Escape") {
        stopVoice();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      stopVoice();
    };
  }, [currentStepIdx, steps.length]);

  // Auto read voice if enabled
  useEffect(() => {
    if (autoVoice && currentStep?.step) {
      speakStepText(currentStep.step);
    }
  }, [currentStepIdx, autoVoice]);

  const handleNext = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const toggleAutoVoice = () => {
    if (isVoiceSpeaking) {
      stopVoice();
      setAutoVoice(false);
    } else {
      setAutoVoice(true);
      speakStepText(currentStep.step);
    }
  };

  const toggleVoiceCommands = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice command recognition is not supported in this browser.");
      return;
    }
    setIsListening(!isListening);
  };

  return (
    <div className={styles.overlay}>
      {/* Top Header Controls */}
      <header className={styles.header}>
        <div className={styles.brandGroup}>
          <div className={styles.badgeRow}>
            <span className={styles.badgeLabel}>📖 HANDS-FREE COOKING MODE</span>
            {wakeLockActive && <span className={styles.wakeLockBadge}>💡 Screen Awake</span>}
            {isListening && <span className={styles.listeningBadge}>🎙️ Listening ("Next", "Back")</span>}
          </div>
          <h2 className={styles.recipeTitle}>{recipe.title}</h2>
        </div>

        <div className={styles.headerRight}>
          {/* Voice Command Recognition Toggle */}
          <button
            className={`${styles.iconActionBtn} ${isListening ? styles.listeningActive : ""}`}
            onClick={toggleVoiceCommands}
            title={isListening ? "Stop Listening for Voice Commands" : "Enable Hands-Free Voice Commands"}
          >
            {isListening ? <Mic size={18} /> : <MicOff size={18} />}
            <span className={styles.btnLabel}>{isListening ? "Voice Active" : "Voice Control"}</span>
          </button>

          {/* Web Speech Voice Toggle */}
          <button
            className={`${styles.iconActionBtn} ${isVoiceSpeaking ? styles.voiceActive : ""}`}
            onClick={toggleAutoVoice}
            title={isVoiceSpeaking ? "Stop Voice Narration" : "Read Step Aloud"}
          >
            {isVoiceSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
            <span className={styles.btnLabel}>{isVoiceSpeaking ? "Speaking..." : "Read Aloud"}</span>
          </button>

          <button className={styles.closeBtn} onClick={() => { stopVoice(); onClose(); }} aria-label="Exit Teleprompter">
            <X size={22} />
          </button>
        </div>
      </header>

      {/* Progress Track */}
      <div className={styles.progressTrack}>
        <div className={styles.progressBar} style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Embedded Quick Timer Bar */}
      <div className={styles.timerBar}>
        <div className={styles.timerInfo}>
          <Timer size={16} className={styles.timerIcon} />
          <span>Step Timer: <strong>{kitchenTimer.formatTime()}</strong></span>
        </div>

        {detectedMinutes && (
          <button
            className={styles.autoDetectedTimerBtn}
            onClick={() => kitchenTimer.startTimer(detectedMinutes)}
            title={`Start ${detectedMinutes} minute timer`}
          >
            <Play size={13} />
            <span>Start Step {detectedMinutes}m Timer</span>
          </button>
        )}

        <div className={styles.timerControls}>
          <button onClick={() => kitchenTimer.startTimer(2)} className={styles.tBtn}>2m</button>
          <button onClick={() => kitchenTimer.startTimer(5)} className={styles.tBtn}>5m</button>
          <button onClick={() => kitchenTimer.startTimer(10)} className={styles.tBtn}>10m</button>
          {!kitchenTimer.isRunning ? (
            <button onClick={() => kitchenTimer.startTimer()} className={styles.tPlay}><Play size={14} /></button>
          ) : (
            <button onClick={kitchenTimer.pauseTimer} className={styles.tPause}><Pause size={14} /></button>
          )}
          <button onClick={kitchenTimer.resetTimer} className={styles.tBtn}><RotateCcw size={14} /></button>
        </div>
      </div>

      {/* Main Teleprompter Display Area */}
      <main className={styles.displayArea}>
        <div className={styles.stepBadge}>
          STEP {currentStepIdx + 1} OF {steps.length}
        </div>

        {/* Giant Step Text */}
        <div className={styles.stepContent}>
          <p className={styles.giantStepText}>{currentStep.step}</p>
        </div>

        {/* Step Context Overlay (Ingredients & Equipment needed for this step) */}
        {(currentStep.ingredients?.length > 0 || currentStep.equipment?.length > 0) && (
          <div className={styles.stepContextRow}>
            {currentStep.ingredients?.length > 0 && (
              <div className={styles.contextGroup}>
                <span className={styles.contextLabel}><ChefHat size={14} /> Needed:</span>
                {currentStep.ingredients.map((ing, i) => (
                  <span key={i} className={styles.contextPill}>{ing.name}</span>
                ))}
              </div>
            )}

            {currentStep.equipment?.length > 0 && (
              <div className={styles.contextGroup}>
                <span className={styles.contextLabel}><Wrench size={14} /> Equipment:</span>
                {currentStep.equipment.map((eq, i) => (
                  <span key={i} className={styles.contextPillEq}>{eq.name}</span>
                ))}
              </div>
            )}
          </div>
        )}

        <div className={styles.keyHint}>
          Voice Commands: Say <strong>"Next"</strong>, <strong>"Back"</strong>, or <strong>"Repeat"</strong> | Keyboard: <kbd>←</kbd> <kbd>→</kbd> <kbd>Space</kbd> <kbd>Esc</kbd>
        </div>
      </main>

      {/* Bottom Large Nav Controls */}
      <footer className={styles.footerControls}>
        <button
          className={`${styles.navControlBtn} ${styles.prevBtn}`}
          onClick={handlePrev}
          disabled={currentStepIdx === 0}
        >
          <ChevronLeft size={36} />
          <span>PREVIOUS</span>
        </button>

        <div className={styles.stepCounterText}>
          {currentStepIdx + 1} / {steps.length}
        </div>

        {currentStepIdx === steps.length - 1 ? (
          <button
            className={`${styles.navControlBtn} ${styles.finishBtn}`}
            onClick={() => { stopVoice(); onClose(); }}
          >
            <CheckCircle2 size={32} />
            <span>FINISH COOKING</span>
          </button>
        ) : (
          <button className={`${styles.navControlBtn} ${styles.nextBtn}`} onClick={handleNext}>
            <span>NEXT STEP</span>
            <ChevronRight size={36} />
          </button>
        )}
      </footer>
    </div>
  );
}
