import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useThemeStore } from '@/store/themeStore';
import { useUserStore } from '@/store/userStore';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/Input';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';
import * as ImagePicker from 'expo-image-picker';
import { updateUserProfile } from '@/lib/auth';
import Toast from 'react-native-toast-message';
import { isEqual } from 'lodash';
import DateTimePicker from '@react-native-community/datetimepicker';

const validationSchema = Yup.object().shape({
  forename: Yup.string(),
  surname: Yup.string(),
  phone_number: Yup.string(),
  birth_date: Yup.date()
    .max(new Date(), "Birth date cannot be in the future")
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr)),
  country: Yup.string(),
  profile_picture: Yup.string().nullable(),
});

interface FormValues {
  forename: string;
  surname: string;
  phone_number: string;
  birth_date: Date | null;
  country: CountryCode;
  profile_picture?: string;
}

const hasFormChanged = (currentValues: FormValues, initialValues: FormValues, currentImage: string | null, initialImage: string | null) => {
  const formChanged = !isEqual(currentValues, initialValues);
  const imageChanged = currentImage !== initialImage;
  return formChanged || imageChanged;
};

export default function EditScreen() {
  const router = useRouter();
  const { user } = useUserStore();

  const { colors, typography, mode } = useThemeStore();
  const [ image, setImage ] = React.useState<string | null>(user?.user_metadata.profile_picture || null);
  const initialImageRef = React.useRef<string | null>(user?.user_metadata.profile_picture || null);
  
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const formikRef = React.useRef<FormikProps<FormValues>>(null);

  // Convert string date from metadata to Date object or null
  const parseInitialDate = (dateString: string | undefined): Date | null => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  const initialValues: FormValues = {
    forename: user?.user_metadata.forename || '',
    surname: user?.user_metadata.surname || '',
    phone_number: user?.user_metadata.phone_number || '',
    birth_date: parseInitialDate(user?.user_metadata.birth_date),
    country: (user?.user_metadata.country as CountryCode) || 'US',
    profile_picture: user?.user_metadata.profile_picture
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    /* TODO: Optimize with compression, develop server to upload images to S3 bucket */
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      formikRef.current?.setFieldValue('profile_picture', result.assets[0].uri);
    }
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString();
  };

  React.useEffect(() => {
    return () => {
      setImage(null);
    };
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.imageContainer}>
      <Image
        source={{ uri: image || user!.user_metadata.profile_picture }}
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
        onSubmit={async (values) => {
          const formattedValues = {
            ...values,
            birth_date: values.birth_date || undefined,
            profile_picture: image || undefined,
          };

          const { error } = await updateUserProfile({
            userId: user!.id, 
            updates: formattedValues
          });

          if (error) {
            setImage(null);
            formikRef.current?.setFieldValue('profile_picture', user!.profile_picture);

            Toast.show({
              type: 'error',
              text1: 'Profile update failed!',
              text2: 'An error occurred while updating your profile.',
            });
          } else {
            Toast.show({
              type: 'success',
              text1: 'Profile updated!',
              text2: 'Your profile changes have been saved successfully.',
            });
            router.back();
          }
        }}
      >
        {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => {
          const isFormChanged = hasFormChanged(
            values, 
            initialValues, 
            image,
            initialImageRef.current
          );

          return (
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
                    iconName="person"
                  />
                </View>
              </View>

              <Input
                label="Email"
                value={user!.email}
                onChangeText={() => {}}
                iconName="mail"
                disabled={true}
              />

              <Input
                label="Phone Number"
                value={user?.phone_number || ''}
                onChangeText={handleChange('phone_number')}
                iconName="call"
                props={{
                  keyboardType: "phone-pad"
                }}
                disabled={true}
              />

              <TouchableOpacity 
                onPress={() => setShowDatePicker(true)}
              >
                <Input
                  label="Date of Birth"
                  value={values.birth_date ? formatDate(values.birth_date) : ''}
                  onChangeText={() => {}}
                  error={touched.birth_date ? errors.birth_date : undefined}
                  iconName="calendar"
                  props={{
                    pointerEvents: "none"
                  }}
                />
              </TouchableOpacity>

              {showDatePicker && (
                <View style={styles.datePickerContainer}>
                  <View style={styles.datePickerHeader}>
                    <TouchableOpacity 
                      onPress={() => setShowDatePicker(false)}
                    >
                      <Text style={[{ color: colors.primary, fontFamily: typography.fonts.light }]}>
                        Done
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    value={values.birth_date || new Date()}
                    mode="date"
                    themeVariant={mode === 'dark' ? 'dark' : 'light'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedDate) => {
                      if (Platform.OS === 'android') {
                        setShowDatePicker(false);
                      }
                      if (event.type === 'set' && selectedDate) {
                        setFieldValue('birth_date', selectedDate);
                      }
                    }}
                    maximumDate={new Date()}
                  />
                </View>
              )}

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
                style={[
                  styles.saveButton,
                  { 
                    backgroundColor: isFormChanged ? colors.primary : colors.border,
                    opacity: isFormChanged ? 1 : 0.5 
                  }
                ]}
                onPress={() => {
                  if (isFormChanged) {
                    handleSubmit();
                  }
                }}
                disabled={!isFormChanged}
              >
                <Text style={[
                  styles.saveButtonText,
                  { 
                    color: isFormChanged ? colors.button : 'grey',
                    fontFamily: typography.fonts.semiBold 
                  }
                ]}>
                  Save changes
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
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
  },
  saveButtonText: {
    fontSize: 16,
  },
  datePickerContainer: {
    borderRadius: 8,
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  }
});