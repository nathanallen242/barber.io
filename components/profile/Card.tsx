import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StarRatingDisplay from 'react-native-star-rating-widget';

interface CardProps {
 name?: string;
 jobTitle?: string;
 date?: string;
 duration: string;
 rating?: number;
 image?: string;
 show?: boolean;
 onSelect?: () => void;
}

const Card: React.FC<CardProps> = ({ name, jobTitle, date, duration, rating, image, show = true, onSelect }) => {
 return (
 <TouchableOpacity style={styles.cardContainer} onPress={onSelect}>
 <View style={styles.parentContainer}>
  <View style={styles.leftContainer}>
    <View style={styles.profilePlaceholder}>
     {image && <Image source={{uri: image}} style={{width: 65, height: 65}} />}
    </View>
  </View>
  <View style={styles.rightContainer}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.jobTitle}>{jobTitle}</Text>
    {rating && rating > 0 &&
     <TouchableOpacity onPress={() => {}}>
      <StarRatingDisplay
        rating={rating}
        maxStars={5}
        starSize={15}
        color='#000'
        style={{ alignSelf: 'flex-start', marginTop: 5 }}
        onChange={() => {}}
      />
     </TouchableOpacity>}
  </View>
  {show && <FontAwesome name="chevron-right" size={20} color="#000" />}
 </View>

 {show && (
  <View style={styles.additionalContainer}>
    <View style={styles.dateContainer}>
      <FontAwesome name="calendar" size={15} color="#000" />
      <Text style={styles.dateText}>{String(date)}</Text>
    </View>
    <View style={styles.durationContainer}>
      <FontAwesome name="clock-o" size={15} color="#000" />
      <Text style={styles.durationText}>{String(duration)}</Text>
    </View>
  </View>
 )}
  </TouchableOpacity>
 );
};


const styles = StyleSheet.create({
 cardContainer: {
   flexDirection: 'column',
   alignItems: 'center',
   borderRadius: 10,
   borderWidth: 1,
   borderColor: '#ccc',
   width: '80%',
   height: 'auto',
   marginTop: 20,
   padding: 15,
 },
 parentContainer: {
   flexDirection: 'row',
   alignItems: 'center',
   marginBottom: 10,
 },
 leftContainer: {
   flex: 1,
   alignItems: 'center',
 },
 rightContainer: {
   flex: 2,
   paddingLeft: 5,
 },
 profilePlaceholder: {
   borderRadius: 55,
   width: 65,
   height: 65,
   backgroundColor: '#ccc',
   overflow: 'hidden',
 },
 name: {
   fontWeight: 'bold',
   fontSize: 23,
   marginBottom: 8,
   marginLeft: 5,
 },
 jobTitle: {
   color: 'grey',
   fontSize: 18,
   marginLeft: 5,
 },
 additionalContainer: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'flex-end',
   borderTopWidth: 1,
   borderTopColor: '#ccc',
 },
 dateContainer: {
   marginBottom: 5,
   marginTop: 10,
   flex: 0.5,
   flexDirection: 'row',
   alignItems: 'flex-start',
 },
 durationContainer: {
   margin: 5,
   flex: 0.5,
   alignItems: 'center',
   flexDirection: 'row',
 },
 dateText: {
   fontSize: 15,
   color: "#000",
   marginLeft: 10,
 },
 durationText: {
   fontSize: 15,
   color: "#000",
   marginLeft: 10,
 },
});

export default Card;