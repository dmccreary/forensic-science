# Quiz: Digital Forensics and Cyber Evidence

Test your understanding of digital evidence collection, forensic imaging, hash verification, metadata analysis, network forensics, and emerging digital investigation challenges with these questions.

---

#### 1. When responding to a live computer that is powered on, a digital forensic examiner must collect volatile data before shutting the system down. Why must volatile data be collected first?

<div class="upper-alpha" markdown>
1. Volatile data is stored on the hard drive in a temporary partition that is automatically deleted when the examiner runs forensic imaging software
2. Volatile data — including RAM contents, active network connections, running processes, and encryption keys — exists only while power is on and is permanently lost when the system is shut down
3. Collecting volatile data first is required by the Fourth Amendment to preserve the chain of custody before touching the physical hardware
4. Volatile data is encrypted with a time-limited key that expires 30 minutes after the initial incident response call
</div>

??? question "Show Answer"
    The correct answer is **B**. Volatile data exists only in temporary storage media that require continuous power to maintain their contents. RAM (random access memory) holds running processes, open files, active network connections, decrypted encryption keys, and typed passwords — all of which are permanently destroyed when power is removed. The order of volatility principle specifies that forensic examiners must collect in order from most to least volatile: RAM first, then swap/page files, running processes, network connections, then disk. Missing the volatile collection window means that critical evidence — including active encryption keys — is gone forever.

    **Concept Tested:** Volatile vs Non-Volatile Data

---

#### 2. A forensic examiner connects a suspect hard drive to a forensic workstation using a write-blocker. What is the specific function of the write-blocker, and why is it required?

<div class="upper-alpha" markdown>
1. The write-blocker compresses the drive's data to create a forensic image small enough to store on the examiner's workstation
2. The write-blocker decrypts the drive's contents so that forensic imaging software can read encrypted files
3. The write-blocker intercepts any write commands from the forensic workstation to the evidence drive, preventing any modification to the original evidence while allowing read access
4. The write-blocker verifies the chain of custody by logging every read command the examiner sends to the drive
</div>

??? question "Show Answer"
    The correct answer is **C**. A write-blocker (hardware or software) sits between the forensic workstation and the evidence drive. It passes read commands through normally but intercepts and blocks any write commands — including the automatic writes that modern operating systems generate when mounting a drive (such as updating last-accessed timestamps or creating index files). Without a write-blocker, simply connecting the drive to a computer would modify the evidence, potentially altering file timestamps, creating new files, or overwriting deleted data. This modification would compromise the forensic integrity of the evidence and could render it inadmissible.

    **Concept Tested:** Write-Blocker Hardware

---

#### 3. After creating a forensic bit-stream image of a hard drive, an examiner calculates MD5 and SHA-256 hash values of both the original drive and the image file. The hash values match. What does this match specifically verify?

<div class="upper-alpha" markdown>
1. The image file is compressed correctly and will not corrupt during long-term storage
2. The forensic imaging software is functioning normally and did not crash during the imaging process
3. The bit-stream image is a mathematically verified exact duplicate of every bit on the original drive — any single bit difference would produce a completely different hash value
4. The drive does not contain encrypted files, since encrypted data produces hash values that do not match the original
</div>

??? question "Show Answer"
    The correct answer is **C**. Cryptographic hash functions (MD5, SHA-256) generate a fixed-length digest uniquely determined by every bit of the input data. The avalanche property means a single bit change anywhere in the input produces a completely different hash output. When the hash of the original drive matches the hash of the image, it is mathematical proof that every bit in the image is identical to every bit on the original drive. This is the foundation of forensic image authentication — any subsequent modification to the image would immediately produce a hash mismatch, revealing tampering.

    **Concept Tested:** Hash Verification

---

#### 4. A digital photograph submitted as evidence contains EXIF metadata showing the camera make and model, the date and time the photo was taken, and GPS coordinates. What does the GPS coordinate data specifically allow investigators to determine?

<div class="upper-alpha" markdown>
1. The GPS data shows the route the photographer traveled, since cameras continuously log location between photos
2. The GPS data provides the precise geographic location where the photograph was taken when the camera's GPS was enabled, which can corroborate or contradict a suspect's claimed alibi
3. The GPS data identifies the cellular tower used to upload the photograph to social media, establishing the device's carrier
4. The GPS data is always encrypted and requires a court order to decrypt, so it cannot be read during standard forensic examination
</div>

