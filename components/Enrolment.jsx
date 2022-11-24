import React, { useState }  from 'react';
import { FlatList, View, SafeAreaView } from "react-native";
import { Searchbar } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";



export default function Enrolment() {
  
    // Searchbar-testailua
    const [searchQuery, setSearchQuery] = React.useState('');
  
    const onChangeSearch = query => setSearchQuery(query);
  
    const [items, setItems] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const select = (id) => {
        setSelectedId(id);
    }

    const [search, setSearch] = useState('');


    return (
        <View>
            <FlatList
            data=""
            keyExtractor={(item) => item.id}
            extraData={selectedId}
            renderItem = {({item}) => (
                <Row person={item} selectedId={selectedId} select={select}></Row>
            )}></FlatList>
        

            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />

            
        </View>
    );


    
};

