import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LoadingDots from "@/components/LoadingDots";
import Sidebar from "./SideBar";


const ChatInterface = ({ clearChat, chatLog, isLoading, inputQuestion, setInputQuestion, handleSubmit, chatEnd, currentPage }) => {

    const FAQs = [
        "Khoa CNTT có bao nhiêu tín chỉ",
        "Khoa ngôn ngữ Anh có những môn gì",
        "Khối kiến thức chung gồm những môn gì",
    ];

        const [selectedQuestion, setSelectedQuestion] = useState(null);

    const handleFAQClick = (question: any) => {
        setInputQuestion(question); // Set the clicked question as the input question
        setSelectedQuestion(question); // Set the selected question state
    };

    return (
        <div className="h-screen flex">
            <Sidebar currentPage={currentPage} clearChat={clearChat}/>
        
            {/* Main Chat Interface */}
            <div className="flex flex-col flex-grow bg-slate-200">
                <div className="flex-grow p-6 overflow-auto">
                    <div className="flex flex-col space-y-4">
                        {chatLog.map((message: any, index: any) => (
                            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {message.type === 'user' && (
                                    <div className="flex items-center">
                                        <div className={`${message.type === 'user' ? 'bg-red-400' : 'bg-gray-600'} rounded-lg p-4 text-white max-w-xl mr-2`} style={{ wordWrap: 'break-word' }}>
                                            {message.message}
                                        </div>
                                        <Image src="/avatar.jpg" width={50} height={50} alt={"avatar"} className="w-8 h-8 rounded-full" />
                                    </div>
                                )}
                                {message.type === 'bot' && (
                                    <div className="flex items-center">
                                        <Image src="/logo.png" width={50} height={50} alt={"logo"} className="w-8 h-8 rounded-full mr-2" />
                                        <div className={`${message.type === 'user' ? 'bg-red-400' : 'bg-gray-600'} rounded-lg p-4 text-white max-w-xl`} style={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}>
                                            {message.message}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                        }
                        {isLoading && (
                            <div className="flex justify-start">
                                <Image src="/logo.png" width={50} height={50} alt={"logo"} className="w-8 h-8 rounded-full mr-2" />
                                <div className="bg-gray-600 rounded-lg p-4 text-white max-w-sm">
                                    <LoadingDots />
                                </div>
                            </div>
                        )}
                        <div ref={chatEnd} />
                    </div>
                </div>

                {/* Input field */}
                <form onSubmit={handleSubmit} className="flex-none p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {FAQs.map((question, index) => (
                            <button
                                key={index}
                                className={`bg-gray-300 rounded-lg px-4 py-2 text-gray-800 font-semibold focus:outline-none hover:bg-gray-400 transition-colors duration-300 ${selectedQuestion === question ? 'bg-blue-500 text-white' : ''
                                    }`}
                                onClick={() => handleFAQClick(question)}
                            >{question}
                            </button>
                        ))}
                    </div>

                    <div className="flex rounded-lg border border-gray-700 bg-gray-800">
                        <input
                            type="text"
                            className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
                            placeholder="Type your message..."
                            value={inputQuestion}
                            onChange={(e) => setInputQuestion(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-red-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-red-600 transition-colors duration-300"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatInterface;
