import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { THEME } from '../../constants/theme';

export default function OverviewScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Brand Banner */}
      <View style={styles.topHeader}>
        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <Ionicons name="school" size={24} color="#FFFFFF" />
          </View>
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.brandTitle}>EduAudit</Text>
              <View style={styles.versionBadge}>
                <Text style={styles.versionText}>MVP 1.0</Text>
              </View>
            </View>
            <Text style={styles.brandTagline}>
              Khảo thí thông minh & Quản lý ma trận CV 7991 K12
            </Text>
          </View>
        </View>

        {/* Live Status Pill */}
        <View style={styles.liveStatusRow}>
          <View style={styles.liveDot} />
          <Text style={styles.liveStatusText}>
            Tích hợp SGK Toán 10 - 11 - 12 (KNTT, Cánh diều, CTST)
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        {/* 4 Core Pillars KPI Cards */}
        <View style={styles.kpiGrid}>
          <View style={[styles.kpiCard, { borderLeftColor: '#2563EB' }]}>
            <Text style={styles.kpiValue}>CV 7991</Text>
            <Text style={styles.kpiTitle}>Chuẩn hóa Ma trận</Text>
            <Text style={styles.kpiDesc}>40% NB - 30% TH - 30% VD</Text>
          </View>

          <View style={[styles.kpiCard, { borderLeftColor: '#10B981' }]}>
            <Text style={[styles.kpiValue, { color: '#059669' }]}>SymPy</Text>
            <Text style={styles.kpiTitle}>Kiểm toán toán học</Text>
            <Text style={styles.kpiDesc}>0% Ảo giác số học AI</Text>
          </View>

          <View style={[styles.kpiCard, { borderLeftColor: '#7C3AED' }]}>
            <Text style={[styles.kpiValue, { color: '#7C3AED' }]}>1-Tap</Text>
            <Text style={styles.kpiTitle}>Xuất Word OMML</Text>
            <Text style={styles.kpiDesc}>4 Mã đề trộn + Zalo Share</Text>
          </View>

          <View style={[styles.kpiCard, { borderLeftColor: '#F59E0B' }]}>
            <Text style={[styles.kpiValue, { color: '#D97706' }]}>1s / bài</Text>
            <Text style={styles.kpiTitle}>Smart OMR Camera</Text>
            <Text style={styles.kpiDesc}>Thang điểm Đ/S lũy tiến</Text>
          </View>
        </View>

        {/* Section: 4 Modules Direct Access */}
        <Text style={styles.sectionHeader}>4 MODULE CHÍNH CỦA HỆ THỐNG</Text>

        {/* Module 1 Card */}
        <TouchableOpacity
          style={styles.moduleCard}
          onPress={() => router.push('/parser')}
          activeOpacity={0.8}
        >
          <View style={[styles.moduleIconBox, { backgroundColor: '#EFF6FF' }]}>
            <Ionicons name="cloud-upload" size={24} color="#2563EB" />
          </View>
          <View style={styles.moduleContent}>
            <View style={styles.moduleHeader}>
              <Text style={styles.moduleName}>MODULE 1: Upload & Smart Parser</Text>
              <Ionicons name="arrow-forward" size={16} color="#64748B" />
            </View>
            <Text style={styles.moduleDesc}>
              Nhập PDF/Word hoặc chụp camera tờ đề. Vision OCR bóc tách và cắt giữ nguyên vẹn đồ thị, bảng biến thiên, hình vẽ hình học.
            </Text>
            <View style={styles.tagRow}>
              <Text style={styles.featureTag}>Multi-format</Text>
              <Text style={styles.featureTag}>Vision Crop</Text>
              <Text style={styles.featureTag}>Bộ lọc 3 SGK</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Module 2 Card */}
        <TouchableOpacity
          style={styles.moduleCard}
          onPress={() => router.push('/matrix')}
          activeOpacity={0.8}
        >
          <View style={[styles.moduleIconBox, { backgroundColor: '#ECFDF5' }]}>
            <MaterialCommunityIcons name="matrix" size={24} color="#059669" />
          </View>
          <View style={styles.moduleContent}>
            <View style={styles.moduleHeader}>
              <Text style={styles.moduleName}>MODULE 2: Matrix & Math Audit Engine</Text>
              <Ionicons name="arrow-forward" size={16} color="#64748B" />
            </View>
            <Text style={styles.moduleDesc}>
              Khóa cứng Ma trận Công văn 7991. Tầng kiểm toán SymPy ngầm chống ảo giác toán học và tự động sinh lời giải chi tiết mốc 0,25đ.
            </Text>
            <View style={styles.tagRow}>
              <Text style={styles.featureTag}>Khóa chuẩn 7991</Text>
              <Text style={styles.featureTag}>SymPy Audit</Text>
              <Text style={styles.featureTag}>Chống trùng lặp</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Module 3 Card */}
        <TouchableOpacity
          style={styles.moduleCard}
          onPress={() => router.push('/editor')}
          activeOpacity={0.8}
        >
          <View style={[styles.moduleIconBox, { backgroundColor: '#F5F3FF' }]}>
            <Ionicons name="document-text" size={24} color="#7C3AED" />
          </View>
          <View style={styles.moduleContent}>
            <View style={styles.moduleHeader}>
              <Text style={styles.moduleName}>MODULE 3: Card Micro-Editing & Export</Text>
              <Ionicons name="arrow-forward" size={16} color="#64748B" />
            </View>
            <Text style={styles.moduleDesc}>
              Giao diện Card UI độc lập: Đổi số liệu 1-chạm, đổi dạng bài linh hoạt. Xuất trọn bộ 4 mã đề Word OMML và nút gửi Zalo tức thì.
            </Text>
            <View style={styles.tagRow}>
              <Text style={styles.featureTag}>Card UI</Text>
              <Text style={styles.featureTag}>Đổi số 1-chạm</Text>
              <Text style={styles.featureTag}>Word OMML & Zalo</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Module 4 Card */}
        <TouchableOpacity
          style={styles.moduleCard}
          onPress={() => router.push('/omr')}
          activeOpacity={0.8}
        >
          <View style={[styles.moduleIconBox, { backgroundColor: '#FFFBEB' }]}>
            <Ionicons name="scan-circle" size={26} color="#D97706" />
          </View>
          <View style={styles.moduleContent}>
            <View style={styles.moduleHeader}>
              <Text style={styles.moduleName}>MODULE 4: Smart OMR Camera Scanner</Text>
              <Ionicons name="arrow-forward" size={16} color="#64748B" />
            </View>
            <Text style={styles.moduleDesc}>
              Quét camera thông minh 1s/phiếu qua mã QR định danh. Thang điểm lũy tiến Đúng/Sai và Dashboard phân tích lỗ hổng kiến thức học sinh.
            </Text>
            <View style={styles.tagRow}>
              <Text style={styles.featureTag}>Camera 1s/bài</Text>
              <Text style={styles.featureTag}>Thang lũy tiến</Text>
              <Text style={styles.featureTag}>Báo cáo lỗ hổng</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Guide for Hackathon Pitch */}
        <View style={styles.pitchGuideBox}>
          <View style={styles.pitchGuideHeader}>
            <Ionicons name="trophy-outline" size={18} color="#D97706" />
            <Text style={styles.pitchGuideTitle}>Điểm nhấn thuyết trình Ban Giám Khảo</Text>
          </View>
          <Text style={styles.pitchGuideText}>
            1. <Text style={{ fontWeight: 'bold' }}>Giải quyết "nỗi đau" lớn nhất của giáo viên:</Text> Cắt ghép đề từ tài liệu cũ rất tốn thời gian và dễ lỗi hình ảnh/công thức. EduAudit dùng Vision OCR giữ nguyên vẹn hình vẽ.
          </Text>
          <Text style={styles.pitchGuideText}>
            2. <Text style={{ fontWeight: 'bold' }}>Khóa cứng chuẩn Bộ GD&ĐT 7991:</Text> Tự động kiểm soát tỷ lệ điểm và cấu trúc đề 3 phần mới nhất (TN, Đúng/Sai, Trả lời ngắn).
          </Text>
          <Text style={styles.pitchGuideText}>
            3. <Text style={{ fontWeight: 'bold' }}>Loại bỏ ảo giác AI qua SymPy:</Text> Không phụ thuộc mù quáng vào LLM, code kiểm toán ngầm bảo đảm 100% đáp án toán học chính xác.
          </Text>
          <Text style={styles.pitchGuideText}>
            4. <Text style={{ fontWeight: 'bold' }}>Khép kín vòng lặp khảo thí:</Text> Từ khâu nhập đề, tinh chỉnh, xuất bản cho đến chấm điểm OMR bằng camera và phân tích lỗ hổng học sinh trong cùng 1 ứng dụng.
          </Text>
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
  topHeader: {
    backgroundColor: '#2563EB',
    paddingTop: Platform.OS === 'ios' ? 56 : 36,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  versionBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  versionText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  brandTagline: {
    fontSize: 12,
    color: '#DBEAFE',
    marginTop: 2,
  },
  liveStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 14,
    gap: 6,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#34D399',
  },
  liveStatusText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  body: {
    padding: 16,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  kpiCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    borderLeftWidth: 3.5,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  kpiValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  kpiTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 2,
  },
  kpiDesc: {
    fontSize: 9,
    color: '#64748B',
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  moduleCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  moduleIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleContent: {
    flex: 1,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  moduleName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  moduleDesc: {
    fontSize: 12,
    lineHeight: 17,
    color: '#475569',
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  featureTag: {
    fontSize: 10,
    fontWeight: '600',
    color: '#2563EB',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  pitchGuideBox: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginTop: 10,
    marginBottom: 30,
  },
  pitchGuideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  pitchGuideTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#92400E',
  },
  pitchGuideText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#78350F',
    marginBottom: 6,
  },
});
