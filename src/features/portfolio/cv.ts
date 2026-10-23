import { jsPDF } from 'jspdf';
import type { PortfolioData } from './types';

// Normalize typographic punctuation for the standard, searchable PDF fonts.
function pdfText(value: string): string {
  return value
    .replace(/[\u2010-\u2015\u2212]/g, '-')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\u2026/g, '...')
    .replace(/\u00a0/g, ' ');
}

/** Generates a real, searchable A4 PDF entirely on the client. */
export function createCvPdf(data: PortfolioData): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const { profile, experience, expertise, projects } = data;
  const margin = 20;
  const width = 170;
  const bottom = 275;
  let y = 25;
  const ink = '#25242c';
  const muted = '#62616c';
  const violet = '#7050d7';
  doc.setProperties({
    title: `${profile.name} - CV`,
    author: profile.name,
    subject: profile.role,
    creator: 'Personal portfolio',
  });

  function font(size = 10, bold = false, color = ink) {
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setFontSize(size);
    doc.setTextColor(color);
  }
  function newPage() {
    doc.addPage();
    y = 23;
    font(9, true, violet);
    const heading = doc.splitTextToSize(
      pdfText(`${profile.name} / ${profile.role}`),
      width,
    ) as string[];
    doc.text(heading[0], margin, 13);
    doc.setDrawColor('#e4e3eb');
    doc.line(margin, 17, margin + width, 17);
  }
  function room(height: number) {
    if (y + height > bottom) newPage();
  }
  function paragraph(
    value: string,
    size = 10,
    color = muted,
    bold = false,
    gap = 3,
  ) {
    font(size, bold, color);
    const lines = doc.splitTextToSize(pdfText(value), width) as string[];
    const lineHeight = size * 0.46;
    for (const line of lines) {
      room(lineHeight);
      font(size, bold, color);
      doc.text(line, margin, y);
      y += lineHeight;
    }
    y += gap;
  }
  function section(title: string, reserve = 25) {
    room(reserve);
    y += 4;
    font(9, true, violet);
    doc.text(title.toUpperCase(), margin, y);
    doc.setDrawColor('#e4e3eb');
    doc.line(margin, y + 3, margin + width, y + 3);
    y += 10;
  }
  function link(label: string, url: string) {
    font(9, false, violet);
    const lines = doc.splitTextToSize(pdfText(label), width) as string[];
    for (const line of lines) {
      room(4.5);
      font(9, false, violet);
      doc.textWithLink(line, margin, y, { url });
      y += 4.5;
    }
    y += 1;
  }

  paragraph(profile.name, 29, ink, true, 0);
  paragraph(profile.role, 12, violet, false, 3);
  paragraph(profile.location, 9, muted, false, 1);
  link(profile.email, `mailto:${profile.email}`);
  for (const social of profile.socials)
    link(`${social.label}: ${social.url}`, social.url);
  if (profile.about.length) {
    section('Profile');
    for (const text of profile.about) paragraph(text, 10, muted, false, 2);
  }
  if (expertise.length) {
    section('Technical expertise');
    for (const item of expertise) {
      room(15);
      paragraph(item.title, 10, ink, true, 0);
      paragraph(item.skills.join(' / '), 9, muted, false, 3);
    }
  }
  if (experience.length) {
    section('Experience', 35);
    for (const item of experience) {
      room(31);
      paragraph(`${item.role} | ${item.company}`, 11, ink, true, 0);
      paragraph(
        [item.period, item.location].filter(Boolean).join(' | '),
        8.5,
        violet,
        false,
        2,
      );
      paragraph(item.description, 9.5, muted, false, 1);
      if (item.tags.length)
        paragraph(item.tags.join(' / '), 8, muted, false, 4);
    }
  }
  if (data.education?.length) {
    section('Education', 36);
    for (const item of data.education) {
      room(24);
      paragraph(item.qualification, 11, ink, true, 0);
      paragraph(item.institution, 9.5, muted, false, 0);
      paragraph(
        [item.location, item.period].filter(Boolean).join(' | '),
        8.5,
        muted,
        false,
        4,
      );
    }
  }
  if (projects.length) {
    if (y > 155) newPage();
    section('Selected projects', 35);
    for (const project of projects) {
      room(30);
      paragraph(`${project.name} | ${project.year}`, 11, ink, true, 0);
      paragraph(project.role, 8.5, violet, false, 2);
      paragraph(project.description, 9.5, muted, false, 1);
      if (project.tags.length)
        paragraph(project.tags.join(' / '), 8, muted, false, 1);
      if (project.links.live) link(project.links.live, project.links.live);
      if (project.links.source)
        link(project.links.source, project.links.source);
      y += 5;
    }
  }
  const pages = doc.getNumberOfPages();
  for (let page = 1; page <= pages; page++) {
    doc.setPage(page);
    doc.setDrawColor('#e4e3eb');
    doc.line(margin, 282, margin + width, 282);
    font(8, false, muted);
    doc.text(pdfText(profile.name), margin, 288);
    doc.text(`${page} / ${pages}`, margin + width, 288, { align: 'right' });
  }
  return doc;
}
