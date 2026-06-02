---
title: Social Network Analysis Graph Explorer
description: Analyze a simulated communication network to identify hub accounts, broker accounts, and communication clusters using centrality metrics, filtering, community detection, and shortest-path tracing (Bloom L4 — Analyze).
status: built
library: p5.js
bloom_level: Analyze (L4) — identify hub nodes, broker nodes, and communication clusters in a social network graph.
quality_score: 98
image: /sims/social-network-analysis/social-network-analysis.png
og:image: /sims/social-network-analysis/social-network-analysis.png
twitter:image: /sims/social-network-analysis/social-network-analysis.png
social:
   cards: false
---

# Social Network Analysis Graph Explorer

<iframe src="main.html" width="100%" height="602" scrolling="no"></iframe>

[Run the Social Network Analysis Explorer Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

When investigators seize phones or pull records from a messaging platform, they
get a **network**: who talked to whom, and how often. The hard part is not
collecting it — it's **reading the structure**. Which account is the ringleader?
Who quietly connects two otherwise separate groups? How many distinct circles are
there?

This MicroSim gives you a simulated network of **16 accounts** and **24
communication links**. You decide which **centrality metric** drives the color and
size of each account, filter out the noise, run **community detection**, and trace
the **shortest path** between any two people — the same moves an analyst makes to
turn a tangle of contacts into a story.

## How to Use It

1. **Color by / Size by:** Use the two dropdowns to map a metric onto each node's
   color and size:
    - **Degree centrality** — how many accounts this one talks to (finds **hubs**).
    - **Betweenness** — how often this account sits on the shortest path between
      others (finds **brokers** who bridge groups).
    - **Clustering coefficient** — how tightly this account's contacts know each
      other.
2. **Minimum connections:** Drag the slider up to hide weakly connected accounts and
   focus on the core of the network.
3. **Click any account** to open the **Account Detail** panel: its role, degree,
   betweenness, clustering coefficient, and the list of accounts it talks to.
4. **Highlight clusters:** Press this to run community detection. The network recolors
   into its distinct communication clusters.
5. **Shortest path:** Press this, then click **two** accounts. The shortest chain of
   messages between them lights up in orange.
6. **Drag** any node to untangle the layout. **Reset** restores the defaults.

The right panel always shows the number of clusters detected and the **top three
broker accounts** by betweenness.

## What You Can Learn

- Tell a **hub** (many direct contacts) apart from a **broker** (the only link
  between groups) — and why both matter to an investigation.
- Use centrality metrics to rank accounts instead of guessing from the picture.
- See how **community detection** reveals separate circles inside one network.
- Trace how a message could travel from one person to another.

You can embed this MicroSim on your own web page with this iframe:

```html
<iframe src="https://dmccreary.github.io/forensic-science/sims/social-network-analysis/main.html"
        width="100%" height="602" scrolling="no"></iframe>
```

## Lesson Plan

**Audience:** High-school forensic science (grades 9–12)
**Time:** 10–15 minutes
**Bloom level:** Analyze (L4) — analyze.

**Worked example.** Set **Size by → Betweenness**. Notice that the largest nodes are
**not** the same as the ones with the most lines — the brokers (look at the top three
in the summary panel) hold the network together even though they may have only a few
connections. Now press **Highlight clusters** and watch the same brokers sit on the
seams between colored groups.

**Guided questions:**

- Which account has the **highest degree**? Which has the **highest betweenness**? Are
  they the same account? What does it mean if they are different?
- How many communication **clusters** does the network split into? Which accounts act
  as the bridges between them?
- Use **Shortest path** to connect two accounts in different clusters. Whose account
  does the message have to pass through?
- If you could surveil only **one** account to learn the most about the whole network,
  which would you choose — a hub or a broker — and why?

**Extension.** Raise the **Minimum connections** slider one step at a time. Which
accounts disappear first, and which survive? Explain why an account with a low degree
can still be the most important node in the network.

## References

- [Social network analysis (Wikipedia)](https://en.wikipedia.org/wiki/Social_network_analysis) — methods for studying network structure.
- [Centrality (Wikipedia)](https://en.wikipedia.org/wiki/Centrality) — degree, betweenness, and other measures of node importance.
- [Betweenness centrality (Wikipedia)](https://en.wikipedia.org/wiki/Betweenness_centrality) — the metric that identifies broker nodes.
- [Girvan–Newman algorithm (Wikipedia)](https://en.wikipedia.org/wiki/Girvan%E2%80%93Newman_algorithm) — the community-detection method used here.
- [p5.js reference](https://p5js.org/reference/) — the library used to build this simulation.

## Specification

This MicroSim was generated from a specification in
[Chapter 18: Social Media Analysis and Open-Source Intelligence](../../chapters/18-social-media-osint/index.md).

> **Design note:** the accounts, names, and messages are **fictional** and the layout
> is produced by a force-directed algorithm, so node positions may differ slightly each
> time the page loads. Centrality scores, cluster assignments, and shortest paths are
> computed live from the network data.
