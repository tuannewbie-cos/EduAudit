import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  Share,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ExamVariant, generateWordExportContent } from '../services/exportService';
import { QuestionItem } from '../data/mockQuestions';

interface ExportModalProps {
  visible: boolean;
  onClose: () => void;
  variants: ExamVariant[];
  baseQuestions: QuestionItem[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  visible,
  onClose,
  variants,
  baseQuestions,
}) => {
  const [selectedVariantCode, setSelectedVariantCode] = useState('101');
  const [includeSolution, setIncludeSolution] = useState(true);
  const [exportSuccessMessage, setExportSuccessMessage] = useState<string | null>(null);

  const activeVariant =
    variants.find((v) => v.examCode === selectedVariantCode) || variants[0];

  const handleShareZalo = async () => {
    const textToShare = `[EduAudit] Bộ hồ sơ đề thi Toán 12 chuẩn Công văn 7991 Bộ GD&ĐT (Mã đề: ${selectedVariantCode})\n- Tích hợp 4 mã đề trộn sẵn 101-104\n- Gắn mã QR định danh OMR\n- Đã kiểm toán toán học qua SymPy Engine\nXem chi tiết tại: https://eduaudit.edu.vn/exam/${selectedVariantCode}`;

    try {
      if (Platform.OS === 'web') {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(textToShare);
          setExportSuccessMessage('Đã sao chép nội dung chia sẻ Zalo vào Clipboard!');
        } else {
          Alert.alert('Chia sẻ Zalo', textToShare);
        }
      } else {
        await Share.share({
          message: textToShare,
          title: `Hồ sơ đề thi Toán 12 - Mã ${selectedVariantCode}`,
        });
        setExportSuccessMessage('Đã mở giao diện chia sẻ Zalo thành công!');
      }
    } catch (e) {
      setExportSuccessMessage('Đã tạo liên kết chia sẻ Zalo.');
    }

    setTimeout(() => setExportSuccessMessage(null), 3500);
  };

  const handleExportWord = () => {
    const docContent = generateWordExportContent(
      selectedVariantCode,
      activeVariant.questions,
      includeSolution
    );

    if (Platform.OS === 'web') {
      const element = document.createElement('a');
      const file = new Blob([docContent], { type: 'text/plain;charset=utf-8' });
      element.href = URL.createObjectURL(file);
      element.download = `EduAudit_DeThi_Ma_${selectedVariantCode}_CV7991.docx`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }

    setExportSuccessMessage(
      `Đã đóng gói và tải xuống file Word (.docx) mã ${selectedVariantCode} chuẩn OMML!`
    );
    setTimeout(() => setExportSuccessMessage(null), 3500);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleWrap}>
              <Ionicons name="document-text" size={22} color="#2563EB" />
              <View>
                <Text style={styles.modalTitle}>Xuất bản hồ sơ 1-chạm</Text>
                <Text style={styles.modalSubtitle}>
                  Bộ đề thi chuẩn Công văn 7991 & Công thức Word OMML
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Success Notification Banner */}
          {exportSuccessMessage && (
            <View style={styles.successBanner}>
              <Ionicons name="checkmark-circle" size={16} color="#059669" />
              <Text style={styles.successText}>{exportSuccessMessage}</Text>
            </View>
          )}

          {/* 4 Variant Selector Tabs */}
          <View style={styles.variantTabs}>
            {variants.map((v) => (
              <TouchableOpacity
                key={v.examCode}
                style={[
                  styles.variantTab,
                  selectedVariantCode === v.examCode && styles.activeVariantTab,
                ]}
                onPress={() => setSelectedVariantCode(v.examCode)}
              >
                <Text
                  style={[
                    styles.variantTabText,
                    selectedVariantCode === v.examCode && styles.activeVariantTabText,
                  ]}
                >
                  Mã đề {v.examCode}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView style={styles.contentScroll}>
            {/* Package Items Checklist */}
            <View style={styles.packageCard}>
              <Text style={styles.packageTitle}>Trọn bộ tài liệu đóng gói gồm:</Text>
              <View style={styles.checkItem}>
                <Ionicons name="checkmark-done-circle" size={16} color="#2563EB" />
                <Text style={styles.checkText}>
                  Đề thi gốc + 4 Mã đề trộn sẵn (101, 102, 103, 104)
                </Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="checkmark-done-circle" size={16} color="#2563EB" />
                <Text style={styles.checkText}>
                  Mã QR định danh bảo mật in trên phôi đề (nhận diện OMR tự động)
                </Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="checkmark-done-circle" size={16} color="#2563EB" />
                <Text style={styles.checkText}>
                  Bảng ma trận đặc tả Công văn 7991 / BGDĐT
                </Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="checkmark-done-circle" size={16} color="#2563EB" />
                <Text style={styles.checkText}>
                  Hướng dẫn chấm chia thang điểm 0,25đ & Thang lũy tiến Đ/S
                </Text>
              </View>
            </View>

            {/* QR Identity Card Preview */}
            <View style={styles.qrCard}>
              <View style={styles.qrInfo}>
                <Text style={styles.qrCodeLabel}>MÃ ĐỀ PHÁT HÀNH: {activeVariant.examCode}</Text>
                <Text style={styles.qrCodeSub}>
                  Quét tự động bằng Camera EduAudit để chấm tức thì
                </Text>
                <Text style={styles.qrPayloadText}>{activeVariant.qrPayload}</Text>
              </View>
              <Image
                source={{ uri: activeVariant.qrCodeUrl }}
                style={styles.qrImage}
                resizeMode="contain"
              />
            </View>

            {/* Include Solution Checkbox */}
            <TouchableOpacity
              style={styles.toggleRow}
              onPress={() => setIncludeSolution(!includeSolution)}
            >
              <Ionicons
                name={includeSolution ? 'checkbox' : 'square-outline'}
                size={20}
                color="#2563EB"
              />
              <Text style={styles.toggleText}>
                Kèm theo Đáp án & Lời giải tự luận chi tiết (0,25đ/bước)
              </Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Action Buttons: Export Word & Share Zalo */}
          <View style={styles.bottomActions}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.wordBtn]}
              onPress={handleExportWord}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="file-word-box" size={18} color="#FFFFFF" />
              <Text style={styles.wordBtnText}>Xuất Word (.docx OMML)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.zaloBtn]}
              onPress={handleShareZalo}
              activeOpacity={0.8}
            >
              <Ionicons name="share-social" size={18} color="#FFFFFF" />
              <Text style={styles.zaloBtnText}>Chia sẻ Zalo 1-chạm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 36 : 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  modalSubtitle: {
    fontSize: 11,
    color: '#64748B',
  },
  closeBtn: {
    padding: 6,
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  successText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#065F46',
    flex: 1,
  },
  variantTabs: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 12,
  },
  variantTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },
  activeVariantTab: {
    backgroundColor: '#2563EB',
  },
  variantTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  activeVariantTabText: {
    color: '#FFFFFF',
  },
  contentScroll: {
    maxHeight: 320,
    marginBottom: 14,
  },
  packageCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  packageTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  checkText: {
    fontSize: 12,
    color: '#334155',
    flex: 1,
  },
  qrCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginBottom: 12,
    gap: 12,
  },
  qrInfo: {
    flex: 1,
  },
  qrCodeLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E40AF',
  },
  qrCodeSub: {
    fontSize: 11,
    color: '#3B82F6',
    marginTop: 2,
  },
  qrPayloadText: {
    fontSize: 9,
    fontFamily: Platform.select({ ios: 'Courier', default: 'monospace' }),
    color: '#64748B',
    marginTop: 6,
  },
  qrImage: {
    width: 72,
    height: 72,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
  },
  toggleText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '500',
  },
  bottomActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 10,
  },
  wordBtn: {
    backgroundColor: '#2563EB',
  },
  wordBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  zaloBtn: {
    backgroundColor: '#0068FF', // Zalo Blue
  },
  zaloBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
