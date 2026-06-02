# Quiz: Social Media Analysis and Open-Source Intelligence

Test your understanding of OSINT methods, platform-specific evidence collection, legal process requirements, geolocation from posts, deleted post recovery, social network analysis, and FRE 901 authentication with these questions.

---

#### 1. An investigator wants to document publicly posted social media content as evidence without notifying the account holder. Under what legal authority can investigators access publicly visible social media posts, and what specific preservation steps are required?

<div class="upper-alpha" markdown>
1. Investigators require a court order to access any social media content, even public posts, because viewing someone's profile constitutes a search under the Fourth Amendment
2. Publicly visible posts are accessible to any internet user without legal process, and investigators may access and document them — but the capture must use full-page documentation with metadata, URL, capture timestamp, and hash verification rather than a screenshot alone
3. Investigators can access public posts without legal process, and a screenshot is legally sufficient authentication for court because public posts have no privacy expectation
4. Public social media posts can only be accessed after the account holder is notified, because the Electronic Communications Privacy Act requires prior notice for any government access to electronic communications
</div>

??? question "Show Answer"
    The correct answer is **B**. Publicly visible social media content — posts, photographs, and pages accessible to any unauthenticated internet user — does not require legal process to access. It is treated similarly to a public statement: investigators may view and document it. However, a screenshot alone is generally insufficient for court because it can be edited or fabricated. Proper preservation requires full-page capture tools that save the HTML source, embedded images, timestamps, and profile metadata, along with hash verification of the saved files, the capture URL, the UTC date and time of capture, and the investigator's identity. This documentation supports authentication under FRE 901.

    **Concept Tested:** Open-Source Intelligence (OSINT)

---

#### 2. An investigator identifies a Facebook account potentially linked to a suspect but needs to access the account's private direct messages. Which legal mechanism is required to compel Facebook to produce the content of those messages?

<div class="upper-alpha" markdown>
1. A preservation letter — preservation letters compel platforms to produce all account data including message content within 30 days
2. A subpoena — subpoenas compel production of all records including private message content from social media platforms
3. A search warrant based on probable cause — private message content is protected by the Fourth Amendment and the Stored Communications Act and requires a warrant to compel production from the platform
4. A court order under 18 U.S.C. § 2703(d) — a D order compels message content from platforms when investigators show that records are relevant to the investigation
</div>

??? question "Show Answer"
    The correct answer is **C**. Under the Fourth Amendment and the Stored Communications Act (SCA), the content of private electronic communications — direct messages, private posts, and similar stored content — is protected from compelled government access without a warrant supported by probable cause. A subpoena can compel non-content records (subscriber information, IP logs, account creation data). A § 2703(d) court order can compel non-content transactional records with a specific articulable facts showing. Only a search warrant supported by probable cause can compel the platform to produce the actual content of private messages. This tiered framework reflects the higher privacy expectation in private communications versus non-content metadata.

    **Concept Tested:** Social Media Legal Process

---

#### 3. An investigator discovers that a suspect deleted all their Facebook posts after learning they are being investigated. The investigation began 3 weeks ago. What is the most important action the investigator should have taken at the earliest stage to preserve this evidence?

<div class="upper-alpha" markdown>
1. Immediately obtained a search warrant to download a complete copy of the account before the suspect could delete anything
2. Sent a preservation letter to Facebook as soon as the account was identified, requesting that the platform freeze and preserve all account data pending formal legal process
3. Asked a colleague to "friend" the suspect account to copy all posts before they were deleted
4. Reported the suspect's account for terms-of-service violations so the platform would suspend it, preserving its content in suspension status
</div>

??? question "Show Answer"
    The correct answer is **B**. A preservation letter (under 18 U.S.C. § 2703(f)) is an administrative request — not requiring court approval — that directs a platform to immediately freeze and preserve specified account data for 90 days (renewable). Platforms are obligated to honor these requests. The preservation letter is the critical first step because it can be sent immediately when an account is identified, long before the probable cause showing needed for a warrant is complete. Once content is deleted and the platform's retention window expires, it is gone permanently. The most common investigative error in social media cases is waiting too long to send the preservation letter.

    **Concept Tested:** Profile Data Preservation

---

#### 4. A photograph posted on Instagram shows a suspect celebrating at what appears to be a party. There is no location tag on the post. An investigator examining the background of the photograph identifies a distinctive storefront sign, a specific utility pole configuration, and a unique mural visible through a window. What technique does this represent?

<div class="upper-alpha" markdown>
1. Explicit geolocation — the storefront sign is considered a formal location tag equivalent to a GPS coordinate
2. Implicit geolocation — identifying background environmental details and matching them to publicly available street-level imagery to determine a location without any embedded geographic metadata
3. EXIF metadata recovery — the storefront and mural details are encoded in the EXIF data of the uploaded image
4. Social network analysis — the investigator is using connections between people visible in the photo to triangulate the location
</div>

