import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

// TypeScript interfaces for type safety
interface Skill {
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

interface SkillSubcategory {
  name: string;
  skills: Skill[];
}

interface SkillCategory {
  name: string;
  skills: (Skill | SkillSubcategory)[];
}

interface SkillsSectionProps {
  scrollProgress?: number;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ scrollProgress = 0 }) => {
  // State for tracking expanded categories and subcategories
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["SDE", "CLOUD", "DEVOPS"]);
  const [expandedSubcategories, setExpandedSubcategories] = useState<string[]>([
    "Frontend", 
    "Backend", 
    "AWS Services", 
    "Cloud Platforms", 
    "Serverless", 
    "Containerization", 
    "Infrastructure as Code", 
    "CI/CD", 
    "Monitoring"
  ]);

  // Toggle functions for expanding/collapsing
  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter(c => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  const toggleSubcategory = (subcategory: string) => {
    if (expandedSubcategories.includes(subcategory)) {
      setExpandedSubcategories(expandedSubcategories.filter(s => s !== subcategory));
    } else {
      setExpandedSubcategories([...expandedSubcategories, subcategory]);
    }
  };

  // Dynamic styling based on scroll progress
  const getSectionBg = () => {
    return scrollProgress > 0.4 ? 'bg-transparent' : 'bg-transparent';
  };

  const getCategoryHeaderColors = () => {
    return scrollProgress > 0.4 
      ? 'text-white border-white/20 hover:border-white/40' 
      : 'text-gray-900 border-gray-300/30 hover:border-gray-400/50';
  };

  const getSubcategoryHeaderColors = () => {
    return scrollProgress > 0.4 
      ? 'text-white border-white/10 hover:border-white/30' 
      : 'text-gray-800 border-gray-300/20 hover:border-gray-400/40';
  };

  const getSkillTextColors = () => {
    return scrollProgress > 0.4 ? 'text-gray-200' : 'text-gray-700';
  };

  const getHoverBg = () => {
    return scrollProgress > 0.4 ? 'hover:bg-white/5' : 'hover:bg-gray-200/30';
  };

  const getChevronColors = () => {
    return scrollProgress > 0.4 
      ? 'opacity-60 group-hover:opacity-100' 
      : 'opacity-50 group-hover:opacity-80';
  };

  // Helper function to get text color based on skill level
  const getLevelColor = (level: string) => {
    if (scrollProgress > 0.4) {
      // Dark mode colors
      switch (level) {
        case "Expert": return "text-white/90";
        case "Advanced": return "text-white/80";
        case "Intermediate": return "text-white/70";
        case "Beginner": return "text-white/60";
        default: return "text-white/70";
      }
    } else {
      // Light mode colors
      switch (level) {
        case "Expert": return "text-gray-900";
        case "Advanced": return "text-gray-800";
        case "Intermediate": return "text-gray-700";
        case "Beginner": return "text-gray-600";
        default: return "text-gray-700";
      }
    }
  };

  // Skills data structure
  const skillsData: SkillCategory[] = [
    {
      name: "SDE",
      skills: [
        {
          name: "Frontend",
          skills: [
            { name: "HTML", level: "Advanced" },
            { name: "CSS", level: "Advanced" },
            { name: "JavaScript", level: "Advanced" },
            { name: "React.js", level: "Advanced" },
            { name: "Vue.js", level: "Intermediate" },
            { name: "Angular", level: "Intermediate" },
            { name: "TypeScript", level: "Advanced" },
            { name: "Next.js", level: "Advanced" },
          ]
        },
        {
          name: "Backend",
          skills: [
            { name: "Node.js", level: "Advanced" },
            { name: "Express.js", level: "Advanced" },
            { name: "Django", level: "Intermediate" },
            { name: "Flask", level: "Intermediate" },
            { name: "SQL", level: "Advanced" },
            { name: "MongoDB", level: "Advanced" },
            { name: "GraphQL", level: "Intermediate" },
            { name: "REST APIs", level: "Advanced" },
          ]
        }
      ]
    },
    {
      name: "CLOUD",
      skills: [
        {
          name: "AWS Services",
          skills: [
            { name: "EC2", level: "Expert" },
            { name: "S3", level: "Expert" },
            { name: "Lambda", level: "Advanced" },
            { name: "IAM", level: "Expert" },
            { name: "VPC", level: "Advanced" },
            { name: "CloudFormation", level: "Advanced" },
          ]
        },
        {
          name: "Cloud Platforms",
          skills: [
            { name: "AWS", level: "Expert" },
            { name: "Azure", level: "Intermediate" },
            { name: "Google Cloud", level: "Beginner" },
          ]
        },
        {
          name: "Serverless",
          skills: [
            { name: "Lambda Functions", level: "Advanced" },
            { name: "API Gateway", level: "Advanced" },
            { name: "DynamoDB", level: "Intermediate" },
            { name: "Step Functions", level: "Intermediate" },
          ]
        }
      ]
    },
    {
      name: "DEVOPS",
      skills: [
        {
          name: "Containerization",
          skills: [
            { name: "Docker", level: "Advanced" },
            { name: "Kubernetes", level: "Intermediate" },
            { name: "ECS", level: "Advanced" },
            { name: "EKS", level: "Intermediate" },
          ]
        },
        {
          name: "Infrastructure as Code",
          skills: [
            { name: "Terraform", level: "Advanced" },
            { name: "Ansible", level: "Advanced" },
            { name: "CloudFormation", level: "Advanced" },
            { name: "Pulumi", level: "Intermediate" },
          ]
        },
        {
          name: "CI/CD",
          skills: [
            { name: "Jenkins", level: "Advanced" },
            { name: "GitHub Actions", level: "Advanced" },
            { name: "AWS CodePipeline", level: "Advanced" },
            { name: "CircleCI", level: "Intermediate" },
          ]
        },
        {
          name: "Monitoring",
          skills: [
            { name: "Prometheus", level: "Advanced" },
            { name: "Grafana", level: "Advanced" },
            { name: "CloudWatch", level: "Advanced" },
            { name: "ELK Stack", level: "Intermediate" },
          ]
        }
      ]
    }
  ];

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className={`snap-start min-h-screen py-16 px-6 md:px-10 flex flex-col items-center transition-all duration-700 ${getSectionBg()}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-7xl">
        {skillsData.map((category) => (
          <div key={category.name} className="space-y-4">
            {/* Category Header */}
            <div 
              className={`flex items-center justify-between cursor-pointer group pb-2 transition-all duration-700 ${getCategoryHeaderColors()}`}
              onClick={() => toggleCategory(category.name)}
            >
              <h3 className="text-xl font-medium tracking-wide transition-colors duration-700">{category.name}</h3>
              <motion.div
                animate={{ rotate: expandedCategories.includes(category.name) ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className={`transition-all duration-700 ${getChevronColors()}`}
              >
                <ChevronRight className="h-5 w-5" />
              </motion.div>
            </div>

            {/* Category Content */}
            <AnimatePresence>
              {expandedCategories.includes(category.name) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden space-y-4"
                >
                  {category.skills.map((item, index) => {
                    // Check if this is a skill or subcategory
                    if ('skills' in item && Array.isArray(item.skills)) {
                      // This is a subcategory
                      const subcategory = item as SkillSubcategory;
                      return (
                        <div key={`${category.name}-${subcategory.name}`} className="pl-2">
                          {/* Subcategory Header */}
                          <div 
                            className={`flex items-center justify-between cursor-pointer group pb-1 transition-all duration-700 ${getSubcategoryHeaderColors()}`}
                            onClick={() => toggleSubcategory(subcategory.name)}
                          >
                            <h4 className="text-base font-medium transition-colors duration-700">{subcategory.name}</h4>
                            <motion.div
                              animate={{ rotate: expandedSubcategories.includes(subcategory.name) ? 90 : 0 }}
                              transition={{ duration: 0.2 }}
                              className={`transition-all duration-700 ${getChevronColors()}`}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </motion.div>
                          </div>

                          {/* Subcategory Skills */}
                          <AnimatePresence>
                            {expandedSubcategories.includes(subcategory.name) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden mt-2 space-y-2 pl-2"
                              >
                                {subcategory.skills.map((skill) => (
                                  <div key={`${subcategory.name}-${skill.name}`} className={`flex justify-between items-center p-1 rounded transition-all duration-700 ${getHoverBg()}`}>
                                    <span className={`text-sm font-light transition-colors duration-700 ${getSkillTextColors()}`}>{skill.name}</span>
                                    {skill.level && (
                                      <span className={`text-xs transition-colors duration-700 ${getLevelColor(skill.level)}`}>
                                        {skill.level}
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    } else {
                      // This is a regular skill
                      const skill = item as Skill;
                      return (
                        <div key={`${category.name}-${skill.name}`} className={`flex justify-between items-center pl-2 p-1 rounded transition-all duration-700 ${getHoverBg()}`}>
                          <span className={`text-sm font-light transition-colors duration-700 ${getSkillTextColors()}`}>{skill.name}</span>
                          {skill.level && (
                            <span className={`text-xs transition-colors duration-700 ${getLevelColor(skill.level)}`}>
                              {skill.level}
                            </span>
                          )}
                        </div>
                      );
                    }
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default SkillsSection;