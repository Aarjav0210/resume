---
entries:
  - id: 0
    lab: "Singh Lab"
    location: "Providence, United States"
    timePeriod: "Sep '25 – Present"
    role: "Graduate Researcher (Under Professor Ritambhara Singh)"
    skills:
      - python
      - pytorch
      - R-GCN
      - knowledge graphs
      - LLM
      - computational biology
    description: |
      • Built a **drug repurposing framework** over a biomedical knowledge graph (**67K nodes**, **1.7M edges**, 23 relation types) integrating **DrugBank**, **DDInter**, **PharmaDB**, and **Hetionet** to prioritize drug-gene-disease hypotheses across **48 cancer types**
      
      • Implemented modified **Yen's algorithm** for relevant path retrieval, feeding structured subgraphs into **LLM** and **R-GCN-based inference**
      
      • Constructed ontological mappings between clinical trial data and **PharmaDB** to validate against Phase 1/2 trial outcomes (in collaboration with **Dr Alejandro Schaffer** at the **NIH/NCI**), evaluating with **precision@k** and **F0.5**

  - id: 3
    lab: "Self-Supervised Spatial Transcriptomics (JEPA)"
    location: "Brown University"
    timePeriod: "Mar '26 – Present"
    role: "Supervised by Professor Ying Ma"
    skills:
      - python
      - pytorch
      - transformers
      - spatial transcriptomics
      - JEPA
      - self-supervised learning
    description: |
      • Designing a **self-supervised spatial transcriptomics** framework based on **Joint-Embedding Predictive Architecture** that learns tissue representations via spatial masking in latent space
      
      • Extended **Perceiver encoder** with relational encoding for capturing spatial neighborhoods on **SpatialHuman30M** (Visium, MERFISH) data
      
      • Evaluating on cell-type annotation, spatial domain identification, and gene expression imputation against **scGPT-spatial**, **STAGATE**, and **GraphST** baselines

  - id: 1
    lab: "Neuropathology Stage Inference from snRNA-seq Data"
    location: "Brown University"
    timePeriod: "Nov '25 – Present"
    role: "Supervised by Professor Ritambhara Singh"
    skills:
      - python
      - pytorch
      - transformers
      - single-cell RNA-seq
      - scGPT
      - computational biology
    description: |
      • Training a **hierarchical transformer** on the **SEA-AD dataset** (Allen Institute) to infer Alzheimer's neuropathology stages (**Braak**, **Thal**, **CERAD**, **ADNC**) from snRNA-seq profiles across **MTG** and **A9** brain regions
      
      • Designed **donor-level attention architecture** to capture cross-cell-type and cross-region structure that flat per-cell models miss
      
      • Applying batch correction to remove donor bias, then fine-tuning **scGPT** brain-pretrained embeddings on the AD snRNA-seq dataset to capture disease-relevant biological signal

  - id: 2
    lab: "Fascicle Length Segmentation from Serial Ultrasound"
    location: "King's College London"
    timePeriod: "Sep '23 – May '24"
    role: "Supervised by Dr Letizia Gionfrida"
    skills:
      - python
      - pytorch
      - affine optical flow
      - sparse representation
      - noise2noise CNN
      - medical imaging
    description: |
      • Developed a **zero-shot Noise2Noise CNN** to automate B-mode ultrasound preprocessing, boosting **Jaccard Similarity Coefficient** accuracy by **11%**
      
      • Tracked fascicle motion using **affine optical flow** and **sparse representations**, improving temporal consistency and reducing segmentation drift
      
      • Packaged the pipeline as a **standalone tool** that replaced the existing segmentation software in use at KCL

---
