import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollMemory } from "@/components/ui/useScrollMemory";
import BackToTopButton from "@/components/ui/BackToTopButton";

const CertificatesPage: React.FC = () => {
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
      {/* Certificate 1: AWS Cloud Practitioner */}
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
            AWS Certified Cloud Practitioner
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
              Foundation-level certification demonstrating comprehensive
              understanding of AWS Cloud services, architectural principles, and
              best practices for cloud computing fundamentals.
            </p>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Core Competencies
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  <strong className={getTextColor()}>Cloud Concepts</strong>{" "}
                  including cloud computing models, deployment types, and the
                  value proposition of AWS Cloud
                </p>
                <p className="mb-4">
                  <strong className={getTextColor()}>
                    AWS Global Infrastructure
                  </strong>{" "}
                  understanding of regions, availability zones, edge locations,
                  and service distribution
                </p>
                <p className="mb-4">
                  <strong className={getTextColor()}>Core AWS Services</strong>{" "}
                  proficiency with compute, storage, database, and networking
                  fundamentals
                </p>
                <p>
                  <strong className={getTextColor()}>
                    Security & Compliance
                  </strong>{" "}
                  knowledge of shared responsibility model, IAM basics, and
                  compliance frameworks
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
                Exam Domains Mastered
              </h3>
              <div
                className={`space-y-6 text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    Cloud Concepts (26%)
                  </h4>
                  <p>
                    Comprehensive understanding of cloud computing benefits,
                    economics, and architectural design principles including
                    scalability, reliability, and cost optimization strategies.
                  </p>
                </div>
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    Security and Compliance (25%)
                  </h4>
                  <p>
                    Deep knowledge of AWS security model, identity and access
                    management, encryption practices, and compliance
                    requirements for various industry standards.
                  </p>
                </div>
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    Technology and Services (33%)
                  </h4>
                  <p>
                    Extensive familiarity with core AWS services including EC2,
                    S3, RDS, VPC, Lambda, and their use cases for building
                    robust cloud solutions.
                  </p>
                </div>
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    Billing and Pricing (16%)
                  </h4>
                  <p>
                    Proficiency in AWS pricing models, cost management tools,
                    billing concepts, and strategies for optimizing cloud
                    expenditure and resource utilization.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Certificate 2: AWS Developer Associate */}
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
            AWS Certified Developer – Associate
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
              Advanced certification validating expertise in developing,
              deploying, and maintaining cloud-native applications on AWS with
              focus on serverless architectures and modern development
              practices.
            </p>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Development Expertise
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  <strong className={getTextColor()}>
                    Application Development
                  </strong>{" "}
                  using AWS SDKs, CLI, and developer tools for building
                  cloud-native applications
                </p>
                <p className="mb-4">
                  <strong className={getTextColor()}>
                    Serverless Computing
                  </strong>{" "}
                  with AWS Lambda, API Gateway, and event-driven architectures
                  for scalable solutions
                </p>
                <p className="mb-4">
                  <strong className={getTextColor()}>
                    Database Integration
                  </strong>{" "}
                  with DynamoDB, RDS, and caching strategies using ElastiCache
                  and CloudFront
                </p>
                <p>
                  <strong className={getTextColor()}>DevOps Practices</strong>{" "}
                  implementing CI/CD pipelines, infrastructure as code, and
                  automated testing frameworks
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
                Key Services Mastery
              </h3>
              <div
                className={`space-y-6 text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    Compute and Serverless
                  </h4>
                  <p>
                    Expert-level proficiency with EC2 optimization, Lambda
                    function development, Elastic Beanstalk deployments, and
                    container services including ECS and Fargate.
                  </p>
                </div>
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    Storage and Databases
                  </h4>
                  <p>
                    Advanced skills in S3 lifecycle management, DynamoDB design
                    patterns, RDS performance tuning, and implementing backup
                    and disaster recovery strategies.
                  </p>
                </div>
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    Integration and Messaging
                  </h4>
                  <p>
                    Comprehensive knowledge of API Gateway configurations,
                    SQS/SNS messaging patterns, EventBridge for event-driven
                    architectures, and Step Functions for workflow
                    orchestration.
                  </p>
                </div>
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    Monitoring and Security
                  </h4>
                  <p>
                    Proficiency in CloudWatch monitoring, X-Ray tracing, IAM
                    policy design, KMS encryption implementation, and
                    application security best practices.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Certificate 3: AWS Solutions Architect Associate */}
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
            AWS Certified Solutions Architect – Associate
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
              Professional-level certification demonstrating ability to design
              and implement distributed systems on AWS with focus on
              scalability, security, cost-effectiveness, and operational
              excellence.
            </p>

            <div className="space-y-6">
              <h3
                className={`text-2xl md:text-3xl font-light transition-colors duration-700 ${getTextColor()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Architectural Excellence
              </h3>
              <div
                className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <p className="mb-4">
                  <strong className={getTextColor()}>
                    Well-Architected Framework
                  </strong>{" "}
                  applying five pillars: operational excellence, security,
                  reliability, performance efficiency, and cost optimization
                </p>
                <p className="mb-4">
                  <strong className={getTextColor()}>
                    High Availability Design
                  </strong>{" "}
                  implementing multi-AZ deployments, fault tolerance, and
                  disaster recovery strategies
                </p>
                <p className="mb-4">
                  <strong className={getTextColor()}>
                    Scalable Architectures
                  </strong>{" "}
                  designing auto-scaling groups, load balancers, and content
                  delivery networks for optimal performance
                </p>
                <p>
                  <strong className={getTextColor()}>
                    Security Integration
                  </strong>{" "}
                  implementing defense-in-depth strategies with VPC design,
                  security groups, and encryption practices
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
                Enterprise Solutions
              </h3>
              <div
                className={`space-y-6 text-lg md:text-xl leading-relaxed transition-colors duration-700 ${getAccentTextColor()}`}
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    Network Architecture Design
                  </h4>
                  <p>
                    Expert design of VPCs, subnets, routing tables, NAT
                    gateways, and hybrid connectivity solutions including Direct
                    Connect and VPN implementations for enterprise environments.
                  </p>
                </div>
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    Data Architecture Solutions
                  </h4>
                  <p>
                    Comprehensive data architecture design using RDS Multi-AZ,
                    DynamoDB Global Tables, Redshift for analytics, and S3 with
                    appropriate storage classes for data lifecycle management.
                  </p>
                </div>
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    Application Integration Patterns
                  </h4>
                  <p>
                    Advanced implementation of microservices architectures using
                    API Gateway, Lambda, SQS, SNS, and EventBridge for
                    decoupled, resilient system designs.
                  </p>
                </div>
                <div>
                  <h4
                    className={`text-xl font-medium mb-2 transition-colors duration-700 ${getTextColor()}`}
                  >
                    Cost Optimization Strategies
                  </h4>
                  <p>
                    Strategic cost management through Reserved Instances, Spot
                    Instances, right-sizing recommendations, and implementing
                    comprehensive tagging and billing strategies for enterprise
                    cost control.
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

/**
 * The main certificates page component, rendering a layout of three sections for the
 * three AWS certifications I have earned.
 *
 @return {ReactElement} The main certificates page component.
 */
export default CertificatesPage;
