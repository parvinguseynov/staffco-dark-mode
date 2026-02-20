import { motion } from 'framer-motion';
import { Avatar } from './Avatar';

export function ProjectCard({ project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="bg-light-card dark:bg-dark-card rounded-lg p-6 border border-light-border dark:border-dark-border hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex items-start gap-4 mb-4">
        <Avatar initials={project.initials} color={project.color} size="lg" />
        <div className="flex-1">
          <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-1">
            {project.name}
          </h3>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            {project.company}
          </p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-light-text-secondary dark:text-dark-text-secondary">
            Progress
          </span>
          <span className="font-medium text-light-text-primary dark:text-dark-text-primary">
            {project.hoursLogged}h / {project.totalHours}h
          </span>
        </div>
        <div className="w-full h-2 bg-light-elevated dark:bg-dark-elevated rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-full rounded-full"
            style={{ backgroundColor: project.color }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
          Team:
        </span>
        <div className="flex -space-x-2">
          {project.team.map((member, index) => (
            <Avatar
              key={index}
              initials={member.initials}
              color={member.color}
              size="sm"
              className="ring-2 ring-light-card dark:ring-dark-card"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
