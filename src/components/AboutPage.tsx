import React from 'react';
import { Users, School, Mail, Image, Brain, Lock } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 h-[calc(100vh-8rem)] overflow-auto">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">About Vizion</h1>
        
        <div className="mb-8 bg-blue-50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">What is Vizion?</h2>
          <p className="text-gray-700 mb-6">
            Vizion is an advanced AI-powered image analysis tool that combines the power of Google's Generative AI with an intuitive interface. Our platform enables users to gain detailed insights from images through natural conversation.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <Image className="w-6 h-6 text-blue-500 mb-2" />
              <h3 className="font-medium mb-2">Image Analysis</h3>
              <p className="text-sm text-gray-600">Upload any image and get detailed analysis through natural conversation</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <Brain className="w-6 h-6 text-blue-500 mb-2" />
              <h3 className="font-medium mb-2">AI Powered</h3>
              <p className="text-sm text-gray-600">Leveraging Google's Generative AI for accurate and detailed insights</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <Lock className="w-6 h-6 text-blue-500 mb-2" />
              <h3 className="font-medium mb-2">Secure</h3>
              <p className="text-sm text-gray-600">Your uploads are processed securely and not stored permanently</p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Team Gen Hacktivists</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium">Tilak G</h3>
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <Mail className="w-4 h-4" />
                <a href="mailto:23f21a3157@gatesit.ac.in" className="hover:text-blue-500">
                  23f21a3157@gatesit.ac.in
                </a>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium">Revanth S</h3>
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <Mail className="w-4 h-4" />
                <a href="mailto:22f21a05a9@gatesit.ac.in" className="hover:text-blue-500">
                  22f21a05a9@gatesit.ac.in
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <School className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Institution</h2>
          </div>
          <p className="text-gray-700">GATES Institute of Technology</p>
        </div>
        
        <div className="text-center text-sm text-gray-500 mt-8 pt-4 border-t">
          © {new Date().getFullYear()} Vizion by Gen Hacktivists. All rights reserved.
        </div>
      </div>
    </div>
  );
}