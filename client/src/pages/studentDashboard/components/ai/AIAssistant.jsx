import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Trash2, RefreshCw, Copy, Check } from 'lucide-react';
import { fadeInUp } from '../../utils/animations';
import { useAIAssistant } from '../../hooks/useAIAssistant';

export const AIAssistant = () => {
  const { 
    messages, 
    isTyping, 
    isAiAvailable, 
    sendMessage, 
    clearMessages,
    resetConversation 
  } = useAIAssistant();
  
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the conversation?')) {
      clearMessages();
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset the conversation? This will clear all messages.')) {
      resetConversation();
    }
  };

  return (
    <motion.div 
      variants={fadeInUp}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-[500px] flex flex-col"
    >
      <AssistantHeader 
        isAiAvailable={isAiAvailable}
        onClear={handleClearChat}
        onReset={handleReset}
      />
      
      <MessagesList 
        messages={messages} 
        isTyping={isTyping} 
        isAiAvailable={isAiAvailable}
      />
      
      <div ref={messagesEndRef} />
      
      <MessageInput 
        value={inputMessage}
        onChange={setInputMessage}
        onSend={handleSendMessage}
        onKeyPress={handleKeyPress}
        disabled={!isAiAvailable}
      />
    </motion.div>
  );
};

const AssistantHeader = ({ isAiAvailable, onClear, onReset }) => (
  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white flex justify-between items-center">
    <div className="flex items-center gap-2">
      <Bot className="w-4 h-4" />
      <h3 className="font-semibold text-sm">AI Assistant</h3>
      <div className={`ml-2 w-2 h-2 rounded-full ${isAiAvailable ? 'bg-green-300 animate-pulse' : 'bg-red-300'}`} />
    </div>
    <div className="flex gap-2">
      <button
        onClick={onReset}
        className="p-1 hover:bg-white/20 rounded transition-colors"
        title="Reset conversation"
      >
        <RefreshCw className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={onClear}
        className="p-1 hover:bg-white/20 rounded transition-colors"
        title="Clear messages"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);

const MessagesList = ({ messages, isTyping, isAiAvailable }) => {
  if (!isAiAvailable && messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <Bot className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            AI service is currently unavailable
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            Please check your connection or try again later
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-3">
      {messages.length === 0 && isAiAvailable && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Bot className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Hi! I'm your AI assistant
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
              Ask me anything about programming, learning, or just chat with me!
            </p>
          </div>
        </div>
      )}
      
      {messages.map((msg, idx) => (
        <Message key={msg.id || idx} message={msg} />
      ))}
      
      {isTyping && <TypingIndicatorWithAnimation />}
    </div>
  );
};

