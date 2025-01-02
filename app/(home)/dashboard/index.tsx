import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LineChart, PieChart, BarChart } from "react-native-chart-kit";
import { useThemeStore } from '@/store/themeStore';
import { DateRangeSelector } from '@/components/dashboard/DateRangeSelector';

export default function DashboardScreen() {
  const { colors } = useThemeStore();
  const screenWidth = Dimensions.get('window').width;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
    },
    chartContainer: {
      marginVertical: 16,
      padding: 12,
      borderRadius: 8,
      backgroundColor: colors.card,
    }
  });

  // Example data - replace with actual data from your queries
  const appointmentData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      data: [5, 8, 6, 9, 7, 10, 4],
    }]
  };

  const revenueData = {
    labels: ["Haircut", "Beard", "Color", "Style"],
    data: [0.4, 0.3, 0.2, 0.1]
  };

  const chartConfig = {
    backgroundColor: colors.card,
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    color: (opacity = 1) => {
      const hex = colors.primary.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    },
    labelColor: (opacity = 1) => colors.text,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  return (
    <ScrollView style={styles.container}>
      <DateRangeSelector 
        onRangeChange={(start, end) => {
          // Fetch new data based on date range
        }}
      />

      <View style={styles.chartContainer}>
        <LineChart
          data={appointmentData}
          width={screenWidth - 56}
          height={220}
          chartConfig={chartConfig}
          bezier
        />
      </View>

      <View style={styles.chartContainer}>
        <PieChart
          data={revenueData.labels.map((label, index) => ({
            name: label,
            population: revenueData.data[index] * 100,
            color: colors.primary,
            legendFontColor: colors.text,
          }))}
          width={screenWidth - 56}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="20"
        />
      </View>

      {/* Add more charts as needed */}
    </ScrollView>
  );
}