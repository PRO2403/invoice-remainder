export const initialClients = [
  {
    id: 'cli-1',
    name: 'Acme Software Corp',
    contactName: 'Sarah Jenkins',
    email: 'sarah@acmecorp.com',
    phone: '+1 (555) 234-5678',
    address: '100 Tech Way, Suite 400, San Francisco, CA 94105',
    totalInvoiced: 12500,
    outstanding: 4500,
  },
  {
    id: 'cli-2',
    name: 'Apex Marketing Agency',
    contactName: 'Marcus Vance',
    email: 'marcus@apexagency.io',
    phone: '+1 (555) 876-5432',
    address: '458 Madison Ave, New York, NY 10022',
    totalInvoiced: 8200,
    outstanding: 3200,
  },
  {
    id: 'cli-3',
    name: 'BrightDesign Studio',
    contactName: 'Elena Rostova',
    email: 'elena@brightdesign.co',
    phone: '+1 (555) 345-6789',
    address: '722 Market St, Austin, TX 78701',
    totalInvoiced: 6400,
    outstanding: 0,
  },
  {
    id: 'cli-4',
    name: 'Nexus Logistics LLC',
    contactName: 'David Kalu',
    email: 'david@nexuslogistics.com',
    phone: '+1 (555) 901-2345',
    address: '1200 Harbour Blvd, Chicago, IL 60601',
    totalInvoiced: 15800,
    outstanding: 6800,
  },
];

