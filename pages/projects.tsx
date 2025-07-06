import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollMemory } from "@/components/ui/useScrollMemory";
import BackToTopButton from "@/components/ui/BackToTopButton";

const ProjectsPage: React.FC = () => {
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

      {/* Project 1: Infrastructure & Automation */}
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
            Infrastructure & Automation
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
              Building infrastructure with Terraform and CloudFormation,
              designing scalable VPCs with subnets, and creating CI/CD pipelines
              for reliable, automated deployments.
            </p>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Core Technologies
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  <strong className={getTextColor()}>Terraform</strong> for
                  multi-cloud infrastructure provisioning and state management
                </p>
                <p className="mb-4">
                  <strong className={getTextColor()}>AWS CloudFormation</strong>{" "}
                  for native AWS resource orchestration and templates
                </p>
                <p>
                  <strong className={getTextColor()}>Pulumi</strong> for
                  infrastructure as code in familiar programming languages
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
                Key Projects
              </h3>
              <div
                className={`space-y-6 text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    Multi-Region Disaster Recovery
                  </h4>
                  <p>
                    Architected and implemented a comprehensive disaster
                    recovery solution across multiple AWS regions using
                    Terraform, ensuring 99.9% uptime with automated failover
                    capabilities and cross-region data replication.
                  </p>
                </div>
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    Modular VPC Architecture
                  </h4>
                  <p>
                    Designed reusable CloudFormation templates for creating
                    consistent, secure VPC setups across development, staging,
                    and production environments with automated subnet
                    calculations and security group management.
                  </p>
                </div>
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    Enterprise CI/CD Pipeline
                  </h4>
                  <p>
                    Built end-to-end GitLab CI/CD pipelines integrated with AWS
                    CodePipeline, featuring automated testing, security
                    scanning, infrastructure validation, and blue-green
                    deployment strategies.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Project 2: Security & Compliance */}
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
            Security & Compliance
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
              Implementing robust security frameworks with IAM best practices,
              data encryption strategies, and compliance adherence to industry
              standards including GDPR, HIPAA, and SOC 2.
            </p>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Security Practices
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  <strong className={getTextColor()}>
                    Zero Trust Architecture
                  </strong>{" "}
                  with principle of least privilege for all IAM policies and
                  access controls
                </p>
                <p className="mb-4">
                  <strong className={getTextColor()}>Defense in Depth</strong>{" "}
                  implementing multiple layers of security including network
                  segmentation, WAF, and endpoint protection
                </p>
                <p className="mb-4">
                  <strong className={getTextColor()}>Data Encryption</strong> at
                  rest and in transit using AWS KMS, SSL/TLS certificates, and
                  application-level encryption
                </p>
                <p>
                  <strong className={getTextColor()}>
                    Continuous Security
                  </strong>{" "}
                  with automated vulnerability assessments, penetration testing,
                  and security monitoring
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
                Compliance Frameworks
              </h3>
              <div
                className={`space-y-6 text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    GDPR Compliance Implementation
                  </h4>
                  <p>
                    Designed and implemented data privacy controls, consent
                    management systems, and data retention policies ensuring
                    full GDPR compliance across European operations.
                  </p>
                </div>
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    HIPAA Security Framework
                  </h4>
                  <p>
                    Established comprehensive healthcare data protection
                    protocols including encrypted databases, audit logging,
                    access controls, and secure communication channels for PHI
                    handling.
                  </p>
                </div>
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    SOC 2 Type II Certification
                  </h4>
                  <p>
                    Led organization through SOC 2 audit preparation,
                    implementing security controls, monitoring systems, and
                    documentation processes for successful Type II
                    certification.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Project 3: Deployment & Management */}
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
            Deployment & Management
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
              Orchestrating modern deployment strategies with Kubernetes
              clusters, serverless architectures, and containerized workloads
              using Docker, ECS, and advanced orchestration platforms.
            </p>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Container Orchestration
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  <strong className={getTextColor()}>Amazon EKS</strong> for
                  managed Kubernetes clusters with auto-scaling, load balancing,
                  and service mesh integration
                </p>
                <p className="mb-4">
                  <strong className={getTextColor()}>Amazon ECS</strong> with
                  Fargate for serverless container deployment and microservices
                  architecture
                </p>
                <p className="mb-4">
                  <strong className={getTextColor()}>Docker Swarm</strong> for
                  lightweight container orchestration in development and testing
                  environments
                </p>
                <p>
                  <strong className={getTextColor()}>Helm Charts</strong> for
                  Kubernetes package management and templated deployments across
                  environments
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
                Serverless Architecture
              </h3>
              <div
                className={`space-y-6 text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    Event-Driven Computing
                  </h4>
                  <p>
                    Architected AWS Lambda functions for real-time data
                    processing, automated workflows, and microservices with
                    millisecond response times and automatic scaling based on
                    demand.
                  </p>
                </div>
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    API Gateway Integration
                  </h4>
                  <p>
                    Designed RESTful and GraphQL APIs using AWS API Gateway with
                    custom authorizers, request validation, caching strategies,
                    and rate limiting for optimal performance.
                  </p>
                </div>
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    Serverless Data Pipeline
                  </h4>
                  <p>
                    Built comprehensive data processing workflows using Step
                    Functions, Lambda, DynamoDB, and S3 for real-time analytics
                    and batch processing with error handling and retry logic.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Project 4: Monitoring & Optimization */}
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
            Monitoring & Optimization
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
              Implementing comprehensive observability solutions with
              CloudWatch, Prometheus, and Grafana while optimizing cloud costs
              through intelligent resource management and disaster recovery
              planning.
            </p>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Observability Stack
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  <strong className={getTextColor()}>Amazon CloudWatch</strong>{" "}
                  for comprehensive metrics, custom dashboards, intelligent
                  alarms, and log aggregation across all AWS services
                </p>
                <p className="mb-4">
                  <strong className={getTextColor()}>
                    Prometheus & Grafana
                  </strong>{" "}
                  for open-source monitoring with custom metrics collection,
                  alerting rules, and beautiful visualization dashboards
                </p>
                <p className="mb-4">
                  <strong className={getTextColor()}>ELK Stack</strong> for
                  centralized logging with Elasticsearch, Logstash, and Kibana
                  for log analysis and troubleshooting
                </p>
                <p>
                  <strong className={getTextColor()}>
                    Datadog Integration
                  </strong>{" "}
                  for unified observability across cloud, containers,
                  applications, and infrastructure with AI-powered insights
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
                Cost Optimization Strategies
              </h3>
              <div
                className={`space-y-6 text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    Intelligent Resource Management
                  </h4>
                  <p>
                    Implemented automated right-sizing recommendations using
                    CloudWatch metrics and AWS Compute Optimizer, achieving 35%
                    cost reduction while maintaining performance standards.
                  </p>
                </div>
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    Reserved Instance Strategy
                  </h4>
                  <p>
                    Developed predictive analytics for Reserved Instance and
                    Savings Plans purchases, optimizing compute costs through
                    strategic capacity planning and usage pattern analysis.
                  </p>
                </div>
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    Auto Scaling & Spot Instances
                  </h4>
                  <p>
                    Designed intelligent auto-scaling policies with predictive
                    scaling, spot instance integration, and graceful fault
                    tolerance achieving optimal cost-performance ratios for
                    dynamic workloads.
                  </p>
                </div>
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

export default ProjectsPage;
