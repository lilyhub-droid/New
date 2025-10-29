import React, { useEffect, useState, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User
} from 'firebase/auth';
import { 
  getDatabase, 
  ref, 
  push, 
  onChildAdded, 
  set,
  query,
  limitToLast,
  get
} from 'firebase/database';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, LogOut, BookOpen, Home, Flame, MessageCircle, Users, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImage from '@/assets/new-elohims-logo.png';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUrW-ndUcVxPvU58NYfhxo4djtEX-obDk",
  authDomain: "biblestudychat-af56f.firebaseapp.com",
  databaseURL: "https://biblestudychat-af56f-default-rtdb.firebaseio.com",
  projectId: "biblestudychat-af56f",
  storageBucket: "biblestudychat-af56f.firebasestorage.app",
  messagingSenderId: "76335953559",
  appId: "1:76335953559:web:7d24d694dc07d78c679bd2",
  measurementId: "G-6HZDHX4N97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Sample Bible verses for sidebar
const bibleVerses = [
  { verse: "John 3:16", text: "For God so loved the world that he gave his one and only Son..." },
  { verse: "Psalm 23:1", text: "The Lord is my shepherd, I lack nothing." },
  { verse: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart..." },
  { verse: "Romans 8:28", text: "And we know that in all things God works for the good..." },
  { verse: "Philippians 4:13", text: "I can do all this through him who gives me strength." },
  { verse: "Isaiah 41:10", text: "So do not fear, for I am with you..." },
  { verse: "Jeremiah 29:11", text: "For I know the plans I have for you..." },
  { verse: "Matthew 28:20", text: "I am with you always, to the very end of the age." },
];

interface Message {
  uid: string | null;
  name: string;
  text: string;
  createdAt: number;
  reactions?: { [emoji: string]: string[] }; // emoji -> array of user IDs
}

interface TypingUser {
  uid: string;
  name: string;
  timestamp: number;
}

const UpperRoom = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [showAuth, setShowAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Rotate Bible verses every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVerseIndex((prev) => (prev + 1) % bibleVerses.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        setShowAuth(false);
        
        // Set user as online
        const userStatusRef = ref(db, `presence/${user.uid}`);
        await set(userStatusRef, {
          name: user.displayName || 'Anonymous',
          online: true,
          lastSeen: Date.now()
        });

        // Load messages
        const messagesRef = ref(db, 'messages');
        const messagesQuery = query(messagesRef, limitToLast(100));
        
        const snapshot = await get(messagesQuery);
        const loadedMessages: Message[] = [];
        snapshot.forEach((childSnapshot) => {
          loadedMessages.push(childSnapshot.val());
        });
        setMessages(loadedMessages);

        // Listen for new messages
        onChildAdded(messagesQuery, (snapshot) => {
          const newMessage = snapshot.val();
          setMessages((prev) => {
            if (prev.some(msg => msg.createdAt === newMessage.createdAt && msg.uid === newMessage.uid)) {
              return prev;
            }
            return [...prev, newMessage];
          });
        });

        // Listen for online users
        const presenceRef = ref(db, 'presence');
        onChildAdded(presenceRef, (snapshot) => {
          const userId = snapshot.key;
          if (userId && snapshot.val()?.online) {
            setOnlineUsers(prev => [...new Set([...prev, userId])]);
          }
        });

        // Listen for typing users
        const typingRef = ref(db, 'typing');
        onChildAdded(typingRef, (snapshot) => {
          const userId = snapshot.key;
          const typingData = snapshot.val();
          if (userId && typingData) {
            setTypingUsers(prev => {
              const filtered = prev.filter(u => u.uid !== userId);
              return [...filtered, { uid: userId, name: typingData.name, timestamp: typingData.timestamp }];
            });
          }
        });

        // Clean up typing users periodically
        const typingCleanup = setInterval(() => {
          setTypingUsers(prev => prev.filter(u => Date.now() - u.timestamp < 3000));
        }, 1000);

        return () => {
          clearInterval(typingCleanup);
        };
      }
    });

    return () => unsubscribe();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user && displayName) {
        await updateProfile(userCredential.user, { displayName });
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setMessages([]);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const sendMessage = async () => {
    if (!messageInput.trim() || !currentUser) return;

    try {
      const messagesRef = ref(db, 'messages');
      const newMessageRef = push(messagesRef);
      
      await set(newMessageRef, {
        uid: currentUser.uid,
        name: currentUser.displayName || 'Anonymous',
        text: messageInput,
        createdAt: Date.now(),
        reactions: {}
      });

      setMessageInput('');
      setIsTyping(false);
      
      // Clear typing indicator
      if (currentUser) {
        const typingRef = ref(db, `typing/${currentUser.uid}`);
        await set(typingRef, null);
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      alert('Failed to send message: ' + error.message);
    }
  };

  const handleTyping = () => {
    if (!currentUser) return;
    
    if (!isTyping) {
      setIsTyping(true);
      const typingRef = ref(db, `typing/${currentUser.uid}`);
      set(typingRef, {
        name: currentUser.displayName || 'Anonymous',
        timestamp: Date.now()
      });
    }

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to clear typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      const typingRef = ref(db, `typing/${currentUser.uid}`);
      set(typingRef, null);
    }, 2000);
  };

  const addReaction = async (messageId: string, emoji: string) => {
    if (!currentUser) return;
    
    const messageIndex = messages.findIndex(m => m.createdAt.toString() === messageId);
    if (messageIndex === -1) return;

    const message = messages[messageIndex];
    const reactions = message.reactions || {};
    const userReactions = reactions[emoji] || [];
    
    // Toggle reaction
    const newUserReactions = userReactions.includes(currentUser.uid)
      ? userReactions.filter(uid => uid !== currentUser.uid)
      : [...userReactions, currentUser.uid];

    const updatedReactions = {
      ...reactions,
      [emoji]: newUserReactions.length > 0 ? newUserReactions : undefined
    };

    // Remove undefined values
    Object.keys(updatedReactions).forEach(key => 
      updatedReactions[key] === undefined && delete updatedReactions[key]
    );

    // Update local state
    setMessages(prev => prev.map((m, i) => 
      i === messageIndex ? { ...m, reactions: updatedReactions } : m
    ));
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/5">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        {/* Navigation Icons */}
        <div className="absolute top-6 left-6 z-50 flex gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon" className="bg-background/80 backdrop-blur-sm hover:bg-background/90">
              <Home className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Auth Form */}
        <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
          <Card className="w-full max-w-md p-8 bg-background/80 backdrop-blur-xl border-brand-gold/20 shadow-2xl">
            <div className="flex flex-col items-center mb-8">
              <img src={logoImage} alt="ELOHIM'S Logo" className="w-20 h-20 mb-4 rounded-xl" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-orange to-brand-gold bg-clip-text text-transparent mb-2">
                UPPER ROOM
              </h1>
              <p className="text-muted-foreground text-center">Enter the fellowship chamber</p>
            </div>

            <form onSubmit={showAuth ? handleRegister : handleLogin} className="space-y-4">
              {showAuth && (
                <Input
                  type="text"
                  placeholder="Display Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="bg-background/50 border-brand-gold/30 focus:border-brand-gold"
                  required
                />
              )}
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/50 border-brand-gold/30 focus:border-brand-gold"
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/50 border-brand-gold/30 focus:border-brand-gold"
                required
              />
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-brand-orange to-brand-gold hover:from-brand-orange/90 hover:to-brand-gold/90 text-white font-semibold"
              >
                {showAuth ? 'Register' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAuth(!showAuth)}
                className="text-sm text-muted-foreground hover:text-brand-gold transition-colors"
              >
                {showAuth ? 'Already have an account? Sign In' : 'Need an account? Register'}
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Main Chat Interface - Full Screen Immersive
  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-gradient-to-br from-background via-background/98 to-primary/5">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <Flame 
            key={i}
            className="absolute text-brand-orange/20 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-20 bg-background/60 backdrop-blur-xl border-b border-brand-gold/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="hover:bg-brand-gold/10">
                <Home className="w-5 h-5" />
              </Button>
            </Link>
            <img src={logoImage} alt="Logo" className="w-10 h-10 rounded-lg" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-brand-orange to-brand-gold bg-clip-text text-transparent">
                UPPER ROOM
              </h1>
              <p className="text-xs text-muted-foreground">Divine Fellowship</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-background/50 rounded-lg border border-brand-gold/20">
              <Users className="w-4 h-4 text-brand-gold" />
              <span className="text-sm text-muted-foreground">{onlineUsers.length} online</span>
            </div>
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-background/50 rounded-lg border border-brand-gold/20">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-muted-foreground">{currentUser.displayName || currentUser.email}</span>
            </div>
            <Button onClick={handleSignOut} variant="outline" size="sm" className="border-brand-gold/30 hover:border-brand-gold hover:bg-brand-gold/10">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row relative z-10 overflow-hidden">
        {/* Chat Area - Full Height */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Messages */}
          <ScrollArea className="flex-1 px-4 md:px-8 py-6">
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.uid === currentUser?.uid ? 'justify-end' : 'justify-start'} group`}
                >
                  <div className={`max-w-xs md:max-w-md lg:max-w-lg ${
                    msg.uid === currentUser?.uid 
                      ? 'bg-gradient-to-r from-brand-orange to-brand-gold text-white' 
                      : 'bg-card border border-border'
                  } rounded-2xl px-4 py-3 shadow-lg relative`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold ${
                        msg.uid === currentUser?.uid ? 'text-white/90' : 'text-brand-gold'
                      }`}>
                        {msg.name}
                      </span>
                      <span className={`text-xs ${
                        msg.uid === currentUser?.uid ? 'text-white/70' : 'text-muted-foreground'
                      }`}>
                        {formatTime(msg.createdAt)}
                      </span>
                    </div>
                    <p className={`mb-2 ${msg.uid === currentUser?.uid ? 'text-white' : 'text-foreground'}`}>
                      {msg.text}
                    </p>
                    
                    {/* Reactions */}
                    {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                      <div className="flex gap-1 flex-wrap mt-2">
                        {Object.entries(msg.reactions).map(([emoji, users]) => (
                          users && users.length > 0 && (
                            <button
                              key={emoji}
                              onClick={() => addReaction(msg.createdAt.toString(), emoji)}
                              className={`text-xs px-2 py-1 rounded-full ${
                                users.includes(currentUser?.uid || '')
                                  ? 'bg-brand-gold/20 border border-brand-gold'
                                  : 'bg-background/50 border border-border'
                              } hover:scale-110 transition-transform`}
                            >
                              {emoji} {users.length}
                            </button>
                          )
                        ))}
                      </div>
                    )}
                    
                    {/* Quick Reactions */}
                    <div className="absolute -bottom-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity bg-background border border-border rounded-full px-2 py-1 flex gap-1 shadow-lg z-10">
                      {['❤️', '🙏', '✨', '🔥', '👏'].map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => addReaction(msg.createdAt.toString(), emoji)}
                          className="text-lg hover:scale-125 transition-transform"
                          title={`React with ${emoji}`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {typingUsers.filter(u => u.uid !== currentUser?.uid).length > 0 && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border rounded-2xl px-4 py-3 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {typingUsers.filter(u => u.uid !== currentUser?.uid).map(u => u.name).join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 md:p-6 bg-background/60 backdrop-blur-xl border-t border-brand-gold/20">
            <div className="max-w-4xl mx-auto flex gap-3">
              <Input
                value={messageInput}
                onChange={(e) => {
                  setMessageInput(e.target.value);
                  handleTyping();
                }}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Share your thoughts..."
                className="flex-1 bg-background/80 border-brand-gold/30 focus:border-brand-gold rounded-full px-6"
              />
              <Button 
                onClick={sendMessage} 
                className="rounded-full bg-gradient-to-r from-brand-orange to-brand-gold hover:from-brand-orange/90 hover:to-brand-gold/90 text-white px-6"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bible Verse Sidebar */}
        <aside className="hidden lg:block w-80 border-l border-brand-gold/20 bg-background/40 backdrop-blur-xl p-6 overflow-y-auto">
          <div className="sticky top-0 space-y-6">
            <div className="flex items-center gap-2 text-brand-gold">
              <BookOpen className="w-5 h-5" />
              <h3 className="font-semibold">Daily Verse</h3>
            </div>
            <Card className="p-6 bg-gradient-to-br from-background/80 to-primary/5 border-brand-gold/20 shadow-xl">
              <p className="text-xs font-semibold text-brand-gold mb-3">{bibleVerses[currentVerseIndex].verse}</p>
              <p className="text-sm leading-relaxed text-foreground/90">{bibleVerses[currentVerseIndex].text}</p>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default UpperRoom;
