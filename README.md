# EduAudit 🎓
> **Nền tảng tự động hóa khảo thí, quản lý ma trận đề thi chuẩn Công văn 7991 và chấm bài thông minh dành riêng cho giáo viên K12 tại Việt Nam.**

[![Expo Go Compatible](https://img.shields.io/badge/Expo%20Go-Ready-2563EB.svg)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.88-61DAFB.svg)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6.svg)](https://www.typescriptlang.org)
[![CV 7991 BGDDT](https://img.shields.io/badge/Chuẩn-BGD%207991-10B981.svg)](https://moet.gov.vn)

---

## 🌟 TỔNG QUAN DỰ ÁN
**EduAudit** là giải pháp All-in-One giải quyết trọn vẹn vòng lặp khảo thí của giáo viên phổ thông trung học (K12) theo chương trình GDPT 2018:
1. **Đầu vào:** Bóc tách đề thi cũ, sách bài tập, đề cương bằng Vision OCR (cắt giữ nguyên vẹn đồ thị, bảng biến thiên, hình không gian).
2. **Xử lý:** Khóa cứng Ma trận đặc tả theo chuẩn **Công văn 7991/BGDĐT** (40% Nhận biết - 30% Thông hiểu - 30% Vận dụng), tích hợp tầng kiểm toán toán học **SymPy** ngầm triệt tiêu hoàn toàn lỗi ảo giác (hallucination) của AI.
3. **Tinh chỉnh & Xuất bản:** Giao diện Card UI độc lập, đổi số liệu 1-chạm, xuất file Word (.docx) chuẩn công thức OMML (4 mã đề trộn sẵn kèm QR định danh) và nút gửi Zalo tức thì.
4. **Hậu kỳ chấm thi:** AI OMR Camera quét phiếu trả lời học sinh (1 giây/bài), chấm theo **thang điểm lũy tiến** cho câu Đúng/Sai và tự động xuất Báo cáo phân tích lỗ hổng kiến thức của lớp.

---

## 📚 TÍCH HỢP TOÀN BỘ SÁCH GIÁO KHOA CẤP 3 MÔN TOÁN
Dự án đã tích hợp đầy đủ ngân hàng kiến thức và ma trận cho **Toán 10, Toán 11 và Toán 12** xuyên suốt 3 bộ SGK lớn nhất Việt Nam:
- 📘 **Kết nối tri thức với cuộc sống** (KNTT)
- 📗 **Cánh diều** (CD)
- 📙 **Chân trời sáng tạo** (CTST)

### Các mạch chuyên đề Toán 12 trọng tâm:
* **Ứng dụng đạo hàm khảo sát hàm số:** Tính đơn điệu, Cực trị, GTLN-GTNN, Tiệm cận, Đồ thị đa thức & phân thức, Bài toán thực tế tối ưu.
* **Tọa độ không gian Oxyz:** Vectơ trong không gian, Tích có hướng, Mặt phẳng, Đường thẳng, Mặt cầu.
* **Số liệu ghép nhóm:** Khoảng biến thiên, Khoảng tứ phân vị, Phương sai, Độ lệch chuẩn.
* **Nguyên hàm, Tích phân và Ứng dụng:** Diện tích hình phẳng, Thể tích tròn xoay, Ứng dụng vật lý.
* **Xác suất có điều kiện:** Công thức nhân xác suất, Xác suất toàn phần và công thức Bayes.

---

## 🚀 HƯỚNG DẪN CHẠY DEMO TRÊN EXPO GO & WEB

### 1. Cài đặt môi trường
Đảm bảo máy đã cài đặt Node.js (>= 18) và ứng dụng **Expo Go** trên điện thoại (iOS / Android).

```bash
# Clone repository
git clone https://github.com/tuannewbie-cos/EduAudit.git
cd EduAudit

# Cài đặt thư viện
npm install
```

### 2. Chạy ứng dụng trên Expo Go (Mobile)
```bash
npx expo start
```
- Quét mã QR hiển thị trên Terminal bằng:
  * Camera mặc định trên iPhone (iOS)
  * Ứng dụng **Expo Go** trên Android.

### 3. Chạy trực tiếp trên Web Browser
```bash
npx expo start --web
```
Ứng dụng sẽ tự động mở trên trình duyệt tại địa chỉ `http://localhost:8081`.

---

## 🛠️ CHI TIẾT 4 MODULE HỆ THỐNG

### 1. MODULE 1: UPLOAD & SMART PARSER
- **Multi-format Input:** Hỗ trợ kéo thả file PDF, Word (.docx) hoặc chụp ảnh tờ đề giấy bằng Smart Camera Capture.
- **Vision OCR & Diagram Cropper:** Cắt giữ nguyên vẹn đồ thị hàm bậc ba, bảng biến thiên, hình chiếu không gian 3D dạng vector SVG sắc nét mà không bị mất hình như khi dùng ChatGPT thông thường.
- **Curriculum Config:** Chọn Khối lớp (10, 11, 12), Môn học (Toán), Bộ SGK (KNTT / CD / CTST), Cấu trúc đề 3 Phần mới nhất của Bộ GD&ĐT.

### 2. MODULE 2: HYBRID PROCESSING & MATRIX ENGINE
- **Khóa cứng Ma trận CV 7991:** Nghiêm ngặt tỷ lệ 40% NB - 30% TH - 30% VD, kiểm soát tổng điểm 10.0đ.
- **Math Audit Engine (SymPy Core):** Chạy script giải toán độc lập để kiểm chứng đáp án số học, nghiệm phương trình, tiệm cận, loại trừ 100% ảo giác AI.
- **Sinh lời giải chi tiết:** Hướng dẫn chấm từng bước chia mốc điểm 0,25đ chuẩn sư phạm.
- **Duplicate Guard:** Chống trùng lặp câu hỏi giữa các ca kiểm tra lệch giờ.

### 3. MODULE 3: CARD-BASED MICRO-EDITING & 1-TAP EXPORT
- **Card UI:** Thẻ câu hỏi độc lập, dễ dàng cuộn xem trên màn hình di động.
- **1-Tap Regenerate (Đổi số liệu):** Sinh biến số mới có nghiệm nguyên đẹp, tự động kích hoạt Math Audit.
- **Cross-type Replacement (Đổi dạng câu):** Chuyển đổi linh hoạt giữa các chủ đề (Đại số ↔ Hình học) nhưng bảo toàn ma trận.
- **Xuất bản hồ sơ 1 chạm:** Đóng gói đề gốc, 4 mã đề trộn sẵn (**101, 102, 103, 104**) gắn mã QR định danh, file Word (.docx) chuẩn OMML không lỗi font và nút gửi trực tiếp qua Zalo.

### 4. MODULE 4: SMART OMR CAMERA SCANNER & DEFICIT ANALYTICS
- **Quét Camera AI:** Nhận diện phiếu trả lời qua mã QR phôi đề (tốc độ 1 giây/bài).
- **Thang điểm lũy tiến Phần II:** Đúng 1 ý = 0.1đ; 2 ý = 0.25đ; 3 ý = 0.5đ; 4 ý = 1.0đ.
- **Bảng điểm điện tử:** Tự động đồng bộ kết quả học sinh trong lớp.
- **Deficit Analytics Dashboard:** Vẽ biểu đồ chỉ rõ học sinh đang hổng kiến thức ở ô nào trong Ma trận 7991 và đưa ra khuyến nghị ôn tập cụ thể cho giáo viên.

---

## 🎯 ĐIỂM NHẤN DÀNH CHO BAN GIÁM KHẢO HACKATHON
| Thách thức hiện tại của Giáo viên | Giải pháp đột phá của EduAudit |
| :--- | :--- |
| Cắt dán đề cũ bị mất hình vẽ, vỡ đồ thị | **Vision OCR & Diagram Cropper** giữ nguyên đồ thị & bảng biến thiên |
| ChatGPT giải toán hay bị ảo giác sai đáp số | **Tầng kiểm toán SymPy ngầm** giải độc lập, cam kết 0% ảo giác |
| Mất hàng giờ căn chỉnh Ma trận 7991 | **Thuật toán khóa cứng 7991** tự động phân bổ tỷ lệ 40-30-30 |
| Chấm câu Đúng/Sai lũy tiến bằng tay rất mất thì giờ | **Smart OMR Scanner** quét 1s/bài, tính điểm lũy tiến tự động |
| Không biết học sinh hổng kiến thức phần nào | **Deficit Analytics** bóc tách điểm theo đúng từng ô trong Ma trận |

---

## 👥 THÀNH VIÊN NHÓM
* **Project Idea & Engineering:** Đỗ Minh Tuấn (`tuannewbie-cos`)
* **Hackathon Team:** The Nerd Squad

*Made with ❤️ for Vietnamese Teachers & Students.*
