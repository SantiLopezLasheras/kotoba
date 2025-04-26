import { jsPDF } from "jspdf";
import { Flashcard } from "@/lib/definitions";

export const printFlashcards = (flashcards: Flashcard[]) => {
  const doc = new jsPDF();

  // Layout
  const layout = {
    marginTop: 10,
    marginLeft: 3,
    cardWidth: 100,
    cardHeight: 65,
    gap: 3,
    cardsPerRow: 2,
    cardsPerPage: 8,
    borderRadius: 1,
    padding: 4,
  };

  // Spacing
  const spacing = {
    palabraLineHeight: 6,
    traduccionLineHeight: 6,
    fraseLineHeight: 5,
    notasLineHeight: 5,
    betweenSections: 5,
    afterFrase: 3,
    afterNotas: 3,
  };

  const accentColor = "#f27220";
  const textColor = "#1d1f25";

  const drawFlashcard = (
    flashcard: Flashcard,
    x: number,
    y: number,
    isBack: boolean
  ) => {
    const { cardWidth, cardHeight, borderRadius, padding } = layout;

    // Card background
    doc.setFillColor("#f4f4f4");
    doc.roundedRect(
      x,
      y,
      cardWidth,
      cardHeight,
      borderRadius,
      borderRadius,
      "F"
    );

    // Card border
    doc.setDrawColor(accentColor);
    doc.setLineWidth(0.6);
    doc.roundedRect(x, y, cardWidth, cardHeight, borderRadius, borderRadius);

    doc.setTextColor(textColor);

    if (!isBack) {
      // PARTE FRONTAL

      const centerY = y + cardHeight / 2;
      const maxTextWidth = cardWidth - padding * 2;

      doc.setFontSize(24);
      doc.setFont("Courier", "bold");

      const palabraLines = doc.splitTextToSize(
        flashcard.palabra.toUpperCase(),
        maxTextWidth
      );

      const totalLineHeight = palabraLines.length * spacing.palabraLineHeight;
      let palabraY = centerY - totalLineHeight / 2 + 3;

      palabraLines.forEach((line: string) => {
        doc.text(line, x + cardWidth / 2, palabraY, { align: "center" });
        palabraY += spacing.palabraLineHeight;
      });

      // Línea separadora
      const lineY = palabraY - 2;
      doc.setDrawColor(accentColor);
      doc.setLineWidth(0.4);
      doc.line(x + padding, lineY, x + cardWidth - padding, lineY);

      // Categoría Gramatical
      if (flashcard.categoriaGramatical) {
        doc.setFontSize(8);
        doc.setFont("Courier", "italic");
        doc.text(
          `(${flashcard.categoriaGramatical})`,
          x + cardWidth / 2,
          lineY + 6,
          { align: "center" }
        );
      }
    } else {
      // PARTE TRASERA

      const maxTextWidth = cardWidth - padding * 2;
      const startX = x + padding;
      let currentY = y + padding + 6;

      // Traducción
      if (flashcard.traduccion) {
        const translationLines = doc.splitTextToSize(
          flashcard.traduccion.toUpperCase(),
          maxTextWidth
        );
        doc.setFontSize(14);
        doc.setFont("Courier", "bold");
        translationLines.forEach((line: string) => {
          doc.text(line, x + cardWidth / 2, currentY, { align: "center" });
          currentY += spacing.traduccionLineHeight;
        });
        currentY += spacing.betweenSections;
      }

      // Frase de ejemplo
      if (flashcard.fraseEjemplo) {
        const exampleLines = doc.splitTextToSize(
          flashcard.fraseEjemplo,
          maxTextWidth
        );
        doc.setFontSize(11);
        doc.setFont("Courier", "bolditalic");
        exampleLines.forEach((line: string) => {
          doc.text(line, startX, currentY);
          currentY += spacing.fraseLineHeight;
        });
        currentY += spacing.afterFrase;
      }

      // Notas
      if (flashcard.notas) {
        const noteLines = doc.splitTextToSize(
          `Notas: ${flashcard.notas}`,
          maxTextWidth
        );
        doc.setFontSize(10);
        doc.setFont("Courier", "normal");
        noteLines.forEach((line: string) => {
          doc.text(line, startX, currentY);
          currentY += spacing.notasLineHeight;
        });
        currentY += spacing.afterNotas;
      }
    }
  };

  const renderPage = (cards: Flashcard[], isBack: boolean) => {
    const { marginTop, marginLeft, cardWidth, cardHeight, gap, cardsPerRow } =
      layout;

    // Header
    const headerHeight = marginTop + 10;
    doc.setFontSize(16);
    doc.setTextColor(textColor);
    const title = "KOTOBA - Flashcards to Fluency!";
    const titleWidth = doc.getTextWidth(title);
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    doc.text(title, titleX, marginTop);

    const yOffset = headerHeight;

    // Cards
    for (let i = 0; i < cards.length; i++) {
      const row = Math.floor(i / cardsPerRow);
      const col = i % cardsPerRow;
      const x = marginLeft + col * (cardWidth + gap);
      const y = yOffset + row * (cardHeight + gap);
      drawFlashcard(cards[i], x, y, isBack);
    }
  };

  // FRONT PAGES
  for (let i = 0; i < flashcards.length; i += layout.cardsPerPage) {
    const pageCards = flashcards.slice(i, i + layout.cardsPerPage);
    renderPage(pageCards, false);
    if (i + layout.cardsPerPage < flashcards.length) doc.addPage();
  }

  // BACK PAGES
  for (let i = 0; i < flashcards.length; i += layout.cardsPerPage) {
    doc.addPage();
    const pageCards = flashcards.slice(i, i + layout.cardsPerPage);
    renderPage(pageCards, true);
  }
  // descarga el pdf directamente
  // doc.save("flashcards.pdf");

  // abre el pdf en una pestaña aparte y el usuario puede previsualizarlo y descargarlo si quiere
  const pdfBlob = doc.output("blob");
  const blobUrl = URL.createObjectURL(pdfBlob);
  window.open(blobUrl);
};
