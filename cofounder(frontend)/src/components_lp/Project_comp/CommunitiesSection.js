import React from 'react';

const communities = [
  {
    title: 'Technical Skills',
    subCommunities: [
      'Software Development',
      'Web Development',
      'Data Science',
      'Cybersecurity',
    ],
  },
  {
    title: 'Business and Management Skills',
    subCommunities: [
      'Entrepreneurship',
      'Marketing',
      'Sales',
      'Finance',
    ],
  },
  {
    title: 'Design and Creative Skills',
    subCommunities: [
      'Graphic Design',
      'Product Design',
      'Content Creation',
      'Animation and Motion Graphics',
    ],
  },
  {
    title: 'Legal and Regulatory Skills',
    subCommunities: [
      'Corporate Law',
      'Regulatory Affairs',
      'Ethics and Compliance',
    ],
  },
  {
    title: 'Operational Skills',
    subCommunities: [
      'Project Management',
      'Supply Chain Management',
      'Human Resources',
      'Customer Service',
    ],
  },
  {
    title: 'Industry-Specific Interests',
    subCommunities: [
      'Healthcare',
      'Education',
      'Fintech',
      'E-commerce',
      'Environmental Tech',
    ],
  },
  {
    title: 'Personal Interests',
    subCommunities: [
      'Social Impact',
      'Innovation and Research',
      'Travel and Lifestyle',
      'Arts and Culture',
    ],
  },
];

const CommunityCard = ({ title, subCommunities }) => (
  <div className="bg-purple-700 text-white rounded-lg shadow-lg p-4">
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <ul>
      {subCommunities.map((sub, index) => (
        <li key={index} className="text-sm">
          {sub}
        </li>
      ))}
    </ul>
  </div>
);

const CommunitiesSection = () => (
  <div className="bg-gray-900 p-8">
    <h2 className="text-2xl text-white font-bold mb-6">Communities</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {communities.map((community, index) => (
        <CommunityCard
          key={index}
          title={community.title}
          subCommunities={community.subCommunities}
        />
      ))}
    </div>
  </div>
);

export default CommunitiesSection;
