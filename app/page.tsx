'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Question } from '@/types';

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionText, setQuestionText] = useState('');
  const [liked, setLiked] = useState<string[]>([]);

  // Load liked questions from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('likedComments');
    if (storedData) {
      setLiked(JSON.parse(storedData));
    }
    loadQuestions();
  }, []);

  // Auto-refresh questions every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadQuestions();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const loadQuestions = async () => {
    try {
      const response = await fetch('/api/question');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error loading questions:', error);
    }
  };

  const addQuestion = async () => {
    if (!questionText.trim()) return;

    try {
      const response = await fetch('/api/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionText: questionText,
        }),
      });

      const data = await response.json();
      setQuestions(data);
      setQuestionText('');
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const likeQuestion = async (id: string, isLike: boolean) => {
    try {
      let updatedLiked = [...liked];

      if (isLike) {
        updatedLiked.push(id);
      } else {
        updatedLiked = updatedLiked.filter(likedId => likedId !== id);
      }

      setLiked(updatedLiked);
      localStorage.setItem('likedComments', JSON.stringify(updatedLiked));

      const response = await fetch('/api/question', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          questionText: '',
          noOfLikes: isLike ? 1 : 0,
        }),
      });

      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error liking question:', error);
    }
  };


  return (
    <>
      {/* Navigation */}
      <nav className="bg-[#c3094a] text-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-5xl flex flex-wrap items-center justify-between mx-auto p-2">
          <a href="/" className="flex items-center">
            <Image
              src="/images/malimawa.webp"
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-10 mr-2"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Ask Up
            </span>
          </a>
          <a href="https://www.facebook.com/NPPADELAIDE" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/icons8-facebook.svg"
              alt="Facebook"
              width={40}
              height={40}
              className="h-10 w-10 mr-2"
            />
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-5xl m-auto mt-20 lg:mt-28 relative px-2 lg:px-0">
        <div className="content">
          {/* Questions Section */}
          <div>
            <div>
              <div className="bg-white overflow-hidden border border-gray-200 rounded shadow grid grid-cols-[1fr_auto] py-4">
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Type your question..."
                  className="px-4 resize-none outline-none min-h-[40px] max-h-[120px]"
                  rows={1}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = target.scrollHeight + 'px';
                  }}
                />
              </div>
              <div className="text-right lg:text-left">
                <button
                  disabled={!questionText.trim()}
                  onClick={addQuestion}
                  className="mt-4 py-2 px-6 bg-[#c3094aa2] active:bg-[#c3094a] text-white rounded-full cursor-pointer transition-colors hover:bg-[#c3094a] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {questions.map((question) => (
                  <div
                    key={question.id}
                    className="bg-white overflow-hidden border border-gray-200 rounded-md shadow-sm grid grid-cols-[1fr_auto] place-items-start p-4 text-gray-800 relative text-sm"
                  >
                    <span>{question.questionText}</span>
                    <button className="grid grid-cols-2 place-items-center gap-1">
                      {/* Thumbs up outline (not liked) */}
                      {!liked.includes(question.id) && (
                        <svg
                          onClick={() => likeQuestion(question.id, true)}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 text-[#c3094a] opacity-70 hover:opacity-100 transition-all cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                          />
                        </svg>
                      )}
                      {/* Thumbs up filled (liked) */}
                      {liked.includes(question.id) && (
                        <svg
                          onClick={() => likeQuestion(question.id, false)}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 text-[#c3094a] cursor-pointer"
                        >
                          <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                        </svg>
                      )}
                      {question.noOfLikes > 0 && (
                        <span className="text-sm">{question.noOfLikes}</span>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Header Image */}
          <div className="mt-28">
            <Image
              src="/images/header.jpg"
              alt="Header Image"
              width={1200}
              height={400}
              className="w-full h-auto"
              priority={false}
            />
          </div>

          {/* Footer */}
          <footer className="footer relative mt-4 bg-gray-100 text-center p-3">
            NPP Adelaide
          </footer>
        </div>
      </div>
    </>
  );
}

