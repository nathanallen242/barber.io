import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useThemeStore } from '@/store/themeStore';
import { useUserStore } from '@/store/userStore';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/Input';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

const validationSchema = Yup.object().shape({
  forename: Yup.string().required('First name is required'),
  surname: Yup.string().required('Last name is required'),
  phone: Yup.string(),
  birth_date: Yup.string(),
  country: Yup.string().required('Country is required').nullable()
});

interface FormValues {
  forename: string;
  surname: string;
  phone: string;
  birth_date: string;
  country: CountryCode;
}

export default function EditScreen() {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const { colors, typography } = useThemeStore();
  const [image, setImage] = React.useState<string | null>(null);

  const initialValues: FormValues = {
    forename: user?.forename || '',
    surname: user?.surname || '',
    phone: user?.phone || '',
    birth_date: user?.birth_date || '',
    country: (user?.country as CountryCode) || 'US'
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setUser({
        ...user,
        profile_picture: result.assets[0].uri
      });
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.imageContainer}>
      <Image
        source={image ? { uri: image } : (user?.profile_picture ? { uri: user.profile_picture } : require('@/assets/images/pfp.png'))}
        style={styles.profileImage}
        contentFit="cover"
        />
        <TouchableOpacity style={styles.editButton} onPress={pickImage}>
            <MaterialIcons name="add-a-photo" size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setUser({
            ...user,
            ...values,
            user_metadata: { ...user?.user_metadata }
          });
          router.back();
        }}
      >
        {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => (
          <View style={styles.form}>
            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Input
                  label="First Name"
                  value={values.forename}
                  onChangeText={handleChange('forename')}
                  error={touched.forename ? errors.forename : undefined}
                  iconName="person"
                />
              </View>
              <View style={styles.halfWidth}>
                <Input
                  label="Last Name"
                  value={values.surname}
                  onChangeText={handleChange('surname')}
                  error={touched.surname ? errors.surname : undefined}
                  iconName="person-outline"
                />
              </View>
            </View>

            <Input
              label="Email"
              value={user?.user_metadata.email}
              onChangeText={() => {}}
              props={{
                editable: false
              }}
              iconName="mail"
            />

            <Input
              label="Phone Number"
              value={values.phone}
              onChangeText={handleChange('phone')}
              error={touched.phone ? errors.phone : undefined}
              iconName="call"
              props={{
                keyboardType: "phone-pad"
              }}
              
            />

            <Input
              label="Date of Birth"
              value={values.birth_date}
              onChangeText={handleChange('birth_date')}
              error={touched.birth_date ? errors.birth_date : undefined}
              iconName="calendar"
            />

            <View style={styles.countryContainer}>
              <Text style={[styles.label, { 
                color: colors.text,
                fontFamily: typography.fonts.regular,
                 }]}>Country of Residence</Text>
              <CountryPicker
                containerButtonStyle={{
                    backgroundColor: colors.border,
                    borderRadius: 5,
                    marginBottom: 10
                }}
                withFlag={true}
                withFilter={true}
                withCountryNameButton={true}
                withAlphaFilter={true}
                withCallingCode={false}
                withCurrency={false}
                withEmoji={true}
                withModal={true}
                visible={false}
                countryCode={values.country}
                onSelect={(country: Country) => {
                  void setFieldValue('country', country.cca2);
                }}
              />
              {touched.country && errors.country && (
                <Text style={styles.errorText}>{errors.country}</Text>
              )}
            </View>

            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: colors.primary }]}
              onPress={() => {
                handleSubmit();
                Toast.show({
                  type: 'success',
                  text1: 'Profile updated!',
                  text2: 'Your profile changes have been saved successfully.',
                });
              }}
            >
              <Text style={{ color: colors.button, fontFamily: typography.fonts.semiBold }}>
                Save changes
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  editButton: {
    position: 'absolute',
    top: 130,
    right: 130
  },
  editButtonText: {
    fontSize: 16,
  },
  form: {
    gap: 0,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    marginBottom: 8,
  },
  countryContainer: {
    marginBottom: 20,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: 4,
  },
  saveButton: {
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  }
});