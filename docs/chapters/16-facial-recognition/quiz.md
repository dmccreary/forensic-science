# Quiz: Facial Recognition and Biometric Identification

Test your understanding of biometric principles, face detection algorithms, facial landmark detection, eigenfaces, deep learning, law enforcement databases, algorithmic bias, and admissibility challenges with these questions.

---

#### 1. Biometric identification systems are evaluated against three core properties. Which combination correctly describes what "universality," "distinctiveness," and "permanence" mean for a biometric trait?

<div class="upper-alpha" markdown>
1. Universality means all people have the trait; distinctiveness means no two people have identical versions; permanence means the trait does not change significantly over a person's lifetime
2. Universality means the system works on all camera types; distinctiveness means the trait can be detected from a distance; permanence means the database never needs updating
3. Universality means the trait is accepted in all courts; distinctiveness means the trait can distinguish between identical twins; permanence means digital records are stored permanently
4. Universality means the system is available universally to law enforcement; distinctiveness means each person's face is stored as a distinct file; permanence means photos cannot be deleted from the database
</div>

??? question "Show Answer"
    The correct answer is **A**. A valid biometric identifier must be universal (present in every individual), distinctive (sufficiently unique between individuals to allow discrimination), and permanent (stable over time so that a sample collected today will still match records collected years earlier). The face meets all three criteria to varying degrees: everyone has a face (universality), facial geometry differs between individuals (distinctiveness), and facial structure is relatively stable across adulthood (permanence), though it changes with age, injury, weight change, and facial hair. These properties together determine the theoretical reliability ceiling of any biometric system.

    **Concept Tested:** Biometric Identification Principles

---

#### 2. The Viola-Jones face detection algorithm was a landmark advance in real-time face detection. What type of errors does it produce, and why do both error types matter for forensic applications?

<div class="upper-alpha" markdown>
1. Viola-Jones produces only false negatives (missed faces); false positives do not occur because the algorithm is conservative by design
2. Viola-Jones produces false positives (detecting a face where there is none) and false negatives (missing an actual face); both matter because false positives waste investigative resources and false negatives miss suspects
3. Viola-Jones produces only false positives; it always detects at least one face per image frame and investigators filter out the errors manually
4. Viola-Jones errors are measured only in frames per second; accuracy errors were eliminated in the 2001 update to the original algorithm
</div>

??? question "Show Answer"
    The correct answer is **B**. Any detection algorithm produces two types of errors: false positives (Type I errors), where the algorithm incorrectly identifies something as a face, and false negatives (Type II errors), where the algorithm fails to detect an actual face. In forensic surveillance applications, false positives generate investigative leads on innocent people, wasting resources and potentially contributing to wrongful investigations. False negatives mean a wanted suspect passes through a checkpoint undetected. The balance between these two error rates is controlled by the detection threshold — lower thresholds reduce false negatives but increase false positives, and vice versa.

    **Concept Tested:** Face Detection Algorithms

---

#### 3. Modern facial recognition systems use facial landmark detection to align and normalize faces before comparison. What is the purpose of this alignment step?

<div class="upper-alpha" markdown>
1. Alignment converts the face image to grayscale and removes background noise before feature extraction
2. Alignment geometrically normalizes the face so that landmark points (eyes, nose tip, mouth corners) are in consistent positions across all images, removing the variation caused by head pose, scale, and in-plane rotation before mathematical comparison
3. Alignment crops out the facial region and discards the hair and neck, which do not contribute to identification
4. Alignment compresses the face image to a standard file size so that database storage requirements are uniform
</div>

??? question "Show Answer"
    The correct answer is **B**. Before two face images can be meaningfully compared mathematically, they must be placed in a common reference frame. Facial landmark detection identifies stable anatomical points — typically 68 to 468 specific points such as eye corners, nose tip, nostril centers, and mouth corners — and uses these to compute a geometric transformation that maps the face into a standard pose and scale. This alignment step ensures that the subsequent feature comparison measures actual facial geometry differences rather than artifacts of camera angle, distance, or head tilt. Without alignment, the same face photographed from slightly different angles would appear as different identities.

    **Concept Tested:** Facial Landmark Detection

---

#### 4. The eigenface method uses Principal Component Analysis (PCA) to represent faces mathematically. How does this method represent an individual face?

