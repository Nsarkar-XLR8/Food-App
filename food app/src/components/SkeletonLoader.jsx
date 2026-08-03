import React from "react";
import styles from "./SkeletonLoader.module.css";

export default function SkeletonLoader({ count = 6 }) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className={styles.cardSkeleton}>
          <div className={`${styles.imgSkeleton} animate-pulse`} />
          <div className={styles.bodySkeleton}>
            <div className={`${styles.lineShort} animate-pulse`} />
            <div className={`${styles.lineTitle} animate-pulse`} />
            <div className={`${styles.lineMeta} animate-pulse`} />
            <div className={`${styles.buttonSkeleton} animate-pulse`} />
          </div>
        </div>
      ))}
    </div>
  );
}
