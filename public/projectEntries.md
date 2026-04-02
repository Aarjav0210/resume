---
entries:
  - id: 6
    title: "Lucid - Biosecurity Screening Platform"
    demoVideo: "/demos/Lucid.mp4"
    description: |
      Built a **protein screening pipeline** that decomposes sequences into functional domains and runs parallel structure prediction (**ESMFold**) and similarity search (**Foldseek**, **Diamond**) to catch threats that evade standard **BLAST** screening.
      
      Designed an **agentic LLM layer** that reasons over per-domain signals to assess combinatorial risk from chimeric sequences.
    skills:
      - python
      - ESMFold
      - Foldseek
      - LLMs
      - biosecurity
      - protein structure

  - id: 0
    title: "ShardCompute - Distributed Inference Network"
    description: |
      Built a **distributed model-sharding inference system** using **MLX** to run large models across heterogeneous **M1 MacBooks** beyond single-machine memory limits.
      
      Designed a **coordinator–worker runtime** for synchronized tensor computation over WiFi via an **EC2 relay**, achieving **~5 tok/s** and identifying network latency as the primary bottleneck for future peer-to-peer optimization.
    skills:
      - MLX
      - distributed systems
      - EC2
      - model parallelism
      - networking

  - id: 1
    title: "Action-Aware Video Decomposition for Embodied Learning"
    description: |
      Transformed **egocentric videos** into dynamic, **growing DAG representations** of activity, where nodes correspond to **atomic subtasks** and edges encode temporal and causal structure.
      
      Combined LLMs, VLMs, motion signals, and change-point detection to segment unstructured video into semantically meaningful action units without manual annotation.
      
      Enabled scalable generation of **task-level training data** for **Vision-Language-Action (VLA)** models, supporting **weak supervision** and robust decomposition across heterogeneous real-world demonstrations.
    skills:
      - python
      - computer vision
      - VLMs
      - LLMs
      - VLA
      - change-point detection

  - id: 2
    title: "Riddlr – KG-RAG for Instruction Manuals"
    description: |
      Engineered a **KG-RAG pipeline** to parse any instruction manual and extract entities and relations into **Neo4j**, enabling structured retrieval for **LLM grounding**.
      
      Built a user chat UI that generates concise, **citation-backed answers** with contextual follow-ups using **Google Gemini**.
    skills:
      - python
      - neo4j
      - LLMs
      - RAG
      - knowledge graphs
      - entity extraction

  - id: 3
    title: "GaitMed - Real-Time Diagnosis"
    description: |
      Voted **Best Project** at **NHS Hack Day 2023**.
      
      Used time-series data from smartphone **accelerometer** and **gyroscope** to extract gait features and train **SVM/LSTM models** that flag early markers of early onset chronic diseases such as **Parkinson's** and **diabetic neuropathy**.
      
      Collaborated cross-functionally with **F2 Doctors** to develop a prototype for real-world clinical application.
    skills:
      - python
      - pytorch
      - svm
      - lstm
      - time-series
      - sensor fusion
      - wearable ML

  - id: 4
    title: "Bike-Share Navigation System"
    description: |
      Led a team of **10** to build a **Flutter (Dart)** app integrating the **Santander Cycle API** and **Firebase**, implementing **route-optimization** to recommend the most cost-efficient journeys across London's bike-share network.
    skills:
      - dart
      - flutter
      - firebase
      - REST API
      - route optimization

  - id: 5
    title: "Burn Assistant - Medical Image Classification"
    description: |
      Built a mobile **clinical-decision support app** using **YOLOv5** to classify burn wounds (**1st - 3rd degree**) for variable skin types.
      
      Designed an **end-to-end pipeline** spanning data preprocessing, model fine-tuning, and on-device inference.
    skills:
      - python
      - yolov5
      - pytorch
      - react-native
      - medical imaging

  - id: 7
    title: "A Convolutional Neural Network Comparison for GeoGuesser"
    description: |
      Built a **visual geolocation** model that pinpoints buildings and their locations on the U of T campus from street-level imagery, using a large **custom dataset** we collected ourselves.
      
      Compared CNN architectures (ResNet18, ResNet34, VGG16) for **image classification** performance, **benchmarking** tradeoffs between model complexity and prediction quality.
    skills:
      - pytorch
      - cnn
      - resnet18
      - resnet34
      - vgg16

  - id: 8
    title: "CuraVue - Breast Cancer Detection"
    description: |
      Won 1st place at **MLH AIHacks4Good** for a mammogram diagnostic tool.
      Automated **tumour-severity analysis** using a KNN-based pipeline in Python and Flask.
    skills:
      - python
      - flask
      - scikit-learn
      - knn

# Archived Projects (not displayed)
archived:
  - id: 9
    title: "Genome-Wide Association Studies API"
    description: |
      Built an API that mapped diseases to **genetic variants** and identified **drug-discovery sites** that are now being actively used and researched.
    skills:
      - q/kdb+
      - python
      - API development

  - id: 10
    title: "Loan Approval Prediction"
    description: |
      Built a **web-app** on Flask with GCP infrastructure managed via Terraform.
      Implemented a **Random Forest** model to predict loan approvals at the db.io Tech Hackathon.
    skills:
      - flask
      - gcp
      - terraform
      - random forest

  - id: 11
    title: "London Property Marketplace"
    description: |
      Developed a property listing interface for London real estate.
      Optimised **search filters** and **map integration** for user convenience.
    skills:
      - java

  - id: 12
    title: "Ecosystem Simulation"
    description: |
      Simulated **species dynamics** under variable environmental conditions.
      Analysed population behaviours using agent-based models.
    skills:
      - java

  - id: 13
    title: "Vehicular Football (Rocket League)"
    description: |
      Engineered real-world **robotic gameplay** using C++, Arduino, and CAD designs.
      Merged video game mechanics with physical vehicle control.
    skills:
      - c++
      - arduino
      - cad design

---
