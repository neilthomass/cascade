import { ChevronRight, ArrowRight } from 'lucide-react';

export function BuyingProcess() {
  const steps = [
    {
      number: '01',
      title: 'MEETING WITH THE CLIENT',
      description: 'At Cascade, we aim to meet our client\'s needs, to ensure that we fully understand the individual requirements and expectations of each. Whether you are looking for a new home or an investment property, we are here to help you find your dream home. We would like to have an opportunity to build a long-lasting relationship and to develop a full understanding of a client\'s needs. It paves the best way to work together in the future.'
    },
    {
      number: '02',
      title: 'PROPERTY RESEARCH',
      description: 'With the expertise of our expanded property research we can help find you the perfect home. The information gathered during our real estate market research will help identify opportunities within the marketplace and guide your buying decisions. Effective property research provides an analysis that informs the current market situation and trend.'
    },
    {
      number: '03',
      title: 'MAKE AN OFFER',
      description: 'Everything we do is done to make the home buying process simple. After locating the proper home and analyzing the property, we will assist you to put together an offer on your dream home. We are committed to making sure our clients have an excellent viable experience once they buy a property through us.'
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

        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="group">
              <div className="flex items-start gap-6 mb-4">
                <div className="text-6xl font-light text-gray-200 group-hover:text-gray-900 transition-colors duration-300">
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

        <div className="max-w-4xl bg-gray-900 text-white p-12 lg:p-16">
          <h3 className="text-3xl font-light mb-6">Smooth Buying Process</h3>
          <p className="text-gray-300 font-light leading-relaxed mb-8 text-lg">
            People don't buy just listings; they buy lifestyles. Our process do not just reiterate specs and data. 
            Instead, develop a special narrative in what it's like to live in the home.
          </p>
          <button className="inline-flex items-center gap-3 text-white hover:gap-4 transition-all duration-300 group">
            <span className="tracking-wide">VIEW MORE</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}