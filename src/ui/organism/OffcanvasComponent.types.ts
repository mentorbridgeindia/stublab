import { ReactNode } from 'react';

export interface OffcanvasComponentProps {
  buttonLabel: any;        
  title: string;                 
  children: ReactNode;            
  placement: 'start' | 'end' | 'top' | 'bottom'; 
  buttonVariant?: string;      
}
