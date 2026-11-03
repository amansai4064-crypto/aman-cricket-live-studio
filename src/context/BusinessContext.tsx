import React, { createContext, useContext, useState, useEffect } from 'react';
import { CricketService, ServiceOrder, SupportTicket, Transaction, ReferralRecord, AuditLog } from '../types';
import { initialServices, initialServiceOrders, initialSupportTickets, initialTransactions, initialReferrals } from '../data/mockData';

interface BusinessContextType {
  services: CricketService[];
  serviceOrders: ServiceOrder[];
  supportTickets: SupportTicket[];
  transactions: Transaction[];
  referralRecords: ReferralRecord[];
  auditLogs: AuditLog[];
  commissionRate: number; // percentage e.g. 20%
  createServiceOrder: (serviceId: string, serviceTitle: string, amount: number, requirements: string, userId: string, userName: string, userEmail: string) => void;
  updateServiceOrderStatus: (orderId: string, status: ServiceOrder['status'], note?: string) => void;
  createSupportTicket: (subject: string, category: SupportTicket['category'], message: string, userId: string, userName: string, userEmail: string) => void;
  updateSupportTicket: (ticketId: string, status: SupportTicket['status'], adminReply?: string) => void;
  addTransaction: (tx: Omit<Transaction, 'id' | 'createdAt'>) => void;
  updateCommissionRate: (rate: number) => void;
  approveReferralCommission: (recordId: string) => void;
  addAuditLog: (adminId: string, adminName: string, action: string, target: string, details: string) => void;
  addNewService: (service: Omit<CricketService, 'id'>) => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<CricketService[]>(() => {
    const saved = localStorage.getItem('aman_cricket_services');
    if (saved) { try { return JSON.parse(saved); } catch (e) { console.error(e); } }
    return initialServices;
  });

  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>(() => {
    const saved = localStorage.getItem('aman_cricket_service_orders');
    if (saved) { try { return JSON.parse(saved); } catch (e) { console.error(e); } }
    return initialServiceOrders;
  });

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('aman_cricket_support_tickets');
    if (saved) { try { return JSON.parse(saved); } catch (e) { console.error(e); } }
    return initialSupportTickets;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('aman_cricket_transactions');
    if (saved) { try { return JSON.parse(saved); } catch (e) { console.error(e); } }
    return initialTransactions;
  });

  const [referralRecords, setReferralRecords] = useState<ReferralRecord[]>(() => {
    const saved = localStorage.getItem('aman_cricket_referrals');
    if (saved) { try { return JSON.parse(saved); } catch (e) { console.error(e); } }
    return initialReferrals;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('aman_cricket_audit_logs');
    if (saved) { try { return JSON.parse(saved); } catch (e) { console.error(e); } }
    return [{
      id: 'log_1',
      adminId: 'usr_admin_1',
      adminName: 'Aman Priya',
      action: 'SYSTEM_INITIALIZED',
      target: 'Platform',
      details: 'Aman Cricket Live Studio business platform initialized successfully.',
      timestamp: '2026-02-01T10:00:00Z'
    }];
  });

  const [commissionRate, setCommissionRate] = useState<number>(() => {
    const saved = localStorage.getItem('aman_cricket_commission_rate');
    return saved ? parseFloat(saved) : 20; // 20% default
  });

  useEffect(() => { localStorage.setItem('aman_cricket_services', JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem('aman_cricket_service_orders', JSON.stringify(serviceOrders)); }, [serviceOrders]);
  useEffect(() => { localStorage.setItem('aman_cricket_support_tickets', JSON.stringify(supportTickets)); }, [supportTickets]);
  useEffect(() => { localStorage.setItem('aman_cricket_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('aman_cricket_referrals', JSON.stringify(referralRecords)); }, [referralRecords]);
  useEffect(() => { localStorage.setItem('aman_cricket_audit_logs', JSON.stringify(auditLogs)); }, [auditLogs]);
  useEffect(() => { localStorage.setItem('aman_cricket_commission_rate', commissionRate.toString()); }, [commissionRate]);

  const createServiceOrder = (serviceId: string, serviceTitle: string, amount: number, requirements: string, userId: string, userName: string, userEmail: string) => {
    const newOrder: ServiceOrder = {
      id: 'ord_' + Date.now(),
      userId,
      userName,
      userEmail,
      serviceId,
      serviceTitle,
      amount,
      status: 'pending',
      requirements,
      createdAt: new Date().toISOString()
    };
    setServiceOrders(prev => [newOrder, ...prev]);

    // Also add transaction entry
    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      userId,
      userName,
      type: 'service_payment',
      category: 'Broadcast Service Earnings',
      amount,
      netAmount: Math.round(amount * 0.95),
      status: 'completed',
      description: `Service Order: ${serviceTitle}`,
      createdAt: new Date().toISOString(),
      referenceId: newOrder.id
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const updateServiceOrderStatus = (orderId: string, status: ServiceOrder['status'], note?: string) => {
    setServiceOrders(prev => prev.map(ord => ord.id === orderId ? { ...ord, status, quotationNote: note || ord.quotationNote } : ord));
  };

  const createSupportTicket = (subject: string, category: SupportTicket['category'], message: string, userId: string, userName: string, userEmail: string) => {
    const newTicket: SupportTicket = {
      id: 'tkt_' + Date.now(),
      userId,
      userName,
      userEmail,
      subject,
      category,
      message,
      status: 'open',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSupportTickets(prev => [newTicket, ...prev]);
  };

  const updateSupportTicket = (ticketId: string, status: SupportTicket['status'], adminReply?: string) => {
    setSupportTickets(prev => prev.map(tkt => tkt.id === ticketId ? {
      ...tkt,
      status,
      adminReply: adminReply !== undefined ? adminReply : tkt.adminReply,
      updatedAt: new Date().toISOString()
    } : tkt));
  };

  const addTransaction = (tx: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTx: Transaction = {
      ...tx,
      id: 'tx_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const updateCommissionRate = (rate: number) => {
    setCommissionRate(rate);
  };

  const approveReferralCommission = (recordId: string) => {
    setReferralRecords(prev => prev.map(ref => {
      if (ref.id === recordId) {
        return { ...ref, status: 'commission_paid' };
      }
      return ref;
    }));
  };

  const addAuditLog = (adminId: string, adminName: string, action: string, target: string, details: string) => {
    const log: AuditLog = {
      id: 'log_' + Date.now(),
      adminId,
      adminName,
      action,
      target,
      details,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [log, ...prev]);
  };

  const addNewService = (service: Omit<CricketService, 'id'>) => {
    const newServ: CricketService = {
      ...service,
      id: 'srv_' + Date.now()
    };
    setServices(prev => [...prev, newServ]);
  };

  return (
    <BusinessContext.Provider value={{
      services,
      serviceOrders,
      supportTickets,
      transactions,
      referralRecords,
      auditLogs,
      commissionRate,
      createServiceOrder,
      updateServiceOrderStatus,
      createSupportTicket,
      updateSupportTicket,
      addTransaction,
      updateCommissionRate,
      approveReferralCommission,
      addAuditLog,
      addNewService
    }}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) throw new Error('useBusiness must be used within a BusinessProvider');
  return context;
};
