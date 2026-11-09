import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SGK_BOOKS, GRADES, EXAM_FORMATS } from '../../constants/theme';
import { SvgDiagram } from '../../components/SvgDiagram';

export default function SmartParserScreen() {
  const router = useRouter();

  // Selected configurations
  const [selectedGrade, setSelectedGrade] = useState(12);
  const [selectedBook, setSelectedBook] = useState<'kntt' | 'cd' | 'ctst'>('kntt');
  const [selectedFormat, setSelectedFormat] = useState('thpt_new');

  // Input tab: 'upload' | 'camera'
  const [inputTab, setInputTab] = useState<'upload' | 'camera'>('upload');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasParsed, setHasParsed] = useState(true); // default true for instant interactive preview
  const [activePreset, setActivePreset] = useState<'de_khao_sat' | 'de_cuong'>('de_khao_sat');

  const handleSimulateParsing = (preset: 'de_khao_sat' | 'de_cuong') => {
    setActivePreset(preset);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setHasParsed(true);
    }, 900);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Screen Header */}
      <View style={styles.header}>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>MODULE 1</Text>
        </View>
        <Text style={styles.headerTitle}>Upload & Smart Parser</Text>
        <Text style={styles.headerSubtitle}>
          Đầu vào đa phương thức & Vision OCR bóc tách giữ nguyên vẹn hình vẽ
        </Text>
      </View>

      <View style={styles.body}>
        {/* Step 1: Curriculum & Exam Configuration */}
        <View style={styles.configCard}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="options-outline" size={16} color="#2563EB" />
            <Text style={styles.sectionTitle}>1. Cấu hình thông số đầu vào</Text>
          </View>

          {/* Grade Selector */}
          <Text style={styles.subLabel}>Khối lớp:</Text>
          <View style={styles.chipRow}>
            {GRADES.map((g) => (
              <TouchableOpacity
                key={g.id}
                style={[
                  styles.gradeChip,
                  selectedGrade === g.id && styles.activeGradeChip,
                ]}
                onPress={() => setSelectedGrade(g.id)}
              >
                <Text
                  style={[
                    styles.gradeChipText,
                    selectedGrade === g.id && styles.activeGradeChipText,
                  ]}
                >
                  {g.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* SGK Book Selector */}
          <Text style={styles.subLabel}>Bộ sách giáo khoa:</Text>
          <View style={styles.chipRow}>
            {SGK_BOOKS.map((b) => (
              <TouchableOpacity
                key={b.id}
                style={[
                  styles.bookChip,
                  selectedBook === b.id && {
                    borderColor: b.color,
                    backgroundColor: '#EFF6FF',
                  },
                ]}
                onPress={() => setSelectedBook(b.id as any)}
              >
                <Ionicons
                  name={selectedBook === b.id ? 'checkmark-circle' : 'book-outline'}
                  size={14}
                  color={selectedBook === b.id ? b.color : '#64748B'}
                />
                <Text
                  style={[
                    styles.bookChipText,
                    selectedBook === b.id && { color: b.color, fontWeight: '700' },
                  ]}
                >
                  {b.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Exam Structure Selector */}
          <Text style={styles.subLabel}>Cấu trúc đề thi:</Text>
          <View style={styles.formatList}>
            {EXAM_FORMATS.map((f) => (
              <TouchableOpacity
                key={f.id}
                style={[
                  styles.formatCard,
                  selectedFormat === f.id && styles.activeFormatCard,
                ]}
                onPress={() => setSelectedFormat(f.id)}
              >
                <View style={styles.formatHeader}>
                  <Ionicons
                    name={selectedFormat === f.id ? 'radio-button-on' : 'radio-button-off'}
                    size={16}
                    color={selectedFormat === f.id ? '#2563EB' : '#94A3B8'}
                  />
                  <Text
                    style={[
                      styles.formatName,
                      selectedFormat === f.id && styles.activeFormatName,
                    ]}
                  >
                    {f.name}
                  </Text>
                </View>
                <Text style={styles.formatDesc}>{f.structure}</Text>
                <View style={styles.formatTimeRow}>
                  <Ionicons name="time-outline" size={12} color="#64748B" />
                  <Text style={styles.formatTimeText}>Thời gian: {f.time} | 10.0 điểm</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Step 2: Multi-format Input */}
        <View style={styles.configCard}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="file-tray-full-outline" size={16} color="#2563EB" />
            <Text style={styles.sectionTitle}>2. Đầu vào tài liệu hoặc Chụp ảnh</Text>
          </View>

          {/* Tab selector: Upload File vs Smart Camera */}
          <View style={styles.inputTabRow}>
            <TouchableOpacity
              style={[styles.inputTab, inputTab === 'upload' && styles.activeInputTab]}
              onPress={() => setInputTab('upload')}
            >
              <Ionicons
                name="cloud-upload-outline"
                size={16}
                color={inputTab === 'upload' ? '#2563EB' : '#64748B'}
              />
              <Text
                style={[
                  styles.inputTabText,
                  inputTab === 'upload' && styles.activeInputTabText,
                ]}
              >
                Tải file (PDF / Word)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.inputTab, inputTab === 'camera' && styles.activeInputTab]}
              onPress={() => setInputTab('camera')}
            >
              <Ionicons
                name="camera-outline"
                size={16}
                color={inputTab === 'camera' ? '#2563EB' : '#64748B'}
              />
              <Text
                style={[
                  styles.inputTabText,
                  inputTab === 'camera' && styles.activeInputTabText,
                ]}
              >
                Smart Camera Capture
              </Text>
            </TouchableOpacity>
          </View>

          {/* Upload Dropzone View */}
          {inputTab === 'upload' ? (
            <View style={styles.dropzone}>
              <View style={styles.dropzoneIconBox}>
                <Ionicons name="document-attach" size={32} color="#2563EB" />
              </View>
              <Text style={styles.dropzoneTitle}>Kéo thả file đề cương hoặc tài liệu vào đây</Text>
              <Text style={styles.dropzoneSub}>
                Hỗ trợ định dạng PDF, Word (.docx) hoặc ảnh scan từ nhóm Zalo tổ chuyên môn
              </Text>

              {/* Sample Files for 1-Tap Demo */}
              <View style={styles.sampleBox}>
                <Text style={styles.sampleTitle}>Hoặc chọn nhanh tài liệu mẫu có sẵn để chạy thử:</Text>
                <View style={styles.sampleBtnRow}>
                  <TouchableOpacity
                    style={[
                      styles.sampleBtn,
                      activePreset === 'de_khao_sat' && styles.activeSampleBtn,
                    ]}
                    onPress={() => handleSimulateParsing('de_khao_sat')}
                  >
                    <Ionicons name="document-text" size={13} color="#2563EB" />
                    <Text style={styles.sampleBtnText}>De_Khao_Sat_Toan12.pdf</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.sampleBtn,
                      activePreset === 'de_cuong' && styles.activeSampleBtn,
                    ]}
                    onPress={() => handleSimulateParsing('de_cuong')}
                  >
                    <MaterialCommunityIcons name="file-word" size={14} color="#0D9488" />
                    <Text style={[styles.sampleBtnText, { color: '#0D9488' }]}>
                      De_Cuong_On_Tap_K12.docx
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            /* Camera Scanner View */
            <View style={styles.cameraPreviewBox}>
              <View style={styles.cameraReticle}>
                <Ionicons name="scan-outline" size={40} color="#2563EB" />
                <Text style={styles.cameraReticleText}>
                  Khung ngắm nhận diện tờ đề photo / SGK cũ
                </Text>
              </View>
              <TouchableOpacity
                style={styles.snapBtn}
                onPress={() => handleSimulateParsing('de_cuong')}
              >
                <Ionicons name="camera" size={18} color="#FFFFFF" />
                <Text style={styles.snapBtnText}>Chụp ảnh & Trích xuất tức thì</Text>
              </TouchableOpacity>
            </View>
          )}

          {isProcessing && (
            <View style={styles.processingRow}>
              <ActivityIndicator size="small" color="#2563EB" />
              <Text style={styles.processingText}>
                Vision OCR đang nhận diện công thức LaTeX và bóc tách bảng biến thiên...
              </Text>
            </View>
          )}
        </View>

        {/* Step 3: Vision OCR Output & Diagram Preservation Preview */}
        {hasParsed && !isProcessing && (
          <View style={styles.parsedResultCard}>
            <View style={styles.parsedHeader}>
              <View style={styles.parsedStatusRow}>
                <Ionicons name="checkmark-done-circle" size={18} color="#10B981" />
                <Text style={styles.parsedTitle}>
                  Kết quả Vision OCR: Đã bóc tách & Cắt giữ nguyên hình vẽ
                </Text>
              </View>
              <View style={styles.statPill}>
                <Text style={styles.statPillText}>8/8 Câu đạt chuẩn</Text>
              </View>
            </View>

            <Text style={styles.parsedDesc}>
              Hệ thống đã nhận diện 3 Phần đề thi mới, bóc tách ký hiệu toán học và trích xuất thành công các biểu đồ/đồ thị vector không bị lỗi hiển thị.
            </Text>

            {/* Preserved Diagrams Preview */}
            <View style={styles.diagramPreviewWrap}>
              <Text style={styles.diagramPreviewTitle}>
                Hình vẽ & Bảng biến thiên được giữ nguyên vẹn:
              </Text>
              <SvgDiagram type="variation_table" />
              <SvgDiagram type="cubic_graph" />
            </View>

            {/* Next Action: Go to Module 2 / 3 */}
            <TouchableOpacity
              style={styles.proceedBtn}
              onPress={() => router.push('/matrix')}
              activeOpacity={0.8}
            >
              <Text style={styles.proceedBtnText}>
                Chuyển sang Module 2: Khóa Ma trận CV 7991 & Math Audit
              </Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}
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
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 6,
  },
  headerBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#DBEAFE',
    marginTop: 2,
  },
  body: {
    padding: 16,
    gap: 14,
    paddingBottom: 40,
  },
  configCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  subLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
    marginTop: 6,
    marginBottom: 6,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  gradeChip: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeGradeChip: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  gradeChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  activeGradeChipText: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  bookChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  bookChipText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#475569',
  },
  formatList: {
    gap: 8,
  },
  formatCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeFormatCard: {
    backgroundColor: '#EFF6FF',
    borderColor: '#93C5FD',
  },
  formatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  formatName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    flex: 1,
  },
  activeFormatName: {
    color: '#1D4ED8',
    fontWeight: 'bold',
  },
  formatDesc: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 4,
    lineHeight: 16,
  },
  formatTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  formatTimeText: {
    fontSize: 10,
    color: '#64748B',
  },
  inputTabRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 3,
    marginBottom: 12,
  },
  inputTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 6,
  },
  activeInputTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  activeInputTabText: {
    color: '#2563EB',
  },
  dropzone: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#93C5FD',
    backgroundColor: '#F0F7FF',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  dropzoneIconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  dropzoneTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E40AF',
    textAlign: 'center',
  },
  dropzoneSub: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 12,
  },
  sampleBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sampleTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  sampleBtnRow: {
    flexDirection: 'row',
    gap: 8,
  },
  sampleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  activeSampleBtn: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  sampleBtnText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#2563EB',
  },
  cameraPreviewBox: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    padding: 24,
    alignItems: 'center',
  },
  cameraReticle: {
    alignItems: 'center',
    marginVertical: 14,
  },
  cameraReticleText: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 8,
  },
  snapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  snapBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  processingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#EFF6FF',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  processingText: {
    fontSize: 11,
    color: '#1E40AF',
    flex: 1,
  },
  parsedResultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  parsedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  parsedStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  parsedTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#065F46',
    flex: 1,
  },
  statPill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statPillText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#059669',
  },
  parsedDesc: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 17,
    marginBottom: 10,
  },
  diagramPreviewWrap: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  diagramPreviewTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 6,
  },
  proceedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 12,
  },
  proceedBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12.5,
  },
});
