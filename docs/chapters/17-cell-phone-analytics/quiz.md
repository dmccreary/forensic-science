# Quiz: Cell Phone Analytics and Mobile Forensics

Test your understanding of SIM cards, IMEI, call detail records, tower triangulation, GPS extraction, mobile OS forensics, Cellebrite UFED, and cloud data with these questions.

---

#### 1. A SIM card is seized from a suspect's phone. What specific identifier stored on the SIM card allows investigators to request subscriber records from the cellular carrier?

<div class="upper-alpha" markdown>
1. The IMEI — a 15-digit number burned into the SIM card's hardware at the factory
2. The IMSI — the International Mobile Subscriber Identity, a unique number identifying the subscriber account on the carrier network
3. The ICCID — the serial number of the physical SIM card, which is the primary account identifier in carrier billing systems
4. The authentication key — a cryptographic value on the SIM that the carrier matches to confirm subscriber identity
</div>

??? question "Show Answer"
    The correct answer is **B**. The IMSI (International Mobile Subscriber Identity) is the number that uniquely identifies the subscriber account — formatted as mobile country code + mobile network code + mobile subscriber identification number, up to 15 digits. Investigators use the IMSI extracted from the SIM card to submit legal process to the carrier requesting all call detail records, tower connection records, and subscriber account data associated with that subscriber identity. The ICCID identifies the physical SIM card but is not the primary subscriber account identifier in carrier records systems.

    **Concept Tested:** SIM Card Analysis

---

#### 2. A suspect switches SIM cards frequently to avoid connecting calls to their real identity. An investigator subpoenas the carrier for records associated with the suspect's phone hardware. What identifier enables this inquiry, and why does it remain constant when SIM cards change?

<div class="upper-alpha" markdown>
1. The ICCID — it is embedded in the carrier's network switching equipment and cannot be changed by the subscriber
2. The IMEI — the International Mobile Equipment Identity is a 15-digit number assigned to the physical device hardware at the factory and is independent of the SIM card
3. The IMSI — the subscriber account number stays constant in the carrier's database even when different physical SIM cards are inserted
4. The device's MAC address — the hardware network address is used by carriers to track device identity across different SIM cards
</div>

??? question "Show Answer"
    The correct answer is **B**. The IMEI (International Mobile Equipment Identity) is a 15-digit number permanently assigned to a specific physical device at manufacture and burned into the hardware. It does not change when the SIM card is swapped. Carriers log the IMEI of the device used for each call alongside the IMSI of the active SIM — allowing investigators to query all subscriber accounts that have ever used a specific device, even when the user changed SIM cards repeatedly to obscure their identity. The IMEI can be subpoenaed from carriers to establish a complete device-activity history.

    **Concept Tested:** IMEI Device Identification

---

#### 3. Call Detail Records (CDRs) are obtained through legal process from a cellular carrier. In addition to call timestamps and the parties to each communication, what location-relevant information do CDRs typically contain?

<div class="upper-alpha" markdown>
1. The precise GPS coordinates of the device at the time of each call, accurate to within 3 meters
2. The cell tower identification showing which tower handled each call, allowing placement of the device within that tower's coverage area at the time of the call
3. The Wi-Fi access point the device was connected to, providing building-level location resolution for each call
4. The street address of the subscriber's registered billing address, which is assumed to be the device's location at call time
</div>

??? question "Show Answer"
    The correct answer is **B**. CDRs contain the cell tower ID (and typically the sector) that handled each call, SMS, or data session — placing the device within the geographic coverage area of that tower at the time of the communication. In urban areas where towers have small coverage radii (100–500 meters), this can provide meaningful location resolution. In rural areas where towers cover 10–30+ km, the location evidence is far less precise. CDRs do not contain GPS coordinates — GPS data comes from the device itself, not the carrier network.

    **Concept Tested:** Call Detail Records (CDR)

---

#### 4. Tower triangulation uses measurements from multiple cell towers simultaneously to estimate a device's location. With signals from three towers, what mathematical method determines the location estimate, and what is its result?

<div class="upper-alpha" markdown>
1. Triangulation — the intersection of three angle measurements from different towers defines a unique point, pinpointing the device to a single GPS coordinate
2. Trilateration — three distance estimates (one per tower, derived from signal timing or strength) define three circles; the device is located at or near their intersection point
3. Interpolation — the device's location is calculated as the weighted average of the three towers' geographic coordinates, weighted by signal strength
4. Dead reckoning — the device's movement speed between towers is used to calculate distance traveled, and the three speed measurements converge to a location estimate
</div>

