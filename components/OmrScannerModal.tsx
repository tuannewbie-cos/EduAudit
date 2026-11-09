import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StudentSubmission } from '../data/mockStudents';

interface OmrScannerModalProps {
  visible: boolean;
  onClose: () => void;
  onScanComplete: (newSubmission: StudentSubmission) => void;
}

export const OmrScannerModal: React.FC<OmrScannerModalProps> = ({
  visible,
  onClose,
  onScanComplete,
}) => {
  const [scanning, setScanning] = useState(false);
  const [scanLaser] = useState(new Animated.Value(0));
  const [scannedResult, setScannedResult] = useState<StudentSubmission | null>(null);

  useEffect(() => {
    if (visible) {
      setScanning(true);
      setScannedResult(null);

      // Start continuous scanning laser animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLaser, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(scanLaser, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Simulate 1.2s auto recognition of student exam paper
      const timer = setTimeout(() => {
        const simulatedStudent: StudentSubmission = {
          id: `hs_${Date.now()}`,
          name: 'Nguyễn Văn An',
          sbd: '120107',
          className: '12A1',
          examCode: '101',
          timestamp: new Date().toLocaleTimeString('vi-VN') + ' - Hôm nay',
          status: 'Scanned',
          scorePart1: 1.0,
          scorePart2: 1.5,
          scorePart3: 1.0,
          totalScore: 8.5,
          cognitiveScores: { nb: 100, th: 85, vd: 70 },
          deficitTopics: [
            {
              topicId: 'g12_kntt_c2',
              topicName: 'Khoảng cách tọa độ Oxyz',
              level: 'VD',
              isPassed: false,
              mistakeDetail: 'Nhầm dấu tọa độ khi tính tích có hướng',
            },
          ],
        };

        setScanning(false);
        setScannedResult(simulatedStudent);
      }, 1400);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const translateY = scanLaser.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 240],
  });

  const handleConfirmAdd = () => {
    if (scannedResult) {
      onScanComplete(scannedResult);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        {/* Top Header */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.topTitle}>AI OMR Smart Scanner</Text>
            <Text style={styles.topSub}>Quét phiếu trả lời tự động (Tốc độ 1s/bài)</Text>
          </View>
          <View style={styles.flashBtn}>
            <Ionicons name="flash" size={20} color="#FBBF24" />
          </View>
        </View>

        {/* Viewfinder Camera Box */}
        <View style={styles.viewfinderContainer}>
          <View style={styles.cameraBox}>
            {/* 4 Corner Markers */}
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />

            {/* QR Code Target Reticle at Top Right */}
            <View style={styles.qrReticle}>
              <Ionicons name="qr-code-outline" size={24} color="#10B981" />
              <Text style={styles.qrReticleText}>QR ĐỊNH DANH ĐỀ</Text>
            </View>

            {/* Animated Laser Scan Line */}
            {scanning && (
              <Animated.View
                style={[
                  styles.laserLine,
                  {
                    transform: [{ translateY }],
                  },
                ]}
              />
            )}

            {/* Scanning Guide / Loading */}
            {scanning && (
              <View style={styles.scanningBadge}>
                <ActivityIndicator size="small" color="#2563EB" />
                <Text style={styles.scanningText}>Đang nhận diện phôi đề 101 & chấm điểm...</Text>
              </View>
            )}

            {/* Scanned Card Overlay */}
            {scannedResult && (
              <View style={styles.resultOverlayCard}>
                <View style={styles.resultHeader}>
                  <Ionicons name="checkmark-circle" size={22} color="#10B981" />
                  <Text style={styles.resultTitle}>Đã chấm xong bài thi!</Text>
                </View>

                <View style={styles.studentInfoGrid}>
                  <View style={styles.infoCol}>
                    <Text style={styles.infoLabel}>Học sinh:</Text>
                    <Text style={styles.infoValue}>{scannedResult.name}</Text>
                  </View>
                  <View style={styles.infoCol}>
                    <Text style={styles.infoLabel}>SBD / Lớp:</Text>
                    <Text style={styles.infoValue}>
                      {scannedResult.sbd} - {scannedResult.className}
                    </Text>
                  </View>
                  <View style={styles.infoCol}>
                    <Text style={styles.infoLabel}>Mã đề QR:</Text>
                    <Text style={[styles.infoValue, { color: '#2563EB', fontWeight: 'bold' }]}>
                      {scannedResult.examCode}
                    </Text>
                  </View>
                </View>

                {/* Score Summary */}
                <View style={styles.scoreRow}>
                  <View style={styles.scoreBox}>
                    <Text style={styles.scoreNum}>{scannedResult.scorePart1}/1.0</Text>
                    <Text style={styles.scoreLbl}>Phần I (TN)</Text>
                  </View>
                  <View style={styles.scoreBox}>
                    <Text style={styles.scoreNum}>{scannedResult.scorePart2}/2.0</Text>
                    <Text style={styles.scoreLbl}>Phần II (Đ/S Lũy tiến)</Text>
                  </View>
                  <View style={styles.scoreBox}>
                    <Text style={styles.scoreNum}>{scannedResult.scorePart3}/1.0</Text>
                    <Text style={styles.scoreLbl}>Phần III (TLN)</Text>
                  </View>
                  <View style={[styles.scoreBox, styles.totalScoreBox]}>
                    <Text style={styles.totalScoreNum}>{scannedResult.totalScore}</Text>
                    <Text style={styles.totalScoreLbl}>TỔNG ĐIỂM</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={handleConfirmAdd}
                >
                  <Text style={styles.confirmBtnText}>Lưu vào Bảng điểm lớp</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Bottom Hints */}
        <View style={styles.bottomBar}>
          <Text style={styles.hintText}>
            💡 Hướng camera vuông góc với phiếu trả lời có mã QR định danh
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 16,
  },
  closeBtn: {
    padding: 8,
  },
  headerTitleWrap: {
    alignItems: 'center',
  },
  topTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  topSub: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },
  flashBtn: {
    padding: 8,
  },
  viewfinderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBox: {
    width: 320,
    height: 380,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: '#2563EB',
  },
  cornerTL: {
    top: 8,
    left: 8,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  cornerTR: {
    top: 8,
    right: 8,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  cornerBL: {
    bottom: 8,
    left: 8,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  cornerBR: {
    bottom: 8,
    right: 8,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  qrReticle: {
    position: 'absolute',
    top: 14,
    right: 14,
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: '#10B981',
    alignItems: 'center',
  },
  qrReticleText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#10B981',
    marginTop: 2,
  },
  laserLine: {
    position: 'absolute',
    top: 60,
    left: 10,
    right: 10,
    height: 2.5,
    backgroundColor: '#EF4444',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },
  scanningBadge: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  scanningText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  resultOverlayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#10B981',
  },
  studentInfoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 10,
  },
  infoCol: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  infoValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 2,
  },
  scoreRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 12,
  },
  scoreBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    padding: 6,
    alignItems: 'center',
  },
  scoreNum: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#334155',
  },
  scoreLbl: {
    fontSize: 8,
    color: '#64748B',
    marginTop: 2,
    textAlign: 'center',
  },
  totalScoreBox: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  totalScoreNum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  totalScoreLbl: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#2563EB',
    marginTop: 2,
  },
  confirmBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  bottomBar: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    alignItems: 'center',
  },
  hintText: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
  },
});