// Helper to format dates relative to today
const today = new Date();
const getDateOffset = (days) => {
  const d = new Date(today);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

export const initialInvoices = [
  {
    id: 'INV-2026-001',
    clientId: 'cli-1',
    clientName: 'Acme Software Corp',
    clientEmail: 'sarah@acmecorp.com',
    issueDate: getDateOffset(-20),
    dueDate: getDateOffset(-5), // Overdue by 5 days
    status: 'overdue', // overdue, paid, pending, draft
    amount: 4500.00,
    taxRate: 10,
    notes: 'Q3 UI/UX Design Sprint & Prototyping',
    items: [
      { id: 1, description: 'UX Research & Wireframing', quantity: 20, rate: 125, total: 2500 },
      { id: 2, description: 'High-Fidelity Figma Prototypes', quantity: 16, rate: 125, total: 2000 },
    ],
    remindersSent: 2,
    lastReminderDate: getDateOffset(-2),
    autoReminderEnabled: true,
  },
  {
    id: 'INV-2026-002',
    clientId: 'cli-4',
    clientName: 'Nexus Logistics LLC',
    clientEmail: 'david@nexuslogistics.com',
    issueDate: getDateOffset(-12),
    dueDate: getDateOffset(-2), // Overdue by 2 days
    status: 'overdue',
    amount: 6800.00,
    taxRate: 8,
    notes: 'Custom ERP Integration Phase 2',
    items: [
      { id: 1, description: 'API Middleware Development', quantity: 40, rate: 150, total: 6000 },
      { id: 2, description: 'Deployment & CI/CD Setup', quantity: 8, rate: 100, total: 800 },
    ],
    remindersSent: 1,
    lastReminderDate: getDateOffset(-1),
    autoReminderEnabled: true,
  },
  {
    id: 'INV-2026-003',
    clientId: 'cli-2',
    clientName: 'Apex Marketing Agency',
    clientEmail: 'marcus@apexagency.io',
    issueDate: getDateOffset(-5),
    dueDate: getDateOffset(3), // Due in 3 days
    status: 'pending',
    amount: 3200.00,
    taxRate: 0,
    notes: 'SEO Audit and Content Strategy',
    items: [
      { id: 1, description: 'Technical SEO Audit', quantity: 1, rate: 1700, total: 1700 },
      { id: 2, description: 'Content Calendar & 5 Articles', quantity: 1, rate: 1500, total: 1500 },
    ],
    remindersSent: 1,
    lastReminderDate: getDateOffset(-4),
    autoReminderEnabled: true,
  },
  {
    id: 'INV-2026-004',
    clientId: 'cli-3',
    clientName: 'BrightDesign Studio',
    clientEmail: 'elena@brightdesign.co',
    issueDate: getDateOffset(-30),
    dueDate: getDateOffset(-15),
    status: 'paid',
    paidDate: getDateOffset(-12),
    amount: 6400.00,
    taxRate: 5,
    notes: 'Brand Refresh & Design System',
    items: [
      { id: 1, description: 'Brand Guidelines & Asset Pack', quantity: 1, rate: 6400, total: 6400 },
    ],
    remindersSent: 1,
    lastReminderDate: getDateOffset(-16),
    autoReminderEnabled: false,
  },
  {
    id: 'INV-2026-005',
    clientId: 'cli-1',
    clientName: 'Acme Software Corp',
    clientEmail: 'sarah@acmecorp.com',
    issueDate: getDateOffset(-45),
    dueDate: getDateOffset(-30),
    status: 'paid',
    paidDate: getDateOffset(-28),
    amount: 8000.00,
    taxRate: 0,
    notes: 'Initial Project Deposit',
    items: [
      { id: 1, description: 'Milestone 1 Retainer', quantity: 1, rate: 8000, total: 8000 },
    ],
    remindersSent: 0,
    lastReminderDate: null,
    autoReminderEnabled: false,
  },
];

export const initialReminderRules = [
  {
    id: 'rule-1',
    title: 'Upcoming Due Date Warning',
    triggerDays: -3, // 3 days before due date
    type: 'before_due',
    channels: ['email'],
    enabled: true,
    subject: 'Friendly Reminder: Invoice #{invoice_id} is due in 3 days',
    template: 'Hi {client_name},\n\nThis is a friendly reminder that invoice {invoice_id} for {amount_due} is due on {due_date}.\n\nYou can view and pay your invoice online here: {payment_link}\n\nThank you for your business!\nBest regards,\nYour Finance Team',
  },
  {
    id: 'rule-2',
    title: 'Due Today Notification',
    triggerDays: 0, // On due date
    type: 'on_due',
    channels: ['email', 'sms'],
    enabled: true,
    subject: 'Payment Due Today: Invoice #{invoice_id}',
    template: 'Hello {client_name},\n\nJust a quick note that invoice {invoice_id} for {amount_due} is due today, {due_date}.\n\nPlease process payment at your earliest convenience: {payment_link}\n\nThank you!',
  },
  {
    id: 'rule-3',
    title: 'First Overdue Notice',
    triggerDays: 3, // 3 days after due date
    type: 'after_due',
    channels: ['email'],
    enabled: true,
    subject: 'Overdue Notice: Invoice #{invoice_id} is now past due',
    template: 'Dear {client_name},\n\nOur records indicate that invoice {invoice_id} for {amount_due} was due on {due_date} and is now past due.\n\nIf you have already sent payment, please disregard this note. Otherwise, please remit payment immediately using this link: {payment_link}\n\nIf you need assistance or require an extension, please reply to this email.',
  },
  {
    id: 'rule-4',
    title: 'Urgent Past Due Escalation',
    triggerDays: 14, // 14 days after due date
    type: 'after_due',
    channels: ['email', 'sms'],
    enabled: true,
    subject: 'URGENT: Outstanding Invoice #{invoice_id} - Action Required',
    template: 'Attention {client_name},\n\nInvoice {invoice_id} ({amount_due}) is now 14 days overdue (Due Date: {due_date}).\n\nPlease make an immediate payment to avoid service interruption or late payment fees.\n\nPay immediately: {payment_link}',
  },
];

export const initialReminderLogs = [
  {
    id: 'log-101',
    invoiceId: 'INV-2026-001',
    clientName: 'Acme Software Corp',
    clientEmail: 'sarah@acmecorp.com',
    type: 'First Overdue Notice',
    channel: 'Email',
    sentAt: getDateOffset(-2) + ' 09:15 AM',
    status: 'Delivered',
  },
  {
    id: 'log-102',
    invoiceId: 'INV-2026-002',
    clientName: 'Nexus Logistics LLC',
    clientEmail: 'david@nexuslogistics.com',
    type: 'Due Today Notification',
    channel: 'Email & SMS',
    sentAt: getDateOffset(-1) + ' 08:30 AM',
    status: 'Delivered',
  },
  {
    id: 'log-103',
    invoiceId: 'INV-2026-003',
    clientName: 'Apex Marketing Agency',
    clientEmail: 'marcus@apexagency.io',
    type: 'Upcoming Due Date Warning',
    channel: 'Email',
    sentAt: getDateOffset(-4) + ' 10:00 AM',
    status: 'Opened',
  },
];
