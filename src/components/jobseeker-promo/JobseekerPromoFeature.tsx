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
    <section className="feature-section popular-openings" id="jobseekers" aria-labelledby="popular-openings-title">
      <div className="container">
        <div className="openings-top">
          <div>
            <h2 id="popular-openings-title">Popular Job Openings</h2>
            <p className="openings-intro">
              Explore roles across in-demand fields and discover opportunities that match your skills and experience.
            </p>
          </div>
        </div>
        <div className="openings-list" aria-label="Example job categories">
          {jobOpenings.map((job) => (
            <article key={job.id} className="opening-row">
              <div className="opening-symbol" aria-hidden="true">
                {job.id}
              </div>
              <div className="opening-info">
                <h3>{job.title}</h3>
                <p>
                  {job.field} <span aria-hidden="true">&middot;</span> Explore matching opportunities
                </p>
              </div>
              <a
                className="opening-link"
                href="https://job10-delta.vercel.app/?audience=jobseeker"
                aria-label={`Explore ${job.title} opportunities`}
              >
                Explore roles <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
        <div className="openings-bottom">
          <span className="openings-note">Example roles &middot; Live opportunities are available on Job10.</span>
          <a className="btn btn-primary openings-cta" href="https://job10-delta.vercel.app/?audience=jobseeker">
            View More Openings <span className="btn-arrow" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};
