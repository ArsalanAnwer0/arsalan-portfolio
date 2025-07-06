import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollMemory } from "@/components/ui/useScrollMemory";
import BackToTopButton from "@/components/ui/BackToTopButton";

const LearningPage: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { navigateToHome } = useScrollMemory();

  // Track scroll progress for gradient transition
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / totalHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate background color based on scroll progress - fast transition
  const getBackgroundStyle = () => {
    const greyIntensity = Math.min(scrollProgress * 3.5, 0.88); // Much faster transition
    return {
      background: `linear-gradient(180deg, 
      rgba(255, 255, 255, ${1 - greyIntensity}) 0%, 
      rgba(35, 35, 35, ${greyIntensity}) 100%)`,
      transition: "background 0.2s ease-out", // Slightly faster transition
    };
  };

  // Calculate text colors based on scroll progress - maximum readability
  const getTextColor = () => {
    return scrollProgress > 0.05 ? "text-white" : "text-black";
  };

  const getSubTextColor = () => {
    return scrollProgress > 0.05 ? "text-white" : "text-black";
  };

  const getAccentTextColor = () => {
    return scrollProgress > 0.05 ? "text-gray-100" : "text-black";
  };

  return (
    <div
      className="min-h-screen transition-all duration-700 ease-in-out"
      style={{ ...getBackgroundStyle(), position: "relative", zIndex: 1 }}
    >
      {/* Elegant Arsalan Navigation */}
      <div className="fixed top-8 left-8 z-50">
        <button
          onClick={navigateToHome}
          className={`text-2xl font-light transition-colors duration-700 hover:opacity-70 ${getTextColor()}`}
          style={{
            fontFamily:
              "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            letterSpacing: "-0.01em",
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          Arsalan
        </button>
      </div>
      {/* Learning Topic 1: Infrastructure as Code Tools */}
      <motion.section
        className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h1
            className={`text-5xl md:text-7xl lg:text-8xl font-light mb-8 transition-colors duration-700 ${getTextColor()}`}
            style={{
              fontFamily:
                "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.02em",
            }}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Infrastructure as Code Tools
          </motion.h1>

          <motion.div
            className="space-y-8"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p
              className={`text-xl md:text-2xl leading-relaxed transition-colors duration-700 ${getSubTextColor()}`}
              style={{
                fontFamily: "'Inter', sans-serif",
                lineHeight: "1.6",
                fontWeight: "300",
              }}
            >
              Learning to provision and manage multi-cloud infrastructure
              efficiently using Terraform and understanding AWS-specific
              infrastructure automation with CloudFormation templates.
            </p>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Terraform
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  HashiCorp Terraform is an open-source Infrastructure as Code
                  tool that lets you define both cloud and on-premises resources
                  in human-readable configuration files. I'm exploring its
                  multi-cloud support across AWS, Azure, and GCP, learning the
                  declarative syntax using HashiCorp Configuration Language
                  (HCL), understanding state management for tracking resource
                  changes, and building modular architecture for reusable
                  components.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                AWS CloudFormation
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p>
                  AWS CloudFormation is a service that helps you model and set
                  up your AWS resources so you can spend less time managing
                  resources and more time focusing on your applications. I'm
                  studying its native integration with AWS services, working
                  with JSON and YAML template formats, learning about change
                  sets to preview changes before execution, and mastering stack
                  management for grouped resources.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Learning Topic 2: Containerization and Orchestration Tools */}
      <motion.section
        className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h1
            className={`text-5xl md:text-7xl lg:text-8xl font-light mb-8 transition-colors duration-700 ${getTextColor()}`}
            style={{
              fontFamily:
                "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.02em",
            }}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Containerization and Orchestration Tools
          </motion.h1>

          <motion.div
            className="space-y-8"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p
              className={`text-xl md:text-2xl leading-relaxed transition-colors duration-700 ${getSubTextColor()}`}
              style={{
                fontFamily: "'Inter', sans-serif",
                lineHeight: "1.6",
                fontWeight: "300",
              }}
            >
              Exploring containerized application development with Docker for
              packaging dependencies and practicing Kubernetes for managing and
              scaling containerized workloads in production environments.
            </p>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Docker
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  Docker is a platform that enables developers to build,
                  package, and distribute applications in containers, making
                  them portable and consistent across environments. I'm learning
                  about isolation of applications and dependencies, ensuring
                  consistent environments from development to production,
                  understanding efficient resource utilization compared to VMs,
                  and appreciating the fast startup times and lightweight
                  footprint that containers provide.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Kubernetes
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p>
                  Kubernetes is an open-source container orchestration platform
                  that automates the deployment, scaling, and management of
                  containerized applications. I'm studying automated deployment
                  and rollbacks, service discovery and load balancing
                  mechanisms, horizontal scaling based on resource usage, and
                  self-healing capabilities that restart failed containers
                  automatically.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Learning Topic 3: CI/CD Tools */}
      <motion.section
        className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h1
            className={`text-5xl md:text-7xl lg:text-8xl font-light mb-8 transition-colors duration-700 ${getTextColor()}`}
            style={{
              fontFamily:
                "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.02em",
            }}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            CI/CD Tools
          </motion.h1>

          <motion.div
            className="space-y-8"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p
              className={`text-xl md:text-2xl leading-relaxed transition-colors duration-700 ${getSubTextColor()}`}
              style={{
                fontFamily: "'Inter', sans-serif",
                lineHeight: "1.6",
                fontWeight: "300",
              }}
            >
              Setting up automated build, test, and deployment pipelines using
              Jenkins and creating CI/CD workflows for AWS-native projects with
              CodePipeline to enable faster and more reliable software delivery.
            </p>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Jenkins
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  Jenkins is an open-source automation server that enables
                  developers to build, test, and deploy their applications
                  continuously. I'm learning about flexible pipeline creation
                  with Jenkinsfile, exploring the extensive plugin ecosystem
                  with over 1500 plugins available, understanding distributed
                  builds across multiple agents, and integrating with version
                  control systems like Git and SVN.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                AWS CodePipeline
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p>
                  AWS CodePipeline is a fully managed continuous delivery
                  service that helps you automate your release pipelines for
                  fast and reliable application updates. I'm studying its
                  seamless integration with other AWS services, understanding
                  the automated release process, learning about parallel
                  execution of stages, and using the visual workflow editor for
                  pipeline management.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Learning Topic 4: Monitoring and Logging Tools */}
      <motion.section
        className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h1
            className={`text-5xl md:text-7xl lg:text-8xl font-light mb-8 transition-colors duration-700 ${getTextColor()}`}
            style={{
              fontFamily:
                "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.02em",
            }}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Monitoring and Logging Tools
          </motion.h1>

          <motion.div
            className="space-y-8"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p
              className={`text-xl md:text-2xl leading-relaxed transition-colors duration-700 ${getSubTextColor()}`}
              style={{
                fontFamily: "'Inter', sans-serif",
                lineHeight: "1.6",
                fontWeight: "300",
              }}
            >
              Analyzing performance, logs, and metrics in AWS environments using
              CloudWatch and exploring open-source tools like Prometheus and
              Grafana for comprehensive system monitoring and visualization.
            </p>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                AWS CloudWatch
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  Amazon CloudWatch is a monitoring and observability service
                  that provides data and actionable insights for AWS resources
                  and applications. I'm learning about metrics collection across
                  AWS services, log collection and analysis capabilities,
                  creating customizable dashboards for visualization, and
                  setting up alarms with automated actions for proactive
                  monitoring.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Prometheus and Grafana
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p>
                  A powerful open-source monitoring solution combining
                  Prometheus for metrics collection and Grafana for
                  visualization. I'm studying time-series data collection
                  mechanisms, learning the powerful query language PromQL for
                  data analysis, exploring rich visualization capabilities for
                  creating insightful dashboards, and understanding alerting and
                  notification systems for incident response.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Learning Topic 5: Cloud Security Tools */}
      <motion.section
        className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h1
            className={`text-5xl md:text-7xl lg:text-8xl font-light mb-8 transition-colors duration-700 ${getTextColor()}`}
            style={{
              fontFamily:
                "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.02em",
            }}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Cloud Security Tools
          </motion.h1>

          <motion.div
            className="space-y-8"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p
              className={`text-xl md:text-2xl leading-relaxed transition-colors duration-700 ${getSubTextColor()}`}
              style={{
                fontFamily: "'Inter', sans-serif",
                lineHeight: "1.6",
                fontWeight: "300",
              }}
            >
              Learning to manage user permissions and secure resources using AWS
              IAM and practicing data encryption and key management in AWS with
              KMS for comprehensive cloud security implementation.
            </p>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                AWS Identity and Access Management (IAM)
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  AWS IAM enables you to manage access to AWS services and
                  resources securely. I'm studying fine-grained access control
                  mechanisms, learning about identity federation for enterprise
                  users, understanding multi-factor authentication
                  implementation, and exploring permission analysis and
                  recommendations for security optimization.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                AWS Key Management Service (KMS)
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p>
                  AWS KMS makes it easy for you to create and manage
                  cryptographic keys and control their use across a wide range
                  of AWS services. I'm learning about centralized key management
                  practices, understanding secure key storage and rotation
                  mechanisms, exploring integration with AWS services for
                  encryption, and studying auditing and compliance capabilities
                  for regulatory requirements.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Learning Topic 6: Cloud Cost Management Tools */}
      <motion.section
        className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h1
            className={`text-5xl md:text-7xl lg:text-8xl font-light mb-8 transition-colors duration-700 ${getTextColor()}`}
            style={{
              fontFamily:
                "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.02em",
            }}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Cloud Cost Management Tools
          </motion.h1>

          <motion.div
            className="space-y-8"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p
              className={`text-xl md:text-2xl leading-relaxed transition-colors duration-700 ${getSubTextColor()}`}
              style={{
                fontFamily: "'Inter', sans-serif",
                lineHeight: "1.6",
                fontWeight: "300",
              }}
            >
              Tracking AWS usage and optimizing costs using Cost Explorer and
              learning to optimize EC2 spot instance costs and cloud efficiency
              with Spot.io for comprehensive cloud financial management.
            </p>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                AWS Cost Explorer
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  AWS Cost Explorer provides visualization and management of
                  your AWS costs and usage over time. I'm learning about
                  interactive cost analysis tools, creating customizable cost
                  reports for different stakeholders, understanding resource
                  optimization recommendations, and exploring future cost
                  forecasting capabilities for budget planning.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Spot.io (formerly Spotinst)
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p>
                  Spot.io helps optimize infrastructure costs by leveraging Spot
                  Instances across different cloud providers. I'm studying
                  automated Spot Instance management techniques, learning about
                  workload scheduling optimization, exploring cross-cloud cost
                  optimization strategies, and understanding Reserved Instance
                  management for maximum cost efficiency.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      {/* Add BackToTopButton */}
      <BackToTopButton scrollProgress={scrollProgress} />
    </div>
  );
};

export default LearningPage;
