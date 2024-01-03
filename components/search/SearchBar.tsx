import React, { useState } from 'react';
import { Input } from 'react-native-elements';

const SearchBar: React.FC = () => {
 const [searchTerm, setSearchTerm] = useState<string>('');

 const handleChangeText = (value: string) => {
 setSearchTerm(value);
 };

 return (
 <Input
 placeholder='Search for barbers...'
 leftIcon={{ type: 'font-awesome', name: 'search', color: 'darkgray' }}
 value={searchTerm}
 onChangeText={handleChangeText}
 inputStyle={{ color: 'darkgray' }}
 inputContainerStyle={{ borderRadius: 10, padding: 10, backgroundColor: 'lightgray', height: 50, borderBottomWidth: 0, marginTop: 25, width: 350, alignSelf: 'center' }}
 />
 );
};

export default SearchBar;