??? question "Show Answer"
    The correct answer is **B**. EXIF (Exchangeable Image File Format) metadata is embedded in digital photographs and can include GPS coordinates — latitude, longitude, and sometimes altitude — showing precisely where the photo was taken. When a suspect claims to have been at one location and a photograph's EXIF GPS data places the device at a different location at the same time, this creates direct evidentiary conflict. Investigators must verify that the camera's clock was correctly set and that GPS was enabled. Many smartphones automatically embed GPS in every photograph unless location services are specifically disabled.

    **Concept Tested:** EXIF Metadata Recovery

---

#### 5. An investigator is analyzing server logs from a data breach. The logs capture the attacker's source IP address. Why is an IP address alone typically insufficient to identify the specific individual who committed the crime?

<div class="upper-alpha" markdown>
1. IP addresses are encrypted during transmission, so logs only capture placeholder values rather than real addresses
2. IP addresses identify network connection points — not individual people; multiple users share IP addresses, and attackers use proxies, VPNs, or compromised systems to mask their true origin
3. IP address logs are automatically deleted from server memory within 24 hours, making them unavailable for investigation
4. IP addresses only identify the internet service provider, and ISPs are legally prohibited from sharing any customer information with law enforcement
</div>

??? question "Show Answer"
    The correct answer is **B**. An IP address identifies a network connection point, not a specific individual. Multiple users may share the same IP address through NAT on a home router or a shared wireless hotspot. Sophisticated attackers use VPNs, proxy servers, the Tor network, or previously compromised machines to route attacks through multiple intermediate systems. Even if an IP address is traced to a physical location, proving that a specific individual at that location made the connection requires additional evidence — login credentials, device fingerprints, witness accounts, or corroborating digital evidence on the suspect's own devices.

    **Concept Tested:** IP Address Analysis

---

#### 6. Investigators discover that a suspect used steganography to conceal data. What is steganography, and how does it differ from encryption?

<div class="upper-alpha" markdown>
1. Steganography uses mathematical algorithms to scramble data so it cannot be read; encryption hides data inside innocent-looking files to prevent detection
2. Steganography hides the existence of data by concealing it within ordinary-looking files such as images or audio; encryption scrambles data so it cannot be read but does not hide the fact that hidden data exists
3. Steganography and encryption are identical techniques that use the same mathematical operations but apply them to different file types
4. Steganography is the forensic process of recovering deleted files; encryption is the process of verifying that recovered files are authentic
</div>

??? question "Show Answer"
    The correct answer is **B**. Steganography (from Greek, meaning "covered writing") hides data within apparently innocent carrier files — a message can be concealed in the least significant bits of an image's pixel data, producing no visible change to the image. The goal is to hide the existence of the hidden message entirely. Encryption, by contrast, scrambles data into an unreadable form but makes no attempt to hide that encrypted data exists. A forensic investigator can see an encrypted file but cannot read it; a steganographically concealed message may not be detected at all without specific steganalysis tools.

    **Concept Tested:** Steganography

---

#### 7. During a digital forensics investigation, an examiner discovers the suspect communicated using the Tor network and accessed .onion websites. What specific challenge does Tor present for digital forensic investigators?

<div class="upper-alpha" markdown>
1. Tor encrypts all messages with a key unique to each user, and this key is required to read any .onion communications — without the key, all messages are permanently unreadable
2. Tor routes traffic through multiple volunteer relay nodes with layered encryption, obscuring the originating IP address and making it extremely difficult to trace communications back to the suspect's device
3. Tor is a private network accessible only to law enforcement and government agencies, so evidence from .onion sites is classified and cannot be introduced in civilian courts
4. Tor communications are automatically wiped from all relay nodes every 24 hours, making any traffic older than one day completely unrecoverable
</div>

??? question "Show Answer"
    The correct answer is **B**. The Tor (The Onion Router) network routes internet traffic through a series of volunteer-operated relay nodes, with each node knowing only the previous and next hop — no single node knows both the origin and destination. Traffic is encrypted in multiple layers (hence "onion"), with each node stripping one layer of encryption. This design makes tracing communications to the originating IP address extremely difficult, typically requiring compromising multiple relay nodes simultaneously, exploiting technical vulnerabilities in the Tor browser, or using traditional investigative methods to identify the user through non-Tor activity.

    **Concept Tested:** Dark Web Evidence

