'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Settings,
  HelpCircle,
  ChevronLeft,
  Send,
  CircleUser,
  Ticket,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  MessageSquare,
  Calendar,
  Tag
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from "@/lib/utils";
import { useContextStore } from "@/lib/stores/context-store";

interface Message {
  id: number;
  content: string;
  timestamp: Date;
  isUser: boolean;
}

interface TicketUpdate {
  id: number;
  type: 'comment' | 'status' | 'assignment' | 'priority';
  content: string;
  user: string;
  timestamp: Date;
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'review' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee: string;
  created: Date;
  updated: Date;
  tags: string[];
  updates: TicketUpdate[];
}

const ChatContent = () => {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AI Ticket Assistant. How can I help you today?",
      timestamp: new Date(),
      isUser: false
    }
  ]);
  const [inputValue, setInputValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [apiAvailable, setApiAvailable] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Get context from store for context-aware responses
  const { currentPage, selectedTicket, pageMetadata } = useContextStore();

  // Check API availability on component mount
  React.useEffect(() => {
    const checkApiStatus = async () => {
      try {
        // Dynamic import of the API service
        const apiModule = await import('@/app/services/api');
        const isAvailable = await apiModule.checkApiStatus();

        setApiAvailable(isAvailable);

        if (isAvailable) {
          setMessages(prev => [...prev, {
            id: Date.now(),
            content: '✅ Connected to AI service',
            timestamp: new Date(),
            isUser: false
          }]);
        } else {
          setMessages(prev => [...prev, {
            id: Date.now(),
            content: '⚠️ AI service unavailable',
            timestamp: new Date(),
            isUser: false
          }]);
        }
      } catch (error) {
        console.error('Error checking API status:', error);
        setApiAvailable(false);
        setMessages(prev => [...prev, {
          id: Date.now(),
          content: '⚠️ Error connecting to AI service',
          timestamp: new Date(),
          isUser: false
        }]);
      }
    };

    checkApiStatus();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const newMessage: Message = {
      id: Date.now(),
      content: inputValue,
      timestamp: new Date(),
      isUser: true
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build structured context object
      const contextInfo: any = {};
      if (currentPage) {
        contextInfo.page = currentPage.replace('-', ' ');
      }
      if (selectedTicket) {
        contextInfo.ticketId = selectedTicket.id;
        contextInfo.ticketTitle = selectedTicket.title;
        contextInfo.ticketStatus = selectedTicket.status;
        contextInfo.ticketPriority = selectedTicket.priority;
      }
      if (pageMetadata) {
        contextInfo.metadata = pageMetadata;
      }

      const apiModule = await import('@/app/services/api');
      const response = await apiModule.generateText(
        inputValue,
        Object.keys(contextInfo).length > 0 ? contextInfo : undefined
      );

      const assistantMessage: Message = {
        id: Date.now(),
        content: response.text,
        timestamp: new Date(),
        isUser: false
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('API call failed:', error);

      const errorMessage: Message = {
        id: Date.now(),
        content: '❌ Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
        isUser: false
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessageTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center gap-1.5 text-xs">
          <CheckCircle2 className={`h-3.5 w-3.5 ${apiAvailable ? 'text-emerald-500' : 'text-amber-500'}`} />
          <span>{apiAvailable ? 'API Connected' : 'Connecting...'}</span>
        </div>
      </div>
      
      <div className="flex-1 p-3 space-y-4 overflow-auto">
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-lg ${msg.isUser ?
                'bg-primary text-primary-foreground' :
                msg.content.includes('✅') || msg.content.includes('⚠️') || msg.content.includes('❌') ?
                'bg-muted/50 text-xs' : 'bg-muted'}`}
            >
              {msg.content}
              <div className="text-[10px] text-muted-foreground mt-1">
                {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] p-3 rounded-lg bg-muted flex items-center gap-1.5">
              <motion.div
                className="bg-primary/20 h-2 w-2 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.div
                className="bg-primary/40 h-2 w-2 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="bg-primary/60 h-2 w-2 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3 border-t">
        <div className="flex gap-2">
          <Input 
            placeholder="Type a message..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSend} disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const TicketDetailsContent = () => {
  const { selectedTicket, pageMetadata } = useContextStore();

  // Fallback ticket for when none is selected
  const fallbackTicket: Ticket = {
    id: 'TICKET-1042',
    title: 'API authentication failure in production environment',
    description: 'Users are unable to authenticate to the API in the production environment. This started after the latest deployment at 14:30. Error logs show certificate validation failures.',
    status: 'open',
    priority: 'high',
    assignee: 'Unassigned',
    created: new Date(2025, 4, 6, 16, 30), // May 6, 2025, 16:30
    updated: new Date(2025, 4, 6, 16, 45), // May 6, 2025, 16:45
    tags: ['api', 'authentication', 'production'],
    updates: [
      {
        id: 1,
        type: 'status',
        content: 'Ticket created',
        user: 'John Smith',
        timestamp: new Date(2025, 4, 6, 16, 30)
      },
      {
        id: 2,
        type: 'comment',
        content: 'Initial investigation shows this might be related to the certificate rotation that happened earlier today.',
        user: 'John Smith',
        timestamp: new Date(2025, 4, 6, 16, 35)
      },
      {
        id: 3,
        type: 'priority',
        content: 'Priority changed from Medium to High',
        user: 'Emma Martinez',
        timestamp: new Date(2025, 4, 6, 16, 40)
      }
    ]
  };

  // Use selected ticket from context store, or fallback
  const displayTicket = selectedTicket ? {
    ...selectedTicket,
    // Convert string dates to Date objects for display
    created: new Date(selectedTicket.createdAt),
    updated: selectedTicket.updatedAt ? new Date(selectedTicket.updatedAt) : new Date(selectedTicket.createdAt),
    // Map status from string to expected type
    status: (selectedTicket.status.toLowerCase().replace(' ', '-') as 'open' | 'in-progress' | 'review' | 'resolved'),
    priority: (selectedTicket.priority.toLowerCase() as 'low' | 'medium' | 'high' | 'critical'),
    tags: selectedTicket.category ? [selectedTicket.category] : [],
    updates: [] as TicketUpdate[]
  } : fallbackTicket;

  const currentTicket = displayTicket;

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Ticket className="h-5 w-5 text-blue-500" />
          <span className="font-medium">{currentTicket.id}</span>
        </div>
        <div className="flex items-center gap-2">
          {currentTicket.status === 'open' && (
            <span className="bg-blue-500/20 text-blue-500 px-2 py-0.5 rounded-full text-xs font-medium">Open</span>
          )}
          {currentTicket.status === 'in-progress' && (
            <span className="bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded-full text-xs font-medium">In Progress</span>
          )}
          {currentTicket.status === 'review' && (
            <span className="bg-purple-500/20 text-purple-500 px-2 py-0.5 rounded-full text-xs font-medium">In Review</span>
          )}
          {currentTicket.status === 'resolved' && (
            <span className="bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full text-xs font-medium">Resolved</span>
          )}
          {currentTicket.priority === 'critical' && (
            <span className="bg-red-500/20 text-red-500 px-2 py-0.5 rounded-full text-xs font-medium">Critical</span>
          )}
          {currentTicket.priority === 'high' && (
            <span className="bg-red-500/20 text-red-500 px-2 py-0.5 rounded-full text-xs font-medium">High</span>
          )}
          {currentTicket.priority === 'medium' && (
            <span className="bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded-full text-xs font-medium">Medium</span>
          )}
          {currentTicket.priority === 'low' && (
            <span className="bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full text-xs font-medium">Low</span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">{currentTicket.title}</h3>
        <p className="text-sm text-muted-foreground">{currentTicket.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-muted-foreground">Created:</span>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span>{currentTicket.created.toLocaleString()}</span>
          </div>
        </div>
        <div>
          <span className="text-muted-foreground">Updated:</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span>{currentTicket.updated.toLocaleString()}</span>
          </div>
        </div>
        <div>
          <span className="text-muted-foreground">Assignee:</span>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3 text-muted-foreground" />
            <span>{currentTicket.assignee}</span>
          </div>
        </div>
        <div>
          <span className="text-muted-foreground">Tags:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {currentTicket.tags.map((tag, index) => (
              <span key={index} className="bg-secondary px-1.5 py-0.5 rounded-sm text-[10px] uppercase tracking-wider font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Activity</h4>
        <div className="space-y-3 max-h-[300px] overflow-y-auto">
          {currentTicket.updates.map((update) => (
            <div key={update.id} className="border-l-2 border-muted pl-3 py-1">
              <div className="flex items-center gap-2">
                {update.type === 'comment' && <MessageSquare className="h-3 w-3 text-blue-500" />}
                {update.type === 'status' && <CheckCircle2 className="h-3 w-3 text-green-500" />}
                {update.type === 'assignment' && <User className="h-3 w-3 text-purple-500" />}
                {update.type === 'priority' && <AlertCircle className="h-3 w-3 text-amber-500" />}
                <span className="text-xs font-medium">{update.user}</span>
                <span className="text-xs text-muted-foreground">{update.timestamp.toLocaleTimeString()}</span>
              </div>
              <p className="text-xs mt-1">{update.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <Button 
          className="w-full bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
        >
          Take Action
        </Button>
      </div>
    </div>
  );
};

const menuItems = () => [
  {
    icon: Ticket,
    label: 'Current Ticket',
    iconClassName: 'text-blue-500 subtle-pulse',
    content: <TicketDetailsContent />
  },
  {
    icon: Sparkles,
    label: 'AI Assistant',
    iconClassName: 'text-indigo-400 hover:text-indigo-300',
    content: <ChatContent />
  },
  {
    icon: Settings,
    label: 'Settings',
    content: 'Ticket settings and preferences'
  },
  {
    icon: HelpCircle,
    label: 'Help',
    content: 'Get help and support'
  }
];

export function RightSidebar() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState<number | null>(null);
  const { currentPage, selectedTicket } = useContextStore();

  const items = React.useMemo(() => {
    return menuItems();
  }, []);

  // Format page name for display
  const getPageDisplay = () => {
    if (!currentPage) return 'Ticket Management';
    if (currentPage === 'kanban') return 'Kanban Board';
    if (currentPage === 'ticket-history') return 'Ticket History';
    return currentPage.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleItemClick = (index: number) => {
    if (isExpanded) {
      setActiveItem(activeItem === index ? null : index);
      if (activeItem === index) {
        setIsExpanded(false);
      }
    } else {
      setIsExpanded(true);
      setActiveItem(index);
    }
  };

  return (
    <motion.div
      className="fixed top-0 right-0 h-full bg-background border-l border-border z-50 flex rounded-l-xl dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] shadow-[0_0_15px_rgba(0,0,0,0.1)]"
      animate={{ width: isExpanded ? '384px' : '64px' }}
      initial={{ width: '64px' }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1
      }}
    >
      {isExpanded && (
        <div className="flex flex-col w-[320px] border-r border-border">
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
              if (!isExpanded) setActiveItem(null);
            }}
            className="flex items-center h-14 px-4 border-b border-border hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-2 flex-1">
              <CircleUser className="h-6 w-6 text-muted-foreground" />
              <div className="flex-1 text-left">
                <h2 className="text-sm font-semibold">AI Assistant</h2>
                <p className="text-xs text-muted-foreground">
                  Viewing: {getPageDisplay()}{selectedTicket ? ` - ${selectedTicket.id}` : ''}
                </p>
              </div>
            </div>
          </button>
          {activeItem !== null && (
            <div className="flex-1 overflow-hidden">
              {items[activeItem].content}
            </div>
          )}
        </div>
      )}
      
      <div className={`flex flex-col ${isExpanded ? 'w-16' : 'w-full'}`}>
        <div className="h-14 flex items-center justify-center border-b border-border">
          {!isExpanded && (
            <button
              onClick={() => {
                setIsExpanded(!isExpanded);
                if (!isExpanded) setActiveItem(null);
              }}
              className="p-2 hover:bg-accent/50 rounded-md transition-colors"
            >
              <CircleUser className="h-6 w-6 text-muted-foreground" />
            </button>
          )}
        </div>
        <nav className="flex-1 flex flex-col items-center gap-2 p-2">
          {items.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              data-ai-trigger={item.icon === Sparkles ? true : undefined}
              className={cn(
                'h-9 w-9',
                activeItem === index && 'bg-accent',
                item.iconClassName
              )}
              onClick={() => handleItemClick(index)}
            >
              <item.icon className="h-5 w-5" />
            </Button>
          ))}
        </nav>
      </div>
    </motion.div>
  );
}
