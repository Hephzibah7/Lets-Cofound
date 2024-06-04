import React, { useState } from 'react';

const categories = [
  {
    name: 'Technical Skills',
    subgroups: [
      'Software Development',
      'Web Development',
      'Data Science',
      'Cybersecurity',
    ],
  },
  {
    name: 'Business and Management Skills',
    subgroups: [
      'Entrepreneurship',
      'Marketing',
      'Sales',
      'Finance',
    ],
  },
  {
    name: 'Design and Creative Skills',
    subgroups: [
      'Graphic Design',
      'Product Design',
      'Content Creation',
      'Animation and Motion Graphics',
    ],
  },
  {
    name: 'Legal and Regulatory Skills',
    subgroups: [
      'Corporate Law',
      'Regulatory Affairs',
      'Ethics and Compliance',
    ],
  },
  {
    name: 'Operational Skills',
    subgroups: [
      'Project Management',
      'Supply Chain Management',
      'Human Resources',
      'Customer Service',
    ],
  },
  {
    name: 'Industry-Specific Interests',
    subgroups: [
      'Healthcare',
      'Education',
      'Fintech',
      'E-commerce',
      'Environmental Tech',
    ],
  },
  {
    name: 'Personal Interests',
    subgroups: [
      'Social Impact',
      'Innovation and Research',
      'Travel and Lifestyle',
      'Arts and Culture',
    ],
  },
];

const GroupSection = () => {
  const [openCategories, setOpenCategories] = useState({});

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white">
      {categories.map((category, index) => (
        <div key={index} className="mb-4">
          <button
            onClick={() => toggleCategory(category.name)}
            className="w-full flex justify-between items-center p-4 bg-gray-800 hover:bg-gray-700 rounded-lg"
          >
            <span className="font-bold">{category.name}</span>
            <span>{openCategories[category.name] ? '-' : '+'}</span>
          </button>
          {openCategories[category.name] && (
            <div className="mt-2 ml-4">
              {category.subgroups.map((subgroup, idx) => (
                <div key={idx} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg mb-2">
                  {subgroup}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GroupSection;
