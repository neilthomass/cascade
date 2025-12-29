import { useState, useEffect } from 'react';
import { Award, GraduationCap, Building2, TrendingUp, Star, User, ChevronLeft, ChevronRight } from 'lucide-react';

interface Agent {
  id: number;
  name: string;
  title: string | null;
  photo_url: string | null;
  bio_text: string | null;
  years_experience: number | null;
  education: string[];
  awards: string[];
  lifetime_sales: string | null;
  avg_sale_price: string | null;
  clients_count: number | null;
  dre_number: string | null;
}

const AGENTS_API = 'https://cascade-admin.manoj-thomas-c22.workers.dev/agents/public';

function CompanyValues() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      <div className="bg-white p-5 lg:p-10 border border-gray-200 hover:border-gray-900 hover:shadow-lg transition-all duration-300 group">
        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-900 flex items-center justify-center mb-4 lg:mb-8">
          <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
        </div>
        <h3 className="text-base lg:text-xl mb-2 lg:mb-4 text-gray-900 tracking-tight">Industry Experts</h3>
        <p className="text-gray-600 font-light leading-relaxed text-xs lg:text-sm">
          Thought leaders who add meaningful value to the community and their clients' lives
        </p>
      </div>

      <div className="bg-white p-5 lg:p-10 border border-gray-200 hover:border-gray-900 hover:shadow-lg transition-all duration-300 group">
        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-900 flex items-center justify-center mb-4 lg:mb-8">
          <Award className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
        </div>
        <h3 className="text-base lg:text-xl mb-2 lg:mb-4 text-gray-900 tracking-tight">Experienced Agents</h3>
        <p className="text-gray-600 font-light leading-relaxed text-xs lg:text-sm">
          Skilled at navigating the market with a deep understanding of industry trends
        </p>
      </div>

      <div className="bg-white p-5 lg:p-10 border border-gray-200 hover:border-gray-900 hover:shadow-lg transition-all duration-300 group">
        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-900 flex items-center justify-center mb-4 lg:mb-8">
          <Building2 className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
        </div>
        <h3 className="text-base lg:text-xl mb-2 lg:mb-4 text-gray-900 tracking-tight">Committed Team</h3>
        <p className="text-gray-600 font-light leading-relaxed text-xs lg:text-sm">
          United by a shared vision and commitment to excellence at every level
        </p>
      </div>

      <div className="bg-white p-5 lg:p-10 border border-gray-200 hover:border-gray-900 hover:shadow-lg transition-all duration-300 group">
        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-900 flex items-center justify-center mb-4 lg:mb-8">
          <Star className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
        </div>
        <h3 className="text-base lg:text-xl mb-2 lg:mb-4 text-gray-900 tracking-tight">Amazing Reviews</h3>
        <p className="text-gray-600 font-light leading-relaxed text-xs lg:text-sm">
          Building trust and reputation through exceptional service and client satisfaction
        </p>
      </div>
    </div>
  );
}

