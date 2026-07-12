// Live Hash & Tamper Detector — Apply (L3)
// A self-contained, offline digital-forensics tool. Computes MD5 and SHA-256
// digests of evidence text, demonstrates the avalanche effect from a single
// changed character, and compares two files by SHA-256 to authenticate the
// untouched original. SHA-256 uses the Web Crypto API (crypto.subtle); MD5 uses
// the compact public-domain implementation below (no network dependency).

/* ------------------------------------------------------------------ *
 * MD5 — based on the public-domain implementation by Paul Johnston.
 * Returns a lowercase hex digest of a JavaScript string (UTF-8 safe).
 * ------------------------------------------------------------------ */
const md5 = (function () {
  function safeAdd(x, y) {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
  function rol(num, cnt) { return (num << cnt) | (num >>> (32 - cnt)); }
  function cmn(q, a, b, x, s, t) { return safeAdd(rol(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b); }
  function ff(a, b, c, d, x, s, t) { return cmn((b & c) | (~b & d), a, b, x, s, t); }
  function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & ~d), a, b, x, s, t); }
  function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
  function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | ~d), a, b, x, s, t); }

  function binlMD5(x, len) {
    x[len >> 5] |= 0x80 << (len % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
    for (let i = 0; i < x.length; i += 16) {
      const olda = a, oldb = b, oldc = c, oldd = d;
      a = ff(a, b, c, d, x[i], 7, -680876936);
      d = ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = ff(c, d, a, b, x[i + 10], 17, -42063);
      b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = ff(b, c, d, a, x[i + 15], 22, 1236535329);

      a = gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = gg(b, c, d, a, x[i], 20, -373897302);
      a = gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = gg(b, c, d, a, x[i + 12], 20, -1926607734);

      a = hh(a, b, c, d, x[i + 5], 4, -378558);
      d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = hh(d, a, b, c, x[i], 11, -358537222);
      c = hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = hh(b, c, d, a, x[i + 2], 23, -995338651);

      a = ii(a, b, c, d, x[i], 6, -198630844);
      d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = ii(b, c, d, a, x[i + 9], 21, -343485551);

      a = safeAdd(a, olda);
      b = safeAdd(b, oldb);
      c = safeAdd(c, oldc);
      d = safeAdd(d, oldd);
    }
    return [a, b, c, d];
  }

  function binl2rstr(input) {
    let output = '';
    const length32 = input.length * 32;
    for (let i = 0; i < length32; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff);
    }
    return output;
  }
  function rstr2binl(input) {
    const output = [];
    output[(input.length >> 2) - 1] = undefined;
    for (let i = 0; i < output.length; i += 1) output[i] = 0;
    const length8 = input.length * 8;
    for (let i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32);
    }
    return output;
  }
  function rstrMD5(s) { return binl2rstr(binlMD5(rstr2binl(s), s.length * 8)); }
  function rstr2hex(input) {
    const hexTab = '0123456789abcdef';
    let output = '';
    for (let i = 0; i < input.length; i += 1) {
      const x = input.charCodeAt(i);
      output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f);
    }
    return output;
  }
  function str2rstrUTF8(input) { return unescape(encodeURIComponent(input)); }
  return function (string) { return rstr2hex(rstrMD5(str2rstrUTF8(string))); };
})();

/* ------------------------------------------------------------------ *
 * SHA-256 via the Web Crypto API.
 * ------------------------------------------------------------------ */
const cryptoOK = !!(window.crypto && window.crypto.subtle);

async function sha256hex(str) {
  const bytes = new TextEncoder().encode(str);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/* ------------------------------------------------------------------ *
 * App logic.
 * ------------------------------------------------------------------ */
const evidence = document.getElementById('evidence');
const md5out = document.getElementById('md5out');
const sha256out = document.getElementById('sha256out');
const avalanche = document.getElementById('avalanche');
const tamperNote = document.getElementById('tamperNote');
const computeBtn = document.getElementById('computeBtn');
const tamperBtn = document.getElementById('tamperBtn');

const fileA = document.getElementById('fileA');
const fileB = document.getElementById('fileB');
const compareBtn = document.getElementById('compareBtn');
const compareResult = document.getElementById('compareResult');

let lastMd5 = '';
let lastSha = '';

// Render a hex string one character at a time, highlighting digits that differ
// from prevHex. Returns the count of changed digits.
function renderHex(container, hex, prevHex, changedClass) {
  container.textContent = '';
  let changed = 0;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < hex.length; i += 1) {
    const span = document.createElement('span');
    span.textContent = hex[i];
    if (prevHex && prevHex[i] !== undefined && prevHex[i] !== hex[i]) {
      span.className = changedClass || 'changed';
      changed += 1;
    }
    frag.appendChild(span);
  }
  container.appendChild(frag);
  return changed;
}