<div class="upper-alpha" markdown>
1. The eigenface method stores each face as a list of pixel brightness values in a fixed grid, which is then compared grid-square by grid-square to reference images
2. The eigenface method represents each face as a weighted combination of a set of "eigenfaces" — abstract basis images that capture the most common patterns of variation across a training face database
3. The eigenface method identifies the unique frequency signature of each face by applying a Fourier transform to the face image
4. The eigenface method encodes a face as the distances between 12 specific anatomical landmarks measured in millimeters from the original photograph
</div>

??? question "Show Answer"
    The correct answer is **B**. Principal Component Analysis identifies the directions of greatest variance in a training set of face images — these principal components are visualized as ghostly "eigenfaces" that capture common modes of facial variation (lighting variation, expression variation, face shape variation). Any new face image can be approximated as a weighted sum of these eigenfaces — the set of weights forms a compact numerical representation (a vector) of that face. Comparing faces then reduces to comparing their eigenface weight vectors. The method was groundbreaking because it compressed high-dimensional image data into a compact, mathematically tractable representation.

    **Concept Tested:** Eigenface Method

---

#### 5. Deep learning facial recognition systems like FaceNet and ArcFace represent faces as embeddings in high-dimensional space. What property of these embeddings makes them effective for identification?

<div class="upper-alpha" markdown>
1. Embeddings are one-dimensional values between 0 and 1, where values above 0.5 indicate a match and values below 0.5 indicate no match
2. Embeddings are high-dimensional vectors trained so that images of the same person map to nearby points in embedding space while images of different people map to distant points, making identification a distance measurement problem
3. Embeddings store the original face image in compressed binary format, allowing reconstruction of the original photograph for human review
4. Embeddings are fixed lookup codes assigned to each person in the database, and a match is declared when the query code is found exactly in the database
</div>

??? question "Show Answer"
    The correct answer is **B**. A deep learning facial recognition model is trained to map face images to points in a high-dimensional embedding space (typically 128 to 512 dimensions) with the constraint that images of the same person are close together (small Euclidean or cosine distance) and images of different people are far apart. This metric learning objective means that identification becomes a nearest-neighbor search: given a query face embedding, find the most similar embedding in the database. The power of this approach is generalization — the model learns a representation that works for identities never seen during training.

    **Concept Tested:** Deep Learning

---

#### 6. A facial recognition system returns a "candidate list" of possible matches when queried against a law enforcement database. According to best practices, what must happen before a candidate on the list is treated as a confirmed identification?

<div class="upper-alpha" markdown>
1. A candidate becomes a confirmed identification automatically when the algorithm's similarity score exceeds 95%, since scores above this threshold have been shown to be error-free
2. A trained human examiner must independently review the candidate image against the query image, because the algorithm produces a ranked list of possibilities, not a confirmed identification — the final decision requires human judgment
3. A second algorithm from a different vendor must independently return the same candidate at the top of its list before the candidate is confirmed
4. The candidate's DNA must be collected and compared to biological evidence at the scene before the facial recognition result can be used as confirmation
</div>

??? question "Show Answer"
    The correct answer is **B**. Facial recognition systems produce candidate lists — ranked outputs of images that are mathematically similar to the query image — not confirmed identifications. The algorithm calculates similarity scores but cannot make the legal determination that two images show the same person. Best practices from organizations including the FBI's NGI system and NIST require that a trained human facial examiner independently review the top candidates against the query to make a final determination. Using an algorithm's rank-one result directly as a positive identification, without human review, violates established forensic practice and has contributed to wrongful arrests.

    **Concept Tested:** NGI Facial Recognition System

---

#### 7. A 2019 NIST study evaluated the accuracy of over 100 facial recognition algorithms across demographic groups. What pattern did the study consistently find?

<div class="upper-alpha" markdown>
1. All algorithms performed equally across demographic groups, confirming that modern deep learning has eliminated bias in facial recognition
2. Algorithms showed higher false-positive rates (incorrectly matching different people) for darker-skinned individuals, women, and older adults — sometimes by a factor of 10 to 100 times compared to lighter-skinned men
3. Algorithms performed better on women and older adults because these groups have more distinctive facial features that are easier to distinguish
4. The study found that all commercial algorithms performed worse on darker-skinned individuals but better on women of all ethnicities compared to men
</div>

