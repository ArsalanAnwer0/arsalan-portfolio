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

const ProjectsCertificatesLearningSkills: React.FC = () => {
  // State for current tab
  const [activeTab, setActiveTab] = useState<"projects" | "certificates" | "learning" | "skills">("projects");
  // Modal states for content cards
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  return (
    <div className="py-16">
      {/* Fixed Tab Navigation Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-4 text-3xl font-bold">
          <span
            onClick={() => setActiveTab("projects")}
            className={`cursor-pointer ${activeTab === "projects" ? "text-white" : "text-gray-500"}`}
          >
            Projects
          </span>
          <span>/</span>
          <span
            onClick={() => setActiveTab("certificates")}
            className={`cursor-pointer ${activeTab === "certificates" ? "text-white" : "text-gray-500"}`}
          >
            Certificates
          </span>
          <span>/</span>
          <span
            onClick={() => setActiveTab("learning")}
            className={`cursor-pointer ${activeTab === "learning" ? "text-white" : "text-gray-500"}`}
          >
            Learning
          </span>
          <span>/</span>
          <span
            onClick={() => setActiveTab("skills")}
            className={`cursor-pointer ${activeTab === "skills" ? "text-white" : "text-gray-500"}`}
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
                    />
                  ))}
                </div>
                {selectedProject && (
                  <DetailedInfoModal
                    isOpen={!!selectedProject}
                    title={projectData.find((p) => p.id === selectedProject)?.title || ""}
                    content={projectData.find((p) => p.id === selectedProject)?.details || ""}
                    onClose={() => setSelectedProject(null)}
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
                    />
                  ))}
                </div>
                {selectedCertificate && (
                  <DetailedInfoModal
                    isOpen={!!selectedCertificate}
                    title={certificateData.find((c) => c.id === selectedCertificate)?.title || ""}
                    content={certificateData.find((c) => c.id === selectedCertificate)?.details || ""}
                    onClose={() => setSelectedCertificate(null)}
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
                    />
                  ))}
                </div>
                {selectedTopic && (
                  <DetailedInfoModal
                    isOpen={!!selectedTopic}
                    title={learningData.find((t) => t.id === selectedTopic)?.title || ""}
                    content={learningData.find((t) => t.id === selectedTopic)?.details || ""}
                    onClose={() => setSelectedTopic(null)}
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
                <SkillsSection />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsCertificatesLearningSkills;
