import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/FontAwesome6';

type DropdownItem = {
  label: any;
  value: any;
};

type DropdownProps = {
  label: string;
  iconname: any;
  color?: string;
  data: DropdownItem[];
  focusColor?: string;
  onSelect: (item: DropdownItem) => void;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Dropdowncom = ({ label, iconname, color, data, focusColor = '#81D742', onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (item: any) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          { borderColor: isOpen ? focusColor : 'gray' }
        ]}
        onPress={handleToggle}
      >
        <View style={styles.buttonContent}>
          <Icon
            name={iconname}
            size={24} 
            color={color || 'black'}
            style={styles.icon}
          />
          <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">
            {selectedItem ? selectedItem.label : label}
          </Text>
        </View>
        <AntDesign
          name={isOpen ? "up" : "down"}
          size={24} 
          color={'black'}
        />
      </TouchableOpacity>
      {isOpen && (
        <FlatList
          data={data}
          style={styles.dropdownList}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.dropdownItem,
                selectedItem && selectedItem.value === item.value
                  ? { backgroundColor: focusColor }
                  : {}
              ]}
              onPress={() => handleSelect(item)}
            >
              <Text style={styles.dropdownItemText} numberOfLines={1} ellipsizeMode="tail">
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    maxWidth: SCREEN_WIDTH * 0.8,
    zIndex: 100,
    marginBottom: 10,
    alignSelf: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15, 
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 12,
    borderColor: 'gray',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2, 
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    fontSize: 18, 
    flex: 1,
    color: '#333',
  },
  icon: {
    marginRight: 16,
    fontSize: 24, 
  },
  dropdownList: {
    maxHeight: SCREEN_WIDTH * 0.6, 
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    backgroundColor: 'white',
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Dropdowncom;