import React from "react";
import { Play, Pause, RotateCcw, Timer, Volume2 } from "lucide-react";
import styles from "./KitchenTimerWidget.module.css";

export default function KitchenTimerWidget({ timer }) {
  const { totalTime, timeLeft, isRunning, startTimer, pauseTimer, resetTimer, formatTime } = timer;
  const progressPercent = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  return (
    <div className={styles.timerCard}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <Timer size={18} className={styles.timerIcon} />
          <span>Kitchen Timer</span>
        </div>
        {timeLeft === 0 && <span className={styles.donePill}><Volume2 size={14} /> Done!</span>}
      </div>

      <div className={styles.displayRow}>
        <div className={styles.timeText}>{formatTime()}</div>

        {/* Quick Minute Preset Buttons */}
        <div className={styles.presets}>
          <button onClick={() => startTimer(2)} className={styles.presetBtn}>2m</button>
          <button onClick={() => startTimer(5)} className={styles.presetBtn}>5m</button>
          <button onClick={() => startTimer(10)} className={styles.presetBtn}>10m</button>
          <button onClick={() => startTimer(15)} className={styles.presetBtn}>15m</button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressTrack}>
        <div className={styles.progressBar} style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        {!isRunning ? (
          <button onClick={() => startTimer()} className={styles.playBtn}>
            <Play size={16} fill="currentColor" />
            <span>Start</span>
          </button>
        ) : (
          <button onClick={pauseTimer} className={styles.pauseBtn}>
            <Pause size={16} fill="currentColor" />
            <span>Pause</span>
          </button>
        )}

        <button onClick={resetTimer} className={styles.resetBtn} title="Reset Timer">
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
