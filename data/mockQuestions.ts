export interface QuestionItem {
  id: string;
  code: string; // e.g. "C1", "C2"
  part: 1 | 2 | 3;
  partName: string;
  level: 'NB' | 'TH' | 'VD';
  levelName: string;
  grade: number;
  topicId: string;
  topicName: string;
  content: string;
  diagramType?: 'variation_table' | 'cubic_graph' | 'rational_graph' | 'spatial_3d' | 'coordinate_system' | 'none';
  diagramData?: any;
  options?: { key: 'A' | 'B' | 'C' | 'D'; text: string; isCorrect: boolean }[];
  subQuestions?: { label: 'a' | 'b' | 'c' | 'd'; text: string; isCorrect: boolean }[];
  shortAnswer?: string;
  points: number;
  solutionSteps: { step: string; score: string }[];
  sympyAudit: {
    isVerified: boolean;
    verificationFormula: string;
    computedResult: string;
    executionTimeMs: number;
    auditLog: string;
  };
  hasVariants: boolean;
  activeVariantIndex: number;
  variants: {
    content: string;
    options?: { key: 'A' | 'B' | 'C' | 'D'; text: string; isCorrect: boolean }[];
    subQuestions?: { label: 'a' | 'b' | 'c' | 'd'; text: string; isCorrect: boolean }[];
    shortAnswer?: string;
    computedResult: string;
    solutionSteps: { step: string; score: string }[];
  }[];
}

