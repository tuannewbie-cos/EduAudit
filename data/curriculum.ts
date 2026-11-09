export interface CurriculumTopic {
  id: string;
  grade: number;
  bookId: 'kntt' | 'cd' | 'ctst';
  chapterName: string;
  topicName: string;
  defaultQuestions: {
    nb: number; // Nhận biết
    th: number; // Thông hiểu
    vd: number; // Vận dụng
  };
  weightPercent: number;
  description: string;
}

export const HIGH_SCHOOL_MATH_CURRICULUM: CurriculumTopic[] = [
  // ================= LỚP 12 =================
  {
    id: 'g12_kntt_c1',
    grade: 12,
    bookId: 'kntt',
    chapterName: 'Chương I. Ứng dụng đạo hàm để khảo sát hàm số',
    topicName: 'Tính đơn điệu, cực trị, GTLN - GTNN & tiệm cận',
    defaultQuestions: { nb: 3, th: 2, vd: 2 },
    weightPercent: 30,
    description: 'Bảng biến thiên, đồ thị hàm số đa thức, phân thức bậc nhất/bậc nhất, bài toán thực tế tối ưu',
  },
  {
    id: 'g12_kntt_c2',
    grade: 12,
    bookId: 'kntt',
    chapterName: 'Chương II. Tọa độ của vectơ trong không gian',
    topicName: 'Vectơ, tọa độ điểm, tích có hướng & ứng dụng Oxyz',
    defaultQuestions: { nb: 3, th: 2, vd: 1 },
    weightPercent: 25,
    description: 'Hệ tọa độ Oxyz, phương trình mặt phẳng, phương trình đường thẳng, mặt cầu',
  },
  {
    id: 'g12_kntt_c3',
    grade: 12,
    bookId: 'kntt',
    chapterName: 'Chương III. Các số đặc trưng mẫu số liệu ghép nhóm',
    topicName: 'Khoảng biến thiên, khoảng tứ phân vị, phương sai, độ lệch chuẩn',
    defaultQuestions: { nb: 2, th: 1, vd: 1 },
    weightPercent: 15,
    description: 'Đo mức độ phân tán của dữ liệu thống kê ghép nhóm thực nghiệm',
  },
  {
    id: 'g12_kntt_c4',
    grade: 12,
    bookId: 'kntt',
    chapterName: 'Chương IV. Nguyên hàm, Tích phân và Ứng dụng',
    topicName: 'Nguyên hàm, tích phân xác định, diện tích hình phẳng, thể tích tròn xoay',
    defaultQuestions: { nb: 2, th: 2, vd: 1 },
    weightPercent: 20,
    description: 'Phương pháp đổi biến, từng phần, bài toán chuyển động và ứng dụng hình học',
  },
  {
    id: 'g12_kntt_c5',
    grade: 12,
    bookId: 'kntt',
    chapterName: 'Chương V. Xác suất có điều kiện',
    topicName: 'Công thức xác suất toàn phần & công thức Bayes',
    defaultQuestions: { nb: 2, th: 1, vd: 1 },
    weightPercent: 10,
    description: 'Sơ đồ hình cây, chẩn đoán y khoa, xác suất thực tế',
  },

  // Cánh Diều Lớp 12
  {
    id: 'g12_cd_c1',
    grade: 12,
    bookId: 'cd',
    chapterName: 'Chương I. Đạo hàm và khảo sát hàm số',
    topicName: 'Sự biến thiên, điểm uốn, đồ thị và cực trị thực tế',
    defaultQuestions: { nb: 3, th: 2, vd: 2 },
    weightPercent: 30,
    description: 'Khảo sát vẽ đồ thị, bài toán kinh tế vi mô và tối ưu chi phí',
  },
  {
    id: 'g12_cd_c2',
    grade: 12,
    bookId: 'cd',
    chapterName: 'Chương II. Hình học giải tích không gian Oxyz',
    topicName: 'Phương pháp tọa độ không gian & ứng dụng mô hình 3D',
    defaultQuestions: { nb: 3, th: 2, vd: 1 },
    weightPercent: 25,
    description: 'Khoảng cách, góc giữa hai mặt phẳng, mô phỏng radar hàng không',
  },
  {
    id: 'g12_cd_c3',
    grade: 12,
    bookId: 'cd',
    chapterName: 'Chương III. Thống kê ghép nhóm',
    topicName: 'Phân tích dữ liệu & các số đặc trưng đo độ phân tán',
    defaultQuestions: { nb: 2, th: 1, vd: 1 },
    weightPercent: 15,
    description: 'Tứ phân vị, phương sai mẫu ghép nhóm',
  },

  // Chân Trời Sáng Tạo Lớp 12
  {
    id: 'g12_ctst_c1',
    grade: 12,
    bookId: 'ctst',
    chapterName: 'Chương I. Ứng dụng đạo hàm khảo sát đồ thị',
    topicName: 'Tính đơn điệu, bài toán cực trị đa thức và phân thức',
    defaultQuestions: { nb: 3, th: 2, vd: 2 },
    weightPercent: 30,
    description: 'Ứng dụng đạo hàm giải bài toán thực tiễn cuộc sống',
  },
  {
    id: 'g12_ctst_c2',
    grade: 12,
    bookId: 'ctst',
    chapterName: 'Chương II. Hệ trục tọa độ không gian',
    topicName: 'Vectơ trong không gian và mô hình hóa tọa độ 3D',
    defaultQuestions: { nb: 3, th: 2, vd: 1 },
    weightPercent: 25,
    description: 'Mặt phẳng, đường thẳng và mặt cầu Oxyz',
  },

  // ================= LỚP 11 =================
  {
    id: 'g11_kntt_c1',
    grade: 11,
    bookId: 'kntt',
    chapterName: 'Chương I. Hàm số lượng giác & PT Lượng giác',
    topicName: 'Giá trị lượng giác, công thức biến đổi, nghiệm phương trình',
    defaultQuestions: { nb: 3, th: 2, vd: 1 },
    weightPercent: 25,
    description: 'Hàm sin, cos, tan, cot và phương trình lượng giác cơ bản',
  },
  {
    id: 'g11_kntt_c2',
    grade: 11,
    bookId: 'kntt',
    chapterName: 'Chương II. Dãy số, Cấp số cộng & Cấp số nhân',
    topicName: 'Số hạng tổng quát, tính tổng n số hạng, bài toán lãi kép',
    defaultQuestions: { nb: 2, th: 2, vd: 1 },
    weightPercent: 20,
    description: 'Quy nạp toán học, mô hình bài toán tăng trưởng',
  },
  {
    id: 'g11_kntt_c3',
    grade: 11,
    bookId: 'kntt',
    chapterName: 'Chương III. Giới hạn & Hàm số liên tục',
    topicName: 'Giới hạn dãy số, giới hạn hàm số tại vô cực và khử vô định',
    defaultQuestions: { nb: 2, th: 2, vd: 1 },
    weightPercent: 20,
    description: 'Định lý hàm số liên tục và chứng minh nghiệm phương trình',
  },
  {
    id: 'g11_kntt_c4',
    grade: 11,
    bookId: 'kntt',
    chapterName: 'Chương IV. Quan hệ song song & vuông góc trong không gian',
    topicName: 'Góc giữa đường thẳng và mặt phẳng, khoảng cách không gian',
    defaultQuestions: { nb: 3, th: 2, vd: 2 },
    weightPercent: 35,
    description: 'Hình chóp, lăng trụ, diện tích thiết diện và góc nhị diện',
  },

  // ================= LỚP 10 =================
  {
    id: 'g10_kntt_c1',
    grade: 10,
    bookId: 'kntt',
    chapterName: 'Chương I. Mệnh đề & Tập hợp',
    topicName: 'Mệnh đề chứa biến, phủ định, tập con, các phép toán tập hợp',
    defaultQuestions: { nb: 3, th: 1, vd: 0 },
    weightPercent: 15,
    description: 'Ký hiệu logic toán học và khoảng đoạn số thực',
  },
  {
    id: 'g10_kntt_c2',
    grade: 10,
    bookId: 'kntt',
    chapterName: 'Chương II. Bất phương trình & Hệ BPT bậc nhất hai ẩn',
    topicName: 'Biểu diễn miền nghiệm trên mặt phẳng và bài toán quy hoạch tuyến tính',
    defaultQuestions: { nb: 2, th: 2, vd: 1 },
    weightPercent: 20,
    description: 'Tìm giá trị lớn nhất, nhỏ nhất của biểu thức F(x, y) trên miền đa giác',
  },
  {
    id: 'g10_kntt_c3',
    grade: 10,
    bookId: 'kntt',
    chapterName: 'Chương III. Hàm số bậc hai & Đồ thị',
    topicName: 'Tọa độ đỉnh parabol, trục đối xứng, dấu tam thức bậc hai',
    defaultQuestions: { nb: 3, th: 2, vd: 1 },
    weightPercent: 25,
    description: 'Ứng dụng quỹ đạo chuyển động ném xiên và bài toán kinh tế',
  },
  {
    id: 'g10_kntt_c4',
    grade: 10,
    bookId: 'kntt',
    chapterName: 'Chương IV. Vectơ & Tọa độ Oxy',
    topicName: 'Tổng hiệu vectơ, tích vô hướng, phương trình đường thẳng, đường tròn',
    defaultQuestions: { nb: 3, th: 2, vd: 2 },
    weightPercent: 40,
    description: 'Hệ thức lượng trong tam giác, khoảng cách và tiếp tuyến',
  },
];
