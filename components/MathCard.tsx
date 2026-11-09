import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { QuestionItem } from '../data/mockQuestions';
import { SvgDiagram } from './SvgDiagram';
import { THEME } from '../constants/theme';

interface MathCardProps {
  question: QuestionItem;
  onUpdateQuestion: (updated: QuestionItem) => void;
  onRegenerateData: (questionId: string) => void;
  onCrossTypeReplace: (questionId: string) => void;
}

export const MathCard: React.FC<MathCardProps> = ({
  question,
  onUpdateQuestion,
  onRegenerateData,
  onCrossTypeReplace,
}) => {
  const [showSolution, setShowSolution] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editContent, setEditContent] = useState(question.content);

  const levelColor =
    question.level === 'NB'
      ? { bg: '#EFF6FF', text: '#2563EB', border: '#BFDBFE' }
      : question.level === 'TH'
      ? { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0' }
      : { bg: '#FFFBEB', text: '#D97706', border: '#FDE68A' };

  const handleSaveEdit = () => {
    onUpdateQuestion({
      ...question,
      content: editContent,
    });
    setShowEditModal(false);
  };

  return (
    <View style={styles.card}>
      {/* Top Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.codeAndPart}>
          <Text style={styles.questionCode}>{question.code}</Text>
          <View style={[styles.badge, { backgroundColor: levelColor.bg, borderColor: levelColor.border }]}>
            <Text style={[styles.badgeText, { color: levelColor.text }]}>{question.levelName}</Text>
          </View>
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>{question.points}đ</Text>
          </View>
        </View>

        {/* SymPy Audit Chip */}
        <View style={styles.sympyChip}>
          <Ionicons name="shield-checkmark" size={13} color="#059669" />
          <Text style={styles.sympyChipText}>SymPy Verified</Text>
        </View>
      </View>

      {/* Topic Subtitle */}
      <Text style={styles.topicSubtitle}>
        <Ionicons name="book-outline" size={12} color="#64748B" /> {question.topicName}
      </Text>

      {/* Question Content */}
      <Text style={styles.questionContent}>{question.content}</Text>

      {/* SVG Diagram if present */}
      {question.diagramType && question.diagramType !== 'none' && (
        <SvgDiagram type={question.diagramType} data={question.diagramData} />
      )}

      {/* Part 1 Options */}
      {question.part === 1 && question.options && (
        <View style={styles.optionsContainer}>
          {question.options.map((opt) => (
            <View
              key={opt.key}
              style={[
                styles.optionRow,
                opt.isCorrect && styles.correctOptionRow,
              ]}
            >
              <View
                style={[
                  styles.optionCircle,
                  opt.isCorrect && styles.correctOptionCircle,
                ]}
              >
                <Text
                  style={[
                    styles.optionKey,
                    opt.isCorrect && styles.correctOptionKey,
                  ]}
                >
                  {opt.key}
                </Text>
              </View>
              <Text
                style={[
                  styles.optionText,
                  opt.isCorrect && styles.correctOptionText,
                ]}
              >
                {opt.text}
              </Text>
              {opt.isCorrect && (
                <Ionicons name="checkmark-circle" size={16} color="#059669" style={styles.checkIcon} />
              )}
            </View>
          ))}
        </View>
      )}

      {/* Part 2 Sub-questions (True / False) */}
      {question.part === 2 && question.subQuestions && (
        <View style={styles.subQuestionsContainer}>
          <View style={styles.subQuestionHeader}>
            <Text style={styles.subQuestionHeaderCol}>Mệnh đề</Text>
            <Text style={styles.subQuestionHeaderAns}>Đáp án</Text>
          </View>
          {question.subQuestions.map((sub) => (
            <View key={sub.label} style={styles.subQuestionRow}>
              <Text style={styles.subQuestionLabel}>{sub.label})</Text>
              <Text style={styles.subQuestionText}>{sub.text}</Text>
              <View
                style={[
                  styles.tfBadge,
                  sub.isCorrect ? styles.trueBadge : styles.falseBadge,
                ]}
              >
                <Text
                  style={[
                    styles.tfBadgeText,
                    sub.isCorrect ? styles.trueBadgeText : styles.falseBadgeText,
                  ]}
                >
                  {sub.isCorrect ? 'ĐÚNG' : 'SAI'}
                </Text>
              </View>
            </View>
          ))}
          <Text style={styles.progressiveNote}>
            * Thang điểm lũy tiến: 1 ý = 0.1đ | 2 ý = 0.25đ | 3 ý = 0.5đ | 4 ý = 1.0đ
          </Text>
        </View>
      )}

      {/* Part 3 Short Answer */}
      {question.part === 3 && (
        <View style={styles.shortAnswerContainer}>
          <Text style={styles.shortAnswerLabel}>Đáp án số học:</Text>
          <View style={styles.shortAnswerBox}>
            <Text style={styles.shortAnswerValue}>{question.shortAnswer}</Text>
            <Ionicons name="checkmark-done" size={16} color="#059669" />
          </View>
        </View>
      )}

      {/* Action Buttons: 1-Tap Regenerate, Cross-type, Edit */}
      <View style={styles.actionButtonsRow}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.regenBtn]}
          onPress={() => onRegenerateData(question.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="refresh" size={13} color="#2563EB" />
          <Text style={styles.regenBtnText}>Đổi số liệu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.crossTypeBtn]}
          onPress={() => onCrossTypeReplace(question.id)}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="swap-horizontal" size={14} color="#7C3AED" />
          <Text style={styles.crossTypeBtnText}>Đổi dạng câu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.editBtn]}
          onPress={() => {
            setEditContent(question.content);
            setShowEditModal(true);
          }}
          activeOpacity={0.7}
        >
          <Ionicons name="create-outline" size={13} color="#475569" />
          <Text style={styles.editBtnText}>Sửa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.solutionBtn]}
          onPress={() => setShowSolution(!showSolution)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={showSolution ? 'chevron-up' : 'chevron-down'}
            size={13}
            color="#059669"
          />
          <Text style={styles.solutionBtnText}>
            {showSolution ? 'Thu gọn' : 'Lời giải'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Expandable Step-by-Step Solution & SymPy Audit Log */}
      {showSolution && (
        <View style={styles.solutionContainer}>
          <View style={styles.solutionHeader}>
            <Ionicons name="document-text" size={14} color="#059669" />
            <Text style={styles.solutionTitle}>
              Hướng dẫn chấm chi tiết (Chuẩn mốc điểm 0,25đ Bộ GD&ĐT)
            </Text>
          </View>

          {question.solutionSteps.map((s, index) => (
            <View key={index} style={styles.solutionStepRow}>
              <View style={styles.stepBullet}>
                <Text style={styles.stepBulletText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{s.step}</Text>
              <Text style={styles.stepScore}>+{s.score}</Text>
            </View>
          ))}

          {/* SymPy Audit Detail Box */}
          <View style={styles.sympyAuditBox}>
            <View style={styles.sympyAuditHeader}>
              <Ionicons name="calculator" size={13} color="#2563EB" />
              <Text style={styles.sympyAuditTitle}>
                Tầng kiểm toán toán học SymPy ({question.sympyAudit.executionTimeMs}ms)
              </Text>
            </View>
            <Text style={styles.sympyFormula}>
              Kịch bản: {question.sympyAudit.verificationFormula}
            </Text>
            <Text style={styles.sympyLog}>{question.sympyAudit.auditLog}</Text>
          </View>
        </View>
      )}

      {/* In-line Edit Modal */}
      <Modal visible={showEditModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chỉnh sửa nội dung {question.code}</Text>
              <TouchableOpacity onPress={() => setShowEditModal(false)}>
                <Ionicons name="close" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.modalTextInput}
              multiline
              value={editContent}
              onChangeText={setEditContent}
              placeholder="Nhập nội dung câu hỏi..."
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.modalCancelText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveBtn}
                onPress={handleSaveEdit}
              >
                <Text style={styles.modalSaveText}>Lưu thay đổi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  codeAndPart: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  questionCode: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  pointsBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  pointsText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  sympyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  sympyChipText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#059669',
  },
  topicSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 8,
  },
  questionContent: {
    fontSize: 14,
    lineHeight: 21,
    color: '#1E293B',
    marginBottom: 10,
  },
  optionsContainer: {
    gap: 6,
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  correctOptionRow: {
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
  },
  optionCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  correctOptionCircle: {
    backgroundColor: '#22C55E',
  },
  optionKey: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#475569',
  },
  correctOptionKey: {
    color: '#FFFFFF',
  },
  optionText: {
    fontSize: 13,
    color: '#334155',
    flex: 1,
  },
  correctOptionText: {
    fontWeight: '600',
    color: '#166534',
  },
  checkIcon: {
    marginLeft: 6,
  },
  subQuestionsContainer: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  subQuestionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E1',
    marginBottom: 6,
  },
  subQuestionHeaderCol: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  subQuestionHeaderAns: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  subQuestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  subQuestionLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2563EB',
    width: 20,
  },
  subQuestionText: {
    fontSize: 12,
    color: '#334155',
    flex: 1,
  },
  tfBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 6,
  },
  trueBadge: {
    backgroundColor: '#DCFCE7',
  },
  falseBadge: {
    backgroundColor: '#FEE2E2',
  },
  tfBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  trueBadgeText: {
    color: '#16A34A',
  },
  falseBadgeText: {
    color: '#DC2626',
  },
  progressiveNote: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#64748B',
    marginTop: 6,
  },
  shortAnswerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    marginBottom: 10,
    gap: 8,
  },
  shortAnswerLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#166534',
  },
  shortAnswerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  shortAnswerValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#166534',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  regenBtn: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  regenBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2563EB',
  },
  crossTypeBtn: {
    backgroundColor: '#F5F3FF',
    borderColor: '#DDD6FE',
  },
  crossTypeBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#7C3AED',
  },
  editBtn: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  editBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  solutionBtn: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
    marginLeft: 'auto',
  },
  solutionBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#059669',
  },
  solutionContainer: {
    marginTop: 10,
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  solutionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  solutionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#059669',
  },
  solutionStepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 6,
  },
  stepBullet: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepBulletText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#475569',
  },
  stepText: {
    fontSize: 12,
    color: '#334155',
    flex: 1,
    lineHeight: 18,
  },
  stepScore: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  sympyAuditBox: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  sympyAuditHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  sympyAuditTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  sympyFormula: {
    fontSize: 11,
    fontFamily: Platform.select({ ios: 'Courier', default: 'monospace' }),
    color: '#475569',
    marginBottom: 2,
  },
  sympyLog: {
    fontSize: 10,
    color: '#64748B',
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 14,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  modalCancelBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },
  modalCancelText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
  },
  modalSaveBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#2563EB',
  },
  modalSaveText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
