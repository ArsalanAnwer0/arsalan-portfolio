// Project data
export const projectData = [
    {
      id: "infrastructure-automation",
      title: "Infrastructure & Automation",
      summary: "Building infrastructure with Terraform and CloudFormation, designing scalable VPCs with subnets, and creating CI/CD pipelines.",
      details: `
        <h3 class="text-xl font-bold mb-4">Infrastructure as Code</h3>
        <p class="mb-4">Infrastructure as Code (IaC) is the practice of managing and provisioning computing infrastructure through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools.</p>
        
        <h4 class="text-lg font-semibold mb-2">Key Technologies:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li>Terraform for multi-cloud deployments</li>
          <li>AWS CloudFormation for AWS-specific resources</li>
          <li>Pulumi for infrastructure in familiar programming languages</li>
        </ul>
        
        <h4 class="text-lg font-semibold mb-2">Recent Projects:</h4>
        <ol class="list-decimal pl-6 mb-4">
          <li>
            <p class="font-medium">Multi-Region Disaster Recovery Setup</p>
            <p class="text-sm mb-2">Used Terraform to create a disaster recovery solution across multiple AWS regions, ensuring high availability with automatic failover capabilities.</p>
          </li>
          <li>
            <p class="font-medium">Modular VPC Architecture</p>
            <p class="text-sm mb-2">Designed reusable CloudFormation templates for creating consistent, secure VPC setups across multiple environments.</p>
          </li>
          <li>
            <p class="font-medium">Automated CI/CD Pipeline</p>
            <p class="text-sm">Implemented GitLab CI/CD pipelines integrated with AWS CodePipeline for continuous deployment of infrastructure changes with approval workflows.</p>
          </li>
        </ol>
      `
    },
    {
      id: "security-compliance",
      title: "Security & Compliance",
      summary: "Configuring secure IAM roles, encrypting data for storage, and adhering to compliance frameworks like GDPR and HIPAA.",
      details: `
        <h3 class="text-xl font-bold mb-4">Cloud Security & Compliance</h3>
        <p class="mb-4">Cloud security encompasses the technologies, policies, controls, and services that protect cloud data, applications, and infrastructure from threats and data breaches.</p>
        
        <h4 class="text-lg font-semibold mb-2">Security Practices:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li>Principle of least privilege for IAM policies</li>
          <li>Network segmentation with security groups</li>
          <li>Data encryption at rest and in transit</li>
          <li>Regular security assessments and penetration testing</li>
        </ul>
        
        <h4 class="text-lg font-semibold mb-2">Compliance Frameworks:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li>GDPR - General Data Protection Regulation</li>
          <li>HIPAA - Health Insurance Portability and Accountability Act</li>
          <li>SOC 2 - Service Organization Control 2</li>
          <li>PCI DSS - Payment Card Industry Data Security Standard</li>
        </ul>
      `
    },
    {
      id: "deployment-management",
      title: "Deployment & Management",
      summary: "Deploying Kubernetes clusters, managing serverless applications, and containerizing workloads with Docker and ECS.",
      details: `
        <h3 class="text-xl font-bold mb-4">Deployment & Management</h3>
        <p class="mb-4">Modern application deployment requires expertise in container orchestration, serverless architectures, and immutable infrastructure principles.</p>
        
        <h4 class="text-lg font-semibold mb-2">Container Orchestration:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li>Amazon EKS for managed Kubernetes</li>
          <li>Amazon ECS for container orchestration</li>
          <li>Docker Swarm for simpler deployments</li>
        </ul>
        
        <h4 class="text-lg font-semibold mb-2">Serverless Computing:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li>AWS Lambda for event-driven computing</li>
          <li>API Gateway for serverless APIs</li>
          <li>Step Functions for complex workflows</li>
          <li>DynamoDB for serverless databases</li>
        </ul>
      `
    },
    {
      id: "monitoring-optimization",
      title: "Monitoring & Optimization",
      summary: "Optimizing cloud costs, monitoring systems with CloudWatch, and designing disaster recovery strategies.",
      details: `
        <h3 class="text-xl font-bold mb-4">Monitoring & Optimization</h3>
        <p class="mb-4">Effective cloud operations require comprehensive monitoring, cost optimization, and disaster recovery planning.</p>
        
        <h4 class="text-lg font-semibold mb-2">Monitoring Solutions:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li>Amazon CloudWatch for metrics, logs, and alarms</li>
          <li>Prometheus and Grafana for open-source monitoring</li>
          <li>ELK Stack (Elasticsearch, Logstash, Kibana) for log analysis</li>
          <li>Datadog for unified observability</li>
        </ul>
        
        <h4 class="text-lg font-semibold mb-2">Cost Optimization Strategies:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li>Right-sizing resources based on usage patterns</li>
          <li>Reserved Instances and Savings Plans for predictable workloads</li>
          <li>Spot Instances for fault-tolerant, flexible workloads</li>
          <li>Auto Scaling for dynamic workloads</li>
        </ul>
      `
    }
  ];
  
  // Certificate data
  export const certificateData = [
    {
      id: "aws-cloud-practitioner",
      title: "AWS Certified Cloud Practitioner",
      summary: "Ideal for beginners to understand cloud concepts, billing, and core AWS services.",
      details: `
        <h3 class="text-xl font-bold mb-4">AWS Certified Cloud Practitioner</h3>
        <p class="mb-4">The AWS Certified Cloud Practitioner exam is designed for individuals who have the knowledge and skills necessary to effectively demonstrate an overall understanding of the AWS Cloud.</p>
        
        <h4 class="text-lg font-semibold mb-2">Certification Overview:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li>Fundamental understanding of AWS Cloud services</li>
          <li>Knowledge of AWS Cloud architectural principles</li>
          <li>Understanding of AWS pricing, support, and security</li>
          <li>Recognition of AWS core services and use cases</li>
        </ul>
        
        <h4 class="text-lg font-semibold mb-2">Exam Domains:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li>Cloud Concepts (26%)</li>
          <li>Security and Compliance (25%)</li>
          <li>Technology (33%)</li>
          <li>Billing and Pricing (16%)</li>
        </ul>
      `
    },
    {
      id: "aws-developer-associate",
      title: "AWS Certified Developer – Associate",
      summary: "Covers building, deploying, and maintaining AWS-based applications.",
      details: `
        <h3 class="text-xl font-bold mb-4">AWS Certified Developer – Associate</h3>
        <p class="mb-4">The AWS Certified Developer – Associate certification validates technical expertise in developing and maintaining applications on the AWS platform.</p>
        
        <h4 class="text-lg font-semibold mb-2">Certification Overview:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li>Demonstrates knowledge of core AWS services, uses, and best practices</li>
          <li>Shows proficiency in developing, deploying, and debugging AWS-based applications</li>
          <li>Validates understanding of AWS SDKs, AWS CLI, and other developer tools</li>
        </ul>
        
        <h4 class="text-lg font-semibold mb-2">Key Services Covered:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li>Amazon EC2, Lambda, and Elastic Beanstalk</li>
          <li>Amazon S3, DynamoDB, and RDS</li>
          <li>Amazon API Gateway and SQS/SNS</li>
          <li>AWS CloudFormation and IAM</li>
        </ul>
      `
    },
    {
      id: "aws-solutions-architect-associate",
      title: "AWS Certified Solutions Architect – Associate",
      summary: "Focused on designing scalable, secure, and reliable cloud solutions in AWS.",
      details: `
        <h3 class="text-xl font-bold mb-4">AWS Certified Solutions Architect – Associate</h3>
        <p class="mb-4">The AWS Certified Solutions Architect – Associate certification validates the ability to design and implement distributed systems on AWS according to AWS best practices.</p>
        
        <h4 class="text-lg font-semibold mb-2">Certification Overview:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li>Demonstrates ability to design AWS architectures that are cost-effective, resilient, and scalable</li>
          <li>Shows understanding of how to select appropriate AWS services based on requirements</li>
          <li>Validates knowledge of AWS security best practices and compliance considerations</li>
        </ul>
        
        <h4 class="text-lg font-semibold mb-2">Key Services Covered:</h4>
        <ul class="list-disc pl-6 mb-4">
          <li>Amazon EC2, Lambda, and Auto Scaling</li>
          <li>Amazon VPC, Direct Connect, and Route 53</li>
          <li>Amazon S3, EBS, and EFS</li>
          <li>Amazon RDS, DynamoDB, and Redshift</li>
        </ul>
      `
    }
  ];
  
  // Learning data
  export const learningData = [
    {
      id: "iac-tools",
      title: "Infrastructure as Code (IaC) Tools",
      summary: `
        <li><strong>Terraform:</strong> Learning to provision and manage multi-cloud infrastructure efficiently.</li>
        <li><strong>AWS CloudFormation:</strong> Understanding AWS-specific infrastructure automation with templates.</li>
      `,
      details: `
        <h3 class="text-xl font-bold mb-4">Infrastructure as Code (IaC) Tools</h3>
        <p class="mb-4">Infrastructure as Code allows you to manage your infrastructure using configuration files rather than through a graphical user interface, treating your infrastructure setup as software development.</p>
        
        <h4 class="text-lg font-semibold mb-2">Terraform</h4>
        <p class="mb-4">HashiCorp Terraform is an open-source IaC tool that lets you define both cloud and on-prem resources in human-readable configuration files.</p>
        <ul class="list-disc pl-6 mb-4">
          <li>Multi-cloud support (AWS, Azure, GCP, and others)</li>
          <li>Declarative syntax using HashiCorp Configuration Language (HCL)</li>
          <li>State management for tracking resource changes</li>
          <li>Modular architecture for reusable components</li>
        </ul>
        
        <h4 class="text-lg font-semibold mb-2">AWS CloudFormation</h4>
        <p class="mb-4">AWS CloudFormation is a service that helps you model and set up your AWS resources so you can spend less time managing resources and more time focusing on your applications.</p>
        <ul class="list-disc pl-6 mb-4">
          <li>Native integration with AWS services</li>
          <li>JSON or YAML template formats</li>
          <li>Change sets to preview changes before execution</li>
          <li>Stack management for grouped resources</li>
        </ul>
      `
    },
    {
      id: "containerization-tools",
      title: "Containerization and Orchestration Tools",
      summary: `
        <li><strong>Docker:</strong> Exploring containerized application development with all dependencies.</li>
        <li><strong>Kubernetes:</strong> Practicing managing and scaling containerized workloads.</li>
      `,
      details: `
        <h3 class="text-xl font-bold mb-4">Containerization and Orchestration Tools</h3>
        <p class="mb-4">Containers package code and dependencies together, ensuring consistent operation across different computing environments. Container orchestration tools automate deployment, scaling, and management of these containers.</p>
        
        <h4 class="text-lg font-semibold mb-2">Docker</h4>
        <p class="mb-4">Docker is a platform that enables developers to build, package, and distribute applications in containers, making them portable and consistent across environments.</p>
        <ul class="list-disc pl-6 mb-4">
          <li>Isolation of applications and dependencies</li>
          <li>Consistent environments from development to production</li>
          <li>Efficient resource utilization compared to VMs</li>
          <li>Fast startup times and lightweight footprint</li>
        </ul>
        
        <h4 class="text-lg font-semibold mb-2">Kubernetes</h4>
        <p class="mb-4">Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications.</p>
        <ul class="list-disc pl-6 mb-4">
          <li>Automated deployment and rollbacks</li>
          <li>Service discovery and load balancing</li>
          <li>Horizontal scaling based on resource usage</li>
          <li>Self-healing capabilities (restarts failed containers)</li>
        </ul>
      `
    },
    {
      id: "cicd-tools",
      title: "CI/CD Tools",
      summary: `
        <li><strong>Jenkins:</strong> Setting up automated build, test, and deployment pipelines.</li>
        <li><strong>AWS CodePipeline:</strong> Creating CI/CD workflows for AWS-native projects.</li>
      `,
      details: `
        <h3 class="text-xl font-bold mb-4">CI/CD Tools</h3>
        <p class="mb-4">Continuous Integration and Continuous Deployment (CI/CD) tools automate the building, testing, and deployment of applications, enabling faster and more reliable software delivery.</p>
        
        <h4 class="text-lg font-semibold mb-2">Jenkins</h4>
        <p class="mb-4">Jenkins is an open-source automation server that enables developers to build, test, and deploy their applications continuously.</p>
        <ul class="list-disc pl-6 mb-4">
          <li>Flexible pipeline creation with Jenkinsfile</li>
          <li>Extensive plugin ecosystem (1500+ plugins)</li>
          <li>Distributed builds across multiple agents</li>
          <li>Integration with version control systems (Git, SVN, etc.)</li>
        </ul>
        
        <h4 class="text-lg font-semibold mb-2">AWS CodePipeline</h4>
        <p class="mb-4">AWS CodePipeline is a fully managed continuous delivery service that helps you automate your release pipelines for fast and reliable application updates.</p>
        <ul class="list-disc pl-6 mb-4">
          <li>Seamless integration with other AWS services</li>
          <li>Automated release process</li>
          <li>Parallel execution of stages</li>
          <li>Visual workflow editor</li>
        </ul>
      `
    },
    {
      id: "monitoring-tools",
      title: "Monitoring and Logging Tools",
      summary: `
        <li><strong>AWS CloudWatch:</strong> Analyzing performance, logs, and metrics in AWS environments.</li>
        <li><strong>Prometheus + Grafana:</strong> Using open-source tools for system monitoring and visualization.</li>
      `,
      details: `
        <h3 class="text-xl font-bold mb-4">Monitoring and Logging Tools</h3>
        <p class="mb-4">Effective monitoring and logging tools are essential for maintaining the health, performance, and security of cloud infrastructure and applications.</p>
        
        <h4 class="text-lg font-semibold mb-2">AWS CloudWatch</h4>
        <p class="mb-4">Amazon CloudWatch is a monitoring and observability service that provides data and actionable insights for AWS resources and applications.</p>
        <ul class="list-disc pl-6 mb-4">
          <li>Metrics collection across AWS services</li>
          <li>Log collection and analysis</li>
          <li>Customizable dashboards</li>
          <li>Alarms and automated actions</li>
        </ul>
        
        <h4 class="text-lg font-semibold mb-2">Prometheus and Grafana</h4>
        <p class="mb-4">A powerful open-source monitoring solution combining Prometheus for metrics collection and Grafana for visualization.</p>
        <ul class="list-disc pl-6 mb-4">
          <li>Time-series data collection</li>
          <li>Powerful query language (PromQL)</li>
          <li>Rich visualization capabilities</li>
          <li>Alerting and notification systems</li>
        </ul>
      `
    },
    {
      id: "cloud-security",
      title: "Cloud Security Tools",
      summary: `
        <li><strong>AWS IAM:</strong> Learning to manage user permissions and secure resources.</li>
        <li><strong>AWS KMS:</strong> Practicing data encryption and key management in AWS.</li>
      `,
      details: `
        <h3 class="text-xl font-bold mb-4">Cloud Security Tools</h3>
        <p class="mb-4">Cloud security tools help protect cloud-based infrastructure and applications from threats, unauthorized access, and data breaches.</p>
        
        <h4 class="text-lg font-semibold mb-2">AWS Identity and Access Management (IAM)</h4>
        <p class="mb-4">AWS IAM enables you to manage access to AWS services and resources securely.</p>
        <ul class="list-disc pl-6 mb-4">
          <li>Fine-grained access control</li>
          <li>Identity federation for enterprise users</li>
          <li>Multi-factor authentication</li>
          <li>Permission analysis and recommendations</li>
        </ul>
        
        <h4 class="text-lg font-semibold mb-2">AWS Key Management Service (KMS)</h4>
        <p class="mb-4">AWS KMS makes it easy for you to create and manage cryptographic keys and control their use across a wide range of AWS services.</p>
        <ul class="list-disc pl-6 mb-4">
          <li>Centralized key management</li>
          <li>Secure key storage and rotation</li>
          <li>Integration with AWS services for encryption</li>
          <li>Auditing and compliance capabilities</li>
        </ul>
      `
    },
    {
      id: "cost-management",
      title: "Cloud Cost Management Tools",
      summary: `
        <li><strong>AWS Cost Explorer:</strong> Tracking AWS usage and optimizing costs.</li>
        <li><strong>Spot.io:</strong> Learning to optimize EC2 spot instance costs and cloud efficiency.</li>
      `,
      details: `
        <h3 class="text-xl font-bold mb-4">Cloud Cost Management Tools</h3>
        <p class="mb-4">Cost management tools help monitor, analyze, and optimize cloud spending to ensure efficient use of resources while maintaining performance.</p>
        
        <h4 class="text-lg font-semibold mb-2">AWS Cost Explorer</h4>
        <p class="mb-4">AWS Cost Explorer provides visualization and management of your AWS costs and usage over time.</p>
        <ul class="list-disc pl-6 mb-4">
          <li>Interactive cost analysis</li>
          <li>Customizable cost reports</li>
          <li>Resource optimization recommendations</li>
          <li>Future cost forecasting</li>
        </ul>
        
        <h4 class="text-lg font-semibold mb-2">Spot.io (formerly Spotinst)</h4>
        <p class="mb-4">Spot.io helps optimize infrastructure costs by leveraging Spot Instances across different cloud providers.</p>
        <ul class="list-disc pl-6 mb-4">
          <li>Automated Spot Instance management</li>
          <li>Workload scheduling optimization</li>
          <li>Cross-cloud cost optimization</li>
          <li>Reserved Instance management</li>
        </ul>
      `
    }
  ];