export function AboutSection() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [expandedAgentId, setExpandedAgentId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAgents() {
      try {
        const response = await fetch(AGENTS_API);
        if (response.ok) {
          const data = await response.json();
          if (data.data?.agents?.length > 0) {
            setAgents(data.data.agents);
          }
        }
      } catch (error) {
        console.error('Failed to fetch agents:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAgents();
  }, []);

  const featuredAgent = agents.length > 0 ? agents[0] : null;
  const teamAgents = agents.slice(1);

  // Show loading state or nothing while loading
  if (loading || !featuredAgent) {
    return (
      <section id="about" className="pt-32 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-white mb-20 h-64 flex items-center justify-center">
            <div className="text-gray-400">Loading...</div>
          </div>
          <CompanyValues />
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="pt-32 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h3 className="text-lg sm:text-xl tracking-[0.2em] text-gray-500 mb-6">OUR TEAM</h3>

        {/* Featured Agent Profile Section */}
        <div className="bg-white mb-8">
          <div className="flex flex-row">
            {/* Left: Photo */}
            <div className="w-32 sm:w-48 md:w-64 lg:w-80 flex-shrink-0 bg-gray-100">
              {featuredAgent.photo_url ? (
                <img
                  src={featuredAgent.photo_url}
                  alt={featuredAgent.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full min-h-[200px] flex items-center justify-center bg-gray-200">
                  <User className="w-20 h-20 text-gray-400" />
                </div>
              )}
            </div>

            {/* Right: Content */}
            <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12">
              {/* Name & Title */}
              <div className="mb-4 sm:mb-6 lg:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-1">
                  {featuredAgent.name}
                </h2>
                {featuredAgent.title && (
                  <p className="text-xs sm:text-sm tracking-[0.15em] text-gray-500">
                    {featuredAgent.title.toUpperCase()}
                  </p>
                )}
                {featuredAgent.dre_number && (
                  <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                    DRE# {featuredAgent.dre_number}
                  </p>
                )}
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8 pb-4 sm:pb-6 lg:pb-8 border-b border-gray-200">
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-900">
                    {featuredAgent.years_experience ? `${featuredAgent.years_experience}+` : '-'}
                  </div>
                  <div className="text-[10px] sm:text-xs tracking-[0.1em] text-gray-500">YEARS</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-900">
                    {featuredAgent.lifetime_sales || '-'}
                  </div>
                  <div className="text-[10px] sm:text-xs tracking-[0.1em] text-gray-500">LIFETIME SALES</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-900">
                    {featuredAgent.avg_sale_price || '-'}
                  </div>
                  <div className="text-[10px] sm:text-xs tracking-[0.1em] text-gray-500">AVG SALE</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-900">
                    {featuredAgent.clients_count ? `${featuredAgent.clients_count}+` : '-'}
                  </div>
                  <div className="text-[10px] sm:text-xs tracking-[0.1em] text-gray-500">CLIENTS</div>
                </div>
              </div>

              {/* Bio */}
              {featuredAgent.bio_text && (
                <p className="hidden sm:block text-sm md:text-base text-gray-700 font-light leading-relaxed mb-6 lg:mb-8">
                  {featuredAgent.bio_text}
                </p>
              )}

              {/* Credentials & Awards */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {featuredAgent.education.map((edu, i) => (
                  <div key={`edu-${i}`} className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-900 text-white">
                    <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">{edu}</span>
                  </div>
                ))}
                {featuredAgent.awards.map((award, i) => (
                  <div key={`award-${i}`} className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 border border-gray-300 text-gray-700">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">{award}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        {teamAgents.length > 0 && (
          <div className="mb-20">
            {/* Expanded Agent Details (Fixed Position - Above Grid) */}
            {expandedAgentId && (() => {
              const agent = teamAgents.find(a => a.id === expandedAgentId);
              const currentIndex = teamAgents.findIndex(a => a.id === expandedAgentId);
              if (!agent) return null;

              const goToPrev = (e: React.MouseEvent) => {
                e.stopPropagation();
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : teamAgents.length - 1;
                setExpandedAgentId(teamAgents[prevIndex].id);
              };

              const goToNext = (e: React.MouseEvent) => {
                e.stopPropagation();
                const nextIndex = currentIndex < teamAgents.length - 1 ? currentIndex + 1 : 0;
                setExpandedAgentId(teamAgents[nextIndex].id);
              };

              return (
                <div className="bg-white border border-gray-300 shadow-md mb-4 relative">
                  {/* Navigation Arrows */}
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={goToPrev}
                      className="p-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="p-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  <div className="flex flex-row">
                    {/* Left: Photo */}
                    <div className="w-24 sm:w-32 md:w-48 flex-shrink-0 bg-gray-100">
                      {agent.photo_url ? (
                        <img
                          src={agent.photo_url}
                          alt={agent.name}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full min-h-[150px] flex items-center justify-center bg-gray-200">
                          <User className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Right: Content */}
                    <div className="flex-1 p-3 sm:p-4 md:p-6">
                      {/* Name & Title */}
                      <div className="mb-3 sm:mb-4">
                        <h4 className="text-lg sm:text-xl md:text-2xl font-light text-gray-900 mb-1">
                          {agent.name}
                        </h4>
                        {agent.title && (
                          <p className="text-[10px] sm:text-xs tracking-[0.15em] text-gray-500">
                            {agent.title.toUpperCase()}
                          </p>
                        )}
                        {agent.dre_number && (
                          <p className="text-[9px] sm:text-[10px] text-gray-400 mt-1">
                            DRE# {agent.dre_number}
                          </p>
                        )}
                      </div>

                      {/* Stats Row */}
                      <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200">
                        <div>
                          <div className="text-base sm:text-lg md:text-xl font-light text-gray-900">
                            {agent.years_experience ? `${agent.years_experience}+` : '-'}
                          </div>
                          <div className="text-[9px] sm:text-[10px] tracking-[0.1em] text-gray-500">YEARS</div>
                        </div>
                        <div>
                          <div className="text-base sm:text-lg md:text-xl font-light text-gray-900">
                            {agent.lifetime_sales || '-'}
                          </div>
                          <div className="text-[9px] sm:text-[10px] tracking-[0.1em] text-gray-500">SALES</div>
                        </div>
                        <div>
                          <div className="text-base sm:text-lg md:text-xl font-light text-gray-900">
                            {agent.avg_sale_price || '-'}
                          </div>
                          <div className="text-[9px] sm:text-[10px] tracking-[0.1em] text-gray-500">AVG SALE</div>
                        </div>
                        <div>
                          <div className="text-base sm:text-lg md:text-xl font-light text-gray-900">
                            {agent.clients_count ? `${agent.clients_count}+` : '-'}
                          </div>
                          <div className="text-[9px] sm:text-[10px] tracking-[0.1em] text-gray-500">CLIENTS</div>
                        </div>
                      </div>

                      {/* Bio */}
                      {agent.bio_text && (
                        <p className="hidden sm:block text-xs md:text-sm text-gray-700 font-light leading-relaxed mb-3 sm:mb-4">
                          {agent.bio_text}
                        </p>
                      )}

                      {/* Credentials & Awards */}
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        {agent.education.map((edu, i) => (
                          <div key={`edu-${i}`} className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-1 sm:py-1.5 bg-gray-900 text-white">
                            <GraduationCap className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            <span className="text-[10px] sm:text-xs">{edu}</span>
                          </div>
                        ))}
                        {agent.awards.map((award, i) => (
                          <div key={`award-${i}`} className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-1 sm:py-1.5 border border-gray-300 text-gray-700">
                            <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            <span className="text-[10px] sm:text-xs">{award}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Team Cards Grid */}
            <div className="grid grid-cols-3 gap-4">
              {teamAgents.map((agent) => {
                const isSelected = expandedAgentId === agent.id;
                return (
                  <button
                    key={agent.id}
                    onClick={() => setExpandedAgentId(isSelected ? null : agent.id)}
                    className={`w-full bg-white p-2 sm:p-3 border transition-all duration-300 text-left group ${
                      isSelected
                        ? 'border-gray-900 shadow-lg'
                        : 'border-gray-200 hover:border-gray-900 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      {/* Small Photo */}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-gray-100 overflow-hidden">
                        {agent.photo_url ? (
                          <img
                            src={agent.photo_url}
                            alt={agent.name}
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      {/* Name & Title */}
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-gray-700">
                          {agent.name}
                        </h4>
                        {agent.title && (
                          <p className="text-[9px] sm:text-[10px] tracking-[0.05em] text-gray-500">
                            {agent.title.toUpperCase()}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <CompanyValues />
      </div>
    </section>
  );
}