// Complete Message formatter that handles ALL cases
const Message = ({ message }) => {
  const [copiedCodeId, setCopiedCodeId] = useState(null);
  
  const copyToClipboard = async (text, codeId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCodeId(codeId);
      setTimeout(() => setCopiedCodeId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  // Main formatter that handles all markdown and code blocks
  const formatMessageContent = (text) => {
    if (!text) return { type: 'text', content: '' };
    
    // First, extract all code blocks (triple backticks)
    const codeBlocks = [];
    const codeBlockRegex = /```(\w*)\s*\n?([\s\S]*?)```/g;
    let processedText = text;
    let match;
    let blockIndex = 0;
    
    // Extract and replace code blocks with placeholders
    while ((match = codeBlockRegex.exec(text)) !== null) {
      const language = match[1] || 'plaintext';
      const code = match[2].trim();
      const placeholder = `__CODE_BLOCK_${blockIndex}__`;
      
      codeBlocks.push({
        id: blockIndex,
        language,
        code,
        placeholder
      });
      
      processedText = processedText.replace(match[0], placeholder);
      blockIndex++;
    }
    
    // Process the remaining text for markdown formatting
    let formattedText = processMarkdown(processedText);
    
    // Replace code block placeholders with actual components
    const parts = [];
    let currentIndex = 0;
    const placeholderRegex = /__CODE_BLOCK_(\d+)__/g;
    let placeholderMatch;
    
    while ((placeholderMatch = placeholderRegex.exec(formattedText)) !== null) {
      // Add text before placeholder
      if (placeholderMatch.index > currentIndex) {
        const textPart = formattedText.substring(currentIndex, placeholderMatch.index);
        if (textPart.trim()) {
          parts.push({
            type: 'text',
            content: textPart
          });
        }
      }
      
      // Add code block
      const blockId = parseInt(placeholderMatch[1]);
      const block = codeBlocks.find(b => b.id === blockId);
      if (block) {
        parts.push({
          type: 'code-block',
          language: block.language,
          code: block.code
        });
      }
      
      currentIndex = placeholderMatch.index + placeholderMatch[0].length;
    }
    
    // Add remaining text after last placeholder
    if (currentIndex < formattedText.length) {
      const remainingText = formattedText.substring(currentIndex);
      if (remainingText.trim()) {
        parts.push({
          type: 'text',
          content: remainingText
        });
      }
    }
    
    // If no code blocks, return simple text
    if (parts.length === 0 && formattedText.trim()) {
      return { type: 'text', content: formattedText };
    }
    
    return { type: 'mixed', parts };
  };
  
  // Process markdown formatting (bold, italic, headers, lists, inline code)
  const processMarkdown = (text) => {
    if (!text) return '';
    
    let formatted = text;
    
    // Handle inline code (single backticks)
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded font-mono text-xs">$1</code>');
    
    // Handle bold text **text**
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle italic text *text*
    formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Handle headers
    formatted = formatted.replace(/^### (.*?)$/gm, '<strong class="block mt-2 mb-1 text-base">$1</strong>');
    formatted = formatted.replace(/^## (.*?)$/gm, '<strong class="block mt-2 mb-1 text-lg">$1</strong>');
    formatted = formatted.replace(/^# (.*?)$/gm, '<strong class="block mt-2 mb-1 text-xl">$1</strong>');
    
    // Handle unordered lists (- item or * item)
    formatted = formatted.replace(/^[-*] (.*?)$/gm, '<li class="ml-4 mb-1">$1</li>');
    
    // Handle ordered lists (1. item)
    formatted = formatted.replace(/^\d+\. (.*?)$/gm, '<li class="ml-4 mb-1 list-decimal">$1</li>');
    
    // Wrap consecutive list items in <ul> or <ol>
    formatted = formatted.replace(/(<li[^>]*>.*?<\/li>\n?)+/g, (match) => {
      if (match.includes('list-decimal')) {
        return `<ol class="my-2">${match}</ol>`;
      }
      return `<ul class="my-2">${match}</ul>`;
    });
    
    // Handle newlines
    formatted = formatted.replace(/\n/g, '<br/>');
    
    return formatted;
  };
  
  const renderedContent = message.type === 'ai' ? formatMessageContent(message.text) : null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[85%] rounded-lg overflow-hidden ${
        message.type === 'user' 
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
          : message.type === 'system'
          ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
      }`}>
        <div className="p-3">
          {message.type === 'ai' ? (
            <div className="text-sm space-y-2">
              {renderedContent.type === 'text' ? (
                <div 
                  className="whitespace-pre-wrap break-words"
                  dangerouslySetInnerHTML={{ __html: renderedContent.content }}
                />
              ) : (
                renderedContent.parts.map((part, idx) => {
                  if (part.type === 'text') {
                    return (
                      <div 
                        key={idx}
                        className="whitespace-pre-wrap break-words"
                        dangerouslySetInnerHTML={{ __html: part.content }}
                      />
                    );
                  } else if (part.type === 'code-block') {
                    return (
                      <div key={idx} className="relative my-3">
                        <div className="bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden border border-gray-700">
                          <div className="flex justify-between items-center px-3 py-2 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
                            <span className="text-xs text-gray-300 font-mono uppercase">
                              {part.language || 'code'}
                            </span>
                            <button
                              onClick={() => copyToClipboard(part.code, idx)}
                              className="flex items-center gap-1 px-2 py-1 text-xs text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                            >
                              {copiedCodeId === idx ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy code</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="p-3 overflow-x-auto">
                            <code className="text-xs font-mono text-gray-300 whitespace-pre-wrap break-words">
                              {part.code}
                            </code>
                          </pre>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })
              )}
            </div>
          ) : message.type === 'user' ? (
            <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
          ) : (
            <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
          )}
          
          {message.tokens && (
            <div className="text-[10px] opacity-70 mt-2">
              ~{message.tokens} tokens
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const TypingIndicatorWithAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
        <div className="flex gap-1.5">
          <motion.span
            className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          />
          <motion.span
            className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">AI is thinking...</p>
      </div>
    </motion.div>
  );
};

const MessageInput = ({ value, onChange, onSend, onKeyPress, disabled }) => (
  <div className="p-3 border-t border-gray-200 dark:border-gray-700">
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder={disabled ? "AI service is unavailable..." : "Type a message..."}
        disabled={disabled}
        className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSend}
        disabled={!value.trim() || disabled}
        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        Send
      </motion.button>
    </div>
  </div>
);