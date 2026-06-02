---
title: Social Media Analysis and Open-Source Intelligence
description: OSINT collection methods, platform-specific evidence, legal process requirements, geolocation from posts, deleted post recovery, social network analysis, and FRE 901 admissibility.
generated_by: claude skill chapter-content-generator
date: 2026-06-01
version: 0.08
---

# Social Media Analysis and Open-Source Intelligence

## Summary

This chapter covers the legally compliant collection, preservation, and analysis of social media evidence and open-source intelligence (OSINT). Students learn how investigators gather evidence from Facebook, Twitter/X, Instagram, and LinkedIn, including the distinction between publicly accessible content and private content that requires legal process. The three mechanisms for obtaining platform records — preservation letters, subpoenas, and court orders — are explained in terms of the scope of data each compels. Geolocation inference from post content and embedded image metadata connects back to the EXIF skills from Chapter 15. Post timestamp analysis, deleted post recovery, image metadata in social media uploads, and social network analysis (mapping communication relationships) are practical skills covered in depth. The chapter concludes with the authentication and admissibility requirements for social media evidence under Federal Rule of Evidence 901. After completing this chapter, students will be able to construct a social media evidence package and evaluate whether it meets FRE 901 authentication standards.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Social Media Forensics Overview
2. Open-Source Intelligence (OSINT)
3. Facebook Evidence Collection
4. Twitter/X Evidence Collection
5. Instagram Evidence Collection
6. LinkedIn Evidence Collection
7. Social Media Legal Process
8. Profile Data Preservation
9. Social Media Authentication
10. Geolocation from Social Posts
11. Post Timestamp Analysis
12. Deleted Post Recovery
13. Image Metadata in Social Media
14. Social Network Analysis
15. Social Media Admissibility (FRE 901)

## Prerequisites

This chapter builds on concepts from:

- [Chapter 15: Digital Forensics and Cybercrime Investigation](../15-digital-forensics/index.md)

---

