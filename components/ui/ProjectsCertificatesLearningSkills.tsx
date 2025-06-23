import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectData, certificateData, learningData } from "../../data/CardData";
import DetailedInfoModal from "@/components/ui/DetailedInfoModal";
import ClickableInfoCard from "@/components/ui/ClickableInfoCard";
import SkillsSection from "@/components/ui/SkillsSection";

const contentVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

interface ProjectsCertificatesLearningSkillsProps {
  scrollProgress?: number;
}

const ProjectsCertificatesLearningSkills: React.FC<ProjectsCertificatesLearningSkillsProps> = ({ 
  scrollProgress = 0 
}) => {
  // State for current tab
  const [activeTab, setActiveTab] = useState<"projects" | "certificates" | "learning" | "skills">("projects");
  // Modal states for content cards
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Dynamic styling functions based on scroll progress - Updated colors for better readability
  const getTabTextColor = (isActive: boolean) => {
    if (isActive) {
      return scrollProgress > 0.80 ? 'text-white' : 'text-gray-200'; // Light silver instead of dark grey
    }
    return scrollProgress > 0.80 ? 'text-gray-400' : 'text-gray-500'; // Pure grey for inactive tabs
  };

  const getSlashColor = () => {
    return scrollProgress > 0.80 ? 'text-gray-200' : 'text-gray-300'; // Lighter slash color
  };

  return (
    <div className="py-16" style={{ position: 'relative', zIndex: 2 }}>
      {/* Fixed Tab Navigation Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-4 text-3xl font-bold">
          <span
            onClick={() => setActiveTab("projects")}
            className={`cursor-pointer transition-colors duration-700 hover:opacity-70 ${getTabTextColor(activeTab === "projects")}`}
          >
            Projects
          </span>
          <span className={`transition-colors duration-700 ${getSlashColor()}`}>/</span>
          <span
            onClick={() => setActiveTab("certificates")}
            className={`cursor-pointer transition-colors duration-700 hover:opacity-70 ${getTabTextColor(activeTab === "certificates")}`}
          >
            Certificates
          </span>
          <span className={`transition-colors duration-700 ${getSlashColor()}`}>/</span>
          <span
            onClick={() => setActiveTab("learning")}
            className={`cursor-pointer transition-colors duration-700 hover:opacity-70 ${getTabTextColor(activeTab === "learning")}`}
          >
            Learning
          </span>
          <span className={`transition-colors duration-700 ${getSlashColor()}`}>/</span>
          <span
            onClick={() => setActiveTab("skills")}
            className={`cursor-pointer transition-colors duration-700 hover:opacity-70 ${getTabTextColor(activeTab === "skills")}`}
          >
            Skills
          </span>
        </div>
      </div>

      {/* Content Container with fixed minimum height and extra bottom margin */}
      <div className="min-h-[500px] mb-16">
        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <div className="w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {projectData.map((project) => (
                    <ClickableInfoCard
                      key={project.id}
                      title={project.title}
                      summary={project.summary}
                      onClick={() => setSelectedProject(project.id)}
                      scrollProgress={scrollProgress}
                    />
                  ))}
                </div>
                {selectedProject && (
                  <DetailedInfoModal
                    isOpen={!!selectedProject}
                    title={projectData.find((p) => p.id === selectedProject)?.title || ""}
                    content={projectData.find((p) => p.id === selectedProject)?.details || ""}
                    onClose={() => setSelectedProject(null)}
                    scrollProgress={scrollProgress}
                  />
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "certificates" && (
            <motion.div
              key="certificates"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <div className="w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {certificateData.map((certificate) => (
                    <ClickableInfoCard
                      key={certificate.id}
                      title={certificate.title}
                      summary={certificate.summary}
                      onClick={() => setSelectedCertificate(certificate.id)}
                      scrollProgress={scrollProgress}
                    />
                  ))}
                </div>
                {selectedCertificate && (
                  <DetailedInfoModal
                    isOpen={!!selectedCertificate}
                    title={certificateData.find((c) => c.id === selectedCertificate)?.title || ""}
                    content={certificateData.find((c) => c.id === selectedCertificate)?.details || ""}
                    onClose={() => setSelectedCertificate(null)}
                    scrollProgress={scrollProgress}
                  />
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "learning" && (
            <motion.div
              key="learning"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <div className="w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {learningData.map((topic) => (
                    <ClickableInfoCard
                      key={topic.id}
                      title={topic.title}
                      summary={<div dangerouslySetInnerHTML={{ __html: topic.summary }} />}
                      onClick={() => setSelectedTopic(topic.id)}
                      scrollProgress={scrollProgress}
                    />
                  ))}
                </div>
                {selectedTopic && (
                  <DetailedInfoModal
                    isOpen={!!selectedTopic}
                    title={learningData.find((t) => t.id === selectedTopic)?.title || ""}
                    content={learningData.find((t) => t.id === selectedTopic)?.details || ""}
                    onClose={() => setSelectedTopic(null)}
                    scrollProgress={scrollProgress}
                  />
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div
              key="skills"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <div className="w-full max-w-7xl mx-auto">
                <SkillsSection scrollProgress={scrollProgress} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsCertificatesLearningSkills;