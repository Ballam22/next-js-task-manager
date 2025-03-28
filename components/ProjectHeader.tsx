'use client';
import React, { useState } from 'react';
import styles from './projectHeader.module.css';

interface ProjectHeaderProps {
  projectName: string;
  onViewChange?: (view: 'list' | 'timeline') => void;
}

export default function ProjectHeader({
  projectName,
  onViewChange,
}: ProjectHeaderProps) {
  const [activeView, setActiveView] = useState<'list' | 'timeline'>('list');

  const handleViewChange = (view: 'list' | 'timeline') => {
    setActiveView(view);
    if (onViewChange) {
      onViewChange(view);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <h1 className={styles.projectTitle}>{projectName}</h1>
      </div>
      <div className={styles.rightSection}>
        <button className={styles.addTaskButton}>+ Add Task</button>
        <div className={styles.viewSwitcher}>
          <button
            className={`${styles.viewButton} ${activeView === 'list' ? styles.active : ''}`}
            onClick={() => handleViewChange('list')}
          >
            List
          </button>
          <button
            className={`${styles.viewButton} ${activeView === 'timeline' ? styles.active : ''}`}
            onClick={() => handleViewChange('timeline')}
          >
            Timeline
          </button>
        </div>
        <button className={styles.moreOptionsButton}>⋮</button>
      </div>
    </header>
  );
}
