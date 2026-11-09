import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ClassAnalyticsSummary } from '../services/omrGrader';
import { THEME } from '../constants/theme';

interface AnalyticsChartsProps {
  analytics: ClassAnalyticsSummary;
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ analytics }) => {
  return (
    <View style={styles.container}>
      {/* 4 Summary Score Cards */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Sĩ số nộp</Text>
          <Text style={styles.summaryValue}>{analytics.totalStudents} HS</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Điểm TB</Text>
          <Text style={[styles.summaryValue, { color: '#2563EB' }]}>
            {analytics.averageScore}
          </Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Cao nhất</Text>
          <Text style={[styles.summaryValue, { color: '#10B981' }]}>
            {analytics.highestScore}
          </Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Thấp nhất</Text>
          <Text style={[styles.summaryValue, { color: '#EF4444' }]}>
            {analytics.lowestScore}
          </Text>
        </View>
      </View>

      {/* Cognitive Mastery Bars */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="stats-chart" size={16} color="#2563EB" />
          <Text style={styles.cardTitle}>Tỷ lệ đạt theo 3 mức độ nhận thức (Chuẩn 7991)</Text>
        </View>

        {/* Level 1: NB */}
        <View style={styles.barItem}>
          <View style={styles.barLabelRow}>
            <Text style={styles.barName}>Nhận biết (NB)</Text>
            <Text style={styles.barValue}>{analytics.cognitiveMastery.nb}%</Text>
          </View>
          <View style={styles.barTrack}>
            <View
              style={[
                styles.barFill,
                { width: `${analytics.cognitiveMastery.nb}%`, backgroundColor: '#2563EB' },
              ]}
            />
          </View>
        </View>

        {/* Level 2: TH */}
        <View style={styles.barItem}>
          <View style={styles.barLabelRow}>
            <Text style={styles.barName}>Thông hiểu (TH)</Text>
            <Text style={styles.barValue}>{analytics.cognitiveMastery.th}%</Text>
          </View>
          <View style={styles.barTrack}>
            <View
              style={[
                styles.barFill,
                { width: `${analytics.cognitiveMastery.th}%`, backgroundColor: '#10B981' },
              ]}
            />
          </View>
        </View>

        {/* Level 3: VD */}
        <View style={styles.barItem}>
          <View style={styles.barLabelRow}>
            <Text style={styles.barName}>Vận dụng (VD)</Text>
            <Text style={styles.barValue}>{analytics.cognitiveMastery.vd}%</Text>
          </View>
          <View style={styles.barTrack}>
            <View
              style={[
                styles.barFill,
                { width: `${analytics.cognitiveMastery.vd}%`, backgroundColor: '#F59E0B' },
              ]}
            />
          </View>
        </View>
      </View>

      {/* Score Distribution Breakdown */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="pie-chart" size={16} color="#0D9488" />
          <Text style={styles.cardTitle}>Phân bố phổ điểm cả lớp</Text>
        </View>

        <View style={styles.distRow}>
          <View style={[styles.distItem, { borderLeftColor: '#10B981' }]}>
            <Text style={styles.distCount}>{analytics.gradeDistribution.excellent}</Text>
            <Text style={styles.distLabel}>Giỏi (≥8.5đ)</Text>
          </View>
          <View style={[styles.distItem, { borderLeftColor: '#2563EB' }]}>
            <Text style={styles.distCount}>{analytics.gradeDistribution.good}</Text>
            <Text style={styles.distLabel}>Khá (7.0-8.4đ)</Text>
          </View>
          <View style={[styles.distItem, { borderLeftColor: '#F59E0B' }]}>
            <Text style={styles.distCount}>{analytics.gradeDistribution.average}</Text>
            <Text style={styles.distLabel}>TB (5.0-6.9đ)</Text>
          </View>
          <View style={[styles.distItem, { borderLeftColor: '#EF4444' }]}>
            <Text style={styles.distCount}>{analytics.gradeDistribution.poor}</Text>
            <Text style={styles.distLabel}>Yếu (&lt;5.0đ)</Text>
          </View>
        </View>
      </View>

      {/* Deficit Analytics Dashboard (Lỗ hổng kiến thức) */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="alert-circle" size={17} color="#EF4444" />
          <Text style={[styles.cardTitle, { color: '#B91C1C' }]}>
            Phân tích Lỗ hổng kiến thức (Khớp ô Ma trận 7991)
          </Text>
        </View>

        {analytics.deficitAlerts.map((alert, index) => (
          <View key={index} style={styles.alertCard}>
            <View style={styles.alertTop}>
              <View style={styles.alertTopicWrap}>
                <Text style={styles.alertTopic}>{alert.topic}</Text>
                <View style={styles.alertLevelBadge}>
                  <Text style={styles.alertLevelText}>{alert.level}</Text>
                </View>
              </View>
              <View style={styles.failRateBadge}>
                <Text style={styles.failRateText}>{alert.failureRate}% làm sai</Text>
              </View>
            </View>

            <View style={styles.recommendationWrap}>
              <Ionicons name="bulb-outline" size={13} color="#D97706" />
              <Text style={styles.recommendationText}>{alert.recommendation}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 8,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  summaryLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
    marginTop: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  barItem: {
    marginBottom: 8,
  },
  barLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  barName: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '500',
  },
  barValue: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  barTrack: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  distRow: {
    flexDirection: 'row',
    gap: 8,
  },
  distItem: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 6,
    borderLeftWidth: 3,
  },
  distCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  distLabel: {
    fontSize: 9,
    color: '#64748B',
    marginTop: 2,
  },
  alertCard: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  alertTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  alertTopicWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  alertTopic: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#991B1B',
  },
  alertLevelBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  alertLevelText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#475569',
  },
  failRateBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  failRateText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  recommendationWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 6,
  },
  recommendationText: {
    fontSize: 11,
    color: '#475569',
    flex: 1,
    lineHeight: 16,
  },
});
