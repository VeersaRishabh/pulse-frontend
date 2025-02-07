import React, { useState } from 'react';
import { TeamMemberType } from '../../../types/dashboard-team/dashboard-team';

const DashboardTeam: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<TeamMemberType>({
    id: 1,
    name: 'Alex Morgan',
    designation: 'Senior Frontend Developer',
    profilePicture:
      'https://live.staticflickr.com/3341/3484878448_bedd347e8d_z.jpg',
    email: 'alex.morgan@company.com',
    department: 'Engineering',
    location: 'New York, USA',
    joinedDate: '2022-06-15',
    skills: ['Angular', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/alexmorgan',
      github: 'https://github.com/alexmorgan',
      twitter: 'https://twitter.com/alexmorgan',
    },
    status: 'available',
    currentProject: 'Project Phoenix',
  });

  const [teamMembers, setTeamMembers] = useState<TeamMemberType[]>([
    {
      id: 2,
      name: 'Sarah Chen',
      designation: 'Product Manager',
      profilePicture:
        'https://live.staticflickr.com/7344/11095886075_48309822a3_z.jpg',
      email: 'sarah.chen@company.com',
      department: 'Product',
      location: 'San Francisco, USA',
      joinedDate: '2021-03-10',
      skills: ['Product Strategy', 'Agile', 'User Research', 'Roadmapping'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/sarachen',
      },
      status: 'in-meeting',
      currentProject: 'Project Phoenix',
    },
    {
      id: 3,
      name: 'James Wilson',
      designation: 'Backend Developer',
      profilePicture:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTiGlASQN2aBayDa3IennhcpPOMJV8tyCcOw&s',
      email: 'james.wilson@company.com',
      department: 'Engineering',
      location: 'London, UK',
      joinedDate: '2023-01-20',
      skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/jameswilson',
        github: 'https://github.com/jwilson',
      },
      status: 'available',
      currentProject: 'Project Atlas',
    },
  ]);

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      available: 'bg-green-500',
      'in-meeting': 'bg-yellow-500',
      away: 'bg-orange-500',
      offline: 'bg-gray-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Team</h1>

        {/* Current User Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">You</h2>
          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-blue-200">
            <div className="flex items-start gap-6">
              <div className="relative">
                <img
                  src={currentUser.profilePicture}
                  alt={currentUser.name}
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-50"
                />
                <div
                  className={`absolute bottom-0 right-0 h-4 w-4 rounded-full ring-2 ring-white ${getStatusColor(
                    currentUser.status
                  )}`}
                  title={currentUser.status}
                ></div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {currentUser.name}
                    </h3>
                    <p className="text-gray-600">{currentUser.designation}</p>
                  </div>
                  <div className="flex gap-3">
                    {currentUser.socialLinks.linkedin && (
                      <a
                        href={currentUser.socialLinks.linkedin}
                        className="text-gray-400 hover:text-blue-500"
                      >
                        <i className="fab fa-linkedin text-xl"></i>
                      </a>
                    )}
                    {currentUser.socialLinks.github && (
                      <a
                        href={currentUser.socialLinks.github}
                        className="text-gray-400 hover:text-gray-700"
                      >
                        <i className="fab fa-github text-xl"></i>
                      </a>
                    )}
                    {currentUser.socialLinks.twitter && (
                      <a
                        href={currentUser.socialLinks.twitter}
                        className="text-gray-400 hover:text-blue-400"
                      >
                        <i className="fab fa-twitter text-xl"></i>
                      </a>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-700">{currentUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="text-gray-700">{currentUser.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-700">{currentUser.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Project</p>
                    <p className="text-gray-700">
                      {currentUser.currentProject}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {currentUser.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Team Members
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={member.profilePicture}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-white ${getStatusColor(
                        member.status
                      )}`}
                      title={member.status}
                    ></div>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {member.designation}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 space-y-1 text-sm">
                      <p className="text-gray-600">
                        {member.department} • {member.location}
                      </p>
                      <p className="text-gray-600">{member.currentProject}</p>
                    </div>

                    <div className="mt-3">
                      <div className="flex flex-wrap gap-1">
                        {member.skills.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-gray-50 text-gray-600 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                        {member.skills.length > 3 && (
                          <span className="px-2 py-0.5 bg-gray-50 text-gray-600 rounded-full text-xs">
                            +{member.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 flex gap-2">
                      {member.socialLinks.linkedin && (
                        <a
                          href={member.socialLinks.linkedin}
                          className="text-gray-400 hover:text-blue-500"
                        >
                          <i className="fab fa-linkedin"></i>
                        </a>
                      )}
                      {member.socialLinks.github && (
                        <a
                          href={member.socialLinks.github}
                          className="text-gray-400 hover:text-gray-700"
                        >
                          <i className="fab fa-github"></i>
                        </a>
                      )}
                      {member.socialLinks.twitter && (
                        <a
                          href={member.socialLinks.twitter}
                          className="text-gray-400 hover:text-blue-400"
                        >
                          <i className="fab fa-twitter"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardTeam;
