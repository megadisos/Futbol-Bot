export interface ticket {
  id: string;
  user: string;
  number: string;
  msg: string;
  status: ticketStatus;
}

export type ticketStatus = 'open' | 'closed';
