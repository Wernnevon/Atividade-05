import React, { useEffect, useState } from "react";
import { FontAwesome, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Linking,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import Service from '../services/ProjectService';
import Project from '../models/Project';
import ParamsId from '../models/ParamsId';

// import { Container } from './styles';
export default function ProjectDetails() {
  const navigation = useNavigation();
  const route = useRoute();

  const projetcService = new Service;
  const paramsId = route.params as ParamsId

  const [project, setProject] = useState<Project>();

  useEffect(() => {
    projetcService.getById(paramsId.id).then((response) => {
      setProject(response.data);
    });
  });
  if(!project){
    return <AppLoading/>
  }

  function handleDeleteProject(){
    projetcService.delete(paramsId.id);
    navigation.goBack();
  }

  function handleOpenGitHub(){
    Linking.openURL(`https://${project?.url}`);
  }

  function handleGoEditProject(){
    navigation.navigate('EditProject', project)
  }

  return (
    <View style={styles.container}>
      <View style={styles.projectContainer}>
        <View style={styles.projectTitleContainer}>
  <Text style={styles.projectTitle}> { project.title } </Text>
        </View>
        {
          project.techs.map((tech, index)=> (
            <Text key={index} style={styles.projectTecnologies}> {tech.name}  </Text>
          ))
        }
      </View>
      <RectButton onPress={handleOpenGitHub} style={styles.gitButton}> 
        <FontAwesome name="github" size={50} color='#000' />
        <Text style={styles.gitButtonText}>GitHub</Text>
      </RectButton>
      <RectButton onPress={handleGoEditProject} style={styles.editButton}>
        <Feather
          style={styles.editoIconButton}
          name="edit"
          size={30}
          color="#7d5aa3"
        />
        <Text style={styles.editButtonText}>Editar</Text>
      </RectButton>
      <RectButton onPress={handleDeleteProject} style={styles.removeButton}>
        <MaterialCommunityIcons style={styles.removeIconButton} name="delete-circle-outline" size={60} color="#b00000" />
        <Text style={styles.removeButtonText}>Remover</Text>
      </RectButton>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  projectContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  projectTitle: {
    fontSize: 30,
    color: "#696969",
    fontFamily: "Nunito_600SemiBold",
    marginLeft: 20
  },
  projectTecnologies: {
    fontSize: 18,
    color: "#696969",
    fontFamily: "Nunito_600SemiBold",
    textAlign: 'center',
  },
  projectTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 30,
  },
  gitButton:{
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    right: 8,
    bottom: 260,
    paddingHorizontal: 10
  },
  gitButtonText:{
    color: '#000'
  },
  editButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    paddingHorizontal: 10,
    right: 0,
    bottom: 170,
    margin: 5,
    borderRadius: 50,
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    paddingHorizontal: 5,
    right: 5,
    bottom: 90,
  },
  editoIconButton:{
    borderWidth: 4.5,
    textAlign: 'center',
    paddingTop: 10,
    paddingHorizontal: 5,
    borderRadius: 50,
    borderColor: '#7d5aa3'
  },
  removeIconButton:{
    textAlign: 'center',
    borderRadius: 100,
  },
  editButtonText:{
    color: '#7d5aa3'
  },
  removeButtonText:{
      color: '#b00000'
  },
});