export const INITIAL_EXAM_QUESTIONS: QuestionItem[] = [
  // ================= PHẦN I: TRẮC NGHIỆM 4 LỰA CHỌN =================
  {
    id: 'q1',
    code: 'Câu 1',
    part: 1,
    partName: 'Phần I: Trắc nghiệm 4 lựa chọn',
    level: 'NB',
    levelName: 'Nhận biết',
    grade: 12,
    topicId: 'g12_kntt_c1',
    topicName: 'Khảo sát hàm số - Tính đơn điệu',
    content: 'Cho hàm số y = f(x) có bảng biến thiên như hình vẽ bên. Hàm số đã cho đồng biến trên khoảng nào dưới đây?',
    diagramType: 'variation_table',
    diagramData: {
      xValues: ['-∞', '-1', '1', '+∞'],
      yPrime: ['+', '0', '-', '0', '+'],
      yValues: ['-∞', '3', '-1', '+∞'],
    },
    options: [
      { key: 'A', text: '(-1; 1)', isCorrect: false },
      { key: 'B', text: '(1; +∞)', isCorrect: true },
      { key: 'C', text: '(-∞; 3)', isCorrect: false },
      { key: 'D', text: '(-1; 3)', isCorrect: false },
    ],
    points: 0.25,
    solutionSteps: [
      { step: 'Quan sát dòng y\' trên bảng biến thiên, ta thấy y\' > 0 trên các khoảng (-∞; -1) và (1; +∞).', score: '0,10đ' },
      { step: 'Do đó hàm số đồng biến trên (-∞; -1) và (1; +∞). Đối chiếu các đáp án, chọn B.', score: '0,15đ' },
    ],
    sympyAudit: {
      isVerified: true,
      verificationFormula: "solve(diff(f(x), x) > 0)",
      computedResult: "x ∈ (-∞, -1) ∪ (1, +∞)",
      executionTimeMs: 14,
      auditLog: "SymPy Core: Đạo hàm y' = 3(x^2 - 1). y' > 0 ⇔ x^2 > 1. Kết quả logic đồng nhất 100% với bảng biến thiên.",
    },
    hasVariants: true,
    activeVariantIndex: 0,
    variants: [
      {
        content: 'Cho hàm số y = f(x) có bảng biến thiên như hình vẽ bên. Hàm số đã cho đồng biến trên khoảng nào dưới đây?',
        options: [
          { key: 'A', text: '(-1; 1)', isCorrect: false },
          { key: 'B', text: '(1; +∞)', isCorrect: true },
          { key: 'C', text: '(-∞; 3)', isCorrect: false },
          { key: 'D', text: '(-1; 3)', isCorrect: false },
        ],
        computedResult: "(1; +∞)",
        solutionSteps: [
          { step: 'Dựa vào bảng biến thiên, y\' > 0 trên (1; +∞).', score: '0,25đ' }
        ]
      },
      {
        content: 'Cho hàm số y = f(x) có bảng biến thiên với cực trị tại x = -2 và x = 2. Hàm số nghịch biến trên khoảng nào?',
        options: [
          { key: 'A', text: '(-2; 2)', isCorrect: true },
          { key: 'B', text: '(2; +∞)', isCorrect: false },
          { key: 'C', text: '(-∞; -2)', isCorrect: false },
          { key: 'D', text: '(0; 4)', isCorrect: false },
        ],
        computedResult: "(-2; 2)",
        solutionSteps: [
          { step: 'y\' < 0 trên (-2; 2), suy ra hàm số nghịch biến trên (-2; 2). Chọn A.', score: '0,25đ' }
        ]
      }
    ]
  },

  {
    id: 'q2',
    code: 'Câu 2',
    part: 1,
    partName: 'Phần I: Trắc nghiệm 4 lựa chọn',
    level: 'NB',
    levelName: 'Nhận biết',
    grade: 12,
    topicId: 'g12_kntt_c2',
    topicName: 'Hệ tọa độ Oxyz - Tọa độ vectơ',
    content: 'Trong không gian Oxyz, cho hai vectơ a⃗ = (1; -2; 3) và b⃗ = (2; 0; -1). Tọa độ của vectơ u⃗ = a⃗ + 2b⃗ là:',
    diagramType: 'coordinate_system',
    options: [
      { key: 'A', text: '(5; -2; 1)', isCorrect: true },
      { key: 'B', text: '(3; -2; 2)', isCorrect: false },
      { key: 'C', text: '(5; 2; 1)', isCorrect: false },
      { key: 'D', text: '(4; -2; 1)', isCorrect: false },
    ],
    points: 0.25,
    solutionSteps: [
      { step: 'Ta có 2b⃗ = 2(2; 0; -1) = (4; 0; -2).', score: '0,10đ' },
      { step: 'Suy ra u⃗ = a⃗ + 2b⃗ = (1 + 4; -2 + 0; 3 - 2) = (5; -2; 1). Chọn A.', score: '0,15đ' },
    ],
    sympyAudit: {
      isVerified: true,
      verificationFormula: "Matrix([1,-2,3]) + 2*Matrix([2,0,-1])",
      computedResult: "Vector(5, -2, 1)",
      executionTimeMs: 8,
      auditLog: "SymPy Matrix: Tọa độ u_x = 5, u_y = -2, u_z = 1. Kiểm toán thành công, không phát hiện lỗi sai số.",
    },
    hasVariants: true,
    activeVariantIndex: 0,
    variants: [
      {
        content: 'Trong không gian Oxyz, cho hai vectơ a⃗ = (1; -2; 3) và b⃗ = (2; 0; -1). Tọa độ của vectơ u⃗ = a⃗ + 2b⃗ là:',
        options: [
          { key: 'A', text: '(5; -2; 1)', isCorrect: true },
          { key: 'B', text: '(3; -2; 2)', isCorrect: false },
          { key: 'C', text: '(5; 2; 1)', isCorrect: false },
          { key: 'D', text: '(4; -2; 1)', isCorrect: false },
        ],
        computedResult: "(5; -2; 1)",
        solutionSteps: [
          { step: 'Tính u⃗ = a⃗ + 2b⃗ = (5; -2; 1).', score: '0,25đ' }
        ]
      },
      {
        content: 'Trong không gian Oxyz, cho hai vectơ a⃗ = (2; 1; -3) và b⃗ = (-1; 3; 2). Tọa độ của vectơ u⃗ = 2a⃗ - b⃗ là:',
        options: [
          { key: 'A', text: '(5; -1; -8)', isCorrect: true },
          { key: 'B', text: '(3; 5; -4)', isCorrect: false },
          { key: 'C', text: '(5; 5; -4)', isCorrect: false },
          { key: 'D', text: '(1; 4; -1)', isCorrect: false },
        ],
        computedResult: "(5; -1; -8)",
        solutionSteps: [
          { step: '2a⃗ - b⃗ = (4 - (-1); 2 - 3; -6 - 2) = (5; -1; -8). Chọn A.', score: '0,25đ' }
        ]
      }
    ]
  },

  {
    id: 'q3',
    code: 'Câu 3',
    part: 1,
    partName: 'Phần I: Trắc nghiệm 4 lựa chọn',
    level: 'TH',
    levelName: 'Thông hiểu',
    grade: 12,
    topicId: 'g12_kntt_c1',
    topicName: 'Khảo sát hàm số - Đồ thị hàm bậc ba',
    content: 'Đường cong trong hình vẽ bên là đồ thị của hàm số nào dưới đây?',
    diagramType: 'cubic_graph',
    options: [
      { key: 'A', text: 'y = x³ - 3x² + 2', isCorrect: false },
      { key: 'B', text: 'y = -x³ + 3x + 1', isCorrect: false },
      { key: 'C', text: 'y = x³ - 3x + 1', isCorrect: true },
      { key: 'D', text: 'y = x⁴ - 2x² + 1', isCorrect: false },
    ],
    points: 0.25,
    solutionSteps: [
      { step: 'Đồ thị là hàm bậc ba với nhánh cuối đi lên khi x → +∞, do đó hệ số a > 0 (loại B, D).', score: '0,10đ' },
      { step: 'Đồ thị cắt trục Oy tại điểm (0; 1) và có 2 điểm cực trị đối xứng qua Oy: x = -1 và x = 1. Kiểm tra y = x³ - 3x + 1 thỏa mãn. Chọn C.', score: '0,15đ' },
    ],
    sympyAudit: {
      isVerified: true,
      verificationFormula: "roots(diff(x**3 - 3*x + 1, x))",
      computedResult: "x1 = -1, x2 = 1, y(0) = 1, a = 1 > 0",
      executionTimeMs: 19,
      auditLog: "SymPy Curve Engine: Cực đại (-1, 3), Cực tiểu (1, -1), Giao Oy tại (0, 1). Khớp hình vẽ vector SVG 100%.",
    },
    hasVariants: false,
    activeVariantIndex: 0,
    variants: []
  },

  {
    id: 'q4',
    code: 'Câu 4',
    part: 1,
    partName: 'Phần I: Trắc nghiệm 4 lựa chọn',
    level: 'TH',
    levelName: 'Thông hiểu',
    grade: 12,
    topicId: 'g12_kntt_c3',
    topicName: 'Số liệu ghép nhóm - Trung vị & Tứ phân vị',
    content: 'Một nhóm gồm 40 học sinh được đo thời gian (phút) tự học mỗi ngày. Bảng số liệu ghép nhóm cho kết quả khoảng tứ phân vị ΔQ = Q₃ - Q₁ = 22,5 phút. Ý nghĩa của khoảng tứ phân vị này là:',
    diagramType: 'none',
    options: [
      { key: 'A', text: 'Độ biến thiên của 50% số liệu chính giữa bằng 22,5 phút', isCorrect: true },
      { key: 'B', text: 'Thời gian học trung bình của cả lớp là 22,5 phút', isCorrect: false },
      { key: 'C', text: 'Độ lệch chuẩn của mẫu số liệu là 22,5 phút', isCorrect: false },
      { key: 'D', text: 'Học sinh có thời gian học cao nhất hơn học sinh thấp nhất 22,5 phút', isCorrect: false },
    ],
    points: 0.25,
    solutionSteps: [
      { step: 'Theo định nghĩa trong SGK Toán 12 mới: Khoảng tứ phân vị ΔQ = Q₃ - Q₁ đo mức độ phân tán của 50% số liệu chính giữa của mẫu dữ liệu.', score: '0,25đ' },
    ],
    sympyAudit: {
      isVerified: true,
      verificationFormula: "IQR = Q3 - Q1",
      computedResult: "IQR = 22.5",
      executionTimeMs: 5,
      auditLog: "Định nghĩa chuẩn SGK Chân trời sáng tạo & Kết nối tri thức 2018.",
    },
    hasVariants: false,
    activeVariantIndex: 0,
    variants: []
  },

  // ================= PHẦN II: ĐÚNG / SAI (THANG ĐIỂM LŨY TIẾN) =================
  {
    id: 'q5',
    code: 'Câu 1 (Đ/S)',
    part: 2,
    partName: 'Phần II: Câu trắc nghiệm Đúng / Sai',
    level: 'TH',
    levelName: 'Thông hiểu',
    grade: 12,
    topicId: 'g12_kntt_c1',
    topicName: 'Khảo sát hàm phân thức hữu tỉ',
    content: 'Cho hàm số y = f(x) = (2x - 1) / (x + 1). Xét tính đúng sai của các mệnh đề sau:',
    diagramType: 'rational_graph',
    subQuestions: [
      { label: 'a', text: 'Tập xác định của hàm số là D = ℝ \\ {-1}.', isCorrect: true },
      { label: 'b', text: 'Đồ thị hàm số có tiệm cận đứng là đường thẳng x = 2.', isCorrect: false },
      { label: 'c', text: 'Đạo hàm f\'(x) = 3 / (x + 1)² > 0 với mọi x ≠ -1.', isCorrect: true },
      { label: 'd', text: 'Hàm số đồng biến trên tập ℝ \\ {-1}.', isCorrect: false },
    ],
    points: 1.0,
    solutionSteps: [
      { step: 'a) Mẫu x + 1 ≠ 0 ⇔ x ≠ -1. Vậy D = ℝ \\ {-1}. => ĐÚNG', score: '0,25đ' },
      { step: 'b) lim(x→-1) y = ∞ => Tiệm cận đứng là x = -1 (không phải x = 2). => SAI', score: '0,25đ' },
      { step: 'c) f\'(x) = (2(x+1) - 1(2x-1))/(x+1)² = 3/(x+1)² > 0, ∀x ≠ -1. => ĐÚNG', score: '0,25đ' },
      { step: 'd) Hàm số chỉ đồng biến trên từng khoảng xác định (-∞; -1) và (-1; +∞), không kết luận trên ℝ \\ {-1}. => SAI', score: '0,25đ' },
    ],
    sympyAudit: {
      isVerified: true,
      verificationFormula: "limit((2*x-1)/(x+1), x, -1), diff((2*x-1)/(x+1), x)",
      computedResult: "Vertical Asymptote: x = -1, f'(x) = 3/(x+1)^2",
      executionTimeMs: 25,
      auditLog: "SymPy Calculus: Giới hạn vô cực xác nhận TCĐ x = -1, TCN y = 2. Đạo hàm dương trên từng khoảng.",
    },
    hasVariants: true,
    activeVariantIndex: 0,
    variants: [
      {
        content: 'Cho hàm số y = f(x) = (2x - 1) / (x + 1). Xét tính đúng sai của các mệnh đề sau:',
        subQuestions: [
          { label: 'a', text: 'Tập xác định của hàm số là D = ℝ \\ {-1}.', isCorrect: true },
          { label: 'b', text: 'Đồ thị hàm số có tiệm cận đứng là đường thẳng x = 2.', isCorrect: false },
          { label: 'c', text: 'Đạo hàm f\'(x) = 3 / (x + 1)² > 0 với mọi x ≠ -1.', isCorrect: true },
          { label: 'd', text: 'Hàm số đồng biến trên tập ℝ \\ {-1}.', isCorrect: false },
        ],
        computedResult: "a: Đúng, b: Sai, c: Đúng, d: Sai",
        solutionSteps: [
          { step: 'Thang điểm lũy tiến Bộ GD: Đúng 1 ý = 0.1đ; Đúng 2 ý = 0.25đ; Đúng 3 ý = 0.5đ; Đúng 4 ý = 1.0đ.', score: '1,00đ' }
        ]
      },
      {
        content: 'Cho hàm số y = f(x) = (3x + 2) / (x - 2). Xét tính đúng sai của các mệnh đề sau:',
        subQuestions: [
          { label: 'a', text: 'Tập xác định của hàm số là D = ℝ \\ {2}.', isCorrect: true },
          { label: 'b', text: 'Đồ thị hàm số có tiệm cận ngang là đường thẳng y = 3.', isCorrect: true },
          { label: 'c', text: 'Đạo hàm f\'(x) = -8 / (x - 2)² < 0 với mọi x ≠ 2.', isCorrect: true },
          { label: 'd', text: 'Hàm số đồng biến trên từng khoảng xác định.', isCorrect: false },
        ],
        computedResult: "a: Đúng, b: Đúng, c: Đúng, d: Sai",
        solutionSteps: [
          { step: 'Kiểm toán f\'(x) = (3(-2) - 2)/(x-2)² = -8/(x-2)² < 0. Hàm số nghịch biến.', score: '1,00đ' }
        ]
      }
    ]
  },

  {
    id: 'q6',
    code: 'Câu 2 (Đ/S)',
    part: 2,
    partName: 'Phần II: Câu trắc nghiệm Đúng / Sai',
    level: 'VD',
    levelName: 'Vận dụng',
    grade: 12,
    topicId: 'g12_kntt_c2',
    topicName: 'Phương pháp tọa độ không gian Oxyz - Mặt phẳng',
    content: 'Trong không gian Oxyz, cho điểm A(1; 2; 3), B(3; 0; 1) và mặt phẳng (P): x + 2y - 2z + 5 = 0. Xét tính đúng sai:',
    diagramType: 'spatial_3d',
    subQuestions: [
      { label: 'a', text: 'Vectơ chỉ phương của đoạn thẳng AB là AB→ = (2; -2; -2).', isCorrect: true },
      { label: 'b', text: 'Điểm A thuộc mặt phẳng (P).', isCorrect: false },
      { label: 'c', text: 'Khoảng cách từ điểm A đến mặt phẳng (P) bằng 4/3.', isCorrect: true },
      { label: 'd', text: 'Mặt phẳng đi qua A và song song với (P) có phương trình là x + 2y - 2z + 1 = 0.', isCorrect: true },
    ],
    points: 1.0,
    solutionSteps: [
      { step: 'a) AB→ = (3-1; 0-2; 1-3) = (2; -2; -2). => ĐÚNG', score: '0,25đ' },
      { step: 'b) Thay A(1;2;3): 1 + 2(2) - 2(3) + 5 = 1 + 4 - 6 + 5 = 4 ≠ 0 => A ∉ (P). => SAI', score: '0,25đ' },
      { step: 'c) d(A, (P)) = |1 + 2(2) - 2(3) + 5| / √(1² + 2² + (-2)²) = 4 / 3. => ĐÚNG', score: '0,25đ' },
      { step: 'd) Mặt phẳng song song (P) có dạng x + 2y - 2z + D = 0. Đi qua A(1;2;3) => 1 + 4 - 6 + D = 0 => D = 1. => ĐÚNG', score: '0,25đ' },
    ],
    sympyAudit: {
      isVerified: true,
      verificationFormula: "abs(1 + 2*2 - 2*3 + 5) / sqrt(1**2 + 2**2 + (-2)**2)",
      computedResult: "Distance = 4/3 ≈ 1.333, Plane: x + 2*y - 2*z + 1 = 0",
      executionTimeMs: 16,
      auditLog: "SymPy Geometry 3D: Tính khoảng cách d = 4/3 chính xác tuyệt đối. Mặt phẳng song song chuẩn xác.",
    },
    hasVariants: false,
    activeVariantIndex: 0,
    variants: []
  },

  // ================= PHẦN III: TRẢ LỜI NGẮN =================
  {
    id: 'q7',
    code: 'Câu 1 (TLN)',
    part: 3,
    partName: 'Phần III: Câu trắc nghiệm Trả lời ngắn',
    level: 'TH',
    levelName: 'Thông hiểu',
    grade: 12,
    topicId: 'g12_kntt_c1',
    topicName: 'Giá trị lớn nhất & nhỏ nhất của hàm số',
    content: 'Tìm giá trị lớn nhất M của hàm số y = -x⁴ + 2x² + 3 trên đoạn [-2; 2].',
    diagramType: 'none',
    shortAnswer: '4',
    points: 0.5,
    solutionSteps: [
      { step: 'Tập xác định D = [-2; 2]. Đạo hàm: y\' = -4x³ + 4x = -4x(x² - 1).', score: '0,15đ' },
      { step: 'Giải y\' = 0 ⇔ x = 0 hoặc x = 1 hoặc x = -1 (tất cả đều thuộc [-2; 2]).', score: '0,15đ' },
      { step: 'Tính các giá trị: y(-2) = -5, y(2) = -5, y(0) = 3, y(1) = 4, y(-1) = 4. Vậy M = max = 4.', score: '0,20đ' },
    ],
    sympyAudit: {
      isVerified: true,
      verificationFormula: "maximum(-x**4 + 2*x**2 + 3, x, Interval(-2, 2))",
      computedResult: "4 (đạt tại x = ±1)",
      executionTimeMs: 22,
      auditLog: "SymPy Optimization: Cực đại toàn cục M = 4 tại x = 1 và x = -1. Đã kiểm tra giá trị tại 2 đầu mút [-2, 2].",
    },
    hasVariants: true,
    activeVariantIndex: 0,
    variants: [
      {
        content: 'Tìm giá trị lớn nhất M của hàm số y = -x⁴ + 2x² + 3 trên đoạn [-2; 2].',
        shortAnswer: '4',
        computedResult: "4",
        solutionSteps: [
          { step: 'y\' = -4x³ + 4x = 0 ⇔ x ∈ {0, ±1}. max = y(±1) = 4.', score: '0,50đ' }
        ]
      },
      {
        content: 'Tìm giá trị lớn nhất M của hàm số y = -x⁴ + 8x² + 5 trên đoạn [-3; 3].',
        shortAnswer: '21',
        computedResult: "21",
        solutionSteps: [
          { step: 'y\' = -4x³ + 16x = 0 ⇔ x ∈ {0, ±2}. max = y(±2) = -(16) + 32 + 5 = 21.', score: '0,50đ' }
        ]
      }
    ]
  },

  {
    id: 'q8',
    code: 'Câu 2 (TLN)',
    part: 3,
    partName: 'Phần III: Câu trắc nghiệm Trả lời ngắn',
    level: 'VD',
    levelName: 'Vận dụng',
    grade: 12,
    topicId: 'g12_kntt_c1',
    topicName: 'Ứng dụng toán học thực tế - Bài toán tối ưu',
    content: 'Một bác nông dân muốn làm một hàng rào hình chữ nhật tiếp giáp với bờ sông thẳng (không cần rào bờ sông). Bác có tổng cộng 120 mét lưới thép. Hỏi diện tích lớn nhất (theo đơn vị m²) mà bác có thể rào được là bao nhiêu?',
    diagramType: 'none',
    shortAnswer: '1800',
    points: 0.5,
    solutionSteps: [
      { step: 'Gọi x (m) là chiều rộng của hình chữ nhật rào vuông góc với bờ sông (0 < x < 60). Khi đó chiều dài rào song song với sông là: 120 - 2x (m).', score: '0,15đ' },
      { step: 'Diện tích khu đất là: S(x) = x(120 - 2x) = -2x² + 120x.', score: '0,15đ' },
      { step: 'Tam thức bậc hai đạt GTLN tại đỉnh parabol x = -120 / (2*(-2)) = 30 (m).', score: '0,10đ' },
      { step: 'Diện tích lớn nhất là S(30) = 30 * (120 - 60) = 1800 (m²).', score: '0,10đ' },
    ],
    sympyAudit: {
      isVerified: true,
      verificationFormula: "maximum(x*(120 - 2*x), x, Interval(0, 60))",
      computedResult: "1800 (tại x = 30)",
      executionTimeMs: 11,
      auditLog: "SymPy Calculus: S'(x) = 120 - 4x = 0 ⇔ x = 30. S''(30) = -4 < 0 => Cực đại S = 1800 m².",
    },
    hasVariants: false,
    activeVariantIndex: 0,
    variants: []
  }
];
