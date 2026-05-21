import html2pdf from 'html2pdf.js';

export const downloadPDF = async (elementId, filename = 'CV') => {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Element bulunamadı');

  const opt = {
    margin:       [0, 0, 0, 0],
    filename:     `${filename.replace(/[^a-zA-Z0-9ğüşöçıİĞÜŞÖÇ\s]/g, '')}_CV.pdf`,
    image:        { type:'jpeg', quality:0.98 },
    html2canvas:  { scale:2, useCORS:true, logging:false, scrollX:0, scrollY:0 },
    jsPDF:        { unit:'mm', format:'a4', orientation:'portrait' },
    pagebreak:    { mode:['avoid-all','css','legacy'] }
  };

  return html2pdf().set(opt).from(element).save();
};
