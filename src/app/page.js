'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle, Users, Send } from 'lucide-react';

export default function Home() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('username', username);
      router.push('/chat');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Chat em Tempo Real
            </h1>
            <p className="text-gray-300">
              Entre e comece a conversar instantaneamente
            </p>
          </div>

          <form onSubmit={handleJoin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Escolha seu nome de usuário
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu nome..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                required
                minLength={3}
                maxLength={20}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Entrar no Chat
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300">Salas Públicas</p>
              </div>
              <div>
                <MessageCircle className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300">Tempo Real</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Desenvolvido com Next.js + Socket.io
        </p>
      </div>
    </div>
  );
}