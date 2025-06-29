
import React from 'react';
import LogoIcon from './icons/LogoIcon';
import AlertIcon from './icons/AlertIcon';

const InfoPanel: React.FC = () => {
  return (
    <div className="flex flex-col h-full text-slate-700 dark:text-slate-300">
      <header className="flex items-center mb-8">
        <LogoIcon className="w-10 h-10 text-teal-600 dark:text-teal-500" />
        <h1 className="text-2xl font-bold ml-3 text-slate-800 dark:text-slate-100">
          MediQuery
        </h1>
      </header>

      <div className="space-y-6 text-sm">
        <section>
          <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
            How I Can Help
          </h2>
          <ul className="space-y-2 list-disc list-inside text-slate-600 dark:text-slate-400">
            <li>Provide information on medical conditions.</li>
            <li>Explain symptoms and potential causes.</li>
            <li>Describe treatments and medications.</li>
            <li>Discuss wellness and prevention topics.</li>
            <li>Define complex medical terms.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
            What I Cannot Do
          </h2>
          <ul className="space-y-2 list-disc list-inside text-slate-600 dark:text-slate-400">
            <li>Provide a medical diagnosis.</li>
            <li>Prescribe medication or treatment.</li>
            <li>Replace a qualified healthcare professional.</li>
            <li>Handle medical emergencies.</li>
          </ul>
        </section>

        <div className="!mt-auto pt-6">
          <div className="bg-amber-100/50 dark:bg-amber-900/20 border-l-4 border-amber-400 dark:border-amber-500 p-4 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertIcon className="h-5 w-5 text-amber-500 dark:text-amber-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <span className="font-semibold">Important Disclaimer:</span> I am an AI assistant, not a doctor. Information provided is for informational purposes only. Always consult a qualified healthcare professional for medical advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
