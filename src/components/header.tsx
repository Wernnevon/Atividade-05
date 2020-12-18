import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

// import { Container } from './styles';

interface HeaderProps{
    title: string,
    showX?: boolean,
    showArrow?: boolean
}

const Header: React.FC<HeaderProps> = ({title, showX=true, showArrow=true}) => {
    
    const navigation = useNavigation();
    
    function handlerGoToAppHomepage(){
        navigation.navigate('Projects');
    }

    return (

        <View style={styles.container}>
           {showArrow ? (
                <BorderlessButton 
                onPress={navigation.goBack}
            >
                <Feather name='arrow-left' size={ 24 } color='#15b6d6'></Feather>
            </BorderlessButton>
           ) : (
               <View/>
           )}
            <Text style={styles.title}> { title } </Text>

        {showX ? (
            <BorderlessButton
                onPress={handlerGoToAppHomepage}
            >
                <Feather name='x' size={ 24 } color='#ff669d'></Feather>
            </BorderlessButton>
            ):(
                <View/>
            )
        }
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#7d5aa3',
        borderBottomWidth: 1,
        borderColor: '#dde3f0',
        paddingTop: 44,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Nunito_700Bold',
        color: '#fff',
        fontSize: 20,
        textTransform: 'uppercase',
    }
});

export default Header;