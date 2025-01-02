// /components/CategoryManager.tsx
import React, { memo, useState, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ICategory } from '@/types/category.types';
import { useThemeStore } from '@/store/themeStore';
import AntDesign from '@expo/vector-icons/AntDesign';

interface CategoryManagerProps {
  categories: ICategory[];
  selectedCategory: string;
  onSelectCategory: (categoryLabel: string) => void;
  onAddCategory?: (cat: ICategory) => void; 
  onDeleteCategory?: (catLabel: string) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddCategory,
  onDeleteCategory,
}) => {
  const { colors, typography } = useThemeStore();
  const [counter, setCounter] = useState(0);

  // Example: Adds a new category on button press (demo logic)
  const handleAddCategory = useCallback(() => {
    if (!onAddCategory) return;
    setCounter(prev => prev + 1);
    const newCategory: ICategory = {
      label: `NewCat${counter}`,
      color: '#0000FF',
    };
    onAddCategory(newCategory);
  }, [onAddCategory, counter]);

  // Example: Called if you want to delete a category (demo logic)
  const handleDeleteCategory = useCallback((catLabel: string) => {
    if (onDeleteCategory) {
      onDeleteCategory(catLabel);
    }
  }, [onDeleteCategory]);

  return (
    <View style={styles.container}>
      <View style={styles.categoryList}>
        {categories.map(cat => {
          const isSelected = cat.label === selectedCategory;
          return (
            <Pressable
              key={cat.label}
              onPress={() => onSelectCategory(cat.label)}
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
                  { color: isSelected ? colors.background : colors.text },
                ]}
              >
                {cat.label}
              </Text>
              {onDeleteCategory && (
                <Pressable onPress={() => handleDeleteCategory(cat.label)}>
                  <Text style={[styles.deleteIcon, { color: colors.icon }]}>×</Text>
                </Pressable>
              )}
            </Pressable>
          );
        })}

        {onAddCategory && (
          <Pressable style={styles.addButton} onPress={handleAddCategory}>
            <AntDesign name="pluscircleo" size={24} color={colors.icon} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default memo(CategoryManager);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginRight: 4,
  },
  deleteIcon: {
    fontSize: 16,
    marginLeft: 4,
  },
  addButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
