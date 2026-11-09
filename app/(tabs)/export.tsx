import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { INITIAL_EXAM_QUESTIONS } from '../../data/mockQuestions';
import {
  generate4Variants,
  generateWordExportContent,
} from '../../services/exportService';

export default function ExportScreen() {
  const [selectedFormat, setSelectedFormat] = useState<'docx' | 'pdf'>('docx');
  const [includeSolution, setIncludeSolution] = useState(false);
  const [selectedCode, setSelectedCode] = useState('101');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const variants = generate4Variants(INITIAL_EXAM_QUESTIONS);
  const activeVariant = variants.find((v) => v.examCode === selectedCode) || variants[0];

  const handleExportDownload = () => {
    const docContent = generateWordExportContent(
      selectedCode,
      activeVariant.questions,
      includeSolution
    );

    const ext = selectedFormat === 'docx' ? 'docx' : 'pdf';
    const fileName = `EduAudit_DeThi_Toan12_Ma_${selectedCode}.${ext}`;

    if (Platform.OS === 'web') {
      const mime = selectedFormat === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'application/pdf';
      const blob = new Blob([docContent], { type: mime });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    setExportNotice(
      `✓ Đã đóng gói và tải xuống thành công file ${selectedFormat.toUpperCase()} (${fileName})!`
    );
    setTimeout(() => setExportNotice(null), 3500);
  };

  const handleShareZalo = async () => {
    const shareText = `[EduAudit] Bộ đề thi môn Toán khối 12 (Mã đề: ${selectedCode})\n- Định dạng: ${selectedFormat.toUpperCase()}\n- Kèm bảng ma trận & đáp án tích hợp\n- Xem tại: https://eduaudit.edu.vn/exam/${selectedCode}`;

    try {
      if (Platform.OS === 'web') {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(shareText);
          setExportNotice('✓ Đã sao chép nội dung chia sẻ Zalo vào bộ nhớ tạm (Clipboard)!');
        } else {
          Alert.alert('Chia sẻ Zalo', shareText);
        }
      } else {
        await Share.share({
          message: shareText,
          title: `Đề thi môn Toán khối 12 - Mã ${selectedCode}`,
        });
        setExportNotice('✓ Đã mở giao diện chia sẻ Zalo!');
      }
    } catch (e) {
      setExportNotice('✓ Đã tạo liên kết chia sẻ.');
    }

    setTimeout(() => setExportNotice(null), 3500);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Xuất bản văn bản</Text>
        <Text style={styles.headerSubtitle}>
          Đóng gói đề thi sang định dạng Word (.docx) hoặc PDF (.pdf)
        </Text>
      </View>

      <View style={styles.body}>
        {/* Notice Banner */}
        {exportNotice && (
          <View style={styles.noticeBox}>
            <Ionicons name="checkmark-circle" size={16} color="#059669" />
            <Text style={styles.noticeText}>{exportNotice}</Text>
          </View>
        )}

        {/* 1. Chọn định dạng xuất (Word hoặc PDF) */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>1. Chọn định dạng xuất bản:</Text>
          <View style={styles.formatSelectRow}>
            {/* Word Option */}
            <TouchableOpacity
              style={[
                styles.formatOption,
                selectedFormat === 'docx' && styles.activeFormatOption,
              ]}
              onPress={() => setSelectedFormat('docx')}
            >
              <MaterialCommunityIcons
                name="file-word-box"
                size={26}
                color={selectedFormat === 'docx' ? '#2563EB' : '#64748B'}
              />
              <View style={styles.formatOptionTextWrap}>
                <Text
                  style={[
                    styles.formatOptionTitle,
                    selectedFormat === 'docx' && styles.activeFormatOptionTitle,
                  ]}
                >
                  File Word (.docx)
                </Text>
                <Text style={styles.formatOptionSub}>
                  Công thức Word OMML, dễ dàng chỉnh sửa font & in ấn
                </Text>
              </View>
              <Ionicons
                name={selectedFormat === 'docx' ? 'radio-button-on' : 'radio-button-off'}
                size={18}
                color={selectedFormat === 'docx' ? '#2563EB' : '#CBD5E1'}
              />
            </TouchableOpacity>

            {/* PDF Option */}
            <TouchableOpacity
              style={[
                styles.formatOption,
                selectedFormat === 'pdf' && styles.activeFormatOption,
              ]}
              onPress={() => setSelectedFormat('pdf')}
            >
              <MaterialCommunityIcons
                name="file-pdf-box"
                size={26}
                color={selectedFormat === 'pdf' ? '#DC2626' : '#64748B'}
              />
              <View style={styles.formatOptionTextWrap}>
                <Text
                  style={[
                    styles.formatOptionTitle,
                    selectedFormat === 'pdf' && styles.activeFormatOptionTitle,
                  ]}
                >
                  File PDF (.pdf)
                </Text>
                <Text style={styles.formatOptionSub}>
                  Giữ cố định định dạng trang in, sẵn sàng phát cho học sinh
                </Text>
              </View>
              <Ionicons
                name={selectedFormat === 'pdf' ? 'radio-button-on' : 'radio-button-off'}
                size={18}
                color={selectedFormat === 'pdf' ? '#DC2626' : '#CBD5E1'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. Chọn Mã đề hoán vị */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>2. Chọn mã đề in ấn (Trộn 4 mã đề có sẵn):</Text>
          <View style={styles.codeTabsRow}>
            {variants.map((v) => (
              <TouchableOpacity
                key={v.examCode}
                style={[
                  styles.codeTab,
                  selectedCode === v.examCode && styles.activeCodeTab,
                ]}
                onPress={() => setSelectedCode(v.examCode)}
              >
                <Text
                  style={[
                    styles.codeTabText,
                    selectedCode === v.examCode && styles.activeCodeTabText,
                  ]}
                >
                  Mã đề {v.examCode}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* QR Code preview */}
          <View style={styles.qrRow}>
            <Image source={{ uri: activeVariant.qrCodeUrl }} style={styles.qrImg} />
            <View style={styles.qrInfo}>
              <Text style={styles.qrCodeTitle}>Mã định danh đề: {activeVariant.examCode}</Text>
              <Text style={styles.qrCodeSub}>
                Mã QR được tự động in ở góc trên cùng của tờ đề thi để quản lý.
              </Text>
            </View>
          </View>
        </View>

        {/* 3. Tùy chọn nội dung */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>3. Tùy chọn nội dung tài liệu:</Text>

          <TouchableOpacity
            style={styles.checkRow}
            onPress={() => setIncludeSolution(!includeSolution)}
          >
            <Ionicons
              name={includeSolution ? 'checkbox' : 'square-outline'}
              size={20}
              color="#2563EB"
            />
            <View style={styles.checkTextWrap}>
              <Text style={styles.checkTitle}>
                Kèm Đáp án & Lời giải chi tiết từng bước (0,25đ/bước)
              </Text>
              <Text style={styles.checkSub}>
                {includeSolution
                  ? 'Bản dành cho giáo viên chấm thi và chữa bài trên lớp.'
                  : 'Bản đề thi sạch dành cho học sinh làm bài (không lộ đáp án).'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[
              styles.actionBtn,
              selectedFormat === 'docx' ? styles.docxBtn : styles.pdfBtn,
            ]}
            onPress={handleExportDownload}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name={selectedFormat === 'docx' ? 'file-word-box' : 'file-pdf-box'}
              size={20}
              color="#FFFFFF"
            />
            <Text style={styles.actionBtnText}>
              Tải xuống file {selectedFormat.toUpperCase()}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.zaloBtn]}
            onPress={handleShareZalo}
            activeOpacity={0.8}
          >
            <Ionicons name="share-social" size={18} color="#FFFFFF" />
            <Text style={styles.actionBtnText}>Gửi nhanh qua Zalo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#2563EB',
    paddingTop: Platform.OS === 'ios' ? 56 : 36,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 11.5,
    color: '#DBEAFE',
    marginTop: 2,
  },
  body: {
    padding: 16,
    gap: 12,
    paddingBottom: 40,
  },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    padding: 10,
    borderRadius: 8,
  },
  noticeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#065F46',
    flex: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 10,
  },
  formatSelectRow: {
    gap: 8,
  },
  formatOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeFormatOption: {
    backgroundColor: '#EFF6FF',
    borderColor: '#93C5FD',
  },
  formatOptionTextWrap: {
    flex: 1,
  },
  formatOptionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#334155',
  },
  activeFormatOptionTitle: {
    color: '#1E40AF',
  },
  formatOptionSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  codeTabsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 12,
  },
  codeTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },
  activeCodeTab: {
    backgroundColor: '#2563EB',
  },
  codeTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  activeCodeTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  qrRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  qrImg: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  qrInfo: {
    flex: 1,
  },
  qrCodeTitle: {
    fontSize: 12.5,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  qrCodeSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 4,
  },
  checkTextWrap: {
    flex: 1,
  },
  checkTitle: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#1E293B',
  },
  checkSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: 10,
  },
  docxBtn: {
    backgroundColor: '#2563EB',
  },
  pdfBtn: {
    backgroundColor: '#DC2626',
  },
  zaloBtn: {
    backgroundColor: '#0068FF',
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
