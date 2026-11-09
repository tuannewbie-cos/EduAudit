import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, {
  Path,
  Line,
  Circle,
  Text as SvgText,
  G,
  Rect,
  Polyline,
} from 'react-native-svg';
import { THEME } from '../constants/theme';

interface SvgDiagramProps {
  type: 'variation_table' | 'cubic_graph' | 'rational_graph' | 'spatial_3d' | 'coordinate_system' | 'none';
  data?: any;
  width?: number;
  height?: number;
}

export const SvgDiagram: React.FC<SvgDiagramProps> = ({
  type,
  data,
  width = 320,
  height = 160,
}) => {
  if (type === 'none') return null;

  if (type === 'variation_table') {
    return (
      <View style={styles.container}>
        <Text style={styles.caption}>Bảng biến thiên hàm số f(x):</Text>
        <Svg width={width} height={height} viewBox="0 0 320 140">
          <Rect x="2" y="2" width="316" height="136" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Header divider lines */}
          <Line x1="50" y1="2" x2="50" y2="138" stroke="#CBD5E1" strokeWidth="1.5" />
          <Line x1="2" y1="36" x2="318" y2="36" stroke="#CBD5E1" strokeWidth="1.5" />
          <Line x1="2" y1="72" x2="318" y2="72" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* Row Labels */}
          <SvgText x="25" y="24" fontSize="13" fontWeight="bold" fill="#334155" textAnchor="middle">x</SvgText>
          <SvgText x="25" y="58" fontSize="13" fontWeight="bold" fill="#334155" textAnchor="middle">y'</SvgText>
          <SvgText x="25" y="110" fontSize="13" fontWeight="bold" fill="#334155" textAnchor="middle">y</SvgText>

          {/* Row 1: x values */}
          <SvgText x="70" y="24" fontSize="11" fill="#475569" textAnchor="middle">-∞</SvgText>
          <SvgText x="140" y="24" fontSize="12" fontWeight="600" fill="#0F172A" textAnchor="middle">-1</SvgText>
          <SvgText x="230" y="24" fontSize="12" fontWeight="600" fill="#0F172A" textAnchor="middle">1</SvgText>
          <SvgText x="295" y="24" fontSize="11" fill="#475569" textAnchor="middle">+∞</SvgText>

          {/* Row 2: y' values */}
          <SvgText x="105" y="58" fontSize="14" fontWeight="bold" fill="#2563EB" textAnchor="middle">+</SvgText>
          <SvgText x="140" y="58" fontSize="12" fill="#64748B" textAnchor="middle">0</SvgText>
          <SvgText x="185" y="58" fontSize="16" fontWeight="bold" fill="#EF4444" textAnchor="middle">-</SvgText>
          <SvgText x="230" y="58" fontSize="12" fill="#64748B" textAnchor="middle">0</SvgText>
          <SvgText x="265" y="58" fontSize="14" fontWeight="bold" fill="#2563EB" textAnchor="middle">+</SvgText>

          {/* Row 3: y arrows & values */}
          {/* Arrow 1: up from -inf to 3 */}
          <Line x1="75" y1="125" x2="135" y2="88" stroke="#2563EB" strokeWidth="2" />
          <Polyline points="128,88 135,88 135,95" fill="none" stroke="#2563EB" strokeWidth="2" />
          <SvgText x="70" y="132" fontSize="11" fill="#64748B" textAnchor="middle">-∞</SvgText>
          <SvgText x="140" y="85" fontSize="12" fontWeight="bold" fill="#0F172A" textAnchor="middle">3</SvgText>

          {/* Arrow 2: down from 3 to -1 */}
          <Line x1="145" y1="88" x2="225" y2="125" stroke="#EF4444" strokeWidth="2" />
          <Polyline points="225,118 225,125 218,125" fill="none" stroke="#EF4444" strokeWidth="2" />
          <SvgText x="230" y="132" fontSize="12" fontWeight="bold" fill="#0F172A" textAnchor="middle">-1</SvgText>

          {/* Arrow 3: up from -1 to +inf */}
          <Line x1="235" y1="125" x2="290" y2="88" stroke="#2563EB" strokeWidth="2" />
          <Polyline points="283,88 290,88 290,95" fill="none" stroke="#2563EB" strokeWidth="2" />
          <SvgText x="295" y="85" fontSize="11" fill="#64748B" textAnchor="middle">+∞</SvgText>
        </Svg>
      </View>
    );
  }

  if (type === 'cubic_graph') {
    return (
      <View style={styles.container}>
        <Text style={styles.caption}>Đồ thị hàm số bậc ba y = f(x):</Text>
        <Svg width={width} height={height} viewBox="0 0 320 160">
          <Rect x="0" y="0" width="320" height="160" rx="6" fill="#F8FAFC" />
          {/* Grid lines */}
          <Line x1="30" y1="40" x2="290" y2="40" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,3" />
          <Line x1="30" y1="120" x2="290" y2="120" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,3" />

          {/* Axes */}
          <Line x1="20" y1="80" x2="300" y2="80" stroke="#475569" strokeWidth="1.5" />
          <Polyline points="295,76 300,80 295,84" fill="none" stroke="#475569" strokeWidth="1.5" />
          <SvgText x="295" y="96" fontSize="12" fontWeight="bold" fill="#475569">x</SvgText>

          <Line x1="160" y1="150" x2="160" y2="15" stroke="#475569" strokeWidth="1.5" />
          <Polyline points="156,20 160,15 164,20" fill="none" stroke="#475569" strokeWidth="1.5" />
          <SvgText x="145" y="24" fontSize="12" fontWeight="bold" fill="#475569">y</SvgText>
          <SvgText x="168" y="94" fontSize="11" fill="#64748B">O</SvgText>

          {/* Cubic curve: y = x^3 - 3x + 1 */}
          <Path
            d="M 60,155 C 85,130 95,45 120,40 C 145,35 175,125 200,120 C 225,115 235,30 260,5"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.5"
          />

          {/* Key Points */}
          {/* Extrema 1: (-1, 3) -> canvas coords (120, 40) */}
          <Circle cx="120" cy="40" r="3.5" fill="#EF4444" />
          <Line x1="120" y1="40" x2="120" y2="80" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2,2" />
          <SvgText x="120" y="94" fontSize="10" fill="#475569" textAnchor="middle">-1</SvgText>
          <Line x1="120" y1="40" x2="160" y2="40" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2,2" />
          <SvgText x="170" y="44" fontSize="10" fill="#475569">3</SvgText>

          {/* Extrema 2: (1, -1) -> canvas coords (200, 120) */}
          <Circle cx="200" cy="120" r="3.5" fill="#EF4444" />
          <Line x1="200" y1="120" x2="200" y2="80" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2,2" />
          <SvgText x="200" y="75" fontSize="10" fill="#475569" textAnchor="middle">1</SvgText>
          <Line x1="200" y1="120" x2="160" y2="120" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2,2" />
          <SvgText x="170" y="124" fontSize="10" fill="#475569">-1</SvgText>

          {/* Y-intercept: (0, 1) -> canvas coords (160, 67) */}
          <Circle cx="160" cy="67" r="3" fill="#2563EB" />
          <SvgText x="148" y="70" fontSize="10" fill="#2563EB">1</SvgText>
        </Svg>
      </View>
    );
  }

  if (type === 'rational_graph') {
    return (
      <View style={styles.container}>
        <Text style={styles.caption}>Đồ thị hàm phân thức y = (2x - 1)/(x + 1):</Text>
        <Svg width={width} height={height} viewBox="0 0 320 150">
          <Rect x="0" y="0" width="320" height="150" rx="6" fill="#F8FAFC" />
          {/* Axes */}
          <Line x1="20" y1="90" x2="300" y2="90" stroke="#475569" strokeWidth="1.5" />
          <Line x1="180" y1="140" x2="180" y2="10" stroke="#475569" strokeWidth="1.5" />
          <SvgText x="295" y="105" fontSize="11" fill="#475569">x</SvgText>
          <SvgText x="185" y="20" fontSize="11" fill="#475569">y</SvgText>

          {/* Asymptotes */}
          {/* Vertical: x = -1 -> x coord = 120 */}
          <Line x1="120" y1="10" x2="120" y2="140" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4,4" />
          <SvgText x="125" y="20" fontSize="10" fontWeight="bold" fill="#EF4444">x = -1 (TCĐ)</SvgText>

          {/* Horizontal: y = 2 -> y coord = 45 */}
          <Line x1="20" y1="45" x2="300" y2="45" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4,4" />
          <SvgText x="235" y="40" fontSize="10" fontWeight="bold" fill="#10B981">y = 2 (TCN)</SvgText>

          {/* Hyperbola branch left */}
          <Path d="M 40,55 Q 100,58 112,140" fill="none" stroke="#2563EB" strokeWidth="2" />
          {/* Hyperbola branch right */}
          <Path d="M 128,10 Q 140,38 290,43" fill="none" stroke="#2563EB" strokeWidth="2" />
        </Svg>
      </View>
    );
  }

  if (type === 'spatial_3d') {
    return (
      <View style={styles.container}>
        <Text style={styles.caption}>Mô hình không gian Oxyz & Mặt phẳng (P):</Text>
        <Svg width={width} height={height} viewBox="0 0 320 150">
          <Rect x="0" y="0" width="320" height="150" rx="6" fill="#F8FAFC" />
          {/* Plane P (parallelogram) */}
          <Path
            d="M 60,110 L 220,110 L 260,50 L 100,50 Z"
            fill="rgba(37, 99, 235, 0.08)"
            stroke="#2563EB"
            strokeWidth="1.5"
          />
          <SvgText x="85" y="70" fontSize="13" fontWeight="bold" fill="#2563EB">(P)</SvgText>

          {/* Point A above plane */}
          <Circle cx="160" cy="25" r="4" fill="#EF4444" />
          <SvgText x="168" y="25" fontSize="12" fontWeight="bold" fill="#EF4444">A (1; 2; 3)</SvgText>

          {/* Distance line perpendicular to plane */}
          <Line x1="160" y1="25" x2="160" y2="80" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3,3" />
          {/* Perpendicular symbol */}
          <Polyline points="160,73 167,73 167,80" fill="none" stroke="#EF4444" strokeWidth="1" />
          <Circle cx="160" cy="80" r="3" fill="#EF4444" />
          <SvgText x="168" y="75" fontSize="10" fill="#EF4444">H (hình chiếu)</SvgText>

          {/* Vector normal n */}
          <Line x1="200" y1="80" x2="200" y2="35" stroke="#0D9488" strokeWidth="2" />
          <Polyline points="196,40 200,35 204,40" fill="none" stroke="#0D9488" strokeWidth="2" />
          <SvgText x="208" y="45" fontSize="11" fontWeight="bold" fill="#0D9488">n⃗ = (1; 2; -2)</SvgText>
        </Svg>
      </View>
    );
  }

  if (type === 'coordinate_system') {
    return (
      <View style={styles.container}>
        <Text style={styles.caption}>Hệ trục không gian Oxyz:</Text>
        <Svg width={width} height={height} viewBox="0 0 320 140">
          <Rect x="0" y="0" width="320" height="140" rx="6" fill="#F8FAFC" />
          {/* Origin O at (130, 80) */}
          {/* Oz up */}
          <Line x1="130" y1="80" x2="130" y2="15" stroke="#475569" strokeWidth="1.5" />
          <Polyline points="126,20 130,15 134,20" fill="none" stroke="#475569" strokeWidth="1.5" />
          <SvgText x="138" y="22" fontSize="11" fontWeight="bold" fill="#475569">z</SvgText>

          {/* Oy right */}
          <Line x1="130" y1="80" x2="280" y2="80" stroke="#475569" strokeWidth="1.5" />
          <Polyline points="275,76 280,80 275,84" fill="none" stroke="#475569" strokeWidth="1.5" />
          <SvgText x="285" y="84" fontSize="11" fontWeight="bold" fill="#475569">y</SvgText>

          {/* Ox down-left 45 deg */}
          <Line x1="130" y1="80" x2="60" y2="130" stroke="#475569" strokeWidth="1.5" />
          <Polyline points="68,130 60,130 63,122" fill="none" stroke="#475569" strokeWidth="1.5" />
          <SvgText x="45" y="132" fontSize="11" fontWeight="bold" fill="#475569">x</SvgText>

          <SvgText x="118" y="95" fontSize="11" fill="#64748B">O</SvgText>

          {/* Vector a */}
          <Line x1="130" y1="80" x2="175" y2="50" stroke="#2563EB" strokeWidth="2" />
          <Polyline points="168,52 175,50 173,58" fill="none" stroke="#2563EB" strokeWidth="2" />
          <SvgText x="180" y="52" fontSize="11" fontWeight="bold" fill="#2563EB">a⃗</SvgText>

          {/* Vector b */}
          <Line x1="130" y1="80" x2="195" y2="105" stroke="#0D9488" strokeWidth="2" />
          <Polyline points="187,105 195,105 192,97" fill="none" stroke="#0D9488" strokeWidth="2" />
          <SvgText x="202" y="112" fontSize="11" fontWeight="bold" fill="#0D9488">b⃗</SvgText>

          {/* Sum vector u */}
          <Line x1="130" y1="80" x2="245" y2="70" stroke="#EF4444" strokeWidth="2.5" />
          <Polyline points="237,70 245,70 241,77" fill="none" stroke="#EF4444" strokeWidth="2.5" />
          <SvgText x="250" y="68" fontSize="12" fontWeight="bold" fill="#EF4444">u⃗ = a⃗ + 2b⃗</SvgText>
        </Svg>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  caption: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
});