??? question "Show Answer"
    The correct answer is **B**. Implicit geolocation (sometimes called "geolocating by context") uses visible environmental details — street signs, storefronts, architectural features, utility infrastructure, vegetation, landmarks visible in backgrounds — and matches them against street-level imagery (Google Street View, Bing Maps) or satellite imagery to identify the location where a photograph was taken. This technique has successfully located photographers to within a single city block from publicly posted photos with no explicit location tags. It requires investigative skill and open-source research rather than metadata extraction, but the result — a specific identifiable location — can be as precise as GPS data.

    **Concept Tested:** Geolocation from Social Posts

---

#### 5. A social media post is submitted as evidence with a displayed timestamp of "June 1, 2026 at 8:45 PM." The photograph embedded in the post has EXIF metadata showing a capture timestamp of "May 28, 2026 at 3:20 PM." Why are these two timestamps forensically distinct, and which is more relevant to establishing alibi evidence for an offense that occurred on May 28?

<div class="upper-alpha" markdown>
1. The two timestamps are identical in evidentiary value; courts treat the display timestamp as authoritative because it is the one visible to the public
2. The display timestamp shows when the post was uploaded to the platform; the EXIF capture timestamp shows when the photograph was physically taken by the camera — the EXIF timestamp is more relevant to establishing location on May 28 because it records the device's position at the moment of capture, independent of when the photo was later posted
3. The EXIF timestamp is less reliable because it reflects the camera's internal clock, which users routinely set incorrectly
4. The two timestamps should be averaged to produce the most accurate estimate of when the photo was taken
</div>

??? question "Show Answer"
    The correct answer is **B**. Post display timestamps record when content was uploaded to the platform — a photograph taken days or months earlier can be uploaded and posted at any time, so the post timestamp does not establish where the photographer was when the photo was taken. The EXIF capture timestamp records the date and time from the camera's internal clock at the moment of capture — independent of upload time. For an offense that occurred on May 28, the EXIF timestamp placing the device (and by inference its user) at a specific GPS-tagged location at 3:20 PM on May 28 is direct location evidence for that date, regardless of when the photo was posted.

    **Concept Tested:** Post Timestamp Analysis

---

#### 6. A suspect claims they deleted incriminating tweets six months ago. An investigator searches web archives and finds a cached version of the suspect's Twitter profile including the deleted posts. What is the evidentiary significance of this archived content, and what authentication challenge does it present?

<div class="upper-alpha" markdown>
1. Archived web content has no evidentiary value because web archives are maintained by private companies, not government agencies, and cannot be authenticated as official records
2. Archived copies of deleted posts demonstrate that the content existed and was publicly accessible before deletion — but must be authenticated by showing the archive is an accurate reproduction of the original post, typically by obtaining archive metadata or corroborating with platform records
3. Archived web content is automatically authenticated under FRE 901 because web archives use cryptographic hashing to verify the integrity of all stored pages
4. Deleted post recovery is prohibited by the Computer Fraud and Abuse Act, which makes it illegal to access archived copies of content that the original author has chosen to delete
</div>

??? question "Show Answer"
    The correct answer is **B**. Web archives like the Internet Archive's Wayback Machine crawl and save snapshots of publicly accessible web pages at various points in time — including social media profiles before posts were deleted. Archived copies can demonstrate that specific content was posted and publicly visible before deletion. The authentication challenge is establishing that the archived page accurately reflects what was originally posted: investigators should document the archive URL, the crawl date, and the archive's metadata, and when possible, corroborate the archived content against any platform-produced records, reposts by other users, or other independent sources. Archive pages showing incomplete or malformed content should be treated with appropriate caution.

    **Concept Tested:** Deleted Post Recovery

---

#### 7. Investigators conduct social network analysis on a criminal organization's communication patterns and identify a person with high betweenness centrality who has relatively few direct connections. What does high betweenness centrality with few direct connections suggest about this person's role in the network?

<div class="upper-alpha" markdown>
1. High betweenness with few connections means this person is peripheral to the organization and likely uninvolved in its core activities
2. High betweenness with few direct connections identifies a broker — someone who sits on the communication paths between otherwise disconnected clusters, playing a critical coordination role even without many personal connections
3. High betweenness with few connections means this person is the leader of the organization, as leaders always communicate through intermediaries to maintain operational security
4. This combination indicates a technical error in the analysis; betweenness centrality always increases with degree centrality, so the two metrics cannot diverge significantly
</div>

