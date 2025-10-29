import React, { useState, useMemo } from "react";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Search, Bookmark, ArrowLeft, Settings, Sun, Moon, Copy, Check, Book } from 'lucide-react';
import bibleData from "@/assets/kjv-full.json";
import { bibleVersions } from '@/data/bibleVersions';
import { toast } from "sonner";

interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

interface BibleChapter {
  book: string;
  chapter: number;
  verses: Array<{ verse: number; text: string }>;
}

const Bible = () => {
  const [selectedVersion, setSelectedVersion] = useState<string>('kjv');
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<BibleVerse[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [copiedVerse, setCopiedVerse] = useState<string | null>(null);

  // Parse the Bible data structure
  const parsedBible = useMemo(() => {
    const books: Record<string, BibleChapter[]> = {};
    
    bibleData.forEach((item: any) => {
      const bookName = item.name;
      
      if (!books[bookName]) {
        books[bookName] = [];
      }
      
      item.chapters.forEach((chapter: any, chapterIndex: number) => {
        books[bookName].push({
          book: bookName,
          chapter: chapterIndex + 1,
          verses: chapter.map((verseText: string, verseIndex: number) => ({
            verse: verseIndex + 1,
            text: verseText
          }))
        });
      });
    });
    
    return books;
  }, []);

  const bookNames = useMemo(() => Object.keys(parsedBible), [parsedBible]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults([]);
      return;
    }
    
    const matches: BibleVerse[] = [];
    const lowerQuery = query.toLowerCase();
    
    Object.entries(parsedBible).forEach(([bookName, chapters]) => {
      chapters.forEach((chapter) => {
        chapter.verses.forEach((verse) => {
          if (verse.text.toLowerCase().includes(lowerQuery)) {
            matches.push({
              book: bookName,
              chapter: chapter.chapter,
              verse: verse.verse,
              text: verse.text
            });
          }
        });
      });
    });
    
    setSearchResults(matches.slice(0, 50));
  };

  const toggleBookmark = (book: string, chapter: number, verse: number) => {
    const key = `${book}-${chapter}-${verse}`;
    if (bookmarks.includes(key)) {
      setBookmarks(bookmarks.filter((k) => k !== key));
      toast.success("Bookmark removed");
    } else {
      setBookmarks([...bookmarks, key]);
      toast.success("Verse bookmarked");
    }
  };

  const copyVerse = (verse: BibleVerse) => {
    const text = `${verse.book} ${verse.chapter}:${verse.verse} - ${verse.text}`;
    navigator.clipboard.writeText(text);
    setCopiedVerse(`${verse.book}-${verse.chapter}-${verse.verse}`);
    toast.success("Verse copied to clipboard!");
    setTimeout(() => setCopiedVerse(null), 2000);
  };

  const getBookmarkedVerse = (key: string): BibleVerse | null => {
    const [book, chapterStr, verseStr] = key.split("-");
    const chapter = parseInt(chapterStr);
    const verse = parseInt(verseStr);
    
    const chapterData = parsedBible[book]?.[chapter - 1];
    if (!chapterData) return null;
    
    const verseData = chapterData.verses.find(v => v.verse === verse);
    if (!verseData) return null;
    
    return { book, chapter, verse, text: verseData.text };
  };

  const handleVerseSelect = (verseNum: number) => {
    setSelectedVerse(verseNum);
    // Scroll to verse
    setTimeout(() => {
      const element = document.getElementById(`verse-${verseNum}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const containerClass = `min-h-screen transition-colors duration-300 ${
    darkMode ? 'bg-gray-900 text-white' : 'bg-background text-foreground'
  }`;

  const cardClass = `p-4 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
    darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-card hover:bg-muted/50'
  }`;

  return (
    <div className={containerClass} style={{ fontSize: `${fontSize}px` }}>
      <Navigation />
      
      {/* Biblical Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl animate-float">📖</div>
        <div className="absolute top-40 right-20 text-5xl animate-float" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-20 left-1/4 text-7xl animate-float" style={{ animationDelay: '2s' }}>🕊️</div>
        <div className="absolute top-60 right-1/3 text-4xl animate-float" style={{ animationDelay: '3s' }}>🔥</div>
        <div className="absolute bottom-40 right-10 text-6xl animate-float" style={{ animationDelay: '4s' }}>🎺</div>
      </div>
      
      <div className="pt-20 pb-8 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-up">
            <Badge variant="secondary" className="mb-4 glass-morphism">
              📖 Bible Reader
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-display font-bold mb-4 text-gradient">
              Holy Bible
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Search, read, bookmark, and copy verses from God's Word
            </p>
            
            {/* Version Selector */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <Book className="w-5 h-5 text-brand-gold" />
              <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                <SelectTrigger className="w-64 bg-background/80 border-brand-gold/30 focus:border-brand-gold">
                  <SelectValue placeholder="Select Version" />
                </SelectTrigger>
                <SelectContent className="bg-background/95 backdrop-blur-lg border-brand-gold/30 z-[100]">
                  {bibleVersions.map((version) => (
                    <SelectItem key={version.id} value={version.id} className="hover:bg-brand-gold/10 focus:bg-brand-gold/10">
                      {version.name} ({version.abbr})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Settings */}
          <Card className="glass-morphism mb-8 p-4 animate-scale-in relative z-10 bg-background/95 backdrop-blur-md shadow-xl border-brand-orange/20">
            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                <span className="font-medium text-sm">Settings:</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-2 whitespace-nowrap transition-all duration-300 hover:scale-105"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span className="hidden sm:inline">{darkMode ? 'Light' : 'Dark'} Mode</span>
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm whitespace-nowrap">Font:</span>
                <Input
                  type="number"
                  value={fontSize}
                  min={12}
                  max={24}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-16 text-sm"
                />
              </div>
            </div>
          </Card>

          {/* Search */}
          <Card className="glass-morphism mb-8 shadow-glow p-4 animate-scale-in">
            <div className="relative">
              <Search className="w-5 h-5 md:w-6 md:h-6 absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-brand-orange" />
              <Input
                type="text"
                placeholder="Search all verses..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 md:pl-14 pr-4 md:pr-6 py-4 md:py-6 text-base md:text-lg glass-morphism border-brand-orange/30 focus:border-brand-orange focus:ring-brand-orange"
              />
            </div>
          </Card>

          {/* Search Results */}
          {searchQuery && (
            <Card className="glass-morphism mb-8 p-4 md:p-6 animate-fade-in">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                Search Results ({searchResults.length})
              </h2>
              {searchResults.length === 0 ? (
                <p className="text-muted-foreground">No matches found.</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {searchResults.map((result, index) => {
                    const key = `${result.book}-${result.chapter}-${result.verse}`;
                    const isCopied = copiedVerse === key;
                    return (
                      <div
                        key={`${key}-${index}`}
                        className={`${cardClass} ${
                          bookmarks.includes(key) ? 'bg-yellow-200 dark:bg-yellow-800' : ''
                        }`}
                      >
                        <div className="flex items-start gap-2 md:gap-3">
                          <Bookmark 
                            className={`w-4 h-4 md:w-5 md:h-5 mt-1 flex-shrink-0 ${
                              bookmarks.includes(key)
                                ? 'fill-yellow-500 text-yellow-500'
                                : 'text-muted-foreground'
                            }`}
                            onClick={() => toggleBookmark(result.book, result.chapter, result.verse)}
                          />
                          <div className="flex-1 min-w-0">
                            <strong className="text-brand-orange text-sm md:text-base break-words">
                              {result.book} {result.chapter}:{result.verse}
                            </strong>
                            <p className="mt-1 text-sm md:text-base break-words">{result.text}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyVerse(result)}
                            className="flex-shrink-0"
                          >
                            {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          )}

          {/* Navigation */}
          {!searchQuery && (
            <>
              {/* Books List */}
              {!selectedBook && (
                <Card className="glass-morphism p-4 md:p-6 animate-fade-in">
                  <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
                    Books of the Bible
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {bookNames.map((bookName) => (
                      <div
                        key={bookName}
                        className={cardClass}
                        onClick={() => {
                          setSelectedBook(bookName);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <div className="text-center">
                          <BookOpen className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-brand-orange" />
                          <span className="font-medium text-sm md:text-base break-words">{bookName}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Chapters List */}
              {selectedBook && !selectedChapter && (
                <Card className="glass-morphism p-4 md:p-6 animate-fade-in">
                  <div className="flex items-center gap-3 mb-6">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedBook(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex items-center gap-2 whitespace-nowrap text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Back to Books</span>
                      <span className="sm:hidden">Back</span>
                    </Button>
                    <h2 className="text-lg md:text-2xl font-bold break-words">{selectedBook}</h2>
                  </div>
                  <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 md:gap-3">
                    {parsedBible[selectedBook]?.map((chapter, index) => (
                      <div
                        key={index}
                        className={`${cardClass} text-center p-2 md:p-4`}
                        onClick={() => {
                          setSelectedChapter(chapter.chapter);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <span className="font-bold text-sm md:text-base">{chapter.chapter}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Verse Selection */}
              {selectedBook && selectedChapter && !selectedVerse && (
                <Card className="glass-morphism p-4 md:p-6 mb-4 animate-fade-in">
                  <h3 className="text-base md:text-lg font-bold mb-4">Select a Verse:</h3>
                  <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                    {parsedBible[selectedBook]?.[selectedChapter - 1]?.verses.map((v) => (
                      <Button
                        key={v.verse}
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerseSelect(v.verse)}
                        className="text-xs md:text-sm"
                      >
                        {v.verse}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedVerse(0)}
                    className="mt-4 w-full text-sm"
                  >
                    View All Verses
                  </Button>
                </Card>
              )}

              {/* Chapter Content */}
              {selectedBook && selectedChapter && selectedVerse !== null && (
                <Card className="glass-morphism p-4 md:p-6 animate-fade-in">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6 flex-wrap">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedBook(null);
                        setSelectedChapter(null);
                        setSelectedVerse(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex items-center gap-2 whitespace-nowrap text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Books</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedChapter(null);
                        setSelectedVerse(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex items-center gap-2 whitespace-nowrap text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Chapters</span>
                    </Button>
                    <h2 className="text-lg md:text-2xl font-bold break-words">
                      {selectedBook} {selectedChapter}
                    </h2>
                  </div>
                  
                  <div className="space-y-4">
                    {parsedBible[selectedBook]?.[selectedChapter - 1]?.verses
                      .map((verseData) => {
                        const key = `${selectedBook}-${selectedChapter}-${verseData.verse}`;
                        const isCopied = copiedVerse === key;
                        return (
                          <div
                            key={verseData.verse}
                            id={`verse-${verseData.verse}`}
                            className={`${cardClass} ${
                              bookmarks.includes(key) ? 'bg-yellow-200 dark:bg-yellow-800' : ''
                            } ${selectedVerse === verseData.verse && selectedVerse !== 0 ? 'ring-4 ring-brand-orange bg-brand-orange/10 shadow-glow' : ''}`}
                          >
                            <div className="flex items-start gap-2 md:gap-3">
                              <Badge variant="outline" className="mt-1 min-w-[2.5rem] md:min-w-[3rem] justify-center flex-shrink-0 text-xs md:text-sm">
                                {verseData.verse}
                              </Badge>
                              <p className="flex-1 leading-relaxed text-sm md:text-base break-words">{verseData.text}</p>
                              <div className="flex gap-1 flex-shrink-0">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyVerse({
                                    book: selectedBook,
                                    chapter: selectedChapter,
                                    verse: verseData.verse,
                                    text: verseData.text
                                  })}
                                  className="p-2"
                                >
                                  {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                </Button>
                                <Bookmark 
                                  className={`w-4 h-4 md:w-5 md:h-5 mt-2 cursor-pointer ${
                                    bookmarks.includes(key)
                                      ? 'fill-yellow-500 text-yellow-500'
                                      : 'text-muted-foreground hover:text-yellow-500'
                                  }`}
                                  onClick={() => toggleBookmark(selectedBook, selectedChapter, verseData.verse)}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </Card>
              )}
            </>
          )}

          {/* Bookmarks */}
          {bookmarks.length > 0 && (
            <Card className="glass-morphism mt-8 p-4 md:p-6 animate-fade-in">
              <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
                <Bookmark className="w-5 h-5 md:w-6 md:h-6 fill-yellow-500 text-yellow-500" />
                Bookmarks ({bookmarks.length})
              </h2>
              <div className="space-y-3">
                {bookmarks.map((key) => {
                  const verse = getBookmarkedVerse(key);
                  if (!verse) return null;
                  
                  return (
                    <div
                      key={key}
                      className={`${cardClass} bg-yellow-200 dark:bg-yellow-800`}
                      onClick={() => {
                        setSelectedBook(verse.book);
                        setSelectedChapter(verse.chapter);
                        setSelectedVerse(verse.verse);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <div className="flex items-start gap-2 md:gap-3">
                        <Bookmark className="w-4 h-4 md:w-5 md:h-5 mt-1 fill-yellow-500 text-yellow-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <strong className="text-brand-orange text-sm md:text-base break-words">
                            {verse.book} {verse.chapter}:{verse.verse}
                          </strong>
                          <p className="mt-1 text-sm md:text-base break-words">{verse.text}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Bible;