// Compute both digests for the evidence text. When highlightPrev is true, the
// new digits are compared against the previous digests (the avalanche effect).
async function computeEvidence(highlightPrev) {
  const text = evidence.value;
  const prevMd5 = highlightPrev ? lastMd5 : null;
  const prevSha = highlightPrev ? lastSha : null;

  const md5hex = md5(text);
  const cMd5 = renderHex(md5out, md5hex, prevMd5);

  let shahex = '';
  let cSha = 0;
  if (cryptoOK) {
    shahex = await sha256hex(text);
    cSha = renderHex(sha256out, shahex, prevSha);
  } else {
    sha256out.textContent = '(SHA-256 unavailable — needs a secure context)';
  }

  lastMd5 = md5hex;
  lastSha = shahex;

  if (highlightPrev) {
    avalanche.hidden = false;
    avalanche.innerHTML =
      'Avalanche effect: a single-character edit changed <strong>' + cMd5 +
      '</strong> of 32 MD5 hex digits and <strong>' + cSha +
      '</strong> of 64 SHA-256 hex digits. There is no &ldquo;close&rdquo; — the fingerprint is rewritten.';
  } else {
    avalanche.hidden = true;
  }
}

// Flip exactly one character of the evidence text to a different character.
function tamperFlip() {
  let text = evidence.value;
  if (text.length === 0) { text = 'evidence'; }
  const i = Math.floor(Math.random() * text.length);
  const c = text[i];
  let nc;
  if (/[a-y]/.test(c)) nc = String.fromCharCode(c.charCodeAt(0) + 1);
  else if (c === 'z') nc = 'a';
  else if (/[A-Y]/.test(c)) nc = String.fromCharCode(c.charCodeAt(0) + 1);
  else if (c === 'Z') nc = 'A';
  else if (/[0-8]/.test(c)) nc = String.fromCharCode(c.charCodeAt(0) + 1);
  else if (c === '9') nc = '0';
  else if (c === ' ') nc = '_';
  else nc = ' ';

  evidence.value = text.slice(0, i) + nc + text.slice(i + 1);

  tamperNote.hidden = false;
  tamperNote.textContent =
    'Tampered: character #' + (i + 1) + ' changed from "' + c + '" to "' + nc +
    '". Recomputing the fingerprints...';

  computeEvidence(true);
}

// Compare File A and File B by SHA-256.
async function compareFiles() {
  compareResult.hidden = false;
  if (!cryptoOK) {
    compareResult.className = 'result mismatch';
    compareResult.textContent = 'SHA-256 is unavailable here — open the tool from http://localhost or file://.';
    return;
  }
  const ha = await sha256hex(fileA.value);
  const hb = await sha256hex(fileB.value);
  let diff = 0;
  for (let i = 0; i < ha.length; i += 1) if (ha[i] !== hb[i]) diff += 1;

  const hashLines =
    '<div class="cmp-hash"><span class="lbl">A:</span> ' + ha + '</div>' +
    '<div class="cmp-hash"><span class="lbl">B:</span> ' + highlightAgainst(hb, ha) + '</div>';

  if (ha === hb) {
    compareResult.className = 'result match';
    compareResult.innerHTML =
      'MATCH — the SHA-256 hashes are identical. File B is a bit-for-bit copy of ' +
      'File A: the untouched original.' + hashLines;
  } else {
    compareResult.className = 'result mismatch';
    compareResult.innerHTML =
      'MISMATCH — the files differ. ' + diff + ' of 64 SHA-256 hex digits do not match, ' +
      'so one of these files was changed (tampered with).' + hashLines;
  }
}

// Return HTML for hex with digits differing from ref wrapped in a changed span.
function highlightAgainst(hex, ref) {
  let out = '';
  for (let i = 0; i < hex.length; i += 1) {
    if (ref[i] !== undefined && ref[i] !== hex[i]) {
      out += '<span class="changed">' + hex[i] + '</span>';
    } else {
      out += hex[i];
    }
  }
  return out;
}

// Wire up events.
document.getElementById('nosecure').hidden = cryptoOK;
evidence.addEventListener('input', () => computeEvidence(false));
computeBtn.addEventListener('click', () => computeEvidence(false));
tamperBtn.addEventListener('click', tamperFlip);
compareBtn.addEventListener('click', compareFiles);

// Initial render.
computeEvidence(false);
