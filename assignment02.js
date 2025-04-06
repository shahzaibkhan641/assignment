import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Modal, 
  SectionList, 
  StyleSheet 
} from 'react-native';

// Hardcoded Contacts
const contacts = [
  { id: '1', name: 'John Doe', phone: '1234567890', group: 'Family' },
  { id: '2', name: 'Jane Smith', phone: '2345678901', group: 'Friends' },
  { id: '3', name: 'Sara Connor', phone: '3456789012', group: 'Work' },
  { id: '4', name: 'Mike Tyson', phone: '4567890123', group: 'Family' },
  { id: '5', name: 'Tom Hanks', phone: '5678901234', group: 'Friends' },
  { id: '6', name: 'Elon Musk', phone: '6789012345', group: 'Work' },
  { id: '7', name: 'Steve Jobs', phone: '7890123456', group: 'Work' },
  { id: '8', name: 'Bill Gates', phone: '8901234567', group: 'Family' },
  { id: '9', name: 'Mark Zuckerberg', phone: '9012345678', group: 'Friends' },
  { id: '10', name: 'Warren Buffet', phone: '0123456789', group: 'Work' }
];

const App = () => {
  const [search, setSearch] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Filter contacts based on search input
  const handleSearch = (text) => {
    setSearch(text);
    const filtered = contacts.filter(contact => 
      contact.name.toLowerCase().includes(text.toLowerCase()) || 
      contact.phone.includes(text)
    );
    setFilteredContacts(filtered);
  };

  // Show contact details in modal
  const showContactDetails = (contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
  };

  // Group contacts by their group type
  const groupedContacts = [
    { title: 'Family', data: filteredContacts.filter(contact => contact.group === 'Family') },
    { title: 'Friends', data: filteredContacts.filter(contact => contact.group === 'Friends') },
    { title: 'Work', data: filteredContacts.filter(contact => contact.group === 'Work') }
  ];

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput 
        style={styles.searchInput}
        placeholder="Search by name or phone number"
        value={search}
        onChangeText={handleSearch}
      />

      {/* Section List for Displaying Contacts */}
      <SectionList
        sections={groupedContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.contactItem} onPress={() => showContactDetails(item)}>
            <Text style={styles.contactText}>{item.name} - {item.phone}</Text>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
      />

      {/* Modal for Contact Details */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {selectedContact && (
              <>
                <Text style={styles.modalTitle}>Contact Details</Text>
                <Text>Name: {selectedContact.name}</Text>
                <Text>Phone: {selectedContact.phone}</Text>
                <Text>Group: {selectedContact.group}</Text>
              </>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModalButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0',
    padding: 10,
  },
  contactItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeModalButton: {
    color: '#007BFF',
    marginTop: 20,
    textAlign: 'center',
  }
});

export default App;
