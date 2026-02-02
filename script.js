const { jsPDF } = window.jspdf;

function clean(text) {
    return text.trim().toUpperCase();
}

function generatePDF() {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const leftMargin = 25;
    const topMargin = 25;

    // ===== DOUBLE BORDER FRAME =====
    doc.setLineWidth(1.5);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

    doc.setLineWidth(0.5);
    doc.rect(14, 14, pageWidth - 28, pageHeight - 28);

    // ===== TITLE =====
    doc.setFont("Times", "Bold");
    doc.setFontSize(22);
    doc.text("DAR ES SALAAM MARITIME INSTITUTE (DMI)", pageWidth / 2, topMargin + 5, { align: "center" });
    doc.text("MARINE ENGINEERING DEPARTMENT", pageWidth / 2, topMargin + 12, { align: "center" });

    // ===== LOGO =====
    const img = new Image();
    img.src = "dmi_logo.png";

    img.onload = function () {
        // Bigger logo
        doc.addImage(img, "PNG", pageWidth / 2 - 35, topMargin + 15, 70, 50);

        // Extra spacing below logo
        let y = topMargin + 80;

        doc.setFontSize(14);

        function drawLine(label, value) {
            doc.setFont("Times", "Bold");
            doc.text(label, leftMargin, y);
            doc.setFont("Times", "Normal");
            doc.text(value, leftMargin + 60, y);
            y += 12;
        }

        drawLine("STUDENT NAME:", clean(document.getElementById("studentName").value));
        drawLine("REGISTRATION NO:", clean(document.getElementById("regNo").value));
        drawLine("PROGRAMME:", clean(document.getElementById("course").value));
        drawLine("SUBJECT NAME:", clean(document.getElementById("moduleName").value) == "CSA" ? "COMPUTER SYSTEM APPLICATION" : "");
        drawLine("SUBJECT CODE:", clean(document.getElementById("moduleCode").value));
        drawLine("NATURE OF WORK:", clean(document.getElementById("natureOfWork").value));
        drawLine("FACILITATOR NAME:", clean(document.getElementById("lecturerName").value));
        drawLine("SUBMISSION DATE:", clean(document.getElementById("submissionDate").value));
        // drawLine("STREAM:", clean(document.getElementById("stream").value));

        doc.save(`${clean(document.getElementById("studentName").value)}_${clean(document.getElementById("moduleName").value)}_${clean(document.getElementById("natureOfWork").value)}_Cover.pdf`);
    };
}
document.getElementById("generateBtn").addEventListener("click", generatePDF);
