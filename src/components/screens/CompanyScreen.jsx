import { useContext } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../theme/colors';

const companies = [
  { id: 1, name: 'StaffCo LLC', initials: '🔷', role: 'Owner', active: false },
  { id: 2, name: 'Random', initials: '⊞', role: 'Owner', active: false },
  { id: 3, name: 'W7', initials: '⊞', role: 'Owner', active: false },
  { id: 4, name: 'Thinking IT', initials: 'TI', role: 'Owner', active: true },
  { id: 5, name: 'Company Testt', initials: '🌸', role: 'Owner', active: false },
];

export function CompanyScreen({ onSelectCompany, onBackClick }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex flex-col h-full" style={{ background: theme.app.windowBg }}>
      {/* Back Button */}
      <div className="px-5 pt-4">
        <button
          onClick={onBackClick}
          className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity cursor-pointer"
          style={{ color: theme.app.textSecondary }}
        >
          ← Back
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-5">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2" style={{ color: theme.app.textPrimary }}>
            Choose a Company
          </h1>
          <p className="text-sm" style={{ color: theme.app.textSecondary }}>
            The email is associated with...
          </p>
          <p className="text-sm" style={{ color: theme.app.textSecondary }}>
            Select the company you'd like...
          </p>
        </div>

        <div className="space-y-3">
          {companies.map(company => (
            <button
              key={company.id}
              onClick={() => onSelectCompany(company.id)}
              className="w-full flex items-center gap-3 p-3 rounded-xl transition-all hover:opacity-90 cursor-pointer"
              style={{
                background: company.active ? theme.app.cardBg : 'transparent',
                border: `1px solid ${company.active ? theme.app.accentBlue : theme.app.border}`,
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-semibold"
                style={{ background: theme.app.elevatedBg }}
              >
                {company.initials}
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium" style={{ color: theme.app.textPrimary }}>
                  {company.name}
                </div>
                <div className="text-xs" style={{ color: theme.app.textSecondary }}>
                  {company.role}
                </div>
              </div>
              {company.active && <Check size={18} style={{ color: theme.app.accentBlue }} />}
              <ChevronRight size={18} style={{ color: theme.app.textMuted }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
