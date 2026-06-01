---
title: Learning Graph
description: Learning graph for the Forensic Science intelligent textbook — 258 concepts across 14 taxonomy categories and 15 chapters
---

# Learning Graph for Forensic Science

[Open Learning Graph Viewer Fullscreen](../sims/graph-viewer/main.html){ .md-button .md-button--primary }

<iframe src="../sims/graph-viewer/main.html" width="100%" height="600px" frameborder="0" scrolling="no"></iframe>

This section contains the learning graph for the Forensic Science intelligent textbook.
A learning graph is a graph of concepts used in this textbook.
Each concept is represented by a node in a network graph.
Concepts are connected by directed edges that indicate what concepts each node
depends on before that concept can be understood by the student.

A learning graph is the foundational data structure for intelligent textbooks
that can recommend learning paths.
A learning graph is like a roadmap of concepts to help students arrive at their learning goals.

At the left of the learning graph are prerequisite or foundational concepts.
They have no outbound edges — only inbound edges from other concepts that depend on them.
At the far right we have the most advanced concepts in the course.
To master these concepts you must understand all the concepts that they point to.

## Summary Statistics

- **Total Concepts**: 258
- **Taxonomy Categories**: 14 (corresponding to 15 chapters — Ch. 11 and Ch. 12 split)
- **Foundational Concepts** (no prerequisites): 3
- **Total Dependency Edges**: 322
- **Maximum Learning Path Length**: 14 concepts
- **Valid DAG**: ✅ No cycles detected

## Course Description

We use the [Course Description](../course-description.md) as
the source document for the concepts that are included in this course.
The course description uses the 2001 Bloom taxonomy to order learning objectives.

## List of Concepts

We use generative AI to convert the course description into a [Concept List](./concept-list.md).
Each concept is in the form of a short Title Case label with most labels under 32 characters long.
The 258 concepts span all 15 chapters across 6 thematic modules.

## Concept Dependency List

We use generative AI to create a Directed Acyclic Graph (DAG).
DAGs do not have cycles where concepts depend on themselves.
We provide the DAG in two formats:

- A [CSV file](learning-graph.csv) with columns: ConceptID, ConceptLabel, Dependencies (pipe-delimited), TaxonomyID
- A [JSON file](learning-graph.json) that uses the vis-network JavaScript library format

The vis-network format uses `nodes`, `edges`, `groups`, and `metadata` elements
with edges containing `from` and `to` properties.

## Analysis & Documentation

### Course Description Quality Assessment

This report rates the overall quality of the course description for the purpose of generating a learning graph.

- Quality score: **94 / 100** ✅
- Verified complete Bloom's Taxonomy coverage (all six levels)
- All required fields present: title, audience, prerequisites, outcomes

[View the Course Description Quality Assessment](course-description-assessment.md)

### Learning Graph Quality Validation

This report gives you an overall assessment of the quality of the learning graph.
It uses graph algorithms to look for specific quality patterns in the graph.

- Graph structure validation — all 258 concepts connected in a single component
- DAG validation — no cycles detected ✅
- 3 foundational entry-point concepts
- Average dependencies per concept: 1.26
- Maximum dependency chain: 14 steps

[View the Learning Graph Quality Validation](quality-metrics.md)

### Concept Taxonomy

In order to see patterns in the learning graph, it is useful to assign colors
to each concept based on the concept type.
This textbook uses 14 pedagogically-aligned taxonomy categories:

- 14 categories corresponding to the 15 course chapters
- All categories between 5.8% and 10.9% — well within the 30% maximum threshold
- Clear 3–6 letter abbreviations (FOUND, CSI, PRINTS, TRACE, SERO, BPA, DNA, CHEM, FIRE, ANTHRO, ENTOM, ARMS, DOCX, DIGIT)

[View the Concept Taxonomy](concept-taxonomy.md)

### Taxonomy Distribution

This report shows how many concepts fit into each category of the taxonomy.

- Statistical breakdown by category
- Detailed concept listing per category
- Visual distribution chart
- Balance verification — no category exceeds 30%

[View the Taxonomy Distribution Report](./taxonomy-distribution.md)
