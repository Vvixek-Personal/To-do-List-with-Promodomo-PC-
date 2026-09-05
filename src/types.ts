import { LucideIcon } from 'lucide-react';

export type TabId = 
  | 'dashboard'
  | 'work'
  | 'planning'
  | 'calendar'
  | 'analytics'
  | 'settings'
  | 'profile';

export interface NavItem {
  id: TabId;
  label: string;
  icon: LucideIcon;
  description: string;
}