??? question "Show Answer"
    The correct answer is **B**. The NIST FRVT (Face Recognition Vendor Testing) 2019 study was the largest independent evaluation of facial recognition algorithms and found consistent demographic disparities in false-positive rates. For one-to-one verification, false-positive rates were highest for African American and Asian faces compared to Caucasian faces, for women compared to men, and for older adults. In some algorithms, the false-positive rate for African American women was 10 to 100 times higher than for Caucasian men. These disparities mean that people in affected demographic groups face a higher risk of being falsely matched to a crime scene image, with serious implications for justice.

    **Concept Tested:** Algorithmic Bias

---

#### 8. Forensic facial superimposition compares a skull or skeletal remains to photographs of a missing person. What level of conclusion can a superimposition result support?

<div class="upper-alpha" markdown>
1. Superimposition can confirm positive identification with the same certainty as DNA matching when 12 or more anatomical landmarks align perfectly
2. Superimposition can support exclusion (the skull cannot be this person) or provide supporting evidence for inclusion (consistent with being this person), but it cannot independently confirm a positive identification
3. Superimposition results are not admissible in any jurisdiction because the technique lacks published error rate data required under Daubert
4. Superimposition automatically provides a positive identification whenever the skull outline matches the photograph outline within a 5% margin of error
</div>

??? question "Show Answer"
    The correct answer is **B**. Forensic facial superimposition overlays a photograph of a missing person onto a skull image to assess anatomical compatibility. When the anatomical structures clearly do not match — the skull is significantly larger, the orbital positions conflict, or bony landmarks fall outside the soft tissue — superimposition can support exclusion. When structures are compatible, the method provides supporting evidence for inclusion. However, superimposition alone cannot confirm a positive identification because variations in soft tissue thickness, photography angle, and image quality introduce too much uncertainty. It is used as one element in an identification package alongside DNA, fingerprints, or dental records.

    **Concept Tested:** Facial Superimposition

---

#### 9. A defense attorney challenges the admission of facial recognition evidence in a criminal trial, citing concerns about the algorithm's error rate and lack of independent testing. Under which standard would these concerns most directly apply?

<div class="upper-alpha" markdown>
1. Miranda standard — the suspect was not informed that facial recognition was used during the investigation
2. Frye standard only — facial recognition algorithms must show general acceptance in the scientific community, and the Daubert standard does not apply to computer-based evidence
3. Daubert standard — the methodology must be testable, subject to peer review, have known error rates, and be generally accepted; algorithms with undisclosed error rates or lack of independent validation may fail this test
4. Brady standard — the government must disclose the algorithm's source code to the defense as material evidence favorable to the accused
</div>

??? question "Show Answer"
    The correct answer is **C**. Under Daubert v. Merrell Dow Pharmaceuticals (1993), scientific evidence is admissible when the methodology has been tested, subjected to peer review, has known or knowable error rates, and is generally accepted in the relevant scientific community. Defense challenges to facial recognition under Daubert focus on: the algorithm's error rate for the relevant demographic (which may not be publicly disclosed for proprietary systems), whether the specific algorithm has undergone independent peer-reviewed testing, whether the human examiner's review process meets documented standards, and whether the specific conditions of the surveillance footage (resolution, angle, lighting) fall within the algorithm's validated operating parameters.

    **Concept Tested:** Facial Recognition Admissibility

---

#### 10. Facial age progression models are used by investigators searching for missing persons or fugitives. What is the appropriate use of age progression output in an investigation?

<div class="upper-alpha" markdown>
1. Age progression output constitutes positive identification evidence and can be used in court to confirm that a located person is the missing individual
2. Age progression models produce an investigative tool — a probabilistic estimate of current appearance used to generate leads and guide searches — not a forensic identification, and results must be confirmed by other identification methods
3. Age progression output is only valid when the original photograph was taken within the past five years, as longer intervals exceed the algorithm's validated accuracy range
4. Age progression is performed only on skeletal remains to estimate the age at death from bone morphology, not on photographs of living persons
</div>

??? question "Show Answer"
    The correct answer is **B**. Age progression modeling uses knowledge of typical facial aging patterns — skin changes, fat redistribution, bone remodeling, hairline changes — to generate an estimated current-age appearance from an earlier photograph. This output is an investigative tool that helps generate recognition leads and helps the public identify a missing person or fugitive who may have aged significantly since the last known photograph. It is not a forensic identification method. When a located person is identified using an age-progressed image, the identification must be confirmed by independent means — DNA, fingerprints, dental records, or documentary evidence.

    **Concept Tested:** Age Progression Modeling

---