!!! mascot-welcome "Welcome, Investigators!"
    ![Trace waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img"}
    People document their own lives in extraordinary detail on social media — often including information that becomes relevant to criminal investigations. Investigators do not need to find the suspect; the suspect has already published their location, their associations, their grievances, and sometimes their plans. Social media forensics and open-source intelligence turn publicly available information into court-admissible evidence. But doing it correctly — legally, reproducibly, and in a form courts will accept — requires discipline and method. Follow the evidence — right to the public record.

---

## The Scope of Social Media Evidence

Social media platforms host billions of posts, photographs, videos, and direct messages generated every day. For forensic investigators, social media evidence falls into two fundamentally different categories based on how it is obtained and what legal framework governs access:

**Publicly available content** — posts, photographs, profiles, and pages that are accessible to any internet user without authentication. This content is treated similarly to a public statement: no legal process is required to view it, and investigators may access, document, and use it. However, accessing it requires care to preserve it in a format courts will accept as authentic.

**Non-public content** — direct messages, private posts, account metadata (IP logs, login history, associated phone numbers), and content visible only to the account holder's followers. This content is protected by the Fourth Amendment and the Stored Communications Act (SCA); obtaining it requires legal process directed at the platform.

---

## Open-Source Intelligence (OSINT)

**Open-source intelligence (OSINT)** is the systematic collection and analysis of publicly available information from any unclassified source — including social media, news archives, public records, domain registration databases, image search, geospatial data (satellite imagery, street-level photography), and online forums.

OSINT principles:
- **No legal authority required** for publicly accessible sources — but the collection method must be documented
- **Attribution and verification** — OSINT findings must be verified against multiple independent sources before being relied upon, because open-source information may be manipulated, fabricated, or out of date
- **Passive vs. active collection** — passive OSINT (observation without interaction) is generally unproblematic; active collection (creating accounts, interacting with subjects) raises ethical and legal issues around deception that vary by jurisdiction

OSINT tools include automated search aggregators (Maltego, SpiderFoot), image reverse-search services (TinEye, Google Images), username lookup services, and domain WHOIS databases.

---

## Platform-Specific Evidence Collection

### Facebook Evidence Collection

**Facebook evidence collection** proceeds on three tracks depending on the privacy settings of the target content:

**Public content**: Posts, photographs, and pages with public visibility can be accessed without authentication and documented by screenshot or automated capture tools. Investigators document the full URL, the timestamp displayed on the post (which is in the user's local time zone based on platform settings), and the profile identity information visible on the profile page.

**Friend-only content**: Content visible only to the account holder's Facebook friends is not accessible through public viewing. Investigators may not create fake accounts to "friend" a suspect for the purpose of accessing this content — this constitutes a deceptive investigative practice regulated by platform terms of service and, in undercover contexts, by department policy.

**Preserved records and account data**: Facebook's full account data — including private messages, deleted posts (within the platform's retention window), login IP addresses, device information, and complete post history — is available only through legal process. Facebook's Law Enforcement Online Request System (LORS) accepts preservation requests and legal process from law enforcement.

### Twitter/X Evidence Collection

**Twitter/X evidence collection** relies heavily on the platform's public API and its public post index. Public tweets (posts) are indexed by search engines and accessible without authentication. Twitter's Law Enforcement Guidelines describe the process for requesting non-public account information (direct messages, IP logs, device identifiers).

Key forensic notes for Twitter/X:
- **Tweet IDs**: every tweet has a unique numerical ID that is stable and can be used to retrieve a specific post — more reliable than URL-based references, which can change
- **Deleted tweets**: once a user deletes a tweet, it disappears from the platform; recovering deleted tweets requires either a preservation request made *before* deletion, archival services (Wayback Machine, academic Twitter archives), or legal process for platform-retained records
- **Quote tweets and replies**: the thread structure of Twitter conversations may reconstruct content that was part of a conversation even when individual posts have been deleted

### Instagram Evidence Collection

**Instagram evidence collection** focuses primarily on photographs, videos, and Stories (ephemeral content that expires after 24 hours). Instagram is particularly valuable for:

- **Geolocation**: Instagram posts frequently include location tags (named places) and may embed EXIF GPS coordinates in uploaded images (though Instagram strips EXIF from displayed images, the original upload may be recoverable through legal process)
- **Timestamps**: post publication timestamps are displayed in relative time ("3 hours ago") on the interface but absolute timestamps are available in API responses and legal process responses
- **Stories**: Stories expire after 24 hours and cannot be accessed publicly after that window — time-sensitive preservation is critical

Instagram (owned by Meta) uses the same LORS system as Facebook for law enforcement requests.

### LinkedIn Evidence Collection

**LinkedIn evidence collection** is primarily relevant in cases involving corporate fraud, insider trading, professional identity fraud, and targeted social engineering attacks. LinkedIn profiles include employment history, professional connections, and endorsements that can establish professional relationships and access to confidential information. LinkedIn's privacy settings mean that many profile sections are accessible only to logged-in users; access to private account data requires legal process.

---

## Social Media Legal Process

Three distinct legal mechanisms govern compelled disclosure of non-public social media records in the United States.

### Preservation Letters

A **preservation letter** (also called a preservation request) is sent to a platform requesting that it immediately preserve specified account data — freezing it in place so it cannot be deleted or overwritten — pending the issuance of formal legal process. Preservation letters are typically sent under 18 U.S.C. § 2703(f) and do not require a court order; they are administrative requests that major platforms are obligated to honor. Platforms typically preserve data for 90 days, renewable on request.

**Why preservation letters matter**: social media users frequently delete incriminating posts when they learn they are under investigation. A preservation letter, sent as soon as the platform account is identified, prevents this evidence destruction without requiring the investigator to have completed the full probable cause showing needed for a warrant.

### Subpoenas

A **subpoena** (specifically a grand jury subpoena or administrative subpoena, depending on the type of investigation) can compel platforms to produce **non-content records** — subscriber information (account name, email address, phone number, registration date) and **transactional records** (login history, IP addresses, access logs). Subpoenas do not require a showing of probable cause; the legal threshold is relevance to an investigation.

Subpoenas cannot compel the production of **content** — the text of private messages or posts. Content requires a higher level of process.

### Court Orders

A **court order** under 18 U.S.C. § 2703(d) (a "D order") can compel production of both transactional records and certain non-content account information when the government shows "specific and articulable facts" that the records are relevant to a criminal investigation. D orders provide a middle ground between subpoenas and warrants.

A **search warrant** based on probable cause is required to compel production of the **content** of private communications — the text of direct messages, private posts, and account content. The warrant must specifically identify the account and the information sought, and must be issued by a court with jurisdiction over the offense being investigated.

!!! mascot-tip "Investigator Tip"
    ![Trace holding magnifying glass](../../img/mascot/tip.png){ class="mascot-admonition-img"}
    Platform response times to legal process vary dramatically — from days (in emergency situations involving imminent danger) to months (for routine requests handled through standard queues). The most common investigative mistake is waiting too long to send a preservation letter. Send the preservation letter the moment the relevant account is identified, even if obtaining the warrant or subpoena will take weeks. A preserved account can be accessed later; a deleted account cannot be reconstructed.

---

## Geolocation, Timestamps, and Deleted Content

### Geolocation from Social Posts

**Geolocation from social posts** can place a suspect or victim at a specific location at a specific time through two mechanisms:

**Explicit location data**: Some posts include tagged locations (named places clicked from the platform's location menu), GPS coordinates embedded in metadata, or visible landmarks in photographs that can be identified through imagery analysis.

**Implicit geolocation**: Background elements in photographs — street signs, storefronts, utility infrastructure, vegetation, architectural styles — can be matched against street-level imagery (Google Street View, Bing Maps) or satellite imagery to identify a location without explicit geotags. This technique, sometimes called **geolocating by context**, has been used to locate photographers to within a single city block from publicly posted photos with no location tags.

### Post Timestamp Analysis

**Post timestamp analysis** extracts and verifies the temporal record embedded in social media activity. Timestamps from social media posts typically reflect:

- The date and time the post was published (displayed on the platform)
- The time zone settings of the posting user's device or account settings
- Embedded EXIF timestamps in uploaded photographs (which record the camera's internal clock at time of capture — independent of when the photo was uploaded)

Two timestamps are forensically distinct: the **capture time** (when the photograph was taken, embedded in EXIF) and the **upload time** (when the post was published on the platform). A photograph taken days before a crime and posted on the day of the crime provides no location alibi for the crime date; conversely, a photograph with a capture timestamp during the crime provides significant location evidence.

### Deleted Post Recovery

**Deleted post recovery** depends on the timing of deletion relative to preservation and archiving actions. Once a user deletes a post, several sources may still contain copies:

- **Platform backend** (within retention window): platforms retain deleted content for a period (Facebook retains deleted content for up to 90 days). A preservation request made before the retention window expires can secure the deleted content for subsequent legal process
- **Web archives**: the Internet Archive's Wayback Machine crawls and archives public web pages including some social media profiles. Cached versions of public posts may persist in web archives
- **Third-party reposting and screenshots**: content that was shared, quoted, or screenshotted by other users before deletion may persist on the accounts of those other users
- **Search engine caches**: Google and other search engines cache indexed pages; recently deleted public posts may still appear in cached versions accessible through the search engine

---

## Image Metadata in Social Media

**Image metadata in social media** refers to both the EXIF metadata embedded in the original photograph and the processing metadata added by the platform during upload and processing.

When a user uploads a photo to most social media platforms, the platform strips the EXIF metadata from the publicly displayed version of the image (for user privacy reasons). However:

- The platform's backend may retain the original unstripped EXIF data and may produce it in response to legal process
- The display timestamp on the post is the upload time, not the EXIF capture time — these may differ by hours or years
- Compression artifacts introduced by the platform's image processing may help or hinder subsequent image forensic analysis

When EXIF GPS data is available (through legal process), it provides the precise location of the camera at capture time — independent of any location tag the user may have added or omitted.

---

## Social Network Analysis

**Social network analysis** maps the communication relationships between individuals based on their social media connections, mentions, tags, and direct interactions. Rather than analyzing what was said, social network analysis asks: **who communicates with whom, how frequently, and through what network structure?**

The output of social network analysis is a **graph** where:
- **Nodes** represent accounts or individuals
- **Edges** represent communication relationships (mutual follows, direct messages, mentions, tags)
- **Edge weight** may represent communication frequency or recency

Key metrics used in forensic social network analysis:

- **Degree centrality**: how many connections an individual has — high-degree nodes may be communication hubs in criminal networks
- **Betweenness centrality**: how often an individual appears on the shortest path between other pairs — high betweenness nodes are brokers who connect otherwise separate clusters
- **Clustering coefficient**: how interconnected an individual's connections are with each other — dense clusters suggest tight-knit groups
- **Community detection**: algorithmic identification of subgroups with more internal connections than external connections — may identify cells or sub-organizations within a criminal network

Social network analysis is used to identify the organizational structure of criminal networks, locate leaders (high centrality), identify peripheral members (low degree, connected through a single high-betweenness node), and find previously unknown associates.

#### Diagram: Social Network Analysis Graph Explorer

<iframe src="../../sims/social-network-analysis/main.html" width="100%" height="520px" scrolling="no"></iframe>

<details markdown="1">
<summary>Social Network Analysis Graph Explorer MicroSim</summary>
Type: microsim
**sim-id:** social-network-analysis<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Analyze a social network graph to identify hub nodes, broker nodes, and communication clusters relevant to a criminal investigation (Bloom Level 4 — Analyze; verb: analyze).

Bloom Level: Analyze (L4)
Bloom Verb: Analyze

Canvas layout:
- Full canvas: Force-directed graph visualization with labeled nodes
- Control panel at bottom: metric selection and filtering

Visual elements:
- Nodes representing 15–20 simulated accounts (labeled with fake names)
- Edges representing communication relationships with variable thickness based on frequency
- Node color coding: suspect accounts in red, known associates in orange, peripheral contacts in gray
- Node size proportional to selected centrality metric

Interactive controls:
- Dropdown: "Color by" — Degree Centrality / Betweenness Centrality / Clustering Coefficient
- Dropdown: "Size by" — same options
- Slider: "Minimum connections" — filters out nodes below a threshold
- Click any node: displays name, degree, betweenness score, and list of connected accounts
- "Highlight clusters" button — runs community detection and colors clusters differently
- "Show shortest path" — click two nodes to highlight the shortest path between them

Data Visibility Requirements:
- Show centrality scores in the node detail panel
- Show the number of distinct communication clusters identified
- Show the top 3 "broker" nodes by betweenness centrality in a summary panel

Instructional Rationale: An Analyze-level objective (identify structure and key actors in a network) requires active manipulation of the graph — filtering, selecting metrics, and discovering structure through interaction rather than passive reading.

Color scheme: Dark background, blue edges, node colors by role/metric, white labels, orange path highlighting.
</details>

---

## Authentication and Admissibility

### Profile Data Preservation

**Profile data preservation** is the process of capturing social media evidence in a form that meets evidentiary standards. A screenshot alone is generally insufficient — it shows what someone claims the post looked like, but does not independently verify that the post existed at the URL shown, that the account is who it claims to be, or that the content has not been altered.

Best practices for profile data preservation:

1. **Full-page capture tools**: use browser-based tools (HTTrack, ArchiveBox, or court-accepted commercial tools like Page Vault, X1 Social Discovery) that capture the full page including HTML source, embedded images, timestamps, and profile metadata in a verifiable format
2. **Hash the capture**: compute and record a cryptographic hash of the saved files at the time of capture — establishing that the preserved copy has not been altered
3. **Document metadata**: record the URL, time and date of capture (in UTC), the investigator's identity, and the tool used
4. **Capture the profile page separately**: always document the profile page (showing account creation date, profile name, profile picture) alongside the post itself

### Social Media Authentication (FRE 901)

For social media evidence to be admitted in court, it must be **authenticated** under **Federal Rule of Evidence 901** — the proponent must produce evidence sufficient to support a finding that the item is what the proponent claims it is.

Authentication of social media evidence is more complex than it may appear, because:
- Anyone can create a social media account with another person's name and photo
- Posts can be edited or fabricated in a photo editor
- Screenshots provide no inherent proof of source

Authentication methods that courts have accepted:
- **Testimony of the account owner** (usually not available in criminal cases)
- **IP address and login records** correlating account activity to the defendant's device or residence (obtained through legal process)
- **Corroborating circumstantial evidence**: content of posts references information only the defendant would know; posts describe events that match other evidence; the communication style and vocabulary match other known writings of the defendant
- **Certified records from the platform**: records produced by the platform in response to legal process carry the platform's certification of authenticity, significantly strengthening the authentication foundation

Courts have increasingly accepted properly documented preservation captures authenticated by IP address records as sufficient foundation for admissibility.

!!! mascot-thinking "What Does the Data Tell Us?"
    ![Trace peering through magnifying glass](../../img/mascot/thinking.png){ class="mascot-admonition-img"}
    A social media post from an account named "John Smith" is not automatically evidence against a defendant named John Smith. The foundational question is: did the defendant author this post? That question can be answered by correlating the post's login IP address with the defendant's internet service records, by content that only the defendant could have known, or by platform-certified records linking the account to the defendant's phone number or email. Lazy authentication — presenting a screenshot and saying "it has his name on it" — is exactly the kind of weak foundation that defense attorneys successfully challenge.

---

## Key Concepts Review

The following table summarizes the major concepts from this chapter:

| Concept | Definition |
|---|---|
| OSINT | Open-Source Intelligence; collection of publicly available information without legal compulsion |
| Social Media Legal Process | Preservation letters → subpoenas (subscriber/transactional data) → warrants (content) |
| Preservation Letters | Administrative request to freeze account data before formal legal process is complete |
| Subpoena | Compels subscriber and transactional data (not content) from platforms |
| Search Warrant | Required for content of private communications; must show probable cause |
| Geolocation from Posts | Explicit tags or implicit landmark identification place poster at specific location |
| Post Timestamp | Upload time ≠ capture time; EXIF timestamp records when photograph was taken |
| Deleted Post Recovery | Platform backend (within retention), web archives, search engine cache, reposts |
| Image Metadata | EXIF stripped by platforms at display; original may be available through legal process |
| Social Network Analysis | Graph analysis of communication relationships; identifies hubs, brokers, and clusters |
| Profile Data Preservation | Full-page capture with hash verification; screenshot alone is insufficient |
| FRE 901 Authentication | Proponent must show the evidence is what they claim; IP records + platform certification |

---

??? question "Challenge: Authentication Problem"
    A prosecutor wants to introduce a series of Facebook posts as evidence that the defendant planned a robbery. The posts, captured by an investigator's screenshot, show an account with the defendant's name and photograph discussing a plan that matches the details of the robbery. The defendant denies authorship and claims the account is a fake created by someone else.

    **What authentication evidence is needed to admit these posts? How would you gather it?**

    **Answer:** Screenshot evidence alone is insufficient. To authenticate these posts under FRE 901, the prosecution needs to establish that the defendant authored the account — not just that the account bears his name and photo.

    Required authentication evidence: (1) **Platform records via search warrant**: subpoena/warrant to Facebook requesting the account's registration information (email address, phone number used to create the account), complete login history with IP addresses, and account activity logs. (2) **IP address correlation**: take the login IP addresses from the Facebook records and subpoena the corresponding ISP to identify the subscriber — demonstrating that the account was logged into from the defendant's home internet connection or device. (3) **Device correlation**: if the defendant's phone was seized, examine it for the Facebook app, its account credentials, and any locally cached content from the account. (4) **Content corroboration**: demonstrate that posts contain information (details of a meeting, insider knowledge, location details) that only the defendant would have known — circumstantially corroborating authorship. Together, these four layers establish a reliable foundation that the court can use to find the account is what the prosecution claims it is.

---

!!! mascot-celebration "Case Closed — For Now"
    ![Trace raising magnifying glass in celebration](../../img/mascot/celebration.png){ class="mascot-admonition-img"}
    You have followed the evidence from the crime scene to the digital cloud — from fingerprints and bloodstains to metadata and social network graphs. Social media forensics brings together everything this course has taught: disciplined collection, verified integrity, legal authority, and rigorous authentication before presenting conclusions in court. The work of a forensic investigator is never truly done — technology changes, standards evolve, and new evidence types emerge. But the foundation remains constant: every conclusion must be supported by evidence, every method must be defensible, and every piece of evidence must be handled with care from the moment it is found. Follow the evidence — always.
