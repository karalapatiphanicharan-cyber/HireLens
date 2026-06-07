import React from 'react';

interface SkillTagProps {
  skill: string;
}

const SkillTag: React.FC<SkillTagProps> = ({ skill }) => {
  return (
    <span className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl text-sm font-black hover:bg-primary/20 transition-colors">
      {skill}
    </span>
  );
};

export default SkillTag;
