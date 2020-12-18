import React, { useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";

import Project from "../../models/Project";
import Service from "../../services/ProjectService";

// import { Container } from './styles';
export default function EditProject() {

  const navigation = useNavigation();
  const route = useRoute();
  const projetcService = new Service;

  const projectParams = route.params as Project;

  const [title, setTitle] = useState(projectParams.title);
  const [url, setUrl] = useState(projectParams.url);
  const [techs, setTechs] = useState(projectParams.techs);

  function handleAddNewRowTech(){
      setTechs([...techs, {name: ''}]);
  }
  function handleAddTech(index: number, tech: string){
    const dados = techs;
    dados[index].name = tech;
    setTechs([...dados]);
  }
  function handleUpdate(){
    const technos: string[] = [];
    techs.map(tech=>{
      technos.push(tech.name);
    }); 
    const project = {
      id : projectParams.id,
      title : title,
      url : url,
      techs : technos,
    }
    projetcService.update(project.id, project);
    navigation.goBack();
  }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Título:</Text>
          <TextInput style={styles.inputText} onChangeText={setTitle} value={title}/> 
          <Text style={styles.title}>Link do Repositório:</Text>
          <TextInput style={styles.inputText} onChangeText={setUrl} value={url} />
          <Text style={styles.title}>Tecnologias:</Text>
          <View style={styles.techsContainer}>
            <View style={styles.techsInputContainer}>
              {techs.map((tech, index)=>(
                <TextInput key={index} 
                  style={[styles.inputText, styles.techsInput]} 
                  value={tech.name}
                  onChangeText={(text)=>{handleAddTech(index, text)}} 
                  />
              ))}
            </View>
            <RectButton onPress={handleAddNewRowTech} style={styles.addTechsButton}>
              <Feather name="plus-circle" size={60} color="#7d5aa3" />
            </RectButton>
          </View>
        </View>
        <View style={styles.saveContainer}>
          <View/>
        <RectButton onPress={handleUpdate} style={styles.saveButton}>
          <Entypo
            style={styles.saveButtonIcon}
            name="save"
            size={40}
            color="#149c02"
          />
          <Text style={styles.saveButtonText}>Salvar</Text>
        </RectButton>
        </View>
        
      </ScrollView>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontFamily: "Nunito_700Bold",
      fontSize: 30,
      color: "#696969",
      marginVertical: 10,
    },
    inputText: {
      backgroundColor: "#fff",
      borderLeftWidth: 0.8,
      borderBottomWidth: 0.8,
      borderColor: "#696969",
      height: 40,
      fontSize: 20,
      textAlignVertical: "bottom",
      paddingHorizontal: 5,
      paddingBottom: 5,
      fontFamily: "Nunito_600SemiBold",
      color: "#696969",
    },
    formContainer: {
      marginHorizontal: 15,
      marginTop: 20,
    },
    techsContainer: {
      flexDirection: "row",
      alignItems: 'flex-end',
      justifyContent: "space-between",
    },
    techsInputContainer:{
      flexDirection: 'column',
      width: '80%',
    },
    saveContainer:{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    saveButtonIcon: {
      borderWidth: 4.5,
      textAlign: "center",
      paddingTop: 10,
      paddingHorizontal: 5,
      borderRadius: 50,
      borderColor: "#149c02",
    },
    saveButton: {
      justifyContent: "center",
      alignItems: "center",
      padding: 5,
      marginRight: 10,
      marginTop: 50,
    },
    saveButtonText: {
      color: "#149c02",
    },
    addTechsButton: {
      padding: 2,
      marginLeft: 6,
    },
    techsInput:{
      marginVertical: 10
    },
  });