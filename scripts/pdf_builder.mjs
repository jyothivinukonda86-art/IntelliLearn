import fs from 'fs';
import path from 'path';

function escapePdfText(str) {
  return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function createPdf(title, subject, chapter, type, sections) {
  // Page dimensions: US Letter 612 x 792 points
  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 45;
  const contentWidth = pageWidth - margin * 2;

  // We can support multiple pages!
  const pages = [];
  let currentCommands = [];
  let currentY = pageHeight - margin;

  function newPage() {
    if (currentCommands.length > 0) {
      pages.push(currentCommands.join('\n'));
    }
    currentCommands = [];
    currentY = pageHeight - margin;

    // Header bar on every page
    currentCommands.push('0.2 0.28 0.45 rg'); // Indigo/navy header
    currentCommands.push(`BT /F2 8 Tf ${margin} ${pageHeight - 28} Td (${escapePdfText(subject.toUpperCase())} - ${escapePdfText(chapter.toUpperCase())}) Tj ET`);
    currentCommands.push(`BT /F1 8 Tf ${pageWidth - margin - 150} ${pageHeight - 28} Td (IntelliLearn Learning Platform) Tj ET`);
    currentCommands.push('0.85 0.88 0.92 RG 0.5 w');
    currentCommands.push(`${margin} ${pageHeight - 34} m ${pageWidth - margin} ${pageHeight - 34} l S`);

    // Reset Y
    currentY = pageHeight - margin - 15;
  }

  // Start page 1
  newPage();

  // Document Title Banner on Page 1
  currentCommands.push('0.1 0.15 0.3 rg'); // Navy
  currentCommands.push(`BT /F2 18 Tf ${margin} ${currentY} Td (${escapePdfText(title)}) Tj ET`);
  currentY -= 22;

  currentCommands.push('0.3 0.35 0.45 rg');
  currentCommands.push(`BT /F2 11 Tf ${margin} ${currentY} Td (${escapePdfText(type.toUpperCase())}) Tj ET`);
  currentY -= 14;

  currentCommands.push('0.4 0.45 0.55 rg');
  currentCommands.push(`BT /F1 9 Tf ${margin} ${currentY} Td (Subject: ${escapePdfText(subject)}   |   Chapter: ${escapePdfText(chapter)}   |   Academic Year: 2026-2027) Tj ET`);
  currentY -= 15;

  // Divider line
  currentCommands.push('0.3 0.4 0.7 RG 1.5 w');
  currentCommands.push(`${margin} ${currentY} m ${pageWidth - margin} ${currentY} l S`);
  currentY -= 22;

  // Loop through sections
  for (const sec of sections) {
    // Check if we need a new page for heading + at least 3 lines
    if (currentY < 120) {
      newPage();
    }

    // Section Heading
    currentCommands.push('0.15 0.25 0.5 rg'); // Indigo
    currentCommands.push(`BT /F2 12 Tf ${margin} ${currentY} Td (${escapePdfText(sec.heading)}) Tj ET`);
    currentY -= 6;
    currentCommands.push('0.8 0.85 0.9 RG 0.75 w');
    currentCommands.push(`${margin} ${currentY} m ${pageWidth - margin} ${currentY} l S`);
    currentY -= 14;

    // Paragraphs
    if (sec.paragraphs) {
      for (const p of sec.paragraphs) {
        // Simple word wrap
        const words = p.split(' ');
        let line = '';
        currentCommands.push('0.15 0.18 0.22 rg'); // Slate 900
        for (const w of words) {
          if ((line + ' ' + w).length > 84) {
            if (currentY < 55) newPage();
            currentCommands.push(`BT /F1 9.5 Tf ${margin} ${currentY} Td (${escapePdfText(line.trim())}) Tj ET`);
            currentY -= 13;
            line = w;
          } else {
            line += (line ? ' ' : '') + w;
          }
        }
        if (line.trim()) {
          if (currentY < 55) newPage();
          currentCommands.push(`BT /F1 9.5 Tf ${margin} ${currentY} Td (${escapePdfText(line.trim())}) Tj ET`);
          currentY -= 14;
        }
        currentY -= 4;
      }
    }

    // Bullets
    if (sec.bullets) {
      for (const b of sec.bullets) {
        const words = b.split(' ');
        let line = '';
        let isFirstLine = true;
        currentCommands.push('0.2 0.25 0.3 rg');

        for (const w of words) {
          if ((line + ' ' + w).length > 78) {
            if (currentY < 55) newPage();
            const indent = isFirstLine ? margin + 12 : margin + 12;
            if (isFirstLine) {
              currentCommands.push(`0.3 0.45 0.8 rg BT /F2 10 Tf ${margin} ${currentY} Td (*) Tj ET`);
            }
            currentCommands.push(`0.2 0.25 0.3 rg BT /F1 9 Tf ${indent} ${currentY} Td (${escapePdfText(line.trim())}) Tj ET`);
            currentY -= 12;
            line = w;
            isFirstLine = false;
          } else {
            line += (line ? ' ' : '') + w;
          }
        }
        if (line.trim()) {
          if (currentY < 55) newPage();
          const indent = isFirstLine ? margin + 12 : margin + 12;
          if (isFirstLine) {
            currentCommands.push(`0.3 0.45 0.8 rg BT /F2 10 Tf ${margin} ${currentY} Td (*) Tj ET`);
          }
          currentCommands.push(`0.2 0.25 0.3 rg BT /F1 9 Tf ${indent} ${currentY} Td (${escapePdfText(line.trim())}) Tj ET`);
          currentY -= 13;
        }
      }
      currentY -= 6;
    }

    currentY -= 8;
  }

  // Push final page
  if (currentCommands.length > 0) {
    pages.push(currentCommands.join('\n'));
  }

  // Add footer to each page
  for (let i = 0; i < pages.length; i++) {
    const footerCmds = [
      '0.85 0.88 0.92 RG 0.5 w',
      `${margin} 36 m ${pageWidth - margin} 36 l S`,
      '0.5 0.55 0.6 rg',
      `BT /F1 8 Tf ${margin} 25 Td (Intelligent Gamified Learning Platform - Department of Data Science - Team 14) Tj ET`,
      `BT /F2 8 Tf ${pageWidth - margin - 60} 25 Td (Page ${i + 1} of ${pages.length}) Tj ET`,
    ].join('\n');
    pages[i] = pages[i] + '\n' + footerCmds;
  }

  // Assemble PDF Objects
  // 1: Catalog
  // 2: Pages
  // 3..3+N-1: Page objects
  // Font 1: Helvetica (object 3 + N)
  // Font 2: Helvetica-Bold (object 3 + N + 1)
  // Content streams: (objects 3 + N + 2 .. 3 + 2N + 1)
  const numPages = pages.length;
  const font1Obj = 3 + numPages;
  const font2Obj = font1Obj + 1;
  const firstStreamObj = font2Obj + 1;

  const objects = [];

  // 1: Catalog
  objects.push(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj`);

  // 2: Pages
  const pageRefs = [];
  for (let i = 0; i < numPages; i++) {
    pageRefs.push(`${3 + i} 0 R`);
  }
  objects.push(`2 0 obj\n<< /Type /Pages /Kids [${pageRefs.join(' ')}] /Count ${numPages} >>\nendobj`);

  // 3 .. 3 + N - 1: Page Objects
  for (let i = 0; i < numPages; i++) {
    const pageNum = 3 + i;
    const streamNum = firstStreamObj + i;
    objects.push(`${pageNum} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${font1Obj} 0 R /F2 ${font2Obj} 0 R >> >> /Contents ${streamNum} 0 R >>\nendobj`);
  }

  // Fonts
  objects.push(`${font1Obj} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj`);
  objects.push(`${font2Obj} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj`);

  // Streams
  for (let i = 0; i < numPages; i++) {
    const streamNum = firstStreamObj + i;
    const streamContent = pages[i];
    const streamLength = Buffer.byteLength(streamContent, 'utf-8');
    objects.push(`${streamNum} 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream\nendobj`);
  }

  // Calculate byte offsets for xref
  let header = '%PDF-1.4\n%âãÏÓ\n';
  let body = '';
  const offsets = [];

  let currentOffset = Buffer.byteLength(header, 'utf-8');

  for (let i = 0; i < objects.length; i++) {
    offsets.push(currentOffset);
    const objStr = objects[i] + '\n';
    body += objStr;
    currentOffset += Buffer.byteLength(objStr, 'utf-8');
  }

  const xrefOffset = currentOffset;
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 0; i < offsets.length; i++) {
    const offStr = String(offsets[i]).padStart(10, '0');
    xref += `${offStr} 00000 n \n`;
  }

  const trailer = `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(header + body + xref + trailer, 'utf-8');
}

export { createPdf };