---

#### 8. A forensic examiner investigating a solid-state drive (SSD) finds that many recently deleted files are unrecoverable. Why does the TRIM command complicate data recovery on SSDs compared to traditional hard disk drives?

<div class="upper-alpha" markdown>
1. TRIM causes SSDs to encrypt deleted files automatically, requiring the decryption key before any recovery is possible
2. TRIM tells the SSD controller to proactively wipe the storage cells of deleted files before new data is written — destroying the data that traditional recovery techniques depend on finding in unallocated space
3. TRIM causes the SSD to fragment files into millions of small pieces stored across different chips, making reassembly computationally impossible
4. TRIM locks the SSD with a hardware password when the computer is shut down, preventing forensic imaging without the manufacturer's unlock code
</div>

??? question "Show Answer"
    The correct answer is **B**. On traditional HDDs, deleting a file only marks the space as available — actual data remains in unallocated space until overwritten, allowing recovery with standard tools. SSDs use TRIM to optimize performance: when the operating system deletes a file, TRIM signals the SSD controller to proactively erase those cells in the background. This means deleted data on a TRIM-enabled SSD is often permanently overwritten before any forensic examination occurs. The window for data recovery is far shorter than with HDDs, and some data may be irrecoverable moments after deletion.

    **Concept Tested:** SSD Forensics

---

#### 9. A defense attorney argues that digital file timestamps cannot reliably prove when a document was created because timestamps can be altered. Which forensic finding most directly supports this challenge?

<div class="upper-alpha" markdown>
1. Timestamps are always reliable because they are digitally signed by the operating system's cryptographic security module at the moment of creation
2. File system timestamps can be deliberately altered using freely available timestomping tools, or can change unintentionally when files are copied, transferred, or the system clock is incorrect — making timestamp analysis a supporting indicator rather than standalone proof
3. Timestamps are embedded in the file's binary content and cannot be altered without also changing the file's hash value, making any alteration immediately detectable
4. Timestamps are set by internet service provider time servers and are independently verified and immune to local manipulation
</div>

??? question "Show Answer"
    The correct answer is **B**. File system timestamps (created, modified, accessed) can be deliberately altered through timestomping — setting timestamps to arbitrary values using readily available tools. They also change unintentionally during normal file operations: copying a file often updates the creation timestamp; accessing a file may update the last-accessed timestamp; transferring files between file systems can alter all timestamps. Reliable digital timestamp analysis requires corroborating multiple independent sources — file system metadata, internal document metadata, server logs, email headers, and backup records — rather than relying on a single timestamp value.

    **Concept Tested:** Digital Timestamp Analysis

---

#### 10. A defense attorney challenges the admissibility of digital forensic evidence under the Daubert standard, arguing that the analysis methods used are not scientifically validated. Which aspect of Daubert is most relevant to evaluating whether a digital forensic methodology is admissible?

<div class="upper-alpha" markdown>
1. Daubert only applies to physical scientific evidence like DNA; digital evidence is evaluated under the Frye "general acceptance" standard in all federal jurisdictions
2. Under Daubert, digital forensic methods must have been tested and subject to peer review, have known error rates, and be generally accepted in the digital forensics community — methods relying on untested or proprietary tools with undisclosed error rates may be challenged
3. Daubert requires that digital forensic examiners hold a specific federal certification issued by the FBI, without which their testimony is automatically excluded
4. Daubert's criteria do not apply to digital forensics because digital evidence is considered documentary evidence, not scientific testimony, evaluated under standard hearsay rules
</div>

??? question "Show Answer"
    The correct answer is **B**. Daubert v. Merrell Dow Pharmaceuticals (1993) established criteria for evaluating scientific expert testimony: the methodology must have been tested, subject to peer review and publication, have known or knowable error rates, and be generally accepted in the relevant scientific community. These criteria apply to digital forensics when the examiner offers methodology-based opinions. Challenges arise with proprietary forensic software whose algorithms are not publicly disclosed, newer techniques lacking published validation studies, or examiners who cannot articulate the error rates of their tools — all of which defense counsel may legitimately challenge under Daubert.

    **Concept Tested:** Digital Evidence Admissibility

---
