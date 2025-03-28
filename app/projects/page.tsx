'use client';

import ProjectHeader from '@/components/ProjectHeader';
import ProjectsListView from '@/components/ProjectsList';
import ProjectsTimelineView from '@/components/ProjectsTimelineView';
import { useState } from 'react';

export default function ProjectsPage() {
  const [view, setView] = useState<'list' | 'timeline'>('list');

  const handleViewChange = (newView: 'list' | 'timeline') => {
    setView(newView);
  };

  return (
    <main>
      <ProjectHeader
        projectName="My Awesome Project"
        onViewChange={handleViewChange}
      />
      {view === 'list' && <ProjectsListView />}
      {view === 'timeline' && <ProjectsTimelineView />}
    </main>
  );
}
