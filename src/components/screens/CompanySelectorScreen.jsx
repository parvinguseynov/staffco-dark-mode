import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { mockCompanies } from '../../data/mockData';

export function CompanySelectorScreen({ onSelectCompany }) {
  return (
    <div className="h-full flex items-center justify-center bg-light-base dark:bg-dark-base p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
            Select Company
          </h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            Choose which company you're working with today
          </p>
        </div>

        {/* Company List */}
        <div className="space-y-3">
          {mockCompanies.map((company, index) => (
            <motion.button
              key={company.id}
              onClick={() => onSelectCompany(company.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border hover:shadow-lg transition-shadow flex items-center gap-4 text-left"
            >
              <Avatar
                initials={company.initials}
                color={company.color}
                size="lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                  {company.name}
                </h3>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {company.role}
                </p>
              </div>
              <ChevronRight
                size={20}
                className="text-light-text-muted dark:text-dark-text-muted"
              />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
