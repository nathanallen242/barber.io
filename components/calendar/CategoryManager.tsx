import React, { memo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ICategory, DEFAULT_CATEGORIES } from '@/types/availability.types';
import { useThemeStore } from '@/store/themeStore';

interface CategoryManagerProps {
    selectedCategory: string | null;
    onSelectCategory: (category: ICategory | null) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
    selectedCategory,
    onSelectCategory,
}) => {
    const { typography } = useThemeStore();
    return (
        <View style={styles.container}>
            <View style={styles.categoryList}>
                {DEFAULT_CATEGORIES.map(cat => {
                    const isSelected = cat.label === selectedCategory;
                    return (
                        <Pressable
                            key={cat.label}
                            onPress={() => {
                                if (isSelected) {
                                    onSelectCategory(null);
                                } else {
                                    onSelectCategory(cat);
                                }
                            }}
                            style={[
                                styles.categoryTag,
                                {
                                    backgroundColor: isSelected ? cat.color : 'transparent',
                                    borderColor: cat.color,
                                },
                            ]}
                        >
                            <View style={[styles.categoryDot, { backgroundColor: cat.color }]} />
                            <Text
                                style={[
                                    styles.categoryText,
                                    { fontFamily: typography.fonts.medium },
                                    { color: isSelected ? '#FFFFFF' : cat.color },
                                ]}
                            >
                                {cat.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    categoryList: {
        flexDirection: 'row',
        gap: 8,
    },
    categoryTag: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },
    categoryDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    categoryText: {
        fontSize: 14,
    },
});

export default memo(CategoryManager);