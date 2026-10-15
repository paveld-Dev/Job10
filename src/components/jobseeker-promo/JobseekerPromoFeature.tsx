'use client';

import React from 'react';

const jobOpenings = [
  {
    id: '01',
    title: 'Software Developer',
    field: 'Engineering',
  },
  {
    id: '02',
    title: 'UI/UX Designer',
    field: 'Design',
  },
  {
    id: '03',
    title: 'Project Manager',
    field: 'Operations',
  },
  {
    id: '04',
    title: 'Data Analyst',
    field: 'Analytics',
  },
];

export const JobseekerPromoFeature: React.FC = () => {
  return (
    <section
      className="bg-[#f8faff] py-16 md:py-20 lg:py-24 border-y border-slate-200"
      id="jobseekers"
      aria-labelledby="popular-openings-title"
    >
      <div className="w-full max-w-[1240px] mx-auto px-6 md:px-11 box-border">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
          <div>
            <h2
              id="popular-openings-title"
              className="text-[clamp(34px,3.5vw,46px)] font-extrabold tracking-[-0.035em] leading-[1.14] text-[#0b1a3c] mb-3"
            >
              Popular Job Openings
            </h2>
            <p className="text-[17px] leading-[1.6] text-slate-500 max-w-[640px] m-0">
              Explore roles across in-demand fields and discover opportunities that match your skills and experience.
            </p>
          </div>
        </div>

        {/* Openings List */}
        <div className="bg-white border border-slate-200 rounded-[22px] overflow-hidden" aria-label="Example job categories">
          {jobOpenings.map((job) => (
            <article
              key={job.id}
              className="flex items-center gap-3 sm:gap-5.5 p-4.5 sm:py-6 sm:px-7 border-b border-[#e9edf5] last:border-b-0 hover:bg-[#f9faff] transition-colors duration-200 flex-wrap sm:flex-nowrap"
            >
              <div
                className="w-[42px] h-[42px] sm:w-[54px] sm:h-[54px] flex-none grid place-items-center bg-[#eff2ff] rounded-[11px] sm:rounded-[14px] text-[#2b3bff] text-sm sm:text-lg font-extrabold"
                aria-hidden="true"
              >
                {job.id}
              </div>
              <div className="flex-1 min-w-0 basis-[calc(100%-60px)] sm:basis-auto">
                <h3 className="text-[#0b1a3c] text-base sm:text-[19px] font-[750] leading-[1.3] tracking-[-0.02em] m-0">
                  {job.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5 m-0">
                  {job.field} <span aria-hidden="true">&middot;</span> Explore matching opportunities
                </p>
              </div>
              <a
                className="text-[#2b3bff] text-[13px] sm:text-[15px] font-bold whitespace-nowrap ml-[54px] sm:ml-0 hover:underline inline-flex items-center"
                href="https://job10-delta.vercel.app/?audience=jobseeker"
                aria-label={`Explore ${job.title} opportunities`}
              >
                Explore roles <span className="pl-1.5" aria-hidden="true">&nearr;</span>
              </a>
            </article>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-6 mt-6">
          <span className="text-slate-500 text-[13px]">
            Example roles &middot; Live opportunities are available on Job10.
          </span>
          <a
            className="group inline-flex items-center justify-center gap-2 font-bold text-[15px] text-white bg-[#2b3bff] hover:bg-[#1e2ecc] rounded-full px-6 h-12 shadow-[0_4px_14px_rgba(43,59,255,0.25)] hover:shadow-[0_6px_18px_rgba(43,59,255,0.35)] hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
            href="https://job10-delta.vercel.app/?audience=jobseeker"
          >
            <span>View More Openings</span>
            <span className="inline-flex items-center transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