??? question "Show Answer"
    The correct answer is **B**. Trilateration uses distance measurements rather than angle measurements. Signal timing (TDOA — Time Difference of Arrival) or signal strength (RSSI) from each tower is used to calculate an approximate distance from that tower, defining a circle of possible locations around each tower. With three towers, the intersection region of the three circles yields a location estimate. The accuracy depends on tower density: in urban areas with many towers and precise timing, location accuracy can be tens of meters; in rural areas with sparse towers, accuracy may be only kilometers. This is mathematically different from true triangulation, which uses angles.

    **Concept Tested:** Tower Triangulation

---

#### 5. An investigator extracts GPS location data from a seized smartphone and finds detailed location logs from a fitness tracking application. What type of GPS location evidence does this represent, and how does it differ from carrier CDR location evidence?

<div class="upper-alpha" markdown>
1. Application GPS logs are less reliable than CDR records because apps can be manually edited by the user to change their stored location history
2. Application GPS logs provide precise geographic coordinates (accurate to 3–5 meters under ideal conditions) from the device's GPS receiver, which is fundamentally more precise than CDR tower-based location data but requires physical access to the device rather than carrier legal process
3. Application GPS logs and CDR records are equivalent evidence; courts treat them the same because both are derived from the carrier's network infrastructure
4. Application GPS logs record only the starting and ending location of each fitness session, not a continuous path, making them useful only for confirming the beginning and end of trips
</div>

??? question "Show Answer"
    The correct answer is **B**. GPS location data extracted directly from a device's application logs provides coordinate-level precision (approximately 3–5 meters horizontally under good satellite visibility), far more precise than the tower-coverage-area location provided by CDR data. Application location caches, fitness tracker logs, navigation app histories, and the device's internal system location log all record GPS coordinates with timestamps. The critical distinction from CDR evidence is the access method: GPS device data requires physical seizure and forensic examination of the device, while CDR data is obtained from the carrier through legal process even without the physical device.

    **Concept Tested:** GPS Location Data Extraction

---

#### 6. An investigator uses Cellebrite UFED to acquire a smartphone and recovers message conversations from a messaging application that the user claims to have deleted. Why are deleted messages often recoverable through forensic application data extraction?

<div class="upper-alpha" markdown>
1. Cellebrite UFED restores deleted messages from the carrier's cloud backup automatically during the acquisition process
2. Messaging applications store conversation data in SQLite databases where "deleting" a message typically only marks the record as deleted in the database rather than physically removing the data — the underlying record remains accessible to forensic database parsing until the space is overwritten
3. Deleted messages are preserved in the device's temporary memory and remain accessible for 30 days before the operating system permanently erases them
4. The messaging application's encryption keys are stored in a dedicated chip that retains message content independently of the main storage, making messages recoverable regardless of deletion
</div>

??? question "Show Answer"
    The correct answer is **B**. Messaging applications typically store conversation data in SQLite database files. When a user deletes a message within the app, the application commonly marks the record with a deletion flag or removes its entry from the active table, but the underlying binary data typically remains in the database file's unallocated pages until the database is vacuumed or overwritten. Forensic database parsing tools (including Cellebrite Physical Analyzer) can read these unallocated SQLite pages and recover the deleted message content, sender, timestamp, and conversation context. The same principle applies to call logs, contact records, and notes stored in application databases.

    **Concept Tested:** Application Data Extraction

---

#### 7. A forensic examiner receives an Apple iPhone with an unknown passcode. The device is running the most recent iOS version with no known exploits. What is the most significant obstacle to forensic acquisition?

<div class="upper-alpha" markdown>
1. iPhones store all data in iCloud, and Apple's terms of service prohibit forensic examination of cloud-stored data without direct user consent
2. iOS's hardware encryption ties the decryption key to both the device hardware and the passcode; without the passcode, the device's data is cryptographically inaccessible — even to Apple — and all known forensic acquisition methods are blocked
3. The Cellebrite UFED cannot physically connect to the iPhone's Lightning or USB-C port without the original charging cable, which may not be available in evidence
4. Apple's App Store review process verifies that forensic tools cannot be installed on iPhones, making any software-based acquisition technique impossible on any iOS device
</div>

??? question "Show Answer"
    The correct answer is **B**. Modern iOS devices with current firmware use the Secure Enclave — a dedicated hardware security processor — to manage encryption keys derived from both device-specific hardware identifiers and the user's passcode. Without the passcode, the Secure Enclave enforces strict limits on decryption attempts, making brute-force attacks extremely slow (potentially decades for a 6-digit passcode on current hardware). Apple has designed the system so that even they cannot bypass the encryption without the passcode. The passcode is the critical bottleneck for iOS forensics — without it, current technology cannot access the encrypted data through any known software method.

    **Concept Tested:** iOS Forensics

