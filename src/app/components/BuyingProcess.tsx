import { ChevronRight } from 'lucide-react';

export function BuyingProcess() {
  const steps = [
    {
      number: '01',
      title: 'MEETING WITH THE CLIENT',
      description: 'We begin by understanding your unique requirements and expectations. Whether you\'re seeking a new home or an investment property, we take the time to learn what matters most to you. This foundation helps us build a lasting relationship and sets the stage for a successful partnership.'
    },
    {
      number: '02',
      title: 'PROPERTY RESEARCH',
      description: 'Our team conducts thorough market research to find properties that match your criteria. We analyze current market conditions and trends to identify the best opportunities, giving you the insights you need to make confident buying decisions.'
    },
    {
      number: '03',
      title: 'MAKE AN OFFER',
      description: 'Once we\'ve found the right property, we help you craft a competitive offer. We handle the details so the process feels simple and straightforward, ensuring you feel confident every step of the way.'
    },
    {
      number: '04',
      title: 'GETTING INTO CONTRACT',
      description: 'Once your offer is accepted, our team will assist you through the closing process. We will ensure that you aren\'t missing any milestones in the buyer transaction procedure. We will be honest and transparent and will be there for you at each turn while working with the escrow officer, your mortgage agent and the listing agent.'
    },
    {
      number: '05',
      title: 'LOAN PROCESSING AND FINAL APPROVAL',
      description: 'Our transaction coordination team makes sure that the appraisal is ordered and collects all the remaining documents needed. After the appraisal, the lenders will underwrite the file to issue a final approval. During this time, our team will work closely with you to satisfy final loan conditions.'
    },
    {
      number: '06',
      title: 'GET KEYS',
      description: 'Congratulations! You did it - you have successfully bought your new home. The closing disclosures and other documents are signed, bills are exchanged, and eventually, the wait is over: you get the keys!'
    }
  ];

  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-20">
          <p className="text-sm tracking-[0.2em] text-gray-500 mb-6">PROCESS</p>
          <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
            The Buying Process
          </h2>
          <p className="text-xl text-gray-600 font-light leading-relaxed">
            A seamless journey from first meeting to keys in hand
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12">
          {steps.map((step, index) => (
            <div key={index} className="group">
              <div className="flex items-start gap-6 mb-4">
                <div className="text-6xl font-light text-gray-300 group-hover:text-gray-900 transition-colors duration-300">
                  {step.number}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl mb-4 text-gray-900 tracking-tight">{step.title}</h3>
                  <p className="text-gray-600 font-light leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}