export interface Tab {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div
      className="flex border-b gap-4"
      style={{ borderColor: 'var(--border)' }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={[
              'px-2 py-3 text-sm cursor-pointer border-b-2 mb-[-1px]',
              isActive
                ? 'text-lime-400 border-lime-500'
                : 'border-transparent hover:text-[var(--text-primary)]',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{
              transition: 'all var(--truf-duration-fast)',
              ...(isActive ? {} : { color: 'var(--text-muted)' }),
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