---

#### 8. An investigator needs to recover evidence from a Samsung Android phone that is locked with an unknown PIN. How does the forensic landscape for Android differ from iOS in terms of acquisition options?

<div class="upper-alpha" markdown>
1. Android and iOS present identical forensic challenges because both platforms use the same Secure Enclave technology
2. Android forensics offers more varied acquisition paths because Android runs across hundreds of device models with varying security implementations — some may be vulnerable to bootloader exploits, ADB access, or manufacturer-specific methods that are not available on iOS
3. Android phones are always accessible without a passcode because Android requires device manufacturers to include a law enforcement bypass mode by federal regulation
4. Android forensics is always impossible without the passcode because Google's encryption is stronger than Apple's and no known bypasses have ever been published for any Android device
</div>

??? question "Show Answer"
    The correct answer is **B**. Unlike iOS's relatively uniform security architecture across Apple devices, Android runs on hundreds of device models from many manufacturers, each with different firmware, bootloader lock states, and security implementations. Some Android devices may be vulnerable to bootloader exploit-based extraction methods; some have debug modes (ADB) enabled that allow file system access; some manufacturers have previously cooperated with law enforcement through manufacturer-specific channels. This diversity means forensic capabilities vary significantly by device model, Android version, and manufacturer. For high-security Android devices with modern encryption enabled, acquisition can be as challenging as iOS — but the landscape is less uniform.

    **Concept Tested:** Android Forensics

---

#### 9. An investigator suspects that a suspect deleted incriminating messages and application data from their smartphone after learning about the investigation. The device was seized two weeks later. Why might cloud backup forensics recover evidence that the physical device no longer contains?

<div class="upper-alpha" markdown>
1. Cloud backups are updated in real time and always contain an exact copy of the device's current state, including any data deleted in the past two weeks
2. Cloud backup services create periodic snapshots of device state at the time of each backup — data that existed at the last backup before deletion may be preserved in that snapshot even though it was subsequently deleted from the physical device
3. Cloud providers are required by federal law to preserve all account data indefinitely, so no data is ever permanently lost regardless of when the user deleted it
4. Cloud backups retain deleted data permanently in a special encrypted archive that is only accessible to law enforcement with a search warrant
</div>

??? question "Show Answer"
    The correct answer is **B**. Cloud backup services (iCloud, Google Backup) create periodic snapshots of device state — typically daily or at each significant change. If data was present on the device at the time of the last backup before the user deleted it, that data may be preserved in the backup snapshot. Even if the suspect deleted messages and app data from the physical device after the last backup, the cloud backup retains the state of the device at the time of the backup. Investigators request cloud backup data through legal process directed at the cloud provider, and may request multiple historical backup versions to establish what data existed at specific points in time.

    **Concept Tested:** Cloud Data Forensics

---

#### 10. A CDR timeline shows that a suspect's phone connected to cell towers A, B, and C in sequence over 2 hours. Tower A has a 400-meter urban coverage radius and Tower C has a 15-kilometer rural coverage radius. How should an expert characterize the location precision of the Tower A contact versus the Tower C contact in court testimony?

<div class="upper-alpha" markdown>
1. Both tower contacts provide equal precision; the law requires experts to treat all CDR contacts uniformly to avoid prejudicing the jury
2. The Tower A contact places the device within approximately a 400-meter radius area, providing meaningful neighborhood-level location evidence; the Tower C contact places the device somewhere within a 15-km radius area — a much larger uncertainty zone that should be communicated clearly to avoid overstating the precision of the location evidence
3. Tower C's larger coverage area makes its contact more reliable as evidence because larger towers are harder to spoof than small urban towers
4. The expert should average the two coverage radii to report a uniform location precision of approximately 7.7 km for all contacts in the timeline
</div>

??? question "Show Answer"
    The correct answer is **B**. Cell tower coverage areas vary enormously based on tower type and geographic context, and this variation directly affects the precision of the location evidence. An urban micro-cell covering a 400-meter radius can place a device within a few city blocks — meaningful for establishing presence at or near a specific location. A rural macro-cell covering a 15-km radius places the device somewhere within a large geographic area that may encompass dozens of square kilometers. Expert testimony must clearly communicate the coverage radius and resulting geographic uncertainty for each tower contact, because juries may incorrectly assume that all CDR location evidence has the same high precision. Overstating CDR precision has contributed to wrongful convictions.

    **Concept Tested:** Cell Tower Records

---
