---
title: Cell Phone Analytics and Mobile Forensics
description: SIM cards, IMEI, CDR records, cell tower triangulation, GPS extraction, app data, deleted data recovery, iOS/Android forensics, Cellebrite UFED, and cloud data.
generated_by: claude skill chapter-content-generator
date: 2026-06-01
version: 0.08
---

# Cell Phone Analytics and Mobile Forensics

## Summary

This chapter covers the forensic examination of mobile devices and the carrier records associated with them. Students learn how SIM cards and IMEI numbers identify a device and subscriber, then study how Call Detail Records (CDRs) and cell tower logs document device activity across time and geography. Tower triangulation methods for estimating a device's geographic location are developed mathematically, and GPS coordinate extraction from the device itself is contrasted with carrier-derived location data. Application data extraction, social media evidence recovery, and deleted data recovery on mobile devices extend the analytical scope. The chapter covers mobile OS forensics for both iOS and Android platforms, the Cellebrite UFED acquisition toolchain, and the legal process required for cloud data extraction. After completing this chapter, students will be able to use CDR and cell tower data to reconstruct a device's geographic movement across an investigative timeline.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Cell Phone Forensics Overview
2. SIM Card Analysis
3. IMEI Device Identification
4. Cell Tower Records
5. Call Detail Records (CDR)
6. Tower Triangulation
7. GPS Location Data Extraction
8. Application Data Extraction
9. Social Media Evidence Recovery
10. Deleted Data Recovery on Mobile
11. Mobile Operating System Forensics
12. iOS Forensics
13. Android Forensics
14. Cellebrite UFED
15. Cloud Data Forensics

## Prerequisites

This chapter builds on concepts from:

- [Chapter 15: Digital Forensics and Cybercrime Investigation](../15-digital-forensics/index.md)

---

