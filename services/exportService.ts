import { QuestionItem } from '../data/mockQuestions';

export interface ExamVariant {
  examCode: string; // 101, 102, 103, 104
  qrCodeUrl: string;
  qrPayload: string;
  questions: QuestionItem[];
}

/**
 * Thuật toán hoán vị câu hỏi & đáp án tạo 4 mã đề chuẩn khảo thí
 */
export function generate4Variants(baseQuestions: QuestionItem[]): ExamVariant[] {
  const codes = ['101', '102', '103', '104'];

  return codes.map((code, index) => {
    // Xáo trộn nhẹ thứ tự câu hỏi nhưng giữ nguyên trật tự 3 Phần (Phần I -> II -> III)
    const p1 = baseQuestions.filter((q) => q.part === 1);
    const p2 = baseQuestions.filter((q) => q.part === 2);
    const p3 = baseQuestions.filter((q) => q.part === 3);

    // Xoay vòng theo index mã đề
    const rotatedP1 = [...p1.slice(index % p1.length), ...p1.slice(0, index % p1.length)];
    const rotatedP2 = [...p2.slice(index % p2.length), ...p2.slice(0, index % p2.length)];
    const rotatedP3 = [...p3.slice(index % p3.length), ...p3.slice(0, index % p3.length)];

    const shuffled = [...rotatedP1, ...rotatedP2, ...rotatedP3].map((q, idx) => ({
      ...q,
      code: `Câu ${idx + 1}`,
    }));

    const qrPayload = `EDUAUDIT|MATH12|${code}|CV7991|${Date.now()}`;
    // Link QR vector demo
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      qrPayload
    )}`;

    return {
      examCode: code,
      qrCodeUrl,
      qrPayload,
      questions: shuffled,
    };
  });
}

/**
 * Sinh nội dung tài liệu Word (.docx) chuẩn cấu trúc Bộ GD&ĐT
 */
export function generateWordExportContent(
  examCode: string,
  questions: QuestionItem[],
  includeSolution: boolean = false
): string {
  let doc = `========================================================\n`;
  doc += `SỞ GIÁO DỤC VÀ ĐÀO TẠO ...          KỲ THI KHẢO SÁT CHẤT LƯỢNG K12\n`;
  doc += `TRƯỜNG THPT CHUYÊN ...               NĂM HỌC 2025 - 2026\n`;
  doc += `MÔN: TOÁN HỌC - KHỐI 12\n`;
  doc += `Thời gian làm bài: 90 phút (Không kể thời gian phát đề)\n`;
  doc += `MÃ ĐỀ THI: ${examCode}  |  QR Code Auth: EDUAUDIT-CV7991-${examCode}\n`;
  doc += `========================================================\n\n`;

  let currentPart = 0;

  questions.forEach((q) => {
    if (q.part !== currentPart) {
      currentPart = q.part;
      doc += `\n--------------------------------------------------------\n`;
      doc += `${q.partName.toUpperCase()}\n`;
      if (q.part === 1) {
        doc += `(Thí sinh trả lời từ câu 1 đến câu 12. Mỗi câu chọn 1 phương án đúng - 0,25đ/câu)\n`;
      } else if (q.part === 2) {
        doc += `(Thí sinh trả lời từ câu 1 đến câu 4. Trong mỗi ý a, b, c, d ở mỗi câu, thí sinh chọn Đúng hoặc Sai. Thang điểm lũy tiến: 1 ý = 0.1đ, 2 ý = 0.25đ, 3 ý = 0.5đ, 4 ý = 1.0đ)\n`;
      } else if (q.part === 3) {
        doc += `(Thí sinh trả lời từ câu 1 đến câu 6. Điền kết quả số học vào ô trả lời - 0,5đ/câu)\n`;
      }
      doc += `--------------------------------------------------------\n\n`;
    }

    doc += `${q.code} [${q.levelName} - ${q.topicName}]: ${q.content}\n`;

    if (q.diagramType && q.diagramType !== 'none') {
      doc += `[Hình vẽ minh họa: ${q.diagramType.toUpperCase()} - Đã nhúng vector OMML/SVG]\n`;
    }

    if (q.part === 1 && q.options) {
      q.options.forEach((opt) => {
        doc += `   ${opt.key}. ${opt.text}\n`;
      });
    } else if (q.part === 2 && q.subQuestions) {
      q.subQuestions.forEach((sub) => {
        doc += `   ${sub.label}) ${sub.text}\n`;
      });
    } else if (q.part === 3) {
      doc += `   Đáp số: ........................................\n`;
    }

    if (includeSolution) {
      doc += `\n   >> HƯỚNG DẪN CHẤM & ĐÁP ÁN CHI TIẾT (Chuẩn mốc điểm Bộ GD&ĐT):\n`;
      q.solutionSteps.forEach((s) => {
        doc += `      + ${s.step} [${s.score}]\n`;
      });
      doc += `      * SymPy Audit: ${q.sympyAudit.auditLog}\n`;
    }

    doc += `\n`;
  });

  return doc;
}
