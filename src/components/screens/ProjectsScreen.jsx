import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { ProjectCard } from '../ui/ProjectCard';
import { Button } from '../ui/Button';
import { mockProjects } from '../../data/mockData';

export function ProjectsScreen() {
  return (
    <div className="h-full overflow-auto bg-light-base dark:bg-dark-base">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-1">
              Projects
            </h1>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              {mockProjects.length} active projects
            </p>
          </div>
          <Button variant="primary" icon={<Plus size={18} />}>
            New Project
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