??? question "Show Answer"
    The correct answer is **B**. Betweenness centrality measures how often a node appears on the shortest path between other pairs of nodes — it captures the role of information or communication broker. A person with high betweenness but relatively few direct connections occupies a structural bridge position: they connect otherwise separate clusters or cells that would have difficulty communicating without passing through them. In criminal network analysis, high-betweenness brokers are forensically significant because disrupting or flipping them can break communication between otherwise connected groups. They are distinct from high-degree hubs (who have many connections) and may not be identified through simple connection count analysis.

    **Concept Tested:** Social Network Analysis

---

#### 8. A prosecutor presents a Facebook post as evidence showing the defendant threatening the victim. The defense objects under FRE 901, arguing there is no proof the defendant personally authored the post. The post displays the defendant's name and photograph. Why is the displayed name and photo alone insufficient authentication?

<div class="upper-alpha" markdown>
1. Displayed name and photo are sufficient authentication under FRE 901 because impersonating another person on social media is a federal crime, making it reasonable to assume accounts accurately reflect their stated owners
2. Anyone can create a social media account using another person's name and photo — the displayed identity establishes nothing about who actually created and operated the account, which is the relevant question for authentication
3. FRE 901 does not apply to social media evidence because it was enacted before social media existed and has not been updated to cover digital communications
4. Displayed name and photo are sufficient if the post is from a verified account with a blue checkmark, which platforms guarantee belongs to the claimed identity
</div>

??? question "Show Answer"
    The correct answer is **B**. Creating a social media account in another person's name and photograph is trivially easy and requires no special technical skill. The identity displayed on a profile says nothing about who controls the account and who wrote its posts. Under FRE 901, the proponent must produce evidence sufficient to support a finding that the evidence is what they claim — here, that this defendant wrote these posts. Courts have required authentication beyond the display identity: IP address records showing the account was accessed from the defendant's device or address, device forensics showing the account credentials stored on the defendant's phone, or content that only the defendant could have known.

    **Concept Tested:** Social Media Authentication

---

#### 9. An investigator captures social media evidence using a professional preservation tool that records the HTML source, embedded images, URL, and capture timestamp in UTC, then computes a SHA-256 hash of the entire saved package. What specific evidentiary purpose does the hash serve?

<div class="upper-alpha" markdown>
1. The hash proves that the original post was written by the account holder rather than a third party
2. The hash creates a mathematical fingerprint of the preserved content at the moment of capture, allowing verification at any later time that the preserved evidence has not been altered since collection
3. The hash converts the social media content into a format admissible under the Federal Rules of Evidence
4. The hash is submitted to the social media platform as the authorization code confirming the investigator had legal authority to capture the page
</div>

??? question "Show Answer"
    The correct answer is **B**. Computing a cryptographic hash of the preserved evidence package at the time of collection creates a fixed mathematical fingerprint of that specific content at that specific moment. If the evidence is later challenged as having been altered — by the investigator, during storage, or in transit — the hash computed at collection can be recomputed from the current evidence package. A matching hash proves that not a single bit has changed since collection. A non-matching hash reveals that the content has been modified. This is the same principle used in forensic hard drive imaging: hash verification establishes the integrity of the preservation without relying on trust alone.

    **Concept Tested:** Profile Data Preservation

---

#### 10. An investigator uses Maltego, a commercial OSINT aggregation tool, to map a suspect's online presence across multiple platforms and databases. The tool returns a connection between the suspect's known email address and a forum account with an unusual screen name. What fundamental verification step must the investigator take before treating this connection as investigatively reliable?

<div class="upper-alpha" markdown>
1. No verification is needed because Maltego is a licensed law enforcement tool whose outputs are automatically admissible as authenticated machine records under FRE 803(6)
2. The connection must be independently corroborated — OSINT findings from automated tools may be inaccurate, out of date, or based on coincidental shared data; investigators must verify against at least one independent source before relying on the connection
3. The investigator must wait for the platform to confirm the connection through official legal process before taking any investigative action based on the Maltego output
4. Maltego connections require the suspect's consent before they can be used in an investigation because the tool aggregates personal data protected under federal privacy law
</div>

??? question "Show Answer"
    The correct answer is **B**. OSINT tools aggregate publicly available information from many sources, but automated connections may be based on coincidental shared data (a common email format, a shared username that belongs to different people, or outdated cached records). Before an OSINT-derived connection is relied upon for investigative decisions, it must be independently verified against at least one additional source — corroborating evidence from the platform itself through legal process, confirmation from a second OSINT tool using different data sources, or investigative corroboration such as content analysis demonstrating the same person operates both accounts. Acting on unverified OSINT connections risks directing investigative resources at innocent people.

    **Concept Tested:** Open-Source Intelligence (OSINT)

---