!!! mascot-welcome "Welcome, Investigators!"
    ![Trace waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img"}
    Most people carry a detailed record of their movements, communications, and daily activities in their pocket at all times. A smartphone logs every call, every text, every GPS fix, every app login, and — through the carrier network — every cell tower the device connected to. Mobile forensics is the discipline of recovering and interpreting that record. The evidence is there; the challenge is getting it lawfully, preserving it correctly, and understanding what it means. Follow the evidence — right to the signal.

---

## Overview: Why Mobile Evidence Matters

Cell phones are among the most evidence-rich devices an investigator can seize. A single smartphone may contain:

- **Communications**: call logs, text messages (SMS/MMS), encrypted messaging app conversations, email
- **Location history**: GPS logs, cell tower connection records, Wi-Fi connection history, photo geotags
- **Activity records**: application usage logs, web browsing history, search history, calendar entries
- **Financial records**: mobile payment history, banking app transaction logs
- **Identification data**: subscriber identity, device identity, contact lists, social media accounts

Each category has distinct technical methods for extraction and distinct legal frameworks governing access. This chapter covers both the technical methods and the legal structures they operate within.

---

## Device and Subscriber Identification

Before analyzing the content of a mobile device, forensic examiners establish its identity — who owned it and what network it was registered to.

### SIM Card Analysis

A **SIM card (Subscriber Identity Module)** is a small integrated circuit inserted into a mobile device that identifies the subscriber to the cellular network. The SIM card stores:

- **ICCID (Integrated Circuit Card Identifier)**: a unique serial number identifying the physical SIM card
- **IMSI (International Mobile Subscriber Identity)**: a unique number identifying the subscriber account on the carrier network — up to 15 digits, formatted as mobile country code + mobile network code + mobile subscriber identification number
- **Authentication keys**: used by the network to verify the SIM's identity when connecting
- **Contacts and SMS messages** (on older SIM cards; modern devices store most data on device memory)
- **Last dialed numbers** and network connection history (depending on carrier and SIM generation)

Forensic SIM card examination typically uses a **SIM card reader** to extract the ICCID and IMSI without modifying the card. The IMSI is then used to request subscriber records from the carrier through legal process.

### IMEI Device Identification

The **IMEI (International Mobile Equipment Identity)** is a unique 15-digit number that identifies the physical mobile device hardware — independent of the SIM card. An IMEI is assigned to every GSM, WCDMA, and LTE device at the factory and is burned into the device's hardware.

Forensic significance of IMEI:
- Establishes device identity independent of the subscriber (a phone can have a different SIM each time it is turned on, but its IMEI remains constant)
- Can be queried against carrier records to identify all subscriber accounts that have used the device — even when SIM cards were changed
- IMEI records are subpoenaable from carriers and can establish when, where, and on what network a specific device was active
- Law enforcement can also request that carriers **block** a stolen device's IMEI from connecting to domestic networks

The IMEI is accessible from the device (dial *#06# on most phones), visible on the device's packaging, and recoverable from the device during forensic examination.

---

## Carrier Records: The Network's Account of Device Activity

Even without access to the physical device, carrier records can provide substantial evidence about a device's activity and location.

### Call Detail Records (CDR)

**Call Detail Records (CDRs)** are log files maintained by the cellular carrier for every call, SMS message, and data session associated with a subscriber account. CDRs typically contain:

- **Timestamp** of call/message initiation and termination
- **Duration** of voice calls
- **Originating and terminating phone numbers** (parties to the communication)
- **Cell tower identification** (the tower that handled the communication — see below)
- **Direction** of the communication (outgoing/incoming)
- **Data volume** (for data sessions)

CDRs are typically retained by carriers for 18 months to several years depending on carrier policy and applicable law. They are obtained through **legal process** — typically a subpoena for historical records, or a court order for prospective (real-time) records.

CDRs are among the most powerful location evidence available: they place a specific device at a specific cell tower at the time of each call or message, creating a geographic timeline of the device's activity.

### Cell Tower Records

**Cell tower records** document which towers a device connected to at what times. Each cellular base station serves a geographic area (the **cell**) using multiple directional antennas (**sectors**) — typically three sectors per tower, each covering approximately 120 degrees. When a device connects to a tower, the carrier records the tower ID and sector.

The geographic area covered by a single cell tower sector varies enormously:
- **Urban areas**: small cells may cover a single city block (100–500 meters radius)
- **Suburban areas**: macro cells may cover 1–3 km radius
- **Rural areas**: towers may cover 10–30+ km radius

Cell tower records can place a device within the coverage area of the serving cell tower at the time of connection — but that area may be very large in rural settings, providing only approximate location evidence.

---

## Location Determination Methods

### Tower Triangulation

**Tower triangulation** is a method for estimating a device's geographic location using signal timing or strength measurements from multiple cell towers simultaneously. When a device is connected to the network, the carrier can measure either:

- **Time difference of arrival (TDOA)**: the difference in time for the device's signal to reach multiple towers — precise timing allows distance calculation from each tower, and the intersection of these distance circles gives a location estimate
- **Signal strength (RSSI)**: the received signal strength at multiple towers — weaker signals indicate greater distance, again allowing distance-based location estimation

With measurements from three towers, the device's location can be estimated by **trilateration** (finding the point that satisfies three distance constraints simultaneously). With two towers, the estimate is ambiguous (two intersection points). With one tower (the CDR case), only the general coverage area is known.

The accuracy of tower triangulation ranges from tens of meters (dense urban areas with many towers) to several kilometers (rural areas with sparse tower coverage).

### GPS Location Data Extraction

**GPS location data extraction** recovers precise geographic coordinates directly from the device rather than from carrier records. Modern smartphones receive signals from the Global Positioning System (GPS) constellation of satellites, computing their location to within approximately 3–5 meters horizontally under ideal conditions.

GPS location data on a device may be found in:
- **Photo EXIF metadata** (covered in Chapter 15) — GPS coordinates embedded in photos at time of capture
- **Application location logs** — navigation apps, fitness apps, weather apps, and many other applications cache location histories in local databases
- **System location logs** — iOS and Android both maintain internal location caches that record GPS fixes over time
- **Cached maps** — tile downloads for specific geographic areas may reveal locations the device was used near

GPS extraction requires forensic access to the device's storage and is performed during device acquisition.

!!! mascot-tip "Investigator Tip"
    ![Trace holding magnifying glass](../../img/mascot/tip.png){ class="mascot-admonition-img"}
    Cell tower records and GPS records are complementary evidence sources with different strengths. Cell tower CDRs are available from the carrier even when the device cannot be seized — but provide only approximate location based on tower coverage area. GPS data from the device provides highly precise location but requires physical access to the device and may not be present if the user disabled location services. Always pursue both sources. When they agree, the location evidence is compelling. When they disagree, investigate the discrepancy — it may indicate device tampering or location spoofing.

---

## Device Forensics: Acquisition and Analysis

### Application Data Extraction

**Application data extraction** recovers the stored data from individual applications on the device — messages, contact histories, transaction logs, location caches, and user preferences. Modern messaging applications (Signal, WhatsApp, Telegram, iMessage) store conversation histories in local databases (typically SQLite format) on the device. These databases may persist even after conversations are manually deleted by the user, because deletion in the app may only mark records as deleted in the database rather than physically removing them.

Application data is stored in app-specific sandboxed directories on both iOS and Android devices. Extracting app data requires either:
- A **full filesystem extraction** (acquisition of the entire device storage, including app sandboxes)
- A **logical acquisition** (a file-level copy using the device's built-in backup functionality, which may not access all app data)

Full filesystem extraction provides the most complete app data but typically requires more invasive methods (jailbreaking on iOS, rooting on Android, or chip-off extraction in some cases).

### Social Media Evidence Recovery

**Social media evidence recovery** includes both on-device app data (cached posts, messages, images stored in social media app directories) and cloud-stored data accessible through legal process to the platform provider. Social media evidence is covered in depth in Chapter 18; the device-side component includes recovering cached content from the device's local storage — content that may not be available through legal process to the provider if the user deleted it remotely.

### Deleted Data Recovery on Mobile

**Deleted data recovery on mobile** attempts to recover data that the user or the operating system has marked as deleted but not yet physically overwritten. On smartphones, deleted data recovery faces similar challenges to SSD forensics (Chapter 15):

- Both iOS and Android use flash memory, which is managed by the storage controller and subject to wear leveling and TRIM-like operations
- App-level deletion may leave database records accessible via forensic SQLite parsing
- File system unallocated space may contain fragments of overwritten data
- Cloud-synchronized data may be recoverable from cloud backups even if the local copy was deleted

Recovery success rate depends heavily on how much write activity has occurred on the device since deletion and whether the storage controller has erased the relevant flash blocks.

---

## Mobile Operating System Forensics

iOS and Android present different forensic challenges because of their fundamentally different security architectures.

### iOS Forensics

**iOS forensics** is complicated by Apple's strong encryption and security model. Key features:

- **Full-device encryption** using hardware-bound keys tied to both the device hardware and the passcode — without the passcode, even Apple cannot decrypt the device
- **Secure Enclave**: a dedicated hardware security module that handles encryption key management independently of the main processor, making brute-force passcode attacks extremely slow
- **Limited filesystem access**: iOS enforces strict app sandboxing; standard USB connections provide only backup-level access, not full filesystem access

For iOS, forensic acquisition methods include:
- **iTunes/Finder backup extraction**: logical acquisition using Apple's backup format (accessible without passcode on older iOS versions; requires passcode on newer versions)
- **Advanced logical extraction**: using exploit-based tools that access more data than standard backup
- **Chip-off or JTAG**: physical extraction of flash memory chips (destructive; used as last resort)

The passcode is the critical bottleneck. Without it, modern iOS devices with current firmware are effectively inaccessible to all known forensic methods.

### Android Forensics

**Android forensics** presents a different landscape because Android is deployed across hundreds of device models with varying security implementations. Key features:

- **Full Disk Encryption (FDE)** or **File-Based Encryption (FBE)** — present on most modern Android devices but implementation strength varies by manufacturer
- **ADB (Android Debug Bridge)**: a developer protocol that, when enabled, provides file system access — disabled by default on consumer devices
- **Wide variation**: manufacturer custom firmware, varying bootloader lock states, and different security levels across devices mean forensic capabilities vary significantly by model

Android acquisition methods include:
- **ADB backup extraction**: logical acquisition using Android's built-in backup protocol
- **Bootloader exploit-based extraction**: on vulnerable device models, full filesystem dumps
- **Cloud backup extraction**: Google Backup data recoverable through legal process
- **Chip-off or JTAG**: physical extraction for locked devices with no software path

### Cellebrite UFED

The **Cellebrite UFED (Universal Forensic Extraction Device)** is the industry-standard commercial mobile forensic acquisition platform, widely used by law enforcement worldwide. UFED supports thousands of device models and carrier configurations and can perform:

- **Logical extraction**: file-level copy using device protocols
- **File system extraction**: full app data and system files access (where achievable)
- **Physical extraction**: raw flash memory dump on supported devices
- **SIM card extraction**: direct SIM card data reading
- **Cloud extraction**: legal cloud data requests via built-in carrier and cloud service integration

Cellebrite regularly updates its support database to handle new device models and new iOS/Android versions. UFED outputs are produced in **UFDR (Cellebrite Physical Analyzer)** format and can be exported as standardized reports for court presentation.

#### Diagram: CDR and Tower Triangulation Timeline MicroSim

<iframe src="../../sims/cdr-tower-triangulation/main.html" width="100%" height="520px" scrolling="no"></iframe>

<details markdown="1">
<summary>CDR and Tower Triangulation Timeline MicroSim</summary>
Type: microsim
**sim-id:** cdr-tower-triangulation<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning Objective: Use CDR and cell tower data to reconstruct a device's geographic movement across an investigative timeline (Bloom Level 3 — Apply; verb: use).

Bloom Level: Apply (L3)
Bloom Verb: Use

Canvas layout:
- Left panel (~50%): Simplified map grid showing cell tower locations and their coverage circles
- Right panel (~50%): CDR table showing call timestamps and tower IDs

Visual elements:
- Map with 6–8 cell towers shown as icons, each with a labeled coverage circle
- CDR table: rows showing timestamp, call type (outgoing/incoming), duration, tower ID
- Timeline bar at the bottom showing device movement as a colored path connecting towers chronologically
- Animated "device" icon that moves between towers as the timeline is played

Interactive controls:
- Click any CDR row to highlight the corresponding tower on the map
- "Play Timeline" button — animates the device movement across the map based on CDR records
- "Show Triangulation" button — displays triangulation calculation for a specific time window with 3-tower measurements shown
- Slider: "Playback speed"

Data Visibility Requirements:
- Show the geographic coverage area (circle radius) for each tower — radius varies by tower type
- Show the trilateration math: three circles, their intersection, the estimated location point
- Show the resulting location estimate with uncertainty radius
- Export a formatted text timeline of tower contacts

Instructional Rationale: An Apply-level objective (use CDR to reconstruct geographic movement) requires hands-on work with simulated CDR data, placing a device's movements in geographic and temporal context.

Color scheme: Map in light gray, towers in blue, coverage circles in semi-transparent blue, device path in orange, selected tower in green.
</details>

---

## Cloud Data Forensics

**Cloud data forensics** is the recovery of digital evidence from remote cloud storage and services — the components of a user's digital activity that are synchronized or stored with a third-party cloud provider rather than held only on the device.

Most modern smartphones automatically sync data to cloud services:
- **Apple iCloud**: device backup, iCloud Drive files, iCloud Photos, iMessages (via Message in iCloud), Health data, location history (Significant Locations)
- **Google Account / Google One**: Android device backup, Google Drive, Google Photos, Gmail, Google Maps Timeline (detailed location history)
- **Microsoft OneDrive**: file synchronization for Windows and Office applications
- **Platform-specific services**: Facebook, Instagram, Twitter/X, WhatsApp, Signal, and others maintain user data in their cloud infrastructure

Cloud data is obtained through **legal process** directed at the cloud provider — the form of process required (subpoena, court order, search warrant under 18 U.S.C. § 2703) depends on the type of data requested and its age. The Electronic Communications Privacy Act (ECPA) and the Stored Communications Act (SCA) govern U.S. domestic legal process for cloud data; international requests operate under Mutual Legal Assistance Treaties (MLATs) or under the CLOUD Act (2018).

Cloud backups are particularly valuable because they may capture device state at a point in time before evidence was deleted from the device — providing a historical snapshot that the physical device no longer contains.

---

## Key Concepts Review

The following table summarizes the major concepts from this chapter:

| Concept | Definition |
|---|---|
| SIM Card | Subscriber Identity Module; stores IMSI and authenticates subscriber to network |
| IMEI | 15-digit hardware device identifier; constant regardless of SIM card changes |
| CDR | Call Detail Record; carrier log of calls, messages, data sessions with timestamps and tower IDs |
| Cell Tower Records | Log of which tower a device connected to; places device within tower coverage area |
| Tower Triangulation | Estimating device location using timing/strength from multiple simultaneous tower measurements |
| GPS Extraction | Precise coordinates from device GPS log, EXIF metadata, app location caches |
| App Data Extraction | Recovery of SQLite databases and cached content from individual app sandboxes |
| Deleted Data Recovery | Recovery of data marked deleted but not yet overwritten; limited by flash TRIM operations |
| iOS Forensics | Strong encryption; Secure Enclave; passcode essential; limited access without it |
| Android Forensics | Varies by manufacturer; more diverse acquisition paths; ADB, bootloader exploits |
| Cellebrite UFED | Industry-standard mobile acquisition platform supporting thousands of device models |
| Cloud Data Forensics | Legal process (subpoena/warrant) to cloud providers; may recover data deleted from device |

---

??? question "Challenge: Timeline Reconstruction"
    An investigator has CDR records showing that a suspect's phone connected to three cell towers over a 4-hour period on the night of an offense. Tower A (urban, 300m radius) at 9:15 PM, Tower B (urban, 400m radius) at 10:43 PM, and Tower C (suburban, 2km radius) at 11:52 PM. No calls were made — the tower contacts were generated by the phone's background data activity.

    **What does this evidence establish? What are its limitations? What additional evidence sources should be requested?**

    **Answer:** The CDR establishes that the device (and by inference, the person carrying it) was within the coverage area of Tower A at 9:15 PM, Tower B at 10:43 PM, and Tower C at 11:52 PM — providing three approximate location points over the 4-hour window. In an urban environment with 300–400m tower coverage, this places the device within a relatively small geographic area at each time point.

    **Limitations**: (1) The phone was not necessarily in the hands of the suspect — it could have been left in a location, given to another person, or left in a vehicle. (2) Tower coverage areas are approximate — actual coverage depends on terrain, building density, and network load, requiring expert testimony about the specific tower's service area. (3) Background data connections are initiated by the phone automatically and do not prove the suspect was actively using the device. (4) The suburban Tower C provides only 2km location resolution — far less precise than the urban towers.

    **Additional evidence**: GPS location data from the device itself (precise coordinates with timestamps); Wi-Fi connection logs (nearby access points refine location even without GPS); EXIF data from any photos taken that evening; video surveillance from locations within the identified coverage areas.

---

!!! mascot-celebration "Case Closed — For Now"
    ![Trace raising magnifying glass in celebration](../../img/mascot/celebration.png){ class="mascot-admonition-img"}
    A cell phone is a witness that never sleeps and never forgets — as long as the investigator knows how to read it. CDR records place devices in space and time. GPS logs place them precisely. App data reveals what was communicated and purchased. And cloud backups survive even after the device is wiped. Chapter 18 extends the investigation to the social media and open-source intelligence that leaves a public digital trail alongside the private device record. Follow the evidence — wherever it was posted.

[See Annotated References](./references.md)
