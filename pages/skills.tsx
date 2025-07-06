import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollMemory } from "@/components/ui/useScrollMemory";
import BackToTopButton from "@/components/ui/BackToTopButton";

const SkillsPage: React.FC = () => {
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

      {/* Skill Category 1: Cloud Architecture & Infrastructure */}
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
            Cloud Architecture & Infrastructure
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
              Expertise in designing and implementing scalable cloud
              architectures with comprehensive knowledge of AWS services,
              infrastructure as code methodologies, and multi-cloud strategies
              for enterprise environments.
            </p>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Amazon Web Services (AWS)
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  Deep expertise in AWS cloud services spanning over three
                  years, with comprehensive knowledge of core services including
                  EC2, S3, RDS, VPC, Lambda, and IAM. Proficient in designing
                  scalable, high-availability architectures using AWS
                  Well-Architected Framework principles. Experience with
                  advanced services like EKS, ECS, CloudFormation, and
                  CloudWatch for comprehensive cloud solutions.
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
                Infrastructure as Code
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  Extensive experience with Terraform for multi-cloud
                  infrastructure provisioning, enabling declarative
                  infrastructure management across AWS, Azure, and Google Cloud
                  Platform. Proficient in AWS CloudFormation for native AWS
                  resource orchestration, template design, and stack management.
                  Strong understanding of infrastructure versioning, state
                  management, and collaborative infrastructure development
                  workflows.
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
                Multi-Cloud Strategy
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p>
                  Working knowledge of Azure Cloud Services and Google Cloud
                  Platform, enabling hybrid and multi-cloud architectural
                  decisions. Understanding of cloud-agnostic design patterns,
                  vendor risk mitigation strategies, and cross-platform service
                  integration for comprehensive enterprise cloud strategies.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skill Category 2: Containerization & Orchestration */}
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
            Containerization & Orchestration
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
              Proficient in containerization technologies and orchestration
              platforms, enabling microservices architectures, efficient
              application deployment strategies, and scalable container
              management solutions.
            </p>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Docker & Container Technologies
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  Extensive experience with Docker containerization spanning
                  over three years, including multi-stage builds, image
                  optimization, security hardening, and registry management.
                  Proficient in creating efficient Dockerfiles, implementing
                  container security best practices, and managing container
                  lifecycles across development, staging, and production
                  environments.
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
                Kubernetes Orchestration
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  Strong foundation in Kubernetes for container orchestration,
                  including deployments, services, ingress controllers, and
                  persistent volumes. Experience with Helm for package
                  management, cluster administration, monitoring, and scaling
                  strategies. Understanding of Kubernetes networking, security
                  policies, and resource management for enterprise workloads.
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
                Managed Container Services
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p>
                  Practical experience with Amazon EKS for managed Kubernetes
                  and Amazon ECS for container orchestration. Understanding of
                  Fargate for serverless containers, service mesh architectures,
                  and integration with AWS services for comprehensive
                  container-based application deployment and management.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skill Category 3: Programming & Development */}
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
            Programming & Development
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
              Strong foundation in modern programming languages and frameworks,
              with emphasis on backend development, API design, infrastructure
              automation, and full-stack application development capabilities.
            </p>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Python & Backend Development
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  Over four years of experience with Python for backend
                  development, automation scripting, and infrastructure tooling.
                  Proficient in frameworks like Django and Flask, API
                  development with FastAPI, and infrastructure automation using
                  Boto3 for AWS integration. Strong understanding of Python best
                  practices, testing frameworks, and package management.
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
                JavaScript & Modern Web Technologies
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  Comprehensive knowledge of JavaScript and TypeScript for both
                  frontend and backend development. Experience with Node.js for
                  server-side applications, React.js for user interface
                  development, and modern tooling including Webpack, Babel, and
                  npm ecosystem. Understanding of asynchronous programming,
                  RESTful API design, and modern ES6+ features.
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
                Emerging Technologies
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p>
                  Exploring Go programming language for high-performance backend
                  services and microservices architecture. Understanding of Go's
                  concurrency model, performance characteristics, and
                  suitability for cloud-native applications and infrastructure
                  tooling development.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skill Category 4: DevOps & CI/CD */}
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
            DevOps & CI/CD
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
              Experienced in building robust CI/CD pipelines and implementing
              DevOps practices that enable rapid, reliable software delivery
              with comprehensive automation, testing, and deployment strategies.
            </p>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Jenkins & Pipeline Automation
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  Extensive experience with Jenkins for continuous integration
                  and deployment, including Jenkinsfile pipeline development,
                  multi-branch strategies, and distributed build systems.
                  Proficient in plugin ecosystem utilization, security
                  configurations, and integration with version control systems,
                  testing frameworks, and deployment platforms.
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
                GitLab CI/CD & Modern Platforms
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  Strong proficiency with GitLab CI/CD for integrated source
                  control and deployment workflows. Experience with GitHub
                  Actions for repository-based automation and AWS CodePipeline
                  for cloud-native continuous delivery. Understanding of
                  pipeline optimization, parallel execution, and deployment
                  strategies including blue-green and canary deployments.
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
                Configuration Management
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p>
                  Working knowledge of Ansible for configuration management and
                  application deployment automation. Understanding of
                  infrastructure provisioning, configuration drift prevention,
                  and automated system administration across diverse server
                  environments and cloud platforms.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skill Category 5: Monitoring & Observability */}
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
            Monitoring & Observability
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
              Skilled in implementing comprehensive monitoring and observability
              solutions that provide deep insights into system performance,
              application behavior, and operational health across distributed
              systems.
            </p>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                AWS CloudWatch & Native Monitoring
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  Comprehensive experience with AWS CloudWatch for metrics
                  collection, custom dashboard creation, log analysis, and
                  intelligent alerting. Proficient in CloudWatch Logs Insights
                  for log analysis, X-Ray for distributed tracing, and Systems
                  Manager for operational insights. Understanding of
                  cost-effective monitoring strategies and automated remediation
                  workflows.
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
                Open Source Monitoring Stack
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  Working experience with Prometheus for time-series metrics
                  collection and Grafana for visualization and dashboarding.
                  Understanding of PromQL query language, alert manager
                  configuration, and custom exporter development. Familiarity
                  with ELK Stack (Elasticsearch, Logstash, Kibana) for
                  centralized logging and log analysis workflows.
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
                Enterprise Observability Platforms
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p>
                  Exploring enterprise observability solutions like Datadog for
                  unified monitoring across infrastructure, applications, and
                  logs. Understanding of APM (Application Performance
                  Monitoring), synthetic monitoring, and machine
                  learning-powered anomaly detection for proactive system health
                  management.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skill Category 6: Database & Storage */}
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
            Database & Storage Systems
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
              Knowledgeable in various database technologies and storage
              solutions, with expertise in both relational and NoSQL databases,
              caching strategies, and cloud-native storage services for
              different use cases.
            </p>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Relational Database Systems
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  Extensive experience with PostgreSQL for complex relational
                  data modeling, performance optimization, and advanced features
                  including JSON support, full-text search, and replication
                  strategies. Understanding of database administration, backup
                  and recovery procedures, query optimization, and connection
                  pooling for high-performance applications.
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
                NoSQL & Document Databases
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  Proficient with MongoDB for document-based data storage,
                  schema design, aggregation pipelines, and horizontal scaling
                  strategies. Experience with Amazon DynamoDB for serverless
                  NoSQL applications, including partition key design, global
                  secondary indexes, and DynamoDB Streams for real-time data
                  processing.
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
                Cloud Storage & Caching
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p>
                  Comprehensive knowledge of Amazon S3 for object storage,
                  including lifecycle policies, cross-region replication, and
                  security configurations. Working experience with Redis for
                  in-memory caching, session management, and real-time data
                  structures. Understanding of storage optimization, cost
                  management, and data archiving strategies.
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

export default SkillsPage;
