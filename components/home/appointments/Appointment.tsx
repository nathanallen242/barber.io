// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { Appointment as AppointmentInterface } from '@/types/models';
// import { screenDimensions } from '@/utils/screenDimensions';
// const { screenWidth } = screenDimensions;

// interface AppointmentProps {
//   appointment: AppointmentInterface;
//   onEdit?: (id: string) => void;
//   onCancel?: (id: string) => void;
// }

// export default function Appointment({ appointment, onEdit, onCancel }: AppointmentProps) {
//   const { appointment_date } = appointment;
//   const dateObj = new Date(appointment_date);
//   const day = dateObj.getDate();
//   const month = dateObj.toLocaleString('default', { month: 'short' });
//   const time = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

//   return (
//     <View style={styles.card}>
//       <View style={styles.profileSection}>
//         <Image
//           source={require('@/assets/images/pfp.png')}
//           style={styles.profileImage}
//         />
//         <View style={styles.infoContainer}>
//           <Text style={styles.name}>Dr. Marcus Horizon</Text>
//           <Text style={styles.specialty}>Cardiologist</Text>
//           <Text style={styles.time}>{time}</Text>
//         </View>
//       </View>
      
//       <View style={styles.dateSection}>
//         <Text style={styles.day}>{day}</Text>
//         <Text style={styles.month}>{month}</Text>
//       </View>

//       <View style={styles.actions}>
//         <TouchableOpacity style={styles.actionButton} onPress={() => onEdit?.(appointment.id)}>
//           <Ionicons name="videocam-outline" size={24} color="#4CAF50" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton} onPress={() => onCancel?.(appointment.id)}>
//           <Ionicons name="close" size={24} color="#FF5252" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton}>
//           <Ionicons name="calendar-outline" size={24} color="#2196F3" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#00BCD4',
//     borderRadius: 15,
//     padding: 15,
//     marginHorizontal: 15,
//     marginVertical: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   profileSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 12,
//   },
//   infoContainer: {
//     flex: 1,
//   },
//   name: {
//     color: 'white',
//     fontSize: 16,
//     fontFamily: 'Poppins_500Medium',
//   },
//   specialty: {
//     color: 'rgba(255,255,255,0.8)',
//     fontSize: 14,
//     fontFamily: 'Poppins_300Light',
//   },
//   time: {
//     color: 'white',
//     fontSize: 14,
//     fontFamily: 'Poppins_300Light',
//     marginTop: 4,
//   },
//   dateSection: {
//     alignItems: 'flex-end',
//     marginRight: 15,
//   },
//   day: {
//     color: 'white',
//     fontSize: 24,
//     fontFamily: 'Poppins_700Bold',
//   },
//   month: {
//     color: 'white',
//     fontSize: 16,
//     fontFamily: 'Poppins_500Medium',
//   },
//   actions: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   actionButton: {
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     padding: 8,
//     borderRadius: 8,
//   },
// });
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { Appointment as AppointmentInterface } from '@/types/models';

// interface AppointmentProps {
//   appointment: AppointmentInterface;
//   onEdit?: (id: string) => void;
//   onCancel?: (id: string) => void;
// }

// export default function Appointment({ appointment, onEdit, onCancel }: AppointmentProps) {
//   const { appointment_date } = appointment;
//   const dateObj = new Date(appointment_date);
//   const day = dateObj.getDate();
//   const month = dateObj.toLocaleString('default', { month: 'short' });
//   const time = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

//   return (
//     <View style={styles.card}>
//       <View style={styles.mainContent}>
//         <View style={styles.profileSection}>
//           <Image
//             source={require('@/assets/images/pfp.png')}
//             style={styles.profileImage}
//           />
//           <View style={styles.infoContainer}>
//             <Text style={styles.name}>Dr. Marcus Horizon</Text>
//             <Text style={styles.specialty}>Cardiologist</Text>
//             <Text style={styles.time}>{time}</Text>
//           </View>
//         </View>
        
//         <View style={styles.dateSection}>
//           <Text style={styles.day}>{day}</Text>
//           <Text style={styles.month}>{month}</Text>
//         </View>
//       </View>

//       <View style={styles.actions}>
//         <TouchableOpacity 
//           style={[styles.actionButton, styles.videoButton]} 
//           onPress={() => onEdit?.(appointment.id)}
//         >
//           <Ionicons name="videocam-outline" size={20} color="#4CAF50" />
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={[styles.actionButton, styles.cancelButton]} 
//           onPress={() => onCancel?.(appointment.id)}
//         >
//           <Ionicons name="close" size={20} color="#FF5252" />
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.actionButton, styles.calendarButton]}>
//           <Ionicons name="calendar-outline" size={20} color="#2196F3" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginHorizontal: 16,
//     marginVertical: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   mainContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 16,
//   },
//   profileSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   profileImage: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     marginRight: 12,
//   },
//   infoContainer: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 4,
//   },
//   specialty: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 4,
//   },
//   time: {
//     fontSize: 14,
//     color: '#666',
//   },
//   dateSection: {
//     alignItems: 'center',
//   },
//   day: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#333',
//   },
//   month: {
//     fontSize: 14,
//     color: '#666',
//   },
//   actions: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     gap: 8,
//   },
//   actionButton: {
//     padding: 8,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   videoButton: {
//     backgroundColor: '#E8F5E9',
//   },
//   cancelButton: {
//     backgroundColor: '#FFEBEE',
//   },
//   calendarButton: {
//     backgroundColor: '#E3F2FD',
//   }
// });
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeStore } from '@/store/themeStore';
import { Appointment as AppointmentInterface } from '@/types/models';

interface AppointmentProps {
  appointment: AppointmentInterface;
  onEdit?: (id: string) => void;
  onCancel?: (id: string) => void;
}

export default function Appointment({ appointment, onEdit, onCancel }: AppointmentProps) {
  const { appointment_date } = appointment;
  const dateObj = new Date(appointment_date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('default', { month: 'short' });
  const time = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const { colors } = useThemeStore();

  return (
    <View style={[styles.card, { backgroundColor: colors.secondary }]}>
      <View style={styles.topContainer}>
        <Image
          source={require('@/assets/images/pfp.png')}
          style={styles.profileImage}
        />
        <View style={styles.dateContainer}>
          <Text style={styles.day}>{day}</Text>
          <Text style={styles.month}>{month}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>Dr. Marcus Horizon</Text>
        <Text style={styles.specialty}>Cardiologist</Text>
        <Text style={styles.time}>{time}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.videoButton]} 
          onPress={() => onEdit?.(appointment.id)}
        >
          <Ionicons name="videocam-outline" size={20} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.cancelButton]} 
          onPress={() => onCancel?.(appointment.id)}
        >
          <Ionicons name="close" size={20} color="#FF5252" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.calendarButton]}>
          <Ionicons name="calendar-outline" size={20} color="#2196F3" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  day: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    lineHeight: 28,
  },
  month: {
    fontSize: 16,
    color: '#666',
  },
  infoContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoButton: {
    backgroundColor: '#E8F5E9',
  },
  cancelButton: {
    backgroundColor: '#FFEBEE',
  },
  calendarButton: {
    backgroundColor: '#E3F2FD',
  }